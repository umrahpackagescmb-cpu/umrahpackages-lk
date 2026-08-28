# Project Log

Running log of what's been built, key decisions, and why. Newest entries at
the top. Read this before continuing work in a new session — it's the
fastest way to get back up to speed.

---

## 2026-08-24 — Umrah journey tools expansion: 18 new tools/guides, PDF, audio, translations

**Context:** Follow-up request continuing the "complete all, then launch"
autonomous mode — a detailed "mandatory" feature list covering an offline
PDF guide, audio learning, multilingual support, and a wave of practical
Umrah/Saudi travel guides. Mid-session the user corrected the scope: **"all
above comes under tools"** — every new feature had to live under the
existing `/islamic-tools/*` prefix and the "Islamic Tools" nav section,
never a separate top-level section. That correction shaped everything
below.

**Honesty-over-compliance tradeoffs, decided and applied rather than asked
about, matching the pattern set in the 2026-08-23 entry:**
1. A literal "Live Haram Crowd Meter" would require real-time crowd data
   that has no publicly available source — built the honest version
   instead: a "Best Time & Crowd Guide" with an explicit banner stating
   it is not a live meter, using general seasonal patterns (Ramadan,
   post-Hajj, winter/summer) instead of fabricated live numbers.
2. A literal "Interactive Haram Map" would require pin-accurate facility
   coordinates with no verified official geodata source — built the
   Masjid al-Haram Facilities Guide instead: a general orientation guide
   (gates, Zamzam stations, accessibility, floors) with an explicit
   in-page explanation of why there's no pinpoint map, rather than
   fabricating coordinates.
3. A "360° Haram Explorer" that actually hosted or embedded unverified
   panoramic/video content would risk both fabrication and copyright
   issues — built a curated link-out page to real, well-known, freely
   linkable external resources (Google Arts & Culture, 360Cities.net)
   instead.
4. SIM/transport/food/shopping guides use general, caveated price ranges
   and stable real facts (e.g. the three main Saudi operators, that Uber
   and Careem operate there) rather than fabricated exact current prices
   that would go stale immediately.

**What was built:**
1. **Currency Converter** (`/islamic-tools/currency-converter`) —
   LKR/SAR/USD live daily rates, with a tested graceful error state (the
   rate CDN isn't reachable from this dev sandbox — real browsers will
   reach it directly) and a working "Try Again" retry.
2. **Step-by-Step Umrah Guide** (`/islamic-tools/umrah-guide`) — all 9
   rites from Ihram preparation through Halq/Taqsir, each with details,
   an optional tip, and (for 4 steps) the Arabic dua with transliteration
   and translation; printable, per-device progress saved to
   `localStorage`, `HowToSchema` JSON-LD. Built out over three follow-on
   passes into the same page/widget:
   - **Audio Learning Mode** — a reusable `useTextToSpeech()` hook
     (`src/lib/islamic/use-speech.ts`) around the free, keyless
     `window.speechSynthesis` API; deliberately English-only (a
     non-English voice would mispronounce Tamil/Sinhala/Arabic).
   - **Tamil & Sinhala translations** — `umrah-guide-translations.ts`,
     full per-step translations for both languages with Islamic technical
     terms (Ihram, Tawaf, Sa'i, Talbiyah, etc.) kept as transliterated
     loanwords rather than translated, matching real Tamil/Sinhala Islamic
     literature convention; a visible "needs native-speaker/scholarly
     review" notice shows whenever a non-English language is active. A
     genuine content gap (missing Talbiyah `duaMeaning` in both languages)
     was caught via visual Playwright QA, not type-checking, and fixed.
3. **11-page SEO guide wave** (parallel-agent-built, then individually
   re-verified): Ihram Rules & Restrictions, Best Time & Crowd Guide,
   Umrah Visa Guide, Pre-Departure Checklist (interactive/printable),
   Saudi Travel Tips, Hotels Near the Haram, Ziyarah Guide, Halal Food
   Guide, Saudi Transport Guide, Saudi SIM & WiFi Guide, Makkah/Madinah
   Shopping Guide — each with `ToolFaq` + `RelatedTools`. Deliberately did
   not add separate Cost/Packing/First-Time guide pages since the Budget
   Calculator, Packing Checklist and Step-by-Step Guide already cover that
   ground.
4. **Masjid al-Haram Facilities Guide** and **360° Holy Places Explorer** —
   see the honesty tradeoffs above.
5. **Offline Umrah Guide PDF** (`/islamic-tools/offline-pdf-guide`) — a
   free, brand-accurate 10-page PDF (reportlab + pypdf, real Poppins TTF
   fonts, `arabic-reshaper`/`python-bidi` + FreeSerif for correctly-shaped
   Arabic dua text) combining the Umrah Guide, Ihram Rules, Packing
   Checklist and Pre-Departure Checklist. Content is extracted from the
   live TypeScript data modules via a small script
   (`scripts/extract-pdf-content.ts`) rather than hand-transcribed, so the
   PDF can't silently drift out of sync with the site. The navy/gold logo
   sits inside a white card on the cover rather than directly on navy, to
   keep it legible without altering the locked brand colors.

**Verified:** every page/feature individually passed `npx tsc --noEmit`,
`npm run lint`, and `npm run build` before committing, plus a Playwright
screenshot pass (including a dedicated pass in Tamil and Sinhala for the
guide, and a rendered-PNG check of the generated PDF). `tools-list.ts` and
`sitemap.ts` updated incrementally after each wave. Islamic Tools suite is
now 30 tools total (up from 12); the `/islamic-tools` hub's metadata
description was corrected from "27" to "30" to match.

**What's left:** same as before — only the Pre-launch checklist (real
accounts, DNS, Search Console, GA4, and the WhatsApp Community link).

