/**
 * Wave 16 — Watch parity routes: saveLine (LEGAL gate), wordState and saved
 * (lang scoping). Prisma + idempotency are mocked; handlers called directly.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

const prismaMock = {
  source: { findUnique: vi.fn() },
  encounter: { findFirst: vi.fn(), create: vi.fn(), findMany: vi.fn() },
  sentence: { findFirst: vi.fn(), create: vi.fn(), findMany: vi.fn() },
  userWord: { deleteMany: vi.fn(), updateMany: vi.fn(), findMany: vi.fn() },
};
vi.mock("@/server/db", () => ({ prisma: prismaMock }));
vi.mock("@/server/middleware/idempotency", () => ({
  withIdempotency: (handler: unknown) => handler,
}));
vi.mock("@/server/review/auth-helper", () => ({
  resolveReviewUserId: async () => "u_test",
}));

type AuthedHandler = (
  req: Request,
  ctx: { userId: string; clientRequestId: string | null },
) => Promise<Response>;

function post(url: string, body: unknown): Request {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const CANARY = "CANARY caption line that must never be stored";

beforeEach(() => {
  for (const group of Object.values(prismaMock)) {
    for (const fn of Object.values(group)) (fn as ReturnType<typeof vi.fn>).mockReset();
  }
  prismaMock.source.findUnique.mockResolvedValue({ id: "src1" });
  prismaMock.encounter.findFirst.mockResolvedValue(null);
  prismaMock.sentence.findFirst.mockResolvedValue(null);
  prismaMock.encounter.create.mockResolvedValue({ id: "e1" });
  prismaMock.sentence.create.mockResolvedValue({ id: "s1" });
});

describe("POST /api/watch/saveLine", () => {
  async function call(body: Record<string, unknown>) {
    const mod = await import("../../app/api/watch/saveLine/route");
    const handler = mod.POST as unknown as AuthedHandler;
    return handler(post("http://x/api/watch/saveLine", body), { userId: "u_test", clientRequestId: null });
  }

  it("YouTube: stores a timestamp-only moment and NEVER the caption text", async () => {
    const res = await call({
      sourceId: "src1",
      sourceType: "youtube_video",
      lang: "es",
      timestampSec: 42,
      line: CANARY,
      translation: CANARY,
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.storedLine).toBe(false);
    expect(prismaMock.sentence.create).not.toHaveBeenCalled();
    const arg = prismaMock.encounter.create.mock.calls[0][0];
    expect(arg.data.line).toBe("");
    expect(arg.data.lang).toBe("es");
    expect(arg.data.userWordId).toBeNull();
    expect(JSON.stringify(prismaMock.encounter.create.mock.calls)).not.toContain("CANARY");
  });

  it("own content (demo): stores a private Sentence in the favorite list", async () => {
    const res = await call({
      sourceId: "demo",
      sourceType: "fun_learning_demo",
      lang: "es",
      timestampSec: 4,
      line: "We choose to learn languages.",
    });
    expect(res.status).toBe(200);
    const arg = prismaMock.sentence.create.mock.calls[0][0];
    expect(arg.data.text).toBe("We choose to learn languages.");
    expect(arg.data.lists).toBe("favorite");
    expect(arg.data.lang).toBe("es");
    expect(arg.data.sourceId).toBeNull();
  });

  it("re-saving the same moment is a no-op", async () => {
    prismaMock.encounter.findFirst.mockResolvedValue({ id: "e0" });
    const res = await call({ sourceId: "src1", sourceType: "youtube_video", lang: "es", timestampSec: 42, line: "x" });
    expect((await res.json()).id).toBe("e0");
    expect(prismaMock.encounter.create).not.toHaveBeenCalled();
  });
});

describe("POST /api/watch/wordState", () => {
  async function call(body: Record<string, unknown>) {
    const mod = await import("../../app/api/watch/wordState/route");
    const handler = mod.POST as unknown as AuthedHandler;
    return handler(post("http://x/api/watch/wordState", body), { userId: "u_test", clientRequestId: null });
  }

  it("unsave deletes only this user's word in this lang", async () => {
    prismaMock.userWord.deleteMany.mockResolvedValue({ count: 1 });
    const res = await call({ lemma: "Break", lang: "en", action: "unsave" });
    expect(res.status).toBe(200);
    expect(prismaMock.userWord.deleteMany).toHaveBeenCalledWith({
      where: { userId: "u_test", lang: "en", lemma: "break" },
    });
  });

  it("known sets state, lang-scoped; 404 when not saved", async () => {
    prismaMock.userWord.updateMany.mockResolvedValue({ count: 1 });
    await call({ lemma: "ice", lang: "ja", action: "known" });
    expect(prismaMock.userWord.updateMany.mock.calls[0][0]).toEqual({
      where: { userId: "u_test", lang: "ja", lemma: "ice" },
      data: { state: "known" },
    });
    prismaMock.userWord.updateMany.mockResolvedValue({ count: 0 });
    const res = await call({ lemma: "nope", lang: "ja", action: "known" });
    expect(res.status).toBe(404);
  });
});

describe("GET /api/watch/saved", () => {
  it("every read carries lang; returns timestamps, not text", async () => {
    prismaMock.userWord.findMany.mockResolvedValue([{ lemma: "break", state: "new" }]);
    prismaMock.encounter.findMany.mockResolvedValue([{ timestampSec: 12 }]);
    prismaMock.sentence.findMany.mockResolvedValue([{ timestampSec: 4 }, { timestampSec: 12 }]);
    const mod = await import("../../app/api/watch/saved/route");
    const res = await mod.GET(new Request("http://x/api/watch/saved?lang=es&sourceId=src1"));
    const json = await res.json();
    expect(json.words).toEqual([{ lemma: "break", state: "new" }]);
    expect(json.savedLineTimes).toEqual([4, 12]);
    expect(prismaMock.userWord.findMany.mock.calls[0][0].where).toEqual({ userId: "u_test", lang: "es" });
    expect(prismaMock.encounter.findMany.mock.calls[0][0].where.lang).toBe("es");
    expect(prismaMock.sentence.findMany.mock.calls[0][0].where.lang).toBe("es");
  });

  it("rejects a missing lang", async () => {
    const mod = await import("../../app/api/watch/saved/route");
    const res = await mod.GET(new Request("http://x/api/watch/saved"));
    expect(res.status).toBe(400);
  });
});
