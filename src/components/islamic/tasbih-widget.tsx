"use client";

import * as React from "react";
import { RotateCcw, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STORAGE_KEY = "up_tasbih_count";
const TARGETS = [33, 99, 100, 1000];

export function TasbihWidget() {
  const [count, setCount] = React.useState(0);
  const [target, setTarget] = React.useState(33);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const restore = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = Number(saved);
        if (!Number.isNaN(parsed)) setCount(parsed);
      }
      setHydrated(true);
    };
    restore();
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, String(count));
  }, [count, hydrated]);

  const increment = () => {
    setCount((c) => c + 1);
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(15);
  };

  const reset = () => setCount(0);
  const decrement = () => setCount((c) => Math.max(0, c - 1));

  const justReachedTarget = count > 0 && count % target === 0;

  return (
    <div>
      <Card className="items-center gap-6 py-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TARGETS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTarget(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                target === t ? "bg-brand-navy text-white" : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={increment}
          aria-label="Tap to count"
          className={`flex size-48 select-none items-center justify-center rounded-full border-4 text-6xl font-bold shadow-soft-lg transition-all duration-150 active:scale-95 ${
            justReachedTarget
              ? "border-brand-gold bg-brand-navy text-brand-gold"
              : "border-brand-gray bg-white text-brand-navy hover:border-brand-gold/50"
          }`}
        >
          {count}
        </button>

        <p className="text-sm text-muted-foreground">
          Tap the circle to count &middot; target {target}
          {justReachedTarget ? ` · reached ${count / target}× ✓` : ""}
        </p>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={decrement}>
            <Minus className="size-4" /> Undo
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="size-4" /> Reset
          </Button>
        </div>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Your count is saved on this device only, so it will still be here
        next time you open this page.
      </p>
    </div>
  );
}
