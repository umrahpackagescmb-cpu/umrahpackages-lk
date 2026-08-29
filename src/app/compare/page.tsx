import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { ComparisonTable } from "@/components/packages/comparison-table";
import { ComparePicker } from "@/components/packages/compare-picker";
import {
  PackageFiltersDesktop,
  PackageFiltersMobile,
  SortDropdown,
} from "@/components/packages/package-filters";
import { Pagination } from "@/components/packages/pagination";
import { getPackageBySlug, getPackages, getPriceRange, getDepartureMonths } from "@/lib/data";
import { parsePackageFilters, first, all, type SearchParams } from "@/lib/parse-package-filters";

export const metadata: Metadata = {
  title: "Compare Umrah Packages",
  description: "Compare Umrah packages side by side — price, hotels, airline, meals and more.",
  alternates: { canonical: "/compare" },
};

const PAGE_SIZE = 12;

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams & { ids?: string }>;
}) {
  const sp = await searchParams;
  const ids = first(sp.ids);
  const slugs = ids ? ids.split(",").filter(Boolean).slice(0, 4) : [];

  const selected = (
    await Promise.all(slugs.map((slug) => getPackageBySlug(slug)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (selected.length >= 2) {
    return (
      <>
        <PageHeader
          eyebrow="Side by side"
          title="Compare Packages"
          description={`Comparing ${selected.length} packages across price, hotels, airline and more.`}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
        />
        <div className="container-page py-12">
          <ComparisonTable packages={selected} />
        </div>
      </>
    );
  }

  // No (or not enough) packages picked yet — show the same filters as the
  // main listing so choosing 2-4 out of 300+ packages doesn't mean scrolling
  // through every single one.
  const filters = parsePackageFilters(sp);
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const [allResults, priceRange] = await Promise.all([getPackages(filters), Promise.resolve(getPriceRange())]);
  const departureMonths = getDepartureMonths();

  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const pageResults = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(sp)) {
      if (key === "page" || key === "ids") continue;
      for (const v of all(value)) params.append(key, v);
    }
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/compare?${qs}` : "/compare";
  };

  return (
    <>
      <PageHeader
        eyebrow="Pick 2–4 packages"
        title="Compare Packages"
        description="Filter down to the packages you're deciding between, tick 2-4, then compare them side by side — price, hotels, airline, meals and more."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />
      <div className="container-page py-12">
        <div className="flex gap-8">
          <PackageFiltersDesktop priceMin={priceRange.min} priceMax={priceRange.max} departureMonths={departureMonths} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-brand-navy">{allResults.length}</span> package
                {allResults.length === 1 ? "" : "s"} to choose from
              </p>
              <div className="flex items-center gap-2">
                <PackageFiltersMobile priceMin={priceRange.min} priceMax={priceRange.max} departureMonths={departureMonths} />
                <SortDropdown />
              </div>
            </div>

            {pageResults.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  title="No packages match those filters"
                  description="Try widening your price range or clearing a filter."
                  actionLabel="Clear filters"
                  actionHref="/compare"
                />
              </div>
            ) : (
              <div className="mt-8">
                <ComparePicker packages={pageResults} />
              </div>
            )}

            <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
          </div>
        </div>
      </div>
    </>
  );
}
