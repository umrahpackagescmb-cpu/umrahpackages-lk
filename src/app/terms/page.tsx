import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

const lastUpdated = "22 August 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${lastUpdated}`}
        title="Terms of Service"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <div className="container-page py-12">
        <div className="prose-content mx-auto max-w-3xl text-foreground/85 [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-brand-navy [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5">
          <p className="mb-6 rounded-xl bg-brand-gray/60 p-4 text-sm text-muted-foreground">
            This is a template terms of service for {siteConfig.name}. Have it
            reviewed by a qualified lawyer before launch.
          </p>

          <h2>1. What UmrahPackages.lk is</h2>
          <p>
            {siteConfig.name} is a comparison platform that lists Umrah
            packages from independent, third-party Sri Lankan travel
            agencies (&ldquo;Agencies&rdquo;). We are not a travel agency, tour
            operator, or booking platform. We do not organize travel, issue
            visas, or process payments for any package listed on the site.
          </p>

          <h2>2. Bookings happen directly with the Agency</h2>
          <p>
            Any booking, payment, contract, or dispute arising from a
            package you find on this site is strictly between you and the
            listing Agency. We are not a party to that transaction and
            accept no liability for the Agency&rsquo;s services, pricing
            accuracy, cancellations, or conduct. Verify all details —
            price, inclusions, dates, and visa requirements — directly
            with the Agency before paying anything.
          </p>

          <h2>3. Accuracy of listings</h2>
          <p>
            Agencies are responsible for the accuracy of their own package
            listings. While we review agencies before listing them, we do
            not independently verify every detail of every package and
            cannot guarantee that prices, availability, or inclusions
            shown are current at the time you view them.
          </p>

          <h2>4. Trust badges</h2>
          <p>
            Trust badges (Gold Verified, Featured, Premium Partner,
            Recommended, New Agency) reflect our own internal review
            criteria at the time they were assigned. They are not a
            guarantee of an Agency&rsquo;s future performance and cannot be
            purchased or influenced by payment.
          </p>

          <h2>5. Acceptable use</h2>
          <ul>
            <li>Don&rsquo;t scrape, copy, or republish listings in bulk without permission.</li>
            <li>Don&rsquo;t submit false information through contact or inquiry forms.</li>
            <li>Don&rsquo;t attempt to interfere with the platform&rsquo;s security or availability.</li>
          </ul>

          <h2>6. Travel agency accounts</h2>
          <p>
            Agencies that register for a dashboard account are responsible
            for the accuracy of everything they publish, and must comply
            with Sri Lankan travel and consumer protection law. We reserve
            the right to disable any agency account, including removing
            trust badges, at our discretion.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            The platform is provided &ldquo;as is&rdquo;. To the fullest extent
            permitted by law, {siteConfig.name} is not liable for any loss
            arising from your use of the site or your dealings with any
            Agency listed on it.
          </p>

          <h2>8. Changes to these terms</h2>
          <p>We may update these terms from time to time; continued use of the site means you accept the current version.</p>

          <h2>9. Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-gold-dark hover:underline">
              {siteConfig.contact.email}
            </a>.
          </p>
        </div>
      </div>
    </>
  );
}
