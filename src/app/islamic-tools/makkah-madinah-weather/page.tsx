import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { WeatherWidget } from "@/components/islamic/weather-widget";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Makkah & Madinah Weather — Live Temperature & Heat Guide",
  description: "Live current temperature, feels-like heat, humidity, wind, and a 5-day forecast for Makkah and Madinah, plus plain-language heat guidance for Umrah pilgrims.",
  alternates: { canonical: "/islamic-tools/makkah-madinah-weather" },
  keywords: ["weather in makkah", "weather in madinah", "makkah temperature", "madinah temperature", "makkah weather forecast", "umrah weather"],
};

const faqs = [
  {
    question: "How accurate is this forecast?",
    answer: "This tool pulls live current conditions and a 5-day forecast directly from Open-Meteo, a public weather service, and updates whenever you press Refresh. Short-range forecasts (1-2 days out) are generally reliable; accuracy naturally drops a little further out, as with any weather forecast.",
  },
  {
    question: "What should I pack for the heat?",
    answer: "Light, breathable, loose-fitting clothing, a wide-brim hat or umbrella for sun protection, high-SPF sunscreen, and a refillable water bottle are essentials year-round. Between May and September, when temperatures often exceed 40°C, also plan to limit outdoor time during the early-afternoon peak heat.",
  },
  {
    question: "Is Ramadan always hot?",
    answer: "Not necessarily. Because the Islamic (Hijri) calendar is lunar, Ramadan shifts roughly 10-11 days earlier each Gregorian year and cycles through every season over time — so it can fall in the cooler winter months or the peak summer heat, depending on the year. Check this tool closer to your travel dates for the actual conditions.",
  },
];

export default function MakkahMadinahWeatherPage() {
  return (
    <ToolShell
      eyebrow="Plan for the climate"
      title="Makkah & Madinah Weather"
      description="Live temperature, feels-like heat, and a 5-day forecast for both holy cities."
    >
      <WeatherWidget />

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Makkah and Madinah sit in the Arabian desert, so heat is a real
        factor to plan around when performing Umrah. Roughly May through
        September is the hottest stretch, with daytime temperatures
        regularly climbing past 40°C and intense direct sun — hydration and
        shade become essential, especially during Tawaf and the walk
        between the Haram and your hotel. November through February is
        noticeably cooler and more comfortable, typically in the 20s°C,
        which is why many pilgrims prefer to travel during those months.
        Whenever you go, check the live conditions above a day or two
        before you travel so you can pack and plan accordingly.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/makkah-madinah-weather" />
    </ToolShell>
  );
}
