import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Standard @supabase/ssr middleware pattern: refreshes the auth session on
 * every request (so server components always see a valid cookie) and
 * gate-keeps the two role-protected areas of the app, /admin and /agency.
 *
 * Deliberately only checks "is someone signed in" here — which *role* they
 * have (super_admin vs travel_agency, etc.) is checked again in
 * src/app/admin/layout.tsx and src/app/agency/layout.tsx, since that needs
 * a `profiles` row lookup and middleware should stay cheap and fast.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase isn't configured yet in this environment (local dev before a
  // real project exists) — don't block navigation, just pass through.
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: getUser() (not getSession()) — this revalidates the token
  // against Supabase Auth rather than trusting an unverified cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith("/admin") || path.startsWith("/agency");

  if (isProtected && !user) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
