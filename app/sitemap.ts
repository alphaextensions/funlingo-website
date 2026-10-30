import type { MetadataRoute } from "next";
import { LOCALE_CODES } from "./i18n/config";
import { posts } from "./blog/posts";
import { PLATFORM_PAGES, platformPath } from "@/sections/platform/platforms";

// Generated at build time, so new blog posts and locales are listed
// automatically. Posts carry their own date; pages without a real date leave
// lastModified out rather than claim one (Google ignores lastmod once it learns
// the dates are wrong).
const BASE = "https://getfunlingo.com";

export const dynamic = "force-static";

const PAGES = [
  "/chrome-extension",
  "/about",
  "/roadmap",
  "/feedback",
  "/support",
  "/privacy-policy",
  "/compare/funlingo-vs-trancy-vs-immersive-translate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dated = posts.map((p) => ({ url: `${BASE}${p.slug}`, lastModified: new Date(`${p.date} 00:00 UTC`) }));
  const newest = new Date(Math.max(...dated.map((p) => p.lastModified.getTime())));
  return [
    { url: `${BASE}/` },
    ...LOCALE_CODES.map((code) => ({ url: `${BASE}/${code}` })),
    ...PAGES.map((path) => ({ url: `${BASE}${path}` })),
    ...PLATFORM_PAGES.map((p) => ({ url: `${BASE}${platformPath(p.slug)}` })),
    { url: `${BASE}/blog`, lastModified: newest },
    ...dated,
  ];
}
