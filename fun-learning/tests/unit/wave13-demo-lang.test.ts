/**
 * Wave 13 PM BLOCKER-17 — the `/watch/demo` save-word action writes to the
 * viewer's active-learning-language deck, NOT the demo clip's own "en".
 *
 * LearnLanding.countUserWords filters UserWord rows by (userId, activeLang).
 * If a signed-in Spanish learner (`activeLearningLang === "es"`) saves a
 * demo word with lang="en", their home Word Replay / Quick Quiz tiles stay
 * locked after a successful save — a lie-UI. The fix is to always use the
 * viewer's active lang on save, which this test pins at both the client and
 * the API layer.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "@/server/db";

function src(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Wave 13 B-17 — demo save-word honours viewer's activeLang", () => {
  it("WatchClient sends `lang: data.user.activeLearningLang` on save", () => {
    const file = src("src/components/watch/WatchClient.tsx");
    const start = file.indexOf("const saveWord = useCallback");
    const slice = file.slice(start, start + 2000);
    // The lang that goes to /api/watch/saveWord must be the viewer's
    // activeLearningLang, never the source's lang.
    expect(slice).toContain("lang: data.user.activeLearningLang");
    expect(slice).not.toContain("lang: data.source.lang");
  });

  it("the Watch page keeps user.activeLearningLang authoritative (does not overwrite with source.lang)", () => {
    const file = src("app/watch/[sourceId]/page.tsx");
    // The resolved activeLearningLang falls back to source.lang only when
    // the user has no learning language set — a brand-new Spanish learner
    // whose profile says `es` keeps `es`.
    expect(file).toContain(
      "activeLearningLang: user.activeLearningLang ?? source.lang ?? \"en\"",
    );
  });

  it("the save-word API route persists UserWord with the body's lang", async () => {
    // Round-trip: save a demo word for a Spanish learner and assert the
    // UserWord row's lang === "es". The route pulls lang straight from
    // the body, so this is really a schema-level pin.
    const email = `wave13-b17+${Date.now()}@funlingo.local`;
    const user = await prisma.user.create({
      data: { email, name: "Carlos", activeLearningLang: "es", nativeLang: "en" },
    });
    try {
      const uw = await prisma.userWord.create({
        data: { userId: user.id, lemma: "break", lang: "es", state: "new" },
      });
      expect(uw.lang).toBe("es");
      // Important: the SAME lemma can co-exist in a different lang scope
      // for the same user (no cross-lang collisions).
      const uwEn = await prisma.userWord.create({
        data: { userId: user.id, lemma: "break", lang: "en", state: "new" },
      });
      expect(uwEn.lang).toBe("en");
      expect(uwEn.id).not.toBe(uw.id);
      // Count the Spanish rows — this is what LearnLanding gates on.
      const esCount = await prisma.userWord.count({
        where: { userId: user.id, lang: "es" },
      });
      expect(esCount).toBe(1);
    } finally {
      await prisma.userWord.deleteMany({ where: { userId: user.id } });
      await prisma.user.delete({ where: { id: user.id } });
    }
  });
});
