import { SectionHeading } from "@/components/home/section-heading";
import { AgencyCard } from "@/components/cards/agency-card";
import { mockAgencies } from "@/lib/mock-data";

export function FeaturedAgencies() {
  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Listed agencies"
        title="Travel Agencies"
        description="Browse Umrah operators listed on UmrahPackages.lk. Trust badges are only ever assigned by our team, never bought."
        href="/agencies"
        linkLabel="View all agencies"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockAgencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </section>
  );
}
