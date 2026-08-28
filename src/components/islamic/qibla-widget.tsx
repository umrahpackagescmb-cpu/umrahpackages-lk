"use client";

import * as React from "react";
import { LocateFixed, Loader2, AlertCircle, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { qiblaBearing, distanceToKaabaKm, compassDirection } from "@/lib/islamic/qibla";

export function QiblaWidget() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "ready" | "error">("idle");
  const [bearing, setBearing] = React.useState<number | null>(null);
  const [distance, setDistance] = React.useState<number | null>(null);

  const locate = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setBearing(qiblaBearing(latitude, longitude));
        setDistance(distanceToKaabaKm(latitude, longitude));
        setStatus("ready");
      },
      () => setStatus("error"),
    );
  };

  return (
    <div>
      {status === "idle" && (
        <Card className="items-center gap-4 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <Navigation className="size-6" />
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            We&rsquo;ll use your device&rsquo;s location to calculate the exact
            direction to the Kaaba in Makkah.
          </p>
          <Button variant="gold" onClick={locate}>
            <LocateFixed className="size-4" /> Find My Qibla Direction
          </Button>
        </Card>
      )}

      {status === "loading" && (
        <Card className="items-center gap-3 py-12 text-center text-muted-foreground">
          <Loader2 className="size-6 animate-spin" /> Getting your location...
        </Card>
      )}

      {status === "error" && (
        <Card className="items-center gap-3 py-12 text-center text-destructive">
          <AlertCircle className="size-6" />
          <p className="text-sm">
            Couldn&rsquo;t access your location. Please allow location access and try again.
          </p>
          <Button variant="outline" size="sm" onClick={locate}>
            Try Again
          </Button>
        </Card>
      )}

      {status === "ready" && bearing != null && (
        <Card className="items-center gap-6 py-10 text-center">
          <div className="relative flex size-56 items-center justify-center rounded-full border-4 border-brand-gray">
            {["N", "E", "S", "W"].map((dir, i) => (
              <span
                key={dir}
                className="absolute text-xs font-semibold text-muted-foreground"
                style={{
                  top: i === 0 ? 8 : i === 2 ? undefined : "50%",
                  bottom: i === 2 ? 8 : undefined,
                  left: i === 3 ? 8 : i === 1 ? undefined : "50%",
                  right: i === 1 ? 8 : undefined,
                  transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                }}
              >
                {dir}
              </span>
            ))}
            <div
              className="absolute flex h-24 w-1.5 items-start justify-center rounded-full bg-brand-gold"
              style={{ transform: `rotate(${bearing}deg)`, transformOrigin: "bottom center", bottom: "50%" }}
            >
              <span className="-mt-2 block size-3 rounded-full bg-brand-gold" />
            </div>
            <div className="size-3 rounded-full bg-brand-navy" />
          </div>

          <div>
            <p className="font-display text-3xl font-bold text-brand-navy">{bearing.toFixed(1)}°</p>
            <p className="text-sm text-muted-foreground">
              {compassDirection(bearing)} from true North · {distance?.toFixed(0)} km to the Kaaba
            </p>
          </div>

          <p className="max-w-sm text-xs text-muted-foreground">
            Hold your phone flat and align the gold marker with a compass
            app or physical compass pointed to true North for the most
            accurate direction.
          </p>

          <Button variant="outline" size="sm" onClick={locate}>
            Refresh
          </Button>
        </Card>
      )}
    </div>
  );
}
