/**
 * Idempotency middleware for route handlers.
 *
 * Rule from AGENT-PLAYBOOK (Engineering non-negotiables §1):
 * "Idempotency keys on every write POST. Save-word, save-sentence,
 * grade-review, talk-turn. IdempotencyRecord(key, userId, response, createdAt)
 * table + UNIQUE on (userId, clientRequestId)."
 *
 * Usage:
 *
 *   export const POST = withIdempotency(async (req, { userId }) => {
 *     // ...do the write...
 *     return Response.json({ ok: true });
 *   });
 *
 * How it works
 * ------------
 * On a first request we INSERT a PENDING row (statusCode === 0) BEFORE running
 * the handler. This claim races the DB's unique index on
 * (userId, clientRequestId): the winner runs the handler, losers either
 * replay the stored finished row or get a 409 IN_PROGRESS back.
 *
 * Finalization
 * ------------
 * For a *JSON* response (<= 64KB, status < 500), we store the body + status so
 * replay returns the same bytes. For a *streaming* response
 * (application/x-ndjson, text/event-stream, application/octet-stream), we
 * cannot wait for the body — the whole point is first-byte latency. Instead
 * we finalize the pending row IMMEDIATELY with a short JSON sentinel body
 * (`{"streaming":true,"startedAt":"<iso>"}`) at status 202, then return the
 * stream UNDRAINED. A later retry with the same key sees the sentinel and
 * returns 409 `{"error":"IN_PROGRESS","retryAfter":5}` — streams are not
 * replayed.
 *
 * Error paths
 * -----------
 * - Handler throws → we delete the pending claim (so a client-driven retry
 *   can run again) and rethrow for Next.js's error boundary.
 * - Transient 5xx → not persisted; the pending claim is dropped so a retry
 *   can recover (sticky-failure trap avoided).
 * - Lost the claim race → poll for the winner's finished row briefly; if the
 *   row is a streaming sentinel or we time out, return
 *   409 IN_PROGRESS + Retry-After (never re-run the handler without a claim).
 */

import { prisma } from "@/server/db";
import { logger } from "@/server/logging/scrubber";

export type AuthedHandler = (
  req: Request,
  ctx: { userId: string; clientRequestId: string | null },
) => Promise<Response>;

export interface IdempotencyOptions {
  /** Required when there's no session (e.g. machine-to-machine). Prefer auth. */
  getUserId?: (req: Request) => Promise<string | null>;
  /** How long to keep records. Defaults to 24h. */
  ttlMs?: number;
}

const HEADER = "idempotency-key";
const PENDING_STATUS = 0;
const STREAM_SENTINEL_STATUS = 202;
const STREAM_CONTENT_TYPES = [
  "application/x-ndjson",
  "text/event-stream",
  "application/octet-stream",
];
const MAX_BODY = 64 * 1024;
const DEFAULT_RETRY_AFTER_SEC = 5;

function isStreamingResponse(res: Response): boolean {
  const ct = (res.headers.get("content-type") ?? "").toLowerCase();
  return STREAM_CONTENT_TYPES.some((prefix) => ct.includes(prefix));
}

function conflictInProgress(retryAfterSec = DEFAULT_RETRY_AFTER_SEC): Response {
  return Response.json(
    { error: "IN_PROGRESS", retryAfter: retryAfterSec },
    {
      status: 409,
      headers: { "Retry-After": String(retryAfterSec) },
    },
  );
}

