import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Package, Globe2, Gift, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Wholesale for Travel Companies (Coming Soon)",
  description:
    "A preview of bulk, white-label pilgrim travel kits UmrahPackages.lk is considering offering to Umrah and Hajj travel companies worldwide.",
  alternates: { canonical: "/merchandise/wholesale" },
};

const REASONS = [
  {
    icon: Gift,
    title: "Welcome kits for your groups",
    description:
      "Hand pilgrims a branded (yours or ours) travel kit at departure briefing — a small touch that group operators worldwide already use to stand out.",
  },
  {
    icon: Globe2,
    title: "Not limited to Sri Lanka",
    description:
      "This would be open to Umrah and Hajj travel companies anywhere — the products themselves (ihram sets, travel prayer kits, security pouches) are things pilgrim groups everywhere need.",
  },
  {
    icon: Package,
    title: "Bulk pricing, simple ordering",
    description:
      "The plan is tiered pricing by order size and a straightforward reorder process — details are still being worked out based on interest.",
  },
];

export default function WholesalePage() {
  return (
    <>
      <PageHeader
        eyebrow="Coming soon — concept preview"
        title="Wholesale for Travel Companies"
        description="We're exploring whether to offer bulk, white-label pilgrim travel kits to Umrah and Hajj travel companies — in Sri Lanka and beyond. This page is a preview, not an active program."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Merchandise", href: "/merchandise" },
          { label: "Wholesale" },
        ]}
      />

      <div className="container-page py-12">
        <Card className="flex-row items-start gap-4 border-brand-gold/30 bg-brand-gold/5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-brand-navy">Nothing is orderable yet</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We haven&rsquo;t set up payments, minimum order quantities, or shipping for this yet. We&rsquo;re
              gauging whether enough travel companies would actually want it before building it out.
            </p>
          </div>
        </Card>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REASONS.map((r) => (
            <Card key={r.title} className="items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                <r.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-navy">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The product ideas start from what pilgrim travel companies elsewhere already offer their groups —
          Ihram sets with a carry bag, anti-theft passport belts, and compact prayer kits are common on
          international marketplaces but not something we&rsquo;ve seen widely stocked or branded for Sri
          Lankan agencies specifically. See the full concept lineup on the{" "}
          <Link href="/merchandise" className="font-medium text-brand-gold-dark hover:text-brand-navy transition-colors">
            merchandise preview page
          </Link>
          .
        </p>

        <div className="mt-10 rounded-3xl bg-brand-navy p-8 text-white sm:p-10">
          <h2 className="font-display text-xl font-bold">Represent a travel company?</h2>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            Tell us roughly how many pilgrims you send per year and what you&rsquo;d actually want in a kit.
            That&rsquo;s what will decide whether — and how — we build this out.
          </p>
          <Button variant="gold" size="lg" asChild className="mt-6">
            <Link href={`mailto:${siteConfig.contact.email}?subject=Wholesale interest`}>
              <Mail className="size-4" /> Email us your interest
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
