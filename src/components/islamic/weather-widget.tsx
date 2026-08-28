"use client";

import * as React from "react";
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  Droplets,
  Wind,
  Thermometer,
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudRain,
  CloudLightning,
  CloudSnow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KAABA_COORDS, NABAWI_COORDS } from "@/lib/islamic/landmarks";
import {
  fetchCityWeather,
  weatherCodeLabel,
  heatGuidance,
  type CityWeather,
} from "@/lib/islamic/weather";

const CITIES = [
  { key: "makkah", label: "Makkah", coords: KAABA_COORDS },
  { key: "madinah", label: "Madinah", coords: NABAWI_COORDS },
] as const;

type CityKey = (typeof CITIES)[number]["key"];

/** Small icon matching the plain-English condition label, for a quick visual cue. */
function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0 || code === 1) return <Sun className={className} />;
  if (code === 2 || code === 3) return <Cloud className={className} />;
  if (code === 45 || code === 48) return <CloudFog className={className} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain className={className} />;
  if (code >= 71 && code <= 77) return <CloudSnow className={className} />;
  if (code >= 95) return <CloudLightning className={className} />;
  return <CloudSun className={className} />;
}

const dayLabel = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" });

export function WeatherWidget() {
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = React.useState<Record<CityKey, CityWeather> | null>(null);
  const [city, setCity] = React.useState<CityKey>("makkah");

  const load = React.useCallback(async () => {
    setStatus("loading");
    try {
      const [makkah, madinah] = await Promise.all([
        fetchCityWeather(KAABA_COORDS.lat, KAABA_COORDS.lng),
        fetchCityWeather(NABAWI_COORDS.lat, NABAWI_COORDS.lng),
      ]);
      setData({ makkah, madinah });
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  React.useEffect(() => {
    const run = () => {
      load();
    };
    run();
  }, [load]);

  if (status === "loading") {
    return (
      <Card className="items-center gap-3 py-12 text-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" /> Fetching live weather for Makkah &amp; Madinah...
      </Card>
    );
  }

  if (status === "error" || !data) {
    return (
      <Card className="items-center gap-3 py-12 text-center text-destructive">
        <AlertCircle className="size-6" />
        <p className="text-sm">
          Couldn&rsquo;t load live weather data right now. Please check your connection and try again.
        </p>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="size-4" /> Try Again
        </Button>
      </Card>
    );
  }

  const active = data[city];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={city} onValueChange={(v) => setCity(v as CityKey)}>
          <TabsList>
            {CITIES.map((c) => (
              <TabsTrigger key={c.key} value={c.key}>
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="size-4" /> Refresh
        </Button>
      </div>

      <Card className="mt-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <WeatherIcon code={active.weatherCode} className="size-7" />
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-brand-navy">
              {Math.round(active.temp)}°C
            </p>
            <p className="text-sm text-muted-foreground">
              {weatherCodeLabel(active.weatherCode)} · Feels like {Math.round(active.feelsLike)}°C
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-brand-gray/50 p-4">
          <div className="flex items-start gap-2">
            <Thermometer className="mt-0.5 size-4 shrink-0 text-brand-gold-dark" />
            <p className="text-sm text-foreground">{heatGuidance(active.temp)}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-brand-gray/50 p-3">
            <Droplets className="size-4 text-brand-gold-dark" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-semibold text-brand-navy">{Math.round(active.humidity)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-brand-gray/50 p-3">
            <Wind className="size-4 text-brand-gold-dark" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-semibold text-brand-navy">{Math.round(active.windSpeed)} km/h</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            5-day forecast
          </p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {active.daily.map((day, i) => (
              <div
                key={day.date}
                className="flex flex-col items-center gap-1 rounded-xl bg-brand-gray/50 p-2 text-center"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {i === 0 ? "Today" : dayLabel(day.date)}
                </p>
                <WeatherIcon code={day.weatherCode} className="size-4 text-brand-gold-dark" />
                <p className="text-xs font-semibold text-brand-navy">{Math.round(day.maxTemp)}°</p>
                <p className="text-xs text-muted-foreground">{Math.round(day.minTemp)}°</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="muted">Live data via Open-Meteo</Badge>
        {active.temp > 40 && <Badge variant="outline" className="border-destructive/30 text-destructive">Extreme heat</Badge>}
      </div>
    </div>
  );
}
