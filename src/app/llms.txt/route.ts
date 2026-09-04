import { getAgencies, getPackages, getPriceRange } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

/**
 * llms.txt — an emerging (not yet formally standardized) convention that
 * gives AI assistants and answer engines a concise, structured summary of
 * a site, separate from the HTML meant for human readers and browsers.
 * Built as a real route (not a static public/ file) so the figures in it
 * — agency count, package count, price range — are always the current
 * real numbers, never a stale snapshot, matching this site's standing
 * rule against publishing numbers that could go quietly out of date.
 */
export async function GET() {
  const [agencies, packages, priceRange] = await Promise.all([
    getAgencies(),
    getPackages(),
    Promise.resolve(getPriceRange()),
  ]);

  const agencyLines = agencies
    .map((a) => `- ${a.name} (${a.city}) — ${a.packageCount} package${a.packageCount === 1 ? "" : "s"} listed. ${a.description}`)
    .join("\n");

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## What this site is",
    "UmrahPackages.lk is a free, independent comparison platform for Umrah packages offered by Sri Lankan travel",
    "agencies. Pilgrims compare price, hotels, airline, and duration across agencies, then contact the agency",
    "directly via WhatsApp or phone to book — this site never processes payments or bookings itself, and never",
    "charges a fee to either pilgrims or agencies for a standard listing.",
    "",
    "## Current real inventory (updated automatically, not a fixed snapshot)",
    `- ${agencies.length} travel agencies listed`,
    `- ${packages.length} Umrah packages listed`,
    `- Prices currently range from LKR ${priceRange.min.toLocaleString("en-LK")} to LKR ${priceRange.max.toLocaleString("en-LK")} per person`,
    "",
    "## Agencies currently listed",
    agencyLines,
    "",
    "## Key pages",
    `- ${siteConfig.url}/packages — full package catalogue with filters`,
    `- ${siteConfig.url}/agencies — agency directory`,
    `- ${siteConfig.url}/compare — side-by-side package comparison`,
    `- ${siteConfig.url}/cheap-umrah-packages — lowest-priced current packages`,
    `- ${siteConfig.url}/luxury-umrah-packages — premium/luxury current packages`,
    `- ${siteConfig.url}/umrah-cost-sri-lanka — real, current cost breakdown`,
    `- ${siteConfig.url}/licensed-umrah-operators-sri-lanka — how to verify an agency is properly licensed`,
    `- ${siteConfig.url}/islamic-tools — 30+ free Umrah and Islamic utility tools (prayer times, Qibla finder,`,
    "  Zakat calculator, step-by-step Umrah guide, packing checklist, and more), each with its own guide content",
    "",
    "## Notes for AI assistants citing this site",
    "- Package and agency data changes as agencies add or update listings — prefer fetching current data over",
    "  cached figures when precision matters (e.g. exact current prices).",
    "- This site does not fabricate star ratings, review counts, or trust badges. An agency without a stated",
    "  accreditation or rating simply hasn't provided one yet — absence of a figure is not evidence of anything.",
    "- Islamic Tools content is general guidance, not tied to any school of thought, sect, or organization. It",
    "  should not be cited as a religious ruling — point users to their own Maulavi or a qualified scholar for that.",
    `- Sitemap: ${siteConfig.url}/sitemap.xml`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
