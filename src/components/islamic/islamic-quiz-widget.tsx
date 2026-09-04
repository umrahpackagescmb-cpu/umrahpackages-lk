"use client";

import * as React from "react";
import { Check, X, RotateCcw, Share2, ClipboardCheck, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Category = "general" | "umrah";

interface QuizQuestion {
  id: string;
  category: Category;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

interface RoundQuestion extends QuizQuestion {
  options: [string, string, string, string];
  correctIndex: number;
}

/**
 * Question bank — only facts that are widely agreed upon and non-sectarian
 * (counts of Tawaf/Sa'i, basic terminology, well-known events). Nothing
 * doctrinally contested is presented here as having a single settled answer.
 */
const QUESTION_BANK: QuizQuestion[] = [
  {
    id: "pillars",
    category: "general",
    question: "How many Pillars of Islam are there?",
    options: ["4", "5", "6", "7"],
    correctIndex: 1,
    explanation: "The Five Pillars are the Shahada, Salah, Zakat, Sawm (fasting), and Hajj.",
  },
  {
    id: "holy-book",
    category: "general",
    question: "What is the holy book of Islam called?",
    options: ["The Torah", "The Quran", "The Gospel", "The Psalms"],
    correctIndex: 1,
    explanation: "Muslims believe the Quran is the literal word of God, revealed to Prophet Muhammad ﷺ.",
  },
  {
    id: "surah-count",
    category: "general",
    question: "How many chapters (Surahs) does the Quran contain?",
    options: ["99", "100", "114", "120"],
    correctIndex: 2,
    explanation: "The Quran is divided into 114 Surahs of varying length.",
  },
  {
    id: "al-fatiha",
    category: "general",
    question: "What is the name of the Quran's opening chapter, recited in every unit of prayer?",
    options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "Yasin"],
    correctIndex: 1,
    explanation: "Al-Fatiha (\"The Opening\") is recited in every rak'ah of the five daily prayers.",
  },
  {
    id: "shahada",
    category: "general",
    question: "What is the Islamic declaration of faith called?",
    options: ["Adhan", "Iqamah", "Shahada", "Khutbah"],
    correctIndex: 2,
    explanation: "The Shahada is the testimony of faith: belief in one God and in Muhammad ﷺ as His messenger.",
  },
  {
    id: "daily-prayers",
    category: "general",
    question: "How many obligatory prayers (Salah) do Muslims perform each day?",
    options: ["3", "5", "7", "10"],
    correctIndex: 1,
    explanation: "The five daily prayers are Fajr, Dhuhr, Asr, Maghrib, and Isha.",
  },
  {
    id: "ramadan",
    category: "general",
    question: "What is the month of obligatory fasting in Islam called?",
    options: ["Muharram", "Shawwal", "Ramadan", "Rajab"],
    correctIndex: 2,
    explanation: "Ramadan is the ninth month of the Islamic calendar, during which fasting is observed from dawn to sunset.",
  },
  {
    id: "zakat",
    category: "general",
    question: "What is the obligatory annual almsgiving in Islam called?",
    options: ["Sadaqah", "Zakat", "Kaffarah", "Fidyah"],
    correctIndex: 1,
    explanation: "Zakat is obligatory charity on eligible wealth; Sadaqah, by contrast, is voluntary giving.",
  },
  {
    id: "qibla",
    category: "general",
    question: "Which structure do Muslims face during prayer, no matter where they are in the world?",
    options: ["The Dome of the Rock", "The Kaaba", "Masjid an-Nabawi", "Mount Uhud"],
    correctIndex: 1,
    explanation: "The direction of prayer (Qibla) points toward the Kaaba in Makkah.",
  },
  {
    id: "hijrah",
    category: "general",
    question: "What event marks the start of the Islamic (Hijri) calendar?",
    options: ["The birth of the Prophet ﷺ", "The first revelation", "The Hijrah (migration to Madinah)", "The conquest of Makkah"],
    correctIndex: 2,
    explanation: "The Hijri calendar begins from the Hijrah — the Prophet's ﷺ migration from Makkah to Madinah.",
  },
  {
    id: "kaaba-builders",
    category: "general",
    question: "Which two Prophets are traditionally credited with raising the Kaaba's foundations?",
    options: ["Musa and Harun", "Ibrahim and Ismail", "Nuh and Adam", "Isa and Yahya"],
    correctIndex: 1,
    explanation: "The Quran describes Ibrahim (Abraham) and his son Ismail (Ishmael) raising the Kaaba's foundations.",
  },
  {
    id: "masjid-nabawi",
    category: "general",
    question: "What is the Prophet Muhammad's ﷺ mosque in Madinah called?",
    options: ["Masjid al-Haram", "Masjid an-Nabawi", "Masjid al-Aqsa", "Masjid al-Qiblatain"],
    correctIndex: 1,
    explanation: "Masjid an-Nabawi (\"The Prophet's Mosque\") is one of the holiest sites in Islam, located in Madinah.",
  },
  {
    id: "tawaf-count",
    category: "umrah",
    question: "How many times do pilgrims circle the Kaaba during Tawaf?",
    options: ["3", "5", "7", "9"],
    correctIndex: 2,
    explanation: "Tawaf consists of seven circuits around the Kaaba, starting and ending at the Black Stone corner.",
  },
  {
    id: "sai-hills",
    category: "umrah",
    question: "Sa'i is performed by walking between which two hills?",
    options: ["Safa and Marwah", "Uhud and Thawr", "Arafat and Muzdalifah", "Rahma and Nur"],
    correctIndex: 0,
    explanation: "Sa'i re-enacts Hajar's search for water between the hills of Safa and Marwah.",
  },
  {
    id: "sai-count",
    category: "umrah",
    question: "How many times do pilgrims travel between Safa and Marwah during Sa'i?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation: "Sa'i is seven trips between Safa and Marwah — four in one direction and three in the other.",
  },
  {
    id: "ihram",
    category: "umrah",
    question: "What is the sacred state (and simple garments) a pilgrim enters before Umrah or Hajj called?",
    options: ["Ihram", "Niyyah", "Wudu", "Talbiyah"],
    correctIndex: 0,
    explanation: "Ihram is both the sacred state of ritual purity and the simple, unstitched garments men wear.",
  },
  {
    id: "zamzam",
    category: "umrah",
    question: "What is the well near the Kaaba, linked to the story of Hajar and Ismail, called?",
    options: ["Zamzam", "Kawthar", "Salsabil", "Tasnim"],
    correctIndex: 0,
    explanation: "The Zamzam well is believed to have sprung near baby Ismail, and its water is drawn by pilgrims today.",
  },
  {
    id: "arafah-day",
    category: "umrah",
    question: "On which day of Hajj do pilgrims gather at the plain of Arafah?",
    options: ["8th of Dhul Hijjah", "9th of Dhul Hijjah", "10th of Dhul Hijjah", "13th of Dhul Hijjah"],
    correctIndex: 1,
    explanation: "The 9th of Dhul Hijjah is the Day of Arafah, widely regarded as the most important day of Hajj.",
  },
  {
    id: "black-stone",
    category: "umrah",
    question: "What is the stone set into a corner of the Kaaba, which pilgrims try to touch or point to during Tawaf, called?",
    options: ["The Foundation Stone", "The Black Stone (Al-Hajar al-Aswad)", "The Station Stone", "The White Stone"],
    correctIndex: 1,
    explanation: "Al-Hajar al-Aswad (the Black Stone) is set into the eastern corner of the Kaaba.",
  },
  {
    id: "umrah-timing",
    category: "umrah",
    question: "Unlike Hajj, which has fixed dates in Dhul Hijjah, when can Umrah be performed?",
    options: ["Only during Ramadan", "Only during Dhul Hijjah", "At any time of the year", "Only on Fridays"],
    correctIndex: 2,
    explanation: "Umrah has no fixed dates and can be performed at any time of the year, unlike Hajj.",
  },
  {
    id: "halq-taqsir",
    category: "umrah",
    question: "What is shaving or trimming the hair, marking the completion of Umrah, called?",
    options: ["Halq or Taqsir", "Rami", "Tawaf al-Wida", "Ihlal"],
    correctIndex: 0,
    explanation: "Halq (shaving the head) or Taqsir (trimming the hair) marks the end of the Umrah rites.",
  },
  {
    id: "cave-hira",
    category: "umrah",
    question: "Near which cave outside Makkah did the Prophet Muhammad ﷺ receive his first revelation?",
    options: ["Cave of Thawr", "Cave of Hira", "Cave of Rabwah", "Cave of Uhud"],
    correctIndex: 1,
    explanation: "The Prophet ﷺ received the first revelation in the Cave of Hira, on Jabal an-Nur near Makkah.",
  },
];

const ROUND_SIZE = 10;

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Shuffles a question's own answer options too, so the correct answer isn't always in the same slot. */
function shuffleOptions(q: QuizQuestion): RoundQuestion {
  const order = shuffle([0, 1, 2, 3]);
  const options = order.map((i) => q.options[i]) as [string, string, string, string];
  const correctIndex = order.indexOf(q.correctIndex);
  return { ...q, options, correctIndex };
}

function buildRound(): RoundQuestion[] {
  return shuffle(QUESTION_BANK)
    .slice(0, ROUND_SIZE)
    .map(shuffleOptions);
}

function scoreMessage(pct: number): string {
  if (pct === 100) return "Perfect score — Mashallah!";
  if (pct >= 70) return "Well done — solid knowledge!";
  if (pct >= 40) return "Good effort — keep learning.";
  return "Nice try — every question is a chance to learn something new.";
}

export function IslamicQuizWidget() {
  const [round, setRound] = React.useState<RoundQuestion[]>(() => buildRound());
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [shareState, setShareState] = React.useState<"idle" | "copied">("idle");

  const total = round.length;
  const current = round[step];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === current.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (step + 1 >= total) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setRound(buildRound());
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShareState("idle");
  };

  const handleShare = async () => {
    const text = `I scored ${score}/${total} on the Islamic & Umrah Quiz on UmrahPackages.lk. Think you can beat me?`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Islamic & Umrah Quiz", text, url });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShareState("copied");
        window.setTimeout(() => setShareState("idle"), 2000);
      }
    } catch {
      // user cancelled the share sheet, or clipboard access failed — no action needed
    }
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <Card className="items-center gap-4 py-10 text-center">
        <Trophy className="size-10 text-brand-gold" />
        <p className="text-sm font-medium text-muted-foreground">Quiz complete</p>
        <p className="font-display text-4xl font-bold text-brand-navy">
          {score} / {total}
        </p>
        <p className="text-sm text-foreground">{scoreMessage(pct)}</p>

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Button onClick={handleRestart}>
            <RotateCcw className="size-4" /> Try Again
          </Button>
          <Button variant="outline" onClick={handleShare}>
            {shareState === "copied" ? <ClipboardCheck className="size-4" /> : <Share2 className="size-4" />}
            {shareState === "copied" ? "Copied!" : "Share my score"}
          </Button>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Your score is only visible to you here — it isn&rsquo;t saved or recorded anywhere.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-brand-navy">
          Question {step + 1} of {total}
        </p>
        <p className="text-sm text-muted-foreground">
          Score: {score}
        </p>
      </div>
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-brand-gray">
        <div
          className="h-full rounded-full bg-brand-gold transition-all duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>

      <Card>
        <Badge variant={current.category === "umrah" ? "goldOutline" : "muted"} className="w-fit">
          {current.category === "umrah" ? "Umrah & Hajj" : "General Knowledge"}
        </Badge>

        <p className="font-display text-lg font-semibold text-brand-navy">{current.question}</p>

        <div className="flex flex-col gap-3">
          {current.options.map((option, idx) => {
            const isCorrectOption = idx === current.correctIndex;
            const isSelected = selected === idx;
            const answered = selected !== null;

            let classes =
              "border-border bg-white text-foreground hover:border-brand-gold/60 hover:bg-brand-gray/40";
            if (answered && isCorrectOption) {
              classes = "border-success bg-success/10 text-success";
            } else if (answered && isSelected && !isCorrectOption) {
              classes = "border-destructive bg-destructive/10 text-destructive";
            } else if (answered) {
              classes = "border-border bg-white text-muted-foreground opacity-70";
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-default ${classes}`}
              >
                <span>{option}</span>
                {answered && isCorrectOption && <Check className="size-4 shrink-0" />}
                {answered && isSelected && !isCorrectOption && <X className="size-4 shrink-0" />}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="rounded-xl bg-brand-gray/50 p-4 text-sm text-foreground">
            <p className="mb-1 font-semibold text-brand-navy">
              {selected === current.correctIndex ? "Correct!" : "Not quite."}
            </p>
            <p className="text-muted-foreground">{current.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <Button onClick={handleNext} className="self-start">
            {step + 1 >= total ? "See my score" : "Next question"}
          </Button>
        )}
      </Card>

      <p className="mt-4 text-xs text-muted-foreground">
        Questions are drawn from a larger bank and shuffled each time — your answers stay on this
        device and aren&rsquo;t saved or shared.
      </p>
    </div>
  );
}
