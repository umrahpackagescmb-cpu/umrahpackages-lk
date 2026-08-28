import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";

/**
 * General contact-form submissions (not tied to a specific package/agency).
 * Package-page WhatsApp/phone CTAs never hit this route — this is only for
 * the /contact page's "general enquiry" form.
 *
 * Writes to Supabase's `contact_messages` table (see
 * supabase/migrations/0003_contact_messages.sql) when Supabase is
 * configured; otherwise no-ops so the form still works end-to-end during
 * local development.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        message: parsed.data.message,
      });
    } catch (error) {
      console.error("Failed to store contact submission in Supabase:", error);
      // Don't fail the request over a logging problem — the visitor's
      // message still matters even if we couldn't persist it.
    }
  } else {
    console.log("[contact form — Supabase not configured, logging only]", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
