export type CrowdLevel = "Very High" | "High" | "Moderate" | "Low";
export type PriceImpact = "Higher" | "Average" | "Lower";

export interface SeasonGuide {
  id: string;
  name: string;
  monthsLabel: string;
  crowdLevel: CrowdLevel;
  priceImpact: PriceImpact;
  weatherNote: string;
  bestFor: string;
}

/**
 * Season-by-season guide based on well-known, recurring annual patterns —
 * the Islamic calendar's fixed religious seasons (Ramadan, the months just
 * after Hajj) and the Gregorian calendar's fixed climate seasons. This is
 * NOT live or real-time crowd data — there is no public sensor feed of
 * actual crowd counts in Makkah/Madinah for a site like this to draw on.
 * Treat every field here as a general, qualitative rule of thumb.
 */
export const seasonGuides: SeasonGuide[] = [
  {
    id: "ramadan",
    name: "Ramadan (esp. the last 10 nights)",
    monthsLabel: "Islamic calendar — shifts ~10-11 days earlier each Gregorian year",
    crowdLevel: "Very High",
    priceImpact: "Higher",
    weatherNote:
      "Depends entirely on which Gregorian season Ramadan falls in that year — check the current forecast closer to your dates.",
    bestFor:
      "Pilgrims who specifically want the spiritual reward and atmosphere of performing Umrah during Ramadan, and who are prepared for very large crowds, especially around Laylatul Qadr.",
  },
  {
    id: "post-hajj",
    name: "Post-Hajj months (roughly Muharram-Safar)",
    monthsLabel: "The 1-2 Islamic months right after Hajj",
    crowdLevel: "Low",
    priceImpact: "Lower",
    weatherNote:
      "Varies by Gregorian year since the Islamic calendar is lunar — could be any season's weather, so check conditions for your specific dates.",
    bestFor:
      "Pilgrims prioritising a calmer, less crowded experience with more breathing room around the Kaaba, often at more favourable package prices.",
  },
  {
    id: "winter",
    name: "General winter",
    monthsLabel: "Roughly November-February",
    crowdLevel: "Moderate",
    priceImpact: "Average",
    weatherNote: "Cooler and more comfortable, typically in the 20s°C — a popular reason to travel these months.",
    bestFor:
      "Pilgrims who want milder weather for long hours of worship and walking, without the peak-season crowding of Ramadan or school holidays.",
  },
  {
    id: "summer",
    name: "General summer",
    monthsLabel: "Roughly May-September",
    crowdLevel: "Moderate",
    priceImpact: "Lower",
    weatherNote: "Very hot, regularly past 40°C with intense direct sun — hydration and shade planning are essential.",
    bestFor:
      "Pilgrims flexible on comfort who want to avoid peak pricing and crowds, and who plan carefully around the heat (see our weather guide).",
  },
];

/** Rough, commonly-reported ranges for how long the Tawaf + Sa'i sequence takes — not a measurement, not a calculator. */
export interface CrowdTimeRange {
  id: string;
  label: string;
  range: string;
  note: string;
}

export const tawafSaiTimeRanges: CrowdTimeRange[] = [
  {
    id: "light",
    label: "Light-to-moderate crowds",
    range: "Roughly 45-90 minutes total",
    note: "Typical for the post-Hajj months, general winter, and most of the year outside major peaks — commonly reported by pilgrims completing both Tawaf (7 circuits) and Sa'i (7 legs) at a normal pace.",
  },
  {
    id: "peak",
    label: "Peak crowds (e.g. Ramadan's last 10 nights)",
    range: "Can stretch to several hours",
    note: "Sheer volume of people slows movement dramatically, especially close to the Kaaba during the last 10 nights of Ramadan or around the Hajj period. Some pilgrims choose to perform Tawaf on an upper floor for more space.",
  },
];
