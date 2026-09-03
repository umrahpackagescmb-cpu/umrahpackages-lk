"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu } from "lucide-react";

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
import { cn } from "@/lib/utils";

/**
 * "Navy Command Bar" — solid brand-navy header (design option B, picked
 * over two lighter alternatives). The icon mark is navy+gold strokes on a
 * transparent PNG, so it's set inside a small white-and-gold badge circle
 * here rather than used bare — otherwise it disappears into the navy bar.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-navy shadow-[0_2px_12px_rgba(13,27,42,0.35)]">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" aria-label="UmrahPackages.lk — home" className="flex shrink-0 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-white ring-1 ring-brand-gold/60">
            <Image src="/brand/icon.png" alt="" width={1099} height={1396} priority style={{ height: 26, width: "auto" }} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            UmrahPackages<span className="text-brand-gold">.lk</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium tracking-tight transition-colors",
                    active ? "text-white" : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brand-gold transition-all duration-200",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100",
                    )}
                  />
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

        <div className="hidden xl:flex items-center">
          <Button size="sm" variant="gold" asChild>
            <Link href="/sign-in">
              <LogIn className="size-4" /> Sign in
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden text-white hover:bg-white/10 hover:text-white"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <span className="flex items-center gap-2.5">
                  <Image src="/brand/icon.png" alt="" width={1099} height={1396} style={{ height: 32, width: "auto" }} />
                  <span className="font-display text-base font-semibold tracking-tight text-brand-navy">
                    UmrahPackages<span className="text-brand-gold">.lk</span>
                  </span>
                </span>
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
              <Button variant="gold" asChild>
                <Link href="/sign-in">
                  <LogIn /> Agency / Admin Sign In
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
