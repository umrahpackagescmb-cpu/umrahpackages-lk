#!/usr/bin/env python3
"""
Generates the offline "Umrah Guide" PDF (public/downloads/umrah-offline-guide.pdf)
from the same content that powers the live Step-by-Step Umrah Guide, Packing
Checklist, and Pre-Departure Checklist tools.

Usage:
    1. Extract the live TS content to JSON (from the project root):
         npx --yes tsx scripts/extract-pdf-content.ts
       This writes /tmp/pdf-content.json.
    2. Run this script:
         python3 scripts/generate-umrah-guide-pdf.py

Requires: reportlab, pypdf, arabic-reshaper, python-bidi (pip install --break-system-packages)
Requires system fonts: Poppins (google-fonts) and FreeSerif (freefont) — used
for Arabic shaping since Poppins has no Arabic glyphs. See use of FreeSerif
below for the Arabic dua text; Latin body/heading text uses real Poppins.
"""

import json
from datetime import date

import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, Image as RLImage,
)
from pypdf import PdfReader, PdfWriter

# ---------------------------------------------------------------------------
# Brand constants — locked colors, never change without updating the brand
# guide elsewhere in this project.
# ---------------------------------------------------------------------------
NAVY = colors.HexColor("#0D1B2A")
GOLD = colors.HexColor("#C8A24A")
GOLD_DARK = colors.HexColor("#A9822E")
LIGHT_GRAY = colors.HexColor("#F2F2F2")
WHITE = colors.HexColor("#FFFFFF")
BODY_GRAY = colors.HexColor("#4B5563")

PROJECT_ROOT = "/root/project/umrahpackages"
OUTPUT_PATH = f"{PROJECT_ROOT}/public/downloads/umrah-offline-guide.pdf"
LOGO_PATH = f"{PROJECT_ROOT}/public/brand/logo-primary-transparent.png"

FONT_DIR = "/usr/share/fonts/truetype/google-fonts"
ARABIC_FONT_PATH = "/usr/share/fonts/truetype/freefont/FreeSerif.ttf"

# ---------------------------------------------------------------------------
# Fonts
# ---------------------------------------------------------------------------
pdfmetrics.registerFont(TTFont("Poppins", f"{FONT_DIR}/Poppins-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Poppins-Bold", f"{FONT_DIR}/Poppins-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Poppins-Medium", f"{FONT_DIR}/Poppins-Medium.ttf"))
pdfmetrics.registerFont(TTFont("Poppins-Light", f"{FONT_DIR}/Poppins-Light.ttf"))
pdfmetrics.registerFont(TTFont("Poppins-Italic", f"{FONT_DIR}/Poppins-Italic.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif", ARABIC_FONT_PATH))


def shape_arabic(text: str) -> str:
    """Reshapes + reorders Arabic text so it renders correctly in reportlab,
    which does not do complex text shaping on its own."""
    return get_display(arabic_reshaper.reshape(text))


# ---------------------------------------------------------------------------
# Paragraph styles
# ---------------------------------------------------------------------------
styles = {
    "h1": ParagraphStyle("h1", fontName="Poppins-Bold", fontSize=20, textColor=NAVY,
                          spaceAfter=4 * mm, leading=24),
    "h2": ParagraphStyle("h2", fontName="Poppins-Bold", fontSize=13, textColor=NAVY,
                          spaceBefore=2 * mm, spaceAfter=2 * mm, leading=16),
    "step_title": ParagraphStyle("step_title", fontName="Poppins-Bold", fontSize=12.5,
                                  textColor=NAVY, spaceAfter=1 * mm, leading=15),
    "summary": ParagraphStyle("summary", fontName="Poppins-Italic", fontSize=9.5,
                               textColor=BODY_GRAY, spaceAfter=2.5 * mm, leading=13),
    "body": ParagraphStyle("body", fontName="Poppins", fontSize=9.5, textColor=colors.HexColor("#1F2937"),
                            leading=13.5, spaceAfter=1.6 * mm),
    "bullet": ParagraphStyle("bullet", fontName="Poppins", fontSize=9.5,
                              textColor=colors.HexColor("#1F2937"), leading=13.5,
                              leftIndent=3 * mm, spaceAfter=1.4 * mm, bulletIndent=0),
    "tip": ParagraphStyle("tip", fontName="Poppins-Italic", fontSize=8.7,
                           textColor=GOLD_DARK, leading=12, spaceBefore=1 * mm),
    "dua_arabic": ParagraphStyle("dua_arabic", fontName="FreeSerif", fontSize=14,
                                  textColor=NAVY, alignment=TA_CENTER, leading=22),
    "dua_translit": ParagraphStyle("dua_translit", fontName="Poppins-Italic", fontSize=9,
                                    textColor=BODY_GRAY, alignment=TA_CENTER, leading=12,
                                    spaceBefore=1.5 * mm),
    "dua_translation": ParagraphStyle("dua_translation", fontName="Poppins", fontSize=9.3,
                                       textColor=colors.HexColor("#1F2937"), alignment=TA_CENTER,
                                       leading=13, spaceBefore=1 * mm),
    "category_title": ParagraphStyle("category_title", fontName="Poppins-Bold", fontSize=11,
                                      textColor=NAVY, spaceBefore=3 * mm, spaceAfter=1.5 * mm),
    "checklist_item": ParagraphStyle("checklist_item", fontName="Poppins", fontSize=9.3,
                                      textColor=colors.HexColor("#1F2937"), leading=13,
                                      spaceAfter=1 * mm),
    "footer_note": ParagraphStyle("footer_note", fontName="Poppins", fontSize=8, textColor=BODY_GRAY,
                                   leading=11),
    "toc_entry": ParagraphStyle("toc_entry", fontName="Poppins-Medium", fontSize=11, textColor=NAVY,
                                 leading=16, spaceAfter=2 * mm),
}


