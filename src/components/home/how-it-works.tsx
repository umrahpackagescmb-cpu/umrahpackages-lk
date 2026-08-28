import { Search, Scale, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Compare packages",
    description:
      "Browse verified Umrah packages from Sri Lankan agencies — filter by price, hotel rating, airline and duration.",
  },
  {
    icon: Scale,
    title: "Choose confidently",
    description:
      "Put packages side by side, check agency trust badges and reviews, and pick the one that fits your budget.",
  },
  {
    icon: MessageCircle,
    title: "Contact the agency",
    description:
      "Reach out directly via WhatsApp or phone to book — we never charge fees or take a cut of your booking.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-gray/50 py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-dark">
            Simple, transparent process
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            How UmrahPackages.lk works
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-gold shadow-soft">
                <step.icon className="size-5" />
              </div>
              <span className="absolute -top-2 -left-2 flex size-6 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-navy">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
