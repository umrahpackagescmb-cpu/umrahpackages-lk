-- Optional hotel coordinates, supplied by the agency (never fabricated by
-- the platform) so the package page can render a real walking-route map
-- and distance/time to Masjid al-Haram / Masjid an-Nabawi. Left null when
-- an agency hasn't provided them yet — the UI only renders the route map
-- when both lat/lng are present, and falls back to plain text otherwise.
alter table packages
  add column makkah_hotel_lat double precision,
  add column makkah_hotel_lng double precision,
  add column madinah_hotel_lat double precision,
  add column madinah_hotel_lng double precision;

comment on column packages.makkah_hotel_lat is 'Agency-supplied coordinate of the Makkah hotel — used for the walking-route-to-Haram map. Never inferred or geocoded automatically.';
comment on column packages.madinah_hotel_lat is 'Agency-supplied coordinate of the Madinah hotel — used for the walking-route-to-Masjid-an-Nabawi map. Never inferred or geocoded automatically.';
