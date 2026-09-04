import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How to Pray Salah — Step-by-Step Guide for Beginners",
  description:
    "A beginner-friendly, step-by-step guide to Salah (the Islamic prayer) — the five daily prayers and their time windows, what to do before you pray, and the general rakah sequence.",
  alternates: { canonical: "/islamic-tools/salah-guide" },
  keywords: [
    "how to pray salah",
    "how to pray namaz",
    "salah guide for beginners",
    "how to perform salah step by step",
    "five daily prayers",
  ],
};

const faqs = [
  {
    question: "Do I have to memorize the recitations in Arabic?",
    answer:
      "Salah is prayed in Arabic, so learning at least Surah Al-Fatiha and a short additional surah is the usual starting point. It's completely normal to start small — many beginners learn one short surah at a time and build up gradually, sometimes with the help of a teacher or a class.",
  },
  {
    question: "What if I miss a prayer's time window?",
    answer:
      "If a prayer's window has passed, it's generally recommended to pray it as soon as you remember rather than skip it, since making up a missed prayer is treated differently from deliberately not praying at all. If this happens often, it may help to set reminders around each prayer's window.",
  },
  {
    question: "Can I pray sitting down if I have difficulty standing?",
    answer:
      "Yes — Islamic teaching makes clear allowances for illness, injury, or difficulty standing, including praying seated or, where needed, with reduced movements. If this applies to you, it's worth asking your Maulavi how best to adapt the positions to your situation.",
  },
  {
    question: "How do I know the exact prayer times for my location?",
    answer:
      "This guide gives general time-of-day windows only. For exact times based on your city or current location, use our Prayer Times tool.",
  },
  {
    question: "Which direction do I face?",
    answer:
      "You face the Qibla — the direction of the Kaaba in Makkah. Use our Qibla Finder to get the exact direction from wherever you are.",
  },
];

interface RakahStep {
  title: string;
  text: string;
}

const rakahSteps: RakahStep[] = [
  {
    title: "1. Stand facing the Qibla and make your intention",
    text: "Stand facing the direction of the Kaaba (Qibla) and intend in your heart which prayer you are about to perform.",
  },
  {
    title: "2. Takbiratul Ihram — opening the prayer",
    text: "Raise your hands and say \"Allahu Akbar\" (Allah is the Greatest) to formally begin the prayer, then fold your hands and stand quietly.",
  },
  {
    title: "3. Qiyam — standing recitation",
    text: "Recite Surah Al-Fatiha, followed by another short surah or passage from the Qur'an (in the first two rak'ahs of a prayer).",
  },
  {
    title: "4. Ruku — bowing",
    text: "Say \"Allahu Akbar\" and bow forward from the waist, placing your hands on your knees, and recite the tasbih of Ruku.",
  },
  {
    title: "5. Rising from Ruku",
    text: "Stand back up straight, saying the prescribed words of praise, before moving into prostration.",
  },
  {
    title: "6. Sujood — prostration (performed twice)",
    text: "Say \"Allahu Akbar\" and place your forehead, nose, palms, knees, and toes on the ground, reciting the tasbih of Sujood. Sit briefly between the two prostrations, then prostrate a second time.",
  },
  {
    title: "7. Repeat for each rak'ah",
    text: "Stand back up for the next rak'ah and repeat the recitation, Ruku, and Sujood — the number of rak'ahs depends on which prayer you're performing.",
  },
  {
    title: "8. Tashahhud — sitting recitation",
    text: "Sit after the second rak'ah (and again at the end of the prayer) to recite the Tashahhud, including sending blessings on the Prophet ﷺ in the final sitting.",
  },
  {
    title: "9. Salam — ending the prayer",
    text: "Turn your head to the right and say \"Assalamu alaikum wa rahmatullah,\" then repeat it turning to the left, which formally ends the prayer.",
  },
];

