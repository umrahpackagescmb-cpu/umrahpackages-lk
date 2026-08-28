import type { Metadata } from "next";
import { Hand } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { duaOfTheDay } from "@/lib/islamic/duas";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Dua of the Day — Islamic Supplications",
  description: "A new dua (supplication) each day, shown in Arabic with transliteration and English translation — free, refreshes daily.",
  alternates: { canonical: "/islamic-tools/dua-of-the-day" },
  keywords: ["dua of the day", "islamic dua", "daily dua", "dua with transliteration"],
};

const faqs = [
  {
    question: "Does the dua change every day?",
    answer: "Yes — a new dua is shown each day, covering different everyday occasions so you build up a set you can memorize over time.",
  },
  {
    question: "Is the transliteration accurate for pronunciation?",
    answer: "It's a helpful guide for pronunciation, but transliteration can never fully capture Arabic sounds. If you're learning a dua to recite, it's best to also listen to a qualified reciter.",
  },
  {
    question: "Can I use these for print materials like a wedding card or event program?",
    answer: "You're welcome to reference them, but please double-check the Arabic diacritics and translation against a printed dua book first, since accuracy matters for anything printed and distributed.",
  },
];

export default function DuaOfTheDayPage() {
  const dua = duaOfTheDay();

  return (
    <ToolShell
      eyebrow="Today's dua"
      title="Dua of the Day"
      description="A fresh supplication every day, with transliteration and translation."
    >
      <Card className="items-center gap-5 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <Hand className="size-6" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">{dua.title}</p>
        <p dir="rtl" lang="ar" className="font-display text-2xl leading-relaxed text-brand-navy">
          {dua.arabic}
        </p>
        <p className="max-w-md text-sm italic text-muted-foreground">{dua.transliteration}</p>
        <p className="max-w-md text-base text-foreground">&ldquo;{dua.translation}&rdquo;</p>
        <p className="text-xs text-muted-foreground">{dua.occasion}</p>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Please verify Arabic diacritics and translation against a printed
        dua book before relying on this for print materials.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/dua-of-the-day" />
    </ToolShell>
  );
}
