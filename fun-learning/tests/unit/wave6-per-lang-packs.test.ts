/**
 * Wave 6 per-lang Sentence-Pack smoke tests.
 *
 * Reads the authored JSON directly (no DB), so these stay deterministic in CI
 * without a seed step. Enforces the shape and minimum content guarantees the
 * seed script (scripts/seed-packs-v2.ts) relies on.
 */

import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface PackItem {
  text: string;
  translation: string;
  chapter?: number;
  order?: number;
  meta?: Record<string, unknown>;
}

interface Pack {
  title: string;
  blurb: string;
  level?: string;
  items: PackItem[];
}

interface CategoryFile {
  category: string;
  label?: string;
  chapters?: { id: number; name: string }[];
  packs: Record<string, Pack>;
}

const DIR = join(process.cwd(), "data", "seed", "packs-v2");
const EXPECTED_LANGS = [
  "en", "es", "fr", "de", "it", "pt",
  "ja", "ko", "zh", "hi", "tr", "ar",
];
const EXPECTED_CATEGORIES = [
  "everyday", "famous", "proverbs", "travel", "business", "emotions",
];

function loadAll(): CategoryFile[] {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
  return files.map((name) => {
    const raw = readFileSync(join(DIR, name), "utf8");
    return JSON.parse(raw) as CategoryFile;
  });
}

const categories = loadAll();

describe("Wave 6 per-lang Sentence Packs", () => {
  it("ships one JSON per category — exactly the six we expect", () => {
    const names = categories.map((c) => c.category).sort();
    expect(names).toEqual([...EXPECTED_CATEGORIES].sort());
  });

  it("every category covers all 12 supported languages", () => {
    for (const cat of categories) {
      const langs = Object.keys(cat.packs).sort();
      expect(langs, `category ${cat.category}`).toEqual([...EXPECTED_LANGS].sort());
    }
  });

  it("every pack has at least 20 items (spec minimum)", () => {
    for (const cat of categories) {
      for (const [lang, pack] of Object.entries(cat.packs)) {
        expect(pack.items.length, `${cat.category}:${lang}`).toBeGreaterThanOrEqual(20);
      }
    }
  });

  it("no duplicate text within a single pack", () => {
    for (const cat of categories) {
      for (const [lang, pack] of Object.entries(cat.packs)) {
        const seen = new Set<string>();
        for (const item of pack.items) {
          const key = item.text.trim();
          expect(seen.has(key), `${cat.category}:${lang} dup "${key}"`).toBe(false);
          seen.add(key);
        }
      }
    }
  });

  it("every item has non-empty text + translation", () => {
    for (const cat of categories) {
      for (const [lang, pack] of Object.entries(cat.packs)) {
        for (let i = 0; i < pack.items.length; i += 1) {
          const item = pack.items[i]!;
          expect(typeof item.text, `${cat.category}:${lang}#${i}`).toBe("string");
          expect(item.text.length).toBeGreaterThan(0);
          expect(typeof item.translation).toBe("string");
          expect(item.translation.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every pack has a localised title and blurb", () => {
    for (const cat of categories) {
      for (const [lang, pack] of Object.entries(cat.packs)) {
        expect(pack.title.length, `${cat.category}:${lang} title`).toBeGreaterThan(0);
        expect(pack.blurb.length, `${cat.category}:${lang} blurb`).toBeGreaterThan(0);
      }
    }
  });

  it("every Famous Quotes item has an author in meta", () => {
    const famous = categories.find((c) => c.category === "famous")!;
    for (const [lang, pack] of Object.entries(famous.packs)) {
      for (let i = 0; i < pack.items.length; i += 1) {
        const author = pack.items[i]!.meta?.author as string | undefined;
        expect(author && author.trim().length > 0, `famous:${lang}#${i} missing author`).toBe(true);
      }
    }
  });

  it("every Proverbs item has a meaning note in meta", () => {
    const proverbs = categories.find((c) => c.category === "proverbs")!;
    for (const [lang, pack] of Object.entries(proverbs.packs)) {
      for (let i = 0; i < pack.items.length; i += 1) {
        const meaning = proverbs.packs[lang]!.items[i]!.meta?.meaning as string | undefined;
        expect(meaning && meaning.trim().length > 0, `proverbs:${lang}#${i} missing meaning`).toBe(true);
      }
    }
  });

  it("items in chaptered categories reference a declared chapter id", () => {
    const chaptered = categories.filter((c) => (c.chapters ?? []).length > 0);
    expect(chaptered.length).toBeGreaterThan(0);
    for (const cat of chaptered) {
      const ids = new Set((cat.chapters ?? []).map((c) => c.id));
      for (const [lang, pack] of Object.entries(cat.packs)) {
        for (let i = 0; i < pack.items.length; i += 1) {
          const chapterId = pack.items[i]!.chapter ?? 0;
          expect(ids.has(chapterId), `${cat.category}:${lang}#${i} chapter ${chapterId}`).toBe(true);
        }
      }
    }
  });

  it("flat-list categories keep every item on chapter 0", () => {
    const flat = categories.filter((c) => (c.chapters ?? []).length === 0);
    for (const cat of flat) {
      for (const [lang, pack] of Object.entries(cat.packs)) {
        for (let i = 0; i < pack.items.length; i += 1) {
          expect(pack.items[i]!.chapter ?? 0, `${cat.category}:${lang}#${i}`).toBe(0);
        }
      }
    }
  });

  it("totals: 72 packs across all 6 categories, ≥ 2,000 items", () => {
    let packCount = 0;
    let itemCount = 0;
    for (const cat of categories) {
      for (const pack of Object.values(cat.packs)) {
        packCount += 1;
        itemCount += pack.items.length;
      }
    }
    expect(packCount).toBe(72);
    expect(itemCount).toBeGreaterThanOrEqual(2000);
  });
});
