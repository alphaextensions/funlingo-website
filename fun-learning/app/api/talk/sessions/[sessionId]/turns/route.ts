// POST /api/talk/sessions/[sessionId]/turns — record a user turn + fetch the
// AI reply.
//
// Flow:
//   1. Validate the session belongs to this user.
//   2. Insert the user TalkTurn (text + optional helpLevel used + optional
//      speechScore if the user used voice input).
//   3. Call `correctTurn` on the user's utterance (unless they skipped it) and
//      save the correction JSON on the user TalkTurn.
//   4. Stream the AI's reply via `talkTurn` back to the client as NDJSON.
//   5. Persist the final AI TalkTurn once the stream resolves.
//
// Idempotency: wrapped; replays return the cached NDJSON body so a flaky
// client doesn't double-charge the AI budget or double-insert a turn.

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { talkTurn, correctTurn, RateLimitError, SafetyFilterError } from "@/lib/ai";
import type { CorrectTurnOutput, TalkTurnReply } from "@/lib/ai";
import { findLessonById } from "@/lib/talk/topics";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  utterance: z.string().min(1).max(2_000),
  // 0..3 — see src/lib/talk/helpLadder.ts
  helpLevel: z.number().int().min(0).max(3).default(0),
  nativeLang: z.string().min(2).max(10),
  // Optional speech-recognition score from the client (when the mic was used).
  speechScore: z
    .object({
      overall: z.number(),
      words: z.array(z.object({ word: z.string(), score: z.number() })),
      tips: z.array(z.string()),
    })
    .optional(),
  // Skip the correction call when `correctionsOff` is true — SPEC §7.3 setting.
  correctionsOff: z.boolean().default(false),
});

export const POST = withIdempotency(async (req, { userId, clientRequestId }) => {
  const sessionId = extractSessionId(req);
  if (!sessionId) {
    return Response.json({ error: "BAD_PATH" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const session = await prisma.talkSession.findUnique({
    where: { id: sessionId },
    include: { turns: { orderBy: { at: "asc" }, take: 40 } },
  });
  if (!session || session.userId !== userId) {
    return Response.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  if (session.endedAt) {
    return Response.json({ error: "SESSION_ENDED" }, { status: 409 });
  }

  const lessonMatch = session.lessonId ? findLessonById(session.lessonId) : null;
  if (!lessonMatch) {
    return Response.json({ error: "LESSON_UNAVAILABLE" }, { status: 410 });
  }
  const { lesson } = lessonMatch;

  // 1) Persist the user turn immediately so it's attributed even if the AI
  //    call errors mid-stream.
  const userTurn = await prisma.talkTurn.create({
    data: {
      sessionId,
      lessonId: lesson.id,
      role: "user",
      text: parsed.data.utterance,
      helpLevel: parsed.data.helpLevel,
      speechScore: parsed.data.speechScore
        ? JSON.stringify(parsed.data.speechScore)
        : null,
    },
  });

  // 2) Correction. Non-fatal — if the AI module throws we still try to stream
  //    an AI reply.
  let correction: CorrectTurnOutput | null = null;
  if (!parsed.data.correctionsOff) {
    try {
      correction = await correctTurn({
        utterance: parsed.data.utterance,
        context: `Role-play in ${lesson.title}. Scene: ${lesson.scene}`,
        learningLang: session.lang,
        nativeLang: parsed.data.nativeLang,
        userId,
      });
      await prisma.talkTurn.update({
        where: { id: userTurn.id },
        data: { correction: JSON.stringify(correction) },
      });
    } catch (err) {
      if (err instanceof RateLimitError || err instanceof SafetyFilterError) {
        // Just skip correction — the main AI reply is more important.
        logger.warn({ err: String(err) }, "correctTurn skipped");
      } else {
        logger.warn({ err: String(err) }, "correctTurn errored");
      }
    }
  }

  // 3) Stream the AI reply.
  const history = [
    ...session.turns.map((t) => ({ role: t.role as "ai" | "user", text: t.text })),
    { role: "user" as const, text: parsed.data.utterance },
  ];

  const iter = talkTurn({
    lessonScene: lesson.scene,
    aiRole: lesson.aiRole,
    userRole: lesson.userRole,
    difficulty: (session.difficulty as "beginner" | "intermediate" | "advanced") ?? "intermediate",
    history,
    learningLang: session.lang,
    nativeLang: parsed.data.nativeLang,
    userId,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      // First line: the correction (or null).
      controller.enqueue(
        encoder.encode(
          JSON.stringify({
            kind: "correction",
            correction: correction ?? null,
            userTurnId: userTurn.id,
            clientRequestId,
          }) + "\n",
        ),
      );

      let last: TalkTurnReply | null = null;
      try {
        for await (const chunk of iter) {
          last = chunk;
          controller.enqueue(
            encoder.encode(JSON.stringify({ kind: "reply", reply: chunk }) + "\n"),
          );
        }
        if (last) {
          const aiTurn = await prisma.talkTurn.create({
            data: {
              sessionId,
              lessonId: lesson.id,
              role: "ai",
              text: last.text,
              translation: last.translation,
            },
          });
          controller.enqueue(
            encoder.encode(JSON.stringify({ kind: "done", aiTurnId: aiTurn.id }) + "\n"),
          );
        } else {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ kind: "done", aiTurnId: null, warning: "EMPTY_AI_REPLY" }) + "\n",
            ),
          );
        }
      } catch (err) {
        const status =
          err instanceof RateLimitError ? 429 : err instanceof SafetyFilterError ? 422 : 500;
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              kind: "error",
              status,
              message: err instanceof Error ? err.message : "AI_UPSTREAM_FAILED",
            }) + "\n",
          ),
        );
      } finally {
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

function extractSessionId(req: Request): string | null {
  // Pathname: /api/talk/sessions/<sessionId>/turns
  const path = new URL(req.url).pathname.split("/").filter(Boolean);
  // ["api", "talk", "sessions", "<id>", "turns"]
  if (path.length < 5) return null;
  return path[3];
}
