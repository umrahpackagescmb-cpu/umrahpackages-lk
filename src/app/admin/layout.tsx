import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/dashboard-shell";
import { DEMO_ADMIN_PROFILE, STAFF_ROLES, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const ADMIN_NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/admin", icon: "overview" },
  { label: "Agencies", href: "/admin/agencies", icon: "agencies" },
  { label: "Packages", href: "/admin/packages", icon: "packages" },
  { label: "Blog", href: "/admin/blog", icon: "blog" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "inquiries" },
  { label: "Roles", href: "/admin/roles", icon: "roles" },
];

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  content_manager: "Content Manager",
  moderator: "Moderator",
  editor: "Editor",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const profile = await getSessionProfile();

  if (configured) {
    if (!profile) redirect("/sign-in?redirect=/admin");
    if (!STAFF_ROLES.includes(profile.role)) redirect("/");
  }

  const activeProfile = profile ?? DEMO_ADMIN_PROFILE;
  const nav = activeProfile.role === "super_admin" ? ADMIN_NAV : ADMIN_NAV.filter((item) => item.href !== "/admin/roles");

  return (
    <DashboardShell
      portalLabel={ROLE_LABELS[activeProfile.role] ?? "Staff"}
      navItems={nav}
      userName={activeProfile.fullName ?? "Admin"}
      userSubline={activeProfile.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
