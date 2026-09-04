import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

// AI answer-engine / assistant crawlers, explicitly allowed rather than left
// to the "*" rule alone — the goal is for Claude, ChatGPT, Gemini, Perplexity
// etc. to be able to read and cite real package/agency data and guide
// content when someone asks them about Umrah packages in Sri Lanka.
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/admin/", "/agency", "/agency/", "/api/"];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
