import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { EmptyState } from "@/components/layout/empty-state";
import { AgencyTable } from "@/components/admin/agency-table";
import { getAllAgenciesForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Agency Management" };

export default async function AdminAgenciesPage() {
  const agencies = await getAllAgenciesForAdmin();

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Agency Management</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy">Agencies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve new agency registrations and manage trust badges.
        </p>
      </div>

      <div className="mt-6">
        {agencies.length === 0 ? (
          <EmptyState title="No agencies yet" description="Agency registrations will appear here for review." />
        ) : (
          <div className="rounded-2xl border border-border/70 bg-white shadow-soft">
            <AgencyTable agencies={agencies} />
          </div>
        )}
      </div>
    </div>
  );
}
