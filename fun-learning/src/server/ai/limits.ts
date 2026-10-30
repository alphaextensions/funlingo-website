/**
 * AI cost caps + rate limiting.
 *
 * Three layers (checked IN ORDER, before any model call):
 *
 *   1. maxInputTokens      — reject oversized payloads (cheap, no DB hit).
 *   2. userDay + ipHour    — sliding window counters per prompt function.
 *   3. MonthlyCeilingUsd   — global circuit breaker across all functions.
 *   4. per-user token wallet — decremented synchronously so a parallel burst
 *      can't race past the daily budget.
 *
 * Enforced BEFORE Groq is called. See AGENT-PLAYBOOK rule 2 under
 * "Engineering non-negotiables".
 */

import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";
import type { RateLimit } from "./types";
import { RateLimitError } from "./types";

// --- Global ceiling ---------------------------------------------------------
// $50/mo starter cap for Fun Learning v1 (local-only, Groq free tier). Raise
// in a focused lane after we have real usage telemetry — the circuit breaker
// stops the app from hammering Groq's rate-limited free tier endlessly.
export const MonthlySpendCeilingUsd = 50;

// Rough Groq pricing (free tier → charged tier post-GA): kept conservative so
// the ceiling trips earlier rather than later. Expressed as micro-USD per
// token to avoid float rounding when summed into SQLite INTEGER columns.
export const COST_PER_TOKEN_MICRO_USD: Record<string, { input: number; output: number }> = {
  "llama-3.3-70b-versatile": { input: 59 /* $0.59/1M */, output: 79 /* $0.79/1M */ },
  "llama-3.1-8b-instant":    { input:  5 /*  $0.05/1M */, output:  8 /*  $0.08/1M */ },
};

// --- Daily per-user wallet --------------------------------------------------
// Each user gets DAILY_USER_TOKEN_BUDGET tokens of combined input+output.
// Generous enough that a normal study session (watch an episode, ~400 lines,
// save ~30 words) stays well under; abuser pattern (10K `translateLines`
// bursts) blows through fast.
export const DAILY_USER_TOKEN_BUDGET = 200_000;
export const DAILY_USER_CALL_BUDGET = 2_000;

// ------------- Public API ---------------------------------------------------

export interface LimitCheckArgs {
  scope: string; // prompt-function name
  userId: string;
  ipHash?: string;
  inputChars: number;
  rateLimit: RateLimit;
}

export async function assertCanCall(args: LimitCheckArgs): Promise<void> {
  const { scope, userId, ipHash, inputChars, rateLimit } = args;

  // 1) Oversized input — ~4 chars/token heuristic (Groq Llama tokenisers).
  const approxTokens = Math.ceil(inputChars / 4);
  if (approxTokens > rateLimit.maxInputTokens) {
    throw new RateLimitError(
      scope,
      "inputTooLarge",
      0,
      `Input too large: ~${approxTokens} tokens > max ${rateLimit.maxInputTokens}.`,
    );
  }

  // 2a) userDay counter.
  if (rateLimit.perUserDay > 0) {
    const windowKey = utcDayKey();
    const next = await bumpCounter({
      scope, kind: "userDay", bucket: userId, windowKey, add: 1,
    });
    if (next > rateLimit.perUserDay) {
      throw new RateLimitError(scope, "userDay", secondsUntilMidnightUtc(),
        "You've hit today's limit for this feature. It'll reset at midnight UTC.");
    }
  }

  // 2b) ipHour counter.
  if (rateLimit.perIpHour > 0 && ipHash) {
    const windowKey = utcHourKey();
    const next = await bumpCounter({
      scope, kind: "ipHour", bucket: ipHash, windowKey, add: 1,
    });
    if (next > rateLimit.perIpHour) {
      throw new RateLimitError(scope, "ipHour", secondsUntilNextHourUtc(),
        "Too many requests from this network. Try again in a bit.");
    }
  }

  // 3) Monthly circuit breaker.
  const month = utcMonthKey();
  const monthly = await prisma.budgetMeter.findUnique({
    where: { yearMonth_scope: { yearMonth: month, scope: "_global_" } },
  });
  const spent = (monthly?.microUsdSpent ?? 0) / 1_000_000;
  if (spent >= MonthlySpendCeilingUsd) {
    logger.warn({ month, spent, ceiling: MonthlySpendCeilingUsd },
      "AI monthly circuit breaker tripped");
    throw new RateLimitError(scope, "monthlyCeiling", secondsUntilNextMonthUtc(),
      "AI budget cap for this month was hit. We're on it.");
  }

  // 4) Per-user token wallet — decrement a planning estimate (approxTokens*2
  //    for output headroom). The real cost reconciles in `recordCall`.
  await ensureWalletToday(userId);
  const wallet = await prisma.userAiWallet.findUnique({ where: { userId } });
  if (!wallet) return; // shouldn't happen — ensureWalletToday created it
  if (wallet.callsToday + 1 > DAILY_USER_CALL_BUDGET) {
    throw new RateLimitError(scope, "walletEmpty", secondsUntilMidnightUtc(),
      "You've hit today's AI usage limit. It'll reset at midnight UTC.");
  }
  const headroomTokens = approxTokens * 2;
  if (wallet.tokensUsedToday + headroomTokens > DAILY_USER_TOKEN_BUDGET) {
    throw new RateLimitError(scope, "walletEmpty", secondsUntilMidnightUtc(),
      "You've hit today's AI token budget. It'll reset at midnight UTC.");
  }
  // Reserve the planning estimate synchronously so a parallel burst sees it.
  await prisma.userAiWallet.update({
    where: { userId },
    data: {
      tokensUsedToday: { increment: headroomTokens },
      callsToday: { increment: 1 },
    },
  });
}

