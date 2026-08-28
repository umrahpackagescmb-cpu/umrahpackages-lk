import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/dashboard-shell";
import { DEMO_AGENCY_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const AGENCY_NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/agency", icon: "overview" },
  { label: "Packages", href: "/agency/packages", icon: "packages" },
  { label: "Inquiries", href: "/agency/inquiries", icon: "inquiries" },
  { label: "Analytics", href: "/agency/analytics", icon: "analytics" },
  { label: "Profile", href: "/agency/profile", icon: "profile" },
];

export default async function AgencyLayout({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const profile = await getSessionProfile();

  if (configured) {
    if (!profile) redirect("/sign-in?redirect=/agency");
    if (profile.role !== "travel_agency" || !profile.agencyId) redirect("/");
  }

  const activeProfile = profile ?? DEMO_AGENCY_PROFILE;

  return (
    <DashboardShell
      portalLabel="Travel Agency"
      navItems={AGENCY_NAV}
      userName={activeProfile.fullName ?? "Agency"}
      userSubline={activeProfile.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
