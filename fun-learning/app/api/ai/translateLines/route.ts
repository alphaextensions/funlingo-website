// POST /api/ai/translateLines — streaming NDJSON of TranslatedLine
import { markConfidential } from "@/server/types/confidential";
import { streamAiRoute, z } from "@/server/ai/route-helpers";
import { translateLines } from "@/lib/ai";

const schema = z.object({
  lines: z.array(z.string()).min(1).max(500),
  sourceLang: z.string().min(2).max(10),
  targetLang: z.string().min(2).max(10),
  style: z.enum(["natural", "literal"]).optional(),
});

export const POST = streamAiRoute({
  schema,
  call: ({ lines, sourceLang, targetLang, style, userId, ipHash }) =>
    translateLines({
      lines: markConfidential(lines),
      sourceLang,
      targetLang,
      style,
      userId,
      ipHash,
    }),
});
