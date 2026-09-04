import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PackageCollectionGrid } from "@/components/packages/collection-grid";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Luxury Umrah Packages Sri Lanka",
  description:
    "Compare premium Umrah packages from Sri Lankan travel agencies — Haram-view and 5-star hotels, smaller groups, and full-service arrangements.",
  alternates: { canonical: "/luxury-umrah-packages" },
};

export default async function LuxuryUmrahPackagesPage() {
  const packages = await getPackages({ category: ["premium", "luxury"], sort: "price_desc" });

  return (
    <>
      <PageHeader
        eyebrow="Premium & VIP options"
        title="Luxury Umrah Packages from Sri Lanka"
        description="Premium-tier Umrah packages — hotels closer to the Haram, smaller or private groups, and a more comfortable overall trip."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Luxury Umrah Packages" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            A luxury or premium Umrah package usually means one thing above all else: hotel proximity. Being able to
            walk to Masjid al-Haram or Masjid an-Nabawi in a few minutes, rather than taking a shuttle, is the single
            biggest upgrade agencies charge for — followed by group size (private or small-group departures instead
            of large group tours), meal quality, and sometimes added Ziyarah (historical site visit) itineraries.
            When comparing premium packages, ask each agency for the exact hotel name and its walking distance to
            the Haram — &ldquo;5-star&rdquo; alone doesn&rsquo;t tell you that.
          </p>
        </div>

        <PackageCollectionGrid
          packages={packages}
          emptyTitle="No premium/luxury packages listed right now"
          emptyDescription="Agencies are still adding their package catalogues. Check back soon, or browse everything currently listed."
        />

        <ToolFaq
          heading="Luxury Umrah packages — frequently asked questions"
          items={[
            {
              question: "What makes an Umrah package \"luxury\"?",
              answer:
                "Mainly hotel distance from the Haram (walking distance vs. a shuttle ride), smaller group sizes or private departures, upgraded meal plans, and sometimes business-class flight options or added Ziyarah tours to historical Islamic sites.",
            },
            {
              question: "How much more does a luxury Umrah package cost?",
              answer:
                "It varies by agency and season, but Haram-view or walking-distance hotels are typically the largest single cost difference. Compare packages side by side on UmrahPackages.lk and confirm the exact hotel and distance with the agency before booking.",
            },
            {
              question: "Is a private group departure available?",
              answer:
                "Some agencies offer private or small-group departures for families or corporate groups — contact the agency directly via WhatsApp to ask, since this isn't always listed as a separate package.",
            },
          ]}
        />
      </div>
    </>
  );
}
