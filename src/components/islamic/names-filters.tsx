"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LENGTH_OPTIONS = [
  { value: "all", label: "Any length" },
  { value: "1-4", label: "Short (up to 4 letters)" },
  { value: "5-6", label: "Medium (5-6 letters)" },
  { value: "7-99", label: "Long (7+ letters)" },
];

function useFilterState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = React.useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { searchParams, update };
}

export function NamesSearchBox() {
  const { searchParams, update } = useFilterState();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => update((params) => (value ? params.set("q", value) : params.delete("q")))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            update((params) => (value ? params.set("q", value) : params.delete("q")));
          }
        }}
        placeholder="Search by name or meaning (e.g. &quot;light&quot;, &quot;patience&quot;)..."
        className="h-12 pl-11 text-base"
      />
    </div>
  );
}

export function GenderPills() {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("gender") ?? "all";

  return (
    <div className="flex gap-2">
      {(["all", "male", "female"] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => update((params) => (g === "all" ? params.delete("gender") : params.set("gender", g)))}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors",
            active === g
              ? "bg-brand-navy text-white"
              : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray",
          )}
        >
          {g === "all" ? "All names" : `${g} names`}
        </button>
      ))}
    </div>
  );
}

export function LetterPills({ letters }: { letters: { letter: string; count: number }[] }) {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("letter") ?? "all";

  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by starting letter">
      <button
        type="button"
        onClick={() => update((params) => params.delete("letter"))}
        className={cn(
          "flex h-8 items-center justify-center rounded-lg px-3 text-xs font-semibold transition-colors",
          active === "all"
            ? "bg-brand-gold text-brand-navy"
            : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray",
        )}
      >
        All
      </button>
      {letters.map(({ letter, count }) => (
        <button
          key={letter}
          type="button"
          title={`${count} names starting with ${letter}`}
          onClick={() => update((params) => params.set("letter", letter))}
          className={cn(
            "flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
            active === letter
              ? "bg-brand-gold text-brand-navy"
              : "bg-brand-gray/60 text-muted-foreground hover:bg-brand-gray",
          )}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export function LengthSelect() {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("length") ?? "all";

  return (
    <Select
      value={active}
      onValueChange={(v) => update((params) => (v === "all" ? params.delete("length") : params.set("length", v)))}
    >
      <SelectTrigger size="sm" className="min-w-44" aria-label="Filter by number of letters">
        <SelectValue placeholder="Any length" />
      </SelectTrigger>
      <SelectContent>
        {LENGTH_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function OriginSelect({ origins }: { origins: string[] }) {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("origin") ?? "all";

  return (
    <Select
      value={active}
      onValueChange={(v) => update((params) => (v === "all" ? params.delete("origin") : params.set("origin", v)))}
    >
      <SelectTrigger size="sm" className="min-w-40" aria-label="Filter by origin">
        <SelectValue placeholder="Any origin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Any origin</SelectItem>
        {origins.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ClearFiltersButton() {
  const { searchParams, update } = useFilterState();
  const hasFilters = Array.from(searchParams.keys()).length > 0;
  if (!hasFilters) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground"
      onClick={() => update((params) => params.forEach((_, key) => params.delete(key)))}
    >
      <X className="size-3.5" /> Clear all filters
    </Button>
  );
}