def gold_rule(width="100%", thickness=1.2, color=GOLD):
    return HRFlowable(width=width, thickness=thickness, color=color, spaceBefore=1 * mm, spaceAfter=3 * mm)


def checklist_glyph() -> str:
    # Ballot-box glyph — Poppins has no Arabic/box glyphs, so pull this one
    # character from FreeSerif inline, rest of the run stays in Poppins.
    return '<font name="FreeSerif" color="#A9822E">&#9744;</font>'


def dua_box(dua: dict):
    """A light-gray bordered card containing the Arabic + transliteration +
    translation for one dua, matching the site's dua-card visual pattern."""
    arabic = Paragraph(shape_arabic(dua["arabic"]), styles["dua_arabic"])
    translit = Paragraph(dua["transliteration"], styles["dua_translit"])
    translation = Paragraph(f'“{dua["translation"]}”', styles["dua_translation"])
    inner = Table([[arabic], [translit], [translation]], colWidths=[160 * mm])
    inner.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GRAY),
        ("TOPPADDING", (0, 0), (-1, 0), 4 * mm),
        ("BOTTOMPADDING", (0, -1), (-1, -1), 4 * mm),
        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
        ("TOPPADDING", (0, 1), (-1, 2), 1 * mm),
    ]))
    return inner


def step_flowable(step: dict, index: int):
    parts = [Paragraph(f'{index}. {step["title"]}', styles["step_title"])]
    parts.append(Paragraph(step["summary"], styles["summary"]))
    for d in step["details"]:
        parts.append(Paragraph(f'<font color="#C8A24A">&#8226;</font>&nbsp;&nbsp;{d}', styles["bullet"]))
    if step.get("dua"):
        parts.append(Spacer(1, 1.5 * mm))
        parts.append(dua_box(step["dua"]))
    if step.get("tip"):
        parts.append(Paragraph(f'<b>Tip:</b> {step["tip"]}', styles["tip"]))
    parts.append(Spacer(1, 5 * mm))
    return KeepTogether(parts)


def checklist_category_flowable(category: dict):
    parts = [Paragraph(category["title"], styles["category_title"])]
    for item in category["items"]:
        parts.append(Paragraph(f'{checklist_glyph()}&nbsp;&nbsp;{item["label"]}', styles["checklist_item"]))
    return KeepTogether(parts[:3]) if len(parts) <= 3 else parts


