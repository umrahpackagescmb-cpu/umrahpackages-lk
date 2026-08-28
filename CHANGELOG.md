# Changelog

All notable changes to this project. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Umrah journey tools expansion (18 new tools/guides under `/islamic-tools/*`,
  bringing the suite to 30 total):
  - Currency Converter (LKR/SAR/USD, live daily rates).
  - Step-by-Step Umrah Guide — the full 9-step ritual sequence with Arabic
    duas, transliteration/translation, tips, printable, progress saved on
    device, `HowToSchema` JSON-LD.
  - Audio Learning Mode for the Umrah Guide — free client-side text-to-speech
    (Web Speech API), English only.
  - Tamil and Sinhala translations for the Umrah Guide, with a review-needed
    notice shown for non-English languages.
  - 11-page SEO guide wave: Ihram Rules & Restrictions, Best Time & Crowd
    Guide, Umrah Visa Guide, Pre-Departure Checklist, Saudi Travel Tips,
    Hotels Near the Haram, Ziyarah Guide, Halal Food Guide, Saudi Transport
    Guide, Saudi SIM & WiFi Guide, Makkah/Madinah Shopping Guide.
  - Masjid al-Haram Facilities Guide — an honest general-orientation
    alternative to a pinpoint interactive map (no verified geodata source
    exists for one).
  - 360° Holy Places Explorer — curated links to real external 360°/
    panoramic resources.
  - Offline Umrah Guide PDF — free downloadable, brand-accurate PDF generated
    from the site's live data (Umrah Guide, Ihram Rules, Packing Checklist,
    Pre-Departure Checklist).
- Full Islamic Names database (1,013 real names, no fabricated/padded
  entries) with a filterable `/islamic-names` hub (starting letter, gender,
  length, origin, search) and a statically-generated `/islamic-names/[slug]`
  detail page per name — replaces the old 50-name widget, which now
  redirects here. Included in `sitemap.ts`.
- Site-wide liability disclaimer (footer, package/agency contact cards)
  making clear UmrahPackages.lk only lists agencies and isn't responsible
  for their transactions or service quality.
- WhatsApp Community opt-in gate on the Daily Quran Verse and Daily Hadith
  pages — consent-gated phone capture (`whatsapp_subscribers` table,
  migration `0004`) that reveals the Community invite link on submit.
- SEO pass across all Islamic Tools pages: keyword-aware metadata, an FAQ +
  FAQPage-schema block and a related-tools internal-linking block on every
  page.
- Islamic Tools suite (12 tools): Prayer Times, Qibla Finder, Hijri
  Calendar/Converter, Ramadan/Hajj Countdowns, Daily Quran Verse/Hadith/Dua,
  Tasbih Counter, Zakat Calculator, Islamic Names directory.
- Blog and Maulavi Directory (list + detail pages, JSON-LD Article schema).
- SEO infrastructure: `sitemap.ts`, `robots.ts`, JSON-LD across the site
  (Organization/WebSite/TravelAgency/Product/FAQPage/Article/
  BreadcrumbList — the last now automatic on every page using
  `<PageHeader breadcrumbs>`), explicit canonical URLs on dynamic routes.
- Auth: Supabase Auth sign-in/sign-up, `src/proxy.ts` route protection,
  role-aware `/admin` and `/agency` layouts, a demo-mode fallback so both
  dashboards are fully browsable before a real Supabase project exists.
- Admin Dashboard: agency approval + trust badges, package moderation, a
  blog CMS, an inquiries inbox, a role/permissions reference page.
- Agency Dashboard: package CRUD, an inquiries inbox, an analytics view,
  a profile editor.
- Automation engine: trending packages wired into a homepage section;
  similar-packages on the package detail page; basic auto-tagging on
  package save (`src/lib/auto-tag.ts`).
- Project scaffold: Next.js 16, React 19, TypeScript, Tailwind CSS v4.
- Brand system: exact color/typography tokens from the brand guide,
  processed logo assets (transparent PNG, icon crop, favicons, OG image).
- Hand-built UI primitive library (`src/components/ui/`) in the shadcn/ui
  convention: Button, Card, Badge, Input, Textarea, Label, Separator,
  Accordion, Sheet.
- Self-hosted Poppins via `@fontsource/poppins`.
- Site layout: Header (with dropdown nav + mobile sheet menu), Footer,
  floating WhatsApp button.
- Trust badge system (Gold Verified, Featured, Premium Partner,
  Recommended, New Agency) as reusable components.
- Home page: hero, trust strip, featured packages, how-it-works, featured
  agencies, Islamic tools teaser, blog teaser, agency sign-up CTA.
- Domain types (`src/types/domain.ts`) and mock data
  (`src/lib/mock-data.ts`) for building UI ahead of a live database.
- Full Supabase schema: `profiles`/role system, `agencies`, `agency_badges`
  (trust system), `packages`, `package_images`, `package_brochures`,
  `tags`/`package_tags`, `inquiries`, `blog_posts`, `maulavis`,
  `analytics_events` — with complete row-level-security policies matching
  the role system and the "agency accounts start disabled" rule.
- Supabase seed data mirroring the mock data.
- Supabase client scaffolding (browser/server/admin) — not yet wired to UI.
- Project documentation: README, PROJECT_LOG, TODO, this changelog.

### Fixed

- Agency-submitted package tags were silently dropped on save (the form
  field existed, the DB write never used it).
- `getFeaturedPackages()`/`getTrendingPackages()`/etc. could surface draft
  packages or packages from inactive agencies — now scoped to the same
  public-visibility rule as the main package listing.
- A handful of accessibility issues found by a full Lighthouse sweep: icon-
  only `Select` triggers with no accessible name, a logo `aria-label` that
  didn't cover its full visible content, an invalid `<dl>` structure on the
  package spec table, and heading-order skips on four listing pages. See
  `PROJECT_LOG.md`'s 2026-08-23 entry for the full list.

[Unreleased]: https://github.com/
