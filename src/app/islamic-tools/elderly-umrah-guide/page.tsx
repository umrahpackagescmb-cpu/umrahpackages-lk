import type { Metadata } from "next";
import Link from "next/link";

import { ToolShell } from "@/components/islamic/tool-shell";
import { ToolFaq } from "@/components/islamic/tool-faq";
import { RelatedTools } from "@/components/islamic/related-tools";

export const metadata: Metadata = {
  title: "Umrah for Elderly Pilgrims — A Practical Guide",
  description:
    "Guidance for elderly parents or grandparents performing Umrah — wheelchair access, pacing, medication, and questions to ask your agency before booking.",
  alternates: { canonical: "/islamic-tools/elderly-umrah-guide" },
  keywords: ["umrah for elderly", "umrah wheelchair", "elderly umrah guide", "umrah for parents"],
};

const faqs = [
  {
    question: "Is Umrah physically demanding for elderly pilgrims?",
    answer:
      "Tawaf (walking around the Kaaba) and Sa'i (walking between Safa and Marwah) involve several kilometres of walking in total, often in heat and crowds. It's very achievable for most elderly pilgrims with rest breaks, a wheelchair if needed, and a hotel close to the Haram to minimise extra walking.",
  },
  {
    question: "Can wheelchairs be used during Tawaf and Sa'i?",
    answer:
      "Yes — both the Haram in Makkah and the mosque in Madinah have dedicated wheelchair lanes and wheelchair rental/porter services on site. If you know in advance a wheelchair will be needed, mention it to your agency so they can plan hotel distance and porter arrangements accordingly.",
  },
  {
    question: "What should I check with the agency for an elderly relative?",
    answer:
      "Ask specifically about hotel distance from the Haram (closer is worth paying more for), ground-floor or elevator-accessible rooms, and whether a porter or wheelchair assistant can be arranged. See our Licensed Umrah Operators guide for how to verify the agency itself.",
  },
  {
    question: "Should elderly pilgrims travel with a companion?",
    answer:
      "It's strongly recommended, both for physical support during the rites and for peace of mind in crowded areas. Many agencies offer a discounted or complimentary spot for an accompanying family member on request — ask directly.",
  },
];

export default function ElderlyUmrahGuidePage() {
  return (
    <ToolShell
      eyebrow="Travelling with elderly pilgrims"
      title="Umrah for Elderly Pilgrims"
      description="Practical, non-religious guidance for elderly parents or grandparents performing Umrah — access, pacing, and what to ask your agency."
    >
      <p className="text-sm text-muted-foreground">
        Age alone is rarely a reason to delay Umrah — the two things that matter most are hotel proximity to the
        Haram (walking distance saves real physical strain) and building in enough time to move slowly without
        feeling rushed. Both Masjid al-Haram and Masjid an-Nabawi have wheelchair lanes, ramps, and rental
        wheelchairs available on site.
      </p>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">Before you travel</h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
        <li>• Ask your agency for a hotel within easy walking distance, or confirm shuttle access — see <Link href="/luxury-umrah-packages" className="text-brand-navy underline underline-offset-2">Luxury Umrah Packages</Link> for closer-hotel options.</li>
        <li>• Bring a printed list of current medications and dosages, plus enough supply for the full trip and a few extra days.</li>
        <li>• Check whether the hotel room is ground-floor or elevator-accessible if stairs are a concern.</li>
        <li>• Consider travelling with a companion — see if the agency offers a reduced rate for one.</li>
      </ul>

      <h2 className="mt-8 font-display text-lg font-semibold text-brand-navy">During the rites</h2>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        There&rsquo;s no time limit on completing Tawaf or Sa&rsquo;i — pace deliberately, rest when needed, and use the
        wheelchair lanes if walking the full distance is difficult. Performing the rites at quieter hours (late
        night or just after Fajr) also significantly reduces crowd pressure for anyone who tires easily.
      </p>

      <ToolFaq items={faqs} />
      <RelatedTools exclude="/islamic-tools/elderly-umrah-guide" />
    </ToolShell>
  );
}
