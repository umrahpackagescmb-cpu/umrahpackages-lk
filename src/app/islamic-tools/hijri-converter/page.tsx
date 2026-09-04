import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { HijriConverterWidget } from "@/components/islamic/hijri-converter-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

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
      <JsonLd
        data={softwareApplicationSchema({
          name: "Hijri Date Converter — Gregorian to Islamic Date",
          description:
            "Convert any date between the Gregorian and Islamic (Hijri) calendars, in either direction — useful for birthdays, anniversaries, and Islamic occasions.",
          url: "/islamic-tools/hijri-converter",
        })}
      />

      <HijriConverterWidget />

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            What the Hijri calendar is
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The Hijri calendar is the Islamic lunar calendar, counted from the year of the Prophet
            Muhammad&rsquo;s ﷺ migration (Hijrah) from Makkah to Madinah. It has twelve months —
            Muharram, Safar, Rabi al-awwal, and so on through to Dhu al-Hijjah — each lasting 29 or
            30 days depending on the moon&rsquo;s cycle, rather than a fixed number of days as in
            the Gregorian calendar. A full Hijri year runs to roughly 354–355 days, since it tracks
            twelve lunar months rather than the Earth&rsquo;s orbit around the sun.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Why it drifts against the Gregorian calendar
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Because a Hijri year is about eleven days shorter than a Gregorian solar year, Islamic
            dates move steadily earlier against the Gregorian calendar year after year — Ramadan,
            Dhu al-Hijjah (and the Hajj/Umrah season with it), and every other Hijri month cycle
            through all four Gregorian seasons over roughly 33 years. This is also part of why the
            exact start of a Hijri month can vary by a day between countries: some communities
            confirm a new month by local moon sighting, while others — including Saudi Arabia&rsquo;s
            own Umm al-Qura calendar, and the tabular calculation this converter uses — rely on
            astronomical or tabular calculation instead, and the two methods don&rsquo;t always land
            on the same day.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Why pilgrims and Muslims need to convert dates
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Common practical reasons include confirming a Hijri date of birth, working out which
            Gregorian date an Islamic occasion (Ramadan, Eid, Dhu al-Hijjah, or a personal Islamic
            anniversary) falls on this particular year, planning Umrah or Hajj travel around a
            specific Hijri month, or checking a document or visa that&rsquo;s dated in Hijri. Because
            Hijri dates shift roughly eleven days earlier every Gregorian year, a date you noted last
            year won&rsquo;t line up this year — this tool recalculates fresh in both directions so
            you don&rsquo;t have to do the arithmetic yourself.
          </p>
        </div>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hijri-converter" />
    </ToolShell>
  );
}
