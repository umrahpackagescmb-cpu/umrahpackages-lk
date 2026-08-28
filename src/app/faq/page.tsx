import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about comparing and booking Umrah packages through UmrahPackages.lk.",
  alternates: { canonical: "/faq" },
};

const faqGroups = [
  {
    group: "About the platform",
    items: [
      {
        question: "Is UmrahPackages.lk a travel agency?",
        answer:
          "No. We're a comparison platform — we list Umrah packages from verified Sri Lankan travel agencies so you can compare them in one place. We don't organize trips or process payments ourselves.",
      },
      {
        question: "Do you charge a booking fee?",
        answer:
          "No, browsing and comparing packages is completely free, and we don't add any commission on top of the agency's price. You pay the agency directly, at their listed price.",
      },
      {
        question: "How are agencies verified?",
        answer:
          "Every agency is reviewed by our team before being listed, and accounts start disabled until that review is complete. Trust badges like Gold Verified and Premium Partner are assigned only by our Super Admin team — they can't be purchased.",
      },
    ],
  },
  {
    group: "Booking a package",
    items: [
      {
        question: `How do I actually book a package I find on ${siteConfig.name}?`,
        answer:
          "Open the package you're interested in and use the WhatsApp or phone button to contact the agency directly. From there, booking works exactly as it would if you'd called them yourself.",
      },
      {
        question: "Can I negotiate the price shown?",
        answer:
          "Prices listed are set by each agency. Whether there's room to negotiate (for group bookings, for example) is entirely between you and the agency.",
      },
      {
        question: "What if a package listing looks outdated or wrong?",
        answer:
          "Please let us know via the Contact page — we'll follow up with the agency. Agencies are responsible for keeping their own listings current.",
      },
    ],
  },
  {
    group: "For travel agencies",
    items: [
      {
        question: "How do I list my agency's packages?",
        answer:
          "Visit the For Agencies page and get in touch — after a quick verification, your account is enabled and you can add packages, photos, and brochures yourself from your dashboard.",
      },
      {
        question: "Is listing free?",
        answer: "Yes — unlimited package listings, with no commission on bookings, ever.",
      },
    ],
  },
];

const flatFaqs = faqGroups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(flatFaqs)} />
      <PageHeader
        eyebrow="Got questions?"
        title="Frequently Asked Questions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <div className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          {faqGroups.map((group) => (
            <div key={group.group} className="mb-10">
              <h2 className="font-display text-lg font-semibold text-brand-navy">{group.group}</h2>
              <Accordion type="single" collapsible className="mt-2">
                {group.items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <p className="text-center text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-brand-gold-dark hover:text-brand-navy">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
