import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "22 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Last updated ${lastUpdated}`}
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <div className="container-page py-12">
        <div className="prose-content mx-auto max-w-3xl text-foreground/85 [&>h2]:font-display [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-brand-navy [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-1.5">
          <p className="mb-6 rounded-xl bg-brand-gray/60 p-4 text-sm text-muted-foreground">
            This is a template privacy policy for {siteConfig.name}. It reflects how the
            platform is designed to work today; have it reviewed by a
            qualified lawyer before launch, especially regarding Sri
            Lanka&rsquo;s Personal Data Protection Act.
          </p>

          <h2>1. Who we are</h2>
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates a website that
            lets visitors compare Umrah packages listed by independent Sri
            Lankan travel agencies. We are not a travel agency and do not
            process bookings or payments.
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Information you provide:</strong> your name, phone number, and
              email address when you submit a contact form or an
              agency-inquiry form.
            </li>
            <li>
              <strong>Usage information:</strong> pages viewed, packages compared,
              and links clicked (e.g. &ldquo;Chat on WhatsApp&rdquo;), collected via
              Google Analytics and our own analytics events to power
              features like &ldquo;Trending Packages&rdquo;.
            </li>
            <li>
              <strong>Account information:</strong> if you register a travel agency
              account, your login email and the profile details you add.
            </li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To route your enquiry to the relevant travel agency.</li>
            <li>To operate and improve the platform (e.g. showing trending or similar packages).</li>
            <li>To communicate with you about your enquiry or agency account.</li>
            <li>To meet legal obligations.</li>
          </ul>

          <h2>4. Sharing your information</h2>
          <p>
            When you submit an enquiry about a specific package, we share
            the details you provide (name, phone, message) with that
            package&rsquo;s travel agency so they can respond to you. We do
            not sell your personal information to third parties.
          </p>

          <h2>5. Third-party services we use</h2>
          <ul>
            <li>Supabase (database, authentication, file storage)</li>
            <li>Vercel (hosting)</li>
            <li>Google Analytics (usage analytics)</li>
            <li>WhatsApp (when you choose to contact an agency via WhatsApp)</li>
          </ul>

          <h2>6. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal information by contacting us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-gold-dark hover:underline">
              {siteConfig.contact.email}
            </a>.
          </p>

          <h2>7. Cookies</h2>
          <p>
            We use essential cookies to operate the site, and analytics
            cookies (Google Analytics) to understand how the platform is
            used. You can control cookies through your browser settings.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-gold-dark hover:underline">
              {siteConfig.contact.email}
            </a>{" "}
            or call {siteConfig.contact.phone}.
          </p>
        </div>
      </div>
    </>
  );
}
