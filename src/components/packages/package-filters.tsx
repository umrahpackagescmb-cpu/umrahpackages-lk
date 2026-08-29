"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CATEGORIES = [
  { value: "economy", label: "Economy" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

const GROUP_TYPES = [
  { value: "individual", label: "Individual" },
  { value: "group", label: "Group" },
  { value: "family", label: "Family" },
  { value: "vip", label: "VIP" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "duration_asc", label: "Duration: Shortest First" },
  { value: "duration_desc", label: "Duration: Longest First" },
  { value: "newest", label: "Newest First" },
];

function useFilterState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = React.useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      params.delete("page"); // reset pagination on any filter change
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { searchParams, update };
}

function CategoryAndGroupFilters() {
  const { searchParams, update } = useFilterState();
  const activeCategories = searchParams.getAll("category");
  const activeGroups = searchParams.getAll("groupType");

  const toggle = (key: "category" | "groupType", value: string, active: string[]) => {
    update((params) => {
      const next = active.includes(value)
        ? active.filter((v) => v !== value)
        : [...active, value];
      params.delete(key);
      next.forEach((v) => params.append(key, v));
    });
  };

  return (
    <>
      <fieldset>
        <legend className="text-sm font-semibold text-brand-navy">Category</legend>
        <div className="mt-3 flex flex-col gap-3">
          {CATEGORIES.map((c) => (
            <Label key={c.value} className="cursor-pointer font-normal">
              <Checkbox
                checked={activeCategories.includes(c.value)}
                onCheckedChange={() => toggle("category", c.value, activeCategories)}
              />
              {c.label}
            </Label>
          ))}
        </div>
      </fieldset>

      <Separator className="my-5" />

      <fieldset>
        <legend className="text-sm font-semibold text-brand-navy">Group Type</legend>
        <div className="mt-3 flex flex-col gap-3">
          {GROUP_TYPES.map((g) => (
            <Label key={g.value} className="cursor-pointer font-normal">
              <Checkbox
                checked={activeGroups.includes(g.value)}
                onCheckedChange={() => toggle("groupType", g.value, activeGroups)}
              />
              {g.label}
            </Label>
          ))}
        </div>
      </fieldset>
    </>
  );
}

function PriceDurationFilters({ priceMin, priceMax }: { priceMin: number; priceMax: number }) {
  const { searchParams, update } = useFilterState();
  const [minPrice, setMinPrice] = React.useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get("maxPrice") ?? "");

  const applyPrice = () => {
    update((params) => {
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");
    });
  };

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-brand-navy">
        Price Range (LKR)
      </legend>
      <p className="mt-1 text-xs text-muted-foreground">
        Typical range: {priceMin.toLocaleString()} – {priceMax.toLocaleString()}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={applyPrice}
          className="h-10"
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={applyPrice}
          className="h-10"
        />
      </div>
    </fieldset>
  );
}

function DepartureMonthFilter({ months }: { months: { value: string; label: string }[] }) {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("departureMonth") ?? "";

  if (months.length === 0) return null;

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-brand-navy">Departure Month</legend>
      <p className="mt-1 text-xs text-muted-foreground">
        Only shows packages with a scheduled departure that month.
      </p>
      <Select
        value={active || "any"}
        onValueChange={(v) =>
          update((params) => (v === "any" ? params.delete("departureMonth") : params.set("departureMonth", v)))
        }
      >
        <SelectTrigger className="mt-3 w-full" aria-label="Filter by departure month">
          <SelectValue placeholder="Any month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any month</SelectItem>
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </fieldset>
  );
}

function StarsFilter() {
  const { searchParams, update } = useFilterState();
  const active = searchParams.get("minStars") ?? "";

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-brand-navy">Makkah Hotel Rating</legend>
      <div className="mt-3 flex gap-2">
        {["3", "4", "5"].map((stars) => (
          <button
            key={stars}
            type="button"
            onClick={() =>
              update((params) =>
                active === stars ? params.delete("minStars") : params.set("minStars", stars),
              )
            }
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
              active === stars
                ? "border-brand-gold bg-brand-gold/10 text-brand-gold-dark"
                : "border-border text-muted-foreground hover:border-brand-gold/40"
            }`}
          >
            {stars}★+
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function SortDropdown() {
  const { searchParams, update } = useFilterState();
  const sort = searchParams.get("sort") ?? "popular";

  return (
    <Select value={sort} onValueChange={(v) => update((params) => params.set("sort", v))}>
      <SelectTrigger size="sm" className="min-w-48" aria-label="Sort packages by">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type FilterBodyProps = {
  priceMin: number;
  priceMax: number;
  departureMonths?: { value: string; label: string }[];
};

function FilterBody({ priceMin, priceMax, departureMonths = [] }: FilterBodyProps) {
  const { searchParams, update } = useFilterState();
  const hasFilters = Array.from(searchParams.keys()).some((k) => k !== "sort");

  return (
    <div className="flex flex-col gap-5">
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="self-start -ml-3 text-muted-foreground"
          onClick={() => update((params) => {
            const sort = params.get("sort");
            params.forEach((_, key) => params.delete(key));
            if (sort) params.set("sort", sort);
          })}
        >
          <X className="size-3.5" /> Clear all filters
        </Button>
      )}
      <DepartureMonthFilter months={departureMonths} />
      <Separator />
      <CategoryAndGroupFilters />
      <Separator />
      <PriceDurationFilters priceMin={priceMin} priceMax={priceMax} />
      <Separator />
      <StarsFilter />
    </div>
  );
}

export function PackageFiltersDesktop({ priceMin, priceMax, departureMonths }: FilterBodyProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-display font-semibold text-brand-navy">
          <SlidersHorizontal className="size-4" /> Filters
        </h2>
        <div className="mt-5">
          <FilterBody priceMin={priceMin} priceMax={priceMax} departureMonths={departureMonths} />
        </div>
      </div>
    </aside>
  );
}

export function PackageFiltersMobile({ priceMin, priceMax, departureMonths }: FilterBodyProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="size-4" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto px-6 pb-6">
          <FilterBody priceMin={priceMin} priceMax={priceMax} departureMonths={departureMonths} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
