import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getNameBySlug, getSimilarNames, islamicNamesData } from "@/lib/islamic/names-query";

export async function generateStaticParams() {
  return islamicNamesData.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNameBySlug(slug);
  if (!entry) return {};

  return {
    title: `${entry.name} — Meaning, Origin & Gender`,
    description: `${entry.name} is a ${entry.gender} Islamic name meaning "${entry.meaning}". Origin: ${entry.origin}. See its pronunciation notes and similar Islamic names.`,
    alternates: { canonical: `/islamic-names/${entry.slug}` },
    keywords: [
      `${entry.name} meaning`,
      `${entry.name} islamic name`,
      `meaning of ${entry.name}`,
      `${entry.gender} islamic names`,
    ],
  };
}

export default async function IslamicNameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getNameBySlug(slug);
  if (!entry) notFound();

  const similar = getSimilarNames(entry, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          name: entry.name,
          description: entry.meaning,
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Islamic Names & Meanings",
            url: `${siteConfig.url}/islamic-names`,
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Islamic Tools", url: "/islamic-tools" },
          { name: "Islamic Names", url: "/islamic-names" },
          { name: entry.name, url: `/islamic-names/${entry.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`${entry.gender === "male" ? "Boy's name" : "Girl's name"} · ${entry.origin}`}
        title={entry.name}
        description={`"${entry.meaning}"`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Islamic Tools", href: "/islamic-tools" },
          { label: "Islamic Names", href: "/islamic-names" },
          { label: entry.name },
        ]}
      />

      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" size="sm" asChild className="-ml-3 text-muted-foreground">
            <Link href="/islamic-names">
              <ArrowLeft className="size-3.5" /> Back to all names
            </Link>
          </Button>

          <Card className="mt-4 gap-4 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="capitalize">
                {entry.gender}
              </Badge>
              <Badge variant="goldOutline">{entry.origin}</Badge>
              <Badge variant="muted">{entry.letterCount} letters</Badge>
              {entry.isPopular && (
                <Badge variant="gold">
                  <Sparkles /> Popular
                </Badge>
              )}
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-brand-navy">Meaning</h2>
              <p className="mt-1 text-muted-foreground">{entry.meaning}</p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-brand-navy">About this name</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {entry.name} is a {entry.gender} name of {entry.origin} origin, meaning &ldquo;
                {entry.meaning}&rdquo;. It has {entry.letterCount} letters and starts with the
                letter &ldquo;{entry.startingLetter}&rdquo;.
                {entry.isPopular
                  ? " It's one of the more widely used names among Muslim families today."
                  : ""}
              </p>
            </div>

            <div className="rounded-xl bg-brand-gray/40 p-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Pronunciation and spelling can vary by region and language — the transliteration
                shown here follows common English usage. If you&rsquo;re choosing this name for a
                child, it&rsquo;s worth double-checking the meaning and any religious significance
                with a knowledgeable local scholar or imam.
              </p>
            </div>
          </Card>

          {similar.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-brand-navy">Similar names</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {similar.map((n) => (
                  <Link key={n.slug} href={`/islamic-names/${n.slug}`}>
                    <Card className="h-full gap-1 p-4 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200">
                      <p className="font-display font-semibold text-brand-navy">{n.name}</p>
                      <p className="text-sm text-muted-foreground">{n.meaning}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Planning your own journey to Makkah and Madinah?
            </p>
            <Button variant="gold" size="sm" asChild className="mt-3">
              <Link href="/packages">Compare Umrah packages</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
