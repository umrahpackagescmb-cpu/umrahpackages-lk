import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { IslamicQuizWidget } from "@/components/islamic/islamic-quiz-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Islamic Quiz — Test Your Knowledge of Islam & Umrah",
  description: "A free interactive quiz covering general Islamic knowledge and Umrah & Hajj facts — instant answers with explanations, no sign-up needed.",
  alternates: { canonical: "/islamic-tools/islamic-quiz" },
  keywords: ["islamic quiz", "umrah quiz", "hajj quiz", "islamic knowledge quiz", "muslim trivia", "umrah facts quiz"],
};

const faqs = [
  {
    question: "Is my score saved anywhere?",
    answer: "No — your score exists only in your browser for that attempt. We don't store it, track it, or show it to anyone else.",
  },
  {
    question: "Can I retake the quiz?",
    answer: "Yes, as many times as you like. Each attempt pulls a fresh set of questions in a random order from a larger question bank, so it won't be identical every time.",
  },
  {
    question: "Where do the questions come from?",
    answer: "They cover widely agreed-upon Islamic basics — the Five Pillars, key terms and Prophets — plus well-known Umrah and Hajj facts like the number of Tawaf circuits and Sa'i trips.",
  },
  {
    question: "Is this quiz a source of religious rulings?",
    answer: "No — it's meant to be fun and educational, not a fiqh reference. For a ruling specific to your situation, please ask your Maulavi or a qualified scholar.",
  },
];

export default function IslamicQuizPage() {
  return (
    <ToolShell
      eyebrow="Knowledge"
      title="Islamic Quiz"
      description="Test your knowledge of general Islamic basics and Umrah & Hajj facts — one question at a time, with instant explanations."
    >
      <JsonLd
        data={softwareApplicationSchema({
          name: "Islamic Quiz — Test Your Knowledge of Islam & Umrah",
          description: "A free interactive quiz covering general Islamic knowledge and Umrah & Hajj facts — instant answers with explanations, no sign-up needed.",
          url: "/islamic-tools/islamic-quiz",
        })}
      />

      <IslamicQuizWidget />

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/islamic-quiz" />
    </ToolShell>
  );
}
