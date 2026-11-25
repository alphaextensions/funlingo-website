// POST /api/ai/summarize — JSON SummaryOutput
import { markConfidential } from "@/server/types/confidential";
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { summarize } from "@/lib/ai";

const schema = z.object({
  lines: z
    .array(
      z.object({
        text: z.string().min(1).max(2_000),
        timestampSec: z.number().optional(),
      }),
    )
    .min(1)
    .max(500),
  sourceLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
});

export const POST = jsonAiRoute({
  schema,
  call: ({ lines, sourceLang, nativeLang, userId, ipHash }) =>
    summarize({
      lines: markConfidential(lines),
      sourceLang,
      nativeLang,
      userId,
      ipHash,
    }),
});
