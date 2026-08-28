import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Clock, MessageSquare, Newspaper, Package, TrendingUp } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { DemoBanner } from "@/components/dashboard/demo-banner";
import { SimpleBarChart } from "@/components/dashboard/simple-bar-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllAgenciesForAdmin, getAllPackagesForAdmin, getAllBlogPostsForAdmin, getInquiries } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  const [agencies, packages, posts, inquiries] = await Promise.all([
    getAllAgenciesForAdmin(),
    getAllPackagesForAdmin(),
    getAllBlogPostsForAdmin(),
    getInquiries(),
  ]);

  const pendingAgencies = agencies.filter((a) => !a.isActive);
  const publishedPackages = packages.filter((p) => p.isPublished);
  const newInquiries = inquiries.filter((i) => i.status === "new");
  const draftPosts = posts.filter((p) => p.status === "draft");

  const topPackages = [...packages]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6)
    .map((p) => ({ name: p.title.length > 18 ? `${p.title.slice(0, 18)}…` : p.title, value: p.viewCount }));

  return (
    <div>
      {!isSupabaseConfigured() && <DemoBanner />}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Overview</h1>
          <p className="text-sm text-muted-foreground">A snapshot of everything happening across UmrahPackages.lk.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Building2} label="Agencies" value={agencies.length} hint={`${agencies.length - pendingAgencies.length} active`} />
        <StatCard icon={Package} label="Packages" value={packages.length} hint={`${publishedPackages.length} published`} accent="gold" />
        <StatCard icon={MessageSquare} label="New Inquiries" value={newInquiries.length} hint={`${inquiries.length} total`} />
        <StatCard icon={Newspaper} label="Blog Posts" value={posts.length} hint={`${draftPosts.length} drafts`} accent="gold" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-brand-navy">
              <TrendingUp className="size-4.5 text-brand-gold-dark" /> Top Packages by Views
            </h2>
          </div>
          <SimpleBarChart data={topPackages} />
        </Card>

        <Card className="gap-4">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-brand-navy">
            <Clock className="size-4.5 text-brand-gold-dark" /> Pending Approval
          </h2>
          {pendingAgencies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No agencies waiting for review right now.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {pendingAgencies.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 rounded-xl bg-brand-gray/40 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-brand-navy">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.city}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">Pending</Badge>
                </div>
              ))}
            </div>
          )}
          <Button variant="outline" size="sm" asChild className="mt-auto">
            <Link href="/admin/agencies">Review Agencies</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
