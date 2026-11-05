/**
 * Dev-only cleanup endpoint. Deletes the user + all cascading rows so a
 * Playwright run doesn't leak rows across invocations.
 */

import { prisma } from "@/server/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({ userId: z.string().min(1).max(64) });

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
    return Response.json({ error: "VALIDATION_FAILED" }, { status: 400 });
  }
  const { userId } = parsed.data;
  // cross-lang on purpose: dev-only teardown wipes EVERY row for the test
  // user across all langs so Playwright runs don't leak between invocations.
  await prisma.reviewLog.deleteMany({ where: { userId } });
  await prisma.reviewCardState.deleteMany({ where: { userId } });
  await prisma.sentence.deleteMany({ where: { userId } });
  await prisma.userWord.deleteMany({ where: { userId } });
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.streak.deleteMany({ where: { userId } });
  await prisma.idempotencyRecord.deleteMany({ where: { userId } });
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    // ignore
  }
  return Response.json({ ok: true });
}
