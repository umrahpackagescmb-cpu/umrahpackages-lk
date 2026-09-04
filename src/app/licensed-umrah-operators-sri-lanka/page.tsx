import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { AgencyCard } from "@/components/cards/agency-card";
import { Button } from "@/components/ui/button";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { getAgencies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Licensed Umrah Operators in Sri Lanka",
  description:
    "How to check whether a Sri Lankan Umrah agency is properly licensed — IATA, SLTDA, and Saudi Hajj Ministry accreditation explained, with agencies that state their credentials.",
  alternates: { canonical: "/licensed-umrah-operators-sri-lanka" },
};

export default async function LicensedUmrahOperatorsPage() {
  const agencies = await getAgencies();
  const accreditationKeywords = ["iata", "caa sri lanka", "sltda", "hajj ministry"];
  const accreditedAgencies = agencies.filter((a) =>
    accreditationKeywords.some((kw) => a.description.toLowerCase().includes(kw)),
  );

  return (
    <>
      <PageHeader
        eyebrow="Verify before you pay"
        title="Licensed Umrah Operators in Sri Lanka"
        description="Umrah fraud usually starts with an unlicensed 'agency' taking payment with no real ability to deliver visas or flights. Here's what a genuine license looks like."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Licensed Umrah Operators" }]}
      />

      <div className="container-page py-12">
        <div className="max-w-3xl">
          <h2 className="font-display text-xl font-bold text-brand-navy">What to actually check</h2>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
            A legitimate Sri Lankan Umrah operator should be able to show a valid travel agency business
            registration, and typically holds one or more of: <strong>IATA accreditation</strong> (International
            Air Transport Association — lets an agency issue flight tickets directly), registration with the{" "}
            <strong>Sri Lanka Tourism Development Authority (SLTDA)</strong>, <strong>Civil Aviation Authority of
            Sri Lanka (CAA)</strong> approval, and in some cases direct approval from the{" "}
            <strong>Saudi Ministry of Hajj and Umrah</strong>. None of these are guaranteed proof of a good
            experience, but their absence — or an agency that gets vague when you ask — is a real warning sign.
            Ask for these credentials directly, in writing, before paying anything.
          </p>
        </div>

        {accreditedAgencies.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-brand-navy">
              Agencies on UmrahPackages.lk that state accreditation
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on credentials each agency has stated in their own profile — always verify directly with the
              agency before booking.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accreditedAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/agencies">Browse all agencies</Link>
          </Button>
        </div>

        <ToolFaq
          heading="Licensed Umrah operators — frequently asked questions"
          items={[
            {
              question: "How do I know if a Sri Lankan Umrah agency is licensed?",
              answer:
                "Ask directly for their IATA number, SLTDA registration, or CAA Sri Lanka approval, and verify it if possible. A genuine agency will provide this without hesitation — reluctance or vague answers are a warning sign.",
            },
            {
              question: "What's the risk of booking with an unlicensed agency?",
              answer:
                "The most common Umrah scams in Sri Lanka involve an unregistered 'agent' collecting payment and then failing to deliver visas, flights, or hotel bookings, sometimes disappearing entirely. Licensing doesn't guarantee a good experience, but its absence is a serious red flag.",
            },
            {
              question: "Does UmrahPackages.lk verify every agency's license?",
              answer:
                "Trust badges like Gold Verified and Premium Partner are only assigned after our team reviews an agency. Agencies without a badge yet may still be legitimate — this page lists what agencies have stated about their own accreditation, which you should independently verify before paying.",
            },
          ]}
        />
      </div>
    </>
  );
}
