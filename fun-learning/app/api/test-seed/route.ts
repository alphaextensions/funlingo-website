/**
 * Dev + test seeding endpoint. ONLY mounted when NODE_ENV !== "production".
 *
 * Lets Playwright create a fresh user + UserWord/Sentence rows without the
 * full Auth.js round-trip. Returns the userId the tests then pass via
 * `x-dev-user-id` / `?dev_user=`.
 *
 * In production this returns 404.
 */

import { prisma } from "@/server/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  label: z.string().min(1).max(64),
  words: z
    .array(
      z.object({
        lemma: z.string().min(1).max(128),
        lang: z.string().min(2).max(10),
        note: z.string().max(500).optional(),
      }),
    )
    .default([]),
  sentences: z
    .array(
      z.object({
        text: z.string().min(1).max(500),
        lang: z.string().min(2).max(10),
        translation: z.string().max(500).optional(),
      }),
    )
    .default([]),
});

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "VALIDATION_FAILED", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const email = `smoke+${parsed.data.label}@funlingo.local`;
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.label,
      activeLearningLang: parsed.data.words[0]?.lang ?? "en",
    },
  });

  if (parsed.data.words.length) {
    await prisma.userWord.createMany({
      data: parsed.data.words.map((w) => ({
        userId: user.id,
        lemma: w.lemma,
        lang: w.lang,
        note: w.note,
      })),
    });
  }
  if (parsed.data.sentences.length) {
    await prisma.sentence.createMany({
      data: parsed.data.sentences.map((s) => ({
        userId: user.id,
        text: s.text,
        lang: s.lang,
        translation: s.translation ?? null,
      })),
    });
  }

  return Response.json({ userId: user.id });
}
