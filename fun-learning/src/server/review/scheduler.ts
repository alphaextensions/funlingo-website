/**
 * FSRS scheduler — thin wrapper around `ts-fsrs` that owns Review state.
 *
 * Key constraints (from AGENT-PLAYBOOK non-negotiables + Code QA veto matrix):
 *
 *  - **No polymorphic FKs.** `ReviewCardState` is keyed by composite
 *    `(userId, cardType, cardId)` with a UNIQUE constraint — the DB itself
 *    prevents the "FSRS collision" veto (grading `UserWord#X` can never touch
 *    `Sentence#X`).
 *  - **Lang-scoped.** Every row carries `lang`; `cardsDueNow` filters by
 *    `(userId, lang)` and never returns another language's cards.
 *  - **Idempotent writes.** Grade routes wrap this in `withIdempotency` so a
 *    retried POST doesn't double-advance a card.
 *
 * Public API:
 *   - `getOrInitCardState(userId, cardType, cardId, lang)` — Prisma row + ts-fsrs Card
 *   - `gradeCard({ userId, cardType, cardId, lang, grade, elapsedMs, format })`
 *   - `skipCard({ ... })` — logs skip, does NOT advance state
 *   - `cardsDueNow(userId, lang, limit)` — rows ready for review today
 */

import { prisma } from "@/server/db";
import {
  createEmptyCard,
  fsrs,
  type Card,
  type Grade,
  Rating,
  State,
} from "ts-fsrs";
import { weakAreas } from "./weakAreas";
import { GRADUATED_STATES } from "@/lib/words/state";
import type { Prisma } from "@prisma/client";

export type CardType = "word" | "sentence";
export type ReviewFormat =
  | "flashcard"
  | "guess"
  | "dictation"
  | "shadow"
  | "speaking";

export const FSRS_GRADE_AGAIN = 1 as Grade;
export const FSRS_GRADE_HARD = 2 as Grade;
export const FSRS_GRADE_GOOD = 3 as Grade;
export const FSRS_GRADE_EASY = 4 as Grade;

/** 1..4 — Again/Hard/Good/Easy. Matches ts-fsrs Rating enum values. */
export type UiGrade = 1 | 2 | 3 | 4;

export interface GradeArgs {
  userId: string;
  cardType: CardType;
  cardId: string;
  lang: string;
  grade: UiGrade;
  elapsedMs: number;
  format: ReviewFormat;
  /** Override "now" for deterministic tests. */
  now?: Date;
}

export interface SkipArgs {
  userId: string;
  cardType: CardType;
  cardId: string;
  lang: string;
  elapsedMs?: number;
}

export interface DueCardRef {
  cardType: CardType;
  cardId: string;
  lang: string;
  due: Date;
  reps: number;
  state: number;
}

const scheduler = fsrs();

/**
 * Serialise a ts-fsrs Card to a JSON string for SQLite storage.
 * Dates go to ISO. Everything else is JSON-safe already.
 */
function serializeCard(card: Card): string {
  return JSON.stringify({
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review?.toISOString() ?? null,
  });
}

function deserializeCard(raw: string): Card {
  const o = JSON.parse(raw) as Record<string, unknown>;
  return {
    due: new Date(o.due as string),
    stability: o.stability as number,
    difficulty: o.difficulty as number,
    elapsed_days: o.elapsed_days as number,
    scheduled_days: o.scheduled_days as number,
    learning_steps: (o.learning_steps as number) ?? 0,
    reps: o.reps as number,
    lapses: o.lapses as number,
    state: o.state as State,
    last_review: o.last_review ? new Date(o.last_review as string) : undefined,
  };
}

/**
 * Get the ReviewCardState row for a card, creating a `State.New` row if it
 * doesn't exist. The caller is expected to have verified that `cardId` is a
 * real UserWord/Sentence belonging to `userId` with the given `lang` — see
 * `assertCardExists` below (also the Code QA finding #6 escape hatch).
 */
