/**
 * Review scheduler tests — exercises ts-fsrs wiring + the two Code QA veto
 * tests we own: #4 (FSRS collision guard) and #8 (multi-lang scoping).
 *
 * These hit the real Prisma + SQLite dev.db — the AI module tests already set
 * that precedent (tests/unit/canary-leak.test.ts). We create isolated users
 * for each test and tear down the rows we create.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { prisma } from "@/server/db";
import {
  cardsDueNow,
  gradeCard,
  getOrInitCardState,
  skipCard,
  assertCardExists,
  ReviewCardMissingError,
} from "@/server/review/scheduler";

async function freshUser(label: string): Promise<string> {
  const email = `review+${label}+${Date.now()}@funlingo.local`;
  const u = await prisma.user.create({
    data: { email, name: label, activeLearningLang: "en" },
  });
  return u.id;
}

async function wipeUser(userId: string) {
  await prisma.reviewLog.deleteMany({ where: { userId } });
  await prisma.reviewCardState.deleteMany({ where: { userId } });
  await prisma.sentence.deleteMany({ where: { userId } });
  await prisma.userWord.deleteMany({ where: { userId } });
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.streak.deleteMany({ where: { userId } });
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    /* ignore */
  }
}

describe("Review scheduler — FSRS integration", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("fsrs");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("creates ReviewCardState on first touch, with the correct lang", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "hola", lang: "es" },
    });

    const { row, card } = await getOrInitCardState(userId, "word", word.id, "es");
    expect(row).not.toBeNull();
    expect(row!.lang).toBe("es");
    expect(card.reps).toBe(0);
    expect(card.state).toBe(0);
  });

  it("gradeCard advances due date forward on Good (3)", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "casa", lang: "es" },
    });
    const before = Date.now();
    const out = await gradeCard({
      userId,
      cardType: "word",
      cardId: word.id,
      lang: "es",
      grade: 3,
      elapsedMs: 1200,
      format: "flashcard",
    });
    expect(out.due.getTime()).toBeGreaterThan(before);
    const log = await prisma.reviewLog.findFirst({ where: { userId } });
    expect(log?.grade).toBe(3);
    expect(log?.format).toBe("flashcard");
  });

  it("skipCard logs a skip but doesn't change ReviewCardState", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "gato", lang: "es" },
    });
    await getOrInitCardState(userId, "word", word.id, "es");
    const before = await prisma.reviewCardState.findUnique({
      where: {
        userId_cardType_cardId: { userId, cardType: "word", cardId: word.id },
      },
    });
    await skipCard({ userId, cardType: "word", cardId: word.id, lang: "es" });
    const after = await prisma.reviewCardState.findUnique({
      where: {
        userId_cardType_cardId: { userId, cardType: "word", cardId: word.id },
      },
    });
    expect(after?.updatedAt.getTime()).toBe(before?.updatedAt.getTime());
    const skips = await prisma.reviewLog.findMany({
      where: { userId, format: "skip" },
    });
    expect(skips).toHaveLength(1);
    expect(skips[0].grade).toBe(0);
  });

  it("grading advances Streak the first time a user reviews today", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "sol", lang: "es" },
    });
    await gradeCard({
      userId,
      cardType: "word",
      cardId: word.id,
      lang: "es",
      grade: 3,
      elapsedMs: 500,
      format: "flashcard",
    });
    const streak = await prisma.streak.findUnique({
      where: { userId_lang: { userId, lang: "es" } },
    });
    expect(streak?.current).toBe(1);
    expect(streak?.best).toBe(1);
  });

  it("Activity row is created with a non-null lang", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "mar", lang: "es" },
    });
    await gradeCard({
      userId,
      cardType: "word",
      cardId: word.id,
      lang: "es",
      grade: 3,
      elapsedMs: 500,
      format: "flashcard",
    });
    const activity = await prisma.activity.findFirst({ where: { userId } });
    expect(activity?.lang).toBe("es");
    expect(activity?.reviews).toBe(1);
  });
});

