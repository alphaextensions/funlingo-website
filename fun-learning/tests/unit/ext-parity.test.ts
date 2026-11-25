/**
 * Wave 6 extension-parity regression tests.
 *
 * Three concerns covered:
 *   1. IconRail — every `data-icon-name` is unique (small guard against
 *      Words + Sentences both silently going back to horizontal lines).
 *   2. /learn page renders a Fun / Learning hero + the 5 expected tiles in
 *      order and respects the welcome banner's < 5 UserWord gate.
 *   3. SlangAudioButton — the module exports a function (SSR safe) and the
 *      module CSS gates the pulse animation on prefers-reduced-motion.
 *   4. QuickQuizRunner — the module declares no API writes (state isolation).
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { en } from "@/lib/i18n/catalog/en";

function src(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Wave 6 — differentiated nav icons", () => {
  it("every rail icon has a unique data-icon-name", () => {
    const file = src("src/components/IconRail.tsx");
    const names = Array.from(file.matchAll(/data-icon-name="([^"]+)"/g)).map(
      (m) => m[1]!,
    );
    expect(names.length).toBeGreaterThanOrEqual(9);
    expect(new Set(names).size).toBe(names.length);
  });

  it("Words and Sentences have distinct glyphs", () => {
    const file = src("src/components/IconRail.tsx");
    // Words has a flashcard with a highlight dot (a <rect> + <circle>);
    // Sentences has a paragraph + pencil underline. They must NOT share the
    // same path.
    const wordsBlock = file.slice(
      file.indexOf("const WordsIcon"),
      file.indexOf("const SentencesIcon"),
    );
    const sentencesBlock = file.slice(
      file.indexOf("const SentencesIcon"),
      file.indexOf("const ReviewIcon"),
    );
    expect(wordsBlock).toContain("<rect");
    expect(wordsBlock).toContain("<circle");
    expect(sentencesBlock.match(/<circle/)).toBeNull();
    expect(sentencesBlock).toContain("M4 5h16");
  });
});

describe("Wave 6 — /learn page (Wave 8 shared-landing refactor)", () => {
  // Wave 8 parity rebuild extracted the landing into a shared
  // `LearnLanding` component so `/` and `/learn` render the same five-
  // tile grid. The assertions below moved from `app/learn/page.tsx` to
  // `app/learn/LearnLanding.tsx`, and the thin `app/learn/page.tsx` now
  // just re-exports it.
  it("/ and /learn both render LearnLanding (shared front door)", () => {
    const home = src("app/page.tsx");
    const learnRoute = src("app/learn/page.tsx");
    expect(home).toContain("LearnLanding");
    expect(learnRoute).toContain("LearnLanding");
  });

  it("renders the 5 experience tiles in order", () => {
    // Wave 14: titles live in the catalog. Assert the tile table consumes
    // the keys in extension order (matching on `t("…")` calls, NOT bare
    // words — the file's header comment also lists the tile names, which
    // would make a plain-text search pass vacuously) and that the English
    // catalog still carries the extension's exact titles.
    const file = src("app/learn/LearnLanding.tsx");
    const order: [string, string][] = [
      ["learn.replayTitle", "Word Replay"],
      ["learn.quizTitle", "Quick Quiz"],
      ["learn.lessonsTitle", "Tiny Lessons"],
      ["learn.slangTitle", "Slang Hang"],
      ["learn.libraryTitle", "Your Library"],
    ];
    let last = -1;
    for (const [key, label] of order) {
      const idx = file.indexOf(`t("${key}")`);
      expect(idx, `tile key "${key}" not found`).toBeGreaterThan(last);
      last = idx;
      expect(en[key as keyof typeof en]).toBe(label);
    }
  });

  it("gates the welcome banner on userWordCount < 5", () => {
    const file = src("app/learn/LearnLanding.tsx");
    expect(file).toMatch(/showWelcome\s*=\s*userWordCount\s*<\s*5/);
  });

  it("locks Word Replay + Quick Quiz when userWordCount === 0", () => {
    const file = src("app/learn/LearnLanding.tsx");
    // The tiles' `locked` flag must be driven by the count — not hardcoded.
    expect(file).toMatch(/const unlocked = wordCount > 0/);
    // Both tiles must consume the unlocked flag.
    const replayAt = file.indexOf('t("learn.replayTitle")');
    const quizAt = file.indexOf('t("learn.quizTitle")');
    const lessonsAt = file.indexOf('t("learn.lessonsTitle")');
    expect(replayAt).toBeGreaterThan(-1);
    expect(quizAt).toBeGreaterThan(replayAt);
    expect(lessonsAt).toBeGreaterThan(quizAt);
    const replayBlock = file.slice(replayAt, quizAt);
    const quizBlock = file.slice(quizAt, lessonsAt);
    expect(replayBlock).toContain("!unlocked");
    expect(quizBlock).toContain("!unlocked");
  });

  it("Quick Quiz tile routes to /review?mode=quiz&focus=casual", () => {
    const file = src("app/learn/LearnLanding.tsx");
    expect(file).toContain("/review?mode=quiz&focus=casual");
  });

  it("lang-scopes the UserWord count", () => {
    const file = src("app/learn/LearnLanding.tsx");
    expect(file).toMatch(/where:\s*\{\s*userId,\s*lang\s*\}/);
  });

  it("footer carries the exact extension copy", () => {
    const file = src("app/learn/LearnLanding.tsx");
    expect(file).toContain('t("learn.footer")');
    expect(en["learn.footer"]).toBe("Funlingo — Learn while you watch");
  });
});

describe("Wave 6 — Quick Quiz casual mode (no scheduler writes)", () => {
  it("exports the QUICK_QUIZ_WRITES_API constant as false", async () => {
    const mod = await import("@/../app/review/QuickQuizRunner");
    expect(mod.QUICK_QUIZ_WRITES_API).toBe(false);
  });

  it("the module never fetches a review API or any API", () => {
    const file = src("app/review/QuickQuizRunner.tsx");
    // Strip comments so a docstring referring to the forbidden surface
    // doesn't trip the sentinel — only runtime code counts.
    const stripped = file
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    expect(stripped.includes("/api/review/grade")).toBe(false);
    expect(stripped.includes("/api/review/session")).toBe(false);
    // No `fetch(` anywhere in casual mode — scheduler stays untouched.
    expect(stripped.match(/\bfetch\s*\(/)).toBeNull();
    // No `XMLHttpRequest`, no `axios`, no `useQuery` network paths either.
    expect(stripped).not.toMatch(/XMLHttpRequest|axios\.|useQuery/);
  });

  it("/review?mode=quiz branches BEFORE loading the FSRS session", () => {
    const file = src("app/review/page.tsx");
    const quizBranch = file.indexOf('sp.mode === "quiz"');
    const regularLoad = file.indexOf("const cards = await loadSession");
    expect(quizBranch).toBeGreaterThan(-1);
    expect(regularLoad).toBeGreaterThan(-1);
    expect(quizBranch).toBeLessThan(regularLoad);
  });
});

describe("Wave 6 — SlangAudioButton", () => {
  it("imports normalizeToBCP47 and scores voices like the extension", () => {
    const file = src("src/components/SlangAudioButton.tsx");
    expect(file).toContain('from "@/lib/i18n/speechLang"');
    // The voice-scoring regex mirrors slang-audio.js's heuristic. Match the
    // tokens individually so the test survives small ordering tweaks.
    for (const token of ["google", "natural", "neural", "online", "premium", "enhanced", "microsoft"]) {
      expect(file.toLowerCase()).toContain(token);
    }
  });

  it("does not reference window.speechSynthesis at module top-level (SSR safe)", () => {
    const file = src("src/components/SlangAudioButton.tsx");
    // All speechSynthesis touches must be inside useEffect / useCallback /
    // event handlers — never at module-eval top-level — so SSR + Node tests
    // don't crash on `window is not defined`. Strip comments first so the
    // module docstring (which legitimately names the API) doesn't trip this.
    const stripped = file
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    const topLevel = stripped.slice(
      0,
      stripped.indexOf("export function SlangAudioButton"),
    );
    expect(topLevel.includes("window.speechSynthesis")).toBe(false);
  });

  it("gates the pulse animation on prefers-reduced-motion", () => {
    const css = src("src/components/SlangAudioButton.module.css");
    // The playing-pulse animation lives inside a prefers-reduced-motion:
    // no-preference block so reduced-motion users get a static button.
    const rm = css.indexOf("prefers-reduced-motion: no-preference");
    expect(rm).toBeGreaterThan(-1);
    const after = css.slice(rm);
    expect(after).toContain("animation: slangPulse");
  });

  it("uses design-system tokens, not raw brand hex", () => {
    const css = src("src/components/SlangAudioButton.module.css");
    expect(css).toContain("var(--fl-accent)");
    expect(css).toContain("var(--fl-secondary)");
  });
});

describe("Wave 6 — Tiny Lessons + Slang routes", () => {
  it("Tiny Lessons list is lang-scoped via getViewer().activeLang", () => {
    const file = src("app/learn/tiny-lessons/page.tsx");
    expect(file).toContain("getViewer");
    expect(file).toContain("listSituations(viewer.activeLang)");
  });

  it("Slang page is lang-scoped via getViewer().activeLang", () => {
    const file = src("app/learn/slang/page.tsx");
    expect(file).toContain("getViewer");
    expect(file).toContain("listSlangs(viewer.activeLang)");
  });

  it("Slang cards keep the example in the learning language", () => {
    // The example is rendered on the BACK face of the deck's SlangDeck
    // client component. The surface still uses `lang={lang}` so
    // screen-readers announce it in the learning lang — mirrors the
    // extension's "example stays in the learning language on purpose" rule.
    const file = src("app/learn/slang/SlangDeck.tsx");
    expect(file).toMatch(/bExample[\s\S]{0,160}lang=\{lang\}/);
  });
});

describe("Wave 10 — Deck layout (replaces grid in slang + tiny-lessons)", () => {
  it("Slang page renders the SlangDeck client component, not a grid", () => {
    const file = src("app/learn/slang/page.tsx");
    // The old grid-of-24-cards is gone.
    expect(file).not.toMatch(/<section[^>]*data-testid="slang-grid"/);
    expect(file).not.toMatch(/styles\.grid/);
    // The new deck is wired up.
    expect(file).toContain("SlangDeck");
    expect(file).toContain('from "./SlangDeck"');
  });

  it("Tiny Lessons [situation] uses the deck PhraseCards (single card)", () => {
    const file = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    // The deck component is pulled in from the shared FlashcardDeck.
    expect(file).toContain("FlashcardDeck");
    expect(file).toContain('from "@/components/learn/FlashcardDeck"');
    // The old `.cardGrid` grid is gone.
    expect(file).not.toMatch(/data-testid="phrase-card-grid"/);
    expect(file).not.toMatch(/tinyStyles\.cardGrid/);
  });

  it("FlashcardDeck mounts a single `.flashcard` with a counter and progress bar", () => {
    const file = src("src/components/learn/FlashcardDeck.tsx");
    // The counter + flashcard trigger carry stable test IDs so a UI test
    // can assert "1 card visible, counter reads n / N".
    expect(file).toContain('data-testid="flashcard"');
    expect(file).toContain('data-testid="deck-counter"');
    expect(file).toContain('data-testid="flashcard-deck"');
    // Prev / Next buttons are both present.
    expect(file).toContain('data-testid="deck-prev"');
    expect(file).toContain('data-testid="deck-next"');
    // Progress bar is an accessible progressbar role.
    expect(file).toContain('role="progressbar"');
  });

  it("Deck trigger is a role=button DIV, not a <button> (hydration-safe for SlangAudioButton)", () => {
    const file = src("src/components/learn/FlashcardDeck.tsx");
    // The flashcard DOM node is a <div role="button"> — a <button> inside
    // would nest the SlangAudioButton's <button> which is invalid HTML +
    // triggers a React hydration warning. We re-add the keyboard behaviour
    // explicitly via onKeyDown.
    const flashcardBlock = file.slice(
      file.indexOf('data-testid="flashcard"') - 400,
      file.indexOf('data-testid="flashcard"') + 400,
    );
    expect(flashcardBlock).toContain('role="button"');
    expect(flashcardBlock).toContain("tabIndex={0}");
    // The surrounding element is NOT a <button type="button">.
    expect(flashcardBlock).not.toMatch(/<button[\s\S]*data-testid="flashcard"/);
  });

  it("SlangDeck does NOT nest SlangAudioButton inside a <button> trigger", () => {
    const stripComments = (s: string) =>
      s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const slangDeck = stripComments(src("app/learn/slang/SlangDeck.tsx"));
    const phraseCards = stripComments(
      src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx"),
    );
    // Neither client component defines a native <button> wrapping the audio
    // button — the deck's flip-trigger is a <div role="button">.
    expect(slangDeck).not.toMatch(/<button[\s\S]*SlangAudioButton/);
    expect(phraseCards).not.toMatch(/<button[\s\S]*SlangAudioButton/);
    // Audio button is wrapped in a data-no-flip container so taps on it
    // don't bubble into a card flip.
    expect(slangDeck).toContain("data-no-flip");
    expect(phraseCards).toContain("data-no-flip");
  });

  it("Deck gates its 3D flip animation on prefers-reduced-motion", () => {
    const css = src("src/components/learn/FlashcardDeck.module.css");
    // The flip transition lives inside a prefers-reduced-motion:no-preference
    // block so reduced-motion users get a state toggle only — no 3D spin.
    const idx = css.indexOf("prefers-reduced-motion: no-preference");
    expect(idx).toBeGreaterThan(-1);
    // The reduce fallback cross-fades the faces so the back content is
    // still reachable without the rotateY transform.
    expect(css).toContain("prefers-reduced-motion: reduce");
    // The fcInner transition rule is NOT at the top level — it must be
    // guarded by a motion query.
    const top = css.split("@media")[0] ?? "";
    expect(top).not.toMatch(/\.fcInner\s*\{[^}]*transition:/);
  });

  it("Deck supports ArrowLeft / ArrowRight nav and Space / Enter flip", () => {
    const file = src("src/components/learn/FlashcardDeck.tsx");
    // The keydown handler branches on the four shortcuts.
    expect(file).toMatch(/e\.key\s*===\s*["']ArrowLeft["']/);
    expect(file).toMatch(/e\.key\s*===\s*["']ArrowRight["']/);
    expect(file).toMatch(/e\.key\s*===\s*["'] ["']/);
    expect(file).toMatch(/e\.key\s*===\s*["']Enter["']/);
  });

  it("Deck CSS uses design-system tokens only (no raw hex outside tokens.css)", () => {
    const css = src("src/components/learn/FlashcardDeck.module.css");
    // The only raw numeric values that should appear are rgba() channels
    // that already live in the extension CSS (the radial-gradient tint
    // colors are a one-to-one copy from the design reference and match
    // the extension exactly). Wave 12C added a `#fff` on the primary pill
    // because the extension's filled brand pill uses white text — this is
    // allowed (pure white, not a brand hex).
    expect(css).toContain("var(--fl-");
    const bareHex = (css.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).filter(
      (h) => h.toLowerCase() !== "#fff" && h.toLowerCase() !== "#ffffff",
    );
    expect(bareHex).toEqual([]);
  });
});

describe("Wave 12C — Tiny Lessons parity + fix", () => {
  it("Picker CSS matches the extension's .sit-grid + .sit-tile exactly", () => {
    const css = src("app/learn/tiny-lessons/tinyLessons.module.css");
    // 4-col default, 2-col @ 880px, 1-col @ 480px — bytes we care about:
    expect(css).toMatch(/grid-template-columns:\s*repeat\(4,\s*1fr\)/);
    expect(css).toMatch(
      /@media\s*\(max-width:\s*880px\)\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*480px\)\s*\{[^}]*grid-template-columns:\s*1fr/,
    );
    // Tile emoji & typography (per the extension's .s-emoji, .s-title, .s-sub, .s-count)
    expect(css).toMatch(/\.sitEmoji\s*\{[^}]*font-size:\s*50px/);
    expect(css).toMatch(/\.sitTitle\s*\{[^}]*font-size:\s*17px[\s\S]*?font-weight:\s*700/);
    expect(css).toMatch(/\.sitTitle\s*\{[^}]*letter-spacing:\s*-0\.01em/);
    expect(css).toMatch(/\.sitSub\s*\{[^}]*font-size:\s*11\.5px[\s\S]*?font-weight:\s*500/);
    expect(css).toMatch(/\.sitCount\s*\{[^}]*font-size:\s*12px/);
    expect(css).toMatch(/\.sitCount\s*\{[^}]*display:\s*inline-flex/);
    expect(css).toMatch(/\.sitCount\s*\{[^}]*gap:\s*6px/);
  });

  it("Picker emoji bounce lives inside prefers-reduced-motion: no-preference", () => {
    const css = src("app/learn/tiny-lessons/tinyLessons.module.css");
    const idx = css.indexOf("prefers-reduced-motion: no-preference");
    expect(idx).toBeGreaterThan(-1);
    const motionBlock = css.slice(idx);
    expect(motionBlock).toMatch(/\.sitTile:hover\s+\.sitEmoji\s*\{[^}]*transform:\s*scale\(1\.14\)/);
  });

  it("Deck Next button is promoted to the primary (filled) pill", () => {
    const tsx = src("src/components/learn/FlashcardDeck.tsx");
    const css = src("src/components/learn/FlashcardDeck.module.css");
    // The Next <button> now applies the new navBtnPrimary modifier.
    const nextBlock = tsx.slice(
      tsx.indexOf('data-testid="deck-next"') - 400,
      tsx.indexOf('data-testid="deck-next"') + 100,
    );
    expect(nextBlock).toContain("navBtnPrimary");
    // The Prev button stays on the secondary (base) pill — no primary class.
    const prevBlock = tsx.slice(
      tsx.indexOf('data-testid="deck-prev"') - 400,
      tsx.indexOf('data-testid="deck-prev"') + 100,
    );
    expect(prevBlock).not.toContain("navBtnPrimary");
    // The primary pill style exists and uses the brand accent gradient.
    expect(css).toMatch(/\.navBtnPrimary\s*\{[\s\S]*?linear-gradient[\s\S]*?var\(--fl-accent\)/);
  });

  it("Tiny Lessons front face carries a 🔊 audio button in a data-no-flip wrapper", () => {
    const file = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    const frontIdx = file.indexOf("front: (");
    const backIdx = file.indexOf("back: (", frontIdx);
    expect(frontIdx).toBeGreaterThan(-1);
    expect(backIdx).toBeGreaterThan(frontIdx);
    const frontBlock = file.slice(frontIdx, backIdx);
    // Front face mounts SlangAudioButton inside a data-no-flip wrapper.
    expect(frontBlock).toContain("SlangAudioButton");
    expect(frontBlock).toContain("data-no-flip");
    expect(frontBlock).toContain("fcFrontAudio");
  });

  it("Hint lines render a hand-tap SVG next to the 'Tap …' text", () => {
    const file = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    // After the 12B/12C merge, the icon is a shared `TapHintIcon` constant
    // (not a `TapIcon` component). Both faces reference it inside .fcHint.
    expect(file).toContain("TapHintIcon");
    const occurrences = (file.match(/\{TapHintIcon\}/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(2);
    expect(file).toMatch(/className=\{fc\.fcHint\}>[\s\S]*?\{TapHintIcon\}/);
  });

  it("CSS reserves the extension's `.fc-hint svg` 13×13 size for the TapIcon", () => {
    const css = src("src/components/learn/FlashcardDeck.module.css");
    // Mirrors the extension's `.fc-hint svg{width:13px;height:13px;opacity:0.8}`.
    expect(css).toMatch(
      /\.fcHint svg,\s*\.fcHintIcon\s*\{[^}]*width:\s*13px[^}]*height:\s*13px[^}]*opacity:\s*0\.8/,
    );
  });

  it("Back face shows usage directly below meaning, then literal, then divider, then audio", () => {
    const file = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    const backStart = file.indexOf("back: (");
    const backEnd = file.indexOf(",\n      })),", backStart);
    const backBlock = file.slice(backStart, backEnd > backStart ? backEnd : file.length);
    const meanIdx = backBlock.indexOf("bMean");
    const usageIdx = backBlock.indexOf("bUsage");
    const literalIdx = backBlock.indexOf("bLiteral");
    const dividerIdx = backBlock.indexOf("bDivider");
    const audioIdx = backBlock.indexOf("bAudioRow");
    expect(meanIdx).toBeGreaterThan(-1);
    expect(usageIdx).toBeGreaterThan(meanIdx);
    expect(literalIdx).toBeGreaterThan(usageIdx);
    expect(dividerIdx).toBeGreaterThan(literalIdx);
    expect(audioIdx).toBeGreaterThan(dividerIdx);
  });

  it("Literal line renders as 'Literally: …' in italic muted (via bLiteral)", () => {
    const tsx = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    const css = src("src/components/learn/FlashcardDeck.module.css");
    expect(tsx).toMatch(/className=\{fc\.bLiteral\}>\{t\("deck\.literally"/);
    expect(en["deck.literally"]).toBe("Literally: {text}");
    const literalRule = css.match(/\.bLiteral\s*\{([^}]*)\}/);
    expect(literalRule, "bLiteral style not found").not.toBeNull();
    expect(literalRule![1]).toMatch(/font-style:\s*italic/);
    expect(literalRule![1]).toMatch(/color:\s*var\(--fl-text-3\)/);
  });

  it("Counter format is 'N / M in <SituationTitle>' when a situation title is passed", () => {
    // Wave 14: the deck composes "N / M in <title>" through the catalog
    // (`deck.counterIn`) so word order can vary per locale; PhraseCards
    // hands it the situation title via `counterContext`.
    const deck = src("src/components/learn/FlashcardDeck.tsx");
    expect(deck).toMatch(/counterContext\s*\n?\s*\?\s*t\("deck\.counterIn",\s*\{\s*\.\.\.counterParams,\s*situation:\s*counterContext\s*\}\)/);
    expect(deck).toMatch(/counterParams\s*=\s*\{\s*current:\s*safeIndex\s*\+\s*1,\s*total\s*\}/);
    expect(en["deck.counterIn"]).toBe("{current} / {total} in {situation}");
    const page = src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx");
    expect(page).toContain("counterContext={situationTitle}");
  });

  it("Still no <button>-in-<button>: audio stays wrapped in data-no-flip, not a native button", () => {
    const stripComments = (s: string) =>
      s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const phraseCards = stripComments(
      src("app/learn/tiny-lessons/[situation]/PhraseCards.tsx"),
    );
    // Neither the FRONT audio row nor the BACK audio row sits inside a
    // native <button>. (The deck trigger is <div role="button"> — see the
    // Wave 10 test above — and the audio button is itself a <button>.)
    expect(phraseCards).not.toMatch(/<button[\s\S]*SlangAudioButton/);
    // Both audio mounts carry data-no-flip so a tap on 🔊 never flips the
    // card.
    const noFlipCount = (phraseCards.match(/data-no-flip/g) ?? []).length;
    expect(noFlipCount).toBeGreaterThanOrEqual(2);
  });
});
