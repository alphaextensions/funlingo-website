/**
 * Server loader for /words — Wave 17 popup parity.
 *
 * Each row carries the real meaning + up to 3 extra senses + CEFR (from
 * the shared WordCardCache), how many times the learner has met the word
 * and when they last saw it: the extension popup's saved-word card fields.
 * Lang-scoped: `where: { userId, lang }`.
 */

import { prisma } from "@/server/db";
import type { WordRow } from "@/lib/words/view";

interface CachedCard {
  pos?: string;
  cefr?: string | null;
  shortMeaning?: string;
  senses?: Array<{ nativeGloss?: string }>;
}

export async function loadWords(
  userId: string,
  lang: string,
  nativeLang: string,
): Promise<WordRow[]> {
  const words = await prisma.userWord.findMany({
    where: { userId, lang },
    include: {
      encounters: {
        orderBy: { savedAt: "desc" },
        include: { source: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  // Meaning + extra senses + CEFR from the shared word-card cache (the same
  // card the study player shows on tap). Scoped to this language pair. The
  // cache never holds user text, so reading it here is safe.
  const cards = words.length
    ? await prisma.wordCardCache.findMany({
        where: {
          srcLang: lang,
          tgtLang: nativeLang,
          lemma: { in: words.map((w) => w.lemma) },
        },
        select: { lemma: true, cardJson: true },
      })
    : [];
  const cardByLemma = new Map<string, CachedCard>();
  for (const c of cards) {
    const parsed = safeJson(c.cardJson) as CachedCard | null;
    if (parsed) cardByLemma.set(c.lemma, parsed);
  }

  return words.map((w) => {
    const latest = w.encounters[0];
    const withLine = w.encounters.find((e) => e.line && e.line.trim().length > 0);
    const shown = withLine ?? latest;
    const meta = shown?.source?.meta ? safeJson(shown.source.meta) : null;
    const card = cardByLemma.get(w.lemma);
    const meaning =
      (card?.shortMeaning && card.shortMeaning.trim()) ||
      w.encounters.find((e) => e.translation)?.translation ||
      null;
    const senses = (card?.senses ?? [])
      .map((s) => (typeof s?.nativeGloss === "string" ? s.nativeGloss.trim() : ""))
      .filter((g) => g && g.toLowerCase() !== (meaning ?? "").toLowerCase());
    return {
      id: w.id,
      lemma: w.lemma,
      pos: w.pos ?? (card?.pos || null),
      state: w.state,
      createdAt: w.createdAt.toISOString(),
      lastSeenAt: latest ? latest.savedAt.toISOString() : null,
      seenCount: w.encounters.length,
      gloss: meaning,
      senses: Array.from(new Set(senses)).slice(0, 3),
      cefr: card?.cefr ?? null,
      sceneLine: withLine?.line ?? null,
      sourceTitle: shown?.source?.title ?? null,
      sourcePlatform:
        (shown?.platform as string | undefined) ?? (meta?.platform as string | undefined) ?? null,
      thumbnail: (meta?.thumbnail as string | undefined) ?? null,
    };
  });
}

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

