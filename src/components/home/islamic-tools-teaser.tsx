import Link from "next/link";
import {
  Clock,
  Compass,
  Calendar,
  Calculator,
  BookOpen,
  Timer,
} from "lucide-react";

const tools = [
  { icon: Clock, label: "Prayer Times", href: "/islamic-tools/prayer-times" },
  { icon: Compass, label: "Qibla Finder", href: "/islamic-tools/qibla-finder" },
  { icon: Calendar, label: "Hijri Calendar", href: "/islamic-tools/hijri-calendar" },
  { icon: Timer, label: "Hajj Countdown", href: "/islamic-tools/hajj-countdown" },
  { icon: Calculator, label: "Zakat Calculator", href: "/islamic-tools/zakat-calculator" },
  { icon: BookOpen, label: "Daily Hadith", href: "/islamic-tools/daily-hadith" },
];

export function IslamicToolsTeaser() {
  return (
    <section className="theme-navy relative overflow-hidden bg-brand-navy py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Free for everyone
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Islamic Tools for your journey
            </h2>
            <p className="mt-2 text-white/65">
              Prayer times, Qibla direction, Hijri dates and more — built
              right into the platform.
            </p>
          </div>
          <Link
            href="/islamic-tools"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
          >
            View all tools →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:border-brand-gold/40 hover:bg-white/10"
            >
              <tool.icon className="size-6 text-brand-gold transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium text-white/85">{tool.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
