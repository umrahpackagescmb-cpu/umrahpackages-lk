import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { InquiriesTable } from "@/components/admin/inquiries-table";
import { getInquiries } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Inquiries" };

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Lead Management</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every WhatsApp, phone, email, and contact-form lead across all agencies.
        </p>
      </div>

      <div className="mt-6">
        <InquiriesTable inquiries={inquiries} />
      </div>
    </div>
  );
}
