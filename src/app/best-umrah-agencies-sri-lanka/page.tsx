import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { AgencyCard } from "@/components/cards/agency-card";
import { Button } from "@/components/ui/button";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getAgencies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Umrah Agencies & Operators in Sri Lanka",
  description:
    "How to choose the best Umrah agency or operator in Sri Lanka — what to compare, questions to ask, and the agencies currently listed on UmrahPackages.lk.",
  alternates: { canonical: "/best-umrah-agencies-sri-lanka" },
};

export default async function BestUmrahAgenciesPage() {
  const agencies = await getAgencies({ sort: "packages" });

  return (
    <>
      <PageHeader
        eyebrow="How to choose well"
        title="Best Umrah Agencies & Operators in Sri Lanka"
        description="There's no single 'best' agency for everyone — the right one depends on your budget, group size, and dates. Here's how to compare properly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Best Umrah Agencies" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <p className="text-sm text-foreground/80 leading-relaxed">
            Rather than chasing a single &ldquo;best&rdquo; ranking — which is easy to fake with paid reviews — compare
            agencies on things you can actually verify: how long they&rsquo;ve been operating, whether they state real
            licensing/accreditation (see our{" "}
            <Link href="/licensed-umrah-operators-sri-lanka" className="text-brand-navy underline underline-offset-2">
              Licensed Umrah Operators guide
            </Link>
            ), how many packages and price tiers they currently offer, and how clearly they answer questions on
            WhatsApp before you&rsquo;ve paid anything. We deliberately don&rsquo;t publish star ratings for agencies unless
            they&rsquo;re backed by real, verified reviews — an unearned rating number is easy to fabricate and doesn&rsquo;t
            tell you anything useful.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Umrah agencies currently listed on UmrahPackages.lk
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/agencies">Filter by city</Link>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </div>

        <ToolFaq
          heading="Choosing an Umrah agency — frequently asked questions"
          items={[
            {
              question: "How do I pick the best Umrah agency for me?",
              answer:
                "Compare package inclusions (hotel distance, meal plan, group size), confirm licensing/accreditation directly, and check how responsive the agency is to your questions before you pay — not just the headline price.",
            },
            {
              question: "Should I trust star ratings when comparing agencies?",
              answer:
                "Only if they're backed by real, verifiable reviews. UmrahPackages.lk doesn't display a rating for an agency until there's real review data behind it, rather than showing an invented number.",
            },
            {
              question: "What's the difference between an Umrah agency and an operator?",
              answer:
                "The terms are generally used interchangeably in Sri Lanka for a business that arranges Umrah visas, flights, and accommodation. Some larger operators also handle Hajj; check with the specific agency for their full range of services.",
            },
          ]}
        />
      </div>
    </>
  );
}
