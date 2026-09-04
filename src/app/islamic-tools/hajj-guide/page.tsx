import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleAlert,
  Tent,
  Mountain,
  Moon,
  Target,
  Scissors,
  RotateCw,
  Footprints,
  CalendarRange,
  ListChecks,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hajj Guide — The Full Sequence of Rites, 8th–13th Dhul Hijjah",
  description:
    "A clear overview of Hajj from Ihram through the Days of Tashriq — Mina, Arafah, Muzdalifah, Ramy al-Jamarat, Qurbani, Tawaf al-Ifadah and Sa'i — with dates, Hajj types, and what's different from Umrah.",
  alternates: { canonical: "/islamic-tools/hajj-guide" },
  keywords: [
    "hajj guide",
    "hajj step by step",
    "hajj rituals in order",
    "hajj vs umrah",
    "days of hajj",
    "tamattu qiran ifrad",
    "day of arafah",
    "ramy al jamarat",
  ],
};

/**
 * The core Hajj rite sequence, general/consensus-level (not tied to a single
 * school of thought). Doubles as the visible step list and the source for
 * the HowTo JSON-LD below — same pattern as umrah-guide/page.tsx, just kept
 * inline here rather than in a separate widget, since this page is a static
 * overview rather than an interactive tracker.
 */
