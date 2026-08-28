export interface DailyForecastDay {
  date: string; // ISO date, e.g. "2026-08-24"
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface CityWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  daily: DailyForecastDay[];
}

/**
 * Open-Meteo (https://open-meteo.com) — genuinely free forecast API, no API
 * key and no account required. Called directly from the browser since it's
 * meant for public client-side use like this.
 */
export async function fetchCityWeather(lat: number, lng: number): Promise<CityWeather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=auto&forecast_days=5`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  const json = await res.json();

  const current = json?.current;
  const daily = json?.daily;
  if (!current || !daily) throw new Error("Unexpected weather response");

  const days: DailyForecastDay[] = (daily.time as string[]).map((date, i) => ({
    date,
    maxTemp: daily.temperature_2m_max[i],
    minTemp: daily.temperature_2m_min[i],
    weatherCode: daily.weather_code[i],
  }));

  return {
    temp: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    daily: days,
  };
}

/**
 * Maps Open-Meteo's WMO weather codes to a short plain-English label.
 * https://open-meteo.com/en/docs — standard WMO weather interpretation codes.
 */
export function weatherCodeLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

/** Plain-language heat guidance for pilgrims based on current temperature (°C). */
export function heatGuidance(tempC: number): string {
  if (tempC > 40) {
    return "Extreme heat — stay hydrated, avoid peak afternoon sun, use an umbrella.";
  }
  if (tempC >= 30) {
    return "Very hot — drink water regularly and limit time outdoors during midday.";
  }
  return "Comfortable — still stay hydrated, especially during Tawaf and long walks.";
}
