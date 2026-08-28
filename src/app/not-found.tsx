import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="theme-navy flex min-h-[70vh] flex-col items-center justify-center bg-brand-navy px-6 text-center text-white">
      <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
        <Compass className="size-7 text-brand-gold" />
      </div>
      <p className="mt-6 font-display text-6xl font-bold text-brand-gold">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold">Looks like you&rsquo;ve wandered off the path</h1>
      <p className="mt-3 max-w-md text-white/65">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        Let&rsquo;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="gold" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outlineLight" size="lg" asChild>
          <Link href="/packages">Browse Packages</Link>
        </Button>
      </div>
    </div>
  );
}
