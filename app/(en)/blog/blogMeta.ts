import fs from "node:fs";
import path from "node:path";

// Facts about each post that live in the files rather than in posts.ts, read
// once at build time: whether it has a photo (public/blog-images/<slug>-hero.jpg)
// and its reading time (the "N min read" in its content, or a word count).
// Server components only: it reads the file system.

export type BlogMeta = {
  /** Slugs (without "/blog/") that have a hero photo. */
  photos: string[];
  /** Reading time per slug, e.g. "9 min read". */
  read: Record<string, string>;
};

// Posts live in the English group, plus a group per language for posts written
// in another language (app/i18n/page-lang.json), each with its own <html lang>.
const BLOG_DIRS = ["app/(en)/blog", "app/(zh-CN)/blog", "app/(zh-TW)/blog"]
  .map((d) => path.join(process.cwd(), d))
  .filter((d) => fs.existsSync(d));
const IMG_DIR = path.join(process.cwd(), "public/blog-images");

let cached: BlogMeta | null = null;

export function readBlogMeta(): BlogMeta {
  if (cached) return cached;
  const dirOf: Record<string, string> = {};
  for (const dir of BLOG_DIRS) {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (d.isDirectory() && !d.name.startsWith("_")) dirOf[d.name] = dir;
    }
  }
  const slugs = Object.keys(dirOf);
  const photos = slugs.filter((s) => fs.existsSync(path.join(IMG_DIR, `${s}-hero.jpg`)));
  const read: Record<string, string> = {};
  for (const s of slugs) {
    const file = path.join(dirOf[s], s, "content.tsx");
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const stated = src.match(/(\d+)\s*min read/);
    if (stated) {
      read[s] = `${stated[1]} min read`;
      continue;
    }
    // No stated time: count the words in the JSX text (tags and code removed).
    const text = src.replace(/<[^>]*>/g, " ").replace(/[{}()[\];=<>"'`]/g, " ");
    const words = text.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
    read[s] = `${Math.max(2, Math.round(words / 230))} min read`;
  }
  cached = { photos, read };
  return cached;
}
