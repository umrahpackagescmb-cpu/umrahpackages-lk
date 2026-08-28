import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { HijriConverterWidget } from "@/components/islamic/hijri-converter-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Hijri Date Converter — Gregorian to Islamic Date",
  description: "Convert any date between the Gregorian and Islamic (Hijri) calendars, in either direction — useful for birthdays, anniversaries, and Islamic occasions.",
  alternates: { canonical: "/islamic-tools/hijri-converter" },
  keywords: ["hijri date converter", "gregorian to hijri", "hijri to gregorian", "islamic date converter"],
};

const faqs = [
  {
    question: "Can I convert a Hijri date back to Gregorian?",
    answer: "Yes — this converter works in both directions. Enter a Gregorian date to see its Hijri equivalent, or enter a Hijri date to see the matching Gregorian date.",
  },
  {
    question: "Why would I need to convert a date?",
    answer: "Common reasons include finding the Gregorian date of an Islamic anniversary each year (since the Hijri calendar shifts against the Gregorian one), working out someone's Hijri birth date, or planning around a specific Islamic date like the start of Ramadan or Dhu al-Hijjah.",
  },
  {
    question: "How accurate is this converter?",
    answer: "It uses the standard tabular Islamic calendar calculation, which is accurate for planning purposes but can differ by a day from a date confirmed by moon sighting.",
  },
];

export default function HijriConverterPage() {
  return (
    <ToolShell
      eyebrow="Date conversion"
      title="Hijri Date Converter"
      description="Convert any date between the Gregorian and Hijri calendars, in either direction."
    >
      <HijriConverterWidget />

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hijri-converter" />
    </ToolShell>
  );
}
