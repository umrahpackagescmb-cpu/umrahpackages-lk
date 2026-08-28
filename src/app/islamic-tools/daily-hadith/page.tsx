import type { Metadata } from "next";
import { ScrollText } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { WhatsAppCommunityGate } from "@/components/islamic/whatsapp-community-gate";
import { hadithOfTheDay } from "@/lib/islamic/hadith";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Daily Hadith — Hadith of the Day",
  description: "A new, widely-cited hadith of the Prophet Muhammad ﷺ each day — free, refreshes daily, with a WhatsApp option for daily updates.",
  alternates: { canonical: "/islamic-tools/daily-hadith" },
  keywords: ["hadith of the day", "daily hadith", "hadith today", "islamic hadith"],
};

const faqs = [
  {
    question: "Where do these hadith come from?",
    answer: "The hadith shown are widely-cited narrations commonly referenced in Islamic teaching. For scholarly or print use, always verify the exact wording and authenticity grading against a primary source such as sunnah.com.",
  },
  {
    question: "Does the hadith change every day?",
    answer: "Yes — a new hadith is shown each day, so checking back regularly gives you a rotating set to reflect on.",
  },
  {
    question: "Can I get these on WhatsApp instead of visiting the site?",
    answer: "Yes — enter your number below to join our WhatsApp Community and receive daily hadith and Qur'an verses directly. It's a Community, not a group, so your number stays private from other members.",
  },
];

export default function DailyHadithPage() {
  const hadith = hadithOfTheDay();

  return (
    <ToolShell
      eyebrow="Today's hadith"
      title="Daily Hadith"
      description="A fresh, widely-cited hadith every day."
    >
      <Card className="items-center gap-5 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <ScrollText className="size-6" />
        </div>
        <p className="max-w-md text-lg leading-relaxed text-foreground">&ldquo;{hadith.text}&rdquo;</p>
        <p className="text-sm font-medium text-brand-gold">{hadith.source}</p>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Wordings shown are common English renderings. Please verify against
        a primary source such as sunnah.com before print or scholarly use.
      </p>

      <div className="mt-8">
        <WhatsAppCommunityGate source="daily-hadith" />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/daily-hadith" />
    </ToolShell>
  );
}
