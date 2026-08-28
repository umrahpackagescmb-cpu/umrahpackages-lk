import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { PreDepartureChecklistWidget } from "@/components/islamic/pre-departure-checklist-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah Pre-Departure Checklist — Documents, Money & Admin Before You Fly",
  description:
    "A printable pre-departure checklist for Umrah covering documents, health & insurance, money, connectivity and home admin — everything to sort out before you fly, not what to pack.",
  alternates: { canonical: "/islamic-tools/pre-departure-checklist" },
  keywords: [
    "umrah pre departure checklist",
    "umrah documents checklist",
    "umrah preparation checklist",
    "things to do before umrah",
    "umrah visa checklist",
  ],
};

const faqs = [
  {
    question: "How is this different from the Packing Checklist?",
    answer:
      "The Packing Checklist is about physical items to put in your bag — clothing, toiletries, Ihram. This Pre-Departure Checklist is about admin and logistics tasks to complete beforehand, like confirming your visa, notifying your bank and sorting out connectivity.",
  },
  {
    question: "When should I start working through this checklist?",
    answer:
      "Most items are worth starting a few weeks before departure — vaccination certificates and visa confirmation can take time — with the last few (bank notifications, offline maps, sharing your itinerary) done in the final days before you fly.",
  },
  {
    question: "Does it save my progress?",
    answer:
      "Yes. Every item you tick off is saved automatically in your browser, so you can close the page and pick up where you left off later.",
  },
  {
    question: "Can I print it?",
    answer:
      "Yes — use the \"Print checklist\" button to get a clean, printer-friendly version with the site navigation and buttons hidden, ready to work through by hand.",
  },
];

export default function PreDepartureChecklistPage() {
  return (
    <ToolShell
      eyebrow="Sort out the admin"
      title="Umrah Pre-Departure Checklist"
      description="Documents, money, connectivity and home admin to sort out before you fly — not what to pack."
    >
      <p className="text-sm text-muted-foreground">
        Before you even think about what goes in your suitcase, there&rsquo;s
        a shorter list of admin and logistics tasks worth getting out of the
        way — confirming your visa, sorting your health and money essentials,
        and making sure things at home are covered while you&rsquo;re gone.
        This checklist covers exactly that. Looking for what to physically
        pack instead? See our{" "}
        <Link
          href="/islamic-tools/packing-checklist"
          className="font-medium text-brand-gold-dark underline underline-offset-2"
        >
          Packing Checklist
        </Link>
        .
      </p>

      <div className="mt-6">
        <PreDepartureChecklistWidget />
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/pre-departure-checklist" />
    </ToolShell>
  );
}
