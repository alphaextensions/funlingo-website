// POST /api/ai/correctTurn — JSON CorrectTurnOutput
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { correctTurn } from "@/lib/ai";

const schema = z.object({
  utterance: z.string().min(1).max(2_000),
  context: z.string().max(500),
  learningLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
});

export const POST = jsonAiRoute({ schema, call: correctTurn });
