import { Info } from "lucide-react";

/** Shown at the top of every dashboard page while no Supabase project is
 * connected yet. All the UI/UX, RLS-aware data shapes, and mutation
 * plumbing are fully wired — this banner just makes clear that actions
 * taken right now (approving an agency, editing a package...) demonstrate
 * the flow but don't persist, since there's nowhere yet for them to be
 * saved. See supabase/README.md to connect a real project. */
export function DemoBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
      <Info className="mt-0.5 size-4.5 shrink-0 text-brand-gold-dark" />
      <p>
        <span className="font-semibold">Demo mode.</span> No Supabase project
        is connected yet, so this dashboard is browsable against sample data.
        Actions here (approving an agency, editing a package...) update the
        screen but won&rsquo;t be saved until a real project is connected —
        see <code className="rounded bg-white/60 px-1 py-0.5 text-xs">supabase/README.md</code>.
      </p>
    </div>
  );
}
