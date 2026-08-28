# Supabase setup

This directory holds the full database schema as plain SQL migrations, so it
can be applied whenever a real Supabase project exists — no code changes
required.

## One-time setup (free tier)

1. Create a free project at supabase.com.
2. In the SQL Editor, run the migrations in order:
   - `migrations/0001_init_schema.sql`
   - `migrations/0002_rls_policies.sql`
3. Optionally run `seed.sql` to load the same placeholder agencies/packages
   used by `src/lib/mock-data.ts`, so the live site matches local dev.
4. Copy the project's URL and anon key into `.env.local` (see
   `.env.example` in the project root).
5. In Storage, create two public buckets: `package-images` and `brochures`,
   plus an `agency-logos` bucket. Update `next.config.ts`'s
   `images.remotePatterns` if your project ref changes (it's wildcarded to
   `*.supabase.co` already, so this is usually a no-op).

## Or with the Supabase CLI

```bash
supabase link --project-ref <your-project-ref>
supabase db push       # applies migrations/
supabase db reset      # local dev only: migrations/ + seed.sql
```

## Enabling an agency account

Agencies are created with `agencies.is_active = false` by design (see the
project brief — accounts start disabled until manually vetted). To enable
one:

```sql
update agencies set is_active = true where slug = 'the-agency-slug';
```

Do this from the Supabase dashboard or the admin app's service-role route —
never exposed to the client, and RLS explicitly disallows an agency from
flipping its own `is_active` (see `0002_rls_policies.sql`).

## Role system

`profiles.role` is one of `super_admin`, `admin`, `content_manager`,
`travel_agency`, `moderator`, `editor`. Every new signup gets a `profiles`
row automatically (see the `handle_new_user` trigger) defaulting to
`travel_agency` with no linked agency — a super admin links `agency_id` and
flips the agency's `is_active` once it's approved.
