import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ZakatWidget } from "@/components/islamic/zakat-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Zakat Calculator — Work Out Your Annual Zakat",
  description: "Estimate your annual Zakat (2.5% of net zakatable wealth) with this free calculator — covers cash, gold, investments and debts.",
  alternates: { canonical: "/islamic-tools/zakat-calculator" },
  keywords: ["zakat calculator", "how to calculate zakat", "zakat on gold", "zakat percentage", "nisab calculator"],
};

const faqs = [
  {
    question: "How is Zakat calculated?",
    answer: "Zakat is generally 2.5% of your net zakatable wealth — cash, gold, silver, and eligible investments, minus short-term debts — provided the total is at or above the Nisab threshold and has been held for one lunar year.",
  },
  {
    question: "What is Nisab?",
    answer: "Nisab is the minimum threshold of wealth a Muslim must have before Zakat becomes obligatory, traditionally based on the value of a set weight of gold or silver. This calculator uses standard reference values — for a precise, up-to-date Nisab figure, check with a local scholar or Islamic finance authority.",
  },
  {
    question: "Is this calculator a religious ruling (fatwa)?",
    answer: "No — this is a general calculation tool to help you estimate your Zakat, not a religious ruling. For your specific financial situation, especially anything unusual (business assets, mixed investments, debts), it's best to confirm with a knowledgeable scholar.",
  },
];

export default function ZakatCalculatorPage() {
  return (
    <ToolShell
      eyebrow="Purify your wealth"
      title="Zakat Calculator"
      description="Estimate your Zakat obligation based on your cash, gold, investments and debts."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Zakat Calculator — Work Out Your Annual Zakat",
          description:
            "Estimate your annual Zakat (2.5% of net zakatable wealth) with this free calculator — covers cash, gold, investments and debts.",
          url: "/islamic-tools/zakat-calculator",
        })}
      />

      <ZakatWidget />

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            What Zakat is, in brief
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Zakat is one of the five pillars of Islam: a fixed, obligatory share of a Muslim&rsquo;s
            qualifying wealth, given to those entitled to receive it once that wealth has been held
            for a full lunar year (a Hawl) and stays at or above the Nisab threshold throughout. It
            is distinct from Sadaqah, voluntary charity given at any time in any amount — for anyone
            who meets the conditions, Zakat is a religious obligation, calculated at a fixed rate
            rather than left to personal discretion.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Who Zakat is obligatory for
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Zakat becomes due on an adult Muslim of sound mind whose net qualifying wealth — cash,
            gold and silver, business stock, investments, and similar assets, minus what they owe —
            stays at or above the Nisab value for a continuous lunar year. It isn&rsquo;t based on
            income the way tax is: someone with a modest salary but sizeable savings can owe Zakat,
            while someone with a high income but few net assets after debts may not owe anything
            this year. Zakat is not obligatory on wealth that never reaches Nisab, or on someone
            whose short-term debts and essential expenses bring their net wealth back below it.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            How this calculator works
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter your cash and bank balances, the current value of any gold and silver you own,
            investments, shares and savings, and — if relevant — business inventory and receivables
            plus any other zakatable assets. Then enter what should be deducted: short-term debts
            you owe and any immediate essential expenses. The calculator totals your assets,
            subtracts those deductions to arrive at your net zakatable wealth, and compares that figure
            against the Nisab threshold field, which is pre-filled with an editable estimate based
            on the value of 612.36g of silver — check today&rsquo;s gold/silver rate and update it
            before relying on the result. If your net wealth meets or exceeds Nisab, the calculator
            applies the standard 2.5% rate to give you an estimated Zakat amount.
          </p>
        </div>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/zakat-calculator" />
    </ToolShell>
  );
}
