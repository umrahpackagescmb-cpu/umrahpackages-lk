import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { QiblaWidget } from "@/components/islamic/qibla-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Qibla Finder — Find the Direction to Makkah",
  description: "Find the exact direction (Qibla) to the Kaaba in Makkah from your current location or any city, calculated using the great-circle bearing — free, no account needed.",
  alternates: { canonical: "/islamic-tools/qibla-finder" },
  keywords: ["qibla finder", "qibla direction", "qibla compass", "direction to kaaba", "qibla direction sri lanka"],
};

const faqs = [
  {
    question: "How is the Qibla direction calculated?",
    answer: "This tool calculates the great-circle bearing — the shortest path over the Earth's curved surface — from your location to the Kaaba's coordinates in Makkah, which is the standard method used by Qibla compasses and apps.",
  },
  {
    question: "Do I need to allow location access?",
    answer: "Allowing location access gives you the most accurate reading for exactly where you are. You can also search for a specific city instead if you'd rather not share your location.",
  },
  {
    question: "Is a digital Qibla finder as accurate as a physical compass?",
    answer: "It's accurate for the calculation itself, but your device's compass sensor and any nearby metal or magnetic interference can affect the reading — for critical use (like a new prayer space), it's worth double-checking against a known Qibla direction nearby.",
  },
];

export default function QiblaFinderPage() {
  return (
    <ToolShell
      eyebrow="Face the right direction"
      title="Qibla Finder"
      description="Calculates the great-circle bearing from your location to the Kaaba in Makkah."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Qibla Finder — Find the Direction to Makkah",
          description:
            "Find the exact direction (Qibla) to the Kaaba in Makkah from your current location or any city, calculated using the great-circle bearing — free, no account needed.",
          url: "/islamic-tools/qibla-finder",
        })}
      />

      <QiblaWidget />

      <div className="mt-10 flex flex-col gap-6">
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            What the Qibla is
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The Qibla is the direction Muslims face during each of the five daily prayers — towards
            the Kaaba, the cube-shaped structure at the center of Masjid al-Haram in Makkah. Facing
            the Qibla accurately is one of the conditions of a valid Salah, so it matters just as
            much at home as it does while travelling for Umrah, when you might be praying in an
            unfamiliar hotel room, an airport, or a transit stop with no marked prayer direction
            nearby.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            How this tool works out your direction
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            When you tap &ldquo;Find My Qibla Direction,&rdquo; the tool reads your device&rsquo;s
            GPS coordinates (with your permission) and calculates the great-circle bearing — the
            shortest path across the Earth&rsquo;s curved surface, the same method used by
            professional Qibla compasses — from your exact location to the Kaaba&rsquo;s fixed
            coordinates. It displays that bearing in degrees from true North, along with your
            straight-line distance to the Kaaba. It does not read your phone&rsquo;s own compass or
            magnetometer sensor: instead, it works out the correct bearing and shows you a marker to
            align, and it&rsquo;s on you to line that marker up with true North using a separate
            compass app or a physical compass — partly because phone compass sensors, and nearby
            metal or electronics, can throw off a live reading anyway.
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-brand-navy">
            Using a physical compass if you&rsquo;d rather not use this tool
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Find true North with a standard magnetic compass — keep it flat and away from your
            phone, metal furniture, or belt buckles, since nearby metal throws off the reading — then
            rotate to match the bearing this tool gave you. Keep in mind magnetic North differs
            slightly from true North depending where you are (magnetic declination), which most
            dedicated compass apps already correct for. In a hotel room, it&rsquo;s also worth
            checking for a printed Qibla marker or sticker, which many hotels in Muslim-majority
            countries provide as standard, or simply asking staff.
          </p>
        </div>
      </div>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/qibla-finder" />
    </ToolShell>
  );
}
