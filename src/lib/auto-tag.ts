import type { PackageFormValues } from "@/lib/validations/package";

/**
 * Derives a handful of filter/search tags from a package's own attributes,
 * so every listing gets a baseline set of tags even if the agency didn't
 * type any in manually. Merged with (never replacing) the agency's own
 * comma-separated tags — see TODO.md's "automation engine: auto-tagging".
 */
export function deriveAutoTags(values: Pick<PackageFormValues,
  "priceLkr" | "makkahHotelStars" | "madinahHotelStars" | "groupType" | "category" | "visaIncluded"
>): string[] {
  const tags: string[] = [];

  if (values.priceLkr < 250_000) tags.push("budget-friendly");
  else if (values.priceLkr >= 600_000) tags.push("premium-pick");

  const minStars = Math.min(values.makkahHotelStars, values.madinahHotelStars);
  if (minStars >= 5) tags.push("5-star");
  else if (minStars <= 2) tags.push("economy-stay");

  if (values.groupType === "family") tags.push("family-friendly");
  if (values.groupType === "vip") tags.push("vip");
  if (values.groupType === "individual") tags.push("private-departure");

  if (values.category === "luxury") tags.push("luxury");
  if (values.visaIncluded) tags.push("visa-included");

  return tags;
}

/** Splits the form's comma-separated tags string, merges with derived tags,
 * and de-duplicates (case-insensitive) into a clean slug-like array. */
export function buildPackageTags(values: PackageFormValues): string[] {
  const manual = (values.tags ?? "")
    .split(",")
    .map((t) => t.trim().toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean);

  const derived = deriveAutoTags(values);

  return Array.from(new Set([...manual, ...derived]));
}
