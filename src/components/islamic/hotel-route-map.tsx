"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2, Footprints } from "lucide-react";

import { fetchWalkingRoute, type WalkingRoute } from "@/lib/islamic/landmarks";

const hotelIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#0D1B2A;border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const landmarkIcon = L.divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#C8A24A;border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/**
 * Real walking-route map from an agency-supplied hotel coordinate to a
 * holy site (Masjid al-Haram / Al-Masjid an-Nabawi), drawn with Leaflet +
 * OpenStreetMap tiles (free, no API key). The route line comes from OSRM's
 * free public routing API when reachable; otherwise a straight dashed line
 * is shown and clearly labeled as an estimate — never presented as if it
 * were the real street route.
 */
export function HotelRouteMap({
  hotelLat,
  hotelLng,
  hotelLabel,
  landmarkLat,
  landmarkLng,
  landmarkLabel,
}: {
  hotelLat: number;
  hotelLng: number;
  hotelLabel: string;
  landmarkLat: number;
  landmarkLng: number;
  landmarkLabel: string;
}) {
  const [route, setRoute] = React.useState<WalkingRoute | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetchWalkingRoute(hotelLat, hotelLng, landmarkLat, landmarkLng).then((r) => {
      if (!cancelled) setRoute(r);
    });
    return () => {
      cancelled = true;
    };
  }, [hotelLat, hotelLng, landmarkLat, landmarkLng]);

  const center: [number, number] = [(hotelLat + landmarkLat) / 2, (hotelLng + landmarkLng) / 2];

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="relative h-64 w-full">
        <MapContainer center={center} zoom={15} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[hotelLat, hotelLng]} icon={hotelIcon}>
            <Tooltip direction="top">{hotelLabel}</Tooltip>
          </Marker>
          <Marker position={[landmarkLat, landmarkLng]} icon={landmarkIcon}>
            <Tooltip direction="top">{landmarkLabel}</Tooltip>
          </Marker>
          {route && (
            <Polyline
              positions={route.path}
              pathOptions={{
                color: "#C8A24A",
                weight: 4,
                opacity: 0.9,
                dashArray: route.isRealRoute ? undefined : "6 8",
              }}
            />
          )}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between gap-3 bg-brand-gray/50 px-4 py-3">
        {route ? (
          <div className="flex items-center gap-2 text-sm">
            <Footprints className="size-4 text-brand-gold-dark" />
            <span className="font-semibold text-brand-navy">{route.distanceKm.toFixed(1)} km</span>
            <span className="text-muted-foreground">
              · approx. {route.durationMin} min walk to {landmarkLabel}
              {!route.isRealRoute && " (straight-line estimate)"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" /> Calculating walking route...
          </div>
        )}
      </div>
    </div>
  );
}
