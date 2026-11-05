// POST /api/ai/sentenceAnalysis — JSON SentenceAnalysis
import { markConfidential } from "@/server/types/confidential";
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { sentenceAnalysis } from "@/lib/ai";

const schema = z.object({
  sentence: z.string().min(1).max(2_000),
  learningLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
});

export const POST = jsonAiRoute({
  schema,
  call: ({ sentence, learningLang, nativeLang, level, userId, ipHash }) =>
    sentenceAnalysis({
      sentence: markConfidential(sentence),
      learningLang,
      nativeLang,
      level,
      userId,
      ipHash,
    }),
});
