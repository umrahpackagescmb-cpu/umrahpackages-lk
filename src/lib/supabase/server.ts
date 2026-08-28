import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

/**
 * Server-side Supabase client for Server Components, Route Handlers, and
 * Server Actions — reads/writes auth cookies via `next/headers`. Still
 * scoped by RLS (uses the anon key + the caller's session), not the
 * service-role key.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — safe to ignore when
            // middleware is also refreshing the session (see middleware.ts).
          }
        },
      },
    },
  );
}

/**
 * Admin client using the service-role key — bypasses RLS entirely. Only
 * ever import this in server-only code (Route Handlers / Server Actions)
 * that explicitly needs to act outside a user's own permissions, e.g.
 * enabling an agency account. Never send this key to the browser.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("createAdminClient() must never be called from the browser.");
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
