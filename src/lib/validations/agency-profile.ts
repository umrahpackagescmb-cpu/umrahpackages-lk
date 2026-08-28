import { z } from "zod";

/**
 * Mirrors `AgencyProfileInput` in src/lib/actions/agencies.ts field-for-field
 * — the agency-editable subset of the `agencies` table (excludes is_active
 * and badges, which stay admin-only per RLS).
 */
export const agencyProfileFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your agency name"),
  description: z.string().trim().min(20, "Please write at least a couple of sentences about your agency"),
  city: z.string().trim().min(2, "Please enter your city"),
  address: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20, "Phone number looks too long"),
  whatsapp: z.string().trim().min(7, "Please enter a valid WhatsApp number").max(20, "Number looks too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  website: z.string().trim().url("Enter a valid website URL").optional().or(z.literal("")),
});

export type AgencyProfileFormValues = z.infer<typeof agencyProfileFormSchema>;
