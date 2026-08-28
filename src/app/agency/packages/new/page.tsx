import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/agency/package-form";
import { DEMO_AGENCY_PROFILE, getSessionProfile } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Add Package" };

export default async function NewAgencyPackagePage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Add Package</h1>
          <p className="text-sm text-muted-foreground">Create a new Umrah package listing for your agency.</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/agency/packages">
            <ArrowLeft /> Back to Packages
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <PackageForm agencyId={agencyId} />
      </div>
    </div>
  );
}
