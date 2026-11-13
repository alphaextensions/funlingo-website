/**
 * Wave 9 — unit tests for `wordMatch` + `tokenize`.
 *
 * We care about four invariants:
 *   1. An exact match credits every reference word, no extras, no misses.
 *   2. Missing words show up as `miss` chips in their original order.
 *   3. Extra words show up as `extra` chips without destroying matched ones.
 *   4. Out-of-order speech still credits the words that are there, as long
 *      as a subsequence can be aligned. Word-match is "LCS honest" — it
 *      won't claim perfect order the learner didn't deliver.
 *
 * CJK tokenisation is tested separately because the whitespace path and
 * the Intl.Segmenter path diverge.
 */

import { describe, it, expect } from "vitest";
import { wordMatch, tokenize } from "@/lib/ai/word-match";

describe("tokenize (Latin)", () => {
  it("lowercases + strips punctuation", () => {
    expect(tokenize("Hello, world!", "en")).toEqual(["hello", "world"]);
  });

  it("keeps contractions, strips surrounding apostrophes", () => {
    expect(tokenize("Don't 'quote' me", "en")).toEqual(["don't", "quote", "me"]);
  });

  it("returns an empty list for an empty string", () => {
    expect(tokenize("", "en")).toEqual([]);
    expect(tokenize("   ", "en")).toEqual([]);
  });

  it("handles arabic / devanagari / cyrillic without CJK path", () => {
    expect(tokenize("مرحبا بك", "ar")).toEqual(["مرحبا", "بك"]);
    expect(tokenize("नमस्ते दोस्त", "hi")).toEqual(["नमस्ते", "दोस्त"]);
    expect(tokenize("Привет мир", "ru")).toEqual(["привет", "мир"]);
  });
});

describe("tokenize (CJK)", () => {
  it("segments Japanese via Intl.Segmenter when available", () => {
    // "I'm going to Tokyo." — pronoun + particle + place + verb
    const got = tokenize("私は東京に行きます。", "ja");
    expect(got.length).toBeGreaterThan(2);
    // Should contain Tokyo as a single run or at worst a 2-char run
    const joined = got.join("");
    expect(joined.includes("東京")).toBe(true);
  });

  it("segments Chinese without ever producing whitespace", () => {
    const got = tokenize("我喜欢学习中文", "zh");
    for (const t of got) {
      expect(t.trim()).toBe(t);
      expect(t.length).toBeGreaterThan(0);
    }
  });
});

describe("wordMatch — basic alignment", () => {
  it("perfect match: every ref token is 'match', no extras", () => {
    const got = wordMatch("I love cats", "I love cats", "en");
    expect(got.words.every((w) => w.state === "match")).toBe(true);
    expect(got.matchedCount).toBe(3);
    expect(got.totalCount).toBe(3);
  });

  it("case + punctuation differences are forgiven", () => {
    const got = wordMatch("i, LOVE cats!!", "I love cats", "en");
    expect(got.matchedCount).toBe(3);
    expect(got.totalCount).toBe(3);
    expect(got.words.every((w) => w.state === "match")).toBe(true);
  });

  it("empty transcript: every reference word becomes a miss", () => {
    const got = wordMatch("", "I love cats", "en");
    expect(got.matchedCount).toBe(0);
    expect(got.totalCount).toBe(3);
    expect(got.words).toEqual([
      { word: "i", state: "miss" },
      { word: "love", state: "miss" },
      { word: "cats", state: "miss" },
    ]);
  });

  it("empty reference and non-empty transcript: every word is an extra", () => {
    const got = wordMatch("hello there", "", "en");
    expect(got.matchedCount).toBe(0);
    expect(got.totalCount).toBe(0);
    expect(got.words).toEqual([
      { word: "hello", state: "extra" },
      { word: "there", state: "extra" },
    ]);
  });

  it("missing middle word: marks only the missed token", () => {
    const got = wordMatch("I cats", "I love cats", "en");
    expect(got.matchedCount).toBe(2);
    expect(got.totalCount).toBe(3);
    expect(got.words).toEqual([
      { word: "i", state: "match" },
      { word: "love", state: "miss" },
      { word: "cats", state: "match" },
    ]);
  });

  it("extra filler words at the start: match stays intact", () => {
    const got = wordMatch("um I love cats", "I love cats", "en");
    expect(got.matchedCount).toBe(3);
    expect(got.totalCount).toBe(3);
    expect(got.words[0]).toEqual({ word: "um", state: "extra" });
    expect(got.words.filter((w) => w.state === "match")).toHaveLength(3);
  });

  it("out-of-order speech credits the LCS, flags the rest honestly", () => {
    // reference: "A B C"; learner said: "C A B". LCS is "A B" (length 2).
    // The leading C is an extra, and C from the reference is a miss.
    const got = wordMatch("C A B", "A B C", "en");
    expect(got.matchedCount).toBe(2);
    expect(got.totalCount).toBe(3);
    // Must include at least one "extra" and one "miss" so the UI tells the
    // truth instead of claiming 3/3.
    expect(got.words.some((w) => w.state === "extra")).toBe(true);
    expect(got.words.some((w) => w.state === "miss")).toBe(true);
  });

  it("duplicated word in transcript doesn't inflate matchedCount above refs", () => {
    const got = wordMatch("cats cats cats", "I love cats", "en");
    expect(got.matchedCount).toBeLessThanOrEqual(got.totalCount);
    // Only one of the three "cats" in the transcript may count.
    expect(got.matchedCount).toBe(1);
  });
});

describe("wordMatch — CJK", () => {
  it("japanese partial match credits only the shared tokens", () => {
    // Learner missed the verb at the end.
    const got = wordMatch("私は東京", "私は東京に行きます", "ja");
    expect(got.matchedCount).toBeGreaterThan(0);
    expect(got.matchedCount).toBeLessThan(got.totalCount);
    expect(got.words.some((w) => w.state === "miss")).toBe(true);
  });

  it("chinese perfect match: no misses, no extras", () => {
    const got = wordMatch("我喜欢猫", "我喜欢猫", "zh");
    expect(got.matchedCount).toBe(got.totalCount);
    expect(got.words.every((w) => w.state === "match")).toBe(true);
  });
});

describe("wordMatch — edge cases", () => {
  it("whitespace-only transcript behaves like empty", () => {
    const got = wordMatch("   \n  \t", "hello world", "en");
    expect(got.matchedCount).toBe(0);
    expect(got.words.every((w) => w.state === "miss")).toBe(true);
  });

  it("unknown lang falls through to whitespace tokenisation", () => {
    const got = wordMatch("foo bar", "foo bar", "xx-UNKNOWN");
    expect(got.matchedCount).toBe(2);
  });

  it("very long reference stays bounded (sanity: 50 tokens runs cleanly)", () => {
    const ref = Array.from({ length: 50 }, (_, i) => `w${i}`).join(" ");
    const hyp = Array.from({ length: 50 }, (_, i) => `w${i}`).join(" ");
    const got = wordMatch(hyp, ref, "en");
    expect(got.matchedCount).toBe(50);
    expect(got.totalCount).toBe(50);
  });
});
