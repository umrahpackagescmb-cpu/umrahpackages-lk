# TODO

Priority-ordered. Check `PROJECT_LOG.md` for context on anything already
done. Update this file as items complete — it's the map for picking work
back up in a new session.

## Next up (core public pages) — ✅ done

- [x] Packages listing page (`/packages`) — filters (price, duration,
      category, hotel stars, airline, group type), sort, pagination.
- [x] Package detail page (`/packages/[slug]`) — gallery, full spec table,
      inclusions/exclusions, agency card, WhatsApp/phone CTA, similar
      packages, JSON-LD (Product/TravelAgency schema).
- [x] Compare page (`/compare`) — pick 2–4 packages, side-by-side table.
- [x] Agencies directory (`/agencies`) — filters (city, badges), grid.
- [x] Agency profile page (`/agencies/[slug]`) — packages list, map
      (OpenStreetMap/Leaflet), contact block, badges.
- [x] Static pages: About, Contact (form → `contact_messages` table), FAQ
      (accordion + FAQ schema), Privacy, Terms, 404, Search (`/search`).

## Islamic Tools suite (`/islamic-tools/*`) — ✅ all 30 done

Use free APIs — no paid services:
- [x] Prayer Times — Aladhan API (free, no key)
- [x] Qibla Finder — compass + great-circle bearing calc (client-side, no API)
- [x] Hijri Calendar — `hijri-converter` (already installed)
- [x] Ramadan Countdown / Hajj Countdown — date math against known Hijri dates
- [x] Daily Quran Verse / Daily Hadith / Dua of the Day — bundled dataset
      (`src/lib/islamic/{quran,hadith,duas}.ts`), day-of-year rotation
- [x] Tasbih Counter — client-side only, localStorage
- [x] Zakat Calculator — client-side form + editable nisab reference value
- [x] Hijri Converter — `hijri-converter` package, two-way conversion
- [x] Packing Checklist, Budget Calculator, Weather, Currency Converter — see
      "Umrah journey tools expansion" below.
- [x] Step-by-Step Umrah Guide (with Audio Learning Mode and Tamil/Sinhala
      translations), Ihram Rules, Best Time & Crowd Guide, Umrah Visa Guide,
      Pre-Departure Checklist, Saudi Travel Tips, Hotels Near the Haram,
      Ziyarah Guide, Halal Food Guide, Transport & Taxi Guide, SIM Card &
      WiFi Guide, Shopping Guide, Haram Facilities Guide, 360° Holy Places
      Explorer, Offline Umrah Guide PDF — see "Umrah journey tools
      expansion" below.
- [x] Islamic Names — now a full standalone section, see below (superseded
      the old 50-name widget)

## Content — ✅ done

- [x] Blog listing + post page (`/blog`, `/blog/[slug]`) — Article schema,
      related posts.
- [x] Maulavi directory (`/maulavi-directory`, `/maulavi-directory/[slug]`)

## Auth & roles — ✅ done

- [x] Wired `src/lib/supabase/{client,server}.ts` into sign-in/sign-up pages
      (email/password), with an `/api/agency-signup` route that links a new
      travel_agency user to a fresh inactive agency row via the service role.
