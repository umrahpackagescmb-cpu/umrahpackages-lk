import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { QiblaWidget } from "@/components/islamic/qibla-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

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
      <QiblaWidget />

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Facing the Qibla is a condition of a valid prayer, so getting the
        direction right matters — at home, at work, or in a hotel room while
        traveling for Umrah. This tool works anywhere in the world, and
        updates instantly if you search a different location.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/qibla-finder" />
    </ToolShell>
  );
}