const dailyPrayers = [
  { name: "Fajr", rakahs: "2 rak'ahs", window: "Dawn — from first light until just before sunrise" },
  { name: "Dhuhr", rakahs: "4 rak'ahs", window: "Midday — after the sun passes its peak, into the afternoon" },
  { name: "Asr", rakahs: "4 rak'ahs", window: "Afternoon — from mid-afternoon until shortly before sunset" },
  { name: "Maghrib", rakahs: "3 rak'ahs", window: "Evening — starting just after sunset" },
  { name: "Isha", rakahs: "4 rak'ahs", window: "Night — from nightfall until before dawn" },
];

export default function SalahGuidePage() {
  return (
    <ToolShell
      eyebrow="Learn to pray"
      title="How to Pray Salah"
      description="A beginner-friendly guide to the five daily prayers, what to do beforehand, and the general sequence of a rak'ah."
    >
      <JsonLd
        data={howToSchema({
          name: "How to Pray Salah, Step by Step",
          description:
            "The general sequence of a unit (rak'ah) of Salah, from the opening takbir through the closing salam.",
          steps: rakahSteps.map((s) => ({ name: s.title, text: s.text })),
        })}
      />

      <p className="text-sm text-muted-foreground">
        Salah is the five-times-daily prayer and one of the core acts of worship in Islam. This guide
        is written for someone learning it for the first time, or relearning it — it covers the five
        prayers and roughly when to pray them, what to do beforehand, and the general sequence of
        movements and recitations within a rak&rsquo;ah (unit of prayer).
      </p>

      <div className="mt-8">
        <p className="font-display text-base font-semibold text-brand-navy">
          The five daily prayers
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          These are general, non-GPS time-of-day windows. For exact times based on your location, use
          our{" "}
          <Link href="/islamic-tools/prayer-times" className="font-medium text-brand-navy underline underline-offset-2">
            Prayer Times
          </Link>{" "}
          tool.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {dailyPrayers.map((p) => (
            <Card key={p.name} className="flex-row items-center justify-between gap-3 py-3">
              <div>
                <p className="font-display text-sm font-semibold text-brand-navy">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.window}</p>
              </div>
              <Badge variant="goldOutline">{p.rakahs}</Badge>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-8 bg-brand-gray/40">
        <CardContent>
          <p className="text-sm font-semibold text-brand-navy">Before you begin</p>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
              <span>
                Perform Wudu (ablution) first — see our{" "}
                <Link href="/islamic-tools/wudu-guide" className="font-medium text-brand-navy underline underline-offset-2">
                  Wudu Guide
                </Link>{" "}
                if you need a refresher.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
              <span>Wear clean clothing and pray in a clean space.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
              <span>
                Face the Qibla (the direction of the Kaaba) — use our{" "}
                <Link href="/islamic-tools/qibla-finder" className="font-medium text-brand-navy underline underline-offset-2">
                  Qibla Finder
                </Link>{" "}
                to get the exact direction from wherever you are.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
              <span>Dress modestly, covering the body appropriately.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8">
        <p className="font-display text-base font-semibold text-brand-navy">
          The general sequence of a rak&rsquo;ah
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Each prayer is made up of a number of rak&rsquo;ahs (units) — Fajr has 2, Dhuhr and Asr and
          Isha have 4, and Maghrib has 3. Each rak&rsquo;ah broadly follows the sequence below.
        </p>

        <ol className="mt-4 flex flex-col gap-3">
          {rakahSteps.map((step) => (
            <li key={step.title}>
              <Card className="flex-row items-start gap-4 py-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                  <CircleCheck className="size-4" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-brand-navy">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        This is a general overview to help you learn the shape of the prayer — the exact wording of
        recitations, and small differences in hand position or timing between schools of thought, are
        best learned from a teacher, class, or your Maulavi alongside this guide. Once you&rsquo;re
        comfortable with the sequence, our{" "}
        <Link href="/islamic-tools/prayer-tracker" className="font-medium text-brand-navy underline underline-offset-2">
          Daily Prayer Tracker
        </Link>{" "}
        can help you stay consistent with all five prayers each day.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/salah-guide" />
    </ToolShell>
  );
}
