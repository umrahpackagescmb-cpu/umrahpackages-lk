import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X as XIcon, FileText } from "lucide-react";

import { PackageGallery } from "@/components/packages/package-gallery";
import { BeforeYouBook } from "@/components/packages/before-you-book";
import { SpecTable } from "@/components/packages/spec-table";
import { ContactCard } from "@/components/packages/contact-card";
import { HotelRouteMap } from "@/components/islamic/hotel-route-map-loader";
import { KAABA_COORDS, NABAWI_COORDS } from "@/lib/islamic/landmarks";
import { TrustBadgeList } from "@/components/badges/trust-badge";
import { PackageCard } from "@/components/cards/package-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { getPackageBySlug, getPackages, getSimilarPackages, isPackageExpired } from "@/lib/data";
import { packageSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { formatDate, nextDeparture } from "@/lib/format";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};

  const title = `${pkg.title} — ${pkg.agency.name}`;
  const description = `${pkg.durationDays}-day Umrah package from ${pkg.departureCity} via ${pkg.airline}, staying at ${pkg.makkahHotel} in Makkah. From ${pkg.priceLkr.toLocaleString()} LKR, listed by ${pkg.agency.name} on ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: pkg.coverImageUrl, width: 1200, height: 800, alt: pkg.title }],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const similar = await getSimilarPackages(pkg, 4);
  const departs = nextDeparture(pkg.departureDates);
  const allDepartureDates = [...(pkg.departureDates ?? [])].sort();
  const expired = isPackageExpired(pkg);

  return (
    <div className="container-page py-10">
      <JsonLd data={packageSchema(pkg)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Packages", url: "/packages" },
          { name: pkg.title, url: `/packages/${pkg.slug}` },
        ])}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/packages" className="hover:text-brand-navy">Packages</Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-navy">{pkg.title}</span>
      </nav>

      {expired && (
        <div className="mb-6 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
          The departure date{allDepartureDates.length > 1 ? "s" : ""} shown below{" "}
          {allDepartureDates.length > 1 ? "have" : "has"} already passed, so this package no longer
          appears in search or listings. Contact {pkg.agency.name} directly to ask about the next
          available departure — they may be able to offer similar dates and pricing.
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="capitalize">{pkg.category}</Badge>
            {pkg.isFeatured && <Badge variant="gold">Featured</Badge>}
            <TrustBadgeList badges={pkg.agency.badges} />
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl text-balance">
            {pkg.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Listed by{" "}
            <Link href={`/agencies/${pkg.agency.slug}`} className="font-medium text-brand-navy hover:text-brand-gold-dark">
              {pkg.agency.name}
            </Link>
            {departs && <> · Next departure {formatDate(departs)}</>}
          </p>

          {allDepartureDates.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {allDepartureDates.length > 1 ? "Available departure dates" : "Departure date"}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                All dates below depart at the price shown for this package.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {allDepartureDates.map((date) => (
                  <Badge key={date} variant={date === departs ? "gold" : "default"}>
                    {formatDate(date)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <PackageGallery images={pkg.images.length ? pkg.images : [pkg.coverImageUrl]} title={pkg.title} />
          </div>

          {/* Mobile-only contact card, shown after the gallery */}
          <div className="mt-6 lg:hidden">
            <ContactCard pkg={pkg} />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-brand-navy">Package Details</h2>
            <div className="mt-5">
              <SpecTable pkg={pkg} />
            </div>
          </section>

          {(pkg.makkahHotelLat != null || pkg.madinahHotelLat != null) && (
            <>
              <Separator className="my-10" />
              <section>
                <h2 className="font-display text-xl font-semibold text-brand-navy">
                  Walking Distance to the Haramain
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real walking routes calculated from each hotel&rsquo;s coordinates, as
                  provided by {pkg.agency.name}.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {pkg.makkahHotelLat != null && pkg.makkahHotelLng != null && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-brand-navy">{pkg.makkahHotel}</p>
                      <HotelRouteMap
                        hotelLat={pkg.makkahHotelLat}
                        hotelLng={pkg.makkahHotelLng}
                        hotelLabel={pkg.makkahHotel}
                        landmarkLat={KAABA_COORDS.lat}
                        landmarkLng={KAABA_COORDS.lng}
                        landmarkLabel="Masjid al-Haram"
                      />
                    </div>
                  )}
                  {pkg.madinahHotelLat != null && pkg.madinahHotelLng != null && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-brand-navy">{pkg.madinahHotel}</p>
                      <HotelRouteMap
                        hotelLat={pkg.madinahHotelLat}
                        hotelLng={pkg.madinahHotelLng}
                        hotelLabel={pkg.madinahHotel}
                        landmarkLat={NABAWI_COORDS.lat}
                        landmarkLng={NABAWI_COORDS.lng}
                        landmarkLabel="Al-Masjid an-Nabawi"
                      />
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          <Separator className="my-10" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <section>
              <h2 className="font-display text-lg font-semibold text-brand-navy">What&rsquo;s Included</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" /> {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-lg font-semibold text-brand-navy">Not Included</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {pkg.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                    <XIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" /> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {pkg.brochureUrl && (
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link href={pkg.brochureUrl} target="_blank" rel="noopener noreferrer">
                  <FileText /> Download Brochure
                </Link>
              </Button>
            </div>
          )}

          {pkg.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {pkg.tags.map((tag) => (
                <Badge key={tag} variant="muted" className="capitalize">
                  {tag.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          )}

          <BeforeYouBook />
        </div>

        <div className="hidden lg:block">
          <ContactCard pkg={pkg} />
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-brand-navy">Similar Packages</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
