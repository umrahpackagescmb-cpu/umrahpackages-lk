import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { AgencySignUpForm } from "@/components/auth/agency-sign-up-form";

export const metadata: Metadata = {
  title: "Register Your Agency",
  description: "Register your travel agency on UmrahPackages.lk — free to list, no booking fees.",
  alternates: { canonical: "/sign-up" },
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brand/icon.png" alt="UmrahPackages.lk" width={40} height={55} style={{ height: 40, width: "auto" }} />
          </Link>
          <h1 className="font-display text-2xl font-bold text-brand-navy">Register Your Agency</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Join Sri Lanka&rsquo;s Umrah package comparison platform — free to
            list, zero booking commission.
          </p>
        </div>

        <Card className="shadow-soft-lg">
          <AgencySignUpForm />
        </Card>
      </div>
    </div>
  );
}
