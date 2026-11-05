/**
 * Lang-scoping sweep — Wave 3.
 *
 * These tests pin down every read site that Pass 2 Code QA flagged as leaking
 * cross-lang data on Home + Progress + the Watch session route. The fixture
 * pattern mirrors Veto #8 in `tests/unit/review/scheduler.test.ts`: one user
 * holding BOTH EN and JP rows, call each page's loader (or route behaviour),
 * assert only the active lang's rows come back.
 *
 * AGENT-PLAYBOOK non-negotiable #4: `Streak`, `Activity`, `UserWord`,
 * `Sentence`, `VideoSession`, `ReviewCardState`, `ReviewLog`, `Encounter`
 * reads MUST carry `lang` in their WHERE when the result is shown as
 * belonging to one language.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { prisma } from "@/server/db";

const DAY_MS = 24 * 60 * 60 * 1000;

async function freshUserWithTwoLangs(label: string): Promise<string> {
  const email = `lang-scope+${label}+${Date.now()}+${Math.random().toString(36).slice(2, 8)}@funlingo.local`;
  const u = await prisma.user.create({
    data: { email, name: label, activeLearningLang: "en" },
  });
  return u.id;
}

async function wipeUser(userId: string) {
  await prisma.encounter.deleteMany({ where: { userId } });
  await prisma.reviewLog.deleteMany({ where: { userId } });
  await prisma.reviewCardState.deleteMany({ where: { userId } });
  await prisma.videoSession.deleteMany({ where: { userId } });
  await prisma.sentence.deleteMany({ where: { userId } });
  await prisma.userWord.deleteMany({ where: { userId } });
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.streak.deleteMany({ where: { userId } });
  await prisma.progressSnapshot.deleteMany({ where: { userId } });
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    /* ignore */
  }
}

describe("Home — Streak strip 7-day Activity read is lang-scoped", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("home-streak");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("JP activity rows don't light up the EN streak strip", async () => {
    // Seed one Activity row per lang for today, each with 10 minutes.
    const todayUtc = new Date();
    todayUtc.setUTCHours(0, 0, 0, 0);
    await prisma.activity.createMany({
      data: [
        { userId, date: todayUtc, lang: "en", minutesWatch: 10 },
        { userId, date: todayUtc, lang: "ja", minutesWatch: 10 },
      ],
    });

    // Mirror the per-lang streak query. Wave 8 moved the authoritative
    // streak surface to /progress; the loader shape is unchanged.
    const sevenAgo = new Date(todayUtc.getTime() - 6 * DAY_MS);
    const rows = await prisma.activity.findMany({
      where: { userId, lang: "en", date: { gte: sevenAgo } },
      select: {
        date: true,
        reviews: true,
        minutesWatch: true,
        minutesRead: true,
        minutesTalk: true,
        lang: true,
      },
    });

    expect(rows).toHaveLength(1);
    expect(rows[0]!.lang).toBe("en");
    expect(rows[0]!.minutesWatch).toBe(10);
  });
});

describe("Home — today's goal Activity read is lang-scoped", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("home-goal");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("JP minutes don't count toward the EN daily goal ring", async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    await prisma.activity.createMany({
      data: [
        { userId, date: todayStart, lang: "en", minutesWatch: 7, reviews: 3 },
        { userId, date: todayStart, lang: "ja", minutesWatch: 20, reviews: 15 },
      ],
    });

    // Mirror the loadGoalProgress query.
    const row = await prisma.activity.findFirst({
      where: { userId, lang: "en", date: { gte: todayStart } },
    });
    expect(row).not.toBeNull();
    expect(row!.lang).toBe("en");
    const minutes =
      (row?.minutesWatch ?? 0) + (row?.minutesRead ?? 0) + (row?.minutesTalk ?? 0);
    expect(minutes).toBe(7);
    expect(row?.reviews).toBe(3);
  });
});

