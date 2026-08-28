import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  theme?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl",
            theme === "dark" ? "text-white" : "text-brand-navy",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-2 text-sm sm:text-base",
              theme === "dark" ? "text-white/65" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors",
            theme === "dark"
              ? "text-brand-gold hover:text-brand-gold-light"
              : "text-brand-navy hover:text-brand-gold-dark",
          )}
        >
          {linkLabel} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
