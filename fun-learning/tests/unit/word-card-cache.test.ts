/**
 * Vitest: WordCard cache hit/miss semantics.
 *
 * Mocks the AI module and the Prisma client; verifies the handler:
 *   1. On miss, calls the AI module and persists an entry WITHOUT the user's
 *      sentence anywhere in the row.
 *   2. On hit, serves the cached JSON and does NOT call the AI module.
 *   3. Lemma normalisation is case- and whitespace-insensitive.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const prismaMock = {
  wordCardCache: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
};
const aiCardMock = vi.fn();

vi.mock("@/server/db", () => ({ prisma: prismaMock }));
vi.mock("@/lib/ai", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@/server/ai/types");
  return {
    ...actual,
    wordCard: aiCardMock,
    RateLimitError: actual.RateLimitError,
    SafetyFilterError: actual.SafetyFilterError,
  };
});
vi.mock("@/server/middleware/idempotency", () => ({
  // Pass-through: the test calls the inner handler directly with a fixed userId.
  withIdempotency: (handler: unknown) => handler,
}));

async function callPost(body: Record<string, unknown>): Promise<Response> {
  const mod = await import("../../app/api/watch/wordCard/route");
  const req = new Request("http://localhost/api/watch/wordCard", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  // Our mocked withIdempotency returns the raw AuthedHandler, which takes a
  // second arg {userId, clientRequestId}.
  type AuthedHandler = (
    req: Request,
    ctx: { userId: string; clientRequestId: string | null },
  ) => Promise<Response>;
  const handler = mod.POST as unknown as AuthedHandler;
  return handler(req, { userId: "u_test", clientRequestId: null });
}

describe("POST /api/watch/wordCard — cache", () => {
  beforeEach(() => {
    prismaMock.wordCardCache.findUnique.mockReset();
    prismaMock.wordCardCache.upsert.mockReset();
    aiCardMock.mockReset();
  });

  afterEach(() => vi.clearAllMocks());

  it("miss → calls AI, persists cache without the sentence anywhere", async () => {
    prismaMock.wordCardCache.findUnique.mockResolvedValue(null);
    prismaMock.wordCardCache.upsert.mockResolvedValue({});
    aiCardMock.mockResolvedValue({
      lemma: "carry out",
      pos: "phrasal verb",
      cefr: "B1",
      shortMeaning: "to do or complete something",
      senses: [],
      isPhrase: true,
      cultureNote: null,
    });

    const res = await callPost({
      wordOrPhrase: "Carry Out",
      sentence: "Carry out the plan tonight.",
      sourceLang: "en",
      nativeLang: "hi",
      level: "B1",
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.lemma).toBe("carry out");
    expect(json._cache).toBe("miss");

    // AI called with the sentence (as Confidential — the sentence is NOT the key).
    expect(aiCardMock).toHaveBeenCalledTimes(1);
    const call = aiCardMock.mock.calls[0]![0] as Record<string, unknown>;
    expect(call.wordOrPhrase).toBe("Carry Out");

    // Cache row uses the NORMALISED lemma + lang pair, and the sentence is
    // NOT in the stored payload (we check both keys and payload).
    expect(prismaMock.wordCardCache.upsert).toHaveBeenCalledTimes(1);
    const upsertArgs = prismaMock.wordCardCache.upsert.mock.calls[0]![0];
    expect(upsertArgs.where.lemma_srcLang_tgtLang).toEqual({
      lemma: "carry out",
      srcLang: "en",
      tgtLang: "hi",
    });
    const persistedJson = upsertArgs.create.cardJson;
    expect(persistedJson).not.toMatch(/plan tonight/i);
    const persisted = JSON.parse(persistedJson);
    expect(persisted).toEqual(
      expect.objectContaining({ lemma: "carry out", pos: "phrasal verb" }),
    );
    // The cache row has no `sentence` key.
    expect(upsertArgs.create.sentence).toBeUndefined();
  });

  it("hit → serves cached JSON, does NOT call AI", async () => {
    prismaMock.wordCardCache.findUnique.mockResolvedValue({
      cardJson: JSON.stringify({
        lemma: "carry out",
        pos: "phrasal verb",
        cefr: "B1",
        shortMeaning: "to do or complete something",
        senses: [],
        isPhrase: true,
        cultureNote: null,
      }),
      freshness: new Date(), // fresh
    });

    const res = await callPost({
      wordOrPhrase: "carry out",
      sentence: "A completely different sentence.",
      sourceLang: "en",
      nativeLang: "hi",
      level: "B1",
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json._cache).toBe("hit");
    expect(aiCardMock).not.toHaveBeenCalled();
  });

  it("stale (>90d) → re-generates", async () => {
    const stale = new Date(Date.now() - 100 * 24 * 60 * 60 * 1000);
    prismaMock.wordCardCache.findUnique.mockResolvedValue({
      cardJson: JSON.stringify({ lemma: "old", pos: "noun" }),
      freshness: stale,
    });
    aiCardMock.mockResolvedValue({
      lemma: "old",
      pos: "noun",
      cefr: "A1",
      shortMeaning: "ancient",
      senses: [],
      isPhrase: false,
      cultureNote: null,
    });
    prismaMock.wordCardCache.upsert.mockResolvedValue({});

    const res = await callPost({
      wordOrPhrase: "old",
      sentence: "Same old, same old.",
      sourceLang: "en",
      nativeLang: "hi",
      level: "A1",
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json._cache).toBe("miss");
    expect(aiCardMock).toHaveBeenCalledTimes(1);
  });
});
