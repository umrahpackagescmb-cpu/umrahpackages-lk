import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { AgencyProfileForm } from "@/components/agency/agency-profile-form";
import { getAgencyById } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Profile" };

export default async function AgencyProfilePage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const agency = await getAgencyById(agencyId);

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Keep your agency details up to date — this is what pilgrims see.
        </p>
      </div>

      <div className="mt-6">
        {agency ? (
          <AgencyProfileForm agency={agency} agencyId={agencyId} />
        ) : (
          <p className="text-sm text-muted-foreground">Agency not found.</p>
        )}
      </div>
    </div>
  );
}
