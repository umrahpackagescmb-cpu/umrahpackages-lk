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
  description:
    "Sri Lanka's premium platform for comparing Umrah packages from trusted, verified travel agencies. Compare prices, hotels, airlines and reviews — then contact the agency directly.",
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
