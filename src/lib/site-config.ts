/**
 * Central source of truth for site-wide constants: brand name, contact
 * details, and social/meta defaults. Pulled from the project brief —
 * keep this file as the single place these values live so they never
 * drift between pages.
 */
export const siteConfig = {
  name: "UmrahPackages.lk",
  legalName: "UmrahPackages.lk",
  tagline: "Compare. Choose. Perform Umrah.",
  // "verified"/"reviews" were dropped from this description on 2026-09-04 —
  // it's used site-wide (root metadata, OG/Twitter cards, Organization
  // schema, the footer tagline, llms.txt), and once real, mostly-unverified
  // agency data replaced the old mock catalogue, both claims went from
  // aspirational to actively false. Revisit once badge-based verification
  // and a real review system exist.
  description:
    "Sri Lanka's platform for comparing Umrah packages from local travel agencies. Compare prices, hotels, airlines and dates — then contact the agency directly.",
  url: "https://umrahpackages.lk",
  ogImage: "/brand/og-image.png",
  locale: "en_LK",
  country: "Sri Lanka",
  contact: {
    phone: "+94 77 722 7786",
    phoneHref: "tel:+94777227786",
    whatsapp: "https://wa.me/94777227786",
    email: "Umrahpackages@gmail.com",
  },
  links: {
    // Placeholder social links — update once accounts exist.
    facebook: "https://facebook.com/umrahpackageslk",
    instagram: "https://instagram.com/umrahpackageslk",
    tiktok: "https://tiktok.com/@umrahpackageslk",
    // Placeholder — replace with the real WhatsApp Community invite link
    // (WhatsApp app → Communities → your community → Invite via link).
    // Shown by src/components/islamic/whatsapp-community-gate.tsx after
    // someone opts in on the Daily Quran Verse / Daily Hadith pages.
    whatsappCommunity: "https://chat.whatsapp.com/REPLACE_WITH_REAL_COMMUNITY_LINK",
  },
} as const;

export type SiteConfig = typeof siteConfig;
