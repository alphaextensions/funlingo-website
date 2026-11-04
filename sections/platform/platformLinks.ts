// Slug and name only, for links on every page (the footer). Kept apart from
// platforms.ts so those pages don't ship the full platform copy.
export type PlatformLink = {
  slug: string;
  name: string;
  /** PlatformLogo key, when it differs from the name. */
  logo?: string;
};

export const PLATFORM_LINKS: PlatformLink[] = [
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
];

export const platformPath = (slug: string) => `/${slug}`;

export const fillName = (s: string, name: string) => s.split("{name}").join(name);
