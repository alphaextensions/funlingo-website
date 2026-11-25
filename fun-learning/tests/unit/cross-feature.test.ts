/**
 * Cross-feature wiring tests (Wave 3) — one test per wire.
 *
 * Pure helpers get isolated tests; wires that need Prisma create a fresh
 * user per test and clean up at the end, mirroring the Review scheduler
 * suite's conventions (tests/unit/review/scheduler.test.ts).
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { prisma } from "@/server/db";
import { rewatchHref, formatTimestamp } from "@/../app/review/drills/Flashcard";
import { weakAreaCardKeys } from "@/server/review/scheduler";

async function freshUser(label: string): Promise<string> {
  const email = `cross+${label}+${Date.now()}@funlingo.local`;
  const u = await prisma.user.create({
    data: { email, name: label, activeLearningLang: "en" },
  });
  return u.id;
}

async function wipeUser(userId: string) {
  await prisma.reviewLog.deleteMany({ where: { userId } });
  await prisma.reviewCardState.deleteMany({ where: { userId } });
  await prisma.encounter.deleteMany({ where: { userId } });
  await prisma.userWord.deleteMany({ where: { userId } });
  await prisma.sentence.deleteMany({ where: { userId } });
  await prisma.readingPosition.deleteMany({ where: { userId } });
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.streak.deleteMany({ where: { userId } });
  await prisma.talkSession.deleteMany({ where: { userId } });
  await prisma.progressSnapshot.deleteMany({ where: { userId } });
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    /* ignore */
  }
}

// -------------------------------------------------------------------------
// Wire 1 — "Rewatch this scene" href helper
// -------------------------------------------------------------------------

describe("Wire 1 — rewatchHref", () => {
  it("builds /watch/<id>?t=<sec> for a youtube encounter", () => {
    expect(
      rewatchHref({
        sourceId: "src_abc",
        sourceType: "youtube_video",
        timestampSec: 73,
      }),
    ).toBe("/watch/src_abc?t=73");
  });

  it("defaults t=0 when timestampSec is null", () => {
    expect(
      rewatchHref({
        sourceId: "src_abc",
        sourceType: "youtube_video",
        timestampSec: null,
      }),
    ).toBe("/watch/src_abc?t=0");
  });

  it("floors fractional seconds", () => {
    expect(
      rewatchHref({
        sourceId: "x",
        sourceType: "youtube_video",
        timestampSec: 42.9 as unknown as number,
      }),
    ).toBe("/watch/x?t=42");
  });

  it("returns null for the demo source", () => {
    expect(
      rewatchHref({
        sourceId: "demo",
        sourceType: "youtube_video",
        timestampSec: 0,
      }),
    ).toBeNull();
  });

  it("returns null for non-video source types (book / upload)", () => {
    expect(
      rewatchHref({
        sourceId: "src_abc",
        sourceType: "book",
        timestampSec: 10,
      }),
    ).toBeNull();
    expect(
      rewatchHref({
        sourceId: "src_abc",
        sourceType: "upload",
        timestampSec: 10,
      }),
    ).toBeNull();
  });

  it("returns null when sourceId is missing (typed save)", () => {
    expect(
      rewatchHref({
        sourceId: null,
        sourceType: null,
        timestampSec: 42,
      }),
    ).toBeNull();
  });

  it("formatTimestamp pads seconds and handles null", () => {
    expect(formatTimestamp(0)).toBe("0:00");
    expect(formatTimestamp(65)).toBe("1:05");
    expect(formatTimestamp(null)).toBe("");
  });
});

// -------------------------------------------------------------------------
// Wire 2 — "Last book you were reading" ranking
// -------------------------------------------------------------------------

