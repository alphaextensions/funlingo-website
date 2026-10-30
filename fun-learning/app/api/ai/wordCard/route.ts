// POST /api/ai/wordCard — JSON WordCard
import { markConfidential } from "@/server/types/confidential";
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { wordCard } from "@/lib/ai";

const schema = z.object({
  wordOrPhrase: z.string().min(1).max(200),
  sentence: z.string().min(1).max(2_000),
  sourceLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
});

export const POST = jsonAiRoute({
  schema,
  call: ({ wordOrPhrase, sentence, sourceLang, nativeLang, level, userId, ipHash }) =>
    wordCard({
      wordOrPhrase,
      sentence: markConfidential(sentence),
      sourceLang,
      nativeLang,
      level,
      userId,
      ipHash,
    }),
});
