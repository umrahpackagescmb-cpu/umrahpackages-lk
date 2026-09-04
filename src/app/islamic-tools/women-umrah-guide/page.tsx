import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah for Women — A Practical Guide",
  description:
    "Practical guidance for women performing Umrah — Ihram and modest dress, travelling safely, agency questions to ask, packing tips, and the period/mahram questions many women have.",
  alternates: { canonical: "/islamic-tools/women-umrah-guide" },
  keywords: [
    "umrah for women",
    "women's umrah guide",
    "umrah ihram for women",
    "umrah period travel",
    "female umrah group",
  ],
};

const faqs = [
  {
    question: "Do women need to cover their face during Ihram?",
    answer:
      "There's near-universal agreement that a woman's Ihram doesn't require a niqab or face veil — the face and hands are left uncovered. If privacy is wanted around unrelated men, a loose scarf held away from the face (not resting on it) is commonly used instead. See our Ihram Rules & Restrictions guide for the fuller picture, and ask your Maulavi if you have a specific concern.",
  },
  {
    question: "What should I ask my agency about travelling as a woman?",
    answer:
      "Ask directly whether they offer female-only sub-groups or rooming arrangements, who your roommate(s) will be, whether a female group leader or chaperone is assigned, and how they handle logistics if you're travelling without a male relative. Get the answers in writing before you book — see our Licensed Umrah Operators guide for how to vet the agency itself.",
  },
  {
    question: "Can I travel for Umrah without a mahram?",
    answer:
      "This is a genuine question with both a practical (visa/entry) side and a religious (fiqh) side, and scholarly views differ on the details. Rather than covering it again here, read our dedicated article on travelling without a mahram, and speak to your Maulavi or a scholar you trust about your own specific circumstances before booking.",
  },
  {
    question: "What if my period starts during the trip?",
    answer:
      "This happens to a lot of women and isn't something to panic about, but it is a personal fiqh matter — what it means for Tawaf specifically, and how to sequence your rites around it, varies by school of thought and individual circumstance. Speak to a trusted female scholar or your Maulavi before you travel so you already have a plan, rather than trying to work it out under pressure in Makkah.",
  },
  {
    question: "What should women pack that isn't on the general packing list?",
    answer:
      "Beyond the standard essentials, most women travellers find it worth packing familiar sanitary products (brands available locally in Saudi Arabia may differ from what you're used to), a couple of extra plain, wide scarves or shawls, and comfortable slip-on flats for the long stretches of walking during Tawaf and Sa'i. See our Umrah Packing Checklist tool to build a full personalised list.",
  },
  {
    question: "Are Masjid al-Haram and Masjid an-Nabawi set up for women?",
    answer:
      "Yes — both mosques have large dedicated prayer areas, entrances and ablution facilities for women, clearly signed and staffed. Ask your group leader or hotel for the nearest women's entrance when you arrive, since it may not be the closest gate overall.",
  },
];

export default function WomenUmrahGuidePage() {
  return (
    <ToolShell
      eyebrow="Travelling as a woman"
      title="Umrah for Women"
      description="Practical, non-religious guidance for women performing Umrah — dress, safe travel, agency questions, and packing."
    >
      <p className="text-sm text-muted-foreground">
        The rites of Umrah are identical for women and men — the same Ihram, the same Tawaf, the same
        Sa&rsquo;i. What differs is mostly practical: what to wear, how travel arrangements are organised,
        and a few comfort and planning details that are easy to overlook until you&rsquo;re there. This
        guide focuses on those practical questions rather than covering fiqh rulings that are genuinely
        personal and best answered by a scholar you trust.
      </p>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">Clothing and Ihram</h2>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        There&rsquo;s near-universal agreement that women don&rsquo;t wear a special Ihram garment the way
        men do — normal, modest, loose-fitting clothing that covers the body is worn instead, and there is
        no requirement to cover the face or hands. Beyond that general point, exact details can vary by
        school of thought and personal practice, so see our{" "}
        <Link
          href="/islamic-tools/ihram-rules-guide"
          className="text-brand-navy underline underline-offset-2"
        >
          Ihram Rules &amp; Restrictions
        </Link>{" "}
        guide for the fuller list, and ask your Maulavi if anything about your own situation is unclear.
      </p>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">
        Travelling safely: what to check with your agency
      </h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
        <li>
          • Ask whether the agency offers a female-only sub-group, female-only rooming, or a female group
          leader — not every agency does, so ask before you book rather than assuming.
        </li>
        <li>
          • Confirm exactly who you&rsquo;ll be rooming with if travelling without family, and whether room
          assignments can be changed if there&rsquo;s an issue once you&rsquo;re there.
        </li>
        <li>
          • If travelling without a male relative, ask directly how the agency handles this in practice for
          flights, transfers and check-in — see our{" "}
          <Link
            href="/licensed-umrah-operators-sri-lanka"
            className="text-brand-navy underline underline-offset-2"
          >
            Licensed Umrah Operators
          </Link>{" "}
          guide for how to vet the agency itself.
        </li>
        <li>
          • Keep a copy of your itinerary, hotel details and agency contact number accessible at all times,
          separate from your main luggage.
        </li>
      </ul>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">Packing and comfort tips</h2>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        Beyond the general essentials, it&rsquo;s worth packing familiar sanitary products from home — local
        brands in Saudi Arabia may differ from what you&rsquo;re used to — along with two or three plain,
        wide scarves that are easy to rewrap during long, hot days, and comfortable slip-on flats for the
        walking distances covered during Tawaf and Sa&rsquo;i. Use our{" "}
        <Link href="/islamic-tools/packing-checklist" className="text-brand-navy underline underline-offset-2">
          Umrah Packing Checklist
        </Link>{" "}
        to build a complete, personalised list.
      </p>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">
        Your period during the trip, and travelling without a mahram
      </h2>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        Two questions come up often enough that they deserve a direct, honest answer: what happens if your
        period starts while you&rsquo;re there, and whether you can travel without a mahram at all. Both are
        genuine, common, and entirely personal fiqh questions — what they mean for Tawaf specifically, and
        what&rsquo;s required for travel, can depend on your school of thought and individual circumstances.
        We deliberately don&rsquo;t state a ruling on either here. If the mahram question is relevant to you,
        our article on{" "}
        <Link
          href="/blog/can-a-woman-perform-umrah-without-a-mahram"
          className="text-brand-navy underline underline-offset-2"
        >
          travelling for Umrah without a mahram
        </Link>{" "}
        covers the practical side in more detail. For either question, speak to a trusted female scholar or
        your Maulavi before you travel, so you have a plan in hand rather than working it out under pressure
        in Makkah.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/women-umrah-guide" />
    </ToolShell>
  );
}