# ---------------------------------------------------------------------------
# Cover page (drawn with a plain canvas, merged in front of the Platypus doc)
# ---------------------------------------------------------------------------
def build_cover(path: str):
    W, H = A4
    c = pdfcanvas.Canvas(path, pagesize=A4)

    # Full navy background
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Thin gold band at the very top
    c.setFillColor(GOLD)
    c.rect(0, H - 4 * mm, W, 4 * mm, fill=1, stroke=0)

    # White rounded card holding the logo (keeps the logo's own navy/gold
    # colors fully legible — the logo artwork itself is never altered)
    card_w, card_h = 110 * mm, 46 * mm
    card_x = (W - card_w) / 2
    card_y = H - 78 * mm
    c.setFillColor(WHITE)
    c.roundRect(card_x, card_y, card_w, card_h, 4 * mm, fill=1, stroke=0)

    logo_w = 96 * mm
    logo_h = logo_w * (1122 / 1402)
    c.drawImage(LOGO_PATH, card_x + (card_w - logo_w) / 2, card_y + (card_h - logo_h) / 2,
                width=logo_w, height=logo_h, mask="auto")

    # Eyebrow
    c.setFont("Poppins-Medium", 11)
    c.setFillColor(GOLD)
    c.drawCentredString(W / 2, H - 100 * mm, "OFFLINE REFERENCE GUIDE")

    # Title
    c.setFont("Poppins-Bold", 27)
    c.setFillColor(WHITE)
    c.drawCentredString(W / 2, H - 116 * mm, "The Complete Umrah Guide")

    # Subtitle
    c.setFont("Poppins", 12)
    c.setFillColor(colors.HexColor("#C7CDD6"))
    c.drawCentredString(W / 2, H - 126 * mm, "Step-by-step rites, packing list & pre-departure checklist")

    # Gold divider
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(W / 2 - 30 * mm, H - 136 * mm, W / 2 + 30 * mm, H - 136 * mm)

    # What's inside
    c.setFont("Poppins", 10.5)
    c.setFillColor(colors.HexColor("#C7CDD6"))
    lines = [
        "Inside this guide:",
        "The full Umrah sequence, Ihram to Halq/Taqsir, with duas",
        "A complete packing checklist",
        "A pre-departure documents & admin checklist",
    ]
    y = H - 150 * mm
    c.setFont("Poppins-Medium", 10.5)
    c.drawCentredString(W / 2, y, lines[0])
    c.setFont("Poppins", 10)
    for line in lines[1:]:
        y -= 6.2 * mm
        c.drawCentredString(W / 2, y, f"•  {line}")

    # Footer
    c.setFont("Poppins", 9)
    c.setFillColor(colors.HexColor("#8B93A1"))
    c.drawCentredString(W / 2, 20 * mm, f"Generated {date.today().strftime('%d %B %Y')} · umrahpackages.lk")
    c.setFont("Poppins-Italic", 8)
    c.drawCentredString(W / 2, 14 * mm,
                         "A general overview for planning purposes — not a substitute for your agency's briefing or a scholar's guidance.")

    c.showPage()
    c.save()


# ---------------------------------------------------------------------------
# Header/footer on every content page
# ---------------------------------------------------------------------------
def on_page(c, doc):
    W, H = A4
    c.saveState()
    c.setFont("Poppins-Medium", 8)
    c.setFillColor(BODY_GRAY)
    c.drawString(20 * mm, 12 * mm, "UmrahPackages.lk — Offline Umrah Guide")
    c.drawRightString(W - 20 * mm, 12 * mm, f"Page {doc.page}")
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.6)
    c.line(20 * mm, 16 * mm, W - 20 * mm, 16 * mm)
    c.restoreState()


