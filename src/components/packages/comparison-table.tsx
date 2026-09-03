import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrustBadgeList } from "@/components/badges/trust-badge";
import { formatLkr } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Package } from "@/types/domain";

function Stars({ count }: { count?: number }) {
  if (count == null) return null;
  return (
    <span className="text-brand-gold-dark">
      {"★".repeat(count)}
      <span className="text-border">{"★".repeat(5 - count)}</span>
    </span>
  );
}

const ROWS: { label: string; render: (p: Package) => React.ReactNode }[] = [
  { label: "Price", render: (p) => <span className="font-display text-lg font-bold text-brand-navy">{formatLkr(p.priceLkr)}</span> },
  { label: "Duration", render: (p) => `${p.durationDays} days` },
  { label: "Airline", render: (p) => p.airline },
  { label: "Makkah Hotel", render: (p) => <>{p.makkahHotel} <Stars count={p.makkahHotelStars} /></> },
  { label: "Madinah Hotel", render: (p) => <>{p.madinahHotel} <Stars count={p.madinahHotelStars} /></> },
  { label: "Meal Plan", render: (p) => p.mealPlan ?? "—" },
  { label: "Transport", render: (p) => p.transport ?? "—" },
  { label: "Group Type", render: (p) => <span className="capitalize">{p.groupType}</span> },
  { label: "Category", render: (p) => <span className="capitalize">{p.category}</span> },
  { label: "Visa", render: (p) => (p.visaIncluded ? "Included" : "Not included") },
  { label: "Agency", render: (p) => (
      <Link href={`/agencies/${p.agency.slug}`} className="font-medium text-brand-navy hover:text-brand-gold-dark">
        {p.agency.name}
      </Link>
    ) },
  { label: "Trust Badges", render: (p) => <TrustBadgeList badges={p.agency.badges} iconOnly /> },
];

export function ComparisonTable({ packages }: { packages: Package[] }) {
  return (
    <div>
      {/* Mobile-only swipe affordance — the table below always needs horizontal
       * scrolling on a phone (more than one package never fits), and without
       * this hint that scrollability isn't obvious at a glance. */}
      {packages.length > 1 && (
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:hidden">
          <span>Swipe sideways to compare every package</span>
          <ArrowRight className="size-3.5 animate-pulse" />
        </div>
      )}
      <div className="relative">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 w-28 border-r border-border bg-brand-gray p-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-[2px_0_6px_-2px_rgba(13,27,42,0.15)] sm:w-40">
                  Package
                </th>
                {packages.map((p) => (
                  <th key={p.id} className="min-w-56 border-l border-border bg-white p-4 text-left align-top">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image src={p.coverImageUrl} alt={p.title} fill sizes="256px" className="object-cover" />
                    </div>
                    <Link
                      href={`/packages/${p.slug}`}
                      className="mt-3 block font-display font-semibold leading-snug hover:text-brand-gold-dark transition-colors"
                    >
                      {p.title}
                    </Link>
                    <Button size="sm" variant="gold" asChild className="mt-3 w-full bg-[#25D366] text-white hover:bg-[#1ebc59]">
                      <Link href={p.agency.whatsapp} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-3.5" /> WhatsApp
                      </Link>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const isEven = i % 2 === 0;
                return (
                  <tr key={row.label} className={isEven ? "bg-white" : "bg-brand-gray/30"}>
                    <th
                      className={cn(
                        "sticky left-0 z-10 w-28 border-r border-border p-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground shadow-[2px_0_6px_-2px_rgba(13,27,42,0.15)] sm:w-40",
                        isEven ? "bg-white" : "bg-brand-gray",
                      )}
                    >
                      {row.label}
                    </th>
                    {packages.map((p) => (
                      <td key={p.id} className="border-l border-border p-4 text-foreground/85">
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Fades the right edge on mobile so the cut-off next column reads as
         * "more here" rather than a rendering glitch. Purely decorative —
         * sits outside the scrolling element so it never scrolls away. */}
        {packages.length > 1 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden"
          />
        )}
      </div>
    </div>
  );
}
