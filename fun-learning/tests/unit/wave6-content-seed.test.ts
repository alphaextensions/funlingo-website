/**
 * Wave 6 content-seed-II smoke tests.
 *
 * We validate the JSON catalog shape, deterministic ids, and language
 * coverage — no DB touched. These catch an accidental half-merge or a
 * drop of a language in a future PR.
 */

import { describe, it, expect } from "vitest";
import classicsJson from "../../data/seed/classics.json";
import gradedJson from "../../data/seed/graded.json";
import ytcJson from "../../data/seed/yt-channels.json";
import podcastsJson from "../../data/seed/podcasts.json";
import { CLASSICS, EXTERNAL_GRADED_READERS } from "@/lib/read/catalog";

interface ClassicEntry {
  key: string;
  title: string;
  author: string;
  lang: string;
  level: string;
  licence: string;
  source: string;
  streamUrl: string;
  coverUrl: string | null;
  credits: { publisher: string; publisherUrl: string };
}
interface GradedEntry {
  key: string;
  title: string;
  author: string;
  lang: string;
  level: string;
  licence: string;
  publisher: string;
  publisherUrl: string;
  sourceUrl: string;
}
interface YtcEntry {
  lang: string;
  categorySlug: string;
  channelId: string;
  displayName: string;
  blurb: string;
}
interface PodEntry {
  lang: string;
  categorySlug: string;
  title: string;
  feedUrl: string;
  description: string;
}

const classics = (classicsJson as unknown as { entries: ClassicEntry[] }).entries;
const graded = (gradedJson as unknown as { entries: GradedEntry[] }).entries;
const ytc = (ytcJson as unknown as { entries: YtcEntry[]; categories: Array<{ slug: string }> });
const pods = (podcastsJson as unknown as { entries: PodEntry[]; categories: Array<{ slug: string }> });

describe("Wave 6 — Classics catalog", () => {
  it("has at least 100 titles", () => {
    expect(classics.length).toBeGreaterThanOrEqual(100);
  });
  it("every entry has a unique deterministic key", () => {
    const keys = classics.map((e) => e.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("covers every supported learning language", () => {
    const langs = new Set(classics.map((e) => e.lang));
    for (const expected of ["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh", "ru"]) {
      expect(langs.has(expected), `missing lang ${expected}`).toBe(true);
    }
  });
  it("every title has at least title, author, streamUrl, lang", () => {
    for (const e of classics) {
      expect(e.title.length).toBeGreaterThan(0);
      expect(e.author.length).toBeGreaterThan(0);
      expect(e.streamUrl.length).toBeGreaterThan(0);
      expect(e.lang.length).toBe(2);
    }
  });
  it("compiled CLASSICS export mirrors the JSON", () => {
    expect(CLASSICS.length).toBe(classics.length);
  });
});

describe("Wave 6 — Graded (CC-licensed external) catalog", () => {
  it("has at least 30 titles", () => {
    expect(graded.length).toBeGreaterThanOrEqual(30);
  });
  it("every entry has a unique deterministic key", () => {
    const keys = graded.map((e) => e.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("every entry carries a licence string starting with CC", () => {
    for (const e of graded) {
      expect(e.licence.toUpperCase().startsWith("CC")).toBe(true);
    }
  });
  it("covers at least 8 learning languages", () => {
    const langs = new Set(graded.map((e) => e.lang));
    expect(langs.size).toBeGreaterThanOrEqual(8);
  });
  it("compiled EXTERNAL_GRADED_READERS export mirrors the JSON", () => {
    expect(EXTERNAL_GRADED_READERS.length).toBe(graded.length);
  });
});

describe("Wave 6 — YouTube channel recommendations", () => {
  it("has at least 50 total recommendations", () => {
    expect(ytc.entries.length).toBeGreaterThanOrEqual(50);
  });
  it("every (lang, channelId) pair is unique", () => {
    const seen = new Set<string>();
    for (const e of ytc.entries) {
      const key = `${e.lang}|${e.channelId}`;
      expect(seen.has(key), `duplicate ${key}`).toBe(false);
      seen.add(key);
    }
  });
  it("covers at least 8 learning languages", () => {
    const langs = new Set(ytc.entries.map((e) => e.lang));
    expect(langs.size).toBeGreaterThanOrEqual(8);
  });
  it("every entry references a declared category", () => {
    const slugs = new Set(ytc.categories.map((c) => c.slug));
    for (const e of ytc.entries) {
      expect(slugs.has(e.categorySlug), `undeclared category ${e.categorySlug}`).toBe(true);
    }
  });
  it("every channelId looks like a YouTube UC-id (24 chars)", () => {
    for (const e of ytc.entries) {
      expect(e.channelId.startsWith("UC")).toBe(true);
      expect(e.channelId.length).toBeGreaterThanOrEqual(18);
    }
  });
});

describe("Wave 6 — Podcast feeds", () => {
  it("has at least 30 total shows", () => {
    expect(pods.entries.length).toBeGreaterThanOrEqual(30);
  });
  it("every entry carries an http(s) feedUrl", () => {
    for (const e of pods.entries) {
      expect(/^https?:\/\//.test(e.feedUrl), e.feedUrl).toBe(true);
    }
  });
  it("covers at least 8 learning languages", () => {
    const langs = new Set(pods.entries.map((e) => e.lang));
    expect(langs.size).toBeGreaterThanOrEqual(8);
  });
  it("every entry references a declared category", () => {
    const slugs = new Set(pods.categories.map((c) => c.slug));
    for (const e of pods.entries) {
      expect(slugs.has(e.categorySlug), `undeclared category ${e.categorySlug}`).toBe(true);
    }
  });
});
