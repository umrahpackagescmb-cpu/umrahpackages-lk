"use client";

import Link from "next/link";
import { Scale, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/lib/use-compare";

export function CompareTray() {
  const { slugs, clear } = useCompare();

  if (slugs.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-md shadow-soft-lg">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Scale className="size-4 text-brand-gold-dark" />
          <span className="font-medium text-brand-navy">
            {slugs.length} package{slugs.length > 1 ? "s" : ""} selected to compare
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            <X className="size-3.5" /> Clear
          </Button>
          <Button
            size="sm"
            variant="gold"
            disabled={slugs.length < 2}
            asChild={slugs.length >= 2}
          >
            {slugs.length >= 2 ? (
              <Link href={`/compare?ids=${slugs.join(",")}`}>Compare now</Link>
            ) : (
              <span>Select 1 more to compare</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
