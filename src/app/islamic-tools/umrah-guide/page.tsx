import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { UmrahGuideWidget } from "@/components/islamic/umrah-guide-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema } from "@/lib/schema";
import { umrahGuideSteps } from "@/lib/islamic/umrah-guide";

export const metadata: Metadata = {
  title: "Step-by-Step Umrah Guide — Ihram to Halq/Taqsir, In Order",
  description:
    "A clear, interactive step-by-step guide to performing Umrah — Ihram, Talbiyah, Tawaf, Sa'i and Halq/Taqsir — with duas, tips, and a progress tracker you can print.",
  alternates: { canonical: "/islamic-tools/umrah-guide" },
  keywords: [
    "umrah step by step",
    "how to perform umrah",
    "umrah guide",
    "umrah rituals in order",
    "tawaf sai halq guide",
    "umrah dua guide",
  ],
};

const faqs = [
  {
    question: "Is this guide enough on its own, or should I still attend my agency's briefing?",
    answer:
      "Please still attend your agency's pre-departure and on-ground briefings. This guide is a helpful overview to familiarize yourself with the sequence beforehand, not a substitute for guidance from your agency's coordinator or Maulavi, who can answer questions specific to your situation.",
  },
  {
    question: "What if I miss a step or make a mistake during Tawaf or Sa'i?",
    answer:
      "Rulings for mistakes made during Umrah (miscounting circuits, breaking a restriction unintentionally, and so on) can depend on the specifics of what happened. If something like this happens, ask a scholar or your group's Maulavi on the spot rather than guessing — most groups have someone reachable for exactly this.",
  },
  {
    question: "Does my progress get saved if I close the page?",
    answer:
      "Yes — your ticked steps are saved on your own device only, so they'll still be there if you come back to this page later, including during your actual trip.",
  },
  {
    question: "Can I print this guide to carry with me?",
    answer:
      "Yes, use the Print button to get a clean, print-friendly version of all nine steps with their duas — handy to keep in your bag alongside your Ihram.",
  },
];

export default function UmrahGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Step-by-Step Umrah Guide"
      description="The full sequence of Umrah, from Ihram to Halq/Taqsir, with duas, practical tips, and a progress tracker."
    >
      <JsonLd
        data={howToSchema({
          name: "How to Perform Umrah, Step by Step",
          description:
            "The sequence of rites for performing Umrah, from entering Ihram through Tawaf, Sa'i, and Halq/Taqsir.",
          steps: umrahGuideSteps.map((s) => ({ name: s.title, text: s.summary })),
        })}
      />

      <p className="text-sm text-muted-foreground">
        Umrah follows a set sequence of rites. Reading through them before you travel means you can
        focus on the experience itself rather than the order of what comes next. Tap each step below
        to expand it, tick it off as you go, and print the whole guide if you&rsquo;d like a physical
        copy to carry with you.
      </p>

      <div className="mt-8">
        <UmrahGuideWidget />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Planning your trip? Browse{" "}
        <Link href="/packages" className="font-medium text-brand-navy underline underline-offset-2">
          Umrah packages
        </Link>{" "}
        from verified Sri Lankan agencies, or check our{" "}
        <Link href="/islamic-tools/packing-checklist" className="font-medium text-brand-navy underline underline-offset-2">
          packing checklist
        </Link>{" "}
        and{" "}
        <Link href="/islamic-tools/umrah-budget-calculator" className="font-medium text-brand-navy underline underline-offset-2">
          budget calculator
        </Link>{" "}
        to get everything else ready.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/umrah-guide" />
    </ToolShell>
  );
}
