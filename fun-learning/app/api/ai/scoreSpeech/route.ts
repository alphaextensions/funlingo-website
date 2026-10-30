// POST /api/ai/scoreSpeech — JSON SpeechScore
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { scoreSpeech } from "@/lib/ai";

const schema = z.object({
  audioBase64: z.string().min(1).max(5_000_000),
  referenceText: z.string().min(1).max(2_000),
  lang: z.string().min(2).max(10),
});

export const POST = jsonAiRoute({ schema, call: scoreSpeech });
