import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a few details about what you need"),
  // Honeypot — real users never fill this in; bots often do.
  company: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
