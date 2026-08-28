import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/types/domain";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <Badge variant="gold" className="absolute top-3 left-3">
            {post.category}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 p-5">
          {/* h2: on /blog this card sits directly under the page's h1 with
           * no intervening h2 — see agency-card.tsx for the same reasoning. */}
          <h2 className="font-display text-base font-semibold leading-snug text-brand-navy group-hover:text-brand-gold-dark transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {post.readMinutes} min read
            </span>
          </p>
        </div>
      </Link>
    </Card>
  );
}
