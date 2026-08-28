import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { PackageTable } from "@/components/admin/package-table";
import { getAllPackagesForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Package Management" };

export default async function AdminPackagesPage() {
  const packages = await getAllPackagesForAdmin();

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Package Management</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy">Packages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review every Umrah package across agencies — feature, publish, or remove listings.
        </p>
      </div>

      <div className="mt-6">
        <PackageTable packages={packages} />
      </div>
    </div>
  );
}
