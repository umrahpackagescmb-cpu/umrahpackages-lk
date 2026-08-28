import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border transition-colors",
          page === 1
            ? "pointer-events-none opacity-40"
            : "hover:border-brand-gold hover:text-brand-gold-dark",
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={cn(
            "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
            p === page
              ? "bg-brand-navy text-white"
              : "border border-border hover:border-brand-gold hover:text-brand-gold-dark",
          )}
        >
          {p}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border transition-colors",
          page === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:border-brand-gold hover:text-brand-gold-dark",
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}
