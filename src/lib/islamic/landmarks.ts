import { KAABA_COORDS } from "@/lib/islamic/qibla";

export { KAABA_COORDS };

/** Well-known public coordinates of Al-Masjid an-Nabawi (the Prophet's
 * Mosque), Madinah — same public-landmark status as KAABA_COORDS. */
export const NABAWI_COORDS = { lat: 24.4672, lng: 39.6112 };

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Straight-line (haversine) distance in km — used as the honest fallback
 * label ("approx., straight-line") when the walking-route API is
 * unreachable, rather than presenting a route distance we don't have. */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lng2 - lng1);
  const a = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export interface WalkingRoute {
  /** [lat, lng] pairs tracing the actual street route, for drawing a polyline. */
  path: [number, number][];
  distanceKm: number;
  durationMin: number;
  /** false when we only got a straight-line fallback (routing API unreachable). */
  isRealRoute: boolean;
}

/**
 * Fetches a real pedestrian route from OSRM's free public demo server (no
 * API key, no account — matches the project's zero-cost requirement). Best
 * effort: on any failure/timeout, falls back to a straight-line estimate
 * so the UI never breaks, but callers should check `isRealRoute` and label
 * the fallback honestly rather than presenting it as an actual route.
 */
export async function fetchWalkingRoute(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
): Promise<WalkingRoute> {
  const straightLineKm = haversineKm(fromLat, fromLng, toLat, toLng);
  const fallback: WalkingRoute = {
    path: [
      [fromLat, fromLng],
      [toLat, toLng],
    ],
    distanceKm: straightLineKm,
    // ~4.5 km/h average walking pace, generous for pilgrims carrying bags.
    durationMin: Math.round((straightLineKm / 4.5) * 60),
    isRealRoute: false,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/foot/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);
    if (!res.ok) return fallback;

    const data = await res.json();
    const route = data?.routes?.[0];
    const coords: [number, number][] | undefined = route?.geometry?.coordinates;
    if (!route || !coords?.length) return fallback;

    return {
      path: coords.map(([lng, lat]: [number, number]) => [lat, lng]),
      distanceKm: route.distance / 1000,
      durationMin: Math.round(route.duration / 60),
      isRealRoute: true,
    };
  } catch {
    return fallback;
  }
}
