import type { Metadata } from "next";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { gregorianToHijri, HIJRI_MONTHS } from "@/lib/islamic/hijri";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Hijri Calendar — Today's Islamic Date",
  description: "See today's date and this month's full calendar in the Islamic (Hijri) calendar, mapped side by side with the Gregorian calendar — free, updates automatically.",
  alternates: { canonical: "/islamic-tools/hijri-calendar" },
  keywords: ["hijri calendar", "islamic calendar", "islamic date today", "hijri date today", "arabic calendar"],
};

const faqs = [
  {
    question: "What is the Hijri calendar?",
    answer: "The Hijri calendar is the Islamic lunar calendar, counted from the year of the Prophet Muhammad's ﷺ migration (Hijra) from Makkah to Madinah. It has 12 lunar months and is roughly 10-11 days shorter than the Gregorian solar year.",
  },
  {
    question: "Why does today's Hijri date sometimes differ by a day online?",
    answer: "The Hijri calendar traditionally starts each month with the sighting of the new moon, which can vary slightly by location and method. This calendar uses the widely-used tabular (calculated) approach, which may differ by a day from your local mosque's moon-sighting announcement.",
  },
  {
    question: "Why do Islamic months matter for planning Umrah?",
    answer: "Umrah can be performed year-round, but certain months — like Ramadan, and the months around Hajj — are especially significant and busier for pilgrims, which affects both spiritual timing and package availability and pricing.",
  },
];

export default function HijriCalendarPage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return { date, hijri: gregorianToHijri(date) };
  });

  const monthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const todayHijri = gregorianToHijri(today);

  return (
    <ToolShell
      eyebrow="This month"
      title="Hijri Calendar"
      description="Gregorian dates mapped to the Islamic calendar for the current month."
    >
      <Card className="items-center gap-1 py-6 text-center">
        <p className="text-sm text-muted-foreground">Today is</p>
        <p className="font-display text-2xl font-bold text-brand-navy">
          {todayHijri.hd} {HIJRI_MONTHS[todayHijri.hm - 1]} {todayHijri.hy} AH
        </p>
        <p className="text-sm text-muted-foreground">
          {today.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </Card>

      <div className="mt-6">
        <h2 className="text-center font-display font-semibold text-brand-navy">{monthName}</h2>
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-1 font-medium">{d}</div>
          ))}
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {days.map(({ date, hijri }) => {
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div
                key={date.toISOString()}
                className={`flex flex-col items-center gap-0.5 rounded-lg py-2 ${isToday ? "bg-brand-navy text-white" : "bg-brand-gray/40"}`}
              >
                <span className="text-sm font-semibold">{date.getDate()}</span>
                <span className={`text-[10px] ${isToday ? "text-brand-gold" : "text-muted-foreground"}`}>
                  {hijri.hd}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Hijri dates are calculated using the tabular Islamic calendar and
        may differ by a day from local moon-sighting announcements.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/hijri-calendar" />
    </ToolShell>
  );
}
