// POST /api/ai/talkTurn — streaming NDJSON (single TalkTurnReply at the end)
import { streamAiRoute, z } from "@/server/ai/route-helpers";
import { talkTurn } from "@/lib/ai";

const schema = z.object({
  lessonScene: z.string().min(1).max(1_000),
  aiRole: z.string().min(1).max(100),
  userRole: z.string().min(1).max(100),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  history: z
    .array(
      z.object({
        role: z.enum(["ai", "user"]),
        text: z.string().min(1).max(2_000),
      }),
    )
    .max(80),
  learningLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
});

export const POST = streamAiRoute({ schema, call: talkTurn });
