import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, Globe, Syringe, Clock3, Users, Banknote } from "lucide-react";

import { ToolShell } from "@/components/islamic/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah Visa Guide — What Sri Lankan Pilgrims Need to Know",
  description:
    "A plain-language overview of the Umrah visa process for Sri Lankan pilgrims — how agencies arrange it, the Nusuk platform, commonly required documents, and general timeline advice.",
  alternates: { canonical: "/islamic-tools/umrah-visa-guide" },
  keywords: [
    "umrah visa sri lanka",
    "umrah visa requirements",
    "nusuk visa",
    "umrah visa documents",
    "umrah visa process sri lanka",
  ],
};

const faqs = [
  {
    question: "Do I need to apply for my Umrah visa myself?",
    answer:
      "Almost never, if you're travelling on a package. Your travel agency arranges the visa as part of the package price, usually by submitting your documents to Saudi Arabia's official Nusuk platform or through their own accredited channel. You provide documents; the agency handles the application itself.",
  },
  {
    question: "What is Nusuk?",
    answer:
      "Nusuk (nusuk.sa) is the Saudi government's official platform for Umrah and Hajj, covering visas, permits and related services. Most Sri Lankan agencies apply through it or a connected system on your behalf — you generally won't need to use it directly, but it's useful to know it's the legitimate, official channel if you ever want to verify something.",
  },
  {
    question: "How much does the Umrah visa cost?",
    answer:
      "Visa fees apply and do vary, so this guide can't responsibly quote a fixed number here — official fees, insurance components and any service charges can change. Ask your agency for the current amount included in (or added to) your package price.",
  },
  {
    question: "Are visa requirements different for women pilgrims?",
    answer:
      "Some arrangements and requirements for women travelling for Umrah are set by Saudi authorities and have changed over time, so this guide won't state a specific rule that could be outdated by the time you read it. Please confirm current requirements directly with your agency — they handle this regularly and will know exactly what applies to your situation.",
  },
];

export default function UmrahVisaGuidePage() {
  return (
    <ToolShell
      eyebrow="Know before you go"
      title="Umrah Visa Guide"
      description="A plain-language overview of how the Umrah visa process works for Sri Lankan pilgrims — what your agency handles, what you need to provide, and when."
    >
      <p className="text-sm text-muted-foreground">
        The Umrah visa process can sound intimidating, but for the vast
        majority of Sri Lankan pilgrims it&rsquo;s largely handled for you.
        Here&rsquo;s a general, practical overview of how it works, so you
        know what to expect and what to prepare.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <FileCheck className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Your agency arranges the visa</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you&rsquo;re travelling on an Umrah package — which is how
              most Sri Lankan pilgrims travel — the visa is normally arranged
              by your travel agency as part of that package. You are not
              expected to navigate the Saudi visa system on your own. Your
              role is simply to hand over the required documents on time; the
              agency takes care of the application, submission and approval.
              If anything is unclear or missing, they&rsquo;ll usually tell
              you well before it becomes a problem.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Globe className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">The official Nusuk platform</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Saudi Arabia&rsquo;s Ministry of Hajj and Umrah operates{" "}
              <span className="font-medium text-brand-navy">Nusuk</span>{" "}
              (nusuk.sa) as the official government platform for Umrah and
              Hajj, including visas and related permits. Most Sri Lankan
              agencies submit pilgrim applications through Nusuk or a
              connected accredited system on your behalf. You generally
              won&rsquo;t need to create an account or apply there yourself —
              but it&rsquo;s worth knowing the name, since it&rsquo;s the
              legitimate, official channel if you ever need to double-check
              something with your agency.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Syringe className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Documents commonly required</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                <span>
                  <span className="font-medium text-brand-navy">Passport</span>{" "}
                  with at least six months&rsquo; validity remaining from your
                  travel date, with blank visa pages available.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                <span>
                  <span className="font-medium text-brand-navy">Passport-size photographs</span>{" "}
                  — your agency will confirm the exact specifications and how
                  many they need.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                <span>
                  <span className="font-medium text-brand-navy">
                    Meningitis (ACYW135) vaccination certificate
                  </span>{" "}
                  — a long-standing health requirement for Umrah and Hajj
                  travellers set by Saudi authorities.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Health requirements (including which vaccinations are needed,
              and any additional ones) are set by Saudi authorities and can
              be updated from time to time. Please confirm the current
              requirements with your agency close to your departure date
              rather than relying solely on this list.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Clock3 className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Start early</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visa processing needs lead time, so agencies typically ask for
              your documents some weeks ahead of departure rather than at the
              last minute. Exactly how far ahead depends on the agency, the
              season and current processing volumes — your agency will give
              you an exact deadline for your batch, so treat that date as
              firm and submit everything (a valid passport, photos and your
              vaccination certificate) as soon as you have it.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Users className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">A note for women pilgrims</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Travel arrangements and requirements for women performing
              Umrah are set by Saudi authorities and can vary or change over
              time, so we won&rsquo;t state a specific rule here that could
              be out of date. If this applies to you, please confirm the
              current requirements directly with your agency — they handle
              this regularly and can advise on exactly what&rsquo;s needed
              for your situation.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-gray/40">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Banknote className="size-5" />
              </div>
              <CardTitle className="text-brand-navy">Visa fees</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visa fees apply and vary — this guide intentionally doesn&rsquo;t
              quote a fixed amount, since official fees, any insurance
              component, and service charges can change and aren&rsquo;t
              something we can responsibly pin down here. Ask your agency
              what&rsquo;s included in your package price and what, if
              anything, is charged separately.
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Comparing options? Browse verified Umrah{" "}
        <Link href="/packages" className="font-medium text-brand-navy underline underline-offset-2">
          packages
        </Link>{" "}
        from Sri Lankan agencies, or see the full list of{" "}
        <Link href="/agencies" className="font-medium text-brand-navy underline underline-offset-2">
          agencies
        </Link>{" "}
        on this site — every one of them will handle your visa application as
        part of your booking.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/umrah-visa-guide" />
    </ToolShell>
  );
}
