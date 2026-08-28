import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { CurrencyConverterWidget } from "@/components/islamic/currency-converter-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

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
      <p className="text-sm text-muted-foreground">
        Working out how much Saudi Riyal spending money to carry for your Umrah trip starts with
        knowing today&rsquo;s exchange rate. This tool converts between LKR, SAR and USD using a
        live, daily-updated rate feed, plus a quick 7-day trend so you can see whether the rate has
        been moving before you exchange a large amount.
      </p>

      <div className="mt-8">
        <CurrencyConverterWidget />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/currency-converter" />
    </ToolShell>
  );
}