# ---------------------------------------------------------------------------
# Build content document
# ---------------------------------------------------------------------------
def build_content(path: str, data: dict):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm, topMargin=20 * mm, bottomMargin=22 * mm,
    )
    story = []

    # --- Table of contents -------------------------------------------------
    story.append(Paragraph("Contents", styles["h1"]))
    story.append(gold_rule())
    toc_items = [
        "1.  Step-by-Step Umrah Guide",
        "2.  Ihram Rules & Restrictions (Summary)",
        "3.  Umrah Packing Checklist",
        "4.  Pre-Departure Checklist",
    ]
    for t in toc_items:
        story.append(Paragraph(t, styles["toc_entry"]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "This is a printable snapshot for offline reference. For live weather, currency rates, "
        "the interactive versions of these tools, and everything else on the site, visit "
        "<font color=\"#0D1B2A\"><b>umrahpackages.lk/islamic-tools</b></font>.",
        styles["body"],
    ))
    story.append(PageBreak())

    # --- Section 1: Step-by-step guide -------------------------------------
    story.append(Paragraph("1. Step-by-Step Umrah Guide", styles["h1"]))
    story.append(Paragraph(
        "The full sequence of Umrah, from entering Ihram through Halq/Taqsir. This is a general "
        "overview reflecting how most pilgrims perform Umrah — a few small details differ "
        "between schools of thought, so for a specific fiqh question, ask your group's Maulavi "
        "or scholar.", styles["body"],
    ))
    story.append(gold_rule())
    for i, step in enumerate(data["umrahGuideSteps"], start=1):
        story.append(step_flowable(step, i))
    story.append(PageBreak())

    # --- Section 2: Ihram rules (hand-kept in sync with the live page) -----
    story.append(Paragraph("2. Ihram Rules & Restrictions (Summary)", styles["h2"]))
    story.append(Paragraph(
        "A general overview of the widely-agreed restrictions during Ihram. This isn't a "
        "substitute for scholarly guidance — for anything about your own situation, speak to "
        "a scholar or your group's Maulavi.", styles["body"],
    ))
    story.append(gold_rule())

    ihram_sections = [
        ("Applies to everyone", [
            "Cutting or trimming your hair or nails.",
            "Using perfume or scented products — on the body or on your clothing — once you've entered Ihram.",
            "Engaging in marital relations.",
            "Hunting or killing game animals.",
            "Uprooting plants or cutting trees within the sacred precinct (the Haram boundary).",
            "Arguing, quarrelling, or using obscene language.",
        ]),
        ("Specific to men", [
            "Wearing stitched or tailored clothing — the two-piece Ihram cloth (izar and rida) is worn instead.",
            "Covering the head with a fitted covering. An umbrella or other shade is fine; a fitted cap or hood is not.",
        ]),
        ("Specific to women", [
            "Covering the face with a niqab, or wearing gloves, while in Ihram.",
            "Otherwise, normal modest dress is kept as usual — the face and hands stay uncovered as usual outside of Ihram-specific restrictions.",
            "The head and hair should remain covered as usual.",
        ]),
    ]
    for title, items in ihram_sections:
        story.append(Paragraph(title, styles["category_title"]))
        for it in items:
            story.append(Paragraph(f'<font color="#C8A24A">&#8226;</font>&nbsp;&nbsp;{it}', styles["bullet"]))
    story.append(PageBreak())

    # --- Section 3: Packing checklist ---------------------------------------
    story.append(Paragraph("3. Umrah Packing Checklist", styles["h2"]))
    story.append(Paragraph(
        "A complete checklist combining every traveler profile. Tick off items as you pack — "
        "for a version tailored to just your situation, use the interactive Packing Checklist tool "
        "on the site.", styles["body"],
    ))
    story.append(gold_rule())
    for category in data["packingChecklist"]:
        story.append(Paragraph(category["title"], styles["category_title"]))
        for item in category["items"]:
            story.append(Paragraph(f'{checklist_glyph()}&nbsp;&nbsp;{item["label"]}', styles["checklist_item"]))
    story.append(PageBreak())

    # --- Section 4: Pre-departure checklist ---------------------------------
    story.append(Paragraph("4. Pre-Departure Checklist", styles["h2"]))
    story.append(Paragraph(
        "Documents, money, connectivity and home admin to sort out before you fly — distinct "
        "from the physical packing list above.", styles["body"],
    ))
    story.append(gold_rule())
    for category in data["preDepartureChecklist"]:
        story.append(Paragraph(category["title"], styles["category_title"]))
        for item in category["items"]:
            story.append(Paragraph(f'{checklist_glyph()}&nbsp;&nbsp;{item["label"]}', styles["checklist_item"]))

    story.append(Spacer(1, 8 * mm))
    story.append(gold_rule())
    story.append(Paragraph(
        "UmrahPackages.lk is a comparison and information platform only — we do not organize "
        "travel, issue visas, or process any booking or payment. Every booking, payment and service "
        "is a direct arrangement between you and the listed agency. This guide is general information, "
        "not a substitute for your agency's briefing or a qualified scholar's guidance.",
        styles["footer_note"],
    ))

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)


def main():
    with open("/tmp/pdf-content.json") as f:
        data = json.load(f)

    cover_path = "/tmp/cover.pdf"
    content_path = "/tmp/content.pdf"

    build_cover(cover_path)
    build_content(content_path, data)

    writer = PdfWriter()
    for p in (cover_path, content_path):
        reader = PdfReader(p)
        for page in reader.pages:
            writer.add_page(page)

    writer.add_metadata({
        "/Title": "The Complete Umrah Guide — UmrahPackages.lk",
        "/Author": "UmrahPackages.lk",
        "/Subject": "Offline Umrah guide: step-by-step rites, packing checklist, pre-departure checklist",
    })

    with open(OUTPUT_PATH, "wb") as f:
        writer.write(f)

    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
