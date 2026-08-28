import Image from "next/image";
import Link from "next/link";
import { MapPin, Package as PackageIcon, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { TrustBadgeList } from "@/components/badges/trust-badge";
import type { Agency } from "@/types/domain";

export function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <Card className="group hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/agencies/${agency.slug}`} className="flex items-start gap-4">
        <Image
          src={agency.logoUrl}
          alt={agency.name}
          width={56}
          height={56}
          className="rounded-2xl border border-border shrink-0"
        />
        <div className="min-w-0 flex-1">
          {/* h2: on /agencies this card sits directly under the page's h1
           * with no intervening h2, so this is the correct level (also
           * valid as a same-level sibling where a page already uses h2
           * section headings, e.g. the homepage's "Featured Agencies"). */}
          <h2 className="font-display font-semibold text-base group-hover:text-brand-gold-dark transition-colors truncate">
            {agency.name}
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" /> {agency.city}
            {agency.rating && (
              <span className="ml-2 flex items-center gap-0.5 text-brand-gold-dark">
                <Star className="size-3.5 fill-current" /> {agency.rating}
              </span>
            )}
          </p>
        </div>
      </Link>

      <p className="text-sm text-muted-foreground line-clamp-2">{agency.description}</p>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <TrustBadgeList badges={agency.badges} iconOnly />
        <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <PackageIcon className="size-3.5" /> {agency.packageCount} packages
        </span>
      </div>
    </Card>
  );
}
