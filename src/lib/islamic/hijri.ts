import { toHijri, toGregorian } from "hijri-converter";

export const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
] as const;

export interface HijriDate {
  hy: number;
  hm: number;
  hd: number;
}

export function gregorianToHijri(date: Date): HijriDate {
  return toHijri(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function hijriToGregorian(hy: number, hm: number, hd: number): Date {
  const { gy, gm, gd } = toGregorian(hy, hm, hd);
  return new Date(gy, gm - 1, gd);
}

export function formatHijri({ hy, hm, hd }: HijriDate) {
  return `${hd} ${HIJRI_MONTHS[hm - 1]} ${hy} AH`;
}

/** Days in a given Hijri month (by converting to the 1st of the next month
 * and back — hijri-converter doesn't expose a length function directly). */
export function daysInHijriMonth(hy: number, hm: number): number {
  const nextHy = hm === 12 ? hy + 1 : hy;
  const nextHm = hm === 12 ? 1 : hm + 1;
  const thisMonthStart = hijriToGregorian(hy, hm, 1);
  const nextMonthStart = hijriToGregorian(nextHy, nextHm, 1);
  return Math.round((+nextMonthStart - +thisMonthStart) / 86_400_000);
}

/** Next occurrence (today or in the future) of a given Hijri month/day,
 * e.g. (9, 1) for the start of Ramadan or (12, 9) for the Day of Arafah. */
export function nextHijriOccurrence(targetMonth: number, targetDay: number, from: Date = new Date()): Date {
  const currentHijri = gregorianToHijri(from);
  let year = currentHijri.hy;
  let candidate = hijriToGregorian(year, targetMonth, targetDay);

  // Normalize `from` to midnight so "today" counts as not-yet-passed.
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (candidate < fromMidnight) {
    year += 1;
    candidate = hijriToGregorian(year, targetMonth, targetDay);
  }
  return candidate;
}

export function daysUntil(target: Date, from: Date = new Date()): number {
  const fromMidnight = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((+targetMidnight - +fromMidnight) / 86_400_000);
}
