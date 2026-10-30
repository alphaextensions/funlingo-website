/**
 * Wave 17 — saved-word actions ported from the extension popup:
 *   - POST /api/words/state  ("I know this" / "Reactivate")
 *   - POST /api/words/delete (× remove + bulk delete)
 *   - graduated words leave the FSRS daily queue
 *
 * Real Prisma + SQLite; idempotency wrapper is a pass-through so we can
 * call the inner handler with a fixed userId.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/server/db";
import { cardsDueNow, getOrInitCardState } from "@/server/review/scheduler";

vi.mock("@/server/middleware/idempotency", () => ({
  withIdempotency: (handler: unknown) => handler,
}));

type AuthedHandler = (
  req: Request,
  ctx: { userId: string; clientRequestId: string | null },
) => Promise<Response>;

async function call(path: "state" | "delete", userId: string, body: unknown) {
  const mod =
    path === "state"
      ? await import("../../app/api/words/state/route")
      : await import("../../app/api/words/delete/route");
  const req = new Request(`http://localhost/api/words/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return (mod.POST as unknown as AuthedHandler)(req, { userId, clientRequestId: null });
}

async function freshUser(label: string) {
  const u = await prisma.user.create({
    data: {
      email: `w17-${label}-${Date.now()}-${Math.random()}@test.local`,
      activeLearningLang: "es",
    },
  });
  return u.id;
}

async function wipe(userId: string) {
  await prisma.reviewCardState.deleteMany({ where: { userId } });
  await prisma.encounter.deleteMany({ where: { userId } });
  await prisma.userWord.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
}

describe("Wave 17 — /api/words/state", () => {
  let userId: string;
  let other: string;
  beforeEach(async () => {
    userId = await freshUser("a");
    other = await freshUser("b");
  });
  afterEach(async () => {
    await wipe(userId);
    await wipe(other);
  });

  it("marks a word known and back to learning", async () => {
    const w = await prisma.userWord.create({ data: { userId, lemma: "hola", lang: "es" } });
    const r1 = await call("state", userId, { wordId: w.id, lang: "es", state: "known" });
    expect(r1.status).toBe(200);
    expect((await prisma.userWord.findUnique({ where: { id: w.id } }))?.state).toBe("known");
    const r2 = await call("state", userId, { wordId: w.id, lang: "es", state: "learning" });
    expect(r2.status).toBe(200);
    expect((await prisma.userWord.findUnique({ where: { id: w.id } }))?.state).toBe("learning");
  });

  it("is lang-scoped and owner-scoped", async () => {
    const w = await prisma.userWord.create({ data: { userId, lemma: "hola", lang: "es" } });
    const wrongLang = await call("state", userId, { wordId: w.id, lang: "ja", state: "known" });
    expect(wrongLang.status).toBe(404);
    const wrongUser = await call("state", other, { wordId: w.id, lang: "es", state: "known" });
    expect(wrongUser.status).toBe(404);
    expect((await prisma.userWord.findUnique({ where: { id: w.id } }))?.state).toBe("new");
  });

  it("rejects states a learner can't set by hand", async () => {
    const w = await prisma.userWord.create({ data: { userId, lemma: "hola", lang: "es" } });
    const r = await call("state", userId, { wordId: w.id, lang: "es", state: "mastered" });
    expect(r.status).toBe(400);
  });
});

describe("Wave 17 — /api/words/delete", () => {
  let userId: string;
  let other: string;
  beforeEach(async () => {
    userId = await freshUser("c");
    other = await freshUser("d");
  });
  afterEach(async () => {
    await wipe(userId);
    await wipe(other);
  });

  it("deletes the word, its encounters and its review state", async () => {
    const w = await prisma.userWord.create({ data: { userId, lemma: "gato", lang: "es" } });
    await prisma.encounter.create({
      data: { userId, userWordId: w.id, lang: "es", line: "" },
    });
    await getOrInitCardState(userId, "word", w.id, "es");
    const r = await call("delete", userId, { wordIds: [w.id], lang: "es" });
    expect(r.status).toBe(200);
    expect(await r.json()).toMatchObject({ deleted: 1 });
    expect(await prisma.userWord.count({ where: { id: w.id } })).toBe(0);
    expect(await prisma.encounter.count({ where: { userWordId: w.id } })).toBe(0);
    expect(
      await prisma.reviewCardState.count({ where: { userId, cardType: "word", cardId: w.id } }),
    ).toBe(0);
  });

  it("never touches another user's or another language's words", async () => {
    const mine = await prisma.userWord.create({ data: { userId, lemma: "perro", lang: "ja" } });
    const theirs = await prisma.userWord.create({ data: { userId: other, lemma: "perro", lang: "es" } });
    const r = await call("delete", userId, { wordIds: [mine.id, theirs.id], lang: "es" });
    expect(await r.json()).toMatchObject({ deleted: 0 });
    expect(await prisma.userWord.count({ where: { id: { in: [mine.id, theirs.id] } } })).toBe(2);
  });
});

describe("Wave 17 — graduated words leave the daily queue", () => {
  let userId: string;
  beforeEach(async () => {
    userId = await freshUser("e");
  });
  afterEach(async () => {
    await wipe(userId);
  });

  it("drops known words from fresh pulls and from due cards", async () => {
    const active = await prisma.userWord.create({ data: { userId, lemma: "uno", lang: "es" } });
    const knownFresh = await prisma.userWord.create({
      data: { userId, lemma: "dos", lang: "es", state: "known" },
    });
    const knownDue = await prisma.userWord.create({ data: { userId, lemma: "tres", lang: "es" } });
    await getOrInitCardState(userId, "word", knownDue.id, "es");
    await prisma.userWord.update({ where: { id: knownDue.id }, data: { state: "known" } });

    const refs = await cardsDueNow(userId, "es", 20, new Date(Date.now() + 60_000));
    const ids = refs.map((r) => r.cardId);
    expect(ids).toContain(active.id);
    expect(ids).not.toContain(knownFresh.id);
    expect(ids).not.toContain(knownDue.id);

    // Reactivate → back in the queue.
    await prisma.userWord.update({ where: { id: knownDue.id }, data: { state: "learning" } });
    const again = await cardsDueNow(userId, "es", 20, new Date(Date.now() + 60_000));
    expect(again.map((r) => r.cardId)).toContain(knownDue.id);
  });
});
