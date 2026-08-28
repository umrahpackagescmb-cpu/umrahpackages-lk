import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ZakatWidget } from "@/components/islamic/zakat-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

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
      <ZakatWidget />

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/zakat-calculator" />
    </ToolShell>
  );
}
