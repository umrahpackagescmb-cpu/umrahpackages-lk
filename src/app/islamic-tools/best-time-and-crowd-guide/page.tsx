import type { Metadata } from "next";
import Link from "next/link";
import { Info, Clock3 } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  seasonGuides,
  tawafSaiTimeRanges,
  type CrowdLevel,
  type PriceImpact,
} from "@/lib/islamic/best-time-guide";

export const metadata: Metadata = {
  title: "Best Time & Crowd Guide — When Is Umrah Least Crowded?",
  description:
    "A season-by-season guide to typical Umrah crowd levels and pricing — Ramadan, the post-Hajj months, winter and summer — based on well-known annual patterns, not live data.",
  alternates: { canonical: "/islamic-tools/best-time-and-crowd-guide" },
  keywords: [
    "best time for umrah",
    "umrah crowd levels",
    "when is umrah least crowded",
    "cheapest time to do umrah",
    "umrah crowd guide",
    "tawaf sai duration",
  ],
};

function crowdBadgeVariant(level: CrowdLevel) {
  switch (level) {
    case "Very High":
      return "default" as const;
    case "High":
      return "goldOutline" as const;
    case "Moderate":
      return "muted" as const;
    case "Low":
      return "success" as const;
  }
}

function priceBadgeVariant(impact: PriceImpact) {
  switch (impact) {
    case "Higher":
      return "default" as const;
    case "Average":
      return "muted" as const;
    case "Lower":
      return "success" as const;
  }
}

const faqs = [
  {
    question: "Does this show live crowd levels right now?",
    answer:
      "No. There is no public live feed of actual crowd counts in Makkah or Madinah for a site like this to draw on, so this guide does not — and cannot honestly — show real-time crowd levels. Everything below is based on well-known, recurring annual patterns: Ramadan, the Hajj season, and school holidays, which repeat predictably every year even though the exact Gregorian dates shift.",
  },
  {
    question: "Is Ramadan worth the crowds?",
    answer:
      "Many pilgrims feel strongly that it is — performing Umrah during Ramadan, and especially during the last 10 nights, carries deep spiritual significance for those who seek it out despite the crowding. It comes down to your own priorities: if a calmer, more spacious experience matters more to you than the specific timing, the post-Hajj months or general winter are usually more comfortable.",
  },
  {
    question: "When is generally cheapest?",
    answer:
      "The post-Hajj months (roughly Muharram-Safar) and general summer tend to see lower package prices, largely because demand is lower outside Ramadan and school holiday periods. Actual prices vary by agency and year, so use our budget calculator and compare current listings on this site rather than relying on season alone.",
  },
  {
    question: "How accurate are the Tawaf and Sa'i time ranges?",
    answer:
      "They're rough, commonly-reported educational ranges, not a personalised estimate or a measurement. Your actual time will depend heavily on your own pace, health and mobility, group size, and the real conditions on the day — some pilgrims move much faster or slower than the ranges below, and that's normal.",
  },
];

export default function BestTimeAndCrowdGuidePage() {
  return (
    <ToolShell
      eyebrow="Plan around the calendar"
      title="Best Time & Crowd Guide"
      description="A season-by-season look at typical crowd levels and pricing for Umrah, based on well-known recurring annual patterns."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        There&rsquo;s no single &ldquo;best&rdquo; time to perform Umrah — it depends on what
        you&rsquo;re optimising for. Some pilgrims specifically want the spiritual atmosphere of
        Ramadan and are happy to accept the crowds that come with it; others would rather trade
        that atmosphere for a calmer, more spacious Tawaf and a lower price. This guide lays out
        the trade-offs by season so you can decide for yourself, and compare it against current{" "}
        <Link href="/packages" className="font-medium text-brand-navy underline underline-offset-2">
          Umrah packages
        </Link>{" "}
        on this site.
      </p>

      <Card className="mt-6 flex-row items-start gap-3 border-brand-gold/30 bg-brand-gold/5">
        <Info className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
        <div>
          <p className="text-sm font-semibold text-brand-navy">
            This is not a live crowd meter
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything on this page is based on well-known, recurring annual patterns — Ramadan,
            the Hajj season, and school holidays — not real-time crowd sensors or a live feed.
            There is no publicly available real-time crowd data for Makkah or Madinah, so treat
            every crowd level and price impact below as a general, qualitative rule of thumb for
            planning purposes, not a measurement of current conditions.
          </p>
        </div>
      </Card>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">
        Season-by-season comparison
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {seasonGuides.map((season) => (
          <Card key={season.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-semibold text-brand-navy">
                  {season.name}
                </p>
                <p className="text-xs text-muted-foreground">{season.monthsLabel}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={crowdBadgeVariant(season.crowdLevel)}>
                  Crowds: {season.crowdLevel}
                </Badge>
                <Badge variant={priceBadgeVariant(season.priceImpact)}>
                  Prices: {season.priceImpact}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{season.weatherNote}</p>
            <p className="text-sm text-foreground">
              <span className="font-medium text-brand-navy">Best for: </span>
              {season.bestFor}
            </p>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        &ldquo;Prices&rdquo; here reflects the typical direction of package pricing for that
        season, not a specific figure — always compare current listings on this site, since
        pricing varies by agency, hotel distance, and year.
      </p>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">
        How long does Tawaf and Sa&rsquo;i typically take?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        A common question for first-time pilgrims is how long the full Tawaf (7 circuits of the
        Kaaba) and Sa&rsquo;i (7 legs between Safa and Marwah) sequence takes. The honest answer
        is: it depends enormously on the crowd on the day. Below are rough, commonly-reported
        educational ranges — not a personalised calculator, and not a precise or measured figure.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {tawafSaiTimeRanges.map((t) => (
          <Card key={t.id} className="flex-row items-start gap-3">
            <Clock3 className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
            <div>
              <p className="text-sm font-semibold text-brand-navy">
                {t.label} — <span className="font-normal text-foreground">{t.range}</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        These ranges vary hugely by your own pace, health and mobility, whether you&rsquo;re
        moving with young children or elderly family members, and the actual conditions on the
        day. Treat them as a rough sense of scale for planning your schedule, not a promise.
      </p>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Whichever season you travel, check our{" "}
        <Link href="/islamic-tools/makkah-madinah-weather" className="font-medium text-brand-navy underline underline-offset-2">
          Makkah &amp; Madinah weather guide
        </Link>{" "}
        closer to your dates, and use the{" "}
        <Link href="/islamic-tools/umrah-budget-calculator" className="font-medium text-brand-navy underline underline-offset-2">
          budget calculator
        </Link>{" "}
        to plan the full cost of your trip, not just the package price.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/best-time-and-crowd-guide" />
    </ToolShell>
  );
}
