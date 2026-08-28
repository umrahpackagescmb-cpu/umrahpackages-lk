/**
 * Data/logic for the Smart Packing Checklist Generator.
 *
 * A base checklist always applies (documents, money/cards, essentials),
 * plus additive items unlocked by the traveler's selected profile(s).
 * Profiles are combinable checkboxes, not mutually exclusive — e.g. a
 * traveler can select "female" + "elderly" and get both sets of items.
 *
 * This is general, well-established packing guidance for an Umrah trip —
 * nothing medical or brand-specific is asserted; where a health item is
 * listed (e.g. a blood pressure monitor) it's phrased as "if applicable"
 * and travelers should confirm anything medical with their own doctor.
 */

export type TravelerProfile =
  | "male"
  | "female"
  | "elderly"
  | "family"
  | "children"
  | "wheelchair";

export interface ChecklistItem {
  /** Stable id used as the localStorage key for "packed" state. */
  id: string;
  label: string;
  note?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ProfileOption {
  value: TravelerProfile;
  label: string;
  description: string;
}

export const PROFILE_OPTIONS: ProfileOption[] = [
  { value: "male", label: "Male traveler", description: "Ihram cloth, money belt & related essentials" },
  { value: "female", label: "Female traveler", description: "Abayas, headscarves & related essentials" },
  { value: "elderly", label: "Elderly traveler", description: "Comfort, mobility & medication essentials" },
  { value: "family", label: "Traveling as a family", description: "Group travel extras" },
  { value: "children", label: "Traveling with children", description: "Kid-specific essentials" },
  { value: "wheelchair", label: "Wheelchair user", description: "Mobility aid & assistance essentials" },
];

/** Always included, regardless of which profiles are selected. */
const BASE_CHECKLIST: ChecklistCategory[] = [
  {
    id: "documents",
    title: "Documents",
    items: [
      { id: "doc-passport", label: "Passport (valid 6+ months) & photocopies" },
      { id: "doc-visa", label: "Umrah visa printout / confirmation" },
      { id: "doc-tickets", label: "Flight tickets & itinerary" },
      { id: "doc-hotel", label: "Hotel/package booking confirmations" },
      { id: "doc-photos", label: "Passport-sized photographs (spares)" },
      { id: "doc-vaccination", label: "Vaccination certificate (e.g. meningitis, if required)" },
      { id: "doc-insurance", label: "Travel insurance documents" },
      { id: "doc-emergency", label: "Emergency contact list (family, embassy, tour operator)" },
    ],
  },
  {
    id: "money",
    title: "Money & Cards",
    items: [
      { id: "money-cash-sar", label: "Cash in Saudi Riyals (small denominations)" },
      { id: "money-cash-local", label: "Some cash in local currency" },
      { id: "money-cards", label: "Debit/credit cards (inform your bank of travel)" },
      { id: "money-pouch", label: "Secure money pouch/wallet" },
    ],
  },
  {
    id: "essentials",
    title: "General Essentials",
    items: [
      { id: "ess-phone", label: "Phone & charger" },
      { id: "ess-adapter", label: "Universal travel adapter/power bank" },
      { id: "ess-medication", label: "Personal daily medication (in hand luggage)" },
      { id: "ess-firstaid", label: "Small first-aid kit (plasters, pain relief, rehydration salts)" },
      { id: "ess-toiletries", label: "Unscented toiletries (fragrance-free, for Ihram compliance)" },
      { id: "ess-sunscreen", label: "Unscented sunscreen & lip balm" },
      { id: "ess-water-bottle", label: "Reusable water bottle" },
      { id: "ess-comfortable-shoes", label: "Comfortable walking sandals/shoes" },
      { id: "ess-prayer-mat", label: "Lightweight travel prayer mat" },
      { id: "ess-dua-book", label: "Small dua/Quran booklet or app downloaded offline" },
      { id: "ess-luggage-tags", label: "Luggage tags with your name & contact details" },
      { id: "ess-laundry-bag", label: "Small laundry/wet-clothes bag" },
    ],
  },
];

/** Additive items unlocked by each selected profile. */
const PROFILE_ITEMS: Record<TravelerProfile, ChecklistCategory> = {
  male: {
    id: "profile-male",
    title: "For Male Travelers",
    items: [
      { id: "male-ihram", label: "2x Ihram cloth sets (2 unstitched white sheets each)" },
      { id: "male-money-belt", label: "Money belt (worn under Ihram)" },
      { id: "male-sandals", label: "Slip-on sandals (easy on/off for Ihram)" },
    ],
  },
  female: {
    id: "profile-female",
    title: "For Female Travelers",
    items: [
      { id: "female-abaya", label: "Modest, breathable abayas (2–3, loose-fitting)" },
      { id: "female-scarves", label: "Headscarves (several, breathable fabric)" },
      { id: "female-pins", label: "Extra safety pins/scarf pins" },
    ],
  },
  elderly: {
    id: "profile-elderly",
    title: "For Elderly Travelers",
    items: [
      { id: "elderly-socks", label: "Compression socks (for long flights & standing)" },
      { id: "elderly-meds", label: "Prescription medication, packed with copies of prescriptions" },
      { id: "elderly-cane", label: "Portable folding cane or foldable stool" },
      { id: "elderly-bp-monitor", label: "Blood pressure monitor, if you routinely track it" },
      { id: "elderly-rest-shoes", label: "Extra pair of comfortable shoes for rest days" },
    ],
  },
  family: {
    id: "profile-family",
    title: "For Families",
    items: [
      { id: "family-entertainment", label: "Entertainment for kids (books, tablet, quiet games)" },
      { id: "family-kid-ihram", label: "Kid-sized Ihram or modest travel clothing" },
      { id: "family-snacks", label: "Familiar snacks for the journey" },
      { id: "family-wipes", label: "Wet wipes & hand sanitizer" },
      { id: "family-lost-card", label: "\"If lost\" card in each child's pocket (hotel name & contact number)" },
    ],
  },
  children: {
    id: "profile-children",
    title: "Traveling With Children",
    items: [
      { id: "children-entertainment", label: "Entertainment for kids (books, tablet, quiet games)" },
      { id: "children-clothing", label: "Kid-sized Ihram or modest clothing, plus spares" },
      { id: "children-snacks", label: "Familiar snacks for the journey" },
      { id: "children-wipes", label: "Wet wipes & hand sanitizer" },
      { id: "children-lost-card", label: "\"If lost\" card in child's pocket (hotel name & contact number)" },
    ],
  },
  wheelchair: {
    id: "profile-wheelchair",
    title: "For Wheelchair Users",
    items: [
      { id: "wheelchair-kit", label: "Mobility aid maintenance kit (basic tools, spare parts)" },
      { id: "wheelchair-letter", label: "Doctor's letter describing the mobility device & any needs" },
      { id: "wheelchair-assistance", label: "Note: request airport wheelchair assistance in advance with your airline" },
      { id: "wheelchair-cushion", label: "Portable cushion for extra comfort" },
    ],
  },
};

/**
 * Builds a combined, de-duplicated checklist from the base list plus the
 * items for every selected profile, grouped by category in a stable order.
 */
export function buildChecklist(profiles: TravelerProfile[]): ChecklistCategory[] {
  const categories: ChecklistCategory[] = BASE_CHECKLIST.map((c) => ({
    id: c.id,
    title: c.title,
    items: [...c.items],
  }));

  const seenIds = new Set(categories.flatMap((c) => c.items.map((i) => i.id)));

  for (const profile of PROFILE_OPTIONS.map((p) => p.value)) {
    if (!profiles.includes(profile)) continue;
    const category = PROFILE_ITEMS[profile];
    const newItems = category.items.filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });
    if (newItems.length > 0) {
      categories.push({ id: category.id, title: category.title, items: newItems });
    }
  }

  return categories;
}

export function countItems(categories: ChecklistCategory[]): number {
  return categories.reduce((sum, c) => sum + c.items.length, 0);
}
