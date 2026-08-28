import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { TrendingPackages } from "@/components/home/trending-packages";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedAgencies } from "@/components/home/featured-agencies";
import { IslamicToolsTeaser } from "@/components/home/islamic-tools-teaser";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedPackages />
      <HowItWorks />
      <FeaturedAgencies />
      <TrendingPackages />
      <IslamicToolsTeaser />
      <BlogTeaser />
      <CtaSection />
    </>
  );
}
