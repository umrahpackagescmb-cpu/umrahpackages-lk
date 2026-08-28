import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrustBadgeList } from "@/components/badges/trust-badge";
import { formatLkr, formatUsd } from "@/lib/format";
import type { Package } from "@/types/domain";

export function ContactCard({ pkg }: { pkg: Package }) {
  return (
    <Card className="sticky top-24 gap-4 shadow-soft-lg">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Package price from</p>
        <p className="mt-1 font-display text-3xl font-bold text-brand-navy">
          {formatLkr(pkg.priceLkr)}
        </p>
        {pkg.priceUsd && (
          <p className="text-sm text-muted-foreground">≈ {formatUsd(pkg.priceUsd)} · per pilgrim</p>
        )}
      </div>

      <Separator />

      <div className="flex items-center gap-3">
        <Image
          src={pkg.agency.logoUrl}
          alt={pkg.agency.name}
          width={44}
          height={44}
          className="rounded-xl border border-border"
        />
        <div className="min-w-0">
          <Link
            href={`/agencies/${pkg.agency.slug}`}
            className="block truncate text-sm font-semibold text-brand-navy hover:text-brand-gold-dark transition-colors"
          >
            {pkg.agency.name}
          </Link>
          <TrustBadgeList badges={pkg.agency.badges} iconOnly className="mt-1" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="gold" size="lg" asChild className="bg-[#25D366] text-white hover:bg-[#1ebc59]">
          <Link href={pkg.agency.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Chat on WhatsApp
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href={`tel:${pkg.agency.phone.replace(/\s+/g, "")}`}>
            <Phone /> Call {pkg.agency.phone}
          </Link>
        </Button>
      </div>

      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brand-gold-dark" />
        UmrahPackages.lk connects you to the agency directly — we don&rsquo;t
        process payments, take a booking fee, or provide the travel
        service ourselves. Your booking is a direct arrangement with{" "}
        {pkg.agency.name}; please verify all details before paying. See our{" "}
        <Link href="/terms" className="underline hover:text-brand-navy">
          Terms
        </Link>
        .
      </p>

      {pkg.seatsAvailable != null && pkg.seatsAvailable <= 8 && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-center text-xs font-medium text-destructive">
          Only {pkg.seatsAvailable} seats left for this departure
        </p>
      )}
    </Card>
  );
}
