import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PackageCollectionGrid } from "@/components/packages/collection-grid";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages, getPriceRange } from "@/lib/data";
import { formatLkr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Cheap Umrah Packages Sri Lanka",
  description:
    "Compare the most affordable Umrah packages from Sri Lankan travel agencies — economy and standard tiers, sorted lowest price first. See what's actually included before you decide.",
  alternates: { canonical: "/cheap-umrah-packages" },
};

export default async function CheapUmrahPackagesPage() {
  const [packages, priceRange] = await Promise.all([
    getPackages({ category: ["economy", "standard"], sort: "price_asc" }),
    Promise.resolve(getPriceRange()),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Budget-friendly options"
        title="Cheap Umrah Packages in Sri Lanka"
        description={`Economy and standard-tier Umrah packages from Sri Lankan agencies, cheapest first. Prices on this platform currently start from ${formatLkr(priceRange.min)}.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cheap Umrah Packages" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            &ldquo;Cheap&rdquo; doesn&rsquo;t have to mean risky — it means fewer extras, not fewer safeguards. A
            genuinely affordable Umrah package usually saves money on hotel distance from the Haram, group size, and
            meal plan, while still including the essentials: visa processing, return flights, ground transport
            between Makkah and Madinah, and accommodation for the full trip. Before booking the lowest price you see,
            confirm directly with the agency on WhatsApp exactly what&rsquo;s included and excluded — hotel
            distance in particular varies a lot between similarly-priced packages.
          </p>
        </div>

        <PackageCollectionGrid
          packages={packages}
          emptyTitle="No economy/standard packages listed right now"
          emptyDescription="Agencies are still adding their package catalogues. Check back soon, or browse everything currently listed."
        />

        <ToolFaq
          heading="Cheap Umrah packages — frequently asked questions"
          items={[
            {
              question: "What's the cheapest Umrah package from Sri Lanka right now?",
              answer: `Prices change as agencies update their listings. Right now, the lowest price listed on UmrahPackages.lk is ${formatLkr(priceRange.min)} — use the filters above or on the full packages page to see current pricing and what each package includes.`,
            },
            {
              question: "Are cheap Umrah packages safe?",
              answer:
                "A lower price is fine as long as the agency is a genuine, licensed Umrah operator. Check for IATA or SLTDA registration, ask for a written itinerary before paying anything, and never send the full amount before you have a confirmed booking reference from the agency.",
            },
            {
              question: "What makes one Umrah package cheaper than another?",
              answer:
                "The biggest cost drivers are hotel distance from the Haram (closer costs more), group size (larger groups are usually cheaper per person), meal plan (full board vs. breakfast-only), and airline. Two packages at similar prices can differ a lot on these.",
            },
            {
              question: "Can I negotiate the price directly with the agency?",
              answer:
                "Often, yes — especially for group bookings or off-peak dates. Contact the agency directly via WhatsApp from their package listing; UmrahPackages.lk doesn't process payments or bookings, so all pricing discussions happen directly between you and the agency.",
            },
          ]}
        />
      </div>
    </>
  );
}