const hajjSteps = [
  {
    id: "ihram",
    icon: Tent,
    day: "Before 8th Dhul Hijjah",
    title: "Ihram & Niyyah for Hajj",
    text:
      "Pilgrims enter the sacred state of Ihram — the same restrictions as for Umrah apply (no cutting hair/nails, no perfume once in Ihram, men in the two unstitched white sheets, women in their normal modest dress) — and make the intention (niyyah) specifically for Hajj. Those doing Hajj Tamattu' will already have completed a separate Umrah earlier in the trip and come out of Ihram before re-entering it for Hajj alone on the 8th.",
  },
  {
    id: "mina-8th",
    icon: Tent,
    day: "8th Dhul Hijjah",
    title: "Departure to Mina (Yawm al-Tarwiyah)",
    text:
      "Pilgrims travel to Mina and spend the day and night there, offering the five daily prayers shortened (qasr) where applicable. This day is often called Yawm al-Tarwiyah. There is no fixed ritual beyond staying in Mina and preparing for the following day.",
  },
  {
    id: "arafah",
    icon: Mountain,
    day: "9th Dhul Hijjah",
    title: "The Day of Arafah — standing (Wuquf)",
    text:
      "Pilgrims travel from Mina to the plain of Arafah and spend from midday until sunset there in prayer, dhikr and dua — this standing (wuquf) is the single most essential rite of Hajj; a Hajj without any presence at Arafah during this window is not valid. Dhuhr and Asr are combined and shortened. After sunset, pilgrims move on to Muzdalifah without praying Maghrib at Arafah.",
  },
  {
    id: "muzdalifah",
    icon: Moon,
    day: "Night of 9th–10th",
    title: "Muzdalifah — combining Maghrib and Isha, and collecting pebbles",
    text:
      "At Muzdalifah, Maghrib and Isha are prayed together, and pilgrims spend the night there (or the greater part of it), typically resting in the open. Many pilgrims collect pebbles here for the following days' Ramy (stoning), though pebbles can also be collected at Mina itself.",
  },
  {
    id: "ramy-10th",
    icon: Target,
    day: "10th Dhul Hijjah (Eid al-Adha)",
    title: "Ramy al-Jamarat al-Aqabah",
    text:
      "After returning to Mina on the morning of the 10th, pilgrims throw seven pebbles at Jamarat al-Aqabah (the largest of the three stone pillars), marking the start of Eid al-Adha and the Days of Tashriq.",
  },
  {
    id: "qurbani",
    icon: CircleAlert,
    day: "10th Dhul Hijjah",
    title: "Qurbani / Hady (the sacrifice)",
    text:
      "An animal sacrifice is offered — obligatory for those performing Tamattu' or Qiran, and generally arranged today through the official Saudi sacrifice voucher/banking system rather than pilgrims performing it themselves. The meat is distributed to the poor.",
  },
  {
    id: "halq",
    icon: Scissors,
    day: "10th Dhul Hijjah",
    title: "Halq or Taqsir (shaving or trimming the hair)",
    text:
      "Men either shave the head (halq) or trim the hair (taqsir); women trim a small amount of hair. This releases most of the Ihram restrictions (the first partial release, tahallul al-awwal) — everything except relations between spouses, until Tawaf al-Ifadah is also completed.",
  },
  {
    id: "tawaf-ifadah",
    icon: RotateCw,
    day: "10th–12th Dhul Hijjah",
    title: "Tawaf al-Ifadah (Tawaf al-Ziyarah)",
    text:
      "Pilgrims travel to Masjid al-Haram in Makkah to perform this obligatory Tawaf, which can be done on the 10th itself or over the following days if needed. Completing it lifts the remaining Ihram restrictions in full (the second release, tahallul al-thani).",
  },
  {
    id: "sai-hajj",
    icon: Footprints,
    day: "Alongside Tawaf al-Ifadah",
    title: "Sa'i for Hajj (if not already done)",
    text:
      "Pilgrims performing Hajj Ifrad, or Qiran/Tamattu' pilgrims who did not already complete Sa'i with an earlier Tawaf, walk between Safa and Marwah as part of Hajj. Those who already performed Sa'i earlier in their trip (common for Tamattu' and some Qiran cases) do not repeat it.",
  },
  {
    id: "tashriq",
    icon: CalendarRange,
    day: "11th–13th Dhul Hijjah",
    title: "Ayyam al-Tashriq — nights in Mina and daily Ramy",
    text:
      "Pilgrims return to and stay in Mina for these Days of Tashriq, throwing seven pebbles at each of the three Jamarat (Sughra, Wusta, then al-Aqabah) every afternoon on the 11th and 12th, and the 13th as well for those who do not take the earlier departure (see below).",
  },
  {
    id: "nafr",
    icon: CalendarRange,
    day: "12th or 13th Dhul Hijjah",
    title: "Nafr — leaving Mina",
    text:
      "Pilgrims may leave Mina after Ramy on the 12th (an-Nafr al-Awwal, the earlier departure) provided they leave before sunset, or stay through the 13th and its Ramy for the more complete option (an-Nafr al-Thani). Both are legitimate; the second is generally considered preferable where it's practical.",
  },
  {
    id: "wida",
    icon: RotateCw,
    day: "Before leaving Makkah",
    title: "Tawaf al-Wida (Farewell Tawaf)",
    text:
      "As the final rite, pilgrims perform a farewell Tawaf at Masjid al-Haram immediately before leaving Makkah for their onward journey home (or to Madinah, which does not itself require Ihram or particular rites).",
  },
];

const hajjTypes = [
  {
    name: "Tamattu'",
    text:
      "The most common choice for pilgrims travelling from outside Saudi Arabia: perform Umrah first in the Hajj months, come out of Ihram completely, then enter Ihram again for Hajj alone from the 8th. Requires a Qurbani (Hady).",
  },
  {
    name: "Qiran",
    text:
      "Combine Umrah and Hajj under a single, continuous Ihram — Umrah's Tawaf and Sa'i are performed, but Ihram is not exited until after Hajj is complete. Also requires a Qurbani.",
  },
  {
    name: "Ifrad",
    text:
      "Perform Hajj only, with no Umrah combined into the same Ihram. No Qurbani is obligatory for this type on account of the combination itself (though the standard 10th Dhul Hijjah sacrifice of Eid al-Adha still applies as usual).",
  },
];

