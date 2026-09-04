import type { MetadataRoute } from "next";

import { getAgencies, getBlogPosts, getMaulavis, getPackages } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { islamicNamesData } from "@/lib/islamic/names-data";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/packages", priority: 0.9, changeFrequency: "daily" },
  { path: "/compare", priority: 0.5, changeFrequency: "weekly" },
  { path: "/agencies", priority: 0.9, changeFrequency: "daily" },
  { path: "/cheap-umrah-packages", priority: 0.8, changeFrequency: "daily" },
  { path: "/luxury-umrah-packages", priority: 0.8, changeFrequency: "daily" },
  { path: "/family-umrah-packages", priority: 0.7, changeFrequency: "daily" },
  { path: "/ramadan-umrah-packages", priority: 0.7, changeFrequency: "weekly" },
  { path: "/december-umrah-packages", priority: 0.7, changeFrequency: "weekly" },
  { path: "/umrah-cost-sri-lanka", priority: 0.8, changeFrequency: "daily" },
  { path: "/best-umrah-agencies-sri-lanka", priority: 0.8, changeFrequency: "weekly" },
  { path: "/licensed-umrah-operators-sri-lanka", priority: 0.7, changeFrequency: "weekly" },
  { path: "/maulavi-directory", priority: 0.7, changeFrequency: "weekly" },
  { path: "/islamic-tools", priority: 0.8, changeFrequency: "monthly" },
  { path: "/islamic-tools/prayer-times", priority: 0.7, changeFrequency: "daily" },
  { path: "/islamic-tools/qibla-finder", priority: 0.7, changeFrequency: "monthly" },
  { path: "/islamic-tools/hijri-calendar", priority: 0.6, changeFrequency: "daily" },
  { path: "/islamic-tools/ramadan-countdown", priority: 0.6, changeFrequency: "daily" },
  { path: "/islamic-tools/hajj-countdown", priority: 0.6, changeFrequency: "daily" },
  { path: "/islamic-tools/daily-quran-verse", priority: 0.5, changeFrequency: "daily" },
  { path: "/islamic-tools/daily-hadith", priority: 0.5, changeFrequency: "daily" },
  { path: "/islamic-tools/dua-of-the-day", priority: 0.5, changeFrequency: "daily" },
  { path: "/islamic-tools/tasbih-counter", priority: 0.5, changeFrequency: "monthly" },
  { path: "/islamic-tools/zakat-calculator", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/hijri-converter", priority: 0.5, changeFrequency: "monthly" },
  { path: "/islamic-tools/packing-checklist", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/umrah-budget-calculator", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/makkah-madinah-weather", priority: 0.6, changeFrequency: "daily" },
  { path: "/islamic-tools/currency-converter", priority: 0.6, changeFrequency: "daily" },
  { path: "/islamic-tools/umrah-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/islamic-tools/ihram-rules-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/best-time-and-crowd-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/umrah-visa-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/pre-departure-checklist", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/saudi-travel-tips-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/hotels-near-haram-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/ziyarah-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/halal-food-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/saudi-transport-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/saudi-sim-and-wifi-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/children-umrah-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/elderly-umrah-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/makkah-madinah-shopping-guide", priority: 0.5, changeFrequency: "monthly" },
  { path: "/islamic-tools/masjid-al-haram-facilities-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-tools/360-explorer", priority: 0.5, changeFrequency: "monthly" },
  { path: "/islamic-tools/offline-pdf-guide", priority: 0.6, changeFrequency: "monthly" },
  { path: "/islamic-names", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/merchandise", priority: 0.4, changeFrequency: "monthly" },
  { path: "/merchandise/wholesale", priority: 0.4, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/for-agencies", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, agencies, posts, maulavis] = await Promise.all([
    getPackages(),
    getAgencies(),
    getBlogPosts(),
    getMaulavis(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const packageEntries: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${siteConfig.url}/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt ? new Date(pkg.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
    images: pkg.images?.length ? pkg.images : [pkg.coverImageUrl],
  }));

  const agencyEntries: MetadataRoute.Sitemap = agencies.map((agency) => ({
    url: `${siteConfig.url}/agencies/${agency.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
    images: [agency.logoUrl],
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
    images: [post.coverImageUrl],
  }));

  const maulaviEntries: MetadataRoute.Sitemap = maulavis.map((m) => ({
    url: `${siteConfig.url}/maulavi-directory/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // One entry per name in the Islamic Names database — this is the bulk of
  // the site's long-tail SEO surface area (see src/app/islamic-names/[slug]).
  const nameEntries: MetadataRoute.Sitemap = islamicNamesData.map((n) => ({
    url: `${siteConfig.url}/islamic-names/${n.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticEntries, ...packageEntries, ...agencyEntries, ...blogEntries, ...maulaviEntries, ...nameEntries];
}
