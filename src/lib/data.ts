/**
 * Data access layer. Every function here is `async` even though it
 * currently just filters the in-memory arrays from `mock-data.ts` — that's
 * deliberate, so every call site already looks like (and will drop-in
 * replace with) a real Supabase query:
 *
 *   export async function getPackages(filters) {
 *     const supabase = await createClient();
 *     let q = supabase.from("packages").select("*, agency:agencies(*)")...
 *   }
 *
 * When Supabase is connected (see /supabase/README.md), rewrite the body
 * of each function below to query Supabase instead — nothing that calls
 * these functions needs to change.
 */
import { mockAgencies, mockPackages, mockBlogPosts, mockMaulavis, mockInquiries } from "@/lib/mock-data";
import type { Agency, Package, BlogPost, Maulavi, TrustBadgeType, Inquiry, InquiryStatus } from "@/types/domain";

// -----------------------------------------------------------------------------
// Packages
// -----------------------------------------------------------------------------

export interface PackageFilters {
  category?: string[];
  groupType?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  minStars?: number;
  airline?: string;
  agencySlug?: string;
  city?: string;
  badge?: TrustBadgeType;
  query?: string;
  /** "YYYY-MM" — matches the first 7 characters of any one of
   * `Package.departureDates`. A package with no departureDates set never
   * matches a month filter, since someone filtering by month is trying to
   * plan around a real travel date. */
  departureMonth?: string;
  sort?: "price_asc" | "price_desc" | "duration_asc" | "duration_desc" | "newest" | "popular";
}

