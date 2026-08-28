/**
 * JSON-LD builders (schema.org). Each function returns a plain object to
 * pass to <JsonLd data={...} /> (src/components/seo/json-ld.tsx).
 */
import { siteConfig } from "@/lib/site-config";
import type { Agency, Package, BlogPost } from "@/types/domain";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: "LK",
    },
    sameAs: [siteConfig.links.facebook, siteConfig.links.instagram, siteConfig.links.tiktok],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function travelAgencySchema(agency: Agency) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: agency.name,
    description: agency.description,
    url: `${siteConfig.url}/agencies/${agency.slug}`,
    image: agency.logoUrl.startsWith("http") ? agency.logoUrl : `${siteConfig.url}${agency.logoUrl}`,
    telephone: agency.phone,
    email: agency.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: agency.address,
      addressLocality: agency.city,
      addressCountry: "LK",
    },
    ...(agency.lat && agency.lng
      ? { geo: { "@type": "GeoCoordinates", latitude: agency.lat, longitude: agency.lng } }
      : {}),
    ...(agency.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: agency.rating, reviewCount: Math.max(1, agency.packageCount * 3) } } : {}),
  };
}

export function packageSchema(pkg: Package) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    description: pkg.inclusions.join(", "),
    image: pkg.images.map((i) => (i.startsWith("http") ? i : `${siteConfig.url}${i}`)),
    brand: { "@type": "Brand", name: pkg.agency.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "LKR",
      price: pkg.priceLkr,
      availability: (pkg.seatsAvailable ?? 1) > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: `${siteConfig.url}/packages/${pkg.slug}`,
      seller: { "@type": "TravelAgency", name: pkg.agency.name },
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl.startsWith("http") ? post.coverImageUrl : `${siteConfig.url}${post.coverImageUrl}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function howToSchema(params: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.name,
    description: params.description,
    step: params.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    // Per Google's structured-data guidelines, the last crumb (the current
    // page) may omit its URL — so `url` is optional and only included when
    // present, rather than every item requiring a link.
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}` } : {}),
    })),
  };
}
