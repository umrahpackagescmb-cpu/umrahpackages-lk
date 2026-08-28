import { SectionHeading } from "@/components/home/section-heading";
import { PackageCard } from "@/components/cards/package-card";
import { getFeaturedPackages } from "@/lib/data";

export async function FeaturedPackages() {
  const featured = await getFeaturedPackages(4);

  if (featured.length === 0) return null;

  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Handpicked for you"
        title="Featured Umrah Packages"
        description="A snapshot of trending packages from verified agencies across Sri Lanka."
        href="/packages"
        linkLabel="Browse all packages"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
