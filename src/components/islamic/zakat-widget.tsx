"use client";

import * as React from "react";
import { Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ZAKAT_RATE = 0.025;
const DEFAULT_NISAB_LKR = 350_000; // Editable estimate based on ~612.36g silver; user should verify current rate.

const ASSET_FIELDS = [
  { key: "cash", label: "Cash & bank balances (LKR)" },
  { key: "gold", label: "Gold & silver value (LKR)" },
  { key: "investments", label: "Investments, shares & savings (LKR)" },
  { key: "business", label: "Business inventory & receivables (LKR)" },
  { key: "otherAssets", label: "Other zakatable assets (LKR)" },
] as const;

const LIABILITY_FIELDS = [
  { key: "debts", label: "Short-term debts owed (LKR)" },
  { key: "expenses", label: "Immediate essential expenses (LKR)" },
] as const;

type AssetKey = (typeof ASSET_FIELDS)[number]["key"];
type LiabilityKey = (typeof LIABILITY_FIELDS)[number]["key"];

function formatLKR(value: number) {
  return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(value);
}

export function ZakatWidget() {
  const [assets, setAssets] = React.useState<Record<AssetKey, string>>({
    cash: "",
    gold: "",
    investments: "",
    business: "",
    otherAssets: "",
  });
  const [liabilities, setLiabilities] = React.useState<Record<LiabilityKey, string>>({
    debts: "",
    expenses: "",
  });
  const [nisab, setNisab] = React.useState(String(DEFAULT_NISAB_LKR));
  const [showResult, setShowResult] = React.useState(false);

  const totalAssets = ASSET_FIELDS.reduce((sum, f) => sum + (Number(assets[f.key]) || 0), 0);
  const totalLiabilities = LIABILITY_FIELDS.reduce((sum, f) => sum + (Number(liabilities[f.key]) || 0), 0);
  const netWorth = Math.max(0, totalAssets - totalLiabilities);
  const nisabValue = Number(nisab) || 0;
  const meetsNisab = netWorth >= nisabValue;
  const zakatDue = meetsNisab ? netWorth * ZAKAT_RATE : 0;

  return (
    <div>
      <Card>
        <p className="text-sm font-semibold text-brand-navy">Your assets</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {ASSET_FIELDS.map((f) => (
            <div key={f.key} className="grid gap-1.5">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                inputMode="decimal"
                placeholder="0"
                value={assets[f.key]}
                onChange={(e) => setAssets((a) => ({ ...a, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm font-semibold text-brand-navy">Deductions</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {LIABILITY_FIELDS.map((f) => (
            <div key={f.key} className="grid gap-1.5">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input
                id={f.key}
                inputMode="decimal"
                placeholder="0"
                value={liabilities[f.key]}
                onChange={(e) => setLiabilities((l) => ({ ...l, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-1.5">
          <Label htmlFor="nisab">Nisab threshold (LKR)</Label>
          <Input id="nisab" inputMode="decimal" value={nisab} onChange={(e) => setNisab(e.target.value)} />
          <p className="text-xs text-muted-foreground">
            Nisab is the minimum wealth threshold (traditionally the value
            of 612.36g silver or 87.48g gold) below which Zakat is not due.
            This figure changes with market prices — please check today&rsquo;s
            gold/silver rate and update it here before relying on the result.
          </p>
        </div>

        <Button variant="gold" className="mt-2" onClick={() => setShowResult(true)}>
          <Calculator className="size-4" /> Calculate Zakat
        </Button>
      </Card>

      {showResult && (
        <Card className="mt-4 items-center gap-2 py-8 text-center">
          <p className="text-sm text-muted-foreground">Net zakatable wealth</p>
          <p className="font-display text-2xl font-bold text-brand-navy">{formatLKR(netWorth)}</p>

          {meetsNisab ? (
            <>
              <p className="mt-3 text-sm text-muted-foreground">Zakat due (2.5%)</p>
              <p className="font-display text-4xl font-bold text-brand-gold">{formatLKR(zakatDue)}</p>
            </>
          ) : (
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Your net wealth is below the nisab threshold, so Zakat is not
              obligatory on you this year.
            </p>
          )}
        </Card>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        This calculator is a general guide, not religious advice. Zakat
        rules can vary by asset type and school of thought — please consult
        a qualified scholar for your specific situation.
      </p>
    </div>
  );
}
