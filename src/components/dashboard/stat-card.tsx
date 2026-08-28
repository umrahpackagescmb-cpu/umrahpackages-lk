import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "navy",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  accent?: "navy" | "gold";
}) {
  return (
    <Card className="gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-xl",
            accent === "gold" ? "bg-brand-gold/15 text-brand-gold-dark" : "bg-brand-navy/10 text-brand-navy",
          )}
        >
          <Icon className="size-4.5" />
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-brand-navy">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}
