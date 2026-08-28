import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { TasbihWidget } from "@/components/islamic/tasbih-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Tasbih Counter — Free Digital Dhikr Counter",
  description: "A simple digital tasbih (dhikr) counter with common targets of 33, 99, and 100 — free, works on your phone, no account needed.",
  alternates: { canonical: "/islamic-tools/tasbih-counter" },
  keywords: ["tasbih counter", "digital tasbih", "dhikr counter", "online tasbih", "33 99 100 counter"],
};

const faqs = [
  {
    question: "Is my counter progress saved?",
    answer: "Yes — your count is saved automatically on your own device, so it's still there if you close the page and come back later. It isn't stored anywhere else or shared.",
  },
  {
    question: "Why are 33, 99, and 100 common targets?",
    answer: "These reflect common dhikr practices after prayer, such as reciting SubhanAllah, Alhamdulillah, and Allahu Akbar 33 times each, or counting to 99 in reference to the Names of Allah.",
  },
  {
    question: "Can I use this while traveling for Umrah?",
    answer: "Yes — it works entirely in your browser, so it's handy for counting dhikr at the Haramain or anywhere else without needing a physical tasbih.",
  },
];

export default function TasbihCounterPage() {
  return (
    <ToolShell
      eyebrow="Dhikr"
      title="Tasbih Counter"
      description="Tap to count your dhikr. Your progress is saved automatically on this device."
    >
      <TasbihWidget />

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/tasbih-counter" />
    </ToolShell>
  );
}
