// POST /api/ai/culture — JSON CultureNote[]
import { markConfidential } from "@/server/types/confidential";
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { culture } from "@/lib/ai";

const schema = z.object({
  sourceMeta: z.object({
    kind: z.enum(["youtube", "pack", "podcast", "book"]),
    title: z.string().min(1).max(300),
    lang: z.string().min(2).max(10),
  }),
  lines: z
    .array(
      z.object({
        index: z.number().int().nonnegative(),
        text: z.string().min(1).max(2_000),
        timestampSec: z.number().optional(),
      }),
    )
    .min(1)
    .max(200),
  nativeLang: z.string().min(2).max(10),
});

export const POST = jsonAiRoute({
  schema,
  call: ({ sourceMeta, lines, nativeLang, userId, ipHash }) =>
    culture({
      sourceMeta,
      lines: markConfidential(lines),
      nativeLang,
      userId,
      ipHash,
    }),
});
