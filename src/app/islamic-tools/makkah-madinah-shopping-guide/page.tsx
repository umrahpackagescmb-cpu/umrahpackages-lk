import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  CircleDot,
  Droplet,
  Cherry,
  Shirt,
  Sparkles,
  BookOpen,
  Gift,
  Building2,
  Store,
  MapPin,
  HandCoins,
  Luggage,
  type LucideIcon,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Makkah & Madinah Shopping Guide — What to Buy, Where & Bargaining Tips",
  description:
    "A practical shopping guide for Umrah pilgrims — what pilgrims commonly buy in Makkah and Madinah, where to shop, bargaining etiquette, and Zamzam water carriage and luggage tips.",
  alternates: { canonical: "/islamic-tools/makkah-madinah-shopping-guide" },
  keywords: [
    "shopping in makkah",
    "umrah souvenirs",
    "what to buy in madinah",
    "zamzam water carriage rules",
    "makkah shopping guide",
    "madinah souvenirs",
  ],
};

interface GuideSection {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const buyItems: GuideSection[] = [
  {
    icon: Layers,
    title: "Prayer mats (musallah)",
    body: (
      <>
        A lightweight, foldable prayer mat is one of the most popular things
        pilgrims bring home, both for themselves and as a gift. You&rsquo;ll
        find them in a huge range of sizes, materials and price points, from
        simple travel mats to more elaborate woven pieces.
      </>
    ),
  },
  {
    icon: CircleDot,
    title: "Tasbih (prayer beads)",
    body: (
      <>
        Sets of prayer beads for dhikr are sold almost everywhere, in
        materials ranging from simple plastic to wood, gemstone and
        silver-accented pieces. They&rsquo;re a compact, inexpensive gift
        that many pilgrims buy in bulk for friends and family.
      </>
    ),
  },
  {
    icon: Droplet,
    title: "Zamzam water",
    body: (
      <>
        Zamzam water is one of the most meaningful things to bring home, and
        sealed containers are widely available near the Haram and at the
        airport before departure. There are rules and limits on how much you
        can carry on a flight, and these vary by airline and route — check
        with your airline directly before you buy, so you don&rsquo;t end up
        with more than you can actually take with you.
      </>
    ),
  },
  {
    icon: Cherry,
    title: "Dates, especially Ajwa from Madinah",
    body: (
      <>
        Dates are a classic Umrah souvenir, and Madinah in particular is well
        known for Ajwa dates, a soft, dark variety associated with the city.
        Dates travel well and make a popular, practical gift, though boxed or
        vacuum-packed dates are easiest to pack without a mess.
      </>
    ),
  },
  {
    icon: Shirt,
    title: "Ihram sets & Islamic attire",
    body: (
      <>
        Ihram sets, abayas, thobes and other modest Islamic clothing are
        widely sold, and picking up a spare Ihram or a change of comfortable
        attire is common, whether for yourself or as a gift for someone back
        home.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: "Perfumes — oud & attar",
    body: (
      <>
        Non-alcohol-based oud and attar perfumes are a well-known specialty
        of the region, and you&rsquo;ll find a wide range of scents and price
        points in both malls and traditional markets. These oil-based
        fragrances are also a practical option if you&rsquo;re keeping to
        Ihram restrictions on scent during that part of your trip.
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "The Quran & Islamic books",
    body: (
      <>
        Copies of the Quran, translations and other Islamic books are widely
        available, often in multiple languages, and make a lasting gift for
        family and friends.
      </>
    ),
  },
  {
    icon: Gift,
    title: "Gifts for family back home",
    body: (
      <>
        Beyond the specific items above, many pilgrims set aside a general
        shopping budget just for gifts, since it&rsquo;s customary to bring
        something back for family, neighbours and colleagues. Small, light
        items are easiest to pack in volume if your list is long.
      </>
    ),
  },
];

const shopAreas: GuideSection[] = [
  {
    icon: Building2,
    title: "Large, modern malls",
    body: (
      <>
        Large shopping malls sit close to the Haram towers in both Makkah
        and Madinah, with familiar international and local retail brands,
        air conditioning, and fixed price tags — a comfortable, convenient
        option if you&rsquo;d rather not haggle.
      </>
    ),
  },
  {
    icon: Store,
    title: "Traditional souks & markets",
    body: (
      <>
        Traditional souks and markets offer a more local, hands-on shopping
        experience, often with a wider range of smaller, independent stalls
        and more room to negotiate on price. They&rsquo;re a good choice if
        you enjoy browsing and don&rsquo;t mind spending a bit more time to
        find the right price.
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Hotel & mosque-adjacent shops",
    body: (
      <>
        Small shops built into or right around your hotel and near the
        mosque entrances are the easiest option for quick, convenience buys
        between prayers, though the range on offer is naturally smaller than
        a mall or souk.
      </>
    ),
  },
];

const faqs = [
  {
    question: "Is it okay to bargain in Makkah and Madinah?",
    answer:
      "Yes — in traditional souks and markets, bargaining is a normal, expected part of shopping and locals won't mind you trying. In malls and shops with fixed price tags, prices are generally not negotiable, so save your haggling for the souks, and keep it polite and good-humoured either way.",
  },
  {
    question: "How much Zamzam water can I carry home?",
    answer:
      "This depends entirely on your airline, route, and whether it's checked or hand luggage — allowances and packaging rules vary between carriers and do change, so always check directly with your airline before you buy more than you can take with you. Many pilgrims confirm their airline's rule first, then buy sealed Zamzam water to match it.",
  },
  {
    question: "What's a good, practical gift to bring back for a lot of people?",
    answer:
      "Dates, tasbih and small prayer mats are popular choices because they're compact, relatively inexpensive per unit, and meaningful — easy to buy in bulk without taking up too much luggage space.",
  },
  {
    question: "Should I do my shopping early in the trip or leave it until the end?",
    answer:
      "Many pilgrims prefer to leave the bulk of their shopping for closer to departure, so they're not carrying extra bags around for the rest of the trip or worrying about items getting damaged. Just build in enough time before you fly, since shops and queues can get busy in the final days.",
  },
];

export default function MakkahMadinahShoppingGuidePage() {
  return (
    <ToolShell
      eyebrow="Bring something home"
      title="Makkah & Madinah Shopping Guide"
      description="What pilgrims commonly buy, where to shop, and how to bargain and pack it all home."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Shopping is part of most pilgrims&rsquo; trip, whether it&rsquo;s
        picking up a prayer mat for yourself or gifts for everyone back
        home. This is a general overview of what people commonly buy, the
        kinds of places you&rsquo;ll find to shop, and a few practical tips
        — not a list of specific shops or prices, since those change often
        and are best checked on the ground or with your travel agency.
      </p>

      <h2 className="mt-8 font-display text-base font-semibold text-brand-navy">
        What pilgrims commonly buy
      </h2>
      <div className="mt-4 flex flex-col gap-5">
        {buyItems.map((item) => (
          <Card key={item.title} className="flex-row items-start gap-4 p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
              <item.icon className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-base font-semibold text-brand-navy">
        Where to shop
      </h2>
      <div className="mt-4 flex flex-col gap-5">
        {shopAreas.map((area) => (
          <Card key={area.title} className="flex-row items-start gap-4 p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
              <area.icon className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-brand-navy">
                {area.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {area.body}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 font-display text-base font-semibold text-brand-navy">
        Bargaining & packing it home
      </h2>
      <div className="mt-4 flex flex-col gap-5">
        <Card className="flex-row items-start gap-4 p-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <HandCoins className="size-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-brand-navy">
              A note on bargaining
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Bargaining is common and generally expected in traditional
              souks and markets, much less so in malls and shops with
              clearly marked, fixed prices. If you&rsquo;re somewhere
              bargaining feels appropriate, approach it politely and with
              good humour rather than aggressively — a smile, a bit of
              patience, and a willingness to walk away often bring the price
              down further, and it&rsquo;s a normal, friendly part of the
              exchange on both sides rather than a confrontation.
            </p>
          </div>
        </Card>
        <Card className="flex-row items-start gap-4 p-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <Luggage className="size-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-brand-navy">
              Leave room in your luggage
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Try to leave a little room and weight allowance in your
              luggage for the trip home before you start shopping, rather
              than filling every bag on the way out. Baggage allowances vary
              by airline, route and ticket type, and change from time to
              time, so check your specific airline&rsquo;s current checked
              and hand-luggage limits before you buy anything bulky, heavy,
              or liquid — including Zamzam water, which typically has its
              own separate carriage rules. When in doubt, ask your airline
              directly rather than assuming last year&rsquo;s, or someone
              else&rsquo;s, allowance still applies to you.
            </p>
          </div>
        </Card>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Planning the rest of your trip? Use our{" "}
        <Link
          href="/islamic-tools/packing-checklist"
          className="font-medium text-brand-navy underline underline-offset-2"
        >
          packing checklist
        </Link>{" "}
        to make sure you&rsquo;ve got room for what you bring back, and our{" "}
        <Link
          href="/islamic-tools/umrah-budget-calculator"
          className="font-medium text-brand-navy underline underline-offset-2"
        >
          budget calculator
        </Link>{" "}
        to set aside a realistic shopping allowance alongside everything
        else.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/makkah-madinah-shopping-guide" />
    </ToolShell>
  );
}
