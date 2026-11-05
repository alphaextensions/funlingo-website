/**
 * Anki export helpers for GET /api/export?format=anki (Wave 17).
 */

import { prisma } from "@/server/db";

export interface AnkiWord {
  lemma: string;
  lang: string;
  encounters: Array<{ line: string; translation: string | null }>;
}

/** Meaning per "lemma|lang" from the shared WordCardCache, falling back to
 *  the encounter translation. */
export async function meaningsFor(words: AnkiWord[], nativeLang: string): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (words.length === 0) return out;
  const cards = await prisma.wordCardCache.findMany({
    where: { tgtLang: nativeLang, lemma: { in: words.map((w) => w.lemma) } },
    select: { lemma: true, srcLang: true, cardJson: true },
  });
  for (const c of cards) {
    try {
      const parsed = JSON.parse(c.cardJson) as { shortMeaning?: string };
      if (parsed.shortMeaning) out.set(`${c.lemma}|${c.srcLang}`, parsed.shortMeaning);
    } catch {
      /* skip corrupt cache rows */
    }
  }
  for (const w of words) {
    const key = `${w.lemma}|${w.lang}`;
    if (!out.has(key) && w.encounters[0]?.translation) out.set(key, w.encounters[0].translation);
  }
  return out;
}

function ankiField(value: string): string {
  // Anki's text importer: tab separates fields, newline separates notes.
  return value.replace(/[\t\r\n]+/g, " ").trim();
}

function htmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Anki-ready text file (File → Import in Anki Desktop). Port of the
 * extension's commented-out "Send to Anki" / "CSV for manual Anki import".
 * Front = word, Back = meaning + the saved line (if any), Tags = funlingo +
 * language. Header lines follow Anki 2.1.55+ import directives.
 */
export function wordsToAnki(rows: AnkiWord[], meanings: Map<string, string>): string {
  const out = [
    "#separator:tab",
    "#html:true",
    "#notetype:Basic",
    "#tags column:3",
  ];
  for (const w of rows) {
    const meaning = meanings.get(`${w.lemma}|${w.lang}`) ?? "";
    const line = w.encounters.find((e) => e.line && e.line.trim())?.line ?? "";
    const back = [
      meaning ? htmlEscape(meaning) : "",
      line ? `<i>${htmlEscape(line)}</i>` : "",
    ]
      .filter(Boolean)
      .join("<br>");
    out.push(
      [ankiField(htmlEscape(w.lemma)), ankiField(back), `funlingo lang::${w.lang}`].join("\t"),
    );
  }
  return out.join("\n") + "\n";
}