---

## 2026-08-23 — Liability disclaimer, WhatsApp opt-in, full Islamic Names database, SEO sweep

**Context:** Follow-up request after the full build-out below: (1) a clear
liability disclaimer that UmrahPackages.lk only lists agencies and isn't
responsible for their transactions/services, (2) a much larger, SEO-focused
Islamic Names section, (3) a phone-number-gated WhatsApp Community reveal on
the Daily Quran Verse / Daily Hadith pages, (4) a strong SEO pass across all
Islamic Tools pages and the new Names section.

**Two honest tradeoffs, decided and applied rather than asked about (per the
"complete all, then launch" standing instruction):**
1. The request literally said "100,000 names." Fabricating that many
   distinct real Islamic names is impossible without inventing meaningless
   duplicates or placeholder entries — which is exactly the kind of thin,
   auto-generated content Google's Helpful Content/Spam policies penalize,
   working *against* the SEO goal the request was actually after. Built the
   real version of the underlying goal instead: 1,013 genuinely
   individually-checked names (compiled across six parallel research
   passes covering different letter ranges, then deduped against each
   other and the old 50-name list), each with its own statically-generated,
   indexable detail page — long-tail SEO from real content, not a padded
   count.
2. "We should be #1 in any country" isn't something any SEO work can
   guarantee — ranking also depends on domain age, backlinks, and
   competition once the site is actually live and indexed, none of which
   is in this session's control. What *is* controllable was done in full:
   keyword-aware metadata, FAQ schema, content depth, and internal linking
   across every Islamic Tools page and the new Names section.

**What was built:**
1. **Liability disclaimer** — a full paragraph in the footer (site-wide),
   plus shorter reinforcing notes on the package contact card and the
   agency profile contact card, all linking to the existing `/terms` page
   for the full legal language.
