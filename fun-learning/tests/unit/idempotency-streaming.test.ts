/**
 * Streaming idempotency — regression coverage for Wave 3 BLOCKER-1.
 *
 * Covers:
 *   (a) a streaming response finalizes the pending row with a 202 sentinel
 *       and returns the stream UNDRAINED (first bytes reach the client as
 *       the model emits them, not after end-of-stream);
 *   (b) a handler that throws cleans up the PENDING claim so a retry can
 *       recover;
 *   (c) a replay against an in-progress stream returns 409 IN_PROGRESS with
 *       a Retry-After header rather than re-running the handler.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

async function makeUser() {
  const now = Date.now();
  return prisma.user.create({
    data: {
      email: `idem-stream-${now}-${Math.random()}@test.local`,
      name: "Idempotency streaming test",
      nativeLang: "en",
      activeLearningLang: "en",
    },
  });
}

async function cleanupUser(userId: string) {
  await prisma.idempotencyRecord
    .deleteMany({ where: { userId } })
    .catch(() => {});
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
}

function keyFor(label: string): string {
  return `test-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

describe("idempotency — streaming + error paths", () => {
  let userId: string;

  beforeAll(async () => {
    const user = await makeUser();
    userId = user.id;
  });

  afterAll(async () => {
    await cleanupUser(userId);
  });

  beforeEach(async () => {
    await prisma.idempotencyRecord.deleteMany({ where: { userId } });
  });

  it("(a) streaming response finalizes a 202 sentinel and does not drain the body", async () => {
    const key = keyFor("stream-sentinel");

    let bodyProduced = false;
    const handler = withIdempotency(
      async () => {
        const stream = new ReadableStream({
          start(controller) {
            // If the middleware drained the body, this would fire SYNCHRONOUSLY
            // under `await cloned.text()`. We assert it stays false during
            // middleware finalization.
            setTimeout(() => {
              controller.enqueue(new TextEncoder().encode('{"ok":true}\n'));
              bodyProduced = true;
              controller.close();
            }, 50);
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { "content-type": "application/x-ndjson" },
        });
      },
      { getUserId: async () => userId },
    );

    const req = new Request("http://local.test/api/stream", {
      method: "POST",
      headers: { "idempotency-key": key, "content-type": "application/json" },
      body: JSON.stringify({}),
    });

    const res = await handler(req);
    // The middleware must NOT wait for the body — the response comes back
    // before the stream has emitted anything.
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/x-ndjson");
    expect(bodyProduced).toBe(false);

    // The idempotency row should now carry the streaming sentinel.
    const row = await prisma.idempotencyRecord.findUnique({
      where: {
        userId_clientRequestId: { userId, clientRequestId: key },
      },
    });
    expect(row).toBeTruthy();
    expect(row!.statusCode).toBe(202);
    const sentinel = JSON.parse(row!.response);
    expect(sentinel.streaming).toBe(true);
    expect(typeof sentinel.startedAt).toBe("string");

    // Drain to let the stream finish and confirm the body is what we wrote.
    const text = await res.text();
    expect(text).toContain('"ok":true');
    expect(bodyProduced).toBe(true);
  });

  it("(b) handler that throws deletes the PENDING claim so a retry can recover", async () => {
    const key = keyFor("throws");

    let callCount = 0;
    const handler = withIdempotency(
      async () => {
        callCount += 1;
        if (callCount === 1) {
          throw new Error("boom");
        }
        return Response.json({ ok: true, callCount });
      },
      { getUserId: async () => userId },
    );

    const makeReq = () =>
      new Request("http://local.test/api/throws", {
        method: "POST",
        headers: { "idempotency-key": key, "content-type": "application/json" },
        body: JSON.stringify({}),
      });

    // 1st call throws — the middleware rethrows after cleaning the claim.
    await expect(handler(makeReq())).rejects.toThrow("boom");

    const after = await prisma.idempotencyRecord.findUnique({
      where: {
        userId_clientRequestId: { userId, clientRequestId: key },
      },
    });
    expect(after).toBeNull();

    // 2nd call with the same key succeeds (no sticky PENDING row shadowed it).
    const res = await handler(makeReq());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, callCount: 2 });
  });

  it("(c) a second request against a streaming sentinel gets 409 IN_PROGRESS", async () => {
    const key = keyFor("in-progress");

    // Seed a sentinel row directly.
    await prisma.idempotencyRecord.create({
      data: {
        userId,
        clientRequestId: key,
        method: "POST",
        path: "/api/stream-collision",
        statusCode: 202,
        response: JSON.stringify({ streaming: true, startedAt: new Date().toISOString() }),
      },
    });

    let handlerRan = false;
    const handler = withIdempotency(
      async () => {
        handlerRan = true;
        return Response.json({ ok: true });
      },
      { getUserId: async () => userId },
    );

    const req = new Request("http://local.test/api/stream-collision", {
      method: "POST",
      headers: { "idempotency-key": key, "content-type": "application/json" },
      body: JSON.stringify({}),
    });

    const res = await handler(req);
    expect(res.status).toBe(409);
    expect(res.headers.get("retry-after")).toBeTruthy();
    const body = await res.json();
    expect(body).toEqual({ error: "IN_PROGRESS", retryAfter: 5 });
    expect(handlerRan).toBe(false);
  });

  it("(d) a non-streaming JSON response is still cached + replayed", async () => {
    const key = keyFor("json-replay");

    let calls = 0;
    const handler = withIdempotency(
      async () => {
        calls += 1;
        return Response.json({ ok: true, calls });
      },
      { getUserId: async () => userId },
    );

    const makeReq = () =>
      new Request("http://local.test/api/json", {
        method: "POST",
        headers: { "idempotency-key": key, "content-type": "application/json" },
        body: JSON.stringify({}),
      });

    const first = await handler(makeReq());
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ ok: true, calls: 1 });

    const second = await handler(makeReq());
    expect(second.status).toBe(200);
    expect(second.headers.get("x-idempotent-replay")).toBe("1");
    expect(await second.json()).toEqual({ ok: true, calls: 1 });
    expect(calls).toBe(1);
  });
});
