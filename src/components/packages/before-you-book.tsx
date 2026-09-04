import Link from "next/link";
import { ListChecks, FileCheck, Wallet, ShieldAlert } from "lucide-react";

/**
 * Reciprocal internal linking from package/agency detail pages back into
 * the Islamic Tools guide content — previously traffic only flowed
 * tools -> packages via RelatedTools, never the other way, which left
 * genuinely useful guide content (visa process, packing, budgeting,
 * verifying an agency) undiscoverable from the exact pages where a
 * pilgrim would want it most: right as they're looking at a real package.
 */
const LINKS = [
  { icon: ListChecks, title: "Step-by-Step Umrah Guide", href: "/islamic-tools/umrah-guide" },
  { icon: FileCheck, title: "Umrah Visa Guide", href: "/islamic-tools/umrah-visa-guide" },
  { icon: Wallet, title: "Umrah Budget Calculator", href: "/islamic-tools/umrah-budget-calculator" },
  { icon: ShieldAlert, title: "Verify a Licensed Operator", href: "/licensed-umrah-operators-sri-lanka" },
];

export function BeforeYouBook() {
  return (
    <div className="mt-10 border-t border-border pt-8">
      <h2 className="font-display text-base font-semibold text-brand-navy">Helpful before you book</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-brand-gold hover:text-brand-navy"
          >
            <l.icon className="size-3.5 text-brand-gold-dark" />
            {l.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
