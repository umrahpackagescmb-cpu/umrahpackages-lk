import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { CurrencyConverterWidget } from "@/components/islamic/currency-converter-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Currency Converter — LKR to SAR & USD for Umrah Travel",
  description:
    "Convert Sri Lankan Rupees to Saudi Riyal and US Dollars with live, daily-updated exchange rates — plan your Umrah spending money and see a 7-day rate trend.",
  alternates: { canonical: "/islamic-tools/currency-converter" },
  keywords: [
    "lkr to sar",
    "sri lankan rupee to saudi riyal",
    "currency converter umrah",
    "lkr to usd",
    "sar to lkr",
    "umrah spending money",
  ],
};

const faqs = [
  {
    question: "How current are these rates?",
    answer:
      "Rates come from a free, publicly maintained feed that updates once a day, so they're a reliable snapshot for planning — but they can drift slightly from the exact rate you'll get at any given moment.",
  },
  {
    question: "Should I exchange currency before I travel or in Saudi Arabia?",
    answer:
      "Both are common. Many travelers carry a small amount of Saudi Riyal (or USD, which is widely accepted for exchange) from home for the first day or two, then exchange more at licensed money changers in Makkah or Madinah, where rates are often competitive. Compare a few options rather than exchanging everything in one place.",
  },
  {
    question: "Is this rate exact enough to use for a bank transfer?",
    answer:
      "No — treat this as a travel-budgeting estimate, not a transaction rate. Banks and money changers apply their own margins and fees on top of the market rate, so always confirm the exact figure with your bank or money changer at the time you actually exchange or transfer money.",
  },
];

export default function CurrencyConverterPage() {
  return (
    <ToolShell
      eyebrow="Budget for Saudi Arabia"
      title="Currency Converter"
      description="Convert between Sri Lankan Rupee, Saudi Riyal and US Dollar with live daily exchange rates."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Currency Converter — LKR to SAR & USD for Umrah Travel",
          description:
            "Convert Sri Lankan Rupees to Saudi Riyal and US Dollars with live, daily-updated exchange rates — plan your Umrah spending money and see a 7-day rate trend.",
          url: "/islamic-tools/currency-converter",
        })}
      />

      <p className="text-sm text-muted-foreground">
        Working out how much Saudi Riyal spending money to carry for your Umrah trip starts with
        knowing today&rsquo;s exchange rate. This tool converts between LKR, SAR and USD using a
        live, daily-updated rate feed, plus a quick 7-day trend so you can see whether the rate has
        been moving before you exchange a large amount.
      </p>

      <div className="mt-8">
        <CurrencyConverterWidget />
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Why live rates matter for Sri Lankan pilgrims specifically
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The Saudi Riyal is pegged to the US Dollar, but the Sri Lankan Rupee floats and can move
            noticeably against both over just a few weeks. That matters because most Sri Lankan
            pilgrims pay for their package in LKR, then separately need to work out how much SAR
            spending money to actually carry for food, shopping, local transport and Ziyarah extras
            once they land in Makkah or Madinah. A rate that looked reasonable when you first
            budgeted months out can look quite different close to departure, so it&rsquo;s worth
            rechecking with a live converter like this one shortly before you fly, rather than
            relying on a figure from when you first planned the trip.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Where to actually exchange your money
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Compare rates at a couple of licensed money changers in Colombo before you leave rather
            than accepting the first one you find, and keep in mind that airport counters — both in
            Sri Lanka and Saudi Arabia — tend to offer weaker rates than licensed changers in town,
            purely for the convenience of being on-site. Many pilgrims carry a small amount of SAR
            (or USD, which is widely exchangeable) from home to cover the first day or two, then
            exchange the bulk of their spending money at licensed money changers in Makkah or
            Madinah once they arrive, where rates are often competitive — it&rsquo;s worth avoiding
            informal exchangers with no visible licensing wherever you are.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Treat the rate shown here as a planning estimate
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The figure this tool shows is a genuine, daily-updated market rate — not a made-up
            number — but it&rsquo;s still a reference for budgeting rather than the exact rate a
            bank or money changer will actually offer you, since they add their own margin and fees
            on top. For a fuller walkthrough of cash versus cards in Makkah and Madinah, and how to
            structure a daily spending allowance, see our blog post on{" "}
            <Link
              href="/blog/managing-money-on-umrah-currency-and-budgeting"
              className="font-medium text-brand-navy underline underline-offset-2"
            >
              managing money on Umrah
            </Link>
            .
          </p>
        </div>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/currency-converter" />
    </ToolShell>
  );
}
