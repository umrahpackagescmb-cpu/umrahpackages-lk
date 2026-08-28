import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Info } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Offline Umrah Guide (PDF) — Free Download",
  description:
    "A free, printable PDF covering the full step-by-step Umrah sequence with duas, a complete packing checklist, and a pre-departure checklist — no internet needed once downloaded.",
  alternates: { canonical: "/islamic-tools/offline-pdf-guide" },
  keywords: [
    "umrah guide pdf",
    "umrah checklist pdf",
    "offline umrah guide",
    "printable umrah guide",
    "umrah pdf download",
  ],
};

const included = [
  { title: "Step-by-Step Umrah Guide", detail: "All 9 steps from Ihram to Halq/Taqsir, with Arabic duas, transliteration and translation." },
  { title: "Ihram Rules & Restrictions", detail: "A condensed summary of what applies to everyone, and what's specific to men and women." },
  { title: "Umrah Packing Checklist", detail: "Every item across all traveler profiles, ready to tick off as you pack." },
  { title: "Pre-Departure Checklist", detail: "Documents, health, money, connectivity and home admin to sort out before you fly." },
];

const faqs = [
  {
    question: "Will this stay up to date?",
    answer:
      "It's a snapshot generated from the same content as the live site, but a downloaded PDF can't update itself. For anything that changes — weather, currency rates, or edits we make to the guide content — the live Islamic Tools pages are always the current version. Re-download the PDF every so often if you want the latest snapshot.",
  },
  {
    question: "Do I need an internet connection to use it?",
    answer:
      "No — once it's downloaded to your phone or printed out, you can read it entirely offline, which is handy for the flight or for moments in Makkah and Madinah when you'd rather not rely on data or WiFi.",
  },
  {
    question: "Is this a substitute for my agency's briefing?",
    answer:
      "No — please still attend your agency's pre-departure and on-ground briefings. This PDF is a helpful companion, not a replacement for guidance from your agency's coordinator or a scholar.",
  },
  {
    question: "Can I print it?",
    answer:
      "Yes — it's laid out for standard A4 printing, with page numbers and clear section breaks, so it prints cleanly as a booklet if you'd like a physical copy.",
  },
];

export default function OfflinePdfGuidePage() {
  return (
    <ToolShell
      eyebrow="Take it with you"
      title="Offline Umrah Guide (PDF)"
      description="A free, printable PDF covering the full Umrah sequence, packing list and pre-departure checklist — no internet needed."
    >
      <Card className="items-center gap-5 py-10 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <FileText className="size-7" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-brand-navy">The Complete Umrah Guide</p>
          <p className="mt-1 text-sm text-muted-foreground">10 pages · PDF · ~1.1 MB</p>
        </div>
        <Button variant="gold" size="lg" asChild>
          <a href="/downloads/umrah-offline-guide.pdf" download>
            <Download className="size-4" /> Download the PDF
          </a>
        </Button>
      </Card>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">What&rsquo;s inside</h2>
      <div className="mt-4 flex flex-col gap-4">
        {included.map((item) => (
          <Card key={item.title} className="flex-row items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-dark">
              <FileText className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-navy">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-brand-gold/30 bg-brand-gold/5">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Info className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
          <p className="text-sm text-muted-foreground">
            This PDF is a snapshot for offline reference, generated from the same content as our{" "}
            <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
              Step-by-Step Umrah Guide
            </Link>
            ,{" "}
            <Link href="/islamic-tools/packing-checklist" className="font-medium text-brand-navy underline underline-offset-2">
              Packing Checklist
            </Link>{" "}
            and{" "}
            <Link href="/islamic-tools/pre-departure-checklist" className="font-medium text-brand-navy underline underline-offset-2">
              Pre-Departure Checklist
            </Link>{" "}
            tools. For anything time-sensitive — weather, currency rates, or the latest edits to the
            guide content — the live pages are always more current than a downloaded file.
          </p>
        </CardContent>
      </Card>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/offline-pdf-guide" />
    </ToolShell>
  );
}
