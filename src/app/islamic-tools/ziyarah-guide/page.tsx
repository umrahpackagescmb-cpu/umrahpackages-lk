import type { Metadata } from "next";
import Link from "next/link";
import { Info, MapPin } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { Card } from "@/components/ui/card";
import { sitesByRegion, type ZiyarahSite } from "@/lib/islamic/ziyarah-sites";

export const metadata: Metadata = {
  title: "Ziyarah Guide — Historical Sites Around Makkah & Madinah",
  description:
    "A guide to the historical and religious sites pilgrims commonly visit on an optional Ziyarah tour around Makkah and Madinah — Jabal al-Nour, Quba Mosque, Mount Uhud, and more.",
  alternates: { canonical: "/islamic-tools/ziyarah-guide" },
  keywords: [
    "ziyarah guide makkah madinah",
    "places to visit umrah",
    "jabal nour quba mosque",
    "ziyarah tour sites",
    "mount uhud madinah",
    "seven mosques madinah",
  ],
};

const faqs = [
  {
    question: "Is Ziyarah a required part of Umrah?",
    answer:
      "No. Ziyarah — visiting these historical and religious sites — is not one of the required rites of Umrah. It's a popular optional activity that most agencies build into their itineraries, usually as a half-day guided tour around Makkah and a separate one around Madinah, but skipping it doesn't affect the validity of your Umrah.",
  },
  {
    question: "Do I need to arrange Ziyarah tours myself?",
    answer:
      "Usually not. Most Umrah packages already include a guided Ziyarah tour, or your agency can arrange one locally with an approved guide and transport. Check your package details or ask your agency before assuming you'll need to organise transport yourself — many of the sites, like the mountain trails, aren't practical to reach without a guide who knows the current routes and rules.",
  },
  {
    question: "Can I go inside Al-Baqi or climb Jabal al-Nour?",
    answer:
      "It depends, and it can change. Al-Baqi's public access and specific practices are set by the local authorities and vary over time, so most pilgrims view it respectfully from outside. The climb to the Cave of Hira on Jabal al-Nour is physically demanding — a steep, roughly two-hour ascent — and is only suitable for pilgrims who are fit enough for it. Confirm what's actually open and advisable with your agency or guide on the day rather than assuming.",
  },
  {
    question: "How long does a full Ziyarah tour usually take?",
    answer:
      "It varies by agency and how many sites are included, but a single guided tour (Makkah sites or Madinah sites) commonly takes a half-day, since several sites involve travel time between them. Ask your agency for their specific itinerary and timing rather than assuming a fixed duration, as this isn't something we can state generally.",
  },
];

function SiteCard({ site }: { site: ZiyarahSite }) {
  return (
    <Card>
      <div>
        <p className="font-display text-base font-semibold text-brand-navy">
          {site.name}
        </p>
        {site.arabicOrAltName && (
          <p className="text-xs text-muted-foreground">{site.arabicOrAltName}</p>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{site.description}</p>
    </Card>
  );
}

export default function ZiyarahGuidePage() {
  const makkahSites = sitesByRegion("makkah");
  const madinahSites = sitesByRegion("madinah");

  return (
    <ToolShell
      eyebrow="Explore the holy sites"
      title="Ziyarah Guide"
      description="Historical and religious sites pilgrims commonly visit around Makkah and Madinah on an optional Ziyarah tour."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Beyond the rites of Umrah itself, many pilgrims spend part of their trip visiting sites
        with historical and religious significance around Makkah and Madinah — a practice
        commonly known as Ziyarah. This guide introduces the sites most often included on these
        tours, organised by city, so you know roughly what you&rsquo;re looking at when your group
        stops there.
      </p>

      <Card className="mt-6 flex-row items-start gap-3 border-brand-gold/30 bg-brand-gold/5">
        <Info className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
        <div>
          <p className="text-sm font-semibold text-brand-navy">
            Ziyarah tours are optional and locally arranged
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            These sites are typically visited as an optional guided Ziyarah tour, often arranged
            by your Umrah agency or a local guide rather than something you organise on your own.
            Access, opening hours, and which areas are open to visitors at any given site can
            change and are set by local authorities — always confirm current access with your
            agency or guide on the day rather than assuming it matches what&rsquo;s written here.
          </p>
        </div>
      </Card>

      <div className="mt-10 flex items-center gap-2">
        <MapPin className="size-5 text-brand-gold-dark" />
        <h2 className="font-display text-lg font-semibold text-brand-navy">Around Makkah</h2>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {makkahSites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      <div className="mt-10 flex items-center gap-2">
        <MapPin className="size-5 text-brand-gold-dark" />
        <h2 className="font-display text-lg font-semibold text-brand-navy">Around Madinah</h2>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {madinahSites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Many{" "}
        <Link href="/packages" className="font-medium text-brand-navy underline underline-offset-2">
          Umrah packages
        </Link>{" "}
        already include a guided Ziyarah tour of these sites around Makkah and Madinah — check
        your package details, or browse{" "}
        <Link href="/agencies" className="font-medium text-brand-navy underline underline-offset-2">
          verified agencies
        </Link>{" "}
        on this site if you&rsquo;d like to confirm what&rsquo;s included before you book.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/ziyarah-guide" />
    </ToolShell>
  );
}
