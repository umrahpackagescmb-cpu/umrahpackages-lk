/**
 * Small helpers for client-side slug/id generation used by admin forms
 * that need to build an optimistic local record before a real database
 * row exists (demo mode has no Supabase project to hand back a real
 * id/slug). Kept in their own plain module — not a component file — so
 * the impure `Date.now()` call here isn't reachable from a component's
 * render path per the react-hooks/purity rule.
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function generateClientId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}
