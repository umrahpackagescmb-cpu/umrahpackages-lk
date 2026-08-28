import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { mockBlogPosts } from "@/lib/mock-data";

export function BlogTeaser() {
  return (
    <section className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="Islamic blog"
        title="Guides & Insights for Pilgrims"
        href="/blog"
        linkLabel="Read the blog"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="p-0 overflow-hidden group hover:shadow-soft-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-gold-dark">
                  {post.category} · {post.readMinutes} min read
                </p>
                <h3 className="mt-2 font-display font-semibold leading-snug group-hover:text-brand-gold-dark transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
