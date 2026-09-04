import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Scale, Users, Heart } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — Sri Lanka's platform for comparing Umrah packages from local travel agencies.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Trust badges you can rely on",
    description:
      "Gold Verified, Featured, and Premium Partner badges are assigned by our team only after we've reviewed an agency — never sold, never automatic.",
  },
  {
    icon: Scale,
    title: "Compare without pressure",
    description:
      "No account required to browse. Compare as many packages as you like, on your own time, before reaching out.",
  },
  {
    icon: Users,
    title: "You deal with the agency, directly",
    description:
      "We don't process payments or take a booking commission. When you're ready, you contact the agency yourself.",
  },
  {
    icon: Heart,
    title: "Built for Sri Lankan pilgrims",
    description:
      "Prices in LKR, departures from Sri Lankan airports, and Islamic tools built in — made for the community we serve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="About UmrahPackages.lk"
        description="Sri Lanka's platform for comparing Umrah packages — built to make choosing an agency simple, transparent, and pressure-free."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <div className="container-page py-14">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-brand-navy">Why we built this</h2>
          <p className="mt-4 leading-relaxed text-foreground/85">
            Choosing an Umrah package in Sri Lanka has traditionally meant
            calling around to a handful of agencies, comparing verbal quotes
            from memory, and hoping the one you picked was reputable.
            UmrahPackages.lk puts every detail — price, hotel rating,
            airline, meal plan, and the agency&rsquo;s track record — in one
            place, so you can compare confidently before you ever pick up
            the phone.
          </p>
          <p className="mt-4 leading-relaxed text-foreground/85">
            We are a comparison platform, not a travel agency and not a
            booking engine. We never process payments, and we never take a
            commission on your booking. When you find a package you like,
            you contact the agency directly — the same way you always
            would — just better informed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                <v.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-navy">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-brand-gray/50 p-10 text-center">
          <h2 className="font-display text-xl font-bold text-brand-navy">Have questions?</h2>
          <p className="mt-2 text-muted-foreground">We&rsquo;re happy to help — reach out any time.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
