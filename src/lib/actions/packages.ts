"use server";

import { isSupabaseConfigured } from "@/lib/auth/session";
import type { ActionResult } from "@/lib/actions/agencies";
import type { PackageFormValues } from "@/lib/validations/package";
import { buildPackageTags } from "@/lib/auto-tag";

export interface SavePackageResult extends ActionResult {
  packageId?: string;
}

function toRow(agencyId: string, values: PackageFormValues) {
  return {
    agency_id: agencyId,
    title: values.title,
    price_lkr: values.priceLkr,
    price_usd: values.priceUsd || null,
    duration_days: values.durationDays,
    departure_city: values.departureCity,
    airline: values.airline,
    makkah_hotel: values.makkahHotel,
    makkah_hotel_stars: values.makkahHotelStars,
    makkah_hotel_lat: values.makkahHotelLat || null,
    makkah_hotel_lng: values.makkahHotelLng || null,
    madinah_hotel: values.madinahHotel,
    madinah_hotel_stars: values.madinahHotelStars,
    madinah_hotel_lat: values.madinahHotelLat || null,
    madinah_hotel_lng: values.madinahHotelLng || null,
    meal_plan: values.mealPlan || null,
    transport: values.transport || null,
    visa_included: values.visaIncluded,
    group_type: values.groupType,
    category: values.category,
    departure_date: values.departureDate || null,
    seats_available: values.seatsAvailable || null,
    inclusions: values.inclusions.split("\n").map((s) => s.trim()).filter(Boolean),
    exclusions: (values.exclusions || "").split("\n").map((s) => s.trim()).filter(Boolean),
    // Agency-entered tags merged with a few derived ones (price band, star
    // rating, group type) so every listing is filterable/searchable even
    // if the agency didn't type any tags in — see src/lib/auto-tag.ts.
    tags: buildPackageTags(values),
    is_published: values.isPublished,
  };
}

/** Agency-only — creates a new package under the caller's own agency. RLS
 * ("packages: owner manages own") already restricts this to the signed-in
 * agency's own agency_id; `agencyId` here just picks which row to write in
 * demo mode / before that RLS context exists client-side. */
export async function createPackage(agencyId: string, values: PackageFormValues): Promise<SavePackageResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const slug = `${values.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60)}-${Date.now().toString(36)}`;
    const { data, error } = await supabase
      .from("packages")
      .insert({ ...toRow(agencyId, values), slug })
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: error?.message ?? "Couldn't create the package." };
    return { ok: true, packageId: data.id };
  } catch (error) {
    console.error("createPackage failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function updatePackage(
  packageId: string,
  agencyId: string,
  values: PackageFormValues,
): Promise<SavePackageResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("packages").update(toRow(agencyId, values)).eq("id", packageId);
    if (error) return { ok: false, error: error.message };
    return { ok: true, packageId };
  } catch (error) {
    console.error("updatePackage failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function setPackagePublished(packageId: string, isPublished: boolean): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("packages").update({ is_published: isPublished }).eq("id", packageId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("setPackagePublished failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function setPackageFeatured(packageId: string, isFeatured: boolean): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("packages").update({ is_featured: isFeatured }).eq("id", packageId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("setPackageFeatured failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function deletePackage(packageId: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("packages").delete().eq("id", packageId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("deletePackage failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