- [x] `src/proxy.ts` (Next.js 16's `middleware.ts` successor) for session
      refresh + route protection (`/admin/*`, `/agency/*`).
- [x] Role-aware layouts (`admin/layout.tsx`, `agency/layout.tsx`) —
      redirect based on `profiles.role`, with a full demo-mode fallback
      (`DEMO_ADMIN_PROFILE`/`DEMO_AGENCY_PROFILE`) so both dashboards are
      fully browsable before a real Supabase project exists.

## Admin Dashboard (`/admin/*`) — ✅ done

- [x] Agencies: list, approve (flip `is_active`), assign trust badges
      (Super Admin only — matches RLS).
- [x] Packages: moderate/feature/publish/delete any package, cross-agency.
- [x] Blog: create/edit/publish/delete posts (RHF + Zod dialog form).
- [x] Inquiries: view all, filter + change status.
- [x] Analytics overview (Recharts `SimpleBarChart`): top packages by views.
- [x] Role reference page (`/admin/roles`, Super Admin only) — full
      permissions matrix sourced from the actual RLS policies.

## Agency Dashboard (`/agency/*`) — ✅ done

Built the whole thing even though accounts start disabled — enabling one
later needs zero new code (see `supabase/README.md`).
- [x] Profile management (`/agency/profile` — description, contact,
      location; logo change is a manual request for now, not self-service).
- [x] Package CRUD (`/agency/packages`, `/new`, `/[id]/edit` — React Hook
      Form + Zod, Card-sectioned form). Image upload (Supabase Storage) is
      still a placeholder-URL field — see Pre-launch checklist.
- [x] Inquiries inbox (`/agency/inquiries` — own-agency leads, status
      filter + inline status change).
- [x] Analytics view (`/agency/analytics` — views/clicks/compares/contacts
      stat cards, views-by-package and inquiries-by-channel charts).
- [ ] Brochure upload (Supabase Storage, PDF) — deferred with image upload,
      needs a real Storage bucket to be meaningful.

## Automation engine — ✅ done

- [x] Trending/Most Viewed/Most Contacted/Most Compared/Latest — implemented
      in `src/lib/data.ts` against the mock dataset (view/contact/compare
      counters), all scoped through a shared `publiclyVisiblePackages()`
      filter. `getTrendingPackages()` is now live on the homepage's
      "Trending Now" section; the others (`getMostContactedPackages`,
      `getMostComparedPackages`, `getLatestPackages`) are built and ready
      but not yet surfaced in any UI — natural next additions to `/packages`
      sort options or homepage sections when there's a reason to add more.
      Once wired to Supabase, each becomes a query against
      `analytics_events` windowed by `created_at`, per the original plan.
- [x] Similar/Related packages — `getSimilarPackages()`, live on the
      package detail page (same budget band / duration / airline / hotel /
      agency / category, scored).
- [x] Auto-tagging — `src/lib/auto-tag.ts`'s `buildPackageTags()` derives
      tags from price band, star rating, group type, category and
      visa-included, merged with the agency's own manual tags, and wired
      into `createPackage`/`updatePackage` (fixed a bug along the way where
      manually-entered tags were being silently dropped).

## SEO infrastructure — ✅ done

- [x] `sitemap.ts` (Next.js native) — packages, agencies, blog, maulavis,
      with images/priorities/changefreq.
- [x] `robots.ts` — disallows `/admin`, `/agency`, `/api`, points at the
      sitemap.
- [x] JSON-LD: Organization + WebSite (root layout), TravelAgency (agency
      pages), Product/Offer (package pages), FAQPage (FAQ page), Article
      (blog posts), BreadcrumbList — now automatic on every page that
      passes `breadcrumbs` to `<PageHeader>` (13 pages: packages, agencies,
      blog, maulavi-directory, search, compare, contact, faq, about, etc.)
      plus the 4 detail-page types that build it manually alongside their
      other schema.
- [x] Per-page canonical URLs — `metadataBase` on the root layout, plus
      explicit `alternates: { canonical }` on every dynamic route's
      `generateMetadata` (belt-and-suspenders, confirmed on packages/blog/
      agencies/maulavi-directory detail pages).
- [x] Internal linking: "Similar Packages" section live on package detail
      pages.

## Performance & accessibility — ✅ done

- [x] Lighthouse pass (desktop preset, production build) across ~20 pages —
      Performance 100, Best Practices 100 (96 on one Islamic Tools page, see
      below), SEO 100 on every public/indexable page. Admin/Agency
      dashboards and `/search`, `/sign-in` correctly score SEO 69 — they're
      intentionally `noindex` (private dashboards, a search-results page,
      an auth page), which is the desired behavior, not a bug.
- [x] Accessibility: 96/100 on every page audited (up from 84–91 on the
      worst pages before this pass). Fixed real issues along the way:
      buttons without accessible names (icon-only sort/filter/status
      `Select` triggers — Radix's `SelectValue` only fills in its text
      after client hydration, so triggers now carry an explicit
      `aria-label`; gallery thumbnail buttons); a logo `aria-label` that
      didn't cover the full visible link content when the tagline was
      shown (`src/components/brand/logo.tsx` restructured so the tagline
      sits outside the `<Link>`); an invalid `<dl>` structure on the
      package detail spec table (`src/components/packages/spec-table.tsx`);
      and heading-order skips (h1 straight to h3) on `/agencies`,
      `/maulavi-directory`, `/blog`, and `/for-agencies` — card titles
      bumped to `h2`, and the footer's column headings bumped to `h2` site-
      wide (footer is always last, so h2 there can never skip a level,
      unlike h3 on pages with no other h2 in the body).
      The one remaining finding on every page is `color-contrast`: a few
      `text-brand-gold-dark` (#A9843A) uses on white background sit at
      ~3.47:1, short of WCAG AA's 4.5:1 for small text (though above the
      3:1 large-text threshold). Left as-is deliberately — the brand
      guidelines lock the exact palette (never modify colors), so this is
      a documented brand/accessibility trade-off rather than an oversight;
      revisit only if the brand guidelines are ever revised.
- [x] `next/image` everywhere — confirmed zero raw `<img>` tags anywhere in
      `src/`, every image has an `alt` (empty `alt=""` only on genuinely
      decorative images).
- [x] a11y audit — done via automated Lighthouse/axe-core sweep above
      rather than the `design:accessibility-review` skill; findings fixed
      as listed. `eslint-plugin-jsx-a11y` (via `eslint-config-next`) also
      runs on every `npm run lint`.
- [ ] Convert list pages to Server Components with streaming where
      sensible — not done; current list pages (`/packages`, `/agencies`,
      etc.) are already Server Components with small Client Component
      filter islands, but no explicit `<Suspense>` streaming boundaries
      have been added. Low priority at this dataset size (mock data, no
      real network latency) — worth revisiting once real Supabase queries
      are in the loop.

## Pre-launch checklist (when you're ready to go live)

- [ ] Create free Supabase project → run migrations → run seed (optional)
      → fill `.env.local`.
- [ ] Create GitHub repo, push.
- [ ] Create Vercel project, connect repo, set env vars, deploy.
- [ ] Point the `.lk` domain's DNS at Vercel.
- [ ] Google Search Console + submit sitemap.
- [ ] Google Analytics 4 property → `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- [ ] Replace `public/placeholders/*` usage with real Supabase Storage
      images as agencies onboard.
- [ ] Replace the placeholder in `siteConfig.links.whatsappCommunity`
      (`src/lib/site-config.ts`) with your real WhatsApp Community invite
      link before launch — this is what's shown to visitors after they
      opt in on the Daily Quran Verse / Daily Hadith pages.

## Disclaimer, WhatsApp opt-in & Islamic Names expansion — ✅ done

- [x] Liability disclaimer — added to the footer (site-wide), the package
      contact card, and the agency profile contact card, all linking to
      `/terms` for the full legal language: makes clear UmrahPackages.lk
      only lists agencies and isn't responsible for their transactions or
      service quality.
- [x] WhatsApp Community opt-in gate (`WhatsAppCommunityGate`) on the Daily
      Quran Verse and Daily Hadith pages — phone number + required consent
      checkbox → `/api/whatsapp-subscribe` → `whatsapp_subscribers` table
      (migration `0004`, RLS: public insert, staff-only read) → reveals
      the WhatsApp Community invite link. Copy is explicit that it's a
      Community (not a group), numbers aren't shared, and updates are
      daily. **Needs the real invite link before launch — see checklist
      above.**
- [x] Full Islamic Names database — replaced the old 50-name widget with
      1,013 real, individually-checked names (compiled across parallel
      research batches, deduped, no fabricated/padded entries) at
      `src/lib/islamic/names-data.ts`. New `/islamic-names` hub (search +
      starting-letter/gender/length/origin filters, paginated) and a
      statically-generated `/islamic-names/[slug]` page per name (meaning,
      origin, similar names, DefinedTerm + BreadcrumbList JSON-LD). Old
      `/islamic-tools/islamic-names` now 301-redirects here. All 1,013
      name pages included in `sitemap.ts`.
- [x] SEO pass across all 11 remaining Islamic Tools pages: richer
      keyword-aware titles/descriptions, an `<ToolFaq>` (real, practical
      Q&A + FAQPage JSON-LD) and `<RelatedTools>` internal-linking block
      added to every page, plus the same on the `/islamic-tools` hub.
      Note honestly: no one can guarantee a #1 search ranking in any
      market — what's been done here is the full set of controllable
      on-page/technical best practices (content depth, structured data,
      internal linking, keyword-relevant metadata); actual ranking also
      depends on domain age, backlinks, and competition once the site is
      live and indexed.

## Umrah journey tools expansion (guides, PDF, audio, translations) — ✅ done

- [x] Currency Converter (`/islamic-tools/currency-converter`) — LKR/SAR/USD
      live daily rates with a graceful error state when the rate CDN is
      unreachable.
- [x] Step-by-Step Umrah Guide (`/islamic-tools/umrah-guide`) — full 9-step
      ritual sequence (Ihram prep through Halq/Taqsir) with Arabic duas,
      transliteration and translation, per-step tips, printable, progress
      saved to the device, `HowToSchema` JSON-LD.
      - [x] Audio Learning Mode — free client-side Web Speech API
            (`useTextToSpeech()`), no API key; English only (deliberately
            not attempting Arabic/Tamil/Sinhala TTS, which would mispronounce).
      - [x] Tamil & Sinhala translations — full per-step translations with
            Islamic terms kept as transliterated loanwords (matching
            real-world Tamil/Sinhala Islamic literature convention); visible
            "needs native-speaker/scholarly review" notice shown whenever a
            non-English language is selected.
- [x] 11-page SEO guide wave: Ihram Rules & Restrictions, Best Time & Crowd
      Guide (honest reframe — no fabricated "live crowd meter"), Umrah Visa
      Guide, Pre-Departure Checklist (interactive, printable), Saudi Travel
      Tips, Hotels Near the Haram, Ziyarah Guide, Halal Food Guide, Saudi
      Transport Guide, Saudi SIM & WiFi Guide, Makkah/Madinah Shopping
      Guide — each with `ToolFaq` + `RelatedTools`. Deliberately did not
      build separate "Umrah Cost Guide"/"What to Pack"/"First-Time Guide"
      pages — that ground is already covered by the Budget Calculator,
      Packing Checklist and Step-by-Step Guide, and duplicating it would be
      thin/duplicate SEO content.
- [x] Masjid al-Haram Facilities Guide (`/islamic-tools/masjid-al-haram-facilities-guide`)
      — built as the honest alternative to a literal "Interactive Haram Map":
      no verified official geodata source exists for gate/facility pin
      coordinates, so this is a general orientation guide (gates, Zamzam
      stations, accessibility, floors, toilets/lost & found) with an
      explicit note on why there's no pinpoint map, rather than one with
      fabricated coordinates.
- [x] 360° Holy Places Explorer (`/islamic-tools/360-explorer`) — curated
      links to real, freely-linkable external 360°/panoramic resources
      (Google Arts & Culture, 360Cities.net) rather than an iframe embed of
      unverified/copyrighted content.
- [x] Offline Umrah Guide PDF (`/islamic-tools/offline-pdf-guide`) — free
      downloadable, brand-accurate PDF (10 pages) combining the Step-by-Step
      Guide, Ihram Rules, Packing Checklist and Pre-Departure Checklist,
      generated from the same live data the site uses (not hand-transcribed,
      so it can't drift out of sync) with correctly-shaped Arabic dua text.
- [x] `/islamic-tools` hub, `tools-list.ts`, and `sitemap.ts` updated for
      all of the above; hub metadata description corrected from "27" to
      "30" tools to match the final count.
