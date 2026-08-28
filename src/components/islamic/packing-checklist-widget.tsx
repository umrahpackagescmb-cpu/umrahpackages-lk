"use client";

import * as React from "react";
import { Printer, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  buildChecklist,
  countItems,
  PROFILE_OPTIONS,
  type TravelerProfile,
} from "@/lib/islamic/packing-checklist";

const STORAGE_KEY = "up_packing_checklist";

interface StoredState {
  profiles: TravelerProfile[];
  packed: Record<string, boolean>;
}

export function PackingChecklistWidget() {
  const [profiles, setProfiles] = React.useState<TravelerProfile[]>([]);
  const [packed, setPacked] = React.useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const restore = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as StoredState;
          if (Array.isArray(parsed.profiles)) setProfiles(parsed.profiles);
          if (parsed.packed && typeof parsed.packed === "object") setPacked(parsed.packed);
        } catch {
          // ignore malformed saved state
        }
      }
      setHydrated(true);
    };
    restore();
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    const state: StoredState = { profiles, packed };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [profiles, packed, hydrated]);

  const toggleProfile = (profile: TravelerProfile) => {
    setProfiles((prev) =>
      prev.includes(profile) ? prev.filter((p) => p !== profile) : [...prev, profile],
    );
  };

  const togglePacked = (id: string) => {
    setPacked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => {
    setProfiles([]);
    setPacked({});
  };

  const checklist = React.useMemo(() => buildChecklist(profiles), [profiles]);
  const totalItems = countItems(checklist);
  const packedCount = checklist.reduce(
    (sum, cat) => sum + cat.items.filter((item) => packed[item.id]).length,
    0,
  );

  return (
    <div>
      <Card className="print:hidden">
        <p className="text-sm font-semibold text-brand-navy">Who are you packing for?</p>
        <p className="text-xs text-muted-foreground">
          Select all that apply — your checklist updates instantly.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROFILE_OPTIONS.map((option) => (
            <label
              key={option.value}
              htmlFor={`profile-${option.value}`}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 p-3 transition-colors hover:border-brand-gold/50"
            >
              <Checkbox
                id={`profile-${option.value}`}
                checked={profiles.includes(option.value)}
                onCheckedChange={() => toggleProfile(option.value)}
                className="mt-0.5"
              />
              <span>
                <Label htmlFor={`profile-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
                <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
              </span>
            </label>
          ))}
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted-foreground">
          {totalItems} items · {packedCount} packed
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="size-4" /> Print checklist
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="size-4" /> Reset
          </Button>
        </div>
      </div>

      <div className="mt-4 hidden print:block">
        <p className="font-display text-lg font-bold text-brand-navy">Umrah Packing Checklist</p>
        {profiles.length > 0 && (
          <p className="text-sm text-muted-foreground">
            For: {profiles.map((p) => PROFILE_OPTIONS.find((o) => o.value === p)?.label).join(", ")}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {checklist.map((category) => (
          <Card key={category.id} className="print:border-none print:p-0 print:shadow-none">
            <p className="text-sm font-semibold text-brand-navy">{category.title}</p>
            <Separator className="print:hidden" />
            <ul className="flex flex-col gap-2.5">
              {category.items.map((item) => (
                <li key={item.id}>
                  <label
                    htmlFor={`item-${item.id}`}
                    className="flex cursor-pointer items-start gap-3"
                  >
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={Boolean(packed[item.id])}
                      onCheckedChange={() => togglePacked(item.id)}
                      className="mt-0.5 print:hidden"
                    />
                    <span
                      className={`text-sm ${
                        packed[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground print:hidden">
        Your selections and ticked items are saved on this device only, so
        they&rsquo;ll still be here next time you open this page.
      </p>
    </div>
  );
}
