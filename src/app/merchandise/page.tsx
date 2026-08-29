import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Sparkles, Building2 } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Merchandise (Coming Soon)",
  description:
    "A preview of branded UmrahPackages.lk travel gear we're planning to launch — nothing here is available to purchase yet.",
  alternates: { canonical: "/merchandise" },
};

const CONCEPT_PRODUCTS = [
  {
    name: "UmrahPackages.lk Travel Tote",
    image: "/placeholders/merch-1-totebag.jpg",
    description:
      "A durable canvas tote with a subtle embossed logo — sized for carry-on essentials or as a welcome gift from your agency.",
    tag: "Travel bag",
  },
  {
    name: "Anti-Theft Ihram Waist Belt",
    image: "/placeholders/merch-2-waistbelt.jpg",
    description:
      "A hidden passport-and-cash pouch that sits comfortably under Ihram cloth — a category that's easy to find on Amazon or Etsy internationally, but rarely stocked locally.",
    tag: "Security",
  },
  {
    name: "Digital Tasbih Counter",
    image: "/placeholders/merch-3-tasbih-counter.jpg",
    description:
      "A clip-on electronic dhikr counter with a reset button and small display — a compact alternative to traditional beads for long queues at the Haramain.",
    tag: "Worship aid",
  },
  {
    name: "Foldable Prayer Mat + Compass",
    image: "/placeholders/merch-4-prayermat.jpg",
    description:
      "A compact, rollable travel prayer mat with a built-in Qibla compass badge — pairs naturally with our Qibla Finder tool.",
    tag: "Prayer",
  },
  {
    name: "RFID Passport & Document Wallet",
    image: "/placeholders/merch-5-docwallet.jpg",
    description:
      "Slim organizer for passport, visa printout, and boarding passes, with RFID-blocking lining for airport security peace of mind.",
    tag: "Travel documents",
  },
  {
    name: "Umrah Luggage Tag Set",
    image: "/placeholders/merch-6-luggagetag.jpg",
    description:
      "Durable tags with a scannable \"if found\" contact QR code — handy for group departures where bags can look identical.",
    tag: "Luggage",
  },
];

export default function MerchandisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Coming soon — concept preview"
        title="Merchandise"
        description="A first look at branded travel gear we're considering for launch. Nothing on this page can be purchased yet — it's here so you can see the direction and tell us what you think."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Merchandise" }]}
      />

      <div className="container-page py-12">
        <Card className="flex-row items-start gap-4 border-brand-gold/30 bg-brand-gold/5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-brand-navy">This is a concept preview, not a store</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              These products aren&rsquo;t in stock, priced, or ready to ship — we&rsquo;re showing them here to
              gauge interest before committing to payments, inventory, and shipping. If something below catches
              your eye, let us know and we&rsquo;ll prioritize it.
            </p>
          </div>
        </Card>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPT_PRODUCTS.map((p) => (
            <Card key={p.name} className="gap-0 overflow-hidden p-0">
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                <Badge variant="gold" className="absolute top-3 left-3">
                  Coming Soon
                </Badge>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <Badge variant="goldOutline" className="self-start">
                  {p.tag}
                </Badge>
                <h3 className="font-display text-base font-semibold text-brand-navy">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl bg-brand-navy p-8 text-white sm:p-10">
            <h2 className="font-display text-xl font-bold">Want to see this happen sooner?</h2>
            <p className="mt-3 text-sm text-white/70">
              Tell us which item you&rsquo;d actually buy, or what you&rsquo;d want to see instead. Real
              interest is what will decide what we build first.
            </p>
            <Button variant="gold" size="lg" asChild className="mt-6">
              <Link href={`mailto:${siteConfig.contact.email}?subject=Merchandise interest`}>
                <Mail className="size-4" /> Email us your interest
              </Link>
            </Button>
          </div>

          <Card className="flex-row items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold">
              <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-brand-navy">Run a travel agency?</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                We&rsquo;re also exploring bulk, white-label kits that agencies worldwide could hand out to
                their own pilgrims.
              </p>
              <Link
                href="/merchandise/wholesale"
                className="mt-3 inline-block text-sm font-medium text-brand-gold-dark hover:text-brand-navy transition-colors"
              >
                See the wholesale preview →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
