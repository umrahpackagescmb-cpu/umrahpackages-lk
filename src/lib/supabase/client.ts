import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/supabase/database.types";

/**
 * Browser-side Supabase client. Safe to call from Client Components — uses
 * the public anon key, which RLS (see /supabase/migrations) keeps scoped to
 * whatever the signed-in user's role allows.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
