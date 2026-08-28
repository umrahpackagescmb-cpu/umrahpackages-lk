import { islamicNamesData, type IslamicNameEntry, type NameGender } from "./names-data";

export type { IslamicNameEntry, NameGender };
export { islamicNamesData };

export interface NameFilters {
  query?: string;
  gender?: NameGender | "all";
  letter?: string; // uppercase single letter, or "all"
  origin?: string; // or "all"
  minLength?: number;
  maxLength?: number;
}

/** All distinct starting letters present in the dataset, with a count each — powers the A-Z filter pills. */
export function getStartingLetters(): { letter: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const n of islamicNamesData) {
    counts.set(n.startingLetter, (counts.get(n.startingLetter) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, count]) => ({ letter, count }));
}

/** All distinct origins present in the dataset, sorted alphabetically — powers the origin filter. */
export function getOrigins(): string[] {
  return Array.from(new Set(islamicNamesData.map((n) => n.origin))).sort();
}

export function filterNames(filters: NameFilters): IslamicNameEntry[] {
  const q = filters.query?.trim().toLowerCase() ?? "";
  return islamicNamesData.filter((n) => {
    if (filters.gender && filters.gender !== "all" && n.gender !== filters.gender) return false;
    if (filters.letter && filters.letter !== "all" && n.startingLetter !== filters.letter) return false;
    if (filters.origin && filters.origin !== "all" && n.origin !== filters.origin) return false;
    if (typeof filters.minLength === "number" && n.letterCount < filters.minLength) return false;
    if (typeof filters.maxLength === "number" && n.letterCount > filters.maxLength) return false;
    if (q && !n.name.toLowerCase().includes(q) && !n.meaning.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function getNameBySlug(slug: string): IslamicNameEntry | undefined {
  return islamicNamesData.find((n) => n.slug === slug);
}

/** A handful of related names — same starting letter and gender first, then just same gender — for the detail page's "similar names" section. */
export function getSimilarNames(entry: IslamicNameEntry, limit = 6): IslamicNameEntry[] {
  const sameLetterAndGender = islamicNamesData.filter(
    (n) => n.slug !== entry.slug && n.startingLetter === entry.startingLetter && n.gender === entry.gender,
  );
  const sameGender = islamicNamesData.filter(
    (n) => n.slug !== entry.slug && n.gender === entry.gender && n.startingLetter !== entry.startingLetter,
  );
  return [...sameLetterAndGender, ...sameGender].slice(0, limit);
}

export function getPopularNames(gender?: NameGender, limit = 12): IslamicNameEntry[] {
  return islamicNamesData
    .filter((n) => n.isPopular && (!gender || n.gender === gender))
    .slice(0, limit);
}