function matchesFilters(pkg: Package, filters: PackageFilters): boolean {
  if (filters.category?.length && !filters.category.includes(pkg.category)) return false;
  if (filters.groupType?.length && !filters.groupType.includes(pkg.groupType)) return false;
  if (filters.minPrice != null && pkg.priceLkr < filters.minPrice) return false;
  if (filters.maxPrice != null && pkg.priceLkr > filters.maxPrice) return false;
  if (filters.minDuration != null && pkg.durationDays < filters.minDuration) return false;
  if (filters.maxDuration != null && pkg.durationDays > filters.maxDuration) return false;
  if (filters.minStars != null && (pkg.makkahHotelStars ?? 0) < filters.minStars) return false;
  if (filters.airline && !pkg.airline.toLowerCase().includes(filters.airline.toLowerCase())) return false;
  if (filters.agencySlug && pkg.agency.slug !== filters.agencySlug) return false;
  if (filters.badge && !pkg.agency.badges.includes(filters.badge)) return false;
  if (filters.departureMonth) {
    if (!pkg.departureDates?.some((d) => d.startsWith(filters.departureMonth!))) return false;
  }
  if (filters.city) {
    const agency = mockAgencies.find((a) => a.id === pkg.agencyId);
    if (agency?.city.toLowerCase() !== filters.city.toLowerCase()) return false;
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    const haystack = `${pkg.title} ${pkg.agency.name} ${pkg.airline} ${pkg.makkahHotel} ${pkg.madinahHotel} ${pkg.tags.join(" ")}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function sortPackages(pkgs: Package[], sort: PackageFilters["sort"]): Package[] {
  const sorted = [...pkgs];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.priceLkr - b.priceLkr);
    case "price_desc":
      return sorted.sort((a, b) => b.priceLkr - a.priceLkr);
    case "duration_asc":
      return sorted.sort((a, b) => a.durationDays - b.durationDays);
    case "duration_desc":
      return sorted.sort((a, b) => b.durationDays - a.durationDays);
    case "newest":
      return sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "popular":
    default:
      return sorted.sort((a, b) => b.viewCount - a.viewCount);
  }
}

/** Public listing — only published packages from active agencies. */
export async function getPackages(filters: PackageFilters = {}): Promise<Package[]> {
  const activeAgencyIds = new Set(mockAgencies.filter((a) => a.isActive).map((a) => a.id));
  const filtered = mockPackages.filter(
    (p) => p.isPublished && activeAgencyIds.has(p.agencyId) && matchesFilters(p, filters),
  );
  return sortPackages(filtered, filters.sort);
}

export async function getPackageBySlug(slug: string): Promise<Package | undefined> {
  return mockPackages.find((p) => p.slug === slug);
}

/** Admin-scoped: every package regardless of published/agency-active state,
 * optionally narrowed to one agency (for the agency dashboard). */
export async function getAllPackagesForAdmin(agencyId?: string): Promise<Package[]> {
  const list = agencyId ? mockPackages.filter((p) => p.agencyId === agencyId) : mockPackages;
  return [...list].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

/** Shared base for every public "automation" list below — published
 * packages from active agencies only, same visibility rule as `getPackages`. */
function publiclyVisiblePackages(): Package[] {
  const activeAgencyIds = new Set(mockAgencies.filter((a) => a.isActive).map((a) => a.id));
  return mockPackages.filter((p) => p.isPublished && activeAgencyIds.has(p.agencyId));
}

export async function getFeaturedPackages(limit = 4): Promise<Package[]> {
  return publiclyVisiblePackages()
    .filter((p) => p.isFeatured)
    .slice(0, limit);
}

/** Trending = most viewed in the (simulated) last 30 days. Once wired to
 * Supabase this becomes a query against `analytics_events` windowed by
 * `created_at`, per TODO.md's automation-engine item. */
export async function getTrendingPackages(limit = 6): Promise<Package[]> {
  return publiclyVisiblePackages()
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

export async function getMostContactedPackages(limit = 6): Promise<Package[]> {
  return publiclyVisiblePackages()
    .sort((a, b) => b.contactCount - a.contactCount)
    .slice(0, limit);
}

export async function getMostComparedPackages(limit = 6): Promise<Package[]> {
  return publiclyVisiblePackages()
    .sort((a, b) => b.compareCount - a.compareCount)
    .slice(0, limit);
}

export async function getLatestPackages(limit = 6): Promise<Package[]> {
  return publiclyVisiblePackages()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

/** Similar packages — same budget band (±20%), duration, airline, hotel or
 * agency. Scored, not ML — see TODO.md. */
export async function getSimilarPackages(pkg: Package, limit = 4): Promise<Package[]> {
  const scored = mockPackages
    .filter((p) => p.id !== pkg.id)
    .map((p) => {
      let score = 0;
      if (Math.abs(p.priceLkr - pkg.priceLkr) / pkg.priceLkr <= 0.2) score += 3;
      if (p.durationDays === pkg.durationDays) score += 2;
      if (p.airline === pkg.airline) score += 1;
      if (p.makkahHotel === pkg.makkahHotel) score += 2;
      if (p.agencyId === pkg.agencyId) score += 1;
      if (p.category === pkg.category) score += 1;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

export async function getPackagesByAgency(agencyId: string): Promise<Package[]> {
  return mockPackages.filter((p) => p.agencyId === agencyId);
}

export function getAllTags(): { slug: string; name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of mockPackages) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, name: slug.replace(/-/g, " "), count }))
    .sort((a, b) => b.count - a.count);
}

export function getPriceRange(): { min: number; max: number } {
  const prices = mockPackages.map((p) => p.priceLkr);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getAirlines(): string[] {
  return Array.from(new Set(mockPackages.map((p) => p.airline))).sort();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Every distinct departure month actually present among published,
 * active-agency packages — e.g. [{ value: "2026-11", label: "November 2026" }].
 * Built from real package data rather than a static Jan-Dec list, since not
 * every month necessarily has a departure scheduled yet. */
export function getDepartureMonths(): { value: string; label: string }[] {
  const months = new Set(
    publiclyVisiblePackages()
      .flatMap((p) => p.departureDates ?? [])
      .map((d) => d.slice(0, 7)),
  );
  return Array.from(months)
    .sort()
    .map((value) => {
      const [year, month] = value.split("-");
      const label = `${MONTH_NAMES[Number(month) - 1]} ${year}`;
      return { value, label };
    });
}

// -----------------------------------------------------------------------------
// Agencies
// -----------------------------------------------------------------------------

export interface AgencyFilters {
  city?: string;
  badge?: TrustBadgeType;
  query?: string;
  sort?: "rating" | "packages" | "newest" | "name";
}

export async function getAgencies(filters: AgencyFilters = {}): Promise<Agency[]> {
  let list = mockAgencies.filter((a) => a.isActive);
  if (filters.city) list = list.filter((a) => a.city.toLowerCase() === filters.city!.toLowerCase());
  if (filters.badge) list = list.filter((a) => a.badges.includes(filters.badge!));
  if (filters.query) {
    const q = filters.query.toLowerCase();
    list = list.filter((a) => `${a.name} ${a.city} ${a.description}`.toLowerCase().includes(q));
  }
  switch (filters.sort) {
    case "packages":
      list = [...list].sort((a, b) => b.packageCount - a.packageCount);
      break;
    case "newest":
      list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "name":
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating":
    default:
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }
  return list;
}

export async function getAgencyBySlug(slug: string): Promise<Agency | undefined> {
  return mockAgencies.find((a) => a.slug === slug);
}

export async function getAgencyById(id: string): Promise<Agency | undefined> {
  return mockAgencies.find((a) => a.id === id);
}

export function getAgencyCities(): string[] {
  return Array.from(new Set(mockAgencies.map((a) => a.city))).sort();
}

/** Admin-scoped: every agency, active or not — used by /admin/agencies to
 * approve new registrations and manage trust badges. */
export async function getAllAgenciesForAdmin(): Promise<Agency[]> {
  return [...mockAgencies].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

// -----------------------------------------------------------------------------
// Blog
// -----------------------------------------------------------------------------

/** Public listing — published posts only. */
export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  let list = mockBlogPosts.filter((p) => p.status === "published");
  if (category) list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  return [...list].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return mockBlogPosts.find((p) => p.slug === slug && p.status === "published");
}

/** Admin-scoped: every post, draft or published, for the blog CMS. */
export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
  return [...mockBlogPosts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getBlogPostByIdForAdmin(id: string): Promise<BlogPost | undefined> {
  return mockBlogPosts.find((p) => p.id === id);
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  return mockBlogPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => (a.category === post.category ? -1 : 0) - (b.category === post.category ? -1 : 0))
    .slice(0, limit);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(mockBlogPosts.map((p) => p.category)));
}

// -----------------------------------------------------------------------------
// Maulavis
// -----------------------------------------------------------------------------

export interface MaulaviFilters {
  city?: string;
  query?: string;
}

export async function getMaulavis(filters: MaulaviFilters = {}): Promise<Maulavi[]> {
  let list = mockMaulavis;
  if (filters.city) list = list.filter((m) => m.city.toLowerCase() === filters.city!.toLowerCase());
  if (filters.query) {
    const q = filters.query.toLowerCase();
    list = list.filter((m) => `${m.name} ${m.specialization} ${m.city}`.toLowerCase().includes(q));
  }
  return list;
}

export function getMaulaviCities(): string[] {
  return Array.from(new Set(mockMaulavis.map((m) => m.city))).sort();
}

export async function getMaulaviBySlug(slug: string): Promise<Maulavi | undefined> {
  return mockMaulavis.find((m) => m.slug === slug);
}

// -----------------------------------------------------------------------------
// Inquiries (agency/admin dashboards only — never shown publicly)
// -----------------------------------------------------------------------------

export interface InquiryFilters {
  agencyId?: string;
  status?: InquiryStatus;
}

export async function getInquiries(filters: InquiryFilters = {}): Promise<Inquiry[]> {
  let list = mockInquiries;
  if (filters.agencyId) list = list.filter((i) => i.agencyId === filters.agencyId);
  if (filters.status) list = list.filter((i) => i.status === filters.status);
  return [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

// -----------------------------------------------------------------------------
// Site-wide search
// -----------------------------------------------------------------------------

export interface SearchResults {
  packages: Package[];
  agencies: Agency[];
  posts: BlogPost[];
}

export async function searchAll(query: string): Promise<SearchResults> {
  if (!query.trim()) return { packages: [], agencies: [], posts: [] };
  const q = query.toLowerCase();
  return {
    packages: mockPackages.filter((p) =>
      `${p.title} ${p.agency.name} ${p.airline} ${p.tags.join(" ")}`.toLowerCase().includes(q),
    ),
    agencies: mockAgencies.filter((a) => `${a.name} ${a.city}`.toLowerCase().includes(q)),
    posts: mockBlogPosts.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(q)),
  };
}

/** Popular searches shown on the search page / as suggestions — static for
 * now; once analytics_events has volume, derive from logged search terms. */
export const popularSearches = [
  "Premium Umrah packages",
  "Family Umrah package",
  "Budget Umrah Colombo",
  "5 star Haram view hotel",
  "Ramadan Umrah packages",
  "VIP Umrah",
];
