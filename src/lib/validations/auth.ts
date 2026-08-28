import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const agencySignUpSchema = z.object({
  agencyName: z.string().trim().min(2, "Please enter your agency name"),
  city: z.string().trim().min(2, "Please enter your city"),
  phone: z.string().trim().min(9, "Please enter a valid phone number").max(20, "Phone number looks too long"),
  whatsapp: z.string().trim().min(9, "Please enter a valid WhatsApp number").max(20, "Number looks too long"),
  description: z.string().trim().min(20, "Please write at least a couple of sentences about your agency"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  company: z.string().max(0).optional(), // honeypot
});

export type AgencySignUpInput = z.infer<typeof agencySignUpSchema>;