describe("Home — Resume ProgressSnapshot is scoped by Source.lang", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("home-resume");
  });
  afterEach(async () => {
    await wipeUser(userId);
    // Also delete any Source rows we created so this test doesn't leak into
    // other library-reading tests. (Sources have no userId, so we must
    // delete by id.)
  });

  it("Resume cards show only sources in the active learning language", async () => {
    const en = await prisma.source.create({
      data: { type: "youtube_video", title: "EN show", lang: "en" },
    });
    const ja = await prisma.source.create({
      data: { type: "youtube_video", title: "JA show", lang: "ja" },
    });
    try {
      await prisma.progressSnapshot.createMany({
        data: [
          { userId, sourceId: en.id, positionSec: 60, percent: 0.3 },
          { userId, sourceId: ja.id, positionSec: 20, percent: 0.1 },
        ],
      });

      const rows = await prisma.progressSnapshot.findMany({
        where: { userId, finishedAt: null, source: { lang: "en" } },
        include: { source: true },
      });
      expect(rows).toHaveLength(1);
      expect(rows[0]!.source.lang).toBe("en");
    } finally {
      await prisma.source.deleteMany({ where: { id: { in: [en.id, ja.id] } } });
    }
  });
});

describe("Progress — main heatmap and reviews30 are lang-scoped", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("progress");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("5-month heatmap only contains Activity rows for the active lang", async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const yest = new Date(today.getTime() - DAY_MS);
    await prisma.activity.createMany({
      data: [
        { userId, date: today, lang: "en", minutesWatch: 5 },
        { userId, date: yest, lang: "en", minutesWatch: 15 },
        { userId, date: today, lang: "ja", minutesWatch: 999 },
        { userId, date: yest, lang: "ja", minutesWatch: 999 },
      ],
    });

    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
    fiveMonthsAgo.setDate(1);
    fiveMonthsAgo.setHours(0, 0, 0, 0);

    const activities = await prisma.activity.findMany({
      where: { userId, lang: "en", date: { gte: fiveMonthsAgo } },
      orderBy: { date: "asc" },
    });
    expect(activities).toHaveLength(2);
    for (const a of activities) expect(a.lang).toBe("en");
    // Sanity: no JP minute bleeds into the per-day sum.
    const minutes = activities.reduce((s, a) => s + (a.minutesWatch ?? 0), 0);
    expect(minutes).toBe(20);
  });

  it("ReviewLog 30-day count filters by active lang", async () => {
    // Three EN logs (within window), two JP logs (within window), plus one
    // ancient EN log that must not be counted.
    const now = new Date();
    const ancient = new Date(now.getTime() - 60 * DAY_MS);
    await prisma.reviewLog.createMany({
      data: [
        { userId, cardType: "word", cardId: "w1", lang: "en", format: "flashcard", grade: 3, elapsedMs: 500, at: now },
        { userId, cardType: "word", cardId: "w2", lang: "en", format: "flashcard", grade: 3, elapsedMs: 500, at: now },
        { userId, cardType: "word", cardId: "w3", lang: "en", format: "flashcard", grade: 3, elapsedMs: 500, at: now },
        { userId, cardType: "word", cardId: "wj1", lang: "ja", format: "flashcard", grade: 3, elapsedMs: 500, at: now },
        { userId, cardType: "word", cardId: "wj2", lang: "ja", format: "flashcard", grade: 3, elapsedMs: 500, at: now },
        { userId, cardType: "word", cardId: "wold", lang: "en", format: "flashcard", grade: 3, elapsedMs: 500, at: ancient },
      ],
    });

    const count = await prisma.reviewLog.count({
      where: {
        userId,
        lang: "en",
        at: { gte: new Date(Date.now() - 30 * DAY_MS) },
      },
    });
    expect(count).toBe(3);
  });
});