export async function getOrInitCardState(
  userId: string,
  cardType: CardType,
  cardId: string,
  lang: string,
  now: Date = new Date(),
): Promise<{ row: Awaited<ReturnType<typeof prisma.reviewCardState.findUnique>>; card: Card }> {
  const existing = await prisma.reviewCardState.findUnique({
    where: {
      userId_cardType_cardId: { userId, cardType, cardId },
    },
  });

  if (existing) {
    // Lang guard: if the row's lang doesn't match the caller's lang, treat it
    // as a cross-lang collision (should never happen but we defend in depth).
    if (existing.lang !== lang) {
      throw new Error(
        `ReviewCardState lang mismatch: row.lang=${existing.lang} vs call.lang=${lang} for ${cardType}#${cardId}`,
      );
    }
    return { row: existing, card: deserializeCard(existing.card) };
  }

  const freshCard = createEmptyCard(now);
  const row = await prisma.reviewCardState.create({
    data: {
      userId,
      cardType,
      cardId,
      lang,
      due: freshCard.due,
      stability: freshCard.stability,
      difficulty: freshCard.difficulty,
      reps: freshCard.reps,
      lapses: freshCard.lapses,
      state: freshCard.state,
      card: serializeCard(freshCard),
    },
  });
  return { row, card: freshCard };
}

/**
 * Grade a card. Runs ts-fsrs, persists updated ReviewCardState, writes a
 * ReviewLog row, and updates Streak + Activity for the user+lang pair. Returns
 * the new state so the UI can show "next due in N days".
 *
 * Everything happens in one Prisma transaction so a partial failure can't
 * leave the card advanced but the log missing (or vice versa).
 */
export async function gradeCard(args: GradeArgs) {
  const now = args.now ?? new Date();
  const grade = args.grade as unknown as Grade;

  // Load (or create) state outside the tx — it has its own idempotent create
  // via the composite UNIQUE.
  const { row: existing, card: currentCard } = await getOrInitCardState(
    args.userId,
    args.cardType,
    args.cardId,
    args.lang,
    now,
  );

  const result = scheduler.next(currentCard, now, grade);
  const nextCard = result.card;

  return prisma.$transaction(async (tx) => {
    const updated = await tx.reviewCardState.update({
      where: { id: existing!.id },
      data: {
        due: nextCard.due,
        stability: nextCard.stability,
        difficulty: nextCard.difficulty,
        reps: nextCard.reps,
        lapses: nextCard.lapses,
        state: nextCard.state,
        card: serializeCard(nextCard),
      },
    });

    const log = await tx.reviewLog.create({
      data: {
        userId: args.userId,
        cardType: args.cardType,
        cardId: args.cardId,
        lang: args.lang,
        format: args.format,
        grade: args.grade,
        elapsedMs: args.elapsedMs,
        at: now,
      },
    });

    // Streak + Activity — scoped per (userId, lang).
    const dayKey = startOfUtcDay(now);

    const existingActivity = await tx.activity.findUnique({
      where: {
        userId_date_lang: { userId: args.userId, date: dayKey, lang: args.lang },
      },
    });
    if (existingActivity) {
      await tx.activity.update({
        where: { id: existingActivity.id },
        data: { reviews: { increment: 1 } },
      });
    } else {
      await tx.activity.create({
        data: {
          userId: args.userId,
          date: dayKey,
          lang: args.lang,
          reviews: 1,
        },
      });
    }

    // Streak: advance only on the first review of the UTC day for this lang.
    await touchStreak(tx, args.userId, args.lang, dayKey);

    return {
      stateRow: updated,
      logId: log.id,
      due: nextCard.due,
      scheduledDays: nextCard.scheduled_days,
      state: nextCard.state,
    };
  });
}

/**
 * Log a skip. FSRS state is NOT advanced — we only record that the user
 * passed on this card for analytics. We still bump the Activity "reviews
 * attempted" counter so streaks don't break on skip-heavy sessions.
 */
export async function skipCard(args: SkipArgs) {
  const now = new Date();
  await prisma.reviewLog.create({
    data: {
      userId: args.userId,
      cardType: args.cardType,
      cardId: args.cardId,
      lang: args.lang,
      format: "skip",
      grade: 0,
      elapsedMs: args.elapsedMs ?? 0,
      at: now,
    },
  });
}

