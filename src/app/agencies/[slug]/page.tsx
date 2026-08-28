import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, MessageCircle, CalendarCheck, Package as PackageIcon } from "lucide-react";

import { TrustBadgeList } from "@/components/badges/trust-badge";
import { PackageCard } from "@/components/cards/package-card";
import { OsmMap } from "@/components/agencies/osm-map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/layout/empty-state";
import { JsonLd } from "@/components/seo/json-ld";
import { getAgencies, getAgencyBySlug, getPackagesByAgency } from "@/lib/data";
import { travelAgencySchema, breadcrumbSchema } from "@/lib/schema";

export async function generateStaticParams() {
  const agencies = await getAgencies();
  return agencies.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) return {};

  return {
    title: agency.name,
    description: `${agency.description} Based in ${agency.city}, Sri Lanka. Browse ${agency.packageCount} Umrah packages and contact ${agency.name} directly.`,
    alternates: { canonical: `/agencies/${agency.slug}` },
    openGraph: {
      images: [{ url: agency.coverImageUrl ?? agency.logoUrl, width: 1200, height: 630, alt: agency.name }],
    },
  };
}

export default async function AgencyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);
  if (!agency) notFound();

  const packages = await getPackagesByAgency(agency.id);

  return (
    <div>
      <JsonLd data={travelAgencySchema(agency)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Agencies", url: "/agencies" },
          { name: agency.name, url: `/agencies/${agency.slug}` },
        ])}
      />

      <div className="theme-navy relative bg-brand-navy">
        <div className="relative h-56 w-full overflow-hidden sm:h-64">
          <Image
            src={agency.coverImageUrl ?? agency.logoUrl}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
        </div>

        <div className="container-page relative -mt-16 pb-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <Image
              src={agency.logoUrl}
              alt={agency.name}
              width={96}
              height={96}
              className="rounded-2xl border-4 border-white shadow-soft-lg"
            />
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">{agency.name}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="size-4" /> {agency.city}
                {agency.yearsActive && <> · {agency.yearsActive} years in business</>}
              </p>
              <TrustBadgeList badges={agency.badges} className="mt-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-brand-navy">About</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{agency.description}</p>

            {agency.lat && agency.lng && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold text-brand-navy">Location</h2>
                <div className="mt-3">
                  <OsmMap lat={agency.lat} lng={agency.lng} label={agency.address ?? agency.city} />
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-brand-navy">
                <PackageIcon className="size-5 text-brand-gold-dark" /> Packages by {agency.name}
              </h2>
              {packages.length === 0 ? (
                <div className="mt-6">
                  <EmptyState
                    icon={CalendarCheck}
                    title="No packages listed yet"
                    description="Check back soon, or contact the agency directly to ask about availability."
                  />
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Card className="sticky top-24 gap-4">
              <h2 className="font-display font-semibold text-brand-navy">Contact {agency.name}</h2>
              <div className="flex flex-col gap-2 text-sm">
                {agency.address && (
                  <p className="flex items-start gap-2 text-foreground/80">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" /> {agency.address}
                  </p>
                )}
                <p className="flex items-center gap-2 text-foreground/80">
                  <Phone className="size-4 shrink-0 text-brand-gold-dark" /> {agency.phone}
                </p>
                <p className="flex items-center gap-2 text-foreground/80">
                  <Mail className="size-4 shrink-0 text-brand-gold-dark" /> {agency.email}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="gold" asChild className="bg-[#25D366] text-white hover:bg-[#1ebc59]">
                  <Link href={agency.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`tel:${agency.phone.replace(/\s+/g, "")}`}>
                    <Phone /> Call Now
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                UmrahPackages.lk doesn&rsquo;t process payments or bookings —
                you&rsquo;re contacting {agency.name} directly, and any
                booking is a direct arrangement between you and them. See
                our{" "}
                <Link href="/terms" className="underline hover:text-brand-navy">
                  Terms
                </Link>
                .
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
