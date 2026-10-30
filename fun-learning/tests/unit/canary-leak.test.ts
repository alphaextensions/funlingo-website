/**
 * Caption-privacy canary test. Enforces AGENT-PLAYBOOK rule 1 and SPEC §14:
 * "Third-party caption text never touches the database or logs."
 *
 * The real flow wraps caption batches as `Confidential<string[]>` — an array
 * (an *object*) that carries the runtime brand. Bare primitives can't carry a
 * symbol, so the test exercises the array shape the real API uses.
 *
 * Covers:
 *   - the Pino scrubber redacts a Confidential<string[]>,
 *   - no row written by `translateLines` persists the canary,
 *   - stdout/stderr captured during the call never contains the canary.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { translateLines } from "@/lib/ai";
import { markConfidential } from "@/server/types/confidential";
import { __test__ as scrubberTest, logger } from "@/server/logging/scrubber";
import { prisma } from "@/server/db";

const CANARY = "CANARY_LINE_7823:THIS_MUST_NEVER_PERSIST";

// Stub out the groq client so no network call escapes the test. The raw
// `groq` export was removed in the Pass-3 cleanup — the only legitimate
// consumer (`invoke.ts`) now goes through `__internal_getGroqClient`, so
// that's what we mock.
vi.mock("@/server/ai/client", async (orig) => {
  const real = (await orig()) as typeof import("@/server/ai/client");
  const chat = {
    completions: {
      create: vi.fn(async (_req: unknown, _opts?: unknown) => {
        async function* gen() {
          yield {
            choices: [
              {
                delta: {
                  content:
                    JSON.stringify({
                      index: 0,
                      translation: "Hola mundo",
                      idiomatic: false,
                      idiomNote: null,
                    }) + "\n",
                },
              },
            ],
          };
        }
        return gen();
      }),
    },
  };
  const fakeClient = { chat } as unknown as ReturnType<
    typeof real.__internal_getGroqClient
  >;
  return {
    ...real,
    __internal_getGroqClient: () => fakeClient,
  };
});

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

describe("canary-leak", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("canary");
  });
  afterEach(async () => {
    await prisma.aiCallCounter.deleteMany({ where: { bucket: userId } });
    await prisma.userAiWallet.deleteMany({ where: { userId } });
    try { await prisma.user.delete({ where: { id: userId } }); } catch { /* ignore */ }
  });

  it("the scrubber redacts a Confidential<string[]> payload", () => {
    const branded = markConfidential([CANARY, "another caption"]);
    const scrubbed = scrubberTest.scrub({ event: "translate", lines: branded });
    const str = JSON.stringify(scrubbed);
    expect(str).toContain("[CONFIDENTIAL_REDACTED]");
    expect(str).not.toContain(CANARY);
  });

  it("the whole translateLines flow leaves no canary in any DB row we write", async () => {
    const iter = translateLines({
      lines: markConfidential([CANARY]),
      sourceLang: "en",
      targetLang: "es",
      userId,
    });
    for await (const _c of iter) {
      /* drain */
    }

    const wallet = await prisma.userAiWallet.findMany({ where: { userId } });
    const counters = await prisma.aiCallCounter.findMany({ where: { bucket: userId } });
    const encounters = await prisma.encounter.findMany({ where: { userId } });
    const idem = await prisma.idempotencyRecord.findMany({ where: { userId } });
    const budgets = await prisma.budgetMeter.findMany({});

    for (const rows of [wallet, counters, encounters, idem, budgets]) {
      expect(JSON.stringify(rows)).not.toContain(CANARY);
    }
  });

  it("logs emitted during the flow never contain the canary", async () => {
    const captured: string[] = [];
    const origWrite = process.stdout.write;
    const origErr = process.stderr.write;
    (process.stdout.write as unknown) = (chunk: unknown, ...rest: unknown[]) => {
      captured.push(String(chunk));
      return (origWrite as Function).apply(process.stdout, [chunk, ...rest]);
    };
    (process.stderr.write as unknown) = (chunk: unknown, ...rest: unknown[]) => {
      captured.push(String(chunk));
      return (origErr as Function).apply(process.stderr, [chunk, ...rest]);
    };

    try {
      // Intentionally hand the logger the Confidential array to prove the
      // scrubber redacts it. A naive future refactor that logged raw input
      // would fail this test.
      logger.info({ ev: "test", lines: markConfidential([CANARY]) }, "about to translate");

      const iter = translateLines({
        lines: markConfidential([CANARY]),
        sourceLang: "en",
        targetLang: "es",
        userId,
      });
      for await (const _c of iter) {
        /* drain */
      }
      logger.info({ ev: "test", done: true }, "translated");
    } finally {
      process.stdout.write = origWrite;
      process.stderr.write = origErr;
    }

    const all = captured.join("");
    expect(all).not.toContain(CANARY);
  });
});
