import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { assertCanCall, DAILY_USER_CALL_BUDGET, DAILY_USER_TOKEN_BUDGET, __test__ } from "@/server/ai/limits";
import { RateLimitError } from "@/server/ai/types";
import { MODEL_FAST } from "@/server/ai/client";
import { prisma } from "@/server/db";

const RL = {
  perUserDay: 5,
  perIpHour: 3,
  maxInputTokens: 100,
  timeoutMs: 10_000,
  model: MODEL_FAST,
};

async function freshUser(label: string): Promise<string> {
  const email = `test+${label}@funlingo.local`;
  const u = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: label },
  });
  await prisma.aiCallCounter.deleteMany({ where: { bucket: u.id } });
  await prisma.userAiWallet.deleteMany({ where: { userId: u.id } });
  return u.id;
}

afterEach(async () => {
  await prisma.aiCallCounter.deleteMany({ where: { scope: "test_scope" } });
  await prisma.budgetMeter.deleteMany({ where: { scope: "test_scope" } });
});

describe("limits.assertCanCall", () => {
  it("rejects an oversized input before touching the DB", async () => {
    const userId = await freshUser("limits-oversize");
    const bigChars = (RL.maxInputTokens + 1) * 4 + 1;
    await expect(
      assertCanCall({
        scope: "test_scope",
        userId,
        inputChars: bigChars,
        rateLimit: RL,
      }),
    ).rejects.toBeInstanceOf(RateLimitError);
  });

  it("blocks after perUserDay calls, releasing on the next window", async () => {
    const userId = await freshUser("limits-userday");
    for (let i = 0; i < RL.perUserDay; i++) {
      await assertCanCall({ scope: "test_scope", userId, inputChars: 10, rateLimit: RL });
    }
    await expect(
      assertCanCall({ scope: "test_scope", userId, inputChars: 10, rateLimit: RL }),
    ).rejects.toMatchObject({ kind: "userDay" });
  });

  it("blocks after perIpHour calls when an ipHash is given", async () => {
    const userId = await freshUser("limits-iphour");
    const ipHash = "iphash-" + Date.now();
    // perIpHour is 3; after 3 calls the 4th should fail with ipHour kind.
    for (let i = 0; i < RL.perIpHour; i++) {
      await assertCanCall({ scope: "test_scope", userId, ipHash, inputChars: 10, rateLimit: RL });
    }
    await expect(
      assertCanCall({ scope: "test_scope", userId, ipHash, inputChars: 10, rateLimit: RL }),
    ).rejects.toMatchObject({ kind: "ipHour" });
  });

  it("trips the monthly circuit breaker when the global BudgetMeter is at the ceiling", async () => {
    const userId = await freshUser("limits-monthly");
    const month = __test__.utcMonthKey();
    // Set spent to the ceiling in micro-USD (MonthlySpendCeilingUsd = 50 → 5e7 micro).
    await prisma.budgetMeter.upsert({
      where: { yearMonth_scope: { yearMonth: month, scope: "_global_" } },
      create: {
        yearMonth: month, scope: "_global_", microUsdSpent: 50_000_000,
      },
      update: { microUsdSpent: 50_000_000 },
    });
    try {
      await expect(
        assertCanCall({ scope: "test_scope", userId, inputChars: 10, rateLimit: RL }),
      ).rejects.toMatchObject({ kind: "monthlyCeiling" });
    } finally {
      await prisma.budgetMeter.deleteMany({ where: { yearMonth: month, scope: "_global_" } });
    }
  });

  it("drains the per-user token wallet after burst calls", async () => {
    const userId = await freshUser("limits-wallet");
    // Set the wallet right at the edge so the next reservation blows past.
    await prisma.userAiWallet.upsert({
      where: { userId },
      create: {
        userId,
        day: __test__.utcDayKey(),
        tokensUsedToday: DAILY_USER_TOKEN_BUDGET - 10,
      },
      update: { tokensUsedToday: DAILY_USER_TOKEN_BUDGET - 10, day: __test__.utcDayKey() },
    });
    // headroom = ceil(400/4)*2 = 200 → wallet would overflow.
    const bigRL = { ...RL, perUserDay: 0, perIpHour: 0 };
    await expect(
      assertCanCall({ scope: "test_scope", userId, inputChars: 400, rateLimit: bigRL }),
    ).rejects.toMatchObject({ kind: "walletEmpty" });
  });

  it("daily call budget trips before token budget on tiny calls", async () => {
    const userId = await freshUser("limits-callbudget");
    await prisma.userAiWallet.upsert({
      where: { userId },
      create: {
        userId,
        day: __test__.utcDayKey(),
        callsToday: DAILY_USER_CALL_BUDGET,
      },
      update: { callsToday: DAILY_USER_CALL_BUDGET, day: __test__.utcDayKey() },
    });
    const noRL = { ...RL, perUserDay: 0, perIpHour: 0 };
    await expect(
      assertCanCall({ scope: "test_scope", userId, inputChars: 10, rateLimit: noRL }),
    ).rejects.toMatchObject({ kind: "walletEmpty" });
  });
});
