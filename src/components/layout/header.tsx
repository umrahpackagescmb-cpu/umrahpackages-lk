"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, Phone, Search } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/nav-config";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-white/0 border-b border-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Logo iconSize={38} />

        <nav className="hidden xl:flex items-center gap-1">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                    active
                      ? "text-brand-navy bg-brand-gray"
                      : "text-foreground/80 hover:text-brand-navy hover:bg-brand-gray/70",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-150 z-50">
                    <div className="w-72 rounded-2xl border border-border bg-white p-2 shadow-soft-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 hover:bg-brand-gray/70 transition-colors"
                        >
                          <span className="text-sm font-medium text-brand-navy">{child.label}</span>
                          {child.description && (
                            <span className="text-xs text-muted-foreground">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="Search">
            <Link href="/search">
              <Search />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={siteConfig.contact.phoneHref}>
              <Phone /> {siteConfig.contact.phone}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Agency / Admin Sign In">
            <Link href="/sign-in">
              <LogIn />
            </Link>
          </Button>
          <Button size="sm" variant="gold" asChild>
            <Link href="/packages">Browse Packages</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Logo iconSize={32} href={null} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-6">
              {mainNav.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-6 pt-0">
              <Button variant="outline" asChild>
                <Link href={siteConfig.contact.phoneHref}>
                  <Phone /> {siteConfig.contact.phone}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">
                  <LogIn /> Agency / Admin Sign In
                </Link>
              </Button>
              <Button variant="gold" asChild>
                <Link href="/packages">Browse Packages</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
