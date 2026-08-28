import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Smartphone,
  Car,
  Train,
  Bus,
  Footprints,
  type LucideIcon,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Saudi Transport & Taxi Guide — Getting Around for Umrah",
  description:
    "How pilgrims get around Saudi Arabia for Umrah — agency transfers, Uber and Careem, official taxis, the Haramain High Speed Rail, SAPTCO buses, and walking near the Haram.",
  alternates: { canonical: "/islamic-tools/saudi-transport-guide" },
  keywords: [
    "makkah to madinah transport",
    "taxi in makkah",
    "haramain train",
    "umrah transport guide",
    "saudi arabia transport for pilgrims",
    "uber careem makkah madinah",
  ],
};

interface TransportSection {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const sections: TransportSection[] = [
  {
    icon: Briefcase,
    title: "Agency-arranged transport",
    body: (
      <>
        If you&rsquo;re travelling on a package, airport transfers and the
        inter-city legs — Jeddah or Madinah airport to your hotel, and
        Makkah to Madinah or back — are usually already arranged by your
        travel agency as part of the package. This is generally the easiest
        option for most pilgrims, since it means one less thing to book
        yourself. Check your itinerary or ask your agency&rsquo;s
        coordinator exactly which transfers are included before you rely on
        any of the options below.
      </>
    ),
  },
  {
    icon: Smartphone,
    title: "Ride-hailing apps (Uber & Careem)",
    body: (
      <>
        Uber and Careem both operate widely across Saudi Arabia, including
        in Makkah and Madinah, and are commonly used by pilgrims for
        shorter trips — to a nearby mall, a restaurant, or between your
        hotel and the edge of the pedestrian zone around the Haram.
        They&rsquo;re generally straightforward to use with an
        international phone number and a card, and fares are shown upfront
        in the app before you confirm a ride. As with most ride-hailing
        services, pricing can rise during busy periods, so check the fare
        shown in-app before booking.
      </>
    ),
  },
  {
    icon: Car,
    title: "Official taxis",
    body: (
      <>
        Official taxis are also widely available, typically found at
        hotels, taxi stands, and near major landmarks. They&rsquo;re a
        reasonable option if you&rsquo;d rather flag a ride in person
        instead of using an app, though as with taxis anywhere, it&rsquo;s
        worth confirming the fare — or that the meter is running — before
        you set off. Ride-hailing and official taxis are generally a
        pricier way to cover a given route than the train or bus, so
        they&rsquo;re best suited to shorter, convenience-driven trips
        rather than the long Makkah–Madinah leg.
      </>
    ),
  },
  {
    icon: Train,
    title: "Haramain High Speed Rail",
    body: (
      <>
        The Haramain High Speed Rail is a modern train line connecting
        Makkah, Jeddah (including King Abdulaziz International Airport),
        and Madinah, and it&rsquo;s a fast, comfortable way to cover the
        inter-city distance without the fatigue of a long road trip. It&rsquo;s
        a popular choice among pilgrims for the Makkah–Madinah journey in
        particular. Schedules and current ticket pricing are best checked
        directly through the official Haramain rail channels or your travel
        agency closer to your travel dates, since these can change.
      </>
    ),
  },
  {
    icon: Bus,
    title: "SAPTCO buses",
    body: (
      <>
        SAPTCO is Saudi Arabia&rsquo;s national public bus operator and
        also runs routes that serve pilgrims travelling between cities. Bus
        travel is generally the most budget-friendly of the inter-city
        options, though journeys naturally take longer than the train.
        It&rsquo;s a reasonable fallback if rail tickets for your preferred
        time aren&rsquo;t available — check current routes, timings and
        fares at a SAPTCO counter or through your agency.
      </>
    ),
  },
  {
    icon: Footprints,
    title: "Walking near the Haram",
    body: (
      <>
        Once you&rsquo;re in the immediate vicinity of either Haram, much
        of the core area around it is pedestrian-only, so walking is often
        the most practical way to get around for that last stretch —
        between your hotel, the Haram, and nearby shops or restaurants. Wear
        comfortable, well-worn footwear, and budget extra time for the
        walk during peak crowd periods, since these zones can get very
        busy, especially around prayer times.
      </>
    ),
  },
];

const faqs = [
  {
    question: "Do I need to arrange my own transport for Umrah?",
    answer:
      "Usually not, if you're travelling on a package — airport transfers and the Makkah-Madinah leg are typically already included and arranged by your agency. Confirm exactly what's covered in your itinerary, and use the options on this page for anything extra, like a short trip to a restaurant or mall.",
  },
  {
    question: "Is it safe to use Uber or Careem in Makkah and Madinah?",
    answer:
      "Yes, both apps are widely used by pilgrims and locals alike and operate normally in both cities. As with any ride-hailing app, check the driver and vehicle details shown in-app match the car that arrives, and confirm the fare shown before you confirm the trip.",
  },
  {
    question: "What's the best way to get from Makkah to Madinah?",
    answer:
      "For most pilgrims, this leg is already arranged by their agency. If you're arranging it yourself, the Haramain High Speed Rail is generally the fastest and most comfortable option, with SAPTCO buses as a more budget-friendly alternative and taxis or ride-hailing typically the priciest way to cover the same distance. Check current schedules and fares closer to your travel dates.",
  },
  {
    question: "Can I walk everywhere once I'm near the Haram?",
    answer:
      "For short distances within the immediate area, yes — much of the core zone around both Haramain is pedestrian-only, so walking is often the simplest way to get between your hotel and the mosque. For anything further, such as a different neighbourhood or between cities, you'll want a taxi, ride-hailing app, bus, or train instead.",
  },
];

export default function SaudiTransportGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Saudi Transport & Taxi Guide"
      description="How pilgrims get around Saudi Arabia for Umrah — from agency transfers to taxis, trains, buses, and walking near the Haram."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Getting around Saudi Arabia for Umrah is generally straightforward,
        with several reliable options covering everything from airport
        transfers to short hops near the Haram. Here&rsquo;s a practical
        overview of what&rsquo;s available — general guidance rather than a
        booking service, so always check current pricing and schedules with
        the relevant app, counter, or your travel agency closer to your
        trip.
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
        Planning the rest of your trip? Check our{" "}
        <Link href="/islamic-tools/saudi-travel-tips-guide" className="font-medium text-brand-navy underline underline-offset-2">
          travel tips & etiquette guide
        </Link>{" "}
        and{" "}
        <Link href="/islamic-tools/umrah-budget-calculator" className="font-medium text-brand-navy underline underline-offset-2">
          budget calculator
        </Link>{" "}
        to get everything else in order before you fly.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/saudi-transport-guide" />
    </ToolShell>
  );
}