export interface RecordCallArgs {
  scope: string;
  userId: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  /** Tokens we already reserved via assertCanCall → subtract from them. */
  reservedTokens: number;
}

/** Reconcile the wallet with the ACTUAL cost after the model call lands.
 *  Also bumps the monthly meter. Called from `invoke.ts`. Never throws. */
export async function recordCall(args: RecordCallArgs): Promise<void> {
  try {
    const price = COST_PER_TOKEN_MICRO_USD[args.model] ?? { input: 60, output: 80 };
    const micro =
      args.inputTokens * price.input + args.outputTokens * price.output;
    const actualTokens = args.inputTokens + args.outputTokens;
    const delta = actualTokens - args.reservedTokens;
    const month = utcMonthKey();

    await prisma.$transaction([
      prisma.userAiWallet.update({
        where: { userId: args.userId },
        data: { tokensUsedToday: { increment: delta } },
      }),
      prisma.budgetMeter.upsert({
        where: { yearMonth_scope: { yearMonth: month, scope: "_global_" } },
        update: {
          inputTokens: { increment: args.inputTokens },
          outputTokens: { increment: args.outputTokens },
          microUsdSpent: { increment: micro },
          callCount: { increment: 1 },
        },
        create: {
          yearMonth: month,
          scope: "_global_",
          inputTokens: args.inputTokens,
          outputTokens: args.outputTokens,
          microUsdSpent: micro,
          callCount: 1,
        },
      }),
      prisma.budgetMeter.upsert({
        where: { yearMonth_scope: { yearMonth: month, scope: args.scope } },
        update: {
          inputTokens: { increment: args.inputTokens },
          outputTokens: { increment: args.outputTokens },
          microUsdSpent: { increment: micro },
          callCount: { increment: 1 },
        },
        create: {
          yearMonth: month,
          scope: args.scope,
          inputTokens: args.inputTokens,
          outputTokens: args.outputTokens,
          microUsdSpent: micro,
          callCount: 1,
        },
      }),
    ]);
  } catch (err) {
    logger.warn({ err: String(err), scope: args.scope }, "recordCall failed");
  }
}

/** Refund the reservation when the call failed before costing anything. */
export async function refundReservation(args: {
  userId: string;
  reservedTokens: number;
}): Promise<void> {
  try {
    await prisma.userAiWallet.update({
      where: { userId: args.userId },
      data: {
        tokensUsedToday: { decrement: args.reservedTokens },
        callsToday: { decrement: 1 },
      },
    });
  } catch (err) {
    logger.debug({ err: String(err) }, "refundReservation: no-op");
  }
}

// ------------- Internal helpers --------------------------------------------

async function bumpCounter(args: {
  scope: string;
  kind: "userDay" | "ipHour";
  bucket: string;
  windowKey: string;
  add: number;
}): Promise<number> {
  const row = await prisma.aiCallCounter.upsert({
    where: {
      scope_kind_bucket_windowKey: {
        scope: args.scope,
        kind: args.kind,
        bucket: args.bucket,
        windowKey: args.windowKey,
      },
    },
    update: { count: { increment: args.add } },
    create: {
      scope: args.scope,
      kind: args.kind,
      bucket: args.bucket,
      windowKey: args.windowKey,
      count: args.add,
    },
  });
  return row.count;
}

async function ensureWalletToday(userId: string): Promise<void> {
  const today = utcDayKey();
  await prisma.userAiWallet.upsert({
    where: { userId },
    update: {}, // see below — we handle the roll explicitly
    create: { userId, day: today },
  });
  const existing = await prisma.userAiWallet.findUnique({ where: { userId } });
  if (existing && existing.day !== today) {
    await prisma.userAiWallet.update({
      where: { userId },
      data: { day: today, tokensUsedToday: 0, callsToday: 0 },
    });
  }
}

export function utcDayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
export function utcHourKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 13); // YYYY-MM-DDTHH
}
export function utcMonthKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 7); // YYYY-MM
}
function secondsUntilMidnightUtc(d: Date = new Date()): number {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
  return Math.ceil((next.getTime() - d.getTime()) / 1000);
}
function secondsUntilNextHourUtc(d: Date = new Date()): number {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 1));
  return Math.ceil((next.getTime() - d.getTime()) / 1000);
}
function secondsUntilNextMonthUtc(d: Date = new Date()): number {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  return Math.ceil((next.getTime() - d.getTime()) / 1000);
}

// ------------- Test seams ---------------------------------------------------
export const __test__ = {
  utcDayKey,
  utcHourKey,
  utcMonthKey,
  secondsUntilMidnightUtc,
  secondsUntilNextHourUtc,
  secondsUntilNextMonthUtc,
};
