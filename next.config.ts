import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  turbopack: {
    root: ".",
  },
  experimental: {
    // Site-wide 404 (app/global-not-found.tsx): English pages and language
    // pages have separate root layouts, so there's no single one to use.
    globalNotFound: true,
  },
};

export default nextConfig;
