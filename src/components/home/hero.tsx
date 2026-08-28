import Link from "next/link";
import { ArrowRight, ShieldCheck, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="theme-navy relative overflow-hidden bg-brand-navy text-white">
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(200,162,74,0.25) 0%, rgba(200,162,74,0) 60%)",
        }}
      />
      <div className="container-page relative py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-gold-light">
            <ShieldCheck className="size-3.5" /> Sri Lanka&rsquo;s trusted Umrah comparison platform
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Compare. Choose.
            <br />
            <span className="text-brand-gold">Perform Umrah.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg leading-relaxed">
            Browse and compare verified Umrah packages from Sri Lanka&rsquo;s
            leading travel agencies — prices, hotels, airlines and reviews,
            side by side. Then connect with the agency directly on WhatsApp.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" variant="gold" asChild>
              <Link href="/packages">
                Explore Packages <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outlineLight" asChild>
              <Link href="/compare">
                <Search /> Compare Packages
              </Link>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["50+", "Verified Agencies"],
              ["300+", "Umrah Packages"],
              ["12k+", "Pilgrims Guided"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl font-bold text-brand-gold sm:text-3xl">
                  {value}
                </dt>
                <dd className="mt-1 text-xs text-white/60 sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
