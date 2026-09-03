import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { AgencyCard } from "@/components/cards/agency-card";
import { AgencyFilters } from "@/components/agencies/agency-filters";
import { getAgencies, getAgencyCities, type AgencyFilters as Filters } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Agencies",
  description:
    "Browse verified Umrah travel agencies across Sri Lanka. Every agency is vetted before listing — filter by city and trust badges.",
  alternates: { canonical: "/agencies" },
};

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const filters: Filters = {
    city: sp.city,
    sort: (sp.sort as Filters["sort"]) ?? "rating",
  };

  const [agencies, cities] = await Promise.all([getAgencies(filters), Promise.resolve(getAgencyCities())]);

  return (
    <>
      <PageHeader
        eyebrow="Compare Sri Lankan agencies"
        title="Travel Agencies"
        description="Browse Umrah operators listed on UmrahPackages.lk. Trust badges (Gold Verified, Featured, Premium Partner...) are assigned only by our team once an agency has been verified."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Agencies" }]}
      />

      <div className="container-page py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-brand-navy">{agencies.length}</span> agenc
            {agencies.length === 1 ? "y" : "ies"} found
          </p>
          <AgencyFilters cities={cities} />
        </div>

        {agencies.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="No agencies match those filters"
              actionLabel="Clear filters"
              actionHref="/agencies"
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
