import { cache } from "react";

import type { UserRole } from "@/types/domain";

export const STAFF_ROLES: UserRole[] = ["super_admin", "admin", "content_manager", "moderator", "editor"];

export interface SessionProfile {
  id: string;
  role: UserRole;
  fullName: string | null;
  agencyId: string | null;
  email: string | null;
}

/** True once a real Supabase project is connected (see .env.example). Until
 * then, the two dashboards render in "demo mode" against mock data instead
 * of redirecting to a sign-in page that can't actually authenticate anyone
 * yet — see DEMO_ADMIN_PROFILE / DEMO_AGENCY_PROFILE below. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Server-only: resolves the signed-in user's profile (role + agency link),
 * or null if nobody is signed in / Supabase isn't configured yet. Wrapped in
 * React's `cache()` so the layout and page calling this for the same
 * request share one lookup instead of hitting Supabase twice. */
export const getSessionProfile = cache(async (): Promise<SessionProfile | null> => {
  if (!isSupabaseConfigured()) return null;

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, agency_id")
    .eq("id", user.id)
    .single();
  if (!profile) return null;

  return {
    id: user.id,
    role: profile.role as UserRole,
    fullName: profile.full_name as string | null,
    agencyId: profile.agency_id as string | null,
    email: user.email ?? null,
  };
});

/** Demo-mode stand-ins so the Admin and Agency dashboards are fully
 * click-through-able in this environment before a real Supabase project
 * (and real logins) exist. Once NEXT_PUBLIC_SUPABASE_URL is set, these are
 * never used — see admin/layout.tsx and agency/layout.tsx. */
export const DEMO_ADMIN_PROFILE: SessionProfile = {
  id: "demo-admin",
  role: "super_admin",
  fullName: "Demo Admin",
  agencyId: null,
  email: "demo-admin@umrahpackages.lk",
};

export const DEMO_AGENCY_PROFILE: SessionProfile = {
  id: "demo-agency-user",
  role: "travel_agency",
  fullName: "Al-Safa Travels & Tours",
  agencyId: "a1",
  email: "agency@alsafatravels.lk",
};
