// POST /api/talk/sessions/[sessionId]/end — finalize a Talk session and
// generate the end-of-session report via `summarize`.
//
// SPEC §7.4: Duration, turns, tasks, corrections list, pronunciation summary,
// three phrases to practise.

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { summarize, RateLimitError, SafetyFilterError } from "@/lib/ai";
import { markConfidential } from "@/server/types/confidential";
import { findLessonById } from "@/lib/talk/topics";
import { logger } from "@/server/logging/scrubber";

const schema = z.object({
  nativeLang: z.string().min(2).max(10),
});

export const POST = withIdempotency(async (req, { userId }) => {
  const sessionId = extractSessionId(req);
  if (!sessionId) return Response.json({ error: "BAD_PATH" }, { status: 400 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
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
    include: { turns: { orderBy: { at: "asc" } } },
  });
  if (!session || session.userId !== userId) {
    return Response.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  if (session.endedAt) {
    // Idempotent at the business level — just return the existing report.
    return Response.json({
      sessionId,
      report: session.report ? JSON.parse(session.report) : null,
      alreadyEnded: true,
    });
  }

  const lessonMatch = session.lessonId ? findLessonById(session.lessonId) : null;
  const lesson = lessonMatch?.lesson ?? null;

  // Build the structured side of the report locally — it's cheap and doesn't
  // need the AI.
  const userTurns = session.turns.filter((t) => t.role === "user");
  const corrections = userTurns
    .map((t) => (t.correction ? safeJson(t.correction) : null))
    .filter((c): c is NonNullable<typeof c> => c !== null && (c as { isPerfect?: boolean }).isPerfect !== true);
  const durationMs = Math.max(
    0,
    (session.turns.at(-1)?.at.getTime() ?? session.startedAt.getTime()) - session.startedAt.getTime(),
  );
  const helpUses = userTurns.filter((t) => t.helpLevel > 0).map((t) => t.helpLevel);

  // Call summarize on the AI side of the transcript to recap.
  let summary = "";
  let keyPoints: { text: string; timestampSec?: number }[] = [];
  if (session.turns.length > 1) {
    try {
      const lines = session.turns.map((t) => ({
        text: `${t.role.toUpperCase()}: ${t.text}`,
      }));
      const out = await summarize({
        lines: markConfidential(lines),
        sourceLang: session.lang,
        nativeLang: parsed.data.nativeLang,
        userId,
      });
      summary = out.summary;
      keyPoints = out.keyPoints;
    } catch (err) {
      if (!(err instanceof RateLimitError || err instanceof SafetyFilterError)) {
        logger.warn({ err: String(err) }, "summarize failed in /end");
      }
      summary = ""; // non-fatal
    }
  }

  const report = {
    duration_ms: durationMs,
    turns: session.turns.length,
    user_turns: userTurns.length,
    corrections,
    help_level_uses: helpUses,
    tasks: lesson?.tasks ?? [],
    summary,
    keyPoints,
    practise: suggestPractise(corrections),
  };

  await prisma.talkSession.update({
    where: { id: sessionId },
    data: { endedAt: new Date(), report: JSON.stringify(report) },
  });

  return Response.json({ sessionId, report });
});

function extractSessionId(req: Request): string | null {
  const path = new URL(req.url).pathname.split("/").filter(Boolean);
  // ["api", "talk", "sessions", "<id>", "end"]
  if (path.length < 5) return null;
  return path[3];
}

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/** Pick up to 3 corrected phrases the user can add to Sentences later. */
function suggestPractise(corrections: unknown[]): string[] {
  const out: string[] = [];
  for (const c of corrections) {
    if (out.length >= 3) break;
    const o = c as { corrected?: unknown };
    if (typeof o?.corrected === "string" && o.corrected.trim()) {
      out.push(o.corrected.trim());
    }
  }
  return out;
}