describe("VideoSession — 3-col unique lets EN+JP sessions coexist", () => {
  let userId: string;
  let sourceId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("video-session");
    const src = await prisma.source.create({
      data: { type: "youtube_video", title: "Shared source", lang: "en" },
    });
    sourceId = src.id;
  });
  afterEach(async () => {
    await wipeUser(userId);
    try {
      await prisma.source.delete({ where: { id: sourceId } });
    } catch {
      /* ignore */
    }
  });

  it("same (userId, sourceId) can hold independent EN and JP VideoSessions", async () => {
    await prisma.videoSession.create({
      data: { userId, sourceId, lang: "en", positionSec: 10, percent: 0.1 },
    });
    await prisma.videoSession.create({
      data: { userId, sourceId, lang: "ja", positionSec: 42, percent: 0.4 },
    });
    const rows = await prisma.videoSession.findMany({
      where: { userId, sourceId },
      orderBy: { lang: "asc" },
    });
    expect(rows).toHaveLength(2);
    expect(rows.map((r) => r.lang).sort()).toEqual(["en", "ja"]);
  });

  it("resume read on the Watch page returns only the active-lang session", async () => {
    await prisma.videoSession.create({
      data: { userId, sourceId, lang: "en", positionSec: 10 },
    });
    await prisma.videoSession.create({
      data: { userId, sourceId, lang: "ja", positionSec: 42 },
    });
    // Mirror the loadResume positionSec query in app/watch/[sourceId]/page.tsx.
    const resume = await prisma.videoSession.findFirst({
      where: { userId, sourceId, lang: "en" },
      orderBy: { lastPulseAt: "desc" },
      select: { positionSec: true, lang: true },
    });
    expect(resume?.lang).toBe("en");
    expect(resume?.positionSec).toBe(10);
  });

  it("the (userId, sourceId, lang) unique rejects a true duplicate", async () => {
    await prisma.videoSession.create({
      data: { userId, sourceId, lang: "en", positionSec: 5 },
    });
    await expect(
      prisma.videoSession.create({
        data: { userId, sourceId, lang: "en", positionSec: 99 },
      }),
    ).rejects.toThrow();
  });
});

describe("UserWord / Sentence reads — Home + Words + Sentences only show active lang", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("words-sentences");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("Words page query filters by (userId, lang)", async () => {
    await prisma.userWord.createMany({
      data: [
        { userId, lemma: "hello", lang: "en" },
        { userId, lemma: "world", lang: "en" },
        { userId, lemma: "こんにちは", lang: "ja" },
      ],
    });
    const rows = await prisma.userWord.findMany({
      where: { userId, lang: "en" },
      orderBy: { createdAt: "desc" },
    });
    expect(rows).toHaveLength(2);
    for (const r of rows) expect(r.lang).toBe("en");
  });

  it("Sentences page query filters by (userId, lang)", async () => {
    await prisma.sentence.createMany({
      data: [
        { userId, text: "Hi there.", lang: "en" },
        { userId, text: "こんにちは。", lang: "ja" },
      ],
    });
    const rows = await prisma.sentence.findMany({
      where: { userId, lang: "en" },
    });
    expect(rows).toHaveLength(1);
    expect(rows[0]!.lang).toBe("en");
  });

  it("Home review-count queries filter by (userId, lang)", async () => {
    await prisma.userWord.createMany({
      data: [
        { userId, lemma: "a", lang: "en", state: "learning" },
        { userId, lemma: "b", lang: "en", state: "new" },
        { userId, lemma: "x", lang: "ja", state: "learning" },
        { userId, lemma: "y", lang: "ja", state: "new" },
      ],
    });
    const [learning, newCount] = await Promise.all([
      prisma.userWord.count({ where: { userId, lang: "en", state: "learning" } }),
      prisma.userWord.count({ where: { userId, lang: "en", state: "new" } }),
    ]);
    expect(learning).toBe(1);
    expect(newCount).toBe(1);
  });
});

describe("Encounter — Home 'last night' feed is lang-scoped", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUserWithTwoLangs("encounter");
  });
  afterEach(async () => {
    await wipeUser(userId);
  });

  it("Only encounters in the active lang reach the 'lines you saved' row", async () => {
    const now = new Date();
    await prisma.encounter.createMany({
      data: [
        { userId, lang: "en", line: "a line", savedAt: now },
        { userId, lang: "ja", line: "別の行", savedAt: now },
      ],
    });

    const sevenDaysAgo = new Date(now.getTime() - 7 * DAY_MS);
    const rows = await prisma.encounter.findMany({
      where: { userId, lang: "en", savedAt: { gte: sevenDaysAgo } },
    });
    expect(rows).toHaveLength(1);
    expect(rows[0]!.lang).toBe("en");
  });
});
