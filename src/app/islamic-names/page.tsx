import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/packages/pagination";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import {
  filterNames,
  getStartingLetters,
  getOrigins,
  islamicNamesData,
  type NameGender,
} from "@/lib/islamic/names-query";
import {
  NamesSearchBox,
  GenderPills,
  LetterPills,
  LengthSelect,
  OriginSelect,
  ClearFiltersButton,
} from "@/components/islamic/names-filters";

export const metadata: Metadata = {
  title: "Islamic Names & Meanings — 1,000+ Muslim Baby Names",
  description:
    "Browse over 1,000 authentic Islamic baby names for boys and girls with accurate meanings and origins. Filter by starting letter, gender, and name length to find the perfect name.",
  alternates: { canonical: "/islamic-names" },
  keywords: [
    "islamic names",
    "muslim baby names",
    "islamic names for boys",
    "islamic names for girls",
    "arabic names meaning",
    "quranic names",
  ],
};

const PAGE_SIZE = 30;

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const faqs = [
  {
    question: "How many Islamic names are in this database?",
    answer: `We list over ${islamicNamesData.length} real, individually-verified Islamic names for boys and girls, each with an accurate meaning and origin — Arabic, Quranic, Persian, Turkish, and South Asian. We'd rather show you names we're confident are correct than pad the list with filler.`,
  },
  {
    question: "How do I find a name by its first letter?",
    answer: "Use the A-Z letter filter above the name grid to browse every name that starts with a specific letter, or type directly into the search box to search by name or by meaning (e.g. \"light\" or \"patience\").",
  },
  {
    question: "Can I filter by how long a name is?",
    answer: "Yes — use the length filter to browse short names (up to 4 letters), medium names (5-6 letters), or longer names (7+ letters), useful if you're looking for something that pairs well with a particular surname.",
  },
  {
    question: "Are these names only for Sri Lankan Muslims?",
    answer: `Not at all — while ${siteConfig.name} is built for Sri Lanka's Umrah travellers, this Islamic names database is a free reference for Muslim parents anywhere in the world.`,
  },
];

function parseLength(param: string | undefined): { minLength?: number; maxLength?: number } {
  if (!param || param === "all") return {};
  const [min, max] = param.split("-").map(Number);
  if (Number.isNaN(min) || Number.isNaN(max)) return {};
  return { minLength: min, maxLength: max };
}

export default async function IslamicNamesIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(first(sp.page)) || 1);
  const gender = (first(sp.gender) as NameGender | undefined) ?? "all";
  const letter = first(sp.letter) ?? "all";
  const origin = first(sp.origin) ?? "all";
  const query = first(sp.q) ?? "";
  const { minLength, maxLength } = parseLength(first(sp.length));

  const results = filterNames({ query, gender, letter, origin, minLength, maxLength });
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const letters = getStartingLetters();
  const origins = getOrigins();

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(sp)) {
      if (key === "page") continue;
      const v = first(value);
      if (v) params.set(key, v);
    }
    if (targetPage > 1) params.set("page", String(targetPage));
    const qs = params.toString();
    return qs ? `/islamic-names?${qs}` : "/islamic-names";
  };

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHeader
        eyebrow={`${islamicNamesData.length}+ verified names`}
        title="Islamic Names & Meanings"
        description="A free, accurate directory of Islamic names for boys and girls — filter by starting letter, gender, origin, and length to find the right name and its true meaning."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Islamic Tools", href: "/islamic-tools" }, { label: "Islamic Names" }]}
      />

      <div className="container-page py-12">
        <div className="mx-auto max-w-4xl">
          <NamesSearchBox />

          <div className="mt-5 flex flex-col gap-4">
            <LetterPills letters={letters} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <GenderPills />
              <div className="flex items-center gap-2">
                <LengthSelect />
                <OriginSelect origins={origins} />
                <ClearFiltersButton />
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            <span className="font-semibold text-brand-navy">{results.length}</span> name
            {results.length === 1 ? "" : "s"} found
          </p>

          {pageResults.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No names match those filters"
                description="Try a different letter, or clear your filters to see the full list."
                actionLabel="Clear filters"
                actionHref="/islamic-names"
              />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pageResults.map((n) => (
                <Link key={n.slug} href={`/islamic-names/${n.slug}`}>
                  <Card className="h-full gap-1 p-4 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display font-semibold text-brand-navy">{n.name}</p>
                      {n.isPopular && <Sparkles className="size-3.5 shrink-0 text-brand-gold" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{n.meaning}</p>
                    <p className="mt-1 text-[11px] font-medium text-brand-gold-dark capitalize">
                      {n.gender} · {n.origin} · {n.letterCount} letters
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />

          <div className="mt-16 rounded-2xl border border-border bg-brand-gray/40 p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              About this Islamic names directory
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Choosing a name is one of the first gifts a parent gives a child, and in Islamic
              tradition, a name carries real weight — it is something the child will hear and
              answer to for a lifetime. This directory brings together {islamicNamesData.length}+
              names drawn from the Qur&rsquo;an, the names of the Prophets, the Sahaba (companions
              of the Prophet Muhammad ﷺ), and the wider Arabic, Persian, Turkish and South Asian
              Muslim naming traditions — each with a plain-English meaning and its origin, so you
              can browse with confidence rather than guesswork.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Use the letter filter to browse alphabetically, the length filter if you&rsquo;re
              matching a name to a particular surname, or just search a quality you want the name
              to reflect — like &ldquo;light&rdquo;, &ldquo;patience&rdquo;, or &ldquo;noble&rdquo;.
              Every name links through to its own page with a fuller explanation and similar-name
              suggestions.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg font-semibold text-brand-navy">
              Frequently asked questions
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {faqs.map((f) => (
                <div key={f.question}>
                  <p className="font-medium text-brand-navy">{f.question}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
