import { z } from "zod";

/**
 * Shared by the Agency "add/edit package" form. Mirrors the `packages`
 * table (supabase/migrations/0001_init_schema.sql) field-for-field so
 * submitted values map straight onto a Supabase insert/update once
 * connected — see src/lib/actions/packages.ts.
 */
export const packageFormSchema = z.object({
  title: z.string().trim().min(8, "Give your package a descriptive title (at least 8 characters)"),
  priceLkr: z.coerce.number().positive("Enter a price in LKR"),
  priceUsd: z.coerce.number().positive().optional().or(z.literal("")),
  durationDays: z.coerce.number().int().min(1, "Duration must be at least 1 day").max(60, "That's a long trip — double check the duration"),
  departureCity: z.string().trim().min(2, "Enter a departure city"),
  airline: z.string().trim().min(2, "Enter an airline"),
  makkahHotel: z.string().trim().min(2, "Enter the Makkah hotel name"),
  makkahHotelStars: z.coerce.number().int().min(1).max(5),
  // Optional — enables the walking-route-to-Haram map on the package page.
  // Left blank, the page just shows the hotel name/stars as text.
  makkahHotelLat: z.coerce.number().min(-90).max(90).optional().or(z.literal("")),
  makkahHotelLng: z.coerce.number().min(-180).max(180).optional().or(z.literal("")),
  madinahHotel: z.string().trim().min(2, "Enter the Madinah hotel name"),
  madinahHotelStars: z.coerce.number().int().min(1).max(5),
  madinahHotelLat: z.coerce.number().min(-90).max(90).optional().or(z.literal("")),
  madinahHotelLng: z.coerce.number().min(-180).max(180).optional().or(z.literal("")),
  mealPlan: z.string().trim().optional().or(z.literal("")),
  transport: z.string().trim().optional().or(z.literal("")),
  visaIncluded: z.boolean(),
  groupType: z.enum(["individual", "group", "family", "vip"]),
  category: z.enum(["economy", "standard", "premium", "luxury"]),
  // Every date here shares the price/rate entered above — an agency adds
  // as many as this package actually departs on. A date at a different
  // price isn't added here; it becomes its own separate package instead.
  // Kept as {date}[] (not string[]) because react-hook-form's useFieldArray
  // needs objects to key rows by; flattened to string[] in toRow() before
  // it's written. Blank rows (a date field left empty) are filtered out
  // there too, so this stays permissive rather than erroring on them.
  departureDates: z
    .array(z.object({ date: z.string().trim() }))
    .max(12, "That's a lot of departure dates for one listing — group them seasonally, or contact us about a bulk listing.")
    .refine(
      (arr) => {
        const filled = arr.map((d) => d.date).filter(Boolean);
        return new Set(filled).size === filled.length;
      },
      { message: "You've added the same date twice." },
    ),
  seatsAvailable: z.coerce.number().int().min(0).optional().or(z.literal("")),
  // Newline-separated in the textarea, split into arrays before submit.
  inclusions: z.string().trim().min(1, "List at least one inclusion (one per line)"),
  exclusions: z.string().trim().optional().or(z.literal("")),
  tags: z.string().trim().optional().or(z.literal("")),
  isPublished: z.boolean(),
});

export type PackageFormValues = z.infer<typeof packageFormSchema>;
