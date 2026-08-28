"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Plane, Users, Scale, Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustBadgeList } from "@/components/badges/trust-badge";
import { formatLkr } from "@/lib/format";
import { useCompare } from "@/lib/use-compare";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/domain";

export function PackageCard({ pkg }: { pkg: Package }) {
  const { isSelected, toggle, slugs, max } = useCompare();
  const selected = isSelected(pkg.slug);
  const disabled = !selected && slugs.length >= max;

  return (
    <Card className="group relative p-0 overflow-hidden hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/packages/${pkg.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={pkg.coverImageUrl}
            alt={pkg.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge variant="default" className="bg-brand-navy/90 backdrop-blur-sm capitalize">
              {pkg.category}
            </Badge>
            {pkg.isFeatured && <Badge variant="gold">Featured</Badge>}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(pkg.slug);
        }}
        disabled={disabled}
        title={disabled ? `You can compare up to ${max} packages` : "Add to compare"}
        className={cn(
          "absolute right-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors",
          selected
            ? "border-brand-gold bg-brand-gold text-brand-navy"
            : "border-white/40 bg-white/85 text-brand-navy hover:border-brand-gold disabled:opacity-50",
        )}
      >
        {selected ? <Check className="size-3.5" /> : <Scale className="size-3.5" />}
        Compare
      </button>

      <div className="flex flex-col gap-3 p-5 pt-2">
        <TrustBadgeList badges={pkg.agency.badges} iconOnly className="min-h-6" />

        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="font-display font-semibold text-base leading-snug line-clamp-2 hover:text-brand-gold-dark transition-colors">
            {pkg.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground">by {pkg.agency.name}</p>

        <div className="grid grid-cols-2 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-brand-gold-dark" /> {pkg.durationDays} days
          </span>
          <span className="flex items-center gap-1.5">
            <Plane className="size-3.5 text-brand-gold-dark" /> {pkg.airline}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-brand-gold-dark" /> {pkg.departureCity.split(" ")[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 text-brand-gold-dark" /> {pkg.groupType}
          </span>
        </div>

        <div className="mt-1 flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">From</p>
            <p className="font-display text-lg font-bold text-brand-navy">
              {formatLkr(pkg.priceLkr)}
            </p>
          </div>
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-sm font-medium text-brand-gold-dark hover:text-brand-navy transition-colors"
          >
            View details →
          </Link>
        </div>
      </div>
    </Card>
  );
}
