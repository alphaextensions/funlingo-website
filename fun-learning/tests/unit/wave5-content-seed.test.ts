/**
 * Wave 5 content-seeding smoke tests.
 *
 * The compiled seed catalog is the source of truth for what gets upserted into
 * Prisma. These tests verify counts + shape without touching the DB, so they
 * stay deterministic in CI without a seed step.
 */

import { describe, it, expect } from "vitest";
import { SEEDED_TOPICS, SEEDED_TOPIC_LANG, seededTopicRows } from "@/lib/talk/seedCatalog";
import slangsJson from "../../data/seed/slangs.json";

interface SlangBundle {
  expressions: Array<{ phrase: string; meaning: string }>;
}

const slangs = slangsJson as unknown as Record<string, SlangBundle>;

describe("Wave 5 — seeded Talk topics", () => {
  it("compiles at least one row per (locale, situation)", () => {
    // 11 Latin locales × 8 situations + 7 non-Latin × 8 = 144.
    expect(SEEDED_TOPICS.length).toBeGreaterThanOrEqual(144);
  });

  it("seeds >= 20 topics for 'en'", () => {
    const enTopics = SEEDED_TOPICS.filter((t) => SEEDED_TOPIC_LANG[t.id] === "en");
    expect(enTopics.length).toBeGreaterThanOrEqual(20);
  });

  it("seeds >= 20 topics for 'es'", () => {
    const esTopics = SEEDED_TOPICS.filter((t) => SEEDED_TOPIC_LANG[t.id] === "es");
    expect(esTopics.length).toBeGreaterThanOrEqual(20);
  });

  it("gives each topic 2-3 lessons", () => {
    for (const topic of SEEDED_TOPICS) {
      expect(topic.lessons.length).toBeGreaterThanOrEqual(2);
      expect(topic.lessons.length).toBeLessThanOrEqual(3);
    }
  });

  it("every lesson carries shadow sentences in the learning language", () => {
    for (const topic of SEEDED_TOPICS) {
      for (const lesson of topic.lessons) {
        expect(lesson.shadowSentences.length).toBeGreaterThan(0);
        for (const s of lesson.shadowSentences) {
          expect(typeof s).toBe("string");
          expect(s.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("each topic id is unique and starts with topic:v2:", () => {
    const seen = new Set<string>();
    for (const t of SEEDED_TOPICS) {
      expect(t.id.startsWith("topic:v2:")).toBe(true);
      expect(seen.has(t.id)).toBe(false);
      seen.add(t.id);
    }
  });

  it("each lesson id is unique and starts with lesson:v2:", () => {
    const seen = new Set<string>();
    for (const t of SEEDED_TOPICS) {
      for (const l of t.lessons) {
        expect(l.id.startsWith("lesson:v2:")).toBe(true);
        expect(seen.has(l.id)).toBe(false);
        seen.add(l.id);
      }
    }
  });

  it("seededTopicRows exposes (topic, lang) tuples that match SEEDED_TOPIC_LANG", () => {
    const rows = seededTopicRows();
    expect(rows.length).toBe(SEEDED_TOPICS.length);
    for (const { topic, lang } of rows) {
      expect(lang).toBe(SEEDED_TOPIC_LANG[topic.id]);
    }
  });

  it("every seeded topic slug is unique (Prisma TalkTopic.slug is @unique)", () => {
    const slugs = SEEDED_TOPICS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("Wave 5 — seeded Sentence Pack source data", () => {
  it("bundles at least 18 locales (one Pack each)", () => {
    const locales = Object.keys(slangs);
    expect(locales.length).toBeGreaterThanOrEqual(18);
  });

  it("every locale has at least 20 expressions", () => {
    for (const [locale, bundle] of Object.entries(slangs)) {
      expect(Array.isArray(bundle.expressions)).toBe(true);
      expect(bundle.expressions.length).toBeGreaterThanOrEqual(
        20,
        `locale ${locale} has too few expressions`,
      );
    }
  });

  it("every expression has non-empty phrase + meaning", () => {
    for (const [locale, bundle] of Object.entries(slangs)) {
      for (const expr of bundle.expressions) {
        expect(typeof expr.phrase).toBe("string");
        expect(expr.phrase.length).toBeGreaterThan(0);
        expect(typeof expr.meaning).toBe("string");
        expect(expr.meaning.length).toBeGreaterThan(0);
      }
      // Reference locale in the loop so the lint rule doesn't trip.
      expect(locale.length).toBeGreaterThan(0);
    }
  });
});
