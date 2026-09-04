import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah with Children — A Parent's Guide",
  description:
    "Taking children on Umrah? Practical guidance on age, pricing, Ihram for kids, crowd management, and what to pack — from Sri Lankan family travellers' perspective.",
  alternates: { canonical: "/islamic-tools/children-umrah-guide" },
  keywords: ["umrah with children", "kids umrah guide", "umrah for family with children", "children umrah rules"],
};

const faqs = [
  {
    question: "Is there a minimum age for children to perform Umrah?",
    answer:
      "There's no fixed minimum age — children of any age can accompany parents on Umrah, though the rites themselves (Tawaf, Sa'i) are only obligatory once a child reaches puberty. Many families bring children along from a young age simply to be present at the Haram.",
  },
  {
    question: "Do children need to wear Ihram?",
    answer:
      "Boys typically wear the two-piece white Ihram cloth like adult men once old enough to walk around comfortably in it; younger boys and girls can wear simple, modest, seamless-where-possible clothing. There's flexibility here — ask your agency or a local scholar if unsure for your child's age.",
  },
  {
    question: "How do I keep track of my child in large crowds?",
    answer:
      "Write your hotel name, room number, and a contact phone number on a card or wristband your child carries. Agree on a fixed meeting point before entering crowded areas like the Haram, and keep older children within arm's reach during Tawaf and Sa'i, which get especially crowded.",
  },
  {
    question: "Do agencies charge full price for children?",
    answer:
      "It varies. Many Sri Lankan agencies offer a reduced rate for children under 12, particularly if sharing a bed with parents. Always confirm the exact child pricing directly with the agency — see our Family Umrah Packages page for agencies and current listings.",
  },
];

export default function ChildrenUmrahGuidePage() {
  return (
    <ToolShell
      eyebrow="Travelling with children"
      title="Umrah with Children — A Parent's Guide"
      description="Practical, non-religious guidance for parents bringing children on Umrah — pricing, Ihram, crowds, and packing."
    >
      <p className="text-sm text-muted-foreground">
        Umrah with children is entirely doable with a bit of planning around three things: crowd management (Tawaf
        and Sa&rsquo;i get very busy, especially in peak season), pacing (build in more rest breaks than an
        adults-only itinerary would), and paperwork (each child needs their own passport and, depending on age,
        their own visa — check with your agency).
      </p>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">Before you travel</h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
        <li>• Confirm child pricing and required documents with your agency in writing before booking — see our <Link href="/family-umrah-packages" className="text-brand-navy underline underline-offset-2">Family Umrah Packages</Link> page.</li>
        <li>• Ask about room configuration — most hotels can arrange a family room or connecting rooms on request.</li>
        <li>• Pack a printed card with your hotel name, room number, and a contact number for each child old enough to carry one.</li>
        <li>• Bring familiar snacks, a light change of clothes, and any regular medication — Makkah and Madinah pharmacies stock the basics, but familiar brands aren&rsquo;t guaranteed.</li>
      </ul>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">During Tawaf and Sa&rsquo;i</h2>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        These are the two busiest, most physically demanding parts of Umrah. Consider performing them at quieter
        times (late night or just after Fajr) with younger children, keep a firm hold during the crowded stretches,
        and don&rsquo;t hesitate to pause and rest — Umrah has no time limit once you&rsquo;ve started, and safety
        matters more than finishing quickly.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/children-umrah-guide" />
    </ToolShell>
  );
}
