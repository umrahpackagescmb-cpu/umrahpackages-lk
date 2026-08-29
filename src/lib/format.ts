export function formatLkr(amount: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-LK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Picks which of a package's several departure dates to show as "the"
 * departure date on cards and previews — the soonest one that hasn't
 * already passed, or (if every listed date is in the past) simply the
 * soonest one overall, so a stale listing never shows nothing. Returns
 * undefined only when no dates are set at all. */
export function nextDeparture(dates: string[] | undefined, now: Date = new Date()): string | undefined {
  if (!dates || dates.length === 0) return undefined;
  const sorted = [...dates].sort();
  const today = now.toISOString().slice(0, 10);
  return sorted.find((d) => d >= today) ?? sorted[0];
}
