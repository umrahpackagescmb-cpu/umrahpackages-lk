import type { Metadata } from "next";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  FileEdit,
  Building2,
  Gavel,
  PenSquare,
  Info,
  ArrowLeft,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_ADMIN_PROFILE, getSessionProfile, isSupabaseConfigured } from "@/lib/auth/session";
import type { UserRole } from "@/types/domain";

export const metadata: Metadata = { title: "Roles & Permissions" };

interface RoleInfo {
  role: UserRole;
  label: string;
  icon: typeof Crown;
  summary: string;
  permissions: string[];
  scope: "staff" | "agency";
}

// Descriptions below are drawn directly from the RLS policies in
// supabase/migrations/0002_rls_policies.sql, not invented — see the
// referenced policy names for the exact rule each permission maps to.
const ROLES: RoleInfo[] = [
  {
    role: "super_admin",
    label: "Super Admin",
    icon: Crown,
    scope: "staff",
    summary: "Full platform control — the only role that can assign trust badges or change another user's role.",
    permissions: [
      "Manage every profile, including changing anyone's role (\"profiles: super admin manage all\")",
      "Assign or remove trust badges on any agency — exclusively this role (\"agency_badges: super admin manage\")",
      "Approve/reject agencies and edit any agency's profile (\"agencies: admin/content_manager manage all\")",
      "Full package management across every agency (\"packages: admin/content_manager manage all\")",
      "Create, edit, publish and delete blog posts (\"blog_posts: staff manage\")",
      "View and manage all inquiries across agencies (\"inquiries: staff read/manage all\")",
    ],
  },
  {
    role: "admin",
    label: "Admin",
    icon: ShieldCheck,
    scope: "staff",
    summary: "Day-to-day operations across agencies, packages, blog and inquiries — everything except badges and role changes.",
    permissions: [
      "Approve/reject agency registrations and edit any agency's profile (\"agencies: admin/content_manager manage all\")",
      "Full package management across every agency (\"packages: admin/content_manager manage all\")",
      "Create, edit, publish and delete blog posts (\"blog_posts: staff manage\")",
      "View and manage all inquiries across agencies (\"inquiries: staff read/manage all\")",
      "View all staff and agency profiles (\"profiles: staff read all\")",
      "Cannot assign trust badges or change a user's role — Super Admin only",
    ],
  },
  {
    role: "content_manager",
    label: "Content Manager",
    icon: FileEdit,
    scope: "staff",
    summary: "Manages agency listings, package content and the blog — the operational content role, without user administration.",
    permissions: [
      "Approve/reject agency registrations and edit any agency's profile (\"agencies: admin/content_manager manage all\")",
      "Full package management across every agency (\"packages: admin/content_manager manage all\")",
      "Create, edit, publish and delete blog posts (\"blog_posts: staff manage\")",
      "View and manage all inquiries across agencies (\"inquiries: staff read/manage all\")",
      "View all staff and agency profiles (\"profiles: staff read all\")",
      "Cannot assign trust badges or change a user's role",
    ],
  },
  {
    role: "editor",
    label: "Editor",
    icon: PenSquare,
    scope: "staff",
    summary: "Focused on the blog — writes and publishes articles, with read access elsewhere but no agency or package management.",
    permissions: [
      "Create, edit, publish and delete blog posts (\"blog_posts: staff manage\")",
      "Manage tags and the maulavi directory (\"tags/maulavis: staff manage\")",
      "View and manage all inquiries across agencies (\"inquiries: staff read/manage all\")",
      "Read all agencies, packages and staff profiles, but cannot edit them",
      "Cannot manage agencies, packages, trust badges, or user roles",
    ],
  },
  {
    role: "moderator",
    label: "Moderator",
    icon: Gavel,
    scope: "staff",
    summary: "Reviews activity and triages leads across the platform without editing agency or package listings.",
    permissions: [
      "View and manage all inquiries across agencies (\"inquiries: staff read/manage all\")",
      "Read all agencies, packages and staff profiles for review purposes",
      "Cannot edit agencies or packages (write access is admin/content_manager/super_admin only)",
      "Cannot manage blog posts — sees only published articles, same as the public site",
      "Cannot assign trust badges or change a user's role",
    ],
  },
  {
    role: "travel_agency",
    label: "Travel Agency",
    icon: Building2,
    scope: "agency",
    summary: "An agency's own login — manages its own listing and packages once approved, never other agencies' data.",
    permissions: [
      "Edit its own agency profile fields (\"agencies: owner updates own profile\") — excluding is_active and badges",
      "Create and manage its own packages, only while its agency is active (\"packages: owner agency full access\")",
      "View and respond to inquiries directed to its own agency (\"inquiries: owner agency reads/updates own\")",
      "Cannot self-approve (is_active) or assign itself trust badges — both are staff/Super-Admin-only",
      "Cannot see other agencies' data or the admin dashboard",
    ],
  },
];

export default async function AdminRolesPage() {
  const configured = isSupabaseConfigured();
  const profile = configured ? await getSessionProfile() : DEMO_ADMIN_PROFILE;

  if (configured && profile?.role !== "super_admin") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="max-w-sm items-center gap-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-brand-gray">
            <ShieldCheck className="size-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-brand-navy">You don&rsquo;t have access to this page</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Roles & permissions is visible to Super Admins only.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <ArrowLeft /> Back to Overview
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Access Control</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-brand-navy">Roles & Permissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What each account role can do across UmrahPackages.lk, enforced at the database level via Row Level
          Security.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {ROLES.map((r) => {
          const Icon = r.icon;
          return (
            <Card key={r.role} className="gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={
                      r.scope === "staff"
                        ? "flex size-10 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy"
                        : "flex size-10 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold-dark"
                    }
                  >
                    <Icon className="size-5" />
                  </div>
                  <h2 className="font-display text-base font-semibold text-brand-navy">{r.label}</h2>
                </div>
                <Badge variant={r.scope === "staff" ? "default" : "goldOutline"}>
                  {r.scope === "staff" ? "Staff" : "Agency"}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{r.summary}</p>

              <ul className="flex flex-col gap-2 border-t border-border/70 pt-3">
                {r.permissions.map((p, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-gold-dark" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-brand-gray/40 px-4 py-3.5 text-sm text-brand-navy">
        <Info className="mt-0.5 size-4.5 shrink-0 text-brand-gold-dark" />
        <p>
          Full user management (inviting staff, changing someone&rsquo;s role) will appear here once a Supabase
          project is connected — for now, set a user&rsquo;s role by editing the{" "}
          <code className="rounded bg-white/60 px-1 py-0.5 text-xs">profiles.role</code> column in the Supabase
          dashboard.
        </p>
      </div>
    </div>
  );
}
