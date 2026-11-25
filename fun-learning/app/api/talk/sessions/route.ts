// POST /api/talk/sessions — create a new Talk session for a lesson.
// GET  /api/talk/sessions?lessonId=…  — list the user's sessions for a lesson.
//
// Idempotency: POST is wrapped with withIdempotency so a client that retries
// on a flaky connection doesn't open two parallel sessions for the same lesson.

import { z } from "zod";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { auth } from "@/server/auth";
import { findLessonById, findLesson } from "@/lib/talk/topics";

const createSchema = z.object({
  lessonId: z.string().min(1).max(200),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
});

export const POST = withIdempotency(async (req, { userId }) => {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Validate the lesson id against the hard-coded catalog — SPEC §7.1. If the
  // id isn't recognised we refuse (don't open a session for a lesson that
  // doesn't exist, even if a crafted request supplies arbitrary strings).
  const match = findLessonById(parsed.data.lessonId);
  if (!match) {
    return Response.json({ error: "UNKNOWN_LESSON" }, { status: 404 });
  }

  // Scope by the user's active learning language. If the user hasn't picked
  // one yet, bail with a friendly code — AGENT-PLAYBOOK rule 4.
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const lang = user?.activeLearningLang ?? null;
  if (!lang) {
    return Response.json({ error: "NO_ACTIVE_LEARNING_LANG" }, { status: 400 });
  }

  const session = await prisma.talkSession.create({
    data: {
      userId,
      lessonId: match.lesson.id,
      lang,
      difficulty: parsed.data.difficulty,
    },
  });

  return Response.json({
    sessionId: session.id,
    lang: session.lang,
    difficulty: session.difficulty,
    topicSlug: match.topic.slug,
    lessonSlug: match.lesson.slug,
  });
});

export async function GET(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }
  const url = new URL(req.url);
  const topicSlug = url.searchParams.get("topicSlug");
  const lessonSlug = url.searchParams.get("lessonSlug");

  let lessonId: string | null = null;
  if (topicSlug && lessonSlug) {
    const m = findLesson(topicSlug, lessonSlug);
    if (!m) return Response.json({ sessions: [] });
    lessonId = m.lesson.id;
  }

  const rows = await prisma.talkSession.findMany({
    where: {
      userId,
      ...(lessonId ? { lessonId } : {}),
    },
    orderBy: { startedAt: "desc" },
    take: 20,
    select: {
      id: true,
      lessonId: true,
      lang: true,
      difficulty: true,
      startedAt: true,
      endedAt: true,
    },
  });
  return Response.json({ sessions: rows });
}
