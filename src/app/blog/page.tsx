import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { BlogCard } from "@/components/cards/blog-card";
import { getBlogCategories, getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Islamic Blog",
  description:
    "Guides, planning tips, and spiritual reflections for Sri Lankan pilgrims preparing for Umrah and Hajj.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [posts, categories] = await Promise.all([getBlogPosts(category), Promise.resolve(getBlogCategories())]);

  return (
    <>
      <PageHeader
        eyebrow="Guides & reflections"
        title="Islamic Blog"
        description="Practical planning guides and spiritual reflections to help you prepare for Umrah, written for Sri Lankan pilgrims."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <div className="container-page py-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              !category ? "bg-brand-navy text-white" : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog?category=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                category?.toLowerCase() === c.toLowerCase()
                  ? "bg-brand-navy text-white"
                  : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="No articles in this category yet" actionLabel="View all articles" actionHref="/blog" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
