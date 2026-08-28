"use client";

import * as React from "react";
import Link from "next/link";
import { Printer, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  PRE_DEPARTURE_CHECKLIST,
  countItems,
  type ChecklistCategory,
} from "@/lib/islamic/pre-departure-checklist";

const STORAGE_KEY = "up_pre_departure_checklist";

const checklist: ChecklistCategory[] = PRE_DEPARTURE_CHECKLIST;
const totalItems = countItems(checklist);

export function PreDepartureChecklistWidget() {
  const [done, setDone] = React.useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const restore = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Record<string, boolean>;
          if (parsed && typeof parsed === "object") setDone(parsed);
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  const toggleDone = (id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => {
    setDone({});
  };

  const doneCount = checklist.reduce(
    (sum, cat) => sum + cat.items.filter((item) => done[item.id]).length,
    0,
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted-foreground">
          {doneCount} of {totalItems} done
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
        <p className="font-display text-lg font-bold text-brand-navy">Pre-Departure Checklist</p>
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
                      checked={Boolean(done[item.id])}
                      onCheckedChange={() => toggleDone(item.id)}
                      className="mt-0.5 print:hidden"
                    />
                    <span
                      className={`text-sm ${
                        done[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                    >
                      {item.label}
                      {item.link && (
                        <>
                          {" — "}
                          <Link
                            href={item.link.href}
                            className="font-medium text-brand-gold-dark underline underline-offset-2 print:hidden"
                          >
                            {item.link.label}
                          </Link>
                        </>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground print:hidden">
        Your ticked items are saved on this device only, so they&rsquo;ll
        still be here next time you open this page.
      </p>
    </div>
  );
}
