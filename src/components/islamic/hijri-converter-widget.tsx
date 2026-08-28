"use client";

import * as React from "react";
import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HIJRI_MONTHS, formatHijri, gregorianToHijri, hijriToGregorian } from "@/lib/islamic/hijri";

type Mode = "toHijri" | "toGregorian";

export function HijriConverterWidget() {
  const today = new Date();
  const [mode, setMode] = React.useState<Mode>("toHijri");

  const [gDay, setGDay] = React.useState(String(today.getDate()));
  const [gMonth, setGMonth] = React.useState(String(today.getMonth() + 1));
  const [gYear, setGYear] = React.useState(String(today.getFullYear()));

  const currentHijri = gregorianToHijri(today);
  const [hDay, setHDay] = React.useState(String(currentHijri.hd));
  const [hMonth, setHMonth] = React.useState(String(currentHijri.hm));
  const [hYear, setHYear] = React.useState(String(currentHijri.hy));

  let result: string | null = null;
  try {
    if (mode === "toHijri") {
      const d = new Date(Number(gYear), Number(gMonth) - 1, Number(gDay));
      if (!Number.isNaN(+d) && gDay && gMonth && gYear) {
        result = formatHijri(gregorianToHijri(d));
      }
    } else {
      if (hDay && hMonth && hYear) {
        const gDate = hijriToGregorian(Number(hYear), Number(hMonth), Number(hDay));
        result = gDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      }
    }
  } catch {
    result = null;
  }

  return (
    <div>
      <Card>
        <div className="flex items-center justify-center gap-3">
          <span className={mode === "toHijri" ? "font-semibold text-brand-navy" : "text-muted-foreground"}>Gregorian</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setMode((m) => (m === "toHijri" ? "toGregorian" : "toHijri"))}
            aria-label="Swap conversion direction"
          >
            <ArrowLeftRight className="size-4" />
          </Button>
          <span className={mode === "toGregorian" ? "font-semibold text-brand-navy" : "text-muted-foreground"}>Hijri</span>
        </div>

        {mode === "toHijri" ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="gday">Day</Label>
              <Input id="gday" inputMode="numeric" value={gDay} onChange={(e) => setGDay(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="gmonth">Month</Label>
              <Select value={gMonth} onValueChange={setGMonth}>
                <SelectTrigger id="gmonth" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {new Date(2000, i, 1).toLocaleDateString("en-US", { month: "long" })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="gyear">Year</Label>
              <Input id="gyear" inputMode="numeric" value={gYear} onChange={(e) => setGYear(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="hday">Day</Label>
              <Input id="hday" inputMode="numeric" value={hDay} onChange={(e) => setHDay(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hmonth">Month</Label>
              <Select value={hMonth} onValueChange={setHMonth}>
                <SelectTrigger id="hmonth" className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {HIJRI_MONTHS.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="hyear">Year</Label>
              <Input id="hyear" inputMode="numeric" value={hYear} onChange={(e) => setHYear(e.target.value)} />
            </div>
          </div>
        )}
      </Card>

      <Card className="mt-4 items-center gap-1 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === "toHijri" ? "Hijri date" : "Gregorian date"}
        </p>
        <p className="font-display text-2xl font-bold text-brand-navy">{result ?? "Enter a valid date"}</p>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Conversions use the tabular Islamic calendar and may differ by a day
        from local moon-sighting announcements.
      </p>
    </div>
  );
}
