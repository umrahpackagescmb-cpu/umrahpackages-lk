import { NextResponse } from "next/server";
import { z } from "zod";

import { agencySignUpSchema } from "@/lib/validations/auth";

/**
 * Second step of agency self-registration. The client first calls
 * `supabase.auth.signUp()` directly (creating the auth user, which the
 * `handle_new_user` trigger turns into a `profiles` row with the default
 * role of `travel_agency`). It then calls this route with the new user's
 * id and the agency details collected on the same form.
 *
 * Why this needs the service-role client: RLS intentionally has no policy
 * letting a plain `travel_agency` user INSERT into `agencies` or set their
 * own `profiles.agency_id` — only admin/content_manager can create
 * agencies (see supabase/migrations/0002_rls_policies.sql). That's exactly
 * right for day-to-day use, but self-registration needs *someone* to
 * create the (inactive) agency row on the new user's behalf. This route is
 * that narrow, server-only exception — see src/lib/supabase/server.ts's
 * createAdminClient() docs.
 *
 * Defense in depth: we only ever act on a profile that (a) exists, (b) has
 * role = 'travel_agency', and (c) doesn't already have an agency_id — so
 * this can't be used to hijack an existing agency or escalate a role.
 */
const bodySchema = agencySignUpSchema
  .omit({ password: true, company: true })
  .extend({ userId: z.string().uuid() });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase is not configured on this deployment yet." },
      { status: 503 },
    );
  }

  const { userId, agencyName, city, phone, whatsapp, description, email } = parsed.data;

  try {
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = createAdminClient();

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, agency_id")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Could not find your account. Please try signing up again." }, { status: 404 });
    }
    if (profile.role !== "travel_agency") {
      return NextResponse.json({ error: "This account type can't register an agency." }, { status: 403 });
    }
    if (profile.agency_id) {
      return NextResponse.json({ error: "This account is already linked to an agency." }, { status: 409 });
    }

    const slug = agencyName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60);

    const { data: agency, error: agencyError } = await supabase
      .from("agencies")
      .insert({
        slug: `${slug}-${userId.slice(0, 6)}`,
        name: agencyName,
        description,
        city,
        phone,
        whatsapp: whatsapp.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
        email,
        is_active: false,
      })
      .select("id")
      .single();

    if (agencyError || !agency) {
      console.error("Failed to create agency during signup:", agencyError);
      return NextResponse.json({ error: "Couldn't create your agency profile. Please contact us." }, { status: 500 });
    }

    const { error: linkError } = await supabase
      .from("profiles")
      .update({ agency_id: agency.id, full_name: agencyName })
      .eq("id", userId);

    if (linkError) {
      console.error("Failed to link profile to new agency:", linkError);
      return NextResponse.json({ error: "Couldn't finish setting up your account. Please contact us." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, agencyId: agency.id });
  } catch (error) {
    console.error("Agency signup route failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
