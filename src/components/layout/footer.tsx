import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { FacebookIcon, InstagramIcon } from "@/components/icons/social-icons";
import { footerNav } from "@/lib/nav-config";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-navy bg-brand-navy text-white mt-24">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo theme="dark" iconSize={40} showTagline />
            <p className="mt-4 max-w-xs text-sm text-white/60 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={siteConfig.links.facebook}
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                <FacebookIcon className="size-4" />
              </Link>
              <Link
                href={siteConfig.links.instagram}
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                <InstagramIcon className="size-4" />
              </Link>
              <Link
                href={siteConfig.contact.whatsapp}
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                <MessageCircle className="size-4" />
              </Link>
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <div key={section}>
              {/* h2, not h3: the footer is the last thing on every page, so
               * h1 always precedes it — h2 here can never skip a level,
               * whereas h3 does whenever a page's main content has no h2
               * of its own (e.g. the Islamic Tools pages). */}
              <h2 className="text-sm font-semibold text-brand-gold">{section}</h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-white/45">
            <strong className="font-semibold text-white/60">Disclaimer:</strong>{" "}
            {siteConfig.name} is a comparison and information platform only.
            We list Umrah packages from independent, third-party travel
            agencies — we do not organize travel, issue visas, or process
            any booking or payment. Every booking, payment, and service is a
            direct arrangement between you and the listed agency, and{" "}
            {siteConfig.name} accepts no responsibility or liability for the
            agency&rsquo;s conduct, pricing, or service quality. Please
            verify all details directly with the agency before paying
            anything. See our{" "}
            <Link href="/terms" className="underline hover:text-white/70">
              Terms of Service
            </Link>{" "}
            for the full disclaimer.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="size-3.5" /> {siteConfig.contact.phone}
            </Link>
            <Link href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="size-3.5" /> {siteConfig.contact.email}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
