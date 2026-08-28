import type { Metadata } from "next";
import Link from "next/link";
import { Footprints, Volume2, Sun, Users, Wallet, Building2, Map } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Hotels Near the Haram — Walking Distance Guide for Umrah Pilgrims",
  description:
    "A general guide to choosing a Makkah hotel by distance from Masjid al-Haram — typical walking-time bands, the real trade-offs between cost and convenience, and how to check the actual distance for a specific package.",
  alternates: { canonical: "/islamic-tools/hotels-near-haram-guide" },
  keywords: [
    "hotels near haram makkah",
    "walking distance to haram",
    "umrah hotel distance guide",
    "makkah hotel distance from haram",
    "umrah accommodation guide",
  ],
};

const distanceBands = [
  {
    range: "Under ~200m",
    time: "~2–4 min walk",
    tier: "Usually the most expensive tier",
    tierVariant: "gold" as const,
    note: "Often within sight of the Haram itself, with the shortest possible walk back after every prayer.",
  },
  {
    range: "~200–500m",
    time: "~5–10 min walk",
    tier: "Close but more affordable",
    tierVariant: "goldOutline" as const,
    note: "A common sweet spot — still an easy, short walk, usually at a noticeably lower price than the closest tier.",
  },
  {
    range: "~500m–1km",
    time: "~10–20 min walk",
    tier: "Noticeably cheaper",
    tierVariant: "muted" as const,
    note: "Still walkable for most pilgrims, especially in cooler weather or with a bit of extra time built in.",
  },
  {
    range: "Over 1km",
    time: "Short taxi/shuttle usually needed",
    tier: "Most budget-friendly",
    tierVariant: "outline" as const,
    note: "Real savings, but expect to rely on transport for at least some prayers — especially in the heat.",
  },
];

const faqs = [
  {
    question: "Is closer to the Haram always better?",
    answer:
      "Not necessarily — it depends on your priorities. A closer hotel saves walking time and is especially valuable for elderly pilgrims or anyone with mobility limitations, but it usually costs more and can be noisier. A hotel a little further out can mean real savings and a quieter room, at the cost of a longer walk or occasional taxi ride. Neither is objectively right; it's a trade-off to weigh against your budget, health and how much you value convenience.",
  },
  {
    question: "Do these distance bands apply to a specific hotel I'm considering?",
    answer:
      "No — these bands are general estimates meant to help you think about the trade-offs, not a measurement of any particular hotel. To check the actual distance for a specific package, look at that package's page on this site: where the listed agency has supplied hotel coordinates, we show a real walking-route map with an actual distance and walking time, not a guess.",
  },
  {
    question: "Does distance matter more at certain times of year?",
    answer:
      "Yes. During very hot months, a longer walk is far more taxing, so proximity (or reliable transport) matters more. During Ramadan and Hajj-adjacent periods, the areas immediately around the Haram become extremely crowded, so even a short walk can take much longer than usual, and a hotel a bit further out with easier movement can sometimes be more practical than one that's technically closer.",
  },
  {
    question: "What about the Abraj Al-Bait (Clock Tower) complex?",
    answer:
      "The Abraj Al-Bait complex — commonly known as the Clock Tower — is a well-known landmark directly adjacent to Masjid al-Haram, and its scale is part of why the immediate surroundings of the Haram are so recognisable. That's general public knowledge about the skyline, not a claim about pricing or availability at any specific property — for real pricing, always check the package or hotel listing itself.",
  },
];

