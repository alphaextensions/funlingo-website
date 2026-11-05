/**
 * Lead-QA P1 (final) — /review DRILL components i18n.
 *
 * The review shell (ReviewRunner + the server page) was localized in the prior
 * Lead-QA pass, but the drill components a signed-in learner actually interacts
 * with while grading — GradeRow and Flashcard / Dictation / GuessMeaning /
 * Shadowing / Speaking — were still 100% hardcoded English. This wires them to
 * the catalog under the "reviewDrill." prefix, served through a PAGE-SCOPED
 * <I18nProvider> on /review (the ~90 keys would push the Hindi global slice
 * over the <25 KB guard if left global).
 *
 * Mirrors review-library-i18n.test.ts: the new keys exist + are translated,
 * interpolation + singular/plural work, the source files call useT() (no
 * stranded English), and the client-bundle discipline holds. Whole-catalog
 * key-parity / placeholder invariants are enforced by wave14-i18n.test.ts.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATALOGS,
  clientSlice,
  pageClientSlice,
  REVIEW_DRILL_KEY_PREFIXES,
  CLIENT_KEY_PREFIXES,
  t,
} from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/catalog/en";

const LOCALES = ["en", "hi", "es", "ja", "zh", "ar", "fr", "de", "pt", "ko", "it", "tr"];
const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("drill keys exist and are translated in every locale", () => {
  const sample = [
    "reviewDrill.gradeAgain",
    "reviewDrill.gradeEasy",
    "reviewDrill.gradeGroupAria",
    "reviewDrill.flashHint",
    "reviewDrill.flashReveal",
    "reviewDrill.flashNoScene",
    "reviewDrill.dictPlaceholder",
    "reviewDrill.dictCheck",
    "reviewDrill.guessFallbackMeaning",
    "reviewDrill.guessPool1",
    "reviewDrill.guessPool12",
    "reviewDrill.record",
    "reviewDrill.scoring",
    "reviewDrill.shadowEncPerfect",
    "reviewDrill.speakPrompt",
    "reviewDrill.speakRevealModel",
  ];

  it("defines each sampled key in English", () => {
    for (const k of sample) expect(en[k as keyof typeof en], k).toBeTruthy();
  });

  it("translates each sampled key in every locale (non-empty, not the raw key)", () => {
    for (const lang of LOCALES) {
      for (const k of sample) {
        const v = CATALOGS[lang]![k];
        expect(v, `${lang} ${k}`).toBeTruthy();
        expect(v, `${lang} ${k}`).not.toBe(k);
      }
    }
  });

  it("a non-English locale actually differs from English for a visible grade label", () => {
    for (const lang of ["hi", "es", "ja", "ar"]) {
      expect(CATALOGS[lang]!["reviewDrill.gradeAgain"], lang).not.toBe(en["reviewDrill.gradeAgain"]);
      expect(CATALOGS[lang]!["reviewDrill.flashReveal"], lang).not.toBe(en["reviewDrill.flashReveal"]);
    }
  });

  it("every locale carries all 12 distractor-pool keys", () => {
    for (const lang of LOCALES) {
      for (let i = 1; i <= 12; i++) {
        expect(CATALOGS[lang]![`reviewDrill.guessPool${i}`], `${lang} pool${i}`).toBeTruthy();
      }
    }
  });
});

describe("interpolation + singular/plural on drill keys", () => {
  it("grade-button aria interpolates {label} and {shortcut}", () => {
    const out = t("reviewDrill.gradeBtnAria", "hi", { label: CATALOGS.hi!["reviewDrill.gradeGood"], shortcut: "3" });
    expect(out).not.toContain("{");
    expect(out).toContain("3");
  });

  it("relative-time keys pluralize via separate singular/plural keys with {n}", () => {
    for (const lang of ["en", "hi", "es", "ar"]) {
      const one = t("reviewDrill.flashDaysAgoSingular", lang, { n: 1 });
      const many = t("reviewDrill.flashDaysAgoPlural", lang, { n: 5 });
      expect(one, lang).toContain("1");
      expect(one, lang).not.toContain("{n}");
      expect(many, lang).toContain("5");
      expect(many, lang).not.toContain("{n}");
    }
    // English grammar actually differs singular vs plural.
    expect(t("reviewDrill.flashDaysAgoSingular", "en", { n: 1 })).toBe("1 day ago");
    expect(t("reviewDrill.flashDaysAgoPlural", "en", { n: 5 })).toBe("5 days ago");
  });

  it("word-match encouragement interpolates {matched} and {total}", () => {
    const s = t("reviewDrill.shadowEncGreat", "hi", { matched: 4, total: 6 });
    expect(s).not.toContain("{");
    expect(s).toContain("4");
    expect(s).toContain("6");
  });

  it("the speaking prompt preserves {sentence} and {lang} verbatim", () => {
    const s = t("reviewDrill.speakPrompt", "ja", { sentence: "Hola mundo", lang: "ES" });
    expect(s).toContain("Hola mundo");
    expect(s).toContain("ES");
    expect(s).not.toContain("{sentence}");
  });

  it("the rewatch aria composes {moment} and the optional {inTitle}", () => {
    const withTitle = t("reviewDrill.flashRewatchAria", "hi", {
      moment: "1:23",
      inTitle: t("reviewDrill.flashRewatchInTitle", "hi", { title: "Narcos" }),
    });
    expect(withTitle).toContain("1:23");
    expect(withTitle).toContain("Narcos");
    const noTitle = t("reviewDrill.flashRewatchAria", "hi", {
      moment: t("reviewDrill.flashRewatchMoment", "hi"),
      inTitle: "",
    });
    expect(noTitle).not.toContain("{");
  });
});

describe("client bundle discipline — drills are page-scoped, not global", () => {
  it("reviewDrill.* is NOT in the global CLIENT_KEY_PREFIXES", () => {
    expect(CLIENT_KEY_PREFIXES).not.toContain("reviewDrill.");
    expect(REVIEW_DRILL_KEY_PREFIXES).toContain("reviewDrill.");
  });

  it("the global slice carries no reviewDrill.* keys", () => {
    for (const lang of LOCALES) {
      const g = clientSlice(lang);
      expect(Object.keys(g).filter((k) => k.startsWith("reviewDrill.")), lang).toEqual([]);
    }
  });

  it("every locale's global slice stays under 25 KB", () => {
    for (const lang of LOCALES) {
      const bytes = new TextEncoder().encode(JSON.stringify(clientSlice(lang))).length;
      expect(bytes, `global ${lang}`).toBeLessThan(25_000);
    }
  });

  it("the /review page slice carries global chrome PLUS the drill keys", () => {
    const s = pageClientSlice("hi", REVIEW_DRILL_KEY_PREFIXES);
    expect(s["reviewDrill.gradeAgain"]).toBeTruthy(); // drill key
    expect(s["reviewDrill.guessPool1"]).toBeTruthy();
    expect(s["review.sessionDone"]).toBeTruthy(); // ReviewRunner's own global chrome
    expect(s["quiz.skip"]).toBeTruthy(); // reused global key
    expect(s["nav.railHome"]).toBeTruthy(); // shared chrome
  });
});

describe("source files call useT() — no stranded English in the drills", () => {
  const FILES = [
    "app/review/drills/GradeRow.tsx",
    "app/review/drills/Flashcard.tsx",
    "app/review/drills/Dictation.tsx",
    "app/review/drills/GuessMeaning.tsx",
    "app/review/drills/Shadowing.tsx",
    "app/review/drills/Speaking.tsx",
  ];

  it("each drill imports useT and calls it", () => {
    for (const f of FILES) {
      const src = read(f);
      expect(src, f).toContain('from "@/lib/i18n/client"');
      expect(src, f).toContain("useT()");
    }
  });

  it("GradeRow uses t() for the grade labels + group aria and keeps fx.tap()", () => {
    const src = read("app/review/drills/GradeRow.tsx");
    expect(src).toContain('"reviewDrill.gradeAgain"'); // resolved via t(item.key)
    expect(src).toContain('t("reviewDrill.gradeGroupAria")');
    expect(src).toContain('t("reviewDrill.gradeBtnAria"');
    expect(src).toContain("fx.tap()"); // wave15-feedback invariant preserved
    expect(src).not.toContain('label="Again"');
    expect(src).not.toContain('aria-label="Grade this card"');
  });

  it("Flashcard localizes the reveal/skip/meaning + relative-time strings", () => {
    const src = read("app/review/drills/Flashcard.tsx");
    expect(src).toContain('t("reviewDrill.flashReveal")');
    expect(src).toContain('t("reviewDrill.flashToday")');
    expect(src).toContain('"reviewDrill.flashDaysAgoPlural"'); // chosen in a ternary
    expect(src).toContain('"reviewDrill.flashDaysAgoSingular"');
    expect(src).not.toContain(">Reveal<");
    expect(src).not.toContain('"Say the meaning in your head."');
    expect(src).not.toMatch(/day\$\{daysAgo === 1/); // old inline plural gone
  });

  it("Dictation localizes placeholder, feedback, buttons", () => {
    const src = read("app/review/drills/Dictation.tsx");
    expect(src).toContain('placeholder={t("reviewDrill.dictPlaceholder")}');
    expect(src).toContain('t("reviewDrill.dictCorrect")');
    expect(src).not.toContain('placeholder="Type what you heard');
    expect(src).not.toContain('? "Correct"');
  });

  it("GuessMeaning uses a localized pick aria + distractor pool and keeps fx.correct()", () => {
    const src = read("app/review/drills/GuessMeaning.tsx");
    expect(src).toContain("useT()");
    expect(src).toContain("reviewDrill.guessPool");
    expect(src).toContain("fx.correct()"); // wave15-feedback invariant preserved
    expect(src).not.toContain('"a kind of fruit"'); // pool moved to catalog
  });

  it("Shadowing + Speaking localize chips, controls, errors and encouragement", () => {
    for (const f of ["app/review/drills/Shadowing.tsx", "app/review/drills/Speaking.tsx"]) {
      const src = read(f);
      expect(src, f).toContain('t("reviewDrill.record")');
      expect(src, f).toContain('t("reviewDrill.errBudget")');
      expect(src, f).toContain('t("reviewDrill.scoring")');
      expect(src, f).not.toContain('"Scoring…"');
      expect(src, f).not.toContain('setError("Could not score your audio. Grade yourself.")');
    }
    expect(read("app/review/drills/Speaking.tsx")).toContain('t("reviewDrill.speakRevealModel")');
  });

  it("the /review page wraps ReviewRunner in a page-scoped drill provider", () => {
    const src = read("app/review/page.tsx");
    expect(src).toContain("REVIEW_DRILL_KEY_PREFIXES");
    expect(src).toContain("pageClientSlice");
    expect(src).toContain("I18nProvider");
  });
});
