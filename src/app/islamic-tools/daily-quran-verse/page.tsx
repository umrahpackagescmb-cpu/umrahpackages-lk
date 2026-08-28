import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { WhatsAppCommunityGate } from "@/components/islamic/whatsapp-community-gate";
import { verseOfTheDay } from "@/lib/islamic/quran";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Daily Quran Verse — Ayah of the Day",
  description: "A new Qur'an verse (ayah) each day, shown in Arabic with an English translation and reference — free, refreshes daily, with a WhatsApp option for daily updates.",
  alternates: { canonical: "/islamic-tools/daily-quran-verse" },
  keywords: ["quran verse of the day", "daily ayah", "quran verse today", "islamic verse of the day"],
};

const faqs = [
  {
    question: "Does the verse change every day?",
    answer: "Yes — a new verse (ayah) is shown each day, so checking back daily gives you a rotating set of verses to reflect on.",
  },
  {
    question: "Can I get these on WhatsApp instead of visiting the site?",
    answer: "Yes — enter your number below to join our WhatsApp Community and receive daily Qur'an verses and hadith directly. It's a Community, not a group, so your number stays private from other members.",
  },
  {
    question: "Which translation is used?",
    answer: "The translations shown are reference-style renderings meant for daily reflection. For study, memorization, or print use, please verify the exact wording against a published translation such as Sahih International.",
  },
];

export default function DailyQuranVersePage() {
  const verse = verseOfTheDay();

  return (
    <ToolShell
      eyebrow="Today's ayah"
      title="Daily Quran Verse"
      description="A fresh verse from the Qur'an every day."
    >
      <Card className="items-center gap-5 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <BookOpen className="size-6" />
        </div>
        <p dir="rtl" lang="ar" className="font-display text-2xl leading-relaxed text-brand-navy">
          {verse.arabic}
        </p>
        <p className="max-w-md text-base text-foreground">&ldquo;{verse.translation}&rdquo;</p>
        <p className="text-sm font-medium text-brand-gold">{verse.reference}</p>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Translations shown are reference-style renderings. For study or
        print use, please verify against a published translation such as
        Sahih International.
      </p>

      <div className="mt-8">
        <WhatsAppCommunityGate source="daily-quran-verse" />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/daily-quran-verse" />
    </ToolShell>
  );
}
