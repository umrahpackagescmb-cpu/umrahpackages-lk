import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PackageForm } from "@/components/agency/package-form";
import { getAllPackagesForAdmin } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile } from "@/lib/auth/session";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;
  const packages = await getAllPackagesForAdmin(agencyId);
  const pkg = packages.find((p) => p.id === id);
  return { title: pkg ? pkg.title : "Edit Package" };
}

export default async function EditAgencyPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const packages = await getAllPackagesForAdmin(agencyId);
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Edit Package</h1>
          <p className="text-sm text-muted-foreground">Update the details for &ldquo;{pkg.title}&rdquo;.</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/agency/packages">
            <ArrowLeft /> Back to Packages
          </Link>
        </Button>
      </div>

      <div className="mt-6">
        <PackageForm agencyId={agencyId} pkg={pkg} />
      </div>
    </div>
  );
}
