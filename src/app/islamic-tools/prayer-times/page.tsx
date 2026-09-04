import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { PrayerTimesWidget } from "@/components/islamic/prayer-times-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

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
      <JsonLd
        data={softwareApplicationSchema({
          name: "Prayer Times Today — Fajr, Dhuhr, Asr, Maghrib, Isha",
          description:
            "Accurate Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any Sri Lankan city, Makkah, Madinah, or your current location — free, no account needed.",
          url: "/islamic-tools/prayer-times",
        })}
      />

      <PrayerTimesWidget />

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            How these prayer times are calculated
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Prayer times here are fetched live from the Aladhan API, which works out each of the
            five daily prayers from your location&rsquo;s latitude, longitude and the sun&rsquo;s
            position on that specific date. Most locations use the Muslim World League (MWL)
            method, a widely used global standard. If your city or coordinates fall within Saudi
            Arabia, the calculation automatically switches to the Umm Al-Qura University, Makkah
            method instead — the Kingdom&rsquo;s own official method, which fixes Isha at a set
            interval after Maghrib rather than estimating it from the sun&rsquo;s angle below the
            horizon. The two methods can genuinely disagree by close to twenty minutes on Isha for
            the same coordinates, which is exactly why getting the right method for the right
            country matters for pilgrims specifically.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Why times shift from day to day
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Because prayer times are tied to the sun&rsquo;s position rather than a fixed clock,
            each of Fajr, Dhuhr, Asr, Maghrib and Isha creeps a little earlier or later almost
            every day of the year. How much they move also changes with the seasons — the shift is
            most noticeable around the solstices and smallest near the equinoxes, and it becomes
            more pronounced the further a location sits from the equator. That&rsquo;s why a single
            printed time doesn&rsquo;t stay accurate for long, and why this tool recalculates fresh
            from today&rsquo;s date every time you load it.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Getting accurate times for your own location
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Use the Sri Lanka tab for a quick pick from major cities, the &ldquo;Other
            Countries&rdquo; tab to search any country and city worldwide (including Makkah and
            Madinah, useful for planning your Umrah itinerary before or after departure), or
            &ldquo;My Location&rdquo; to fetch times for exactly where you&rsquo;re standing via
            your device&rsquo;s GPS. Re-check whenever you actually change location — travelling
            between Sri Lanka and Saudi Arabia, or between cities within Saudi Arabia, shifts your
            times more than the daily drift does. Once you land, your own mosque or hotel&rsquo;s
            printed timetable is the more authoritative source for congregational prayer.
          </p>
        </div>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/prayer-times" />
    </ToolShell>
  );
}
