import type { Metadata } from "next";

import { DemoBanner } from "@/components/dashboard/demo-banner";
import { BlogManager } from "@/components/admin/blog-manager";
import { getAllBlogPostsForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Blog Management" };

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}
      <BlogManager posts={posts} />
    </div>
  );
}
