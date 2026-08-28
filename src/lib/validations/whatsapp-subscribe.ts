import { z } from "zod";

/**
 * Powers the "Get daily Quran verses & hadith on WhatsApp" opt-in gate
 * (src/components/islamic/whatsapp-community-gate.tsx). `consent` must be
 * explicitly checked — we never submit or reveal the community link
 * without it, since this is effectively a marketing opt-in (WhatsApp's
 * own business policy requires opt-in consent before messaging someone).
 */
export const whatsappSubscribeSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please agree to receive WhatsApp updates to continue",
  }),
  source: z.enum(["daily-quran-verse", "daily-hadith"]),
  // Honeypot — real users never fill this in; bots often do.
  company: z.string().max(0).optional(),
});

export type WhatsAppSubscribeValues = z.infer<typeof whatsappSubscribeSchema>;
