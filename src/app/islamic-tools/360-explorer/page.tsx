import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "360° Holy Places Explorer — Virtual Tours of Makkah & Madinah",
  description:
    "Real, external 360° and panoramic resources for exploring the Kaaba, Masjid al-Haram and Masjid an-Nabawi virtually before your trip — curated links, not embedded fabricated content.",
  alternates: { canonical: "/islamic-tools/360-explorer" },
  keywords: [
    "360 virtual tour masjid al haram",
    "kaaba virtual tour",
    "masjid an nabawi 360",
    "explore makkah madinah online",
  ],
};

interface ExternalResource {
  name: string;
  url: string;
  publisher: string;
  description: string;
}

const resources: ExternalResource[] = [
  {
    name: "Masjid al-Haram on Google Arts & Culture",
    url: "https://artsandculture.google.com/entity/masjid-al-haram/m024hbf",
    publisher: "Google Arts & Culture",
    description:
      "A curated collection of photos, stories and background on Masjid al-Haram, hosted on Google's free cultural archive platform.",
  },
  {
    name: "The Kaaba on Google Arts & Culture",
    url: "https://artsandculture.google.com/entity/m01lh2j",
    publisher: "Google Arts & Culture",
    description: "Google Arts & Culture's dedicated entry for the Kaaba itself, with imagery and context.",
  },
  {
    name: "“Hajj up Close” story",
    url: "https://artsandculture.google.com/story/qAVBZHn_bJPWIg",
    publisher: "Google Arts & Culture",
    description: "A visual, story-format walkthrough of the Hajj journey and its holy sites.",
  },
  {
    name: "Masjid al-Haram panorama gallery",
    url: "https://www.360cities.net/image/al-masjid-al-haram-al-haram-mosque-1",
    publisher: "360Cities.net",
    description:
      "A long-running, independent panoramic-photography platform with drag-to-look-around 360° images contributed by photographers around the world, including views of Masjid al-Haram.",
  },
];

const faqs = [
  {
    question: "Why are these links instead of a tour built into this page?",
    answer:
      "The imagery and panoramas involved belong to the platforms and photographers who created them, so the honest way to share them is to link to the real source rather than copy or re-host their work here. It also means you're always seeing their current, maintained version rather than a copy that could go stale on our end.",
  },
  {
    question: "Are these official Saudi government tours?",
    answer:
      "No — Google Arts & Culture and 360Cities.net are both independent, well-established platforms, not run by Saudi authorities. We've linked to them because they're free, real, and genuinely useful for getting a sense of the holy sites before you travel, not because they're official.",
  },
  {
    question: "Can I find more 360° or VR videos elsewhere?",
    answer:
      "Yes — searching “Masjid al-Haram 360 virtual tour” or “Masjid an-Nabawi VR” on YouTube brings up a range of immersive videos from different creators. We haven't linked specific videos here since individual uploads can be taken down or changed over time, and we'd rather send you to a search than a broken link.",
  },
  {
    question: "Does this replace actually going?",
    answer:
      "Not remotely — it's simply a way to get a visual sense of the places beforehand, especially useful for first-timers or for building excitement with family before the trip. Nothing online captures what being there in person feels like.",
  },
];

export default function ThreeSixtyExplorerPage() {
  return (
    <ToolShell
      eyebrow="See it before you go"
      title="360° Holy Places Explorer"
      description="Real external resources for exploring the Kaaba, Masjid al-Haram and Masjid an-Nabawi virtually."
    >
      <Card className="border-brand-gold/30 bg-brand-gold/5">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Info className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
          <p className="text-sm text-muted-foreground">
            We don&rsquo;t host or fabricate 360&deg; imagery ourselves — the panoramas and photos
            below belong to real platforms that specialise in exactly this. Each link opens in a new
            tab, on the original publisher&rsquo;s own site.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-4">
        {resources.map((r) => (
          <Card key={r.url}>
            <CardHeader>
              <CardTitle className="text-brand-navy">{r.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{r.description}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy underline underline-offset-2"
              >
                Visit on {r.publisher} <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Once you&rsquo;ve had a look around, our{" "}
        <Link href="/islamic-tools/umrah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Step-by-Step Umrah Guide
        </Link>{" "}
        and{" "}
        <Link href="/islamic-tools/ziyarah-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Ziyarah Guide
        </Link>{" "}
        cover what you&rsquo;ll actually be doing and visiting once you&rsquo;re there.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/360-explorer" />
    </ToolShell>
  );
}
