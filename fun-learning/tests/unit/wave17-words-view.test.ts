/**
 * Wave 17 — /words data + export parity with the extension popup.
 *   - loadWords fills meaning / senses / CEFR from WordCardCache, counts
 *     encounters, and stays lang-scoped.
 *   - sortWords "recent" uses last encounter, then save date (popup order).
 *   - Anki export: tab-separated, header directives, no tabs/newlines leak
 *     into fields, HTML escaped.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { loadWords } from "@/server/words/load";
import { sortWords, type WordRow } from "@/lib/words/view";
import { wordsToAnki } from "@/server/export/anki";

const LEMMA = `w17lemma${Date.now()}`;

describe("Wave 17 — loadWords", () => {
  let userId: string;
  beforeEach(async () => {
    const u = await prisma.user.create({
      data: { email: `w17v-${Date.now()}-${Math.random()}@test.local`, nativeLang: "hi" },
    });
    userId = u.id;
  });
  afterEach(async () => {
    await prisma.encounter.deleteMany({ where: { userId } });
    await prisma.userWord.deleteMany({ where: { userId } });
    await prisma.wordCardCache.deleteMany({ where: { lemma: LEMMA } });
    await prisma.user.delete({ where: { id: userId } }).catch(() => {});
  });

  it("joins the cached word card and counts encounters, lang-scoped", async () => {
    const w = await prisma.userWord.create({ data: { userId, lemma: LEMMA, lang: "es" } });
    await prisma.userWord.create({ data: { userId, lemma: LEMMA, lang: "ja" } });
    await prisma.encounter.createMany({
      data: [
        { userId, userWordId: w.id, lang: "es", line: "", platform: "netflix" },
        { userId, userWordId: w.id, lang: "es", line: `una ${LEMMA} aquí`, platform: "upload" },
      ],
    });
    await prisma.wordCardCache.create({
      data: {
        lemma: LEMMA,
        srcLang: "es",
        tgtLang: "hi",
        cardJson: JSON.stringify({
          lemma: LEMMA,
          pos: "noun",
          cefr: "A2",
          shortMeaning: "बिल्ली",
          senses: [{ nativeGloss: "बिल्ली" }, { nativeGloss: "मार्जार" }],
        }),
      },
    });
    // Wrong pair must not leak in.
    await prisma.wordCardCache.create({
      data: { lemma: LEMMA, srcLang: "ja", tgtLang: "hi", cardJson: JSON.stringify({ shortMeaning: "WRONG" }) },
    });

    const rows = await loadWords(userId, "es", "hi");
    expect(rows).toHaveLength(1);
    const r = rows[0]!;
    expect(r.gloss).toBe("बिल्ली");
    expect(r.senses).toEqual(["मार्जार"]);
    expect(r.cefr).toBe("A2");
    expect(r.pos).toBe("noun");
    expect(r.seenCount).toBe(2);
    expect(r.sceneLine).toContain(LEMMA);
  });

  it("returns gloss null when nothing is cached (no invented meaning)", async () => {
    await prisma.userWord.create({ data: { userId, lemma: LEMMA, lang: "es" } });
    const rows = await loadWords(userId, "es", "hi");
    expect(rows[0]!.gloss).toBeNull();
    expect(rows[0]!.senses).toEqual([]);
  });
});

describe("Wave 17 — sortWords", () => {
  const base = (id: string, extra: Partial<WordRow>): WordRow => ({
    id,
    lemma: id,
    pos: null,
    state: "new",
    createdAt: "2026-01-01T00:00:00.000Z",
    ...extra,
  });

  it("recent = last seen, falling back to save date", () => {
    const rows = [
      base("a", { createdAt: "2026-03-01T00:00:00.000Z" }),
      base("b", { createdAt: "2026-01-01T00:00:00.000Z", lastSeenAt: "2026-05-01T00:00:00.000Z" }),
      base("c", { createdAt: "2026-04-01T00:00:00.000Z" }),
    ];
    expect(sortWords(rows, "recent").map((r) => r.id)).toEqual(["b", "c", "a"]);
  });

  it("alpha and most-seen", () => {
    const rows = [base("zeta", { seenCount: 1 }), base("alpha", { seenCount: 5 }), base("mid", { seenCount: 3 })];
    expect(sortWords(rows, "alpha").map((r) => r.id)).toEqual(["alpha", "mid", "zeta"]);
    expect(sortWords(rows, "seen").map((r) => r.id)).toEqual(["alpha", "mid", "zeta"]);
  });
});

describe("Wave 17 — Anki export", () => {
  it("writes a tab-separated file Anki can import", () => {
    const out = wordsToAnki(
      [
        { lemma: "break the ice", lang: "en", encounters: [{ line: "", translation: null }, { line: "Let's\tbreak the ice\nnow <ok>", translation: null }] },
        { lemma: "hola", lang: "es", encounters: [] },
      ],
      new Map([["break the ice|en", "बर्फ़ तोड़ना"]]),
    );
    const lines = out.trimEnd().split("\n");
    expect(lines.slice(0, 4)).toEqual([
      "#separator:tab",
      "#html:true",
      "#notetype:Basic",
      "#tags column:3",
    ]);
    const [front, back, tags] = lines[4]!.split("\t");
    expect(front).toBe("break the ice");
    expect(back).toBe("बर्फ़ तोड़ना<br><i>Let's break the ice now &lt;ok&gt;</i>");
    expect(tags).toBe("funlingo lang::en");
    expect(lines[5]!.split("\t")).toEqual(["hola", "", "funlingo lang::es"]);
    expect(lines).toHaveLength(6);
  });
});
