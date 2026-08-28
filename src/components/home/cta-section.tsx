import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function CtaSection() {
  return (
    <section className="container-page pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-brand-gold px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 100%, rgba(13,27,42,0.25) 0%, rgba(13,27,42,0) 60%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl text-balance">
            Are you a travel agency? List your Umrah packages for free.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-navy/80">
            Reach thousands of pilgrims searching for verified packages every
            month. Get listed, get discovered, get contacted.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/for-agencies">
                Register your agency <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-brand-navy/30" asChild>
              <Link href={`mailto:${siteConfig.contact.email}`}>Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