const faqs = [
  {
    question: "What's the actual difference between Hajj and Umrah?",
    answer:
      "Umrah is a shorter set of rites (Ihram, Tawaf, Sa'i, Halq/Taqsir) that can be performed at almost any time of year and takes a few hours. Hajj is a specific multi-day pilgrimage that can only be performed during the Hajj season, centred on standing at Arafah on the 9th of Dhul Hijjah, and includes rites Umrah doesn't — Mina, Arafah, Muzdalifah, Ramy al-Jamarat, Qurbani, and the Days of Tashriq. Hajj is also obligatory once in a lifetime for those who are able, while Umrah is highly recommended but not obligatory in the same way.",
  },
  {
    question: "When is Hajj in 2027?",
    answer:
      "Hajj always falls on the 8th–13th of Dhul Hijjah on the Islamic (Hijri) lunar calendar, which shifts roughly 10–11 days earlier each Gregorian year, so any Gregorian date quoted more than a year or so out is only a rough estimate until confirmed closer to the time by moon sighting. Check our Hajj Countdown tool nearer the date for the current best estimate rather than relying on a fixed date here.",
  },
  {
    question: "Do I need to choose Tamattu', Qiran or Ifrad myself?",
    answer:
      "Most first-time pilgrims travelling with a group are guided into Tamattu', which is generally the most straightforward option and the one most Hajj groups are organised around. If you're unsure which fits your situation (for example, if you're combining Hajj with an existing trip or have specific timing constraints), ask your Maulavi or Hajj group leader before you enter Ihram, since it isn't something you can easily change afterwards.",
  },
  {
    question: "Does UmrahPackages.lk sell Hajj packages?",
    answer:
      `No — ${siteConfig.name} focuses on Umrah packages specifically. Hajj travel from Sri Lanka works differently: it runs through an annual government-regulated quota and a separate Hajj-specific visa and agency accreditation process, rather than being booked as a year-round package the way Umrah is. If you're planning Hajj, speak directly with agencies about their Hajj-specific accreditation and quota allocation for the year, and check with Saudi Arabia's official Nusuk platform (nusuk.sa) for the authoritative process.`,
  },
  {
    question: "What if I make a mistake with the Ramy or lose track of a rite?",
    answer:
      "Hajj involves a precise sequence over several days in very large crowds, and small mistakes (missing a day's Ramy, being unsure whether a Tawaf circuit counted) are common and generally have known ways to be corrected or compensated for. Don't guess — ask a scholar or your group's Maulavi as soon as you can, ideally before you leave Saudi Arabia, since some corrections are easier to make while you're still there.",
  },
  {
    question: "Is Hajj physically harder than Umrah?",
    answer:
      "Generally yes — Hajj spans five or six days, involves long periods outdoors at Arafah and Mina, significant walking, and some of the largest crowds anywhere in the world during Ramy and Tawaf al-Ifadah. Good physical preparation, pacing yourself, staying hydrated, and following your group leader's timing (to avoid the very worst crowd peaks) all make a meaningful difference.",
  },
];

