/**
 * Shared "weak areas" query — single source of truth for the heuristic that
 * flags cards the learner is struggling with:
 *
 *   over the last 7 days, consider the user's last 3 non-skip grades per
 *   (cardType, cardId); if ≥2 of them are "Again" (grade=1), the card is weak.
 *
 * Both the Progress → Review `<WeakAreas>` component (surfaces the top ~5
 * weakest cards) and the Review scheduler's `/review?focus=weak` biasing
 * route call through here, so the UI count and the queue bias cannot drift
 * out of agreement.
 */

import { prisma } from "@/server/db";

export const WEAK_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000;
export const WEAK_WINDOW = 3;
export const WEAK_LAPSE_MIN = 2;

export interface WeakRow {
  cardType: "word" | "sentence";
  cardId: string;
  recentLapses: number;
  totalRecentGrades: number;
}

export interface WeakAreasResult {
  /** `${cardType}:${cardId}` keys the Review scheduler uses to re-sort the
   *  queue. Insertion order is lapse-count desc, so slicing stays stable. */
  keys: Set<string>;
  /** Full rows (lapse count + sample size) sorted by lapses desc. The UI
   *  slice from this; the scheduler ignores it but it's cheap to keep. */
  rows: WeakRow[];
}

/**
 * Run the weak-areas query once and hand both consumers (UI + scheduler)
 * everything they need. `now` is injectable for tests.
 */
export async function weakAreas(
  userId: string,
  lang: string,
  now: Date = new Date(),
): Promise<WeakAreasResult> {
  const sevenDaysAgo = new Date(now.getTime() - WEAK_LOOKBACK_MS);
  const logs = await prisma.reviewLog.findMany({
    where: {
      userId,
      lang,
      at: { gte: sevenDaysAgo },
      // Skips (grade=0) aren't failures — they're pauses. Exclude.
      grade: { gt: 0 },
    },
    orderBy: { at: "desc" },
    select: { cardType: true, cardId: true, grade: true },
  });

  // Bucket by card, keeping only the newest WEAK_WINDOW grades per bucket.
  const buckets = new Map<
    string,
    { cardType: "word" | "sentence"; cardId: string; grades: number[] }
  >();
  for (const log of logs) {
    const key = `${log.cardType}:${log.cardId}`;
    const b = buckets.get(key);
    if (b) {
      if (b.grades.length < WEAK_WINDOW) b.grades.push(log.grade);
    } else {
      buckets.set(key, {
        cardType: log.cardType as "word" | "sentence",
        cardId: log.cardId,
        grades: [log.grade],
      });
    }
  }

  const rows: WeakRow[] = [];
  for (const b of buckets.values()) {
    const lapses = b.grades.filter((g) => g === 1).length;
    if (lapses >= WEAK_LAPSE_MIN) {
      rows.push({
        cardType: b.cardType,
        cardId: b.cardId,
        recentLapses: lapses,
        totalRecentGrades: b.grades.length,
      });
    }
  }
  rows.sort((a, b) => b.recentLapses - a.recentLapses);

  const keys = new Set(rows.map((r) => `${r.cardType}:${r.cardId}`));
  return { keys, rows };
}
