/**
 * fawazahmed0/currency-api (https://github.com/fawazahmed0/exchange-api) —
 * genuinely free exchange rate API, no API key, no rate limit, updated
 * daily. Called directly from the browser, same "try primary CDN, fall
 * back to the secondary CDN" pattern used by fetchWalkingRoute in
 * landmarks.ts. Never fabricate a rate: if both CDNs fail, callers must
 * surface an error state rather than showing a made-up number.
 */

const PRIMARY_BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api";
const FALLBACK_BASE = "https://latest.currency-api.pages.dev";

/**
 * Fetches the full rates table for a base currency (e.g. "usd" -> rates for
 * every other currency, keyed by lowercase currency code) for a given
 * "date" segment — either "latest" or a "YYYY-MM-DD" historical date.
 * Tries the jsDelivr CDN first, then the Cloudflare Pages mirror. Throws if
 * both fail so the caller can show a genuine error state.
 */
async function fetchRatesTable(base: string, date: string): Promise<Record<string, number>> {
  const lowerBase = base.toLowerCase();
  const urls = [
    `${PRIMARY_BASE}@${date}/v1/currencies/${lowerBase}.json`,
    `${FALLBACK_BASE}/v1/currencies/${lowerBase}.json`,
  ];

  let lastError: unknown = null;
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        lastError = new Error(`Currency API responded ${res.status}`);
        continue;
      }
      const json = await res.json();
      const table = json?.[lowerBase];
      if (!table || typeof table !== "object") {
        lastError = new Error("Unexpected currency API response shape");
        continue;
      }
      return table as Record<string, number>;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to fetch exchange rates");
}

/**
 * Fetches today's live exchange rates for the given base currency against
 * every other currency the API supports. Throws on total failure (both the
 * primary and fallback CDN unreachable) — callers should show an error
 * state with a retry, never a hardcoded rate.
 */
export async function fetchRates(base: string): Promise<Record<string, number>> {
  return fetchRatesTable(base, "latest");
}

/**
 * Fetches a single historical rate (base -> target) for a specific
 * "YYYY-MM-DD" date, for the 7-day trend sparkline. Returns null on any
 * failure instead of throwing, so one bad day doesn't take down the whole
 * trend — this is a "best effort" secondary feature.
 */
export async function fetchHistoricalRate(
  base: string,
  target: string,
  isoDate: string,
): Promise<number | null> {
  try {
    const table = await fetchRatesTable(base, isoDate);
    const rate = table[target.toLowerCase()];
    return typeof rate === "number" ? rate : null;
  } catch {
    return null;
  }
}
