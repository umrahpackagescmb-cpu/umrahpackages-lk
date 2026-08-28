import { SectionHeading } from "@/components/home/section-heading";
import { PackageCard } from "@/components/cards/package-card";
import { getTrendingPackages } from "@/lib/data";

export async function TrendingPackages() {
  const trending = await getTrendingPackages(4);

  if (trending.length === 0) return null;

  return (
    <section className="bg-brand-gray py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Popular this month"
          title="Trending Now"
          description="The packages Sri Lankan pilgrims are viewing and contacting agencies about most."
          href="/packages?sort=popular"
          linkLabel="See all trending packages"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
