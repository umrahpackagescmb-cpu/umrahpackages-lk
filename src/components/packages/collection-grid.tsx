import Link from "next/link";
import { PackageCard } from "@/components/cards/package-card";
import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";
import type { Package } from "@/types/domain";

/**
 * Shared "live inventory" block for the keyword-targeted landing pages
 * (cheap/luxury/family/ramadan/december Umrah packages, etc). Renders the
 * real, currently-matching packages when there are any; when there aren't
 * (a real possibility on a small, honest, real-data catalogue — see
 * mock-data.ts's no-fabrication rule), it says so plainly instead of
 * hiding the section or padding it with unrelated packages, and offers a
 * clear path to the full catalogue and to contacting agencies directly.
 */
export function PackageCollectionGrid({
  packages,
  emptyTitle,
  emptyDescription,
  browseAllHref = "/packages",
}: {
  packages: Package[];
  emptyTitle: string;
  emptyDescription: string;
  browseAllHref?: string;
}) {
  if (packages.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState title={emptyTitle} description={emptyDescription} actionLabel="Browse all packages" actionHref={browseAllHref} />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button variant="outline" asChild>
          <Link href={browseAllHref}>See every package, with full filters</Link>
        </Button>
      </div>
    </>
  );
}
