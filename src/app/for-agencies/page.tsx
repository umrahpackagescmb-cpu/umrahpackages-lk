import type { Metadata } from "next";
import Link from "next/link";
import { Check, TrendingUp, MessageSquare, BarChart3, Upload } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For Travel Agencies",
  description:
    "List your Umrah packages on UmrahPackages.lk for free. Reach pilgrims across Sri Lanka comparing packages before they book.",
  alternates: { canonical: "/for-agencies" },
};

const features = [
  { icon: Upload, title: "List unlimited packages", description: "Add, edit, and update your Umrah packages any time — no per-listing fees." },
  { icon: MessageSquare, title: "Inquiries land in your dashboard", description: "Every WhatsApp click and contact-form submission is tracked in one inbox." },
  { icon: BarChart3, title: "See what's working", description: "Views, clicks, comparisons, and contacts per package — know what pilgrims respond to." },
  { icon: TrendingUp, title: "Earn trust badges", description: "Gold Verified, Featured, and Premium Partner badges build credibility with pilgrims." },
];

const steps = [
  "Register your agency online — takes about two minutes",
  "We review and verify your agency (business registration, contact info)",
  "Your account is enabled — add your packages, photos, and brochures",
  "Start receiving inquiries directly from pilgrims",
];

export default function ForAgenciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free to list, forever"
        title="Grow Your Umrah Business"
        description="Join Sri Lanka's Umrah package comparison platform — reach pilgrims actively comparing packages, with zero listing fees and zero booking commission."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For Agencies" }]}
      />

      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.title} className="flex-row items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                <f.icon className="size-5" />
              </div>
              <div>
                {/* h2: this is the first heading-level section under the
                 * page's h1, ahead of "How it works" below. */}
                <h2 className="font-display font-semibold text-brand-navy">{f.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy">How it works</h2>
            <ol className="mt-6 flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-navy">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm text-foreground/85">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-brand-navy p-10 text-white">
            <h3 className="font-display text-xl font-bold">What&rsquo;s always free</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                "Unlimited package listings",
                "Package photos & brochure uploads",
                "Inquiry inbox & basic analytics",
                "No commission on bookings, ever",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                  <Check className="size-4 shrink-0 text-brand-gold" /> {item}
                </li>
              ))}
            </ul>
            <Button variant="gold" size="lg" asChild className="mt-8 w-full">
              <Link href="/sign-up">Register Your Agency</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-white/60">
              Prefer email? Write to us at{" "}
              <Link href={`mailto:${siteConfig.contact.email}?subject=Agency Registration`} className="underline hover:text-white">
                {siteConfig.contact.email}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
