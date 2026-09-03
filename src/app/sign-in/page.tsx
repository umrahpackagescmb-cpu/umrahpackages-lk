import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { Card } from "@/components/ui/card";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your UmrahPackages.lk agency or admin dashboard.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brand/icon.png" alt="UmrahPackages.lk" width={43} height={55} style={{ height: 40, width: "auto" }} />
          </Link>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your agency or admin dashboard.</p>
        </div>

        <Card className="shadow-soft-lg">
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
