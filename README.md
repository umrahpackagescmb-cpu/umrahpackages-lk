# UmrahPackages.lk

Sri Lanka's premium Umrah package comparison platform. **Compare. Choose.
Perform Umrah.** This is not a booking engine — pilgrims compare verified
packages from Sri Lankan travel agencies here, then contact the agency
directly (WhatsApp/phone) to book.

See also: [`PROJECT_LOG.md`](./PROJECT_LOG.md) (what's been built and why),
[`TODO.md`](./TODO.md) (what's next, in priority order), and
[`CHANGELOG.md`](./CHANGELOG.md).

## Tech stack (100% free tier)

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 + hand-built shadcn/ui-style components |
| Animation | Framer Motion |
| Icons | lucide-react |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Backend / DB / Auth / Storage | Supabase (free tier) |
| Deployment | Vercel (free tier) |
| Fonts | Poppins, self-hosted via `@fontsource/poppins` (no Google Fonts network call) |
| Maps | OpenStreetMap (planned — agency location pages) |

Nothing here requires a paid plan. See `.env.example` for the only
configuration needed once a Supabase project exists.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site runs fully on mock data
(`src/lib/mock-data.ts`) until Supabase is connected — see
"Connecting Supabase" below.

## Project structure

```
src/
  app/                  Next.js App Router pages
  components/
    ui/                 Low-level primitives (button, card, input, ...) —
                         hand-built in the shadcn/ui convention (see note below)
    brand/               Logo component (brand-guide compliant)
    layout/              Header, Footer, WhatsApp FAB, mobile nav
    cards/                PackageCard, AgencyCard (reused across pages)
    badges/               Trust badge system (Gold Verified, Featured, ...)
    home/                 Homepage sections
    icons/                Small hand-rolled icons lucide-react doesn't ship
  lib/
    site-config.ts        Brand name/contact/social — single source of truth
    nav-config.ts          Header/footer navigation structure
    mock-data.ts            Placeholder agencies/packages/blog/maulavis
    format.ts                Currency/date formatting
    supabase/                 Browser/server/admin Supabase clients
  types/domain.ts             Shared domain types (Agency, Package, ...)
public/
  brand/                Logo + brand guide source images, generated OG image
  placeholders/          Locally generated placeholder photos/logos (mock data only)
supabase/
  migrations/            Full SQL schema + RLS policies
  seed.sql                Seed data matching src/lib/mock-data.ts
```

### Why hand-built UI primitives instead of `npx shadcn add`?

The shadcn CLI fetches component source from `ui.shadcn.com` at
install/build time. In some sandboxed/firewalled environments that host
isn't reachable. The components in `src/components/ui/` are written in the
exact same convention (Radix primitives + `class-variance-authority` +
`cn()`) so `npx shadcn add <component>` will still work normally for adding
*new* components once you're on a network that can reach it — it just
won't overwrite what's already here unless you tell it to.

### Brand system

Colors, typography and the logo mark come from
`public/brand/brand-guidelines-sheet.png` (the source of truth — never
redesign it). Exact tokens live in `src/app/globals.css`:

- Deep Navy `#0D1B2A`, Gold `#C8A24A`, Light Gray `#F2F2F2`, White `#FFFFFF`
- Typography: Poppins throughout

The wordmark ("UmrahPackages.lk") is set in real text (Poppins, brand
colors) rather than a raster image, so it stays crisp and stays readable to
screen readers/SEO — see `src/components/brand/logo.tsx` for the reasoning.
The Kaaba/arch/crescent icon is the actual graphic mark, cropped from the
uploaded logo file — never redrawn.

## Connecting Supabase

The app runs on `src/lib/mock-data.ts` until this is done. See
[`supabase/README.md`](./supabase/README.md) for the full walkthrough:
create a free Supabase project, run the two migration files, optionally run
the seed, then fill in `.env.local` from `.env.example`.

## Business rules that shape the code

- **Comparison platform, not a booking engine.** There is no payment flow.
  "Book" always means "contact the agency" (WhatsApp/phone/email).
- **Agency accounts start disabled.** `agencies.is_active = false` by
  default — an admin flips it on after manual vetting. The full agency
  dashboard is built regardless, so enabling an account requires zero new
  code (see `supabase/README.md` → "Enabling an agency account").
- **Trust badges are Super-Admin-only.** Enforced in the database via RLS
  (`agency_badges` table), not just in the UI.
- **Role system**: `super_admin`, `admin`, `content_manager`,
  `travel_agency`, `moderator`, `editor` — see
  `supabase/migrations/0002_rls_policies.sql`.

## Scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint
```

## Deployment

Deploy to Vercel's free tier (see `TODO.md` for the remaining pre-launch
checklist — env vars, Supabase project, domain DNS).
