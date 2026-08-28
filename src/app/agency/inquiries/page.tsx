import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { AgencyInquiriesTable } from "@/components/agency/agency-inquiries-table";
import { getInquiries } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Inquiries" };

export default async function AgencyInquiriesPage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const inquiries = await getInquiries({ agencyId });

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Every WhatsApp, phone, email, and contact-form lead for your agency.
        </p>
      </div>

      <div className="mt-6">
        <AgencyInquiriesTable inquiries={inquiries} />
      </div>
    </div>
  );
}
