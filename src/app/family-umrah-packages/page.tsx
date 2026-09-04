import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PackageCollectionGrid } from "@/components/packages/collection-grid";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Family Umrah Packages Sri Lanka",
  description:
    "Planning Umrah with children, parents, or your whole family? Compare family-friendly Umrah packages from Sri Lankan agencies, and what to check before booking as a group.",
  alternates: { canonical: "/family-umrah-packages" },
};

export default async function FamilyUmrahPackagesPage() {
  const packages = await getPackages({ groupType: ["family"], sort: "popular" });

  return (
    <>
      <PageHeader
        eyebrow="Travelling as a family"
        title="Family Umrah Packages"
        description="Packages and agencies set up for family groups — parents, children, and multi-generation travel together."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Family Umrah Packages" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Most Umrah packages are priced and structured for adult group departures, so a family booking — especially
            with young children or elderly parents — is usually arranged directly with the agency rather than picked
            off a shelf. When you contact an agency about a family trip, ask specifically about: child pricing (some
            agencies charge a reduced rate for under-12s, some don&rsquo;t charge for infants sharing a bed), room
            configuration (triple/quad rooms for larger families), pram or wheelchair access at the hotel, and
            whether the group&rsquo;s walking pace and rest stops suit young children or elderly members. See our{" "}
            <a href="/islamic-tools/children-umrah-guide" className="text-brand-navy underline underline-offset-2">
              Umrah with Children guide
            </a>{" "}
            and{" "}
            <a href="/islamic-tools/elderly-umrah-guide" className="text-brand-navy underline underline-offset-2">
              Umrah for Elderly Pilgrims guide
            </a>{" "}
            for the practical details.
          </p>
        </div>

        <PackageCollectionGrid
          packages={packages}
          emptyTitle="No dedicated family-group packages listed right now"
          emptyDescription="Most agencies still arrange family bookings individually rather than as a separate listed package — contact an agency directly from the packages page, or check back as more family-specific listings are added."
        />

        <ToolFaq
          heading="Family Umrah packages — frequently asked questions"
          items={[
            {
              question: "Do children pay full price on Umrah packages?",
              answer:
                "It depends on the agency and the child's age. Many agencies discount for children under 12, especially if sharing a bed with parents rather than needing a separate bed. Always confirm the exact child pricing directly with the agency before booking.",
            },
            {
              question: "Can I book a family room instead of separate rooms?",
              answer:
                "Most agencies can arrange triple or quad-sharing rooms for families on request, even if the standard listing shows double occupancy — ask when you contact them.",
            },
            {
              question: "Is Umrah suitable for young children or elderly parents?",
              answer:
                "Yes, with planning. The main practical concerns are walking distance to the Haram, crowd levels, and pacing the rituals over more time. See our Umrah with Children and Elderly Umrah guides under Islamic Tools for a full breakdown.",
            },
          ]}
        />
      </div>
    </>
  );
}
