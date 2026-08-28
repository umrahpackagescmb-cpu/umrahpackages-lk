import Image from "next/image";
import Link from "next/link";
import { MapPin, Briefcase, Languages } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Maulavi } from "@/types/domain";

export function MaulaviCard({ maulavi }: { maulavi: Maulavi }) {
  return (
    <Card className="group items-center gap-3 text-center hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/maulavi-directory/${maulavi.slug}`} className="flex flex-col items-center gap-3">
        <Image
          src={maulavi.photoUrl}
          alt={maulavi.name}
          width={80}
          height={80}
          className="rounded-full border border-border object-cover"
        />
        <div>
          {/* h2: on /maulavi-directory this card sits directly under the
           * page's h1 with no intervening h2 — see agency-card.tsx for the
           * same reasoning. */}
          <h2 className="font-display font-semibold text-brand-navy group-hover:text-brand-gold-dark transition-colors">
            {maulavi.name}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{maulavi.specialization}</p>
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center justify-center gap-1.5">
          <MapPin className="size-3.5" /> {maulavi.city}
        </span>
        <span className="flex items-center justify-center gap-1.5">
          <Briefcase className="size-3.5" /> {maulavi.yearsExperience} years experience
        </span>
        <span className="flex items-center justify-center gap-1.5">
          <Languages className="size-3.5" /> {maulavi.languages.join(", ")}
        </span>
      </div>
    </Card>
  );
}
