export interface CityOption {
  name: string;
  lat: number;
  lng: number;
}

/** Sri Lankan cities offered as a fallback when the visitor doesn't share
 * their location (or is browsing from elsewhere and wants Sri Lanka times
 * for planning purposes). Sri-Lanka-only — Makkah/Madinah used to be
 * appended here, which put them under "Sri Lanka" in the picker; that was
 * a bug, not a feature. They're reachable correctly via the worldwide
 * picker's Saudi Arabia city search instead (it already renames "Mecca"/
 * "Medina" to "Makkah"/"Madinah" — see DISPLAY_OVERRIDES in
 * src/app/api/cities/route.ts). */
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
];

/** Every country offered in the "Other countries" filter — all 191 real,
 * currently-existing countries/territories that have city-level data in
 * the `country-state-city` dataset (src/app/api/cities/route.ts), which is
 * the same offline, MIT-licensed worldwide cities dataset the search box
 * itself queries. Sri Lanka is excluded since it has its own dedicated tab.
 * A handful of small territories (Hong Kong, Macau, Monaco, Puerto Rico,
 * Vatican City, etc.) aren't listed because that dataset has no city-level
 * entries for them — including them would be a picker that always says "no
 * matching city". The most Umrah/Hajj-relevant countries are ordered first
 * for convenience; the rest follow alphabetically. Aladhan's timingsByCity
 * endpoint geocodes the city/country pair itself, so this list is just a
 * friendly picklist — not a source of location data on its own. */
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
  "Albania",
  "Andorra",
  "Angola",
  "Antigua And Barbuda",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Barbados",
  "Belarus",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Cote D'Ivoire (Ivory Coast)",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji Islands",
  "Finland",
  "Gabon",
  "Georgia",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "Israel",
  "Jamaica",
  "Japan",
  "Kazakhstan",
  "Kiribati",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lesotho",
  "Liberia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nicaragua",
  "Niger",
  "North Korea",
  "Palau",
  "Panama",
  "Papua new Guinea",
  "Paraguay",
  "Peru",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts And Nevis",
  "Saint Lucia",
  "Saint Vincent And The Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "South Korea",
  "South Sudan",
  "Suriname",
  "Swaziland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "The Bahamas",
  "The Gambia",
  "Togo",
  "Tonga",
  "Trinidad And Tobago",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
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

/** Rough bounding box for Saudi Arabia — deliberately loose (it also
 * covers slivers of neighboring countries near the border). Good enough
 * to pick a calculation method (see `resolveMethod` below); nothing here
 * relies on it being an exact border. */
function isRoughlyInSaudiArabia(lat: number, lng: number) {
  return lat >= 16 && lat <= 32.5 && lng >= 34.5 && lng <= 55.7;
}

/**
 * Aladhan supports several official calculation methods; which one is
 * "correct" depends on where you are. We verified live against Aladhan
 * itself (2026-08-29, Makkah): method 3 (Muslim World League, the sensible
 * global default) gives Isha 19:51, while method 4 (Umm Al-Qura University,
 * Makkah — Saudi Arabia's own official method, which fixes Isha at a set
 * interval after Maghrib instead of an angle-based estimate) gives Isha
 * 20:10 — a 19-minute gap. That's worth getting right exactly where this
 * site's pilgrims care most, so Saudi Arabia gets its own official method
 * and everywhere else keeps MWL.
 */
function resolveMethod(country?: string, lat?: number, lng?: number): 3 | 4 {
  const inSaudi =
    country?.trim().toLowerCase() === "saudi arabia" ||
    (lat != null && lng != null && isRoughlyInSaudiArabia(lat, lng));
  return inSaudi ? 4 : 3;
}

/**
 * Aladhan API (https://aladhan.com/prayer-times-api) — free, no API key.
 */
export async function fetchPrayerTimes(lat: number, lng: number, date = new Date()) {
  const dateStr = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const method = resolveMethod(undefined, lat, lng);
  const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${method}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times");
  const json = await res.json();
  return json.data.timings as PrayerTimings;
}

/**
 * Aladhan's "timingsByCity" endpoint — same free API, but takes a city +
 * country name directly and geocodes it on their end. Used for the
 * worldwide "other countries" filter so we're never guessing coordinates
 * for a city ourselves. (Its response `meta.latitude/longitude` sometimes
 * echoes back a placeholder value regardless of the city searched — a
 * cosmetic quirk in Aladhan's own metadata reporting, confirmed not to
 * affect the actual timings: cross-checked against real coordinates for
 * both Makkah and a smaller city, Abbottabad, and the returned times
 * matched exactly. We never read that field, so it's invisible here.)
 */
export async function fetchPrayerTimesByCity(city: string, country: string, date = new Date()) {
  const dateStr = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const method = resolveMethod(country);
  const url = `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch prayer times");
  const json = await res.json();
  if (json.code !== 200) throw new Error(json.data || "Failed to fetch prayer times");
  return json.data.timings as PrayerTimings;
}
