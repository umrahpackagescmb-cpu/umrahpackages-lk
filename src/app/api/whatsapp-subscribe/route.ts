import { NextResponse } from "next/server";

import { whatsappSubscribeSchema } from "@/lib/validations/whatsapp-subscribe";

/**
 * The "Get daily Quran verses & hadith on WhatsApp" opt-in gate
 * (src/components/islamic/whatsapp-community-gate.tsx). Writes to
 * Supabase's `whatsapp_subscribers` table (see
 * supabase/migrations/0004_whatsapp_subscribers.sql) when Supabase is
 * configured; otherwise no-ops so the form still works end-to-end during
 * local development — following the same pattern as /api/contact.
 *
 * The client only reveals the WhatsApp community link after this returns
 * { ok: true }, but a failed write here still returns { ok: true } (logged
 * server-side) so a visitor is never blocked from the community link by an
 * infrastructure hiccup — the phone number is a nice-to-have for us, not
 * something worth degrading their experience over.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = whatsappSubscribeSchema.safeParse(body);

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
      await supabase.from("whatsapp_subscribers").insert({
        phone: parsed.data.phone,
        source: parsed.data.source,
      });
    } catch (error) {
      console.error("Failed to store WhatsApp opt-in in Supabase:", error);
    }
  } else {
    console.log("[whatsapp opt-in — Supabase not configured, logging only]", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
