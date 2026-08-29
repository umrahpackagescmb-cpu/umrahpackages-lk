import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { PrayerTimesWidget } from "@/components/islamic/prayer-times-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Prayer Times Today — Fajr, Dhuhr, Asr, Maghrib, Isha",
  description: "Accurate Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any Sri Lankan city, Makkah, Madinah, or your current location — free, no account needed.",
  alternates: { canonical: "/islamic-tools/prayer-times" },
  keywords: ["prayer times", "salah times", "namaz time", "fajr time", "maghrib time", "prayer times sri lanka", "prayer times makkah"],
};

const faqs = [
  {
    question: "How are prayer times calculated?",
    answer: "Prayer times are calculated from your location's latitude, longitude and date using standard astronomical formulas for the five daily prayers — the same method used by most prayer time apps and mosque calendars.",
  },
  {
    question: "Can I check prayer times for Makkah, Madinah, or other countries?",
    answer: "Yes — Sri Lanka is the default, but the \"Other Countries\" filter lets you pick any country and city worldwide, including Makkah and Madinah, which is especially useful if you're finalizing your Umrah itinerary and want to plan around prayer times at the Haramain.",
  },
  {
    question: "Why might these times differ slightly from my local mosque?",
    answer: "Small differences (usually a few minutes) can occur between calculation methods, especially for Fajr and Isha. If your mosque publishes its own timetable, that's the more authoritative source for congregational prayer.",
  },
];

export default function PrayerTimesPage() {
  return (
    <ToolShell
      eyebrow="Never miss a prayer"
      title="Prayer Times"
      description="Fajr, Dhuhr, Asr, Maghrib and Isha — Sri Lanka by default, or any other country worldwide, plus your current location."
    >
      <PrayerTimesWidget />

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Whether you&rsquo;re at home in Colombo, Kandy, or Galle, or already
        in Makkah for Umrah, knowing accurate prayer times helps you plan
        your day around the five daily prayers. Switch to the &ldquo;Other
        Countries&rdquo; filter for any country and city worldwide, or use
        your current location for times that update automatically.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/prayer-times" />
    </ToolShell>
  );
}
