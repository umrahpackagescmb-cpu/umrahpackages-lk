import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PackageCollectionGrid } from "@/components/packages/collection-grid";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "December Umrah Packages Sri Lanka",
  description:
    "Umrah packages departing in December — a popular month for Sri Lankan pilgrims travelling during the year-end school holidays.",
  alternates: { canonical: "/december-umrah-packages" },
};

export default async function DecemberUmrahPackagesPage() {
  const allPackages = await getPackages({ sort: "popular" });
  const decemberPackages = allPackages.filter((p) => p.departureDates?.some((d) => d.slice(5, 7) === "12"));

  return (
    <>
      <PageHeader
        eyebrow="Year-end departures"
        title="December Umrah Packages"
        description="December is one of the most popular months for Sri Lankan pilgrims to travel — school holidays and the year-end break make it easier for the whole family to go together."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "December Umrah Packages" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Because December overlaps with school holidays in Sri Lanka, it&rsquo;s a popular month for family and group
            Umrah travel — which also means agencies release December-dated packages earlier and seats fill up
            faster than other months. Weather in Makkah and Madinah in December is generally mild and comfortable
            compared to the summer months, which is another reason it&rsquo;s a preferred travel window.
          </p>
        </div>

        <PackageCollectionGrid
          packages={decemberPackages}
          emptyTitle="No December-dated packages listed yet"
          emptyDescription="Agencies usually confirm December departure dates a few months ahead. Browse current packages and ask an agency directly about upcoming December dates, or check back soon."
        />

        <ToolFaq
          heading="December Umrah — frequently asked questions"
          items={[
            {
              question: "Why is December a popular month for Umrah from Sri Lanka?",
              answer:
                "It lines up with school holidays and the year-end break, making it easier for families to travel together. It's also outside Sri Lanka's monsoon peak and offers mild weather in Saudi Arabia.",
            },
            {
              question: "Should I book a December Umrah package early?",
              answer:
                "Yes — December is one of the busier travel months, so flights and hotel availability near the Haram tighten up as the month approaches. Booking a few months ahead generally gets better pricing and choice.",
            },
          ]}
        />
      </div>
    </>
  );
}
