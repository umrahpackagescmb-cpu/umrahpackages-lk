"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Leaflet reads `window`/`document` at import time, so this must never run
// during SSR — loaded client-only, with a skeleton matching the map's
// final size so there's no layout shift once it mounts.
const HotelRouteMapInner = dynamic(
  () => import("@/components/islamic/hotel-route-map").then((m) => m.HotelRouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center gap-2 rounded-2xl border border-border bg-brand-gray/30 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading map...
      </div>
    ),
  },
);

export { HotelRouteMapInner as HotelRouteMap };
