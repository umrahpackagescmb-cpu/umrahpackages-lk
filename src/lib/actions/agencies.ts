"use server";

import { isSupabaseConfigured } from "@/lib/auth/session";
import type { TrustBadgeType } from "@/types/domain";

export interface ActionResult {
  ok: boolean;
  demo?: boolean;
  error?: string;
}

/** Admin/content_manager only — RLS enforces this server-side too (see
 * supabase/migrations/0002_rls_policies.sql, "agencies: admin/content_manager
 * manage all"). In demo mode (no Supabase project connected yet) this is a
 * no-op that reports back `demo: true` so the calling UI can update its own
 * local state instead, purely for click-through purposes. */
export async function setAgencyActive(agencyId: string, isActive: boolean): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("agencies").update({ is_active: isActive }).eq("id", agencyId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("setAgencyActive failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function setAgencyBadges(agencyId: string, badges: TrustBadgeType[]): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    // Trust badges are their own join table (agency_badges) per the
    // schema — replace the full set for simplicity, matching "assignable
    // only by Super Admin" from the brief (also enforced by RLS).
    const { error: deleteError } = await supabase.from("agency_badges").delete().eq("agency_id", agencyId);
    if (deleteError) return { ok: false, error: deleteError.message };

    if (badges.length > 0) {
      const { error: insertError } = await supabase
        .from("agency_badges")
        .insert(badges.map((badge) => ({ agency_id: agencyId, badge })));
      if (insertError) return { ok: false, error: insertError.message };
    }

    return { ok: true };
  } catch (error) {
    console.error("setAgencyBadges failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export interface AgencyProfileInput {
  name: string;
  description: string;
  city: string;
  address?: string;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
}

/** Agency-only — updates the caller's own agency profile. RLS ("agencies:
 * owner updates own profile") deliberately excludes `is_active`, so an
 * agency can polish its profile freely without being able to self-approve. */
export async function updateAgencyProfile(agencyId: string, input: AgencyProfileInput): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase
      .from("agencies")
      .update({
        name: input.name,
        description: input.description,
        city: input.city,
        address: input.address || null,
        phone: input.phone,
        whatsapp: input.whatsapp,
        email: input.email,
        website: input.website || null,
      })
      .eq("id", agencyId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("updateAgencyProfile failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
