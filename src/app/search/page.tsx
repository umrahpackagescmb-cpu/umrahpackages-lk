import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { PackageCard } from "@/components/cards/package-card";
import { AgencyCard } from "@/components/cards/agency-card";
import { SearchBar } from "@/components/search/search-bar";
import { Badge } from "@/components/ui/badge";
import { searchAll, popularSearches } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Umrah packages, travel agencies, and blog articles on UmrahPackages.lk.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;
  const results = query ? await searchAll(query) : null;
  const totalResults = results ? results.packages.length + results.agencies.length + results.posts.length : 0;

  return (
    <>
      <PageHeader
        eyebrow="Find what you need"
        title="Search"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <SearchBar defaultValue={query} />
        </div>

        {!query && (
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground">
              <TrendingUp className="size-4" /> Popular searches
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {popularSearches.map((term) => (
                <Link key={term} href={`/search?query=${encodeURIComponent(term)}`}>
                  <Badge variant="outline" className="px-3 py-1.5 hover:border-brand-gold hover:text-brand-gold-dark transition-colors">
                    {term}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && results && (
          <div className="mt-10">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-brand-navy">{totalResults}</span> result
              {totalResults === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>

            {totalResults === 0 ? (
              <div className="mt-8">
                <EmptyState
                  icon={SearchIcon}
                  title="No results found"
                  description="Try a different search term, or browse all packages instead."
                  actionLabel="Browse Packages"
                  actionHref="/packages"
                />
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-12">
                {results.packages.length > 0 && (
                  <section>
                    <h2 className="font-display text-lg font-semibold text-brand-navy">
                      Packages ({results.packages.length})
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {results.packages.map((p) => (
                        <PackageCard key={p.id} pkg={p} />
                      ))}
                    </div>
                  </section>
                )}

                {results.agencies.length > 0 && (
                  <section>
                    <h2 className="font-display text-lg font-semibold text-brand-navy">
                      Agencies ({results.agencies.length})
                    </h2>
                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {results.agencies.map((a) => (
                        <AgencyCard key={a.id} agency={a} />
                      ))}
                    </div>
                  </section>
                )}

                {results.posts.length > 0 && (
                  <section>
                    <h2 className="font-display text-lg font-semibold text-brand-navy">
                      Blog Articles ({results.posts.length})
                    </h2>
                    <div className="mt-5 flex flex-col gap-3">
                      {results.posts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="rounded-xl border border-border p-4 hover:border-brand-gold/40 transition-colors"
                        >
                          <p className="font-medium text-brand-navy">{post.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
