import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  UtensilsCrossed,
  ChefHat,
  Hotel,
  Globe,
  GlassWater,
  ShoppingBag,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Halal Food Guide for Makkah & Madinah — What to Expect",
  description:
    "A practical guide to eating in Makkah and Madinah — why food in Saudi Arabia is halal by default, the general price tiers near the Haram, Zamzam water, Ajwa dates, and Ramadan iftar spreads.",
  alternates: { canonical: "/islamic-tools/halal-food-guide" },
  keywords: [
    "halal food makkah madinah",
    "food guide umrah",
    "where to eat umrah",
    "halal food saudi arabia",
    "zamzam water",
    "ajwa dates madinah",
  ],
};

interface FoodSection {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const sections: FoodSection[] = [
  {
    icon: ShieldCheck,
    title: "Food in Saudi Arabia is halal by default",
    body: (
      <>
        This is genuinely one of the easiest parts of an Umrah trip:
        virtually all food served in Saudi Arabia is halal by default under
        the kingdom&rsquo;s food standards, since the country is
        Muslim-majority and its food regulations are built around this from
        the start. In practice, this means you generally don&rsquo;t need
        to hunt for a &ldquo;halal-certified&rdquo; label the way you might
        when travelling in a non-Muslim-majority country — a real relief
        for pilgrims who are used to checking every menu carefully back
        home or elsewhere.
      </>
    ),
  },
  {
    icon: UtensilsCrossed,
    title: "Budget options near the Haram",
    body: (
      <>
        Around both Masjid al-Haram and Masjid an-Nabawi, you&rsquo;ll find
        plenty of small eateries, bakeries, and quick-service spots serving
        South Asian and Middle Eastern food — think rice and curry
        counters, grills, shawarma stands, and simple bakeries. These are
        generally cheaper than sit-down restaurants and popular with
        pilgrims who want a quick, filling meal between prayers without a
        long wait.
      </>
    ),
  },
  {
    icon: ChefHat,
    title: "Mid-range restaurants",
    body: (
      <>
        A step up from the quick-service spots, both cities have a good
        number of proper sit-down restaurants — Middle Eastern, South
        Asian, and international cuisine — offering table service and a
        wider menu. These typically sit in the middle of the price range:
        pricier than a quick bakery stop, but noticeably cheaper than
        dining at a hotel.
      </>
    ),
  },
  {
    icon: Hotel,
    title: "Hotel dining",
    body: (
      <>
        Restaurants and cafés inside hotels near the Haram are typically
        the most expensive option, reflecting their prime location and the
        convenience of not having to step outside. They&rsquo;re a
        comfortable choice when you want an easy, reliable meal close to
        your room, but most pilgrims mix in cheaper options nearby to keep
        overall food costs down.
      </>
    ),
  },
  {
    icon: Globe,
    title: "Familiar cuisine & international chains",
    body: (
      <>
        Pilgrims from Sri Lanka often find South Asian and Middle Eastern
        cuisine easy to adjust to, since the flavours and staples —
        rice, curry, grilled meats, flatbreads — aren&rsquo;t far from
        home. If you&rsquo;d rather stick to something familiar, well-known
        global fast-food chains are generally present in Saudi Arabia&rsquo;s
        major cities as well, so a recognisable option is usually not far
        away if you need one.
      </>
    ),
  },
  {
    icon: GlassWater,
    title: "Zamzam water — free and everywhere",
    body: (
      <>
        Zamzam water is genuinely free and widely available throughout
        Masjid al-Haram and Masjid an-Nabawi, dispensed from coolers and
        taps placed all around both mosques. Bring a reusable bottle and
        top it up as you go — there&rsquo;s no need to buy bottled water
        while you&rsquo;re inside the Haram itself.
      </>
    ),
  },
  {
    icon: ShoppingBag,
    title: "Ajwa dates from Madinah",
    body: (
      <>
        Madinah is famous for Ajwa dates, a well-known local variety that
        pilgrims commonly buy to take home as gifts or to keep for
        themselves. They&rsquo;re a longstanding part of the Madinah
        pilgrim experience and widely sold across the city — a nice,
        culturally meaningful souvenir alongside whatever else is on your
        shopping list.
      </>
    ),
  },
  {
    icon: Moon,
    title: "Ramadan iftar spreads",
    body: (
      <>
        If your Umrah falls during Ramadan, you&rsquo;ll likely encounter
        the well-known tradition of community iftar spreads around the
        Haram — mats laid out with dates, food and drinks, largely funded
        by donations, where worshippers of all backgrounds are welcome to
        break their fast together. It&rsquo;s a long-standing and genuinely
        moving part of Ramadan in Makkah and Madinah.
      </>
    ),
  },
  {
    icon: Sun,
    title: "Hydration & food-safety tips for hot months",
    body: (
      <>
        In the hotter months, drink plenty of water throughout the day
        rather than only when you feel thirsty, and lean on the free
        Zamzam water around the Haram to stay topped up. If you have a
        sensitive stomach, be a little cautious with street food until
        you&rsquo;re confident in a particular spot, and pace yourself with
        spicy dishes if you&rsquo;re not used to them — it&rsquo;s easy to
        overdo it when everything smells this good.
      </>
    ),
  },
];

const faqs = [
  {
    question: "Do I need to check if food is halal in Saudi Arabia?",
    answer:
      "Generally, no. Virtually all food served in Saudi Arabia is halal by default under the kingdom's food standards, so you don't need to hunt for halal-certified labels the way you might in a non-Muslim-majority country. It's still sensible to use ordinary judgement around alcohol-adjacent items like certain desserts or imported products, but this isn't the constant label-checking exercise it can be elsewhere.",
  },
  {
    question: "Is food near the Haram expensive?",
    answer:
      "It varies by tier. Small eateries, bakeries and quick-service South Asian and Middle Eastern spots are generally cheaper, mid-range sit-down restaurants cost more, and hotel restaurants are typically the priciest option. Many pilgrims mix tiers — quick, cheap meals most days with the occasional restaurant or hotel meal — to keep their overall food budget manageable.",
  },
  {
    question: "Can I get food that feels like home?",
    answer:
      "Very likely. Pilgrims from Sri Lanka often find South Asian and Middle Eastern cuisine — rice, curry, grilled meats, flatbreads — easy to adjust to, and it's widely available near both Haram areas. Well-known international fast-food chains are also generally present in Saudi Arabia's major cities if you want something more familiar.",
  },
  {
    question: "Do I have to pay for Zamzam water?",
    answer:
      "No — Zamzam water is free and widely available throughout Masjid al-Haram and Masjid an-Nabawi via coolers and taps. Bring a reusable bottle so you can refill it easily as you move around the mosque.",
  },
];

export default function HalalFoodGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Halal Food Guide"
      description="What to expect when eating in Makkah and Madinah — price tiers, Zamzam water, Ajwa dates, and Ramadan iftar spreads."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Food is one of the areas where an Umrah trip is genuinely easier
        than travel to many other countries. Here&rsquo;s a practical
        overview of what to expect around Makkah and Madinah — general
        guidance rather than a list of specific restaurants or prices,
        since both vary by season and location.
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
        Trying to plan how much all of this will add up to? Our{" "}
        <Link
          href="/islamic-tools/umrah-budget-calculator"
          className="font-medium text-brand-navy underline underline-offset-2"
        >
          Umrah budget calculator
        </Link>{" "}
        includes a daily food estimate you can adjust to your own eating
        habits, alongside transport, laundry and the other costs that add
        up on top of your package price.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/halal-food-guide" />
    </ToolShell>
  );
}
