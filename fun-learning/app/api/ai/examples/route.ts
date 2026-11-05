// POST /api/ai/examples — JSON ExamplesOutput
import { jsonAiRoute, z } from "@/server/ai/route-helpers";
import { examples } from "@/lib/ai";

const schema = z.object({
  lemma: z.string().min(1).max(200),
  learningLang: z.string().min(2).max(10),
  nativeLang: z.string().min(2).max(10),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
});

export const POST = jsonAiRoute({ schema, call: examples });
