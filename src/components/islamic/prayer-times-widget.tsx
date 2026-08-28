"use client";

import * as React from "react";
import { Loader2, LocateFixed, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SRI_LANKA_CITIES, PRAYER_LABELS, fetchPrayerTimes, type PrayerTimings } from "@/lib/islamic/prayer-times";

export function PrayerTimesWidget() {
  const [city, setCity] = React.useState(SRI_LANKA_CITIES[0].name);
  const [timings, setTimings] = React.useState<PrayerTimings | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [locationLabel, setLocationLabel] = React.useState(SRI_LANKA_CITIES[0].name);

  const load = React.useCallback(async (lat: number, lng: number, label: string) => {
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

  React.useEffect(() => {
    const run = () => {
      const selected = SRI_LANKA_CITIES.find((c) => c.name === city) ?? SRI_LANKA_CITIES[0];
      load(selected.lat, selected.lng, selected.name);
    };
    run();
  }, [city, load]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => load(pos.coords.latitude, pos.coords.longitude, "Your location"),
      () => setStatus("error"),
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="min-w-56" aria-label="Select city for prayer times">
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
        <Button variant="outline" onClick={useMyLocation}>
          <LocateFixed className="size-4" /> Use my location
        </Button>
      </div>

      <Card className="mt-6">
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> Fetching prayer times...
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center justify-center gap-2 py-10 text-destructive">
            <AlertCircle className="size-5" /> Couldn&rsquo;t load prayer times. Please try again.
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
      </Card>

      <p className="mt-4 text-xs text-muted-foreground">
        Calculated using the Muslim World League method via the free Aladhan
        API. For Umrah/Hajj travel, always confirm local mosque
        announcements once in Makkah/Madinah.
      </p>
    </div>
  );
}
