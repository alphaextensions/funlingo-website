// POST /api/talk/help — Help-ladder content generator.
//
// Called when the user taps "Help" in a Talk lesson. The ladder itself (which
// level to show) is a pure state machine in `src/lib/talk/helpLadder.ts`.
// This route produces the AI-side payload (a model suggestion + a short
// reason) that `helpContentFor` trims for levels 1 and 2 and shows verbatim
// for level 3.
//
// We lean on `correctTurn` with a special "there IS no original — invent one"
// framing: the AI returns a suggested utterance the user COULD say, plus a
// one-line reason. This stays within the pinned AI contract (no new prompt
// files per LEGAL privacy rules).

import { z } from "zod";
import { jsonAiRoute } from "@/server/ai/route-helpers";
import { correctTurn } from "@/lib/ai";
import { findLessonById } from "@/lib/talk/topics";
import { prisma } from "@/server/db";

const schema = z.object({
  sessionId: z.string().min(1).max(200),
  // The AI's last line, used as context.
  aiLastLine: z.string().min(1).max(2_000),
  nativeLang: z.string().min(2).max(10),
});

export const POST = jsonAiRoute({
  schema,
  call: async ({ sessionId, aiLastLine, nativeLang, userId, ipHash }) => {
    const session = await prisma.talkSession.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== userId) {
      // Shape the response to the AI route's error envelope.
      throw new HelpError("NOT_FOUND");
    }

    const lesson = session.lessonId ? findLessonById(session.lessonId) : null;
    if (!lesson) {
      throw new HelpError("LESSON_UNAVAILABLE");
    }

    // Build a one-line context the AI can use.
    const context = `Role-play scene: ${lesson.lesson.scene} The learner plays ${lesson.lesson.userRole}. The partner just said: "${aiLastLine}"`;

    // Trick: feed `correctTurn` a placeholder utterance; it will return a
    // natural reply the learner COULD say in `corrected` + a reason.
    const result = await correctTurn({
      utterance: "(the learner is stuck — suggest what they could say)",
      context,
      learningLang: session.lang,
      nativeLang,
      userId,
      ipHash,
    });

    return {
      suggestion: result.corrected,
      hint: shortHint(result.corrected),
      reason: result.reasonShort || "A natural way to keep the conversation going.",
    };
  },
});

class HelpError extends Error {
  readonly status = 404;
  constructor(message: string) {
    super(message);
    this.name = "HelpError";
  }
}

/** Build a short, non-giveaway hint from a full suggestion. */
function shortHint(suggestion: string): string {
  const words = suggestion.trim().split(/\s+/);
  if (words.length <= 3) return "Try a short, polite reply.";
  const topic = words.slice(0, 2).join(" ");
  return `Something starting with "${topic}" — keep it short and natural.`;
}
