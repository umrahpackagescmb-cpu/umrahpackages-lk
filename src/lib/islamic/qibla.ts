export const KAABA_COORDS = { lat: 21.4225, lng: 39.8262 };

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/** Great-circle initial bearing (degrees from true North, 0–360) from the
 * given point to the Kaaba. */
export function qiblaBearing(lat: number, lng: number): number {
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_COORDS.lat);
  const deltaLambda = toRad(KAABA_COORDS.lng - lng);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x);

  return (toDeg(theta) + 360) % 360;
}

/** Great-circle distance in km (haversine). */
export function distanceToKaabaKm(lat: number, lng: number): number {
  const R = 6371;
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_COORDS.lat);
  const dPhi = toRad(KAABA_COORDS.lat - lat);
  const dLambda = toRad(KAABA_COORDS.lng - lng);

  const a =
    Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function compassDirection(bearing: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[Math.round(bearing / 22.5) % 16];
}
