import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} — questions about packages, agencies, or listing your travel agency.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We usually reply within a day"
        title="Contact Us"
        description="Questions about a package, an agency, or want to list your travel agency? Reach out — we're happy to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <ContactForm />
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="gap-3">
              <h2 className="font-display font-semibold text-brand-navy">Reach us directly</h2>
              <Link
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-foreground/85 hover:text-brand-gold-dark transition-colors"
              >
                <MessageCircle className="size-4 text-brand-gold-dark" /> WhatsApp us
              </Link>
              <Link
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2.5 text-sm text-foreground/85 hover:text-brand-gold-dark transition-colors"
              >
                <Phone className="size-4 text-brand-gold-dark" /> {siteConfig.contact.phone}
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-foreground/85 hover:text-brand-gold-dark transition-colors"
              >
                <Mail className="size-4 text-brand-gold-dark" /> {siteConfig.contact.email}
              </Link>
              <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-brand-gold-dark" /> Mon–Sat, 9am–6pm (Sri Lanka time)
              </p>
            </Card>

            <Card className="gap-2 bg-brand-gray/50">
              <h2 className="font-display font-semibold text-brand-navy">Are you a travel agency?</h2>
              <p className="text-sm text-muted-foreground">
                Listing your Umrah packages is free. Message us to get started.
              </p>
              <Link href="/for-agencies" className="text-sm font-medium text-brand-gold-dark hover:text-brand-navy">
                Learn more →
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