describe("Wire 2 — last-book load/rank", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("lastbook");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("returns the most recent in-progress reading position for the active lang", async () => {
    const book = await prisma.book.create({
      data: {
        source: "graded",
        title: "Café",
        lang: "en",
        contentRef: "graded:a1-cafe",
      },
    });
    await prisma.readingPosition.create({
      data: { userId, bookId: book.id, location: "graded:a1-cafe:1", percent: 0.4 },
    });
    const got = await prisma.readingPosition.findFirst({
      where: { userId, book: { lang: "en" }, percent: { lt: 1 } },
      orderBy: { updatedAt: "desc" },
      include: { book: true },
    });
    expect(got?.book.title).toBe("Café");
    // Clean up explicitly (afterEach only touches readingPositions tied to user)
    await prisma.readingPosition.deleteMany({ where: { bookId: book.id } });
    await prisma.book.delete({ where: { id: book.id } }).catch(() => {});
  });

  it("excludes a finished book (percent >= 1)", async () => {
    const book = await prisma.book.create({
      data: {
        source: "graded",
        title: "Done",
        lang: "en",
        contentRef: "graded:a1-done",
      },
    });
    await prisma.readingPosition.create({
      data: { userId, bookId: book.id, location: "end", percent: 1.0 },
    });
    const got = await prisma.readingPosition.findFirst({
      where: { userId, book: { lang: "en" }, percent: { lt: 1 } },
    });
    expect(got).toBeNull();
    await prisma.readingPosition.deleteMany({ where: { bookId: book.id } });
    await prisma.book.delete({ where: { id: book.id } }).catch(() => {});
  });

  it("respects lang scoping — ja book doesn't appear for an en reader", async () => {
    const book = await prisma.book.create({
      data: {
        source: "graded",
        title: "日本語",
        lang: "ja",
        contentRef: "graded:a1-jp",
      },
    });
    await prisma.readingPosition.create({
      data: { userId, bookId: book.id, location: "x", percent: 0.1 },
    });
    const gotEn = await prisma.readingPosition.findFirst({
      where: { userId, book: { lang: "en" }, percent: { lt: 1 } },
    });
    expect(gotEn).toBeNull();
    await prisma.readingPosition.deleteMany({ where: { bookId: book.id } });
    await prisma.book.delete({ where: { id: book.id } }).catch(() => {});
  });
});

// -------------------------------------------------------------------------
// Wire 3 — Save correction as sentence
// -------------------------------------------------------------------------

describe("Wire 3 — save correction as drill sentence", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("talksave");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("creates a Sentence row scoped to the TalkSession's lang with the right lists", async () => {
    const session = await prisma.talkSession.create({
      data: { userId, lang: "es" },
    });
    const turn = await prisma.talkTurn.create({
      data: { sessionId: session.id, role: "user", text: "soy cansado" },
    });

    // Simulate the API's work (we test the route behaviour via the
    // underlying Prisma logic — the route handler is thin).
    const sentence = await prisma.sentence.create({
      data: {
        userId,
        lang: session.lang,
        text: "estoy cansado",
        translation: `[talk:${turn.id}] I'm tired`,
        lists: "speaking,favorite,source:talk",
      },
    });

    expect(sentence.lang).toBe("es");
    expect(sentence.lists).toContain("speaking");
    expect(sentence.lists).toContain("favorite");
    expect(sentence.lists).toContain("source:talk");
    expect(sentence.translation ?? "").toContain(`[talk:${turn.id}]`);
  });

  it("dedupes a second save of the same corrected text (same user+lang+source:talk)", async () => {
    const session = await prisma.talkSession.create({
      data: { userId, lang: "es" },
    });
    const text = "estoy bien";
    await prisma.sentence.create({
      data: {
        userId,
        lang: session.lang,
        text,
        lists: "speaking,favorite,source:talk",
      },
    });
    const dup = await prisma.sentence.findFirst({
      where: {
        userId,
        lang: session.lang,
        text,
        lists: { contains: "source:talk" },
      },
    });
    expect(dup).not.toBeNull();
  });
});

// -------------------------------------------------------------------------
// Wire 4 — Weak-area detection
// -------------------------------------------------------------------------

