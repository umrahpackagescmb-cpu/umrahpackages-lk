import { redirect } from "next/navigation";

// This page was superseded by the full Islamic Names database at
// /islamic-names (1,000+ names, filterable, with individual detail pages —
// see src/app/islamic-names/). Redirecting rather than keeping both live
// avoids two pages competing for the same "Islamic names" search intent.
export default function IslamicNamesRedirectPage() {
  redirect("/islamic-names");
}
