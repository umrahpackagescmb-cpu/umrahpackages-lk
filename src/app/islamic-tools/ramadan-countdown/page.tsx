import type { Metadata } from "next";
import { Moon } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { HIJRI_MONTHS, daysUntil, formatHijri, gregorianToHijri, nextHijriOccurrence } from "@/lib/islamic/hijri";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Ramadan Countdown — Days Until Ramadan",
  description: "See exactly how many days remain until the start of Ramadan, with the expected Gregorian date, updated automatically each day.",
  alternates: { canonical: "/islamic-tools/ramadan-countdown" },
  keywords: ["ramadan countdown", "when is ramadan", "days until ramadan", "ramadan start date"],
};

const faqs = [
  {
    question: "Why is the Ramadan start date an estimate?",
    answer: "Ramadan begins with the sighting of the new moon of the month of Ramadan, which is confirmed closer to the date by religious authorities and moon-sighting committees. This countdown uses the calculated (tabular) Islamic calendar, so the actual start may shift by a day.",
  },
  {
    question: "Does Ramadan fall on the same date every year?",
    answer: "No — because the Hijri calendar is lunar, Ramadan moves earlier by about 10-11 days each Gregorian year, cycling through all four seasons over roughly 33 years.",
  },
  {
    question: "Is it a good time to plan Umrah around Ramadan?",
    answer: "Performing Umrah during Ramadan is considered especially rewarding by many, which also makes it one of the busiest and most sought-after times to travel — worth booking well in advance if that's your plan.",
  },
];

export default function RamadanCountdownPage() {
  const today = new Date();
  const currentHijri = gregorianToHijri(today);
  const isRamadanNow = currentHijri.hm === 9;

  const ramadanStart = nextHijriOccurrence(9, 1, today);
  const days = daysUntil(ramadanStart, today);
  const ramadanHijriYear = gregorianToHijri(ramadanStart).hy;

  return (
    <ToolShell
      eyebrow="Countdown"
      title="Ramadan Countdown"
      description={`Days remaining until the start of Ramadan ${ramadanHijriYear} AH.`}
    >
      <Card className="items-center gap-4 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <Moon className="size-6" />
        </div>

        {isRamadanNow ? (
          <>
            <p className="font-display text-3xl font-bold text-brand-navy">Ramadan Mubarak!</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              We are currently in the blessed month of Ramadan ({currentHijri.hy} AH).
              May your fasts and prayers be accepted.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-5xl font-bold text-brand-navy">{days}</p>
            <p className="text-sm text-muted-foreground">
              day{days === 1 ? "" : "s"} until Ramadan begins
            </p>
            <p className="text-sm font-medium text-brand-navy">
              Expected to start around {ramadanStart.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground">
              ({formatHijri({ hy: ramadanHijriYear, hm: 9, hd: 1 })})
            </p>
          </>
        )}
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Dates are estimated using the tabular Islamic calendar. The actual
        start of Ramadan is confirmed by moon sighting and may shift by a
        day. Currently {HIJRI_MONTHS[currentHijri.hm - 1]} {currentHijri.hy} AH.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/ramadan-countdown" />
    </ToolShell>
  );
}
