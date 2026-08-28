import type { Metadata } from "next";
import Link from "next/link";
import { DoorOpen, Droplets, Accessibility, ArrowUpDown, HelpCircle, Info } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Masjid al-Haram Facilities Guide — Gates, Zamzam, Accessibility & More",
  description:
    "What to know about Masjid al-Haram's gates, Zamzam stations, wheelchair access, elevators and service counters — a general orientation guide, not a pinpoint map.",
  alternates: { canonical: "/islamic-tools/masjid-al-haram-facilities-guide" },
  keywords: [
    "masjid al haram facilities",
    "haram gates guide",
    "zamzam water stations",
    "wheelchair access masjid al haram",
    "haram elevators toilets",
  ],
};

const faqs = [
  {
    question: "Why isn't this an interactive map with exact pin locations?",
    answer:
      "We looked into building one, but we don't have a verified, official source for exact facility coordinates inside Masjid al-Haram — and pinpointing gates, toilets, or accessibility routes incorrectly could genuinely mislead someone trying to navigate a huge, crowded building. Rather than guess or invent coordinates, we've kept this to general, reliably true orientation guidance, and we'll consider adding a real interactive map in future if an official, verified data source becomes available to us.",
  },
  {
    question: "Where can I find the current, official layout?",
    answer:
      "Signage inside Masjid al-Haram itself, the mosque's own staff and volunteers (easy to spot and generally very helpful with directions), and your agency's on-ground guide are the most reliable sources for exact current directions — the layout and numbering can also be adjusted during expansion works, so on-the-ground signage is always more current than anything published elsewhere.",
  },
  {
    question: "Is wheelchair assistance available?",
    answer:
      "Yes — Masjid al-Haram has dedicated accessibility provisions including wheelchair lanes (notably through the Safa-Marwah gallery) and wheelchair rental/assistance points. Ask any mosque staff member or your group's guide on arrival for the nearest one, since exact locations can shift with ongoing construction and crowd management changes.",
  },
  {
    question: "What should I do if I get separated from my group?",
    answer:
      "Agree on a specific, well-known meeting point with your group before you go in each time (a numbered gate or a landmark your guide specifies), keep your hotel's name and address written down or saved offline, and know your agency coordinator's phone number by heart or on a card in your pocket — phone networks can be unreliable in extremely dense crowds.",
  },
];

export default function MasjidAlHaramFacilitiesGuidePage() {
  return (
    <ToolShell
      eyebrow="Getting your bearings"
      title="Masjid al-Haram Facilities Guide"
      description="General orientation for gates, Zamzam stations, accessibility and more — not a pinpoint map."
    >
      <Card className="border-brand-gold/30 bg-brand-gold/5">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Info className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
          <p className="text-sm text-muted-foreground">
            We deliberately did not build an interactive, pin-by-pin facility map for this page.
            Masjid al-Haram is a vast, still-expanding building, and we don&rsquo;t have a verified
            official source for exact facility coordinates — publishing invented or outdated
            positions for things like toilets, elevators, or accessibility routes could genuinely
            mislead pilgrims trying to navigate a huge, crowded space. What follows is general,
            reliably-true orientation guidance instead: what exists, roughly where to expect it, and
            who to ask on the day for exact current directions.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <DoorOpen className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Gates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Masjid al-Haram has dozens of numbered gates around its perimeter, each clearly marked
              with large signage in Arabic and English. With today&rsquo;s crowd sizes, staff often
              direct pilgrims to a specific entry gate based on real-time crowd flow rather than
              letting everyone choose freely — follow their direction rather than insisting on a
              particular gate. Whichever gate you enter through is completely valid for beginning
              your visit.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Droplets className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Zamzam water stations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Coolers and dedicated Zamzam water points are distributed widely throughout the mosque,
              including multiple floors, so you&rsquo;re rarely far from one. Cups are provided at the
              stations — there&rsquo;s generally no need to bring your own, though a small reusable bottle
              can be handy if you&rsquo;d like to carry water with you as you move around.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Accessibility className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Accessibility & wheelchair services</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The mosque provides wheelchair lanes and rental/assistance points to support elderly
              and disabled pilgrims, including a dedicated lane through the Safa-Marwah gallery for
              Sa&rsquo;i. If you or someone you&rsquo;re travelling with needs this kind of
              assistance, mention it to your agency before you travel so they can plan accordingly,
              and ask mosque staff for the nearest access point once you&rsquo;re there.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <ArrowUpDown className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Multiple floors, elevators & escalators</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Masjid al-Haram spans several floors, including upper levels used for Tawaf when the
              ground floor mataf is extremely crowded — a completely valid way to perform your seven
              circuits if the crowd calls for it. Elevators and escalators connect the floors at
              various points; if you&rsquo;re travelling with someone who has mobility difficulty, ask
              staff for the nearest elevator rather than assuming stairs are the only option.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <HelpCircle className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Toilets, ablution areas & lost &amp; found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Large ablution (wudu) and toilet facilities are located around the mosque&rsquo;s
              perimeter and in the surrounding complex, sign-posted from inside. A general lost and
              found / information service point also exists for exactly the kind of situation
              described above — if you get separated from your group or misplace an item, ask any
              staff member to direct you there.
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Pair this with our{" "}
        <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Step-by-Step Umrah Guide
        </Link>{" "}
        for the full ritual sequence, and our{" "}
        <Link href="/islamic-tools/hotels-near-haram-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Hotels Near the Haram
        </Link>{" "}
        guide if you&rsquo;re still choosing where to stay.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/masjid-al-haram-facilities-guide" />
    </ToolShell>
  );
}
