import type { Metadata } from "next";
import Link from "next/link";
import { Eye, MessageSquare, MousePointerClick, Package, ShieldAlert } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { SimpleBarChart } from "@/components/dashboard/simple-bar-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllPackagesForAdmin, getAgencyById, getInquiries } from "@/lib/data";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Agency Overview" };

export default async function AgencyOverviewPage() {
  const sessionProfile = (await getSessionProfile()) ?? DEMO_AGENCY_PROFILE;
  const agencyId = sessionProfile.agencyId!;

  const [agency, packages, inquiries] = await Promise.all([
    getAgencyById(agencyId),
    getAllPackagesForAdmin(agencyId),
    getInquiries({ agencyId }),
  ]);

  const publishedCount = packages.filter((p) => p.isPublished).length;
  const totalViews = packages.reduce((sum, p) => sum + p.viewCount, 0);
  const totalContacts = packages.reduce((sum, p) => sum + p.contactCount, 0);
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const chartData = [...packages]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6)
    .map((p) => ({ name: p.title.length > 16 ? `${p.title.slice(0, 16)}…` : p.title, value: p.viewCount }));

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">
            Welcome back{agency ? `, ${agency.name}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground">Here&rsquo;s how your listings are performing.</p>
        </div>
      </div>

      {agency && !agency.isActive && (
        <Card className="mt-6 flex-row items-start gap-3 border-brand-gold/40 bg-brand-gold/10">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-brand-gold-dark" />
          <div>
            <p className="font-display font-semibold text-brand-navy">Your agency is pending approval</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your packages won&rsquo;t appear publicly until our team verifies your agency. Feel free to
              set up your profile and packages in the meantime — they&rsquo;ll go live the moment you&rsquo;re approved.
            </p>
          </div>
        </Card>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Packages" value={packages.length} hint={`${publishedCount} published`} />
        <StatCard icon={Eye} label="Total Views" value={totalViews.toLocaleString()} accent="gold" />
        <StatCard icon={MousePointerClick} label="Total Contacts" value={totalContacts.toLocaleString()} />
        <StatCard icon={MessageSquare} label="New Inquiries" value={newInquiries} hint={`${inquiries.length} total`} accent="gold" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-base font-semibold text-brand-navy">Views by Package</h2>
          {chartData.length > 0 ? (
            <SimpleBarChart data={chartData} color="#c8a24a" />
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Add your first package to see performance data here.</p>
          )}
        </Card>

        <Card className="gap-4">
          <h2 className="font-display text-base font-semibold text-brand-navy">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Button variant="gold" size="sm" asChild>
              <Link href="/agency/packages/new">Add a Package</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/agency/inquiries">View Inquiries</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/agency/profile">Edit Profile</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
