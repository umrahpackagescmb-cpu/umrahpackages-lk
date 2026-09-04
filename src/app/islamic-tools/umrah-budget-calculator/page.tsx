import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { UmrahBudgetWidget } from "@/components/islamic/umrah-budget-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Umrah Budget & Hidden Cost Calculator — Total Trip Cost Estimator",
  description:
    "Estimate your full Umrah trip cost beyond the package price — food, laundry, Saudi SIM/data, local transport, shopping and extra luggage fees, all editable to your own habits.",
  alternates: { canonical: "/islamic-tools/umrah-budget-calculator" },
  keywords: [
    "umrah budget calculator",
    "umrah hidden costs",
    "umrah trip cost estimator",
    "umrah food and transport budget",
    "saudi sim card umrah",
    "umrah shopping and luggage costs",
  ],
};

const faqs = [
  {
    question: "Does this include my package price?",
    answer: "Yes — enter your package price per person and it's added to the total alongside the daily and one-time costs below. If you haven't chosen a package yet, browse listings on this site and use a typical price as your starting point, then update it once you've decided.",
  },
  {
    question: "Are these exact prices?",
    answer: "No. Every figure in this calculator — food, transport, laundry, SIM card, shopping, luggage and the rest — is a typical starting estimate, not a verified price. Costs vary by season, hotel location, personal habits and current exchange rates, so adjust every field to match your own expectations before relying on the total.",
  },
  {
    question: "What about Hajj or Qurbani costs?",
    answer: "This tool is built around Umrah, not Hajj, so Hajj-specific fees aren't included. Qurbani is included as an optional toggle with a rough estimate, since some pilgrims choose to arrange it during their trip — tick the box and adjust the amount if it applies to you.",
  },
];

export default function UmrahBudgetCalculatorPage() {
  return (
    <ToolShell
      eyebrow="Plan your trip costs"
      title="Umrah Budget & Hidden Cost Calculator"
      description="Work out your total Umrah trip cost — not just the package price, but the food, transport, laundry, SIM card, shopping and other costs that add up along the way."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Umrah Budget & Hidden Cost Calculator — Total Trip Cost Estimator",
          description:
            "Estimate your full Umrah trip cost beyond the package price — food, laundry, Saudi SIM/data, local transport, shopping and extra luggage fees, all editable to your own habits.",
          url: "/islamic-tools/umrah-budget-calculator",
        })}
      />

      <p className="mb-6 text-sm text-muted-foreground">
        Most pilgrims budget for the package price and stop there — but food,
        local transport, laundry, a Saudi SIM card, shopping and extra
        luggage fees can quietly add a significant amount on top. This
        calculator lays out a full worksheet so you can plan for the whole
        trip, not just the headline price. Every default below is a typical
        starting estimate, not a verified cost — adjust each field to match
        your own package and spending habits.
      </p>

      <UmrahBudgetWidget />

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/umrah-budget-calculator" />
    </ToolShell>
  );
}
