/**
 * Server-side helpers that pull "the current viewer" without exploding
 * when the user isn't signed in or Auth.js can't boot (e.g. missing
 * AUTH_SECRET during a local dev run).
 *
 * All content pages fall back to a logged-out view with a friendly
 * empty state rather than throwing — SPEC §4 asks the Home empty state
 * to work for first-time visitors too.
 */

import { cache } from "react";
import type { User } from "@prisma/client";
import { prisma } from "@/server/db";

export interface Viewer {
  userId: string | null;
  user: User | null;
  activeLang: string;
  /** UI-chrome language. From the user row, or the fl_native cookie when signed out. */
  nativeLang: string;
}

const DEFAULT_LANG = "en";
const LANG_RE = /^[a-z]{2}(-[A-Za-z]{2})?$/;

/** Signed-out visitors keep their language choices in cookies set by LangPills. */
async function cookieLangs(): Promise<{ native: string; learning: string }> {
  try {
    const { cookies } = await import("next/headers");
    const jar = await cookies();
    const n = jar.get("fl_native")?.value;
    const l = jar.get("fl_learning")?.value;
    return {
      native: n && LANG_RE.test(n) ? n : DEFAULT_LANG,
      learning: l && LANG_RE.test(l) ? l : DEFAULT_LANG,
    };
  } catch {
    return { native: DEFAULT_LANG, learning: DEFAULT_LANG };
  }
}

/**
 * Request-scoped: a single server render calls getViewer() several times
 * (generateMetadata, the page, getT, nested server components). React's
 * `cache` dedupes them so auth() + the user lookup run once per request
 * instead of ~6× (PM review 2026-10-25).
 */
export const getViewer = cache(async function getViewer(): Promise<Viewer> {
  let userId: string | null = null;
  try {
    const { auth } = await import("@/server/auth");
    const session = await auth();
    userId = (session?.user as { id?: string } | undefined)?.id ?? null;
  } catch {
    userId = null;
  }

  const signedOut = async (): Promise<Viewer> => {
    const c = await cookieLangs();
    return { userId: null, user: null, activeLang: c.learning, nativeLang: c.native };
  };

  if (!userId) return signedOut();

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return signedOut();
    return {
      userId: user.id,
      user,
      activeLang: user.activeLearningLang ?? DEFAULT_LANG,
      nativeLang: user.nativeLang ?? DEFAULT_LANG,
    };
  } catch {
    return signedOut();
  }
});
