// Slug and name only, for links on every page (the footer). Kept apart from
// platforms.ts so those pages don't ship the full platform copy.
export const PLATFORM_LINKS = [
  { slug: "netflix", name: "Netflix" },
  { slug: "youtube", name: "YouTube" },
  { slug: "prime-video", name: "Prime Video" },
  { slug: "disney-hotstar", name: "Disney+ Hotstar" },
  { slug: "apple-tv", name: "Apple TV" },
  { slug: "crunchyroll", name: "Crunchyroll" },
  { slug: "tubi", name: "Tubi" },
  { slug: "bilibili", name: "bilibili" },
  { slug: "udemy", name: "Udemy" },
  { slug: "coursera", name: "Coursera" },
] as const;

export const platformPath = (slug: string) => `/${slug}`;