export default function HajjGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Hajj Guide"
      description="The full sequence of Hajj, from Ihram through the Days of Tashriq, with dates, Hajj types, and how it differs from Umrah."
    >
      <JsonLd
        data={howToSchema({
          name: "How Hajj Is Performed, Step by Step",
          description:
            "The sequence of rites for Hajj, from entering Ihram through Mina, Arafah, Muzdalifah, Ramy al-Jamarat, Qurbani, Tawaf al-Ifadah, Sa'i, the Days of Tashriq, and Tawaf al-Wida.",
          steps: hajjSteps.map((s) => ({ name: s.title, text: s.text })),
        })}
      />

      <Card className="bg-brand-gray/40">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <CircleAlert className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            Hajj is a longer, more physically demanding pilgrimage than Umrah, performed only during a
            fixed window each year (8th–13th Dhul Hijjah) and only ever with an accredited Hajj group or
            agency handling your permit, camp, and transport between sites. This page is a general
            overview to help you follow the sequence — always defer to your own group leader and Maulavi
            for on-the-ground timing and any ruling specific to your situation. Find one through our{" "}
            <Link href="/maulavi-directory" className="font-medium text-brand-navy underline underline-offset-2">
              Maulavi Directory
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        Looking for Umrah instead? See our{" "}
        <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Step-by-Step Umrah Guide
        </Link>{" "}
        for the shorter set of rites (Ihram, Tawaf, Sa&rsquo;i, Halq/Taqsir) that can be performed
        year-round. Hajj shares that same starting sequence but adds several more days and locations
        specific to the Hajj season.
      </p>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">The three types of Hajj</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        How Hajj is combined (or not) with Umrah in the same trip determines which type applies to you —
        this is normally decided with your group before you enter Ihram.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {hajjTypes.map((t) => (
          <Card key={t.name}>
            <CardHeader>
              <CardTitle className="text-brand-navy">{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">
        The sequence of Hajj, step by step
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The rites below follow the order most pilgrims are taught and guided through by their group. A
        few details (such as exactly when pebbles are collected, or the precise handling of an early vs.
        later Tawaf al-Ifadah) have minor differences of opinion between schools of thought — kept general
        here rather than picking a side.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {hajjSteps.map((step, i) => (
          <Card key={step.id}>
            <CardContent className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <step.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-brand-gold-dark">
                  Step {i + 1} · {step.day}
                </p>
                <p className="mt-1 font-display text-base font-semibold text-brand-navy">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-brand-navy">
        How Hajj travel is different from Umrah
      </h2>
      <Card className="mt-4">
        <CardContent>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <ListChecks className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
              <span>
                <span className="font-medium text-brand-navy">Fixed dates, once a year.</span> Umrah can
                be performed almost any time; Hajj happens only in the 8th–13th of Dhul Hijjah window,
                so travel plans, leave from work, and group bookings all have to align with that single
                yearly window.
              </span>
            </li>
            <li className="flex gap-2">
              <ListChecks className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
              <span>
                <span className="font-medium text-brand-navy">Quota and accreditation, not a regular visa.</span>{" "}
                Hajj travel is governed by an annual government-to-government quota system and requires
                agencies to hold specific Hajj accreditation, unlike the Umrah visa most Sri Lankan agencies
                arrange year-round — see our{" "}
                <Link href="/islamic-tools/umrah-visa-guide" className="text-brand-navy underline underline-offset-2">
                  Umrah Visa Guide
                </Link>{" "}
                for how that process compares.
              </span>
            </li>
            <li className="flex gap-2">
              <ListChecks className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
              <span>
                <span className="font-medium text-brand-navy">Tent camps, not hotels, for several days.</span>{" "}
                Pilgrims stay in tented camps at Mina and in the open at Muzdalifah rather than hotel
                rooms — very different logistics from a typical Umrah stay.
              </span>
            </li>
            <li className="flex gap-2">
              <ListChecks className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
              <span>
                <span className="font-medium text-brand-navy">{siteConfig.name} lists Umrah packages only.</span>{" "}
                We don&rsquo;t currently list Hajj-specific packages on this site. For Hajj, contact
                agencies directly about their Hajj accreditation and that year&rsquo;s quota allocation, or
                see our{" "}
                <Link href="/best-umrah-agencies-sri-lanka" className="text-brand-navy underline underline-offset-2">
                  agency directory
                </Link>{" "}
                to find one to ask.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        Want a reminder of how many days remain until the Day of Arafah? Use our{" "}
        <Link href="/islamic-tools/hajj-countdown" className="font-medium text-brand-navy underline underline-offset-2">
          Hajj Countdown
        </Link>{" "}
        tool, or brush up on Ihram restrictions with our{" "}
        <Link href="/islamic-tools/ihram-rules-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Ihram Rules & Restrictions
        </Link>{" "}
        guide — the same restrictions apply during Hajj&rsquo;s Ihram as during Umrah&rsquo;s.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hajj-guide" />
    </ToolShell>
  );
}
