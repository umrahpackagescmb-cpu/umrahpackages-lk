import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

/**
 * Renders an FAQPage JSON-LD block plus a matching visible Q&A list.
 * Used on every /islamic-tools/* page — real, practical questions specific
 * to that tool, both for genuine usefulness and to give crawlers real
 * on-page content beyond the widget itself.
 */
export function ToolFaq({ items, heading = "Frequently asked questions" }: { items: ToolFaqItem[]; heading?: string }) {
  return (
    <div className="mt-12">
      <JsonLd data={faqSchema(items)} />
      <h2 className="font-display text-base font-semibold text-brand-navy">{heading}</h2>
      <div className="mt-4 flex flex-col gap-4">
        {items.map((f) => (
          <div key={f.question}>
            <p className="text-sm font-medium text-brand-navy">{f.question}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
