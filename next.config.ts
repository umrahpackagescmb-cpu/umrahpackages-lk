import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage — set NEXT_PUBLIC_SUPABASE_URL and this stays in
      // sync automatically once a project is created (see .env.example).
      // Mock/dev data uses locally generated files in /public/placeholders
      // instead of a third-party image service, so no external hosts are
      // required until real agency photos are uploaded.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
