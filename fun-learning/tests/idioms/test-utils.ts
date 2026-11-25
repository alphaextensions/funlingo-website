/**
 * Small helpers to create / clean up a throwaway test user for the idiom
 * harness and other tests that touch the AI module (so the wallet increments
 * against a known fake account, not a real one).
 */

import { prisma } from "@/server/db";

export async function ensureTestUser(label: string): Promise<string> {
  const email = `test+${label}@funlingo.local`;
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: `Test ${label}`, nativeLang: "en" },
  });
  return user.id;
}

export async function cleanupTestUser(userId: string): Promise<void> {
  try {
    await prisma.aiCallCounter.deleteMany({
      where: { bucket: userId },
    });
  } catch {
    /* ignore */
  }
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    /* ignore */
  }
}
