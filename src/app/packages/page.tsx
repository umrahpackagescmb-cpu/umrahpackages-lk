import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { PackageCard } from "@/components/cards/package-card";
import {
  PackageFiltersDesktop,
  PackageFiltersMobile,
  SortDropdown,
} from "@/components/packages/package-filters";
import { Pagination } from "@/components/packages/pagination";
import { getPackages, getPriceRange } from "@/lib/data";
import { parsePackageFilters, first, all, type SearchParams } from "@/lib/parse-package-filters";

export const metadata: Metadata = {
  title: "Umrah Packages",
  description:
    "Browse and compare Umrah packages from verified Sri Lankan travel agencies. Filter by price, duration, hotel rating, airline and more.",
  alternates: { canonical: "/packages" },
};

const PAGE_SIZE = 12;

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const filters = parsePackageFilters(sp);
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const [allResults, priceRange] = await Promise.all([getPackages(filters), Promise.resolve(getPriceRange())]);

  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const pageResults = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(sp)) {
      if (key === "page") continue;
      for (const v of all(value)) params.append(key, v);
    }
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/packages?${qs}` : "/packages";
  };

  return (
    <>
      <PageHeader
        eyebrow="300+ packages, one place"
        title="Umrah Packages"
        description="Every package here is listed by a verified Sri Lankan travel agency. Compare freely — contacting an agency costs nothing and we never take a booking fee."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
      />

      <div className="container-page py-12">
        <div className="flex gap-8">
          <PackageFiltersDesktop priceMin={priceRange.min} priceMax={priceRange.max} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-brand-navy">{allResults.length}</span> package
                {allResults.length === 1 ? "" : "s"} found
              </p>
              <div className="flex items-center gap-2">
                <PackageFiltersMobile priceMin={priceRange.min} priceMax={priceRange.max} />
                <SortDropdown />
              </div>
            </div>

            {pageResults.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  title="No packages match those filters"
                  description="Try widening your price range or clearing a filter."
                  actionLabel="Clear filters"
                  actionHref="/packages"
                />
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pageResults.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
          </div>
        </div>
      </div>
    </>
  );
}
