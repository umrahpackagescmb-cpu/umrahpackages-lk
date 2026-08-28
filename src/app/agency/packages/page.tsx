import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { Button } from "@/components/ui/button";
import { PackageList } from "@/components/agency/package-list";
import { getAllPackagesForAdmin } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "My Packages" };

export default async function AgencyPackagesPage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const packages = await getAllPackagesForAdmin(agencyId);

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Packages</h1>
          <p className="text-sm text-muted-foreground">Manage the Umrah packages your agency lists.</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/agency/packages/new">
            <Plus /> Add Package
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <PackageList packages={packages} />
      </div>
    </div>
  );
}
