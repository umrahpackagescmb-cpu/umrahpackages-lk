"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const STORAGE_KEY = "up_prayer_tracker";

interface PrayerState {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

interface StoredTracker {
  date: string;
  prayers: PrayerState;
}

const EMPTY_PRAYERS: PrayerState = {
  fajr: false,
  dhuhr: false,
  asr: false,
  maghrib: false,
  isha: false,
};

const PRAYERS: { key: keyof PrayerState; label: string; window: string }[] = [
  { key: "fajr", label: "Fajr", window: "Dawn, before sunrise" },
  { key: "dhuhr", label: "Dhuhr", window: "Midday, after the sun passes its peak" },
  { key: "asr", label: "Asr", window: "Afternoon" },
  { key: "maghrib", label: "Maghrib", window: "Just after sunset" },
  { key: "isha", label: "Isha", window: "Night" },
];

/** Local (not UTC) calendar date key, e.g. "2026-09-04" — so the tracker
 * resets at midnight in the user's own timezone rather than UTC's. */
function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function PrayerTrackerWidget() {
  const [date, setDate] = React.useState(todayKey);
  const [prayers, setPrayers] = React.useState<PrayerState>(EMPTY_PRAYERS);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const restore = () => {
      const today = todayKey();
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<StoredTracker>;
          if (parsed && parsed.date === today && parsed.prayers && typeof parsed.prayers === "object") {
            setPrayers({ ...EMPTY_PRAYERS, ...parsed.prayers });
          }
        }
      } catch {
        // ignore malformed saved state — starts from a blank tracker
      }
      setDate(today);
      setHydrated(true);
    };
    restore();
  }, []);

  // If the tab is left open across midnight, re-check the date on each
  // interaction rather than only on mount, and reset if the day has rolled over.
  const ensureToday = React.useCallback(() => {
    const today = todayKey();
    if (today !== date) {
      setDate(today);
      setPrayers(EMPTY_PRAYERS);
    }
    return today;
  }, [date]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      const data: StoredTracker = { date, prayers };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage unavailable (private browsing etc.) — today's ticks just won't persist
    }
  }, [date, prayers, hydrated]);

  const togglePrayer = (key: keyof PrayerState) => {
    ensureToday();
    setPrayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setPrayers(EMPTY_PRAYERS);
  };

  const doneCount = PRAYERS.filter((p) => prayers[p.key]).length;
  const displayDate = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-brand-navy">{displayDate}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {doneCount} of 5 prayed today
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="size-4" /> Reset today
          </Button>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-gray">
          <div
            className="h-full rounded-full bg-brand-gold transition-all duration-300"
            style={{ width: `${(doneCount / 5) * 100}%` }}
          />
        </div>

        <ul className="mt-6 flex flex-col gap-2">
          {PRAYERS.map((p) => (
            <li key={p.key}>
              <label
                htmlFor={`prayer-${p.key}`}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/70 px-4 py-3 transition-colors hover:border-brand-gold/50"
              >
                <span className="flex items-center gap-3">
                  <Checkbox
                    id={`prayer-${p.key}`}
                    checked={prayers[p.key]}
                    onCheckedChange={() => togglePrayer(p.key)}
                  />
                  <span>
                    <span
                      className={`block text-sm font-medium ${
                        prayers[p.key] ? "text-muted-foreground line-through" : "text-brand-navy"
                      }`}
                    >
                      {p.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">{p.window}</span>
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        This tracker resets automatically every day and only tracks today&rsquo;s five prayers — it
        doesn&rsquo;t keep a history or a day-to-day streak. Your ticks are saved on this device and
        browser only, with no account or login, so they won&rsquo;t follow you to another device and
        aren&rsquo;t stored anywhere else or shared.
      </p>
    </div>
  );
}
