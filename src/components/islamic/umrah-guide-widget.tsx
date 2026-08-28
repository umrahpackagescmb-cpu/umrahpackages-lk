"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Printer, RotateCcw, ChevronDown, Volume2, Square, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { umrahGuideSteps, type GuideStep, type GuideLocale } from "@/lib/islamic/umrah-guide";
import { umrahGuideTranslations, needsReviewNotice, type LocalizedStepText } from "@/lib/islamic/umrah-guide-translations";
import { useTextToSpeech } from "@/lib/islamic/use-speech";

const LOCALE_OPTIONS: { value: GuideLocale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ta", label: "தமிழ்" },
  { value: "si", label: "සිංහල" },
];

/** Resolves the text to show for a step in the given locale, falling back
 * to the English/base fields for anything the translation doesn't cover. */
function localizedStep(step: GuideStep, locale: GuideLocale): LocalizedStepText {
  if (locale === "en") {
    return { title: step.title, shortLabel: step.shortLabel, summary: step.summary, details: step.details, tip: step.tip };
  }
  const t = umrahGuideTranslations[locale][step.id];
  return {
    title: t?.title ?? step.title,
    shortLabel: t?.shortLabel ?? step.shortLabel,
    summary: t?.summary ?? step.summary,
    details: t?.details ?? step.details,
    tip: t?.tip ?? step.tip,
    duaMeaning: t?.duaMeaning,
  };
}

/** Builds the spoken text for a step — English content only, see use-speech.ts. */
function speechTextFor(step: GuideStep): string {
  const parts = [step.title, step.summary, ...step.details];
  if (step.tip) parts.push(`Tip: ${step.tip}`);
  if (step.dua) parts.push(`The dua for this step means: ${step.dua.translation}`);
  return parts.join(". ");
}

const STORAGE_KEY = "up_umrah_guide_progress";
const LOCALE_STORAGE_KEY = "up_umrah_guide_locale";

export function UmrahGuideWidget() {
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [openStep, setOpenStep] = React.useState<string | null>(umrahGuideSteps[0]?.id ?? null);
  const [locale, setLocale] = React.useState<GuideLocale>("en");
  const [hydrated, setHydrated] = React.useState(false);
  const { isSupported: speechSupported, speakingId, speak, stop: stopSpeech } = useTextToSpeech();

  React.useEffect(() => {
    const restore = () => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") setCompleted(parsed);
        }
        const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (savedLocale === "en" || savedLocale === "ta" || savedLocale === "si") {
          setLocale(savedLocale);
        }
      } catch {
        // ignore malformed saved state
      }
      setHydrated(true);
    };
    restore();
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // storage unavailable (private browsing etc.) — progress just won't persist
    }
  }, [completed, hydrated]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // storage unavailable — language choice just won't persist
    }
  }, [locale, hydrated]);

  const toggleComplete = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => {
    setCompleted({});
    setOpenStep(umrahGuideSteps[0]?.id ?? null);
    stopSpeech();
  };

  const doneCount = umrahGuideSteps.filter((s) => completed[s.id]).length;
  const progressPct = Math.round((doneCount / umrahGuideSteps.length) * 100);

  return (
    <div>
      <Card className="print:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-brand-navy">
            {doneCount} of {umrahGuideSteps.length} steps marked done
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="size-4" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="size-4" /> Reset
            </Button>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-gray">
          <div
            className="h-full rounded-full bg-brand-gold transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap items-center gap-2 print:hidden">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Languages className="size-3.5" /> Language:
        </span>
        {LOCALE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              locale === opt.value
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-border text-foreground/80 hover:border-brand-gold"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {locale !== "en" && (
        <div className="mt-3 rounded-xl bg-brand-gold/10 p-3 text-xs text-brand-navy print:hidden">
          {needsReviewNotice[locale]}
        </div>
      )}

      <div className="mt-4 hidden print:block">
        <p className="font-display text-lg font-bold text-brand-navy">Step-by-Step Umrah Guide</p>
      </div>

      <ol className="mt-6 flex flex-col gap-3">
        {umrahGuideSteps.map((step, i) => {
          const isDone = Boolean(completed[step.id]);
          const isLast = i === umrahGuideSteps.length - 1;
          const text = localizedStep(step, locale);

          return (
            <li key={step.id} className="relative">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-[19px] top-11 hidden h-[calc(100%-8px)] w-px bg-border print:hidden sm:block"
                />
              )}

              <Card className="print:border-none print:p-0 print:shadow-none print:break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpenStep((prev) => (prev === step.id ? null : step.id))}
                  className="flex w-full items-start gap-4 text-left print:pointer-events-none"
                >
                  <span
                    className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isDone
                        ? "bg-brand-gold text-brand-navy"
                        : "bg-brand-navy text-brand-gold"
                    }`}
                  >
                    {isDone ? <Check className="size-5" /> : step.order}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-base font-semibold text-brand-navy">
                        {text.title}
                      </span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-muted-foreground transition-transform print:hidden ${
                          openStep === step.id ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{text.summary}</span>
                  </span>
                </button>

                <div
                  className={`${
                    openStep === step.id ? "flex" : "hidden"
                  } mt-4 flex-col gap-4 pl-14 print:flex print:pl-14`}
                >
                  <ul className="flex flex-col gap-2">
                    {text.details.map((d, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-foreground/90">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-gold" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {step.dua && (
                    <div className="rounded-xl bg-brand-gray/50 p-4 text-center">
                      <p dir="rtl" lang="ar" className="font-display text-xl leading-relaxed text-brand-navy">
                        {step.dua.arabic}
                      </p>
                      <p className="mt-2 text-sm italic text-muted-foreground">{step.dua.transliteration}</p>
                      <p className="mt-1 text-sm text-foreground">&ldquo;{text.duaMeaning ?? step.dua.translation}&rdquo;</p>
                    </div>
                  )}

                  {text.tip && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-brand-gold-dark">Tip: </span>
                      {text.tip}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 print:hidden">
                    <label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-brand-navy">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleComplete(step.id)}
                        className="size-4 accent-brand-gold"
                      />
                      Mark this step done
                    </label>

                    {speechSupported && locale === "en" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => speak(step.id, speechTextFor(step))}
                      >
                        {speakingId === step.id ? (
                          <>
                            <Square className="size-3.5" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="size-4" /> Listen
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-brand-gray/50 p-4 print:hidden">
        <Badge variant="muted" className="shrink-0">Note</Badge>
        <p className="text-xs text-foreground">
          This is a general overview reflecting how most pilgrims perform Umrah. A few small details
          differ between schools of thought — for a specific fiqh question, ask your group&rsquo;s
          Maulavi or scholar. Our{" "}
          <Link href="/maulavi-directory" className="font-medium text-brand-navy underline underline-offset-2">
            Maulavi Directory
          </Link>{" "}
          can help you find one in Sri Lanka.
        </p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground print:hidden">
        Your progress is saved on this device only.
        {speechSupported && " Tap “Listen” on any step to hear it read aloud — handy if your hands are full or you'd rather listen than read."}
      </p>
    </div>
  );
}
