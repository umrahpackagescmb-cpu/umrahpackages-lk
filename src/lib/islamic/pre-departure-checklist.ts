/**
 * Data for the Pre-Departure Checklist.
 *
 * This is the admin/logistics counterpart to the Packing Checklist — it's
 * about tasks to sort out before you fly (documents, money, connectivity,
 * home arrangements), not physical items to pack in your bag.
 *
 * These are general, well-established action prompts for any Umrah trip —
 * nothing here asserts a specific current price, exact vaccination
 * requirement or bank policy as fixed fact. Travelers should confirm
 * anything time-sensitive (visa rules, vaccination requirements, bank
 * terms) with their agency, embassy or bank directly.
 */

export interface ChecklistLink {
  href: string;
  label: string;
}

export interface ChecklistItem {
  /** Stable id used as the localStorage key for "done" state. */
  id: string;
  label: string;
  /** Optional link to a related tool on this site, rendered after the label. */
  link?: ChecklistLink;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export const PRE_DEPARTURE_CHECKLIST: ChecklistCategory[] = [
  {
    id: "documents",
    title: "Documents",
    items: [
      { id: "doc-passport-validity", label: "Check your passport is valid for at least 6 months beyond your travel dates" },
      { id: "doc-visa-confirmed", label: "Confirm your Umrah visa has been issued and the details match your passport exactly" },
      { id: "doc-vaccination", label: "Arrange your Meningitis (ACYW135) vaccination certificate, if your route requires one" },
      { id: "doc-copies", label: "Make printed and digital copies of your passport, visa, vaccination certificate and tickets — and store them separately from the originals" },
      { id: "doc-emergency-contacts", label: "Note down embassy and agency emergency contact numbers somewhere other than just your phone" },
    ],
  },
  {
    id: "health-insurance",
    title: "Health & Insurance",
    items: [
      { id: "health-insurance", label: "Consider travel insurance that covers your trip dates and any pre-existing conditions" },
      { id: "health-medication", label: "Pack enough regular prescription medication for the whole trip, plus a few spare days, along with a copy of the prescription" },
      { id: "health-doctor-check", label: "If you have a health condition affected by heat, humidity or long walking, check in with your doctor before you travel" },
    ],
  },
  {
    id: "financial",
    title: "Financial",
    items: [
      { id: "fin-notify-bank", label: "Notify your bank that you'll be travelling, so your card isn't blocked for unusual activity abroad" },
      {
        id: "fin-cash",
        label: "Carry some Saudi Riyal cash for arrival",
        link: { href: "/islamic-tools/currency-converter", label: "Currency converter" },
      },
      {
        id: "fin-budget",
        label: "Work out your rough daily budget before you go",
        link: { href: "/islamic-tools/umrah-budget-calculator", label: "Budget calculator" },
      },
      { id: "fin-backup-payment", label: "Carry a backup payment method (a second card, or some emergency cash) in case your main card has issues" },
    ],
  },
  {
    id: "digital-connectivity",
    title: "Digital & Connectivity",
    items: [
      { id: "digital-agency-contact", label: "Save your agency's WhatsApp group and contact number in your phone" },
      { id: "digital-offline-maps", label: "Download offline maps for Makkah and Madinah before you land" },
      { id: "digital-sim-roaming", label: "Decide on your SIM, eSIM or roaming plan before you land, so you're not without data on arrival" },
      { id: "digital-app-downloads", label: "Download any prayer time, Quran or dua apps you plan to use offline" },
    ],
  },
  {
    id: "home-family",
    title: "Home & Family",
    items: [
      { id: "home-share-itinerary", label: "Share your flight itinerary, hotel details and agency contact with family or a trusted friend" },
      { id: "home-cover-arrangements", label: "Arrange cover for anything that needs it at home while you're away — mail, pets, plants, bills" },
      { id: "home-emergency-access", label: "Leave a trusted contact with a way to reach you or your agency in an emergency" },
    ],
  },
];

export function countItems(categories: ChecklistCategory[]): number {
  return categories.reduce((sum, c) => sum + c.items.length, 0);
}
