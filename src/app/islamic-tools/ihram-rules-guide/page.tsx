import type { Metadata } from "next";
import Link from "next/link";
import { CircleAlert, Users, Mars, Venus, HandHeart } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Ihram Rules & Restrictions — What's Not Allowed in Ihram",
  description:
    "A general overview of the widely-agreed restrictions during Ihram — what applies to everyone, and what's specific to men and women — with guidance on when to ask a scholar.",
  alternates: { canonical: "/islamic-tools/ihram-rules-guide" },
  keywords: [
    "ihram restrictions",
    "ihram rules",
    "what is not allowed in ihram",
    "ihram prohibitions",
    "fidyah ihram",
  ],
};

const everyoneRestrictions = [
  "Cutting or trimming your hair or nails.",
  "Using perfume or scented products — on the body or on your clothing — once you've entered Ihram.",
  "Engaging in marital relations.",
  "Hunting or killing game animals.",
  "Uprooting plants or cutting trees within the sacred precinct (the Haram boundary).",
  "Arguing, quarrelling, or using obscene language.",
];

const menRestrictions = [
  "Wearing stitched or tailored clothing — the two-piece Ihram cloth (izar and rida) is worn instead.",
  "Covering the head with a fitted covering. An umbrella or other shade is fine; a fitted cap or hood is not.",
];

const womenRestrictions = [
  "Covering the face with a niqab, or wearing gloves, while in Ihram.",
  "Otherwise, normal modest dress is kept as usual — if privacy is needed, the face can be shielded with a loose cloth or scarf, as long as it isn't resting directly on the face.",
  "The head and hair should remain covered as usual.",
];

const faqs = [
  {
    question: "What if I forget and use scented soap or lotion by accident?",
    answer:
      "Unintentional slips like this happen to a lot of pilgrims, and Islamic jurisprudence does generally distinguish between deliberate and accidental or forgetful acts. The exact handling can depend on what exactly happened and how, so rather than guessing or worrying about it, mention it to a scholar or your group's Maulavi as soon as you reasonably can — they'll be able to advise on your specific situation.",
  },
  {
    question: "Can I wear a wedding ring during Ihram?",
    answer:
      "A plain ring generally isn't considered stitched clothing or a head covering, so it isn't commonly listed among the restrictions above. If you have a specific concern about jewellery or a particular item, it's still worth asking your Maulavi so you can wear it with peace of mind.",
  },
  {
    question: "Can men wear a simple money pouch or belt under the Ihram cloth?",
    answer:
      "A basic, unstitched-style pouch or belt to hold money and documents is commonly used by pilgrims and generally isn't treated the same as tailored clothing. If you're carrying something more structured, it's worth asking your agency or Maulavi whether it fits the usual guidance.",
  },
  {
    question: "Can I use sunscreen or an unscented moisturiser while in Ihram?",
    answer:
      "Unscented products are generally treated differently from perfumed ones, since the restriction is specifically about scent. Check the label for \"unscented\" or \"fragrance-free,\" and if a product's status isn't clear to you, ask your Maulavi or agency before you travel.",
  },
];

export default function IhramRulesGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Ihram Rules & Restrictions"
      description="A general overview of the widely-agreed restrictions that apply once you enter the sacred state of Ihram."
    >
      <Card className="bg-brand-gray/40">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <CircleAlert className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            This page is a general overview of the restrictions during Ihram that are widely agreed
            upon. It isn&rsquo;t a substitute for scholarly guidance — specific situations, such as
            an accidental violation or an exception due to illness or necessity, can depend on details
            that vary from person to person. For anything about your own situation, please speak to a
            scholar or your group&rsquo;s Maulavi — you can find one through our{" "}
            <Link href="/maulavi-directory" className="font-medium text-brand-navy underline underline-offset-2">
              Maulavi Directory
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        Looking for the full sequence of Umrah itself, from entering Ihram through Tawaf, Sa&rsquo;i
        and Halq/Taqsir? See the{" "}
        <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Step-by-Step Umrah Guide
        </Link>
        . This page instead focuses specifically on what to avoid once you&rsquo;re in Ihram.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Users className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Applies to everyone</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {everyoneRestrictions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Mars className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Specific to men</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {menRestrictions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Venus className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Specific to women</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {womenRestrictions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <HandHeart className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">If a restriction is broken</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Islamic jurisprudence has a general concept of Fidyah — a form of compensation —
              for some violations of Ihram restrictions that happen unintentionally or out of necessity
              (for example, due to illness). This page deliberately doesn&rsquo;t state specific amounts
              or exact rulings for particular violations, since these can vary by school of thought and
              by the details of what happened. If this comes up for you, ask a scholar or your Maulavi
              about your specific case rather than relying on a general rule of thumb.
            </p>
          </CardContent>
        </Card>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/ihram-rules-guide" />
    </ToolShell>
  );
}
