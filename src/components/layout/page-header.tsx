import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <div className="theme-navy bg-brand-navy py-14 sm:py-16">
      {breadcrumbs && breadcrumbs.length > 1 && (
        <JsonLd data={breadcrumbSchema(breadcrumbs.map((c) => ({ name: c.label, url: c.href })))} />
      )}
      <div className="container-page">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-white/50">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-2xl text-white/65">{description}</p>}
      </div>
    </div>
  );
}
