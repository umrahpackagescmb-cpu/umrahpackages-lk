import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { PrayerTrackerWidget } from "@/components/islamic/prayer-tracker-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Daily Prayer Tracker — Check Off Fajr, Dhuhr, Asr, Maghrib & Isha",
  description:
    "A simple daily prayer tracker for the five daily prayers — tick off Fajr, Dhuhr, Asr, Maghrib and Isha as you pray them and see how many you've completed today. Free, no account needed.",
  alternates: { canonical: "/islamic-tools/prayer-tracker" },
  keywords: [
    "prayer tracker",
    "salah tracker",
    "daily prayer checklist",
    "namaz tracker",
    "five daily prayers checklist",
  ],
};

const faqs = [
  {
    question: "Is my data saved?",
    answer:
      "Yes — today's ticks are saved automatically on your own device and browser only, so they'll still be there if you close the page and come back later today. It isn't stored anywhere else, shared, or tied to any account.",
  },
  {
    question: "Does it track my streak across multiple days?",
    answer:
      "No — this is deliberately a same-day tracker. It shows today's five prayers and resets automatically at the start of each new day, without keeping a history or a day-to-day streak.",
  },
  {
    question: "Will my ticks show up if I open this on my phone and my laptop?",
    answer:
      "No — the tracker is stored only in the browser you're using, on that one device. Ticking a prayer off on your phone won't update the same page open on a laptop or another device.",
  },
  {
    question: "How do I know the exact time for each prayer?",
    answer:
      "This tracker deliberately keeps to general time-of-day windows. For exact times based on your location, use our Prayer Times tool.",
  },
  {
    question: "What if I accidentally tick the wrong prayer?",
    answer:
      "Just tap it again to untick it. If you want to start today over completely, use the \"Reset today\" button.",
  },
];

export default function PrayerTrackerPage() {
  return (
    <ToolShell
      eyebrow="Stay consistent"
      title="Daily Prayer Tracker"
      description="Tick off Fajr, Dhuhr, Asr, Maghrib and Isha as you pray them today, and see how many you've completed."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Daily Prayer Tracker — Check Off Fajr, Dhuhr, Asr, Maghrib & Isha",
          description:
            "A simple daily prayer tracker for the five daily prayers — tick off Fajr, Dhuhr, Asr, Maghrib and Isha as you pray them and see how many you've completed today. Free, no account needed.",
          url: "/islamic-tools/prayer-tracker",
        })}
      />

      <p className="text-sm text-muted-foreground">
        A simple way to keep yourself accountable through the day — tick off each of the five daily
        prayers as you complete them and watch the count fill in. Need exact prayer times for your
        location, or a reminder of how to pray? See our{" "}
        <Link href="/islamic-tools/prayer-times" className="font-medium text-brand-navy underline underline-offset-2">
          Prayer Times
        </Link>{" "}
        tool and{" "}
        <Link href="/islamic-tools/salah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Salah Guide
        </Link>
        .
      </p>

      <div className="mt-8">
        <PrayerTrackerWidget />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/prayer-tracker" />
    </ToolShell>
  );
}
