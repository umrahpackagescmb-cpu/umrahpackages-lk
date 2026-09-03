import {
  CalendarDays,
  Plane,
  Hotel,
  UtensilsCrossed,
  Bus,
  Users,
  BadgeCheck,
  Armchair,
} from "lucide-react";

import type { Package } from "@/types/domain";

function Stars({ count }: { count?: number }) {
  if (count == null) return null;
  return <span className="text-brand-gold-dark">{"★".repeat(count)}{"☆".repeat(5 - count)}</span>;
}

export function SpecTable({ pkg }: { pkg: Package }) {
  const rows: { icon: typeof CalendarDays; label: string; value: React.ReactNode }[] = [
    { icon: CalendarDays, label: "Duration", value: `${pkg.durationDays} days` },
    { icon: Plane, label: "Airline", value: pkg.airline },
    { icon: Hotel, label: "Makkah Hotel", value: <>{pkg.makkahHotel} <Stars count={pkg.makkahHotelStars} /></> },
    { icon: Hotel, label: "Madinah Hotel", value: <>{pkg.madinahHotel} <Stars count={pkg.madinahHotelStars} /></> },
    { icon: UtensilsCrossed, label: "Meal Plan", value: pkg.mealPlan ?? "—" },
    { icon: Bus, label: "Transport", value: pkg.transport ?? "—" },
    { icon: Users, label: "Group Type", value: <span className="capitalize">{pkg.groupType}</span> },
    { icon: BadgeCheck, label: "Visa", value: pkg.visaIncluded ? "Included" : "Not included" },
    ...(pkg.seatsAvailable != null
      ? [{ icon: Armchair, label: "Seats Available", value: String(pkg.seatsAvailable) }]
      : []),
  ];

  return (
    // Each row is a <div> wrapping exactly one <dt>/<dd> pair — the icon
    // lives inside <dt> (decorative, aria-hidden) rather than as a sibling,
    // since a <dl>'s wrapping <div> may only contain dt/dd per the HTML spec.
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="border-b border-border pb-4">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            <row.icon aria-hidden="true" className="size-4 shrink-0 text-brand-gold-dark" />
            {row.label}
          </dt>
          <dd className="mt-1 pl-6 text-sm font-medium text-brand-navy">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