export function withIdempotency(handler: AuthedHandler, opts: IdempotencyOptions = {}) {
  return async function wrappedHandler(req: Request): Promise<Response> {
    const clientRequestId = req.headers.get(HEADER);

    // Resolve user. Default: Auth.js session via `auth()`.
    const userId = opts.getUserId
      ? await opts.getUserId(req)
      : await defaultGetUserId(req);

    if (!userId) {
      return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });
    }

    // Writes WITHOUT an Idempotency-Key still run — the middleware only
    // deduplicates when the client opts in. This matches Stripe's semantics
    // and keeps dev simple.
    if (!clientRequestId) {
      return handler(req, { userId, clientRequestId: null });
    }

    const ttlMs = opts.ttlMs ?? 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - ttlMs);

    type ExistingRow = Awaited<ReturnType<typeof prisma.idempotencyRecord.findUnique>>;

    // Claim-first race fix (Code QA HIGH #2): INSERT a PENDING row BEFORE
    // running the handler. Concurrent duplicates lose the UNIQUE insert and
    // either replay a finished row or get 409 IN_PROGRESS. Also enforces TTL
    // (Code QA HIGH #5) by dropping stale rows and retrying the claim once.
    const tryClaim = async (): Promise<"claimed" | { replay: ExistingRow }> => {
      try {
        await prisma.idempotencyRecord.create({
          data: {
            userId,
            clientRequestId,
            method: req.method,
            path: new URL(req.url).pathname,
            statusCode: PENDING_STATUS,
            response: "",
          },
        });
        return "claimed";
      } catch {
        const row = await prisma.idempotencyRecord.findUnique({
          where: { userId_clientRequestId: { userId, clientRequestId } },
        });
        return { replay: row };
      }
    };

    let claim = await tryClaim();
    if (claim !== "claimed" && claim.replay && claim.replay.createdAt <= cutoff) {
      // Stale row — drop it and re-attempt the claim.
      await prisma.idempotencyRecord
        .delete({ where: { userId_clientRequestId: { userId, clientRequestId } } })
        .catch(() => {});
      claim = await tryClaim();
    }

    if (claim !== "claimed") {
      const race = claim.replay;

      // If the row is already finalized with a replayable response, replay it.
      if (
        race &&
        race.statusCode !== PENDING_STATUS &&
        race.statusCode !== STREAM_SENTINEL_STATUS &&
        race.createdAt > cutoff
      ) {
        logger.debug({ userId, clientRequestId }, "idempotency hit — replaying");
        return new Response(race.response, {
          status: race.statusCode,
          headers: {
            "content-type": "application/json",
            "x-idempotent-replay": "1",
          },
        });
      }

      // Streaming sentinel → never replay a stream.
      if (race && race.statusCode === STREAM_SENTINEL_STATUS) {
        return conflictInProgress();
      }

      // Still pending — poll briefly for the winner's result (JSON responses
      // only). Streaming jobs would never finalize into a replayable body, so
      // we fall through to the 409.
      if (race && race.statusCode === PENDING_STATUS) {
        for (let attempt = 0; attempt < 10; attempt += 1) {
          await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
          const next = await prisma.idempotencyRecord.findUnique({
            where: { userId_clientRequestId: { userId, clientRequestId } },
          });
          if (!next) break; // winner failed and dropped its claim
          if (
            next.statusCode !== PENDING_STATUS &&
            next.statusCode !== STREAM_SENTINEL_STATUS
          ) {
            return new Response(next.response, {
              status: next.statusCode,
              headers: {
                "content-type": "application/json",
                "x-idempotent-replay": "1",
              },
            });
          }
          if (next.statusCode === STREAM_SENTINEL_STATUS) {
            return conflictInProgress();
          }
        }
      }

      // Winner dropped its claim (transient failure) OR we're still pending
      // past the poll window. Never silently re-run the handler without our
      // own claim — the caller should retry with the same key.
      return conflictInProgress();
    }

    // Run the handler, catching throws so we don't leave a sticky PENDING
    // row for the 24h TTL.
    let res: Response;
    try {
      res = await handler(req, { userId, clientRequestId });
    } catch (err) {
      await prisma.idempotencyRecord
        .delete({ where: { userId_clientRequestId: { userId, clientRequestId } } })
        .catch(() => {});
      throw err;
    }

    // Streaming responses: finalize the pending row immediately with a
    // sentinel so retries 409 instead of waiting on us; return the stream
    // UNDRAINED so the client sees first bytes as the model emits them.
    if (isStreamingResponse(res)) {
      const sentinel = JSON.stringify({
        streaming: true,
        startedAt: new Date().toISOString(),
      });
      try {
        await prisma.idempotencyRecord.update({
          where: { userId_clientRequestId: { userId, clientRequestId } },
          data: { statusCode: STREAM_SENTINEL_STATUS, response: sentinel },
        });
      } catch (updateErr) {
        logger.warn(
          { err: String(updateErr) },
          "idempotency: failed to write streaming sentinel",
        );
      }
      return res;
    }

    // JSON (or any non-streaming) response: drain, cap, store.
    const cloned = res.clone();
    const contentType = res.headers.get("content-type") ?? "";
    const text = await cloned.text();

    // Code QA HIGH #3: don't persist transient 5xx failures (sticky-failure
    // trap). Also only persist JSON responses and cap body size at 64KB.
    const shouldPersist =
      res.status < 500 &&
      contentType.includes("application/json") &&
      text.length <= MAX_BODY;

    if (shouldPersist) {
      try {
        await prisma.idempotencyRecord.update({
          where: { userId_clientRequestId: { userId, clientRequestId } },
          data: { statusCode: res.status, response: text },
        });
      } catch (err) {
        logger.warn({ err: String(err) }, "idempotency: failed to finalize record");
      }
    } else {
      // Remove the pending claim so retries can recover.
      await prisma.idempotencyRecord
        .delete({ where: { userId_clientRequestId: { userId, clientRequestId } } })
        .catch(() => {});
    }

    return res;
  };
}

async function defaultGetUserId(_req: Request): Promise<string | null> {
  // Lazy-import so route-handler files that use withIdempotency don't pull in
  // next-auth's edge-runtime chain at module load.
  try {
    const { auth } = await import("@/server/auth");
    const session = await auth();
    return (session?.user as { id?: string } | undefined)?.id ?? null;
  } catch {
    return null;
  }
}