export default function HotelsNearHaramGuidePage() {
  return (
    <ToolShell
      eyebrow="Choosing where to stay"
      title="Hotels Near the Haram: A Walking-Distance Guide"
      description="A general guide to how walking distance from Masjid al-Haram shapes hotel cost and comfort — so you know what to weigh up before you book."
    >
      <p className="text-sm text-muted-foreground">
        One of the biggest factors in how an Umrah trip actually feels day to
        day is how far your hotel is from Masjid al-Haram. It affects your
        budget, how tired you&rsquo;ll be after five daily prayers, and how much
        you can simply pop back to your room between them. This guide walks
        through the general distance bands pilgrims commonly use to think
        about this, and the real trade-offs behind each one — it isn&rsquo;t
        pricing or availability for any specific hotel.
      </p>

      <div className="mt-8">
        <h2 className="font-display text-base font-semibold text-brand-navy">
          General walking-distance bands
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These are typical estimates pilgrims use as a rule of thumb, not
          measured facts about any particular hotel.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distance from Haram</TableHead>
                <TableHead>Walking time</TableHead>
                <TableHead>Typical price tier</TableHead>
                <TableHead>What to expect</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distanceBands.map((band) => (
                <TableRow key={band.range}>
                  <TableCell className="font-medium text-brand-navy">{band.range}</TableCell>
                  <TableCell className="text-muted-foreground">{band.time}</TableCell>
                  <TableCell>
                    <Badge variant={band.tierVariant}>{band.tier}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">{band.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Footprints className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Convenience vs. cost</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A closer hotel means less walking, easier trips back to your
              room to rest, wash up or nap between prayers, and generally
              less fatigue over a multi-day trip. That convenience is
              especially valuable for elderly pilgrims and anyone with
              mobility limitations, for whom a long walk five times a day can
              be genuinely difficult. It typically comes at a real price
              premium, though — proximity to the Haram is one of the biggest
              drivers of hotel cost in Makkah.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Wallet className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Farther out can mean real savings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Moving even a few hundred metres further from the Haram can
              noticeably lower the room rate. The trade-off is more walking
              per prayer, or leaning on a short taxi or shuttle ride,
              particularly once you&rsquo;re beyond about a kilometre. For pilgrims
              who are comfortable walking and are trying to control costs,
              this is often a sensible way to free up budget for other parts
              of the trip.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Volume2 className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Noise is part of the trade-off too</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Hotels in the immediate vicinity of the Haram sit in one of the
              busiest, most active areas in the world around the clock —
              crowds, traffic and the constant activity of the area can mean
              more noise, even from a well-appointed room. A hotel a little
              further out is often quieter, which matters if you&rsquo;re
              travelling with young children, need to rest during the day, or
              simply prefer a calmer base.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Sun className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Heat changes the calculation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A 15–20 minute walk feels very different in cooler weather than
              it does under the midday sun during Makkah&rsquo;s hottest months.
              If you&rsquo;re travelling during a hot period, or you know heat
              affects you more than most, weighting your decision toward a
              closer hotel — or confirming reliable shuttle transport is
              available — is worth the extra cost for many pilgrims.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Users className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Ramadan and Hajj-adjacent crowds</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              During Ramadan and periods close to Hajj, the streets and
              approaches around Masjid al-Haram become extremely crowded.
              Even a short walk can take considerably longer than usual, and
              moving through dense crowds is more tiring than the same
              distance on a quiet day. If you&rsquo;re travelling during one of
              these peak periods, factor that extra time and effort into your
              decision, not just the raw distance figure.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-gray/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Building2 className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">The Abraj Al-Bait (Clock Tower) complex</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The Abraj Al-Bait complex — widely known as the Clock Tower — is
              one of the most recognisable landmarks in the world, standing
              directly adjacent to Masjid al-Haram. Its scale is a big part
              of why the skyline immediately around the Haram looks the way
              it does. That&rsquo;s general public knowledge about a famous
              landmark, not a specific claim about pricing, availability or
              distance for any hotel within or near it — always confirm those
              details on the actual package or hotel listing.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <Map className="size-5" />
          </div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Don&rsquo;t guess — check the real distance for a specific package
          </h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Everything above is a general reference, not a measurement of any
          particular hotel. When you&rsquo;re comparing actual{" "}
          <Link href="/packages" className="font-medium text-brand-navy underline underline-offset-2">
            Umrah packages
          </Link>{" "}
          on this site, package pages that include hotel coordinates from the
          listing agency show a real walking-route map with an actual
          distance and walking time to the Haram — genuinely useful for
          verifying a specific package&rsquo;s hotel location rather than relying
          on a marketing description. If a listing doesn&rsquo;t show this map, it
          simply means the agency hasn&rsquo;t supplied coordinates for that hotel
          yet, so it&rsquo;s worth asking them directly for the distance before you
          book.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Once you have a sense of how location affects price, it&rsquo;s also
          worth working out how that trade-off fits your overall trip
          budget — the{" "}
          <Link
            href="/islamic-tools/umrah-budget-calculator"
            className="font-medium text-brand-navy underline underline-offset-2"
          >
            Umrah Budget Calculator
          </Link>{" "}
          can help you see how a pricier, closer hotel weighs against food,
          transport and other costs across the whole trip.
        </p>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hotels-near-haram-guide" />
    </ToolShell>
  );
}
