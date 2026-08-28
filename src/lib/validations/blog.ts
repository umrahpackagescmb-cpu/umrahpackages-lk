import { z } from "zod";

/**
 * Shared by the Admin "add/edit blog post" form. Mirrors the `blog_posts`
 * table (supabase/migrations/0001_init_schema.sql) field-for-field so
 * submitted values map straight onto a Supabase insert/update once
 * connected — see src/lib/actions/blog.ts.
 */
export const blogPostFormSchema = z.object({
  title: z.string().trim().min(6, "Give the post a descriptive title (at least 6 characters)"),
  excerpt: z.string().trim().min(10, "Write a short one or two sentence excerpt"),
  // Paragraphs separated by a blank line in the textarea, split into an
  // array before submit — mirrors BlogPost.content (string[]) in
  // src/types/domain.ts, joined back with "\n\n" for the DB's single
  // `content` text column.
  content: z.string().trim().min(20, "Write at least one paragraph of content"),
  category: z.string().trim().min(2, "Enter a category, e.g. Guides, Planning, Spiritual"),
  coverImageUrl: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
