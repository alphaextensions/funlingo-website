/**
 * Shared helpers for `app/api/ai/*` route handlers.
 *
 *   - `jsonAiRoute`  — JSON input, JSON response. Wraps `withIdempotency`,
 *                      Zod-validates the body, forwards to the public AI
 *                      caller, maps RateLimitError / SafetyFilterError to
 *                      proper HTTP statuses.
 *   - `streamAiRoute` — JSON input, NDJSON streaming response. Same error
 *                       mapping; first line of the body may carry the error
 *                       JSON when the pre-call limit check fails.
 */

import { z } from "zod";
import type { ZodType } from "zod";
import { withIdempotency } from "@/server/middleware/idempotency";
import { logger } from "@/server/logging/scrubber";
import { RateLimitError, SafetyFilterError } from "./types";

function errorBody(err: unknown): { status: number; body: Record<string, unknown> } {
  if (err instanceof RateLimitError) {
    return {
      status: 429,
      body: {
        error: "RATE_LIMITED",
        scope: err.scope,
        kind: err.kind,
        retryAfterSec: err.retryAfterSec,
        message: err.message,
      },
    };
  }
  if (err instanceof SafetyFilterError) {
    return {
      status: 422,
      body: {
        error: "SAFETY_BLOCKED",
        violated: err.violated,
        message: "That response was blocked by the content filter.",
      },
    };
  }
  logger.error({ err: String(err) }, "AI route unhandled error");
  return { status: 500, body: { error: "AI_UPSTREAM_FAILED" } };
}

export function jsonAiRoute<TInput, TOutput>(args: {
  schema: ZodType<TInput>;
  call: (input: TInput & { userId: string; ipHash?: string }) => Promise<TOutput>;
}) {
  return withIdempotency(async (req, { userId }) => {
    const ipHash = hashIp(req);
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "BAD_JSON" }, { status: 400 });
    }
    const parsed = args.schema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "VALIDATION_FAILED", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    try {
      const out = await args.call({ ...parsed.data, userId, ipHash });
      return Response.json(out);
    } catch (err) {
      const { status, body: eb } = errorBody(err);
      return Response.json(eb, { status });
    }
  });
}

export function streamAiRoute<TInput, TChunk>(args: {
  schema: ZodType<TInput>;
  call: (input: TInput & { userId: string; ipHash?: string }) => AsyncIterable<TChunk>;
}) {
  return withIdempotency(async (req, { userId }) => {
    const ipHash = hashIp(req);
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "BAD_JSON" }, { status: 400 });
    }
    const parsed = args.schema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "VALIDATION_FAILED", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const iter = args.call({ ...parsed.data, userId, ipHash });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of iter) {
            controller.enqueue(encoder.encode(JSON.stringify(chunk) + "\n"));
          }
          controller.close();
        } catch (err) {
          const { body: eb } = errorBody(err);
          controller.enqueue(
            encoder.encode(JSON.stringify({ error: true, ...eb }) + "\n"),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "content-type": "application/x-ndjson",
        "cache-control": "no-store",
      },
    });
  });
}

function hashIp(req: Request): string {
  // Lightweight, non-cryptographic hash of the x-forwarded-for IP + a per-process
  // salt. Enough for rate-limit bucketing; never persisted outside AiCallCounter.
  const raw = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
  const salt = process.env.AI_IP_SALT ?? "fun-learning-local";
  let h = 2166136261;
  const s = raw + "|" + salt;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h.toString(16);
}

export { z };
