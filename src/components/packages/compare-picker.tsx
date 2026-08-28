"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatLkr } from "@/lib/format";
import { useCompare } from "@/lib/use-compare";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/domain";

export function ComparePicker({ packages }: { packages: Package[] }) {
  const { slugs, toggle, isSelected, max } = useCompare();
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => {
          const selected = isSelected(pkg.slug);
          const disabled = !selected && slugs.length >= max;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => toggle(pkg.slug)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors disabled:opacity-40",
                selected ? "border-brand-gold bg-brand-gold/5" : "border-border hover:border-brand-gold/40",
              )}
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={pkg.coverImageUrl} alt={pkg.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-brand-navy">{pkg.title}</p>
                <p className="text-xs text-muted-foreground">{pkg.agency.name}</p>
                <p className="mt-0.5 text-sm font-semibold text-brand-gold-dark">
                  {formatLkr(pkg.priceLkr)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-6 mt-8 flex justify-center">
        <Button
          size="lg"
          variant="gold"
          disabled={slugs.length < 2}
          onClick={() => router.push(`/compare?ids=${slugs.join(",")}`)}
        >
          <Scale />
          {slugs.length < 2
            ? "Select at least 2 packages"
            : `Compare ${slugs.length} package${slugs.length > 1 ? "s" : ""}`}
        </Button>
      </div>
    </div>
  );
}
