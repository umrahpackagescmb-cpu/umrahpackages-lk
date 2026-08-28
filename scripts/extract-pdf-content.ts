/**
 * Extracts the live content that powers the Step-by-Step Umrah Guide,
 * Packing Checklist, and Pre-Departure Checklist tools into a JSON file,
 * so the offline PDF (generate-umrah-guide-pdf.py) is always built from
 * the exact same content as the website — no hand-copied duplication that
 * could drift out of sync.
 *
 * Run from the project root: npx --yes tsx scripts/extract-pdf-content.ts
 */
import { writeFileSync } from "fs";

import { umrahGuideSteps } from "../src/lib/islamic/umrah-guide";
import { buildChecklist, PROFILE_OPTIONS } from "../src/lib/islamic/packing-checklist";
import { PRE_DEPARTURE_CHECKLIST as preDepartureChecklist } from "../src/lib/islamic/pre-departure-checklist";

// Full packing checklist = base + every profile combined, since a static
// PDF can't be interactive/filtered like the web tool.
const fullPacking = buildChecklist(PROFILE_OPTIONS.map((p) => p.value));

const data = {
  umrahGuideSteps,
  packingChecklist: fullPacking,
  preDepartureChecklist,
};

writeFileSync("/tmp/pdf-content.json", JSON.stringify(data, null, 2));
console.log("Wrote /tmp/pdf-content.json");
console.log("Steps:", umrahGuideSteps.length);
console.log(
  "Packing categories:",
  fullPacking.length,
  "items:",
  fullPacking.reduce((sum, c) => sum + c.items.length, 0),
);
