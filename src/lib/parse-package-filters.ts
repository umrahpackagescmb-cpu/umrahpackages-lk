import type { PackageFilters } from "@/lib/data";

export type SearchParams = Record<string, string | string[] | undefined>;

export function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function all(value: string | string[] | undefined) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/** Shared by /packages and /compare — both list pages filter the same
 * package catalogue via the same URL query params, so they parse those
 * params the same way. */
export function parsePackageFilters(sp: SearchParams): PackageFilters {
  return {
    category: all(sp.category),
    groupType: all(sp.groupType),
    minPrice: first(sp.minPrice) ? Number(first(sp.minPrice)) : undefined,
    maxPrice: first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined,
    minStars: first(sp.minStars) ? Number(first(sp.minStars)) : undefined,
    query: first(sp.query),
    sort: (first(sp.sort) as PackageFilters["sort"]) ?? "popular",
  };
}
