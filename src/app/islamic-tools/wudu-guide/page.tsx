import type { Metadata } from "next";
import Link from "next/link";
import { Droplets } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How to Perform Wudu — Step-by-Step Ablution Guide",
  description:
    "A clear, step-by-step guide to performing Wudu (ablution) in the widely-agreed order, plus what breaks Wudu and when Tayammum can be used instead — free, no account needed.",
  alternates: { canonical: "/islamic-tools/wudu-guide" },
  keywords: [
    "how to do wudu",
    "wudu steps",
    "wudu guide",
    "how to perform ablution",
    "what breaks wudu",
    "tayammum guide",
  ],
};

interface WuduStep {
  title: string;
  text: string;
}

const wuduSteps: WuduStep[] = [
  {
    title: "1. Make the intention (Niyyah)",
    text: "Intend in your heart that you are performing Wudu for the purpose of prayer or worship. Saying it aloud isn't required — the intention is what matters.",
  },
  {
    title: "2. Say Bismillah",
    text: "Begin by saying \"Bismillah\" (in the name of Allah) before you start washing.",
  },
  {
    title: "3. Wash your hands",
    text: "Wash both hands up to the wrists, three times, making sure water reaches between the fingers.",
  },
  {
    title: "4. Rinse your mouth",
    text: "Take water into your mouth and rinse it around, three times.",
  },
  {
    title: "5. Rinse your nose",
    text: "Sniff water gently into the nostrils and blow it out (using your left hand), three times.",
  },
  {
    title: "6. Wash your face",
    text: "Wash your entire face three times, from the hairline to the chin and from ear to ear.",
  },
  {
    title: "7. Wash your arms to the elbows",
    text: "Wash the right arm from the fingertips to just past the elbow three times, then the left arm the same way.",
  },
  {
    title: "8. Wipe your head",
    text: "Wipe your wet hands over the head once, from the front of the hairline to the back and, commonly, back to the front.",
  },
  {
    title: "9. Wipe your ears",
    text: "With water still on your hands, wipe the inside of the ears with your index fingers and the outside with your thumbs, once.",
  },
  {
    title: "10. Wash your feet to the ankles",
    text: "Wash the right foot up to and including the ankle three times, making sure water reaches between the toes, then the left foot the same way.",
  },
];

const breaksWudu = [
  "Using the toilet — passing urine or stool.",
  "Passing wind.",
  "Deep sleep that removes your awareness (a brief doze while sitting upright is generally treated differently).",
  "Loss of consciousness, such as fainting, or intoxication.",
  "Sexual discharge or the like.",
];

const faqs = [
  {
    question: "Do I need to make Wudu again for every prayer?",
    answer:
      "No — Wudu stays valid until something breaks it. Many people choose to renew it for each prayer as a good habit, but it isn't required if your Wudu is still intact.",
  },
  {
    question: "What if I'm not sure whether something broke my Wudu?",
    answer:
      "The general principle is that a state of certainty (having Wudu) isn't undone by mere doubt — if you're genuinely unsure whether anything happened, you can typically continue treating your Wudu as valid. A few specific situations are debated between schools of thought, so if something particular is on your mind, ask your Maulavi.",
  },
  {
    question: "When can I use Tayammum instead of Wudu?",
    answer:
      "Tayammum (dry ablution) is a recognized alternative when water isn't available, is too far away, or using it would harm your health — situations pilgrims and travellers run into fairly often. It involves striking clean earth, sand, or a stone surface with both hands, then wiping the face once and the hands/forearms, in place of washing with water.",
  },
  {
    question: "Is this the exact same sequence every school of thought teaches?",
    answer:
      "This guide covers the widely-agreed core sequence and order that the large majority of Muslims are taught. A small number of details — such as the exact method of wiping the head, or whether certain steps are obligatory versus recommended — differ between schools of thought. For anything specific to your own practice, ask your Maulavi.",
  },
  {
    question: "Why does this matter for Tawaf specifically?",
    answer:
      "Tawaf (circling the Kaaba) requires Wudu, unlike some other Umrah rites. Since pilgrims often perform Tawaf more than once during a trip, it's worth being comfortable and quick with Wudu — including knowing when Tayammum could apply if water access near the Haram is briefly inconvenient.",
  },
];

export default function WuduGuidePage() {
  return (
    <ToolShell
      eyebrow="Before you pray"
      title="How to Perform Wudu"
      description="The widely-agreed step-by-step sequence for Wudu (ablution), what breaks it, and when Tayammum can be used instead."
    >
      <JsonLd
        data={howToSchema({
          name: "How to Perform Wudu (Ablution), Step by Step",
          description:
            "The widely-agreed sequence for performing Wudu before prayer, from making the intention through washing the feet.",
          steps: wuduSteps.map((s) => ({ name: s.title, text: s.text })),
        })}
      />

      <p className="text-sm text-muted-foreground">
        Wudu is the ritual washing performed before prayer (Salah) and before some other acts of
        worship, such as Tawaf. The sequence below reflects the order the large majority of Muslims
        are taught and follow.
      </p>

      <ol className="mt-8 flex flex-col gap-3">
        {wuduSteps.map((step) => (
          <li key={step.title}>
            <Card className="flex-row items-start gap-4 py-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Droplets className="size-4" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-brand-navy">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-5">
        <Card>
          <CardContent className="flex flex-col gap-3">
            <p className="font-display text-base font-semibold text-brand-navy">What breaks Wudu</p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {breaksWudu.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              This covers the widely-agreed list. A handful of other situations — such as touching
              certain things, bleeding, or vomiting — are discussed differently between schools of
              thought, so ask your Maulavi if one of those applies to you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="font-display text-base font-semibold text-brand-navy">
                No water available? Tayammum
              </p>
              <Badge variant="goldOutline">Good to know</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Tayammum is a real, widely-recognized substitute for Wudu when water isn&rsquo;t
              available, is too far to reach, or would harm your health. It&rsquo;s worth knowing
              about if you&rsquo;re travelling — briefly strike clean earth, sand, or a stone surface
              with both hands, wipe your face once, then wipe your hands and forearms. It&rsquo;s a
              simpler process than Wudu and is not meant as a routine replacement for it.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-gray/40">
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Useful for pilgrims: Tawaf (circling the Kaaba) requires Wudu, so it&rsquo;s worth being
              confident with the sequence above before you travel. See our{" "}
              <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
                Step-by-Step Umrah Guide
              </Link>{" "}
              for where Tawaf fits into the wider journey, and our{" "}
              <Link href="/islamic-tools/salah-guide" className="font-medium text-brand-navy underline underline-offset-2">
                Salah Guide
              </Link>{" "}
              for what comes after Wudu.
            </p>
          </CardContent>
        </Card>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/wudu-guide" />
    </ToolShell>
  );
}
