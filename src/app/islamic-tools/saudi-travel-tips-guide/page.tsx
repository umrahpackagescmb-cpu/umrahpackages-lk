import type { Metadata } from "next";
import Link from "next/link";
import {
  Shirt,
  Clock,
  CalendarDays,
  HeartHandshake,
  MessageCircle,
  Banknote,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Saudi Travel Tips & Etiquette Guide for First-Time Pilgrims",
  description:
    "A practical guide to Saudi Arabia's everyday customs and etiquette for first-time Umrah pilgrims from Sri Lanka — dress, prayer-time pauses, the Friday-Saturday weekend, Haram manners, money and safety.",
  alternates: { canonical: "/islamic-tools/saudi-travel-tips-guide" },
  keywords: [
    "saudi arabia travel tips",
    "umrah etiquette",
    "what to know before umrah",
    "saudi arabia culture guide",
    "first time umrah tips",
    "saudi arabia etiquette for pilgrims",
  ],
};

interface TipSection {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const sections: TipSection[] = [
  {
    icon: Shirt,
    title: "Dress & modesty",
    body: (
      <>
        Modest, loose-fitting clothing that covers the shoulders and knees
        is the general expectation in public in Saudi Arabia, for both men
        and women. Many women choose to wear an abaya in public and cover
        their hair, and it&rsquo;s a good idea to pack a few loose,
        breathable outfits for everyday wear outside of Ihram, since you&rsquo;ll
        be walking and standing a lot. When in doubt, err on the side of
        looser and more covered rather than fitted or revealing.
      </>
    ),
  },
  {
    icon: Clock,
    title: "Prayer times & daily life",
    body: (
      <>
        It&rsquo;s completely normal for shops, restaurants and some
        services to pause briefly around each prayer time as staff and
        customers step away to pray. This isn&rsquo;t a closure, just a
        short pause, so build a little buffer into your plans rather than
        being caught off guard — if you&rsquo;re mid-errand when a prayer
        call sounds, it&rsquo;s usually easiest to simply wait it out
        nearby.
      </>
    ),
  },
  {
    icon: CalendarDays,
    title: "The weekend is Friday–Saturday",
    body: (
      <>
        Saudi Arabia&rsquo;s weekend falls on Friday and Saturday rather
        than Saturday and Sunday. Keep this in mind if you need to contact
        offices, banks or businesses back home in Sri Lanka while
        you&rsquo;re travelling, or if you&rsquo;re trying to reach a
        local business in Saudi Arabia — Friday in particular tends to be
        quieter, partly because of Jumu&rsquo;ah prayers at midday.
      </>
    ),
  },
  {
    icon: HeartHandshake,
    title: "Etiquette around the Haram",
    body: (
      <>
        The Haram gets extremely crowded, so general courtesy goes a long
        way — move with the flow rather than against it, and be patient
        during Tawaf and Sa&rsquo;i. Priority and wheelchair-accessible
        areas are set aside for elderly and disabled pilgrims, so please
        keep those spaces clear for the people they&rsquo;re meant for. It&rsquo;s
        also respectful to avoid photographing other worshippers, especially
        women, without their consent — many pilgrims prefer to keep photos
        to the scenery and their own group.
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: "Greetings & courtesy phrases",
    body: (
      <>
        A simple &ldquo;Assalamu Alaikum&rdquo; (peace be upon you) as a
        greeting and &ldquo;Shukran&rdquo; (thank you) go a long way and
        are always appreciated, though they&rsquo;re not required to get
        by. Locals in Makkah and Madinah deal with pilgrims from all over
        the world every day and are generally very accommodating,
        including with English and basic gestures, so don&rsquo;t worry
        if your Arabic is limited.
      </>
    ),
  },
  {
    icon: Banknote,
    title: "Money & payments",
    body: (
      <>
        Saudi Arabia is very card-friendly in its cities, and card or
        contactless payment is widely accepted at hotels, larger shops and
        restaurants. That said, it&rsquo;s wise to carry some Saudi Riyal
        cash for smaller purchases, street vendors, or anywhere card
        machines aren&rsquo;t available. Our{" "}
        <Link
          href="/islamic-tools/currency-converter"
          className="font-medium text-brand-navy underline underline-offset-2"
        >
          currency converter
        </Link>{" "}
        can help you get a feel for LKR-to-SAR exchange rates before you
        exchange or withdraw money.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Safety",
    body: (
      <>
        Makkah and Madinah are heavily policed and are generally
        considered very safe for pilgrims, with a strong visible security
        presence around the Haram areas throughout the year. Ordinary
        travel-safety common sense still applies — keep an eye on your
        belongings in large crowds, agree on a meeting point with your
        group in case anyone gets separated, and keep your passport and
        valuables secured rather than loose in a bag.
      </>
    ),
  },
];

const faqs = [
  {
    question: "Do I need to speak Arabic to get around in Makkah and Madinah?",
    answer:
      "No — English is widely understood in hotels, at the Haram, and in most tourist-facing services, and staff are very used to pilgrims from all over the world. Learning a few basic phrases is a nice gesture, but it isn't necessary to have a comfortable trip.",
  },
  {
    question: "Will shops really close during every prayer time?",
    answer:
      "Many shops and restaurants pause for a short while around each prayer, especially smaller, local businesses. It's normal and brief rather than a full closure — plan a short buffer around prayer times rather than expecting everything to run exactly on your schedule.",
  },
  {
    question: "Is it okay to take photos near the Haram?",
    answer:
      "Photos of the scenery, the Kaaba, and your own group are generally fine. As a matter of courtesy, avoid pointing your camera directly at other worshippers, especially women, without their consent — many people are there for a deeply personal moment of worship.",
  },
  {
    question: "Should I exchange Sri Lankan Rupees before I travel, or on arrival?",
    answer:
      "Many pilgrims prefer to carry a small amount of cash and exchange or withdraw more after arrival, since card payments cover most larger expenses in Saudi cities. Check current rates with our currency converter and speak to your travel agency for their specific recommendation.",
  },
];

export default function SaudiTravelTipsGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Saudi Travel Tips & Etiquette"
      description="Practical, everyday customs and etiquette for first-time Umrah pilgrims from Sri Lanka."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Saudi Arabia is welcoming to pilgrims year-round, and most of what
        first-timers worry about comes down to a handful of everyday habits
        that are easy to pick up once you know them. Here&rsquo;s a
        practical overview to help you settle in quickly — general
        guidance rather than official rules, so always follow your travel
        agency&rsquo;s specific briefing alongside this.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {sections.map((section) => (
          <Card key={section.title} className="flex-row items-start gap-4 p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
              <section.icon className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-brand-navy">
                {section.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Planning the rest of your trip? Check out our{" "}
        <Link href="/islamic-tools/packing-checklist" className="font-medium text-brand-navy underline underline-offset-2">
          packing checklist
        </Link>{" "}
        and{" "}
        <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          step-by-step Umrah guide
        </Link>{" "}
        to get everything else in order before you fly.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/saudi-travel-tips-guide" />
    </ToolShell>
  );
}
