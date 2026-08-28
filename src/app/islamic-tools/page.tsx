import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { islamicToolsList } from "@/lib/islamic/tools-list";

export const metadata: Metadata = {
  title: "Free Islamic Tools — Prayer Times, Qibla, Zakat, Hijri Calendar & More",
  description:
    "30 free Islamic tools and guides for daily worship and your Umrah journey: prayer times, Qibla finder, Hijri calendar & converter, Zakat calculator, a step-by-step Umrah guide with audio and Tamil/Sinhala translations, an offline PDF guide, budget & packing tools, currency converter, live weather, practical Saudi travel guides, and 1,000+ Islamic names.",
  alternates: { canonical: "/islamic-tools" },
  keywords: [
    "islamic tools",
    "prayer times",
    "qibla finder",
    "hijri calendar",
    "zakat calculator",
    "ramadan countdown",
    "hajj countdown",
  ],
};

const faqs = [
  {
    question: "Are these Islamic tools really free?",
    answer: "Yes — every tool on this page is completely free to use, with no account or sign-up required. We built them to support Muslims' daily worship and to help pilgrims prepare for Umrah and Hajj.",
  },
  {
    question: "How accurate are the prayer times and Hijri dates?",
    answer: "Prayer times use standard astronomical calculation methods for your location, and Hijri dates use the tabular Islamic calendar. Both can differ by a day from local moon-sighting announcements or your local mosque's published times — always confirm important dates locally.",
  },
  {
    question: "Do I need to create an account to use these tools?",
    answer: "No account is needed for any tool on this page. Your Tasbih counter progress is saved on your own device only.",
  },
];

export default function IslamicToolsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHeader
        eyebrow="Free, for everyone"
        title="Islamic Tools"
        description="A set of free tools to support your daily worship and your Umrah journey — no account needed."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Islamic Tools" }]}
      />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {islamicToolsList.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full gap-3 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
                  <tool.icon className="size-5" />
                </div>
                <h2 className="font-display font-semibold text-brand-navy">{tool.title}</h2>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
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
    </>
  );
}
