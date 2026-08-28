"use client";

import * as React from "react";
import { ArrowLeftRight, Loader2, AlertCircle, RefreshCw, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchRates, fetchHistoricalRate } from "@/lib/islamic/currency";

const CURRENCIES = [
  { code: "LKR", label: "Sri Lankan Rupee" },
  { code: "SAR", label: "Saudi Riyal" },
  { code: "USD", label: "US Dollar" },
] as const;

type CurrencyCode = (typeof CURRENCIES)[number]["code"];

type RatesStatus = "loading" | "ready" | "error";

interface TrendPoint {
  date: string;
  rate: number;
}

const currencyLabel = (code: CurrencyCode) => CURRENCIES.find((c) => c.code === code)?.label ?? code;

const formatAmount = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

const formatRate = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 2 });

/** Zero-padded local YYYY-MM-DD, `daysAgo` days before `base` — plain date
 * math, no timezone-shifting `toISOString()`. Only ever called client-side
 * (inside the trend useEffect), never during render/SSR. */
function isoDateDaysAgo(base: Date, daysAgo: number): string {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Lightweight hand-rolled sparkline — no charting library. */
function Sparkline({ data }: { data: TrendPoint[] }) {
  if (data.length < 2) return null;

  const width = 280;
  const height = 64;
  const padding = 6;
  const rates = data.map((d) => d.rate);
  const min = Math.min(...rates);
  const max = Math.max(...rates);
  const range = max - min || 1;

  const points = data
    .map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((d.rate - min) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const last = data[data.length - 1];
  const lastY = height - padding - ((last.rate - min) / range) * (height - padding * 2);

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-16 w-full text-brand-gold"
        role="img"
        aria-label="7-day exchange rate trend"
      >
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx={width - padding} cy={lastY} r="3" fill="currentColor" />
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>Low {formatRate(min)}</span>
        <span>High {formatRate(max)}</span>
      </div>
    </div>
  );
}

export function CurrencyConverterWidget() {
  const [amount, setAmount] = React.useState("10000");
  const [from, setFrom] = React.useState<CurrencyCode>("LKR");
  const [to, setTo] = React.useState<CurrencyCode>("SAR");

  const [ratesStatus, setRatesStatus] = React.useState<RatesStatus>("loading");
  const [rates, setRates] = React.useState<Record<string, number> | null>(null);

  const [trend, setTrend] = React.useState<TrendPoint[]>([]);
  const [trendLoading, setTrendLoading] = React.useState(false);

  const loadRates = React.useCallback(async () => {
    setRatesStatus("loading");
    try {
      const table = await fetchRates(from.toLowerCase());
      setRates(table);
      setRatesStatus("ready");
    } catch {
      setRates(null);
      setRatesStatus("error");
    }
  }, [from]);

  // Fetch live rates on mount and whenever the "from" currency changes.
  // Changing only the amount or the "to" currency never refetches — the
  // conversion below is computed client-side from the cached table.
  React.useEffect(() => {
    const run = () => {
      loadRates();
    };
    run();
  }, [loadRates]);

  // Best-effort 7-day trend for the from -> to pair. Each day is fetched
  // independently and a failed day is simply skipped, so one bad date
  // never blocks the sparkline or shows an error of its own.
  React.useEffect(() => {
    let cancelled = false;

    async function loadTrend() {
      setTrendLoading(true);
      const today = new Date();
      const dates = Array.from({ length: 7 }, (_, i) => isoDateDaysAgo(today, 6 - i));

      const results = await Promise.all(
        dates.map(async (date) => {
          const rate = await fetchHistoricalRate(from.toLowerCase(), to.toLowerCase(), date);
          return rate != null ? { date, rate } : null;
        }),
      );

      if (!cancelled) {
        setTrend(results.filter((r): r is TrendPoint => r != null));
        setTrendLoading(false);
      }
    }

    loadTrend();
    return () => {
      cancelled = true;
    };
  }, [from, to]);

  const numericAmount = Number(amount);
  const rate = from === to ? 1 : rates?.[to.toLowerCase()];
  const converted =
    ratesStatus === "ready" && rate != null && amount.trim() !== "" && !Number.isNaN(numericAmount)
      ? numericAmount * rate
      : null;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div>
      <Card>
        <div className="grid gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 10000"
          />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div className="grid gap-1.5">
            <Label htmlFor="from-currency">From</Label>
            <Select value={from} onValueChange={(v) => setFrom(v as CurrencyCode)}>
              <SelectTrigger id="from-currency" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} — {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={swap}
            aria-label="Swap currencies"
            className="mb-0.5"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="grid gap-1.5">
            <Label htmlFor="to-currency">To</Label>
            <Select value={to} onValueChange={(v) => setTo(v as CurrencyCode)}>
              <SelectTrigger id="to-currency" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} — {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {ratesStatus === "loading" && (
        <Card className="mt-4 items-center gap-3 py-10 text-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin" /> Fetching live exchange rates...
        </Card>
      )}

      {ratesStatus === "error" && (
        <Card className="mt-4 items-center gap-3 py-10 text-center text-destructive">
          <AlertCircle className="size-6" />
          <p className="text-sm">
            Couldn&rsquo;t load live exchange rates right now. Please check your connection and try again.
          </p>
          <Button variant="outline" size="sm" onClick={loadRates}>
            <RefreshCw className="size-4" /> Try Again
          </Button>
        </Card>
      )}

      {ratesStatus === "ready" && (
        <Card className="mt-4 items-center gap-1 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            {amount || "0"} {from} equals
          </p>
          <p className="font-display text-3xl font-bold text-brand-navy">
            {converted != null ? `${formatAmount(converted)} ${to}` : "Enter an amount"}
          </p>
          {rate != null && (
            <p className="mt-1 text-xs text-muted-foreground">
              1 {from} = {formatRate(rate)} {to}
            </p>
          )}
          <Badge variant="muted" className="mt-2">
            Live rates via exchange-api
          </Badge>
        </Card>
      )}

      <div className="mt-4 rounded-xl bg-brand-gray/50 p-4">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
          <p className="text-xs text-foreground">
            Rates update once daily and are indicative for travel planning only — they are{" "}
            <strong>not</strong> exact enough for financial transactions. Always confirm the exact
            rate with your bank or money changer at the time you actually exchange or transfer money.
          </p>
        </div>
      </div>

      <Card className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          7-day trend · 1 {from} in {to}
        </p>
        <div className="mt-3">
          {trendLoading && trend.length === 0 ? (
            <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading trend...
            </div>
          ) : trend.length >= 2 ? (
            <Sparkline data={trend} />
          ) : (
            <p className="py-4 text-sm text-muted-foreground">Trend data isn&rsquo;t available right now.</p>
          )}
        </div>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground">
        Exchange rates are sourced from a free, publicly maintained daily-updated feed and provided
        for {currencyLabel(from)} ({from}), {currencyLabel(to)} ({to}), and the third supported
        currency for general trip-budgeting reference only.
      </p>
    </div>
  );
}
