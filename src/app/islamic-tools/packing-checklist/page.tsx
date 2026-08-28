import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { PackingChecklistWidget } from "@/components/islamic/packing-checklist-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah Packing Checklist Generator — Personalized Packing List",
  description:
    "Build a personalized Umrah packing list in seconds — select your traveler profile (male, female, elderly, family, children, wheelchair) and get a tailored, printable checklist.",
  alternates: { canonical: "/islamic-tools/packing-checklist" },
  keywords: [
    "umrah packing list",
    "umrah packing checklist",
    "what to pack for umrah",
    "umrah checklist for female",
    "umrah checklist pdf",
    "hajj packing list",
  ],
};

const faqs = [
  {
    question: "Can I use this for Hajj too?",
    answer:
      "Yes — the core items (Ihram, documents, essentials) are the same for both. Hajj involves a few extra days and more walking, so you may want to add extra socks, sun protection and rehydration salts on top of what's generated here.",
  },
  {
    question: "Does it save my progress?",
    answer:
      "Yes. Your selected traveler profile and every item you tick off as packed are saved automatically in your browser, so you can close the page and come back later without losing anything.",
  },
  {
    question: "Can I print it?",
    answer:
      "Yes — use the \"Print checklist\" button to get a clean, printer-friendly version of your list with the site navigation and buttons hidden, ready to tick off by hand while you pack.",
  },
];

export default function PackingChecklistPage() {
  return (
    <ToolShell
      eyebrow="Pack with confidence"
      title="Umrah Packing Checklist Generator"
      description="Select who you're packing for and get a personalized, printable Umrah packing list."
    >
      <p className="text-sm text-muted-foreground">
        Packing for Umrah is easy to get wrong when you&rsquo;re juggling
        Ihram rules, Saudi weather and everyone else&rsquo;s needs at once.
        Tell us who you&rsquo;re packing for below — you can select more
        than one — and we&rsquo;ll build a combined checklist covering the
        essentials plus anything specific to your situation. Tick items off
        as you pack, and print the final list to take with you.
      </p>

      <div className="mt-6">
        <PackingChecklistWidget />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/packing-checklist" />
    </ToolShell>
  );
}
