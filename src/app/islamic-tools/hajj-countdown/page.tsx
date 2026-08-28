import type { Metadata } from "next";
import { Landmark } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { daysUntil, gregorianToHijri, hijriToGregorian, nextHijriOccurrence } from "@/lib/islamic/hijri";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hajj Countdown — Days Until the Day of Arafah",
  description: "See exactly how many days remain until Hajj and the Day of Arafah (9th of Dhu al-Hijjah), with the expected Gregorian date, updated automatically each day.",
  alternates: { canonical: "/islamic-tools/hajj-countdown" },
  keywords: ["hajj countdown", "when is hajj", "day of arafah", "days until hajj", "dhu al-hijjah dates"],
};

const faqs = [
  {
    question: "When does Hajj take place?",
    answer: "Hajj takes place during the first two weeks of Dhu al-Hijjah, the final month of the Islamic calendar, with the Day of Arafah (9 Dhu al-Hijjah) as its central rite.",
  },
  {
    question: "Is this the same as booking a Hajj package?",
    answer: `No — this is a free countdown tool only. ${siteConfig.name} focuses on Umrah packages specifically; for Hajj travel, you'd want to check with agencies directly about their Hajj-specific offerings and the official Hajj quota process.`,
  },
  {
    question: "Why does the date shift every year?",
    answer: "Because the Hijri calendar is lunar, Dhu al-Hijjah — and so Hajj — moves about 10-11 days earlier each Gregorian year.",
  },
];

export default function HajjCountdownPage() {
  const today = new Date();
  const currentHijri = gregorianToHijri(today);
  const isHajjSeasonNow = currentHijri.hm === 12 && currentHijri.hd >= 8 && currentHijri.hd <= 13;

  const arafahDate = nextHijriOccurrence(12, 9, today);
  const arafahHijriYear = gregorianToHijri(arafahDate).hy;
  const hajjStart = hijriToGregorian(arafahHijriYear, 12, 8);
  const days = daysUntil(arafahDate, today);

  return (
    <ToolShell
      eyebrow="Countdown"
      title="Hajj Countdown"
      description="Days remaining until the Day of Arafah, the pinnacle of Hajj."
    >
      <Card className="items-center gap-4 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
          <Landmark className="size-6" />
        </div>

        {isHajjSeasonNow ? (
          <>
            <p className="font-display text-3xl font-bold text-brand-navy">Hajj days are here</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              We are currently within the days of Hajj ({arafahHijriYear} AH).
              May Allah accept the pilgrimage of all who are performing it.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-5xl font-bold text-brand-navy">{days}</p>
            <p className="text-sm text-muted-foreground">
              day{days === 1 ? "" : "s"} until the Day of Arafah (9 Dhu al-Hijjah, {arafahHijriYear} AH)
            </p>
            <p className="text-sm font-medium text-brand-navy">
              Expected around {arafahDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-xs text-muted-foreground">
              Hajj rites typically begin from 8 Dhu al-Hijjah, around{" "}
              {hajjStart.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}.
            </p>
          </>
        )}
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Dates are estimated using the tabular Islamic calendar and may shift
        by a day once confirmed by the Saudi authorities&rsquo; moon
        sighting for Dhu al-Hijjah.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hajj-countdown" />
    </ToolShell>
  );
}