2. **WhatsApp Community opt-in gate** (`WhatsAppCommunityGate`) — phone
   number + a required (not pre-checked) consent checkbox, per WhatsApp's
   own Business Messaging Policy. Submits to `/api/whatsapp-subscribe`
   (mirrors the existing `/api/contact` demo-mode pattern exactly) →
   `whatsapp_subscribers` table (migration `0004_whatsapp_subscribers.sql`,
   RLS: public can insert, only staff can read, plus a `consented_at`
   audit-trail column for Sri Lanka's PDPA) → reveals the Community invite
   link. Copy is explicit and honestly kept: it's a Community not a group,
   numbers aren't shared, updates are daily. `siteConfig.links.
   whatsappCommunity` is a placeholder — needs the real invite link before
   launch (flagged in `TODO.md`'s pre-launch checklist).
3. **Full Islamic Names database** — replaced the old 50-name
   `NamesWidget` with `src/lib/islamic/names-data.ts` (1,013 names) and
   `names-query.ts` (filter/search/similar-names helpers). New
   `/islamic-names` hub: search box, starting-letter pills (A-Z, only
   letters actually present), gender/length/origin filters, all
   URL-driven (so every filter combination is a crawlable, shareable
   link), paginated grid, an "About this directory" SEO section, and an
   FAQ block with FAQPage schema. New `/islamic-names/[slug]` — one
   statically-generated page per name (`generateStaticParams` over all
   1,013 entries) with meaning, origin, letter count, a "similar names"
   section, DefinedTerm + BreadcrumbList JSON-LD, and a soft CTA back to
   `/packages`. The old `/islamic-tools/islamic-names` URL now
   permanently redirects to `/islamic-names` rather than leaving two pages
   to compete for the same search intent. Nav (header dropdown + footer)
   and `sitemap.ts` updated accordingly — sitemap now carries one entry
   per name page.
4. **SEO pass across the 11 remaining Islamic Tools pages** (Prayer Times,
   Qibla Finder, Hijri Calendar/Converter, Ramadan/Hajj Countdowns, Daily
   Quran Verse/Hadith, Dua of the Day, Tasbih Counter, Zakat Calculator)
   plus the `/islamic-tools` hub: keyword-aware titles/descriptions, a
   short genuinely-useful "about" paragraph where it fit naturally, and
   two new shared components used on every page — `<ToolFaq>` (3 real,
   practical Q&A per tool + matching FAQPage JSON-LD) and `<RelatedTools>`
   (internal links to the other tools, sourced from a single new
   `src/lib/islamic/tools-list.ts` shared with the hub page).

**Verified:** `npm run build` and `npm run lint` clean (all 1,013 name
pages generate as static HTML alongside the rest of the site — 1,082 total
routes). Playwright pass on the Names hub (letter filter, card → detail
navigation) and a representative tool page (Zakat Calculator) confirmed
correct rendering, brand styling, and working FAQ/related-tools sections.

**What's left:** same as before — only the Pre-launch checklist (now with
the WhatsApp Community link added to it).

---

## 2026-08-23 — Site build-out complete: every TODO.md section done

**Context:** Continuing from the foundation session below, autonomously
executing the full remaining spec end to end — the goal was a genuinely
launch-ready codebase, not stubs. Everything in `TODO.md` is now checked
off except the "Pre-launch checklist," which needs real accounts (Supabase,
GitHub, Vercel, the `.lk` domain, Search Console, GA4) that only you can
create — per your earlier instruction ("I'll set up accounts myself, you
build locally"), this session never touched live cloud accounts.

**What was built, roughly in order:**

1. **Islamic Tools suite (all 12)** — Prayer Times (Aladhan API), Qibla
   Finder (client-side great-circle bearing), Hijri Calendar/Converter
   (`hijri-converter`), Ramadan/Hajj Countdowns, Daily Quran
   Verse/Hadith/Dua (bundled datasets, day-of-year rotation), Tasbih
   Counter and Zakat Calculator (localStorage), Islamic Names directory.
2. **Blog + Maulavi Directory** — list/detail pages for both, with
   `generateStaticParams`, full JSON-LD (Article/BreadcrumbList), draft vs.
   published post status.
3. **SEO infrastructure** — `sitemap.ts`/`robots.ts`, JSON-LD across the
   whole site (Organization/WebSite on the root layout, TravelAgency,
   Product/Offer, FAQPage, Article, and now BreadcrumbList automatically on
   every page that passes breadcrumbs to `<PageHeader>` — one shared fix
   that covered 13 pages at once), explicit canonical URLs on every dynamic
   route.
4. **Auth & roles** — Supabase Auth wired into real sign-in/sign-up pages,
   `src/proxy.ts` (Next 16's `middleware.ts` successor) for session refresh
   + route protection, role-aware layouts for `/admin` and `/agency`.
5. **Demo-mode architecture** — the single decision that made the rest of
   this session possible without a live Supabase project:
   `isSupabaseConfigured()` gates every real DB call; when unconfigured
   (true in any sandbox with no `.env.local`), dashboards render fully
   against mock data via `DEMO_ADMIN_PROFILE`/`DEMO_AGENCY_PROFILE`, and
   every mutation server action short-circuits to `{ok: true, demo: true}`
   without persisting, paired with a `<DemoBanner>` so it's transparent.
   Zero code changes needed once real Supabase env vars are set.
6. **Admin Dashboard** (`/admin/*`) — agency approval + trust badges,
   cross-agency package moderation, a full blog CMS, an inquiries inbox,
   and a role/permissions reference page sourced from the actual RLS
   policies.
7. **Agency Dashboard** (`/agency/*`) — package CRUD (list/new/edit, full
   Card-sectioned form), an inquiries inbox scoped to the agency's own
   leads, an analytics view (views/clicks/compares/contacts, two charts),
   and a profile editor.
8. **Automation engine wired into the UI** — `getTrendingPackages()` was
   built earlier but never called anywhere; it now powers a "Trending Now"
   homepage section. `getFeaturedPackages()`/`getTrendingPackages()`/etc.
   were also fixed to only ever surface published packages from active
   agencies (they previously leaked drafts). Fixed a real bug along the way
   where agency-submitted package tags were silently dropped on save; added
   `src/lib/auto-tag.ts` to derive a few tags automatically (price band,
   star rating, group type) merged with the agency's manual ones.
9. **Accessibility pass** — ran Lighthouse (desktop preset) against the
   production build across ~20 pages spanning the public site, both
   dashboards, and auth. Fixed everything actionable: icon-only `Select`
   triggers with no accessible name (a Radix SSR quirk — `SelectValue`
   only fills in text after hydration), a logo `aria-label` that didn't
   cover its full visible content once the tagline was involved, an
   invalid `<dl>` structure on the package spec table, and heading-order
   skips (h1 straight to h3) across four listing pages. Result:
   Accessibility 96/100 on every page audited (up from 84–91 on the worst
   ones), Performance/Best Practices/SEO all 100 on every public page. The
   one remaining finding — `text-brand-gold-dark` contrast on white falling
   just short of WCAG AA for small text — is a deliberate, documented
   trade-off against the brand guidelines' locked color palette, not an
   oversight.

**Verification approach used throughout:** every piece of work (including
work delegated to parallel subagents for the two dashboards) was
independently re-verified before committing — `npm run build` +
`npm run lint` clean, then a Playwright screenshot pass checking for
console/page errors and visual correctness. Nothing was trusted from a
subagent's own self-report without re-running the checks myself.

**What's left:** only the Pre-launch checklist in `TODO.md` — creating the
real Supabase/GitHub/Vercel accounts, DNS, Search Console, and GA4. The
codebase is ready for all of it as-is.

---

## 2026-08-22 — Foundation & Home page

**Context:** First build session. Full spec provided (see the original
brief for the complete feature list — comparison platform, agency
dashboard, admin dashboard, Islamic tools, blog, maulavi directory, full
SEO/performance targets). Given the scope, this session focused on getting
the foundation genuinely production-grade rather than stubbing everything
shallowly — a solid base is worth more than 20 half-built pages.

**Environment note:** the build sandbox used for this session could not
reach `ui.shadcn.com`, `fonts.googleapis.com`, `picsum.photos`, or
`ui-avatars.com` (network allowlist). This shaped a few decisions below.
None of these are permanent constraints — they just meant working around
them rather than depending on them, which arguably makes the app more
robust anyway (no runtime dependency on the shadcn registry, Google Fonts
CDN, or third-party placeholder-image services in production).

**What was built:**

1. **Next.js 16 + React 19 + TypeScript + Tailwind v4** scaffold via
   `create-next-app`, App Router, `src/` layout.
2. **Brand system** — exact tokens from the uploaded brand guide
   (`#0D1B2A` navy / `#C8A24A` gold / `#F2F2F2` gray / Poppins) wired into
   Tailwind via CSS custom properties in `globals.css`. Logo assets
   processed from the two uploaded images: background removed
   (white→transparent), icon-only crop extracted programmatically, favicon
   set generated (16/32/48/180/192/512), OG image generated
   (1200×630, navy background, white-recolored icon + gold wordmark).
3. **UI primitives** (`src/components/ui/`) — Button, Card, Badge, Input,
   Textarea, Label, Separator, Accordion, Sheet — hand-written in the
   shadcn/ui convention (Radix + CVA + `cn()`) instead of `npx shadcn add`,
   because that CLI's `init`/`add` commands fetch from `ui.shadcn.com`
   which wasn't reachable. Same conventions, so `shadcn add` will still
   work for *new* components on a network that can reach it.
4. **Poppins self-hosted** via `@fontsource/poppins` instead of
   `next/font/google`, because the Google Fonts CSS endpoint wasn't
   reachable at build time in this sandbox. This is arguably better for
   production anyway — zero runtime dependency on Google's font CDN.
5. **Layout shell** — sticky header with dropdown "Resources" nav, mobile
   sheet menu, dark-navy footer, floating WhatsApp button (site-wide,
   per the "contact via WhatsApp" business model).
6. **Trust badge system** — `TrustBadge`/`TrustBadgeList` components for
   the 5 badge types (Gold Verified, Featured, Premium Partner,
   Recommended, New Agency), used on package cards, agency cards, and the
   homepage trust strip.
7. **Home page** — hero, trust strip, featured packages, "how it works",
   featured agencies, Islamic tools teaser, blog teaser, agency CTA. Built
   against `src/lib/mock-data.ts` (clearly marked placeholder, typed
   against `src/types/domain.ts` which mirrors the DB schema so swapping
   to real Supabase queries later is a search-and-replace, not a rewrite).
8. **Local placeholder images** — since `picsum.photos` and
   `ui-avatars.com` weren't reachable either, generated local placeholder
   cover photos (navy/gold gradient + Kaaba icon motif) and agency-initial
   logos with PIL, stored in `public/placeholders/`. These are dev-only
   stand-ins for real agency photos.
9. **Full Supabase schema** (`supabase/migrations/`) — every table implied
   by the brief: `profiles` (role system), `agencies`, `agency_badges`
   (trust system, Super-Admin-only via RLS), `packages`, `package_images`,
   `package_brochures`, `tags`/`package_tags`, `inquiries`, `blog_posts`,
   `maulavis`, `analytics_events` (feeds the trending/automation engine).
   Full RLS policy set in the second migration — public reads only see
   published packages from *active* agencies; a `travel_agency` role can
   only touch their own agency's data; `agencies.is_active` cannot be
   self-flipped by the agency (enforced at the RLS level, not just the
   UI) — matches the "accounts start disabled" business rule exactly.
   `seed.sql` mirrors `mock-data.ts` so the real DB looks like local dev
   once connected.
10. **Supabase client scaffolding** (`src/lib/supabase/{client,server}.ts`)
    — browser client, server client (cookie-based session), and an
    admin/service-role client for privileged actions (e.g. enabling an
    agency). Not yet wired to any pages — that's the auth/RBAC task.

**Verified:** `npm run build` and `npm run lint` both pass clean. Home page
screenshotted at 1440px — visually matches the "Apple/Linear/Stripe-quality"
brief (see chat for screenshots).

**Deliberately not started yet** (see `TODO.md` for order): Packages
listing/detail/compare pages, Agencies directory/profile, static pages
(About/Contact/FAQ/Privacy/Terms/404/Search), Islamic Tools suite, Blog +
Maulavi directory, Auth/RBAC wiring, Admin dashboard, Agency dashboard,
automation engine (trending/related/tags), SEO infra (sitemaps/JSON-LD),
performance/accessibility pass.

**Decision: local scaffolding only, no live accounts yet.** Per your
answer when asked, this session builds everything locally rather than
connecting live GitHub/Supabase/Vercel accounts. When you're ready to go
live: create the three free accounts, follow `supabase/README.md`, and
either connect the GitHub/Supabase/Vercel MCP connectors for direct
setup, or push/deploy manually with the files as they stand.
