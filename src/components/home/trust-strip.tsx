import { TRUST_BADGE_CONFIG } from "@/components/badges/trust-badge";
import type { TrustBadgeType } from "@/types/domain";

const order: TrustBadgeType[] = [
  "gold_verified",
  "featured",
  "premium_partner",
  "recommended",
  "new_agency",
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-brand-gray/50">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Our trust system
        </p>
        {order.map((type) => {
          const config = TRUST_BADGE_CONFIG[type];
          const Icon = config.icon;
          return (
            <span
              key={type}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80"
            >
              <Icon className="size-4 text-brand-gold-dark" /> {config.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
