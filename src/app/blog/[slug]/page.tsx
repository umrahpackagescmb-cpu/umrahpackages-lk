import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";

import { BlogCard } from "@/components/cards/blog-card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPostBySlug, getBlogPosts, getRelatedBlogPosts } from "@/lib/data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImageUrl, width: 1200, height: 800, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post, 3);

  return (
    <article className="container-page py-10">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/blog" className="hover:text-brand-navy">Blog</Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-navy">{post.title}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <Badge variant="gold">{post.category}</Badge>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-4xl text-balance">
          {post.title}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="size-4" /> {post.author}
          </span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> {post.readMinutes} min read
          </span>
        </p>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-neutral mt-10 max-w-none">
          {post.content.map((paragraph, i) => (
            <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-brand-navy">More from the Blog</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
