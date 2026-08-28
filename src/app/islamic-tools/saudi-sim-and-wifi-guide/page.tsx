import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  PlaneLanding,
  Globe,
  Wifi,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Saudi SIM Card & WiFi Guide — Staying Connected for Umrah",
  description:
    "A practical guide to getting mobile data in Saudi Arabia for Umrah — the main operators, tourist SIMs on arrival, eSIM options, and where to find free WiFi in Makkah and Madinah.",
  alternates: { canonical: "/islamic-tools/saudi-sim-and-wifi-guide" },
  keywords: [
    "saudi arabia sim card",
    "esim saudi arabia",
    "wifi makkah madinah",
    "umrah internet guide",
    "stc mobily zain umrah",
    "saudi arabia data for tourists",
  ],
};

interface GuideSection {
  icon: LucideIcon;
  title: string;
  body: React.ReactNode;
}

const sections: GuideSection[] = [
  {
    icon: Smartphone,
    title: "The three main operators",
    body: (
      <>
        Saudi Arabia is served by three main telecom operators: STC
        (Saudi Telecom Company), Mobily, and Zain. All three run wide
        national networks with coverage across the main cities, including
        Makkah, Madinah and Jeddah, and all three sell prepaid SIM cards
        aimed at visitors as well as regular local plans. You&rsquo;ll see
        branded stores and kiosks for each of them at the airports and
        around the cities.
      </>
    ),
  },
  {
    icon: PlaneLanding,
    title: "Buying a physical SIM on arrival",
    body: (
      <>
        Tourist and visitor SIM cards are commonly sold at kiosks in the
        arrivals area of Saudi airports, including Jeddah and Madinah,
        making it easy to get connected within minutes of landing.
        Operator stores in the cities sell them too if you&rsquo;d rather
        wait. Either way, expect to show your passport to register a
        physical SIM &mdash; this is standard practice in Saudi Arabia
        (and most countries), so keep your passport handy rather than
        packed away when you land.
      </>
    ),
  },
  {
    icon: Globe,
    title: "eSIMs as an alternative",
    body: (
      <>
        eSIMs are an increasingly popular alternative to a physical SIM
        card. International eSIM marketplaces &mdash; Airalo is one
        well-known example &mdash; let you buy a Saudi or regional data
        eSIM online before you even leave home, so your phone can connect
        the moment you land without hunting for a kiosk. It&rsquo;s one
        option among several, not necessarily the right one for every
        phone or every traveller, so check that your device supports eSIM
        and compare it against a local SIM before deciding.
      </>
    ),
  },
];

const pricingNote =
  "Data plans from every operator and eSIM provider vary by data amount and validity period, and prices change over time. Rather than relying on any fixed figure, check current pricing directly with the operator's counter or the eSIM provider's app or website at the time you buy.";

const wifiNote = (
  <>
    Free WiFi is fairly common for visitors &mdash; many hotels, malls,
    and parts of the areas around Masjid al-Haram and Masjid an-Nabawi
    commonly offer it. Network names and passwords change and vary by
    location, so this guide can&rsquo;t responsibly list specific ones
    &mdash; when you arrive, simply look for the mosque&rsquo;s or your
    hotel&rsquo;s official WiFi network and ask staff if you need the
    password.
  </>
);

const faqs = [
  {
    question: "Should I buy a SIM card or an eSIM for Umrah?",
    answer:
      "Either works well. A physical SIM from STC, Mobily or Zain is easy to pick up at the airport on arrival and needs your passport to register. An eSIM lets you sort out data before you fly, provided your phone supports it. Compare current pricing and coverage for both before deciding.",
  },
  {
    question: "Do I need my passport to buy a SIM card?",
    answer:
      "Yes — showing your passport to register a physical SIM is standard practice in Saudi Arabia, as it is in most countries. Keep it accessible in your hand luggage when you land rather than packed in your checked bag.",
  },
  {
    question: "Is WiFi easy to find in Makkah and Madinah?",
    answer:
      "Generally yes — many hotels, malls, and parts of the areas around Masjid al-Haram and Masjid an-Nabawi commonly offer free WiFi for visitors. Ask your hotel for their network details on check-in, and look out for the mosque's official WiFi where available.",
  },
  {
    question: "How much does a Saudi data plan cost?",
    answer:
      "This varies by data amount, validity period, and which operator or eSIM provider you choose, and prices change over time. Check current pricing directly with the operator's counter or the provider's app or website when you're ready to buy, rather than relying on a fixed figure quoted elsewhere.",
  },
];

export default function SaudiSimAndWifiGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Saudi SIM Card & WiFi Guide"
      description="A practical overview of getting connected in Saudi Arabia for Umrah — operators, tourist SIMs, eSIMs, and free WiFi."
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        Having reliable data on your trip helps a lot &mdash; for maps,
        translation apps, and staying in touch with your agency&rsquo;s
        group &mdash; so it&rsquo;s worth sorting out connectivity on day
        one rather than leaving it to chance. Here&rsquo;s a general
        overview of your options for getting online in Saudi Arabia.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {sections.map((section) => (
          <Card key={section.title} className="flex-row items-start gap-4 p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
              <section.icon className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-brand-navy">
                {section.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-brand-navy">
            On pricing:
          </span>{" "}
          {pricingNote}
        </p>
      </Card>

      <div className="mt-8">
        <h2 className="font-display text-base font-semibold text-brand-navy">
          Free WiFi around the Haramain
        </h2>
        <div className="mt-3 flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
            <Wifi className="size-5" />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{wifiNote}</p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand-gold/40 bg-brand-gold/10 p-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
          <Lightbulb className="size-5" />
        </div>
        <p className="text-sm leading-relaxed text-brand-navy">
          A small tip: getting your data sorted on day one &mdash; whether
          that&rsquo;s a SIM from the airport kiosk or an eSIM installed
          before you fly &mdash; means maps, translation apps and your
          group chat all work from the moment you land, which takes a lot
          of friction out of the rest of the trip.
        </p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Planning the rest of your trip? Check out our{" "}
        <Link href="/islamic-tools/packing-checklist" className="font-medium text-brand-navy underline underline-offset-2">
          packing checklist
        </Link>{" "}
        and{" "}
        <Link href="/islamic-tools/saudi-travel-tips-guide" className="font-medium text-brand-navy underline underline-offset-2">
          Saudi travel tips guide
        </Link>{" "}
        to get everything else in order before you fly.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/saudi-sim-and-wifi-guide" />
    </ToolShell>
  );
}
