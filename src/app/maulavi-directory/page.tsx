import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { MaulaviCard } from "@/components/cards/maulavi-card";
import { MaulaviFilters } from "@/components/maulavis/maulavi-filters";
import { getMaulavis, getMaulaviCities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Maulavi Directory",
  description:
    "Find qualified religious scholars and guides across Sri Lanka for Umrah and Hajj guidance, Ihram rites, and group leadership.",
  alternates: { canonical: "/maulavi-directory" },
};

export default async function MaulaviDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; query?: string }>;
}) {
  const sp = await searchParams;
  const [maulavis, cities] = await Promise.all([
    getMaulavis({ city: sp.city, query: sp.query }),
    Promise.resolve(getMaulaviCities()),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Scholars & guides"
        title="Maulavi Directory"
        description="Connect with qualified religious scholars and guides across Sri Lanka for Umrah and Hajj preparation, Ihram rites, and on-ground group leadership."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Maulavi Directory" }]}
      />

      <div className="container-page py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-brand-navy">{maulavis.length}</span> scholar
            {maulavis.length === 1 ? "" : "s"} found
          </p>
          <MaulaviFilters cities={cities} />
        </div>

        {maulavis.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No scholars match those filters"
              actionLabel="Clear filters"
              actionHref="/maulavi-directory"
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {maulavis.map((m) => (
              <MaulaviCard key={m.id} maulavi={m} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
