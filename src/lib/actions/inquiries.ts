"use server";

import { isSupabaseConfigured } from "@/lib/auth/session";
import type { ActionResult } from "@/lib/actions/agencies";
import type { InquiryStatus } from "@/types/domain";

export async function setInquiryStatus(inquiryId: string, status: InquiryStatus): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", inquiryId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("setInquiryStatus failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
