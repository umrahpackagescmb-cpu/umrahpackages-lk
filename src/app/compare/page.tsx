import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ComparisonTable } from "@/components/packages/comparison-table";
import { ComparePicker } from "@/components/packages/compare-picker";
import { getPackageBySlug, getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Umrah Packages",
  description: "Compare Umrah packages side by side — price, hotels, airline, meals and more.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
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

  const allPackages = await getPackages({ sort: "popular" });

  return (
    <>
      <PageHeader
        eyebrow="Pick 2–4 packages"
        title="Compare Packages"
        description="Select the packages you're deciding between and see them side by side — price, hotels, airline, meals and more."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />
      <div className="container-page py-12">
        <ComparePicker packages={allPackages} />
      </div>
    </>
  );
}
