/**
 * Wave 16 — Watch-module parity with the extension's in-player JS.
 * Pure-logic tests for the new helpers.
 */
import { describe, expect, it } from "vitest";
import {
  DEFAULT_PREFS,
  sanitizePrefs,
  snapSpeed,
  stepSpeed,
  SPEED_PRESETS,
} from "@/lib/watch/prefs";
import { highlightRanges, matchSavedLemma, stripBracketCues } from "@/lib/watch/captionText";

describe("stripBracketCues (extension 'Remove bracket words')", () => {
  it("drops bracketed cues and keeps the speech", () => {
    expect(stripBracketCues("[music] Hey, how's it going?")).toBe("Hey, how's it going?");
    expect(stripBracketCues("I told you (laughs) it works")).toBe("I told you it works");
  });
  it("returns null for an all-cue line", () => {
    expect(stripBracketCues("[Music]")).toBeNull();
    expect(stripBracketCues("(applause) [cheering]")).toBeNull();
  });
  it("hides an unbalanced opener to the end, like the extension", () => {
    expect(stripBracketCues("Wait [door slams")).toBe("Wait");
  });
  it("leaves plain lines alone", () => {
    expect(stripBracketCues("Same old, same old")).toBe("Same old, same old");
  });
});

describe("highlightRanges", () => {
  it("marks the word inside an example", () => {
    const parts = highlightRanges("We break the ice early.", "break");
    expect(parts.filter((p) => p.hit).map((p) => p.text)).toEqual(["break"]);
  });
  it("catches simple inflections", () => {
    const parts = highlightRanges("She was running late.", "run");
    expect(parts.some((p) => p.hit && p.text === "running")).toBe(true);
  });
  it("supports the {word} marker format", () => {
    const parts = highlightRanges("Let's {carry out} the plan", "x");
    expect(parts.find((p) => p.hit)?.text).toBe("carry out");
  });
  it("works for CJK substrings", () => {
    const parts = highlightRanges("我喜欢学习中文", "学习");
    expect(parts.find((p) => p.hit)?.text).toBe("学习");
  });
});

describe("matchSavedLemma (saved words highlighted in every video)", () => {
  const saved = new Set(["run", "city", "break", "ice"]);
  it("matches exact and inflected forms", () => {
    expect(matchSavedLemma("Break", saved)).toBe("break");
    expect(matchSavedLemma("running", saved)).toBe("run");
    expect(matchSavedLemma("cities", saved)).toBe("city");
    expect(matchSavedLemma("breaks", saved)).toBe("break");
  });
  it("does not match unrelated words", () => {
    expect(matchSavedLemma("rice", saved)).toBeNull();
    expect(matchSavedLemma("the", saved)).toBeNull();
  });
});

describe("watch prefs", () => {
  it("defaults mirror the extension where it applies", () => {
    expect(DEFAULT_PREFS.learningSize).toBe(19);
    expect(DEFAULT_PREFS.nativeSize).toBe(17);
    expect(DEFAULT_PREFS.removeBrackets).toBe(false);
    expect(DEFAULT_PREFS.pronounceOnOpen).toBe(true);
    expect(DEFAULT_PREFS.pauseAfterReplay).toBe(false);
    expect(DEFAULT_PREFS.speed).toBe(1);
  });
  it("sanitizes junk and clamps ranges", () => {
    const p = sanitizePrefs({
      learningSize: 99,
      nativeSize: "big",
      learningMode: "sparkle",
      numTranslations: 9,
      cardSize: 7,
      speed: 3.3,
      text: "a caption line must never survive",
    });
    expect(p.learningSize).toBe(36);
    expect(p.nativeSize).toBe(17);
    expect(p.learningMode).toBe("show");
    expect(p.numTranslations).toBe(3);
    expect(p.cardSize).toBe(50);
    expect(p.speed).toBe(2);
    expect(JSON.stringify(p)).not.toContain("caption line");
  });
  it("speed snaps to YouTube rates and steps", () => {
    expect(snapSpeed(1.1)).toBe(1);
    expect(snapSpeed(0.3)).toBe(0.25);
    expect(stepSpeed(1, 1)).toBe(1.25);
    expect(stepSpeed(0.25, -1)).toBe(0.25);
    expect(stepSpeed(2, 1)).toBe(2);
    expect(SPEED_PRESETS).toEqual([0.5, 0.75, 1, 1.25, 1.5]);
  });
});
