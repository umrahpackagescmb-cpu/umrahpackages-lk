import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages } from "@/lib/data";
import { formatLkr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Umrah Cost from Sri Lanka",
  description:
    "How much does Umrah cost from Sri Lanka? Real, current price data from packages listed on UmrahPackages.lk, plus what drives the price up or down.",
  alternates: { canonical: "/umrah-cost-sri-lanka" },
};

export default async function UmrahCostSriLankaPage() {
  const packages = await getPackages();
  const prices = packages.map((p) => p.priceLkr).sort((a, b) => a - b);
  const durations = packages.map((p) => p.durationDays);
  const min = prices[0];
  const max = prices[prices.length - 1];
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);

  return (
    <>
      <PageHeader
        eyebrow="Real, current pricing"
        title="How Much Does Umrah Cost from Sri Lanka?"
        description="Live figures computed from the actual packages currently listed on UmrahPackages.lk — not estimates."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Umrah Cost" }]}
      />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lowest listed price</p>
            <p className="mt-2 font-display text-2xl font-bold text-brand-navy">{formatLkr(min)}</p>
          </Card>
          <Card className="items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Average listed price</p>
            <p className="mt-2 font-display text-2xl font-bold text-brand-navy">{formatLkr(avg)}</p>
          </Card>
          <Card className="items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Highest listed price</p>
            <p className="mt-2 font-display text-2xl font-bold text-brand-navy">{formatLkr(max)}</p>
          </Card>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Based on {packages.length} package{packages.length === 1 ? "" : "s"} currently listed by Sri Lankan
          agencies on this platform, ranging {minDuration}–{maxDuration} days. Figures update automatically as
          agencies add or change listings — this isn&rsquo;t a fixed estimate.
        </p>

        <div className="mt-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-brand-navy">What actually drives the price</h2>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            The package price itself typically bundles visa processing, return flights, hotel accommodation in
            Makkah and Madinah, and ground transport between the two cities. The biggest swing factors between a
            {" "}{formatLkr(min)} package and a {formatLkr(max)} one are usually: how close the hotels are to the
            Haram (walking distance costs noticeably more than a shuttle-bus distance), trip length (more nights
            means more hotel cost), meal plan (full board vs. room-only), and airline. Two packages priced close
            together can still differ a lot on these — always ask the agency for the exact hotel name and distance,
            not just a star rating.
          </p>
          <h2 className="mt-8 font-display text-xl font-bold text-brand-navy">Costs not usually included</h2>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            Most listed package prices don&rsquo;t include: your Saudi eSIM or local SIM, meals outside the hotel&rsquo;s
            included plan, Ziyarah (historical site tour) fees if not bundled in, personal shopping, and travel
            insurance. Always confirm what&rsquo;s included in writing before paying an agency anything.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/packages">Compare all current packages</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/islamic-tools/umrah-budget-calculator">Use the Umrah Budget Calculator</Link>
          </Button>
        </div>

        <ToolFaq
          heading="Umrah cost — frequently asked questions"
          items={[
            {
              question: "What is the average cost of Umrah from Sri Lanka?",
              answer: `Based on packages currently listed on UmrahPackages.lk, the average price is around ${formatLkr(avg)} per person, ranging from ${formatLkr(min)} to ${formatLkr(max)} depending on hotel distance, trip length, and season. These figures update as agencies change their listings.`,
            },
            {
              question: "Does the package price include the visa?",
              answer:
                "Most Sri Lankan agency packages bundle Umrah visa processing into the price, but always confirm this explicitly with the agency — it's one of the first things to check before paying.",
            },
            {
              question: "How can I reduce my Umrah cost?",
              answer:
                "Booking further in advance, travelling outside Ramadan and December peak periods, choosing a larger group departure over a private one, and picking a hotel a short shuttle ride (rather than walking distance) from the Haram are the main ways to lower cost without cutting corners on safety.",
            },
          ]}
        />
      </div>
    </>
  );
}
