"use client";

import * as React from "react";
import { Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Typical starting estimates only — every field below is editable. None of
// these figures are verified prices; they exist purely so the calculator
// has a sensible starting point. Users must adjust every field to match
// their own package quote and spending habits before relying on the total.
const DEFAULT_TRAVELERS = 2;
const DEFAULT_DAYS = 10;
const DEFAULT_PACKAGE_PRICE_LKR = 450_000;

const DAILY_FIELDS = [
  { key: "food", label: "Food & drinks (per person, per day)", defaultValue: 3_000 },
  { key: "transport", label: "Local transport / taxi (per person, per day)", defaultValue: 1_500 },
  { key: "laundry", label: "Laundry (per person, per day)", defaultValue: 300 },
] as const;

const ONE_TIME_FIELDS = [
  { key: "simCard", label: "Saudi SIM card / mobile data (per person)", defaultValue: 2_500 },
  { key: "shopping", label: "Shopping & gifts (per person)", defaultValue: 15_000 },
  { key: "luggage", label: "Extra luggage fees (per person)", defaultValue: 5_000 },
  { key: "ziyarah", label: "Ziyarah / local tour add-ons (per person)", defaultValue: 5_000 },
] as const;

const QURBANI_DEFAULT_LKR = 30_000;

type DailyKey = (typeof DAILY_FIELDS)[number]["key"];
type OneTimeKey = (typeof ONE_TIME_FIELDS)[number]["key"];

function formatLKR(value: number) {
  return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(value);
}

export function UmrahBudgetWidget() {
  const [travelers, setTravelers] = React.useState(String(DEFAULT_TRAVELERS));
  const [days, setDays] = React.useState(String(DEFAULT_DAYS));
  const [packagePrice, setPackagePrice] = React.useState(String(DEFAULT_PACKAGE_PRICE_LKR));

  const [daily, setDaily] = React.useState<Record<DailyKey, string>>({
    food: String(DAILY_FIELDS[0].defaultValue),
    transport: String(DAILY_FIELDS[1].defaultValue),
    laundry: String(DAILY_FIELDS[2].defaultValue),
  });

  const [oneTime, setOneTime] = React.useState<Record<OneTimeKey, string>>({
    simCard: String(ONE_TIME_FIELDS[0].defaultValue),
    shopping: String(ONE_TIME_FIELDS[1].defaultValue),
    luggage: String(ONE_TIME_FIELDS[2].defaultValue),
    ziyarah: String(ONE_TIME_FIELDS[3].defaultValue),
  });

  const [includeQurbani, setIncludeQurbani] = React.useState(false);
  const [qurbani, setQurbani] = React.useState(String(QURBANI_DEFAULT_LKR));

  const [showResult, setShowResult] = React.useState(false);

  const travelersCount = Math.max(0, Number(travelers) || 0);
  const daysCount = Math.max(0, Number(days) || 0);
  const packagePriceValue = Number(packagePrice) || 0;

  const dailyPerPersonPerDay = DAILY_FIELDS.reduce((sum, f) => sum + (Number(daily[f.key]) || 0), 0);
  const oneTimePerPerson =
    ONE_TIME_FIELDS.reduce((sum, f) => sum + (Number(oneTime[f.key]) || 0), 0) +
    (includeQurbani ? Number(qurbani) || 0 : 0);

  const packageSubtotal = packagePriceValue * travelersCount;
  const dailySubtotal = dailyPerPersonPerDay * daysCount * travelersCount;
  const oneTimeSubtotal = oneTimePerPerson * travelersCount;
  const grandTotal = packageSubtotal + dailySubtotal + oneTimeSubtotal;

  return (
    <div>
      <Card>
        <p className="text-sm font-semibold text-brand-navy">Trip details</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="travelers">Number of travelers</Label>
            <Input
              id="travelers"
              inputMode="numeric"
              placeholder="0"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="days">Number of days</Label>
            <Input
              id="days"
              inputMode="numeric"
              placeholder="0"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 grid gap-1.5">
          <Label htmlFor="packagePrice">Package price per person (LKR)</Label>
          <Input
            id="packagePrice"
            inputMode="decimal"
            placeholder="0"
            value={packagePrice}
            onChange={(e) => setPackagePrice(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            This is a typical starting estimate — replace it with the actual
            price of the package you&rsquo;re comparing or have booked.
          </p>
        </div>

        <p className="mt-6 text-sm font-semibold text-brand-navy">Daily costs (per person, per day)</p>
        <p className="text-xs text-muted-foreground">
          Typical starting estimates — adjust to your own habits.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {DAILY_FIELDS.map((f) => (
            <div key={f.key} className="grid gap-1.5">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                inputMode="decimal"
                placeholder="0"
                value={daily[f.key]}
                onChange={(e) => setDaily((d) => ({ ...d, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm font-semibold text-brand-navy">One-time costs (per person)</p>
        <p className="text-xs text-muted-foreground">
          Typical starting estimates — adjust to your own habits.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {ONE_TIME_FIELDS.map((f) => (
            <div key={f.key} className="grid gap-1.5">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                inputMode="decimal"
                placeholder="0"
                value={oneTime[f.key]}
                onChange={(e) => setOneTime((o) => ({ ...o, [f.key]: e.target.value }))}
              />
            </div>
          ))}

          <div className="grid gap-1.5 sm:col-span-2">
            <Label className="cursor-pointer font-normal">
              <Checkbox checked={includeQurbani} onCheckedChange={(c) => setIncludeQurbani(c === true)} />
              Include Qurbani (optional, per person)
            </Label>
            {includeQurbani && (
              <Input
                id="qurbani"
                inputMode="decimal"
                placeholder="0"
                value={qurbani}
                onChange={(e) => setQurbani(e.target.value)}
                className="mt-1"
              />
            )}
            <p className="text-xs text-muted-foreground">
              Qurbani pricing varies by season and provider — this is a
              rough starting estimate only, and only applies if you tick the
              box above.
            </p>
          </div>
        </div>

        <Button variant="gold" className="mt-2" onClick={() => setShowResult(true)}>
          <Calculator className="size-4" /> Calculate Budget
        </Button>
      </Card>

      {showResult && (
        <Card className="mt-4 gap-3 py-6">
          <p className="text-sm font-semibold text-brand-navy">Your estimated trip budget</p>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Package price ({travelersCount} traveler{travelersCount === 1 ? "" : "s"})</span>
              <span className="font-medium text-foreground">{formatLKR(packageSubtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Daily costs ({daysCount} day{daysCount === 1 ? "" : "s"} × {travelersCount} traveler{travelersCount === 1 ? "" : "s"})</span>
              <span className="font-medium text-foreground">{formatLKR(dailySubtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">One-time costs ({travelersCount} traveler{travelersCount === 1 ? "" : "s"})</span>
              <span className="font-medium text-foreground">{formatLKR(oneTimeSubtotal)}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center gap-1 border-t border-border pt-4 text-center">
            <p className="text-sm text-muted-foreground">Estimated total trip cost</p>
            <p className="font-display text-3xl font-bold text-brand-gold">{formatLKR(grandTotal)}</p>
          </div>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            These are starting estimates for your own planning — every
            pilgrim&rsquo;s spending habits differ. Adjust every field above
            to match yours.
          </p>
        </Card>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        This calculator is a general planning guide, not a quote. Package
        prices, fees and personal spending vary by agency, season and
        traveler — always confirm exact costs with your travel agency before
        booking.
      </p>
    </div>
  );
}
