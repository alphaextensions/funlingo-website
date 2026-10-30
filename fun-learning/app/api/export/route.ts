/**
 * GET /api/export — CSV, JSON or Anki export of UserWord + Sentence.
 * Read-only; no idempotency needed.
 *
 * Query:
 *   what   = all | words | sentences   (default all)
 *   format = csv | json | anki         (default csv; anki = words only)
 *   lang   = optional learning-language filter (Wave 17: /words exports
 *            just the deck you're looking at). Without it the export is
 *            the full account, GDPR-style.
 *
 * LEGAL: this exports the learner's OWN saved words and lines. Lines from
 * streaming / YouTube sources are never stored (saveWord keeps `line: ""`),
 * so no subtitle text can leave through here.
 */

import { prisma } from "@/server/db";
import { meaningsFor, wordsToAnki } from "@/server/export/anki";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { auth } = await import("@/server/auth");
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const url = new URL(req.url);
  const what = url.searchParams.get("what") ?? "all";
  const format = url.searchParams.get("format") ?? "csv";
  const langParam = url.searchParams.get("lang");
  const lang = langParam && /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(langParam) ? langParam : null;
  const scope = lang ? { userId, lang } : { userId };

  const [words, sentences] = await Promise.all([
    // cross-lang on purpose (unless ?lang= is set): GDPR-style export returns
    // the user's full deck across every learning language. Each row carries
    // its own `lang` column, so the output stays disambiguated.
    what === "sentences"
      ? Promise.resolve([])
      : prisma.userWord.findMany({
          where: scope,
          include: {
            encounters: {
              orderBy: { savedAt: "desc" },
              take: 5,
              include: { source: true },
            },
          },
        }),
    // cross-lang on purpose (unless ?lang=): same reasoning — every saved sentence.
    what === "words" || format === "anki"
      ? Promise.resolve([])
      : prisma.sentence.findMany({
          where: scope,
          include: { source: true },
        }),
  ]);

  const suffix = lang ? `-${lang}` : "";

  if (format === "anki") {
    const nativeLang =
      (await prisma.user.findUnique({ where: { id: userId }, select: { nativeLang: true } }))
        ?.nativeLang ?? "en";
    const meanings = await meaningsFor(words as Array<WordExport>, nativeLang);
    return new Response(wordsToAnki(words as Array<WordExport>, meanings), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "content-disposition": `attachment; filename="fun-learning-anki${suffix}.txt"`,
      },
    });
  }

  if (format === "json") {
    return new Response(JSON.stringify({ words, sentences }, null, 2), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": "attachment; filename=\"fun-learning-export.json\"",
      },
    });
  }

  const parts: string[] = [];
  if (what === "all" || what === "words") {
    const nativeLang =
      (await prisma.user.findUnique({ where: { id: userId }, select: { nativeLang: true } }))
        ?.nativeLang ?? "en";
    const meanings = await meaningsFor(words as Array<WordExport>, nativeLang);
    parts.push(wordsToCsv(words as Array<WordExport>, meanings));
  }
  if (what === "all" || what === "sentences") {
    if (parts.length > 0) parts.push("");
    parts.push(sentencesToCsv(sentences as Array<SentenceExport>));
  }

  return new Response(parts.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="fun-learning-${what}${suffix}.csv"`,
    },
  });
}

interface WordExport {
  lemma: string;
  pos: string | null;
  lang: string;
  state: string;
  createdAt: Date;
  encounters: Array<{ line: string; translation: string | null; source: { title: string } | null }>;
}

interface SentenceExport {
  text: string;
  translation: string | null;
  lang: string;
  lists: string;
  createdAt: Date;
  source: { title: string } | null;
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function wordsToCsv(rows: WordExport[], meanings: Map<string, string>): string {
  const header = ["lemma", "pos", "lang", "state", "meaning", "example", "translation", "source", "savedAt"];
  const out = [header.join(",")];
  rows.forEach((w) => {
    const latest = w.encounters[0];
    const withLine = w.encounters.find((e) => e.line && e.line.trim()) ?? latest;
    out.push(
      [
        w.lemma,
        w.pos ?? "",
        w.lang,
        w.state,
        meanings.get(`${w.lemma}|${w.lang}`) ?? "",
        withLine?.line ?? "",
        withLine?.translation ?? "",
        withLine?.source?.title ?? "",
        w.createdAt.toISOString(),
      ]
        .map(csvEscape)
        .join(","),
    );
  });
  return out.join("\n");
}

function sentencesToCsv(rows: SentenceExport[]): string {
  const header = ["text", "translation", "lang", "lists", "source", "savedAt"];
  const out = [header.join(",")];
  rows.forEach((s) => {
    out.push(
      [
        s.text,
        s.translation ?? "",
        s.lang,
        s.lists,
        s.source?.title ?? "",
        s.createdAt.toISOString(),
      ]
        .map(csvEscape)
        .join(","),
    );
  });
  return out.join("\n");
}