/**
 * Cards due now for a user+lang pair, ordered by due ascending. Mixes word +
 * sentence cards according to `wordRatio` (default 0.65 — word-heavy per SPEC
 * §11 which prioritises word cards but mixes sentences in).
 *
 * Returns at most `limit` rows. Falls back to brand-new UserWord / Sentence
 * rows (those without a ReviewCardState yet) when there aren't enough due
 * cards to fill the session.
 */
export async function cardsDueNow(
  userId: string,
  lang: string,
  limit = 20,
  now: Date = new Date(),
): Promise<DueCardRef[]> {
  // Wave 17: words the learner marked "I know this" (state known/mastered)
  // are graduated — they leave the daily queue, like the extension stops
  // highlighting them. "Reactivate" on /words brings them back.
  const graduated = await prisma.userWord.findMany({
    where: { userId, lang, state: { in: [...GRADUATED_STATES] } },
    select: { id: true },
  });
  const graduatedIds = new Set(graduated.map((w) => w.id));

  // (1) Rows already in ReviewCardState whose due <= now.
  const dueRaw = await prisma.reviewCardState.findMany({
    where: {
      userId,
      lang,
      due: { lte: now },
    },
    orderBy: [{ due: "asc" }],
    take: limit * 2, // overfetch so we can interleave
    select: {
      cardType: true,
      cardId: true,
      lang: true,
      due: true,
      reps: true,
      state: true,
    },
  });
  const due = dueRaw.filter(
    (d) => !(d.cardType === "word" && graduatedIds.has(d.cardId)),
  );

  if (due.length >= limit) {
    return interleave(due as DueCardRef[], limit);
  }

  // (2) Need more — pull brand-new UserWord + Sentence rows the user has but
  // which don't yet have a ReviewCardState.
  const seenPairs = new Set(due.map((d) => `${d.cardType}:${d.cardId}`));
  const needed = limit - due.length;

  const [freshWords, freshSentences] = await Promise.all([
    prisma.userWord.findMany({
      where: { userId, lang, state: { notIn: [...GRADUATED_STATES] } },
      orderBy: { createdAt: "desc" },
      take: needed * 2,
      select: { id: true },
    }),
    prisma.sentence.findMany({
      where: { userId, lang },
      orderBy: { createdAt: "desc" },
      take: needed * 2,
      select: { id: true },
    }),
  ]);

  const freshes: DueCardRef[] = [];
  for (const w of freshWords) {
    if (seenPairs.has(`word:${w.id}`)) continue;
    freshes.push({
      cardType: "word",
      cardId: w.id,
      lang,
      due: now,
      reps: 0,
      state: 0,
    });
  }
  for (const s of freshSentences) {
    if (seenPairs.has(`sentence:${s.id}`)) continue;
    freshes.push({
      cardType: "sentence",
      cardId: s.id,
      lang,
      due: now,
      reps: 0,
      state: 0,
    });
  }

  // Filter freshes: skip any pair that has a ReviewCardState row NOT in the
  // "due" slice (i.e. a card that was reviewed earlier today and is now in
  // the future).
  const futureStates = await prisma.reviewCardState.findMany({
    where: {
      userId,
      lang,
      OR: freshes.map((f) => ({ cardType: f.cardType, cardId: f.cardId })),
    },
    select: { cardType: true, cardId: true },
  });
  const futurePairs = new Set(futureStates.map((s) => `${s.cardType}:${s.cardId}`));
  const freshesFiltered = freshes.filter(
    (f) => !futurePairs.has(`${f.cardType}:${f.cardId}`),
  );

  return interleave([...(due as DueCardRef[]), ...freshesFiltered], limit);
}

/**
 * Interleave word + sentence cards: roughly 65% word / 35% sentence per SPEC
 * §11 ("daily session mixes formats"). Within each type we preserve the
 * `due`-ascending order of the input.
 */
