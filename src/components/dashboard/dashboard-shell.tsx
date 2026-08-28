"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Package,
  ShieldCheck,
  UserCog,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Icon components are functions, which can't be passed from a Server
// Component (the admin/agency layouts) to this Client Component as props —
// so nav items carry an icon *name* (a plain string, fully serializable)
// and this lookup resolves it to the actual component here, client-side.
const ICONS = {
  overview: LayoutDashboard,
  agencies: Building2,
  packages: Package,
  blog: Newspaper,
  inquiries: MessageSquare,
  roles: ShieldCheck,
  analytics: BarChart3,
  profile: UserCog,
} as const;

export type DashboardIconName = keyof typeof ICONS;

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: DashboardIconName;
}

function NavLinks({ items, onNavigate }: { items: DashboardNavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
        const Icon = ICONS[item.icon];
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-navy text-white"
                : "text-foreground/80 hover:bg-brand-gray/70 hover:text-brand-navy",
            )}
          >
            <Icon className="size-4.5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AccountCard({ portalLabel, userName, userSubline }: { portalLabel: string; userName: string; userSubline: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft">
      <p className="truncate text-sm font-semibold text-brand-navy">{userName}</p>
      <p className="truncate text-xs text-muted-foreground">{userSubline}</p>
      <p className="mt-1 text-xs font-medium text-brand-gold-dark">{portalLabel}</p>
    </div>
  );
}

function SignOutButton() {
  return (
    <form action="/api/sign-out" method="post">
      <Button type="submit" variant="outline" size="sm" className="w-full">
        <LogOut className="size-4" /> Sign out
      </Button>
    </form>
  );
}

export function DashboardShell({
  portalLabel,
  navItems,
  userName,
  userSubline,
  children,
}: {
  portalLabel: string;
  navItems: DashboardNavItem[];
  userName: string;
  userSubline: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-brand-gray/30">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="container-page flex items-center justify-between gap-3 py-4 lg:hidden">
          <Logo iconSize={32} />
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Logo iconSize={32} href={null} />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-6 pb-6">
            <AccountCard portalLabel={portalLabel} userName={userName} userSubline={userSubline} />
            <NavLinks items={navItems} onNavigate={() => setOpen(false)} />
            <SignOutButton />
          </div>
        </SheetContent>
      </Sheet>

      <div className="container-page flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:py-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 flex flex-col gap-6">
            <Logo iconSize={34} />
            <AccountCard portalLabel={portalLabel} userName={userName} userSubline={userSubline} />
            <NavLinks items={navItems} />
            <SignOutButton />
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