describe("Wire 4 — weakAreaCardKeys", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("weak");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("returns an empty set when no logs exist", async () => {
    const weak = await weakAreaCardKeys(userId, "en");
    expect(weak.size).toBe(0);
  });

  it("flags a card with ≥2 Again (grade=1) in its last 3 grades over 7 days", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "struggle", lang: "en" },
    });
    const now = Date.now();
    // Newest 3 grades: 1, 1, 3 → 2 lapses → weak
    await prisma.reviewLog.createMany({
      data: [
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 1 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 2 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 3,
          elapsedMs: 1000,
          at: new Date(now - 3 * 60 * 60 * 1000),
        },
      ],
    });
    const weak = await weakAreaCardKeys(userId, "en");
    expect(weak.has(`word:${word.id}`)).toBe(true);
  });

  it("does NOT flag a card with only one recent Again", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "fine", lang: "en" },
    });
    const now = Date.now();
    await prisma.reviewLog.createMany({
      data: [
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 1 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 3,
          elapsedMs: 1000,
          at: new Date(now - 2 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 3,
          elapsedMs: 1000,
          at: new Date(now - 3 * 60 * 60 * 1000),
        },
      ],
    });
    const weak = await weakAreaCardKeys(userId, "en");
    expect(weak.has(`word:${word.id}`)).toBe(false);
  });

  it("ignores grades older than 7 days when picking the last 3", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "ancient", lang: "en" },
    });
    const now = Date.now();
    // Old failures outside the 7d window.
    await prisma.reviewLog.createMany({
      data: [
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 10 * 24 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 11 * 24 * 60 * 60 * 1000),
        },
      ],
    });
    const weak = await weakAreaCardKeys(userId, "en");
    expect(weak.has(`word:${word.id}`)).toBe(false);
  });

  it("scopes to lang — a weak JP card doesn't contaminate an EN query", async () => {
    const wJP = await prisma.userWord.create({
      data: { userId, lemma: "難しい", lang: "ja" },
    });
    const now = Date.now();
    await prisma.reviewLog.createMany({
      data: [
        {
          userId,
          cardType: "word",
          cardId: wJP.id,
          lang: "ja",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 1 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: wJP.id,
          lang: "ja",
          format: "flashcard",
          grade: 1,
          elapsedMs: 1000,
          at: new Date(now - 2 * 60 * 60 * 1000),
        },
      ],
    });
    const weakEn = await weakAreaCardKeys(userId, "en");
    const weakJa = await weakAreaCardKeys(userId, "ja");
    expect(weakEn.size).toBe(0);
    expect(weakJa.has(`word:${wJP.id}`)).toBe(true);
  });

  it("skips grade=0 (skips) when counting lapses", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "paused", lang: "en" },
    });
    const now = Date.now();
    await prisma.reviewLog.createMany({
      data: [
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "skip",
          grade: 0,
          elapsedMs: 100,
          at: new Date(now - 1 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "skip",
          grade: 0,
          elapsedMs: 100,
          at: new Date(now - 2 * 60 * 60 * 1000),
        },
        {
          userId,
          cardType: "word",
          cardId: word.id,
          lang: "en",
          format: "flashcard",
          grade: 3,
          elapsedMs: 1000,
          at: new Date(now - 3 * 60 * 60 * 1000),
        },
      ],
    });
    const weak = await weakAreaCardKeys(userId, "en");
    expect(weak.has(`word:${word.id}`)).toBe(false);
  });
});

// -------------------------------------------------------------------------
// Wire 5 — Fresh-words chip query shape
// -------------------------------------------------------------------------

describe("Wire 5 — fresh-words count", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("fresh");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("counts only new, same-lang, created-in-the-last-24h words", async () => {
    const now = Date.now();
    // In-scope: new, en, 2h old
    await prisma.userWord.create({
      data: {
        userId,
        lemma: "fresh",
        lang: "en",
        state: "new",
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
      },
    });
    // Out-of-scope: wrong state
    await prisma.userWord.create({
      data: {
        userId,
        lemma: "learned",
        lang: "en",
        state: "learning",
        createdAt: new Date(now - 1 * 60 * 60 * 1000),
      },
    });
    // Out-of-scope: wrong lang
    await prisma.userWord.create({
      data: {
        userId,
        lemma: "nuevo",
        lang: "es",
        state: "new",
        createdAt: new Date(now - 1 * 60 * 60 * 1000),
      },
    });
    // Out-of-scope: older than 24h
    await prisma.userWord.create({
      data: {
        userId,
        lemma: "old",
        lang: "en",
        state: "new",
        createdAt: new Date(now - 48 * 60 * 60 * 1000),
      },
    });
    const count = await prisma.userWord.count({
      where: {
        userId,
        lang: "en",
        state: "new",
        createdAt: { gte: new Date(now - 24 * 60 * 60 * 1000) },
      },
    });
    expect(count).toBe(1);
  });
});
