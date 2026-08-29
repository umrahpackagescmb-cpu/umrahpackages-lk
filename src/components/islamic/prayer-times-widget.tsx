"use client";

import * as React from "react";
import { Loader2, LocateFixed, AlertCircle, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  SRI_LANKA_CITIES,
  COUNTRIES,
  PRAYER_LABELS,
  fetchPrayerTimes,
  fetchPrayerTimesByCity,
  type PrayerTimings,
} from "@/lib/islamic/prayer-times";

type Mode = "sri-lanka" | "worldwide" | "location";

const MODES: { key: Mode; label: string }[] = [
  { key: "sri-lanka", label: "Sri Lanka" },
  { key: "worldwide", label: "Other Countries" },
  { key: "location", label: "My Location" },
];

export function PrayerTimesWidget() {
  const [mode, setMode] = React.useState<Mode>("sri-lanka");
  const [city, setCity] = React.useState(SRI_LANKA_CITIES[0].name);
  const [country, setCountry] = React.useState(COUNTRIES[0]);
  const [worldCity, setWorldCity] = React.useState("Makkah");
  const [timings, setTimings] = React.useState<PrayerTimings | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [locationLabel, setLocationLabel] = React.useState(SRI_LANKA_CITIES[0].name);

  const loadByCoords = React.useCallback(async (lat: number, lng: number, label: string) => {
    setStatus("loading");
    try {
      const data = await fetchPrayerTimes(lat, lng);
      setTimings(data);
      setLocationLabel(label);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  const loadByCity = React.useCallback(async (cityName: string, countryName: string) => {
    setStatus("loading");
    try {
      const data = await fetchPrayerTimesByCity(cityName, countryName);
      setTimings(data);
      setLocationLabel(`${cityName}, ${countryName}`);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  const useMyLocation = React.useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude, "Your location"),
      () => setStatus("error"),
    );
  }, [loadByCoords]);

  // Sri Lanka mode (the default): load whenever the selected city changes.
  React.useEffect(() => {
    const run = () => {
      if (mode !== "sri-lanka") return;
      const selected = SRI_LANKA_CITIES.find((c) => c.name === city) ?? SRI_LANKA_CITIES[0];
      loadByCoords(selected.lat, selected.lng, selected.name);
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, city]);

  const handleWorldwideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worldCity.trim()) return;
    loadByCity(worldCity.trim(), country);
  };

  return (
    <div>
      <div className="inline-flex flex-wrap gap-1 rounded-xl bg-brand-gray/60 p-1" role="tablist" aria-label="Prayer time location filter">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => setMode(m.key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              mode === m.key
                ? "bg-white text-brand-navy shadow-xs"
                : "text-muted-foreground hover:text-brand-navy",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {mode === "sri-lanka" && (
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="min-w-56" aria-label="Select Sri Lankan city for prayer times">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SRI_LANKA_CITIES.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {mode === "worldwide" && (
          <form onSubmit={handleWorldwideSubmit} className="flex flex-wrap items-center gap-2">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="min-w-48" aria-label="Select country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={worldCity}
              onChange={(e) => setWorldCity(e.target.value)}
              placeholder="City, e.g. Makkah"
              aria-label="City name"
              className="max-w-48"
            />
            <Button type="submit" variant="outline">
              <Search className="size-4" /> Get times
            </Button>
          </form>
        )}

        {mode === "location" && (
          <Button variant="outline" onClick={useMyLocation}>
            <LocateFixed className="size-4" /> Use my current location
          </Button>
        )}
      </div>

      <Card className="mt-6">
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> Fetching prayer times...
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center justify-center gap-2 py-10 text-destructive">
            <AlertCircle className="size-5" /> Couldn&rsquo;t load prayer times. Please check the
            city/country and try again.
          </div>
        )}
        {status === "idle" && timings && (
          <>
            <p className="text-sm text-muted-foreground">Prayer times for</p>
            <p className="font-display text-lg font-semibold text-brand-navy">{locationLabel}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PRAYER_LABELS.map(({ key, label }) => (
                <div key={key} className="rounded-xl bg-brand-gray/50 p-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-brand-navy">
                    {timings[key]}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        {status === "idle" && !timings && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Choose a city and country, or use your current location, to see prayer times.
          </p>
        )}
      </Card>

      <p className="mt-4 text-xs text-muted-foreground">
        Calculated using the Muslim World League method via the free Aladhan
        API. For Umrah/Hajj travel, always confirm local mosque
        announcements once in Makkah/Madinah.
      </p>
    </div>
  );
}