function interleave(all: DueCardRef[], limit: number): DueCardRef[] {
  const words = all.filter((c) => c.cardType === "word");
  const sentences = all.filter((c) => c.cardType === "sentence");
  const out: DueCardRef[] = [];
  let wi = 0;
  let si = 0;
  // Target ratio: for every 2 words, 1 sentence (SPEC §11 says mix formats;
  // we start word-heavy because most users save far more words than sentences).
  while (out.length < limit && (wi < words.length || si < sentences.length)) {
    for (let i = 0; i < 2 && wi < words.length && out.length < limit; i++) {
      out.push(words[wi++]);
    }
    if (si < sentences.length && out.length < limit) {
      out.push(sentences[si++]);
    }
  }
  return out;
}

/** 00:00:00 UTC of the day containing `d`. */
export function startOfUtcDay(d: Date): Date {
  const u = new Date(d);
  u.setUTCHours(0, 0, 0, 0);
  return u;
}

async function touchStreak(
  tx: Prisma.TransactionClient,
  userId: string,
  lang: string,
  today: Date,
) {
  const existing = await tx.streak.findUnique({
    where: { userId_lang: { userId, lang } },
  });

  if (!existing) {
    await tx.streak.create({
      data: {
        userId,
        lang,
        current: 1,
        best: 1,
        freezes: 0,
        lastActiveDate: today,
      },
    });
    return;
  }

  const last = existing.lastActiveDate ? startOfUtcDay(existing.lastActiveDate) : null;
  if (last && last.getTime() === today.getTime()) {
    // Already reviewed today — nothing to do.
    return;
  }

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const continued = last && last.getTime() === yesterday.getTime();
  const next = continued ? existing.current + 1 : 1;
  await tx.streak.update({
    where: { userId_lang: { userId, lang } },
    data: {
      current: next,
      best: Math.max(existing.best, next),
      lastActiveDate: today,
    },
  });
}

/**
 * Grade a card non-transactionally for use inside an already-running
 * transaction (e.g. the batch grader). Keep the public export in sync.
 */
export async function previewNextDue(
  cardType: CardType,
  cardId: string,
  _lang: string,
  grade: UiGrade,
  now: Date = new Date(),
): Promise<Date> {
  // Preview-only — reads the row but doesn't persist.
  const existing = await prisma.reviewCardState.findUnique({
    where: { userId_cardType_cardId: { userId: "__preview__", cardType, cardId } },
  });
  const current = existing ? deserializeCard(existing.card) : createEmptyCard(now);
  const result = scheduler.next(current, now, grade as unknown as Grade);
  return result.card.due;
}

/**
 * Service-layer card existence check — closes Code QA finding #6 (ReviewLog.cardId
 * has no FK). Call before persisting any ReviewLog or ReviewCardState from a
 * handler that trusts user input.
 */
export async function assertCardExists(
  userId: string,
  cardType: CardType,
  cardId: string,
  lang: string,
): Promise<void> {
  if (cardType === "word") {
    const w = await prisma.userWord.findFirst({
      where: { id: cardId, userId, lang },
      select: { id: true },
    });
    if (!w) throw new ReviewCardMissingError(cardType, cardId);
    return;
  }
  if (cardType === "sentence") {
    const s = await prisma.sentence.findFirst({
      where: { id: cardId, userId, lang },
      select: { id: true },
    });
    if (!s) throw new ReviewCardMissingError(cardType, cardId);
    return;
  }
  throw new Error(`Unknown cardType: ${cardType}`);
}

export class ReviewCardMissingError extends Error {
  readonly status = 404;
  constructor(public cardType: string, public cardId: string) {
    super(`Review card not found: ${cardType}#${cardId}`);
    this.name = "ReviewCardMissingError";
  }
}

/**
 * Wire 4 helper: find cards whose last 3 grades (over the last 7 days) carry
 * ≥2 "Again" (grade=1). Returns a Set of `${cardType}:${cardId}` keys the
 * caller uses to bias the review queue toward weak areas
 * (`/review?focus=weak`). The actual heuristic lives in
 * `src/server/review/weakAreas.ts` so the Progress → Review surface and this
 * scheduler bias stay in lock-step.
 */
export async function weakAreaCardKeys(
  userId: string,
  lang: string,
  now: Date = new Date(),
): Promise<Set<string>> {
  const { keys } = await weakAreas(userId, lang, now);
  return keys;
}

export { Rating as FsrsRating, State as FsrsState };
