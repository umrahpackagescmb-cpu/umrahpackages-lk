"use client";

import * as React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { formatLkr } from "@/lib/format";
import { useCompare } from "@/lib/use-compare";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/domain";

/**
 * Renders the current (filtered, paginated) page of packages as pickable
 * tiles. The floating CompareTray (rendered site-wide in SiteChrome) is the
 * single "Compare now" call to action once 2+ are selected — this component
 * only needs to toggle selection, not duplicate that button.
 */
export function ComparePicker({ packages }: { packages: Package[] }) {
  const { slugs, toggle, isSelected, max } = useCompare();
  const [search, setSearch] = React.useState("");

  const visible = search.trim()
    ? packages.filter((pkg) => {
        const q = search.trim().toLowerCase();
        return pkg.title.toLowerCase().includes(q) || pkg.agency.name.toLowerCase().includes(q);
      })
    : packages;

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Narrow this page by name or agency..."
          aria-label="Narrow visible packages by name or agency"
          className="pl-10 h-10"
        />
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
          No packages on this page match &ldquo;{search}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((pkg) => {
            const selected = isSelected(pkg.slug);
            const disabled = !selected && slugs.length >= max;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => toggle(pkg.slug)}
                disabled={disabled}
                title={disabled ? `You can compare up to ${max} packages` : undefined}
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
      )}
    </div>
  );
}
