"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { CompareTray } from "@/components/packages/compare-tray";

/**
 * The public marketing chrome (header, footer, WhatsApp FAB, compare tray)
 * wraps every page except the Admin and Agency dashboards — those render
 * their own full-screen shell (see DashboardShell) with a sidebar instead
 * of a top nav, so stacking the public header/footer on top would just be
 * visual noise and duplicate navigation.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/agency");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <div className="print:hidden">
        <Footer />
      </div>
      <div className="print:hidden">
        <WhatsAppFab />
        <CompareTray />
      </div>
    </>
  );
}
