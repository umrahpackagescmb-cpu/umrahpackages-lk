import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PackageCollectionGrid } from "@/components/packages/collection-grid";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ramadan Umrah Packages Sri Lanka",
  description:
    "Planning Umrah during Ramadan? See Ramadan-departure Umrah packages from Sri Lankan agencies, expected 2027 Ramadan dates, and what to know about the busiest, most spiritually significant time to go.",
  alternates: { canonical: "/ramadan-umrah-packages" },
};

export default async function RamadanUmrahPackagesPage() {
  const allPackages = await getPackages({ sort: "popular" });
  const ramadanPackages = allPackages.filter((p) => p.tags.some((t) => t.toLowerCase().includes("ramadan")));

  return (
    <>
      <PageHeader
        eyebrow="Umrah in the holy month"
        title="Ramadan Umrah Packages"
        description="Performing Umrah during Ramadan is considered especially rewarding — and it's the busiest, most expensive time of year to go. Here's what to expect."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Ramadan Umrah Packages" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Ramadan 2027 is currently expected to begin around <strong>8 February 2027</strong> and end around{" "}
            <strong>8 March 2027</strong>, with Eid al-Fitr following shortly after — but like every Hijri date,
            the exact start depends on moon sighting and can shift by a day. Ramadan Umrah packages are the most
            in-demand and highest-priced of the year, especially departures in the last ten nights (seeking Laylatul
            Qadr), so agencies typically open bookings months in advance and prices rise the closer it gets to the
            month. If you&rsquo;re planning a Ramadan Umrah, contact agencies early — both for better pricing and because
            visa and flight availability tightens fast as the month approaches.
          </p>
        </div>

        <PackageCollectionGrid
          packages={ramadanPackages}
          emptyTitle="No Ramadan-specific packages listed yet"
          emptyDescription="Agencies typically open Ramadan-dated packages a few months ahead of the month itself. Browse current packages and ask an agency directly about their Ramadan plans, or check back closer to the date."
        />

        <ToolFaq
          heading="Ramadan Umrah — frequently asked questions"
          items={[
            {
              question: "When is Ramadan 2027?",
              answer:
                "Ramadan 2027 is currently expected to run from around 8 February to 8 March 2027, based on astronomical calculations — the confirmed start depends on the official moon sighting closer to the date, so treat this as an estimate.",
            },
            {
              question: "Why is Ramadan Umrah more expensive?",
              answer:
                "Demand is at its highest all year, especially for the last ten nights of the month, so flights, hotels, and Umrah package prices all rise. Booking early — often 3-6 months ahead — is the main way to manage the cost.",
            },
            {
              question: "Is performing Umrah in Ramadan better than at other times?",
              answer:
                "Many scholars note the special virtue of Umrah performed during Ramadan, though Umrah is valid and complete at any time of year. It's a personal and spiritual decision — this page is about the practical/logistical side, not religious guidance.",
            },
          ]}
        />
      </div>
    </>
  );
}
