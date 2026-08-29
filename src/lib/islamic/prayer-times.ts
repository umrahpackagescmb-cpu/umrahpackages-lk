export interface CityOption {
  name: string;
  lat: number;
  lng: number;
}

/** Sri Lankan cities offered as a fallback when the visitor doesn't share
 * their location (or is browsing from elsewhere and wants Sri Lanka times
 * for planning purposes). */
export const SRI_LANKA_CITIES: CityOption[] = [
  { name: "Colombo", lat: 6.9271, lng: 79.8612 },
  { name: "Kandy", lat: 7.2906, lng: 80.6337 },
  { name: "Galle", lat: 6.0535, lng: 80.221 },
  { name: "Jaffna", lat: 9.6615, lng: 80.0255 },
  { name: "Kurunegala", lat: 7.4863, lng: 80.3647 },
  { name: "Batticaloa", lat: 7.7102, lng: 81.6924 },
  { name: "Trincomalee", lat: 8.5874, lng: 81.2152 },
  { name: "Matara", lat: 5.9549, lng: 80.5549 },
  { name: "Negombo", lat: 7.2083, lng: 79.8358 },
  { name: "Kalmunai", lat: 7.4167, lng: 81.8167 },
  { name: "Makkah, Saudi Arabia", lat: 21.4225, lng: 39.8262 },
  { name: "Madinah, Saudi Arabia", lat: 24.5247, lng: 39.5692 },
];

/** Common countries offered in the "Other countries" filter. Aladhan's
 * timingsByCity endpoint geocodes the city/country pair itself, so this list
 * is just a friendly picklist — not a source of location data. */
export const COUNTRIES: string[] = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Lebanon",
  "Turkey",
  "Egypt",
  "Morocco",
  "Tunisia",
  "Algeria",
  "Libya",
  "Sudan",
  "Iraq",
  "Iran",
  "Pakistan",
  "India",
  "Bangladesh",
  "Afghanistan",
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Brunei",
  "Thailand",
  "Philippines",
  "China",
  "Maldives",
  "Nepal",
  "United Kingdom",
  "Ireland",
  "France",
  "Germany",
  "Netherlands",
  "Belgium",
  "Spain",
  "Italy",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "United States",
  "Canada",
  "Australia",
  "New Zealand",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Somalia",
];

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export const PRAYER_LABELS: { key: keyof PrayerTimings; label: string }[] = [
  { key: "Fajr", label: "Fajr" },
  { key: "Sunrise", label: "Sunrise" },
  { key: "Dhuhr", label: "Dhuhr" },
  { key: "Asr", label: "Asr" },
  { key: "Maghrib", label: "Maghrib" },
  { key: "Isha", label: "Isha" },
];

/**
 * Aladhan API (https://aladhan.com/prayer-times-api) — free, no API key.
 * Method 3 = Muslim World League, a widely-used global default.
 */
export async function fetchPrayerTimes(lat: number, lng: number, date = new Date()) {
  const dateStr = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=3`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times");
  const json = await res.json();
  return json.data.timings as PrayerTimings;
}

/**
 * Aladhan's "timingsByCity" endpoint — same free API, but takes a city +
 * country name directly and geocodes it on their end. Used for the
 * worldwide "other countries" filter so we're never guessing coordinates
 * for a city ourselves.
 */
export async function fetchPrayerTimesByCity(city: string, country: string, date = new Date()) {
  const dateStr = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=3`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times");
  const json = await res.json();
  if (json.code !== 200) throw new Error(json.data || "Failed to fetch prayer times");
  return json.data.timings as PrayerTimings;
}
