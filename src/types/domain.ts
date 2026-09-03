/**
 * Core domain types, mirroring the Supabase/Postgres schema in
 * /supabase/migrations. Kept in one place so UI, mock data, and future
 * server queries all share the same shape.
 */

export type TrustBadgeType =
  | "gold_verified"
  | "featured"
  | "premium_partner"
  | "recommended"
  | "new_agency";

export type UserRole =
  | "super_admin"
  | "admin"
  | "content_manager"
  | "travel_agency"
  | "moderator"
  | "editor";

export interface Agency {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  coverImageUrl?: string;
  description: string;
  city: string;
  address?: string;
  phone: string;
  whatsapp: string;
  /** Optional — some agencies only list phone/WhatsApp in their public
   * ads, and this platform never invents a contact email an agency didn't
   * provide. An agency can add a real one later via its own profile form
   * (see agency-profile.ts, which still requires a valid email there). */
  email?: string;
  website?: string;
  lat?: number;
  lng?: number;
  badges: TrustBadgeType[];
  yearsActive?: number;
  packageCount: number;
  rating?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Package {
  id: string;
  slug: string;
  agencyId: string;
  agency: Pick<Agency, "id" | "slug" | "name" | "logoUrl" | "badges" | "whatsapp" | "phone">;
  title: string;
  coverImageUrl: string;
  images: string[];
  priceLkr: number;
  priceUsd?: number;
  durationDays: number;
  departureCity: string;
  airline: string;
  makkahHotel: string;
  /** Optional — omitted when the agency's ad/listing didn't state a star
   * rating rather than guessing one. */
  makkahHotelStars?: number;
  /** Optional, agency-supplied — powers the walking-route-to-Haram map on
   * the package page. Never geocoded/inferred automatically. */
  makkahHotelLat?: number;
  makkahHotelLng?: number;
  madinahHotel: string;
  madinahHotelStars?: number;
  madinahHotelLat?: number;
  madinahHotelLng?: number;
  mealPlan?: string;
  transport?: string;
  visaIncluded: boolean;
  groupType: "individual" | "group" | "family" | "vip";
  category: "economy" | "standard" | "premium" | "luxury";
  tags: string[];
  inclusions: string[];
  exclusions: string[];
  brochureUrl?: string;
  /** Every scheduled departure date for this package, all at the price
   * above ("YYYY-MM-DD" each). An agency lists a date here only when it
   * shares this package's rate — a date at a different price becomes its
   * own separate package listing instead. Empty when no date is scheduled
   * yet. Not assumed sorted — read via `nextDeparture()` in `@/lib/format`. */
  departureDates?: string[];
  seatsAvailable?: number;
  viewCount: number;
  clickCount: number;
  compareCount: number;
  contactCount: number;
  isFeatured: boolean;
  /** Draft packages never appear publicly — lets an agency prepare a
   * listing, or an admin unpublish, without deleting. Defaults to true. */
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Article body as an array of paragraphs (rendered as separate <p> tags). */
  content: string[];
  coverImageUrl: string;
  category: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  status: BlogPostStatus;
}

export type InquiryChannel = "whatsapp" | "phone" | "email" | "form";
export type InquiryStatus = "new" | "contacted" | "closed";

export interface Inquiry {
  id: string;
  agencyId: string;
  agencyName: string;
  packageId?: string;
  packageTitle?: string;
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  channel: InquiryChannel;
  status: InquiryStatus;
  createdAt: string;
}

export interface Maulavi {
  id: string;
  slug: string;
  name: string;
  photoUrl: string;
  specialization: string;
  city: string;
  languages: string[];
  yearsExperience: number;
  phone: string;
  whatsapp: string;
}
