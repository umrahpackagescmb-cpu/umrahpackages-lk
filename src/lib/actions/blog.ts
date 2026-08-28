"use server";

import { isSupabaseConfigured } from "@/lib/auth/session";
import type { ActionResult } from "@/lib/actions/agencies";
import type { BlogPostFormValues } from "@/lib/validations/blog";
import type { BlogPostStatus } from "@/types/domain";

export interface SaveBlogPostResult extends ActionResult {
  postId?: string;
}

function toRow(values: BlogPostFormValues) {
  // BlogPost.content is `string[]` of paragraphs in the app's domain type
  // (src/types/domain.ts), but the DB's `content` column is a single text
  // field — paragraphs are split by a blank line in the textarea, so store
  // them joined back with a blank line.
  const paragraphs = values.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    title: values.title,
    excerpt: values.excerpt,
    content: paragraphs.join("\n\n"),
    cover_image_url: values.coverImageUrl || null,
    category: values.category,
    status: values.status,
    published_at: values.status === "published" ? new Date().toISOString() : null,
  };
}

/** Admin/content_manager/editor only — RLS enforces this server-side too
 * (see supabase/migrations/0002_rls_policies.sql, "blog_posts: staff
 * manage"). In demo mode this is a no-op that reports back `demo: true` so
 * the calling UI can update its own local state instead. */
export async function createBlogPost(values: BlogPostFormValues): Promise<SaveBlogPostResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const slug = `${values.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60)}-${Date.now().toString(36)}`;
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({ ...toRow(values), slug })
      .select("id")
      .single();
    if (error || !data) return { ok: false, error: error?.message ?? "Couldn't create the post." };
    return { ok: true, postId: data.id };
  } catch (error) {
    console.error("createBlogPost failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateBlogPost(postId: string, values: BlogPostFormValues): Promise<SaveBlogPostResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("blog_posts").update(toRow(values)).eq("id", postId);
    if (error) return { ok: false, error: error.message };
    return { ok: true, postId };
  } catch (error) {
    console.error("updateBlogPost failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function setBlogPostStatus(postId: string, status: BlogPostStatus): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase
      .from("blog_posts")
      .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
      .eq("id", postId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("setBlogPostStatus failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function deleteBlogPost(postId: string): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: true, demo: true };
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("deleteBlogPost failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