describe("Veto #4 — FSRS collision guard", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("collision");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("grading UserWord#X does NOT touch Sentence#X.fsrs state", async () => {
    // Create a UserWord and a Sentence that share the SAME id via composite
    // key collision — we fabricate it by using the same cardId value across
    // the two card types. The composite UNIQUE on (userId, cardType, cardId)
    // means each type gets its own ReviewCardState row.
    const sameId = "collider_123";
    await prisma.userWord.create({
      data: { id: sameId, userId, lemma: "ambiguous", lang: "en" },
    });
    await prisma.sentence.create({
      data: { id: sameId, userId, text: "An ambiguous sentence.", lang: "en" },
    });

    await gradeCard({
      userId,
      cardType: "word",
      cardId: sameId,
      lang: "en",
      grade: 4,
      elapsedMs: 400,
      format: "flashcard",
    });

    // No sentence-side ReviewCardState should exist.
    const sentState = await prisma.reviewCardState.findUnique({
      where: {
        userId_cardType_cardId: {
          userId,
          cardType: "sentence",
          cardId: sameId,
        },
      },
    });
    expect(sentState).toBeNull();

    // The word-side row DOES exist and is advanced.
    const wordState = await prisma.reviewCardState.findUnique({
      where: {
        userId_cardType_cardId: {
          userId,
          cardType: "word",
          cardId: sameId,
        },
      },
    });
    expect(wordState).not.toBeNull();
    expect(wordState!.cardType).toBe("word");
  });

  it("assertCardExists rejects a cross-type lookup", async () => {
    const sameId = "collider_456";
    await prisma.userWord.create({
      data: { id: sameId, userId, lemma: "x", lang: "en" },
    });
    // The id exists for 'word' but not for 'sentence' — assertCardExists must
    // reject the sentence lookup, closing Code QA finding #6.
    await expect(
      assertCardExists(userId, "sentence", sameId, "en"),
    ).rejects.toThrow(ReviewCardMissingError);
  });

  it("getOrInitCardState with mismatched lang throws rather than silently muting", async () => {
    const word = await prisma.userWord.create({
      data: { userId, lemma: "hola", lang: "es" },
    });
    // First touch stores lang="es"
    await getOrInitCardState(userId, "word", word.id, "es");
    // Second touch with "en" MUST throw — same cardId, different lang would be
    // the exact "multi-lang scoping leak" we care about.
    await expect(
      getOrInitCardState(userId, "word", word.id, "en"),
    ).rejects.toThrow(/lang mismatch/);
  });
});

describe("Veto #8 — multi-lang scoping", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("multilang");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("user with EN + JP words gets ZERO JP cards when lang=en", async () => {
    await prisma.userWord.createMany({
      data: [
        { userId, lemma: "hello", lang: "en" },
        { userId, lemma: "world", lang: "en" },
        { userId, lemma: "こんにちは", lang: "ja" },
        { userId, lemma: "さようなら", lang: "ja" },
      ],
    });

    const refs = await cardsDueNow(userId, "en", 20);
    for (const r of refs) {
      expect(r.lang).toBe("en");
    }
    // Both EN words should be surfaced.
    expect(refs).toHaveLength(2);
  });

  it("after grading, lang-scoped due query ignores other languages", async () => {
    const enWord = await prisma.userWord.create({
      data: { userId, lemma: "sun", lang: "en" },
    });
    const jaWord = await prisma.userWord.create({
      data: { userId, lemma: "太陽", lang: "ja" },
    });
    // Grade both — both will have a ReviewCardState with their own lang.
    await gradeCard({
      userId,
      cardType: "word",
      cardId: enWord.id,
      lang: "en",
      grade: 1, // Again → due immediately
      elapsedMs: 400,
      format: "flashcard",
    });
    await gradeCard({
      userId,
      cardType: "word",
      cardId: jaWord.id,
      lang: "ja",
      grade: 1,
      elapsedMs: 400,
      format: "flashcard",
    });

    // Push "now" into the future so both cards are due again.
    const future = new Date(Date.now() + 10 * 60 * 1000);
    const enRefs = await cardsDueNow(userId, "en", 20, future);
    const jaRefs = await cardsDueNow(userId, "ja", 20, future);
    for (const r of enRefs) expect(r.lang).toBe("en");
    for (const r of jaRefs) expect(r.lang).toBe("ja");
    expect(enRefs.find((r) => r.cardId === jaWord.id)).toBeUndefined();
    expect(jaRefs.find((r) => r.cardId === enWord.id)).toBeUndefined();
  });

  it("Streak advancement is per-lang (EN and JP streaks are independent)", async () => {
    const enWord = await prisma.userWord.create({
      data: { userId, lemma: "cat", lang: "en" },
    });
    await gradeCard({
      userId,
      cardType: "word",
      cardId: enWord.id,
      lang: "en",
      grade: 3,
      elapsedMs: 400,
      format: "flashcard",
    });
    const enStreak = await prisma.streak.findUnique({
      where: { userId_lang: { userId, lang: "en" } },
    });
    const jaStreak = await prisma.streak.findUnique({
      where: { userId_lang: { userId, lang: "ja" } },
    });
    expect(enStreak?.current).toBe(1);
    expect(jaStreak).toBeNull();
  });
});
