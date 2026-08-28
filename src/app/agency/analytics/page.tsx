import type { Metadata } from "next";
import { Eye, MessageSquare, MousePointerClick, Scale } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { SimpleBarChart } from "@/components/dashboard/simple-bar-chart";
import { Card } from "@/components/ui/card";
import { getAllPackagesForAdmin, getInquiries } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";
import type { InquiryChannel } from "@/types/domain";

export const metadata: Metadata = { title: "Analytics" };

const CHANNEL_LABELS: Record<InquiryChannel, string> = {
  whatsapp: "WhatsApp",
  phone: "Phone",
  email: "Email",
  form: "Contact form",
};

export default async function AgencyAnalyticsPage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const [packages, inquiries] = await Promise.all([
    getAllPackagesForAdmin(agencyId),
    getInquiries({ agencyId }),
  ]);

  const totalViews = packages.reduce((sum, p) => sum + p.viewCount, 0);
  const totalClicks = packages.reduce((sum, p) => sum + p.clickCount, 0);
  const totalCompares = packages.reduce((sum, p) => sum + p.compareCount, 0);
  const totalContacts = packages.reduce((sum, p) => sum + p.contactCount, 0);

  const viewsChartData = [...packages]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6)
    .map((p) => ({ name: p.title.length > 16 ? `${p.title.slice(0, 16)}…` : p.title, value: p.viewCount }));

  const channelCounts = inquiries.reduce(
    (acc, i) => {
      acc[i.channel] = (acc[i.channel] ?? 0) + 1;
      return acc;
    },
    {} as Record<InquiryChannel, number>,
  );
  const channelChartData = (Object.keys(CHANNEL_LABELS) as InquiryChannel[])
    .map((channel) => ({ name: CHANNEL_LABELS[channel], value: channelCounts[channel] ?? 0 }))
    .filter((d) => d.value > 0);

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">Analytics</h1>
        <p className="text-sm text-muted-foreground">How pilgrims are discovering and engaging with your listings.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} accent="gold" />
        <StatCard icon={MousePointerClick} label="Total Clicks" value={totalClicks.toLocaleString()} />
        <StatCard icon={Scale} label="Total Compares" value={totalCompares.toLocaleString()} />
        <StatCard icon={MessageSquare} label="Total Contacts" value={totalContacts.toLocaleString()} accent="gold" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-base font-semibold text-brand-navy">Views by Package</h2>
          {viewsChartData.length > 0 ? (
            <SimpleBarChart data={viewsChartData} color="#c8a24a" />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Add your first package to see performance data here.</p>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-base font-semibold text-brand-navy">Inquiries by Channel</h2>
          {channelChartData.length > 0 ? (
            <SimpleBarChart data={channelChartData} color="#0d1b2a" />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Once pilgrims start reaching out, their preferred channels will show here.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
