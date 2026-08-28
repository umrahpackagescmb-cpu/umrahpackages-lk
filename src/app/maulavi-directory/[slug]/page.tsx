import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, Languages, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { MaulaviCard } from "@/components/cards/maulavi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import { getMaulaviBySlug, getMaulavis } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  const maulavis = await getMaulavis();
  return maulavis.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const maulavi = await getMaulaviBySlug(slug);
  if (!maulavi) return {};

  const title = maulavi.name;
  const description = `${maulavi.specialization} based in ${maulavi.city}, Sri Lanka, with ${maulavi.yearsExperience} years of experience. Speaks ${maulavi.languages.join(", ")}. Listed on ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/maulavi-directory/${maulavi.slug}` },
  };
}

export default async function MaulaviDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const maulavi = await getMaulaviBySlug(slug);
  if (!maulavi) notFound();

  const others = (await getMaulavis({ city: maulavi.city })).filter((m) => m.id !== maulavi.id).slice(0, 4);

  return (
    <div className="container-page py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Maulavi Directory", url: "/maulavi-directory" },
          { name: maulavi.name, url: `/maulavi-directory/${maulavi.slug}` },
        ])}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/maulavi-directory" className="hover:text-brand-navy">Maulavi Directory</Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-navy">{maulavi.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col items-center gap-4 text-center lg:col-span-1 lg:items-start lg:text-left">
          <Image
            src={maulavi.photoUrl}
            alt={maulavi.name}
            width={140}
            height={140}
            className="rounded-full border border-border object-cover"
          />
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-navy">{maulavi.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{maulavi.specialization}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-gold-dark" /> {maulavi.city}, Sri Lanka
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="size-4 text-brand-gold-dark" /> {maulavi.yearsExperience} years experience
            </span>
            <span className="flex items-center gap-2">
              <Languages className="size-4 text-brand-gold-dark" /> {maulavi.languages.join(", ")}
            </span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="gap-4 shadow-soft-lg">
            <h2 className="font-display text-lg font-semibold text-brand-navy">Get in touch</h2>
            <p className="text-sm text-muted-foreground">
              Reach out directly to discuss guidance for your Umrah or Hajj journey, group
              coordination, or scheduling a session.
            </p>

            <Separator />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="gold" size="lg" asChild className="flex-1 bg-[#25D366] text-white hover:bg-[#1ebc59]">
                <Link href={maulavi.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="flex-1">
                <Link href={`tel:${maulavi.phone.replace(/\s+/g, "")}`}>
                  <Phone /> Call {maulavi.phone}
                </Link>
              </Button>
            </div>

            <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brand-gold-dark" />
              UmrahPackages.lk connects you directly with the scholar — we don&rsquo;t process
              payments or take a booking fee.
            </p>
          </Card>
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-brand-navy">
            More Scholars in {maulavi.city}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((m) => (
              <MaulaviCard key={m.id} maulavi={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
