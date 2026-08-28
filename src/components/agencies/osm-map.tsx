/**
 * OpenStreetMap embed — free, no API key, no paid tier (per the project's
 * zero-cost requirement). If richer interaction is ever needed, swap this
 * for react-leaflet + OSM tiles without touching call sites.
 */
export function OsmMap({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  const delta = 0.012;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        className="h-72 w-full"
        loading="lazy"
      />
      <div className="flex items-center justify-between bg-brand-gray/50 px-4 py-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-gold-dark hover:text-brand-navy"
        >
          View larger map →
        </a>
      </div>
    </div>
  );
}
