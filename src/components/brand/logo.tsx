import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Brand lockup for UmrahPackages.lk.
 *
 * The icon (arch + Kaaba + crescent) is the graphic mark from
 * /public/brand and is never redrawn. The wordmark is set in real text
 * (Poppins, exact brand colors) rather than a raster image so it stays
 * crisp at every size and remains selectable/SEO-readable — this follows
 * the brand guide's typography and color rules exactly, it does not
 * redesign the mark.
 */
export function Logo({
  className,
  theme = "light",
  showTagline = false,
  iconSize = 40,
  href = "/",
}: {
  className?: string;
  /** "light" = navy text for white backgrounds, "dark" = white text for navy backgrounds */
  theme?: "light" | "dark";
  showTagline?: boolean;
  iconSize?: number;
  href?: string | null;
}) {
  // The tagline is descriptive text alongside the brand mark, not part of
  // the "go to homepage" link itself — kept outside the <Link> below so the
  // link's accessible name (aria-label) still matches its full visible
  // content (WCAG 2.5.3 Label in Name), rather than silently omitting it.
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", !showTagline && className)}>
      <Image
        src="/brand/icon.png"
        alt=""
        // Intrinsic crop dimensions (507×698) — scaled to iconSize via style
        // below so the aspect ratio never distorts.
        width={507}
        height={698}
        priority
        className="shrink-0"
        style={{ height: iconSize, width: "auto" }}
      />
      <span
        className={cn(
          "font-display font-semibold tracking-tight leading-none",
          iconSize >= 36 ? "text-xl" : "text-base",
          theme === "light" ? "text-brand-navy" : "text-white",
        )}
      >
        UmrahPackages<span className="text-brand-gold">.lk</span>
      </span>
    </span>
  );

  const markLink =
    href === null ? (
      mark
    ) : (
      <Link href={href} aria-label="UmrahPackages.lk — home" className="shrink-0">
        {mark}
      </Link>
    );

  if (!showTagline) return markLink;

  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      {markLink}
      <span
        className={cn(
          "text-[10px] font-medium tracking-[0.18em] uppercase",
          theme === "light" ? "text-muted-foreground" : "text-white/60",
        )}
      >
        Compare · Choose · Perform Umrah
      </span>
    </span>
  );
}
