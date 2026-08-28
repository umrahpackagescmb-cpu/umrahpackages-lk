import { BadgeCheck, Star, Crown, ThumbsUp, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TrustBadgeType } from "@/types/domain";

/**
 * Trust badge system — assignable only by Super Admin (enforced at the
 * data layer / RLS, see /supabase/migrations). This component is purely
 * presentational: label, icon and styling for each badge type, used
 * consistently across agency cards, profiles, package cards/details,
 * search and comparison results.
 */
export const TRUST_BADGE_CONFIG: Record<
  TrustBadgeType,
  { label: string; icon: typeof BadgeCheck; className: string }
> = {
  gold_verified: {
    label: "Gold Verified",
    icon: BadgeCheck,
    className: "bg-brand-gold text-brand-navy border-transparent",
  },
  featured: {
    label: "Featured",
    icon: Star,
    className: "bg-brand-navy text-white border-transparent",
  },
  premium_partner: {
    label: "Premium Partner",
    icon: Crown,
    className: "bg-brand-navy text-brand-gold border-brand-gold/40",
  },
  recommended: {
    label: "Recommended",
    icon: ThumbsUp,
    className: "bg-success/10 text-success border-success/20",
  },
  new_agency: {
    label: "New Agency",
    icon: Sparkles,
    className: "bg-brand-gray text-brand-navy border-transparent",
  },
};

export function TrustBadge({
  type,
  className,
  iconOnly = false,
}: {
  type: TrustBadgeType;
  className?: string;
  iconOnly?: boolean;
}) {
  const config = TRUST_BADGE_CONFIG[type];
  const Icon = config.icon;

  return (
    <Badge className={cn(config.className, className)} title={config.label}>
      <Icon />
      {!iconOnly && config.label}
    </Badge>
  );
}

export function TrustBadgeList({
  badges,
  className,
  iconOnly = false,
}: {
  badges: TrustBadgeType[];
  className?: string;
  iconOnly?: boolean;
}) {
  if (!badges?.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {badges.map((b) => (
        <TrustBadge key={b} type={b} iconOnly={iconOnly} />
      ))}
    </div>
  );
}
