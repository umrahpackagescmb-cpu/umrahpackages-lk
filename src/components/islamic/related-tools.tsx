import Link from "next/link";

import { islamicToolsList } from "@/lib/islamic/tools-list";

/** A handful of links to the other Islamic Tools pages, for internal linking + discovery. */
export function RelatedTools({ exclude, limit = 4 }: { exclude: string; limit?: number }) {
  const others = islamicToolsList.filter((t) => t.href !== exclude).slice(0, limit);
  if (others.length === 0) return null;

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="font-display text-base font-semibold text-brand-navy">More Islamic tools</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {others.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-brand-gold hover:text-brand-navy"
          >
            <t.icon className="size-3.5 text-brand-gold-dark" />
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
