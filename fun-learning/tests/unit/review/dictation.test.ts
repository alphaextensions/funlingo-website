/**
 * Dictation diff — the Code QA veto test #3:
 *   "Dictation ignores case/punctuation; hint diff reveals only missing letters."
 */

import { describe, it, expect } from "vitest";
import {
  dictationMatches,
  firstErrorIndex,
  hint,
  normalize,
} from "@/server/review/dictation";

describe("normalize", () => {
  it("strips punctuation and lowercases", () => {
    expect(normalize("Hello, World!")).toBe("hello world");
  });
  it("collapses interior whitespace", () => {
    expect(normalize("  Hello   there  ")).toBe("hello there");
  });
});

describe("dictationMatches", () => {
  it("ignores case", () => {
    expect(dictationMatches("Hello", "hello")).toBe(true);
    expect(dictationMatches("HELLO", "hello")).toBe(true);
  });
  it("ignores punctuation", () => {
    expect(dictationMatches("Hello, world!", "hello world")).toBe(true);
    expect(dictationMatches("hello, world", "hello world!")).toBe(true);
    expect(dictationMatches("don't go.", "dont go")).toBe(true);
  });
  it("still catches real typos", () => {
    expect(dictationMatches("Hello world", "hllo world")).toBe(false);
  });
});

describe("firstErrorIndex", () => {
  it("returns the position of the first wrong character", () => {
    // ref "hello" normalised, typed "helpo" -> error at index 3
    expect(firstErrorIndex("hello", "helpo")).toBe(3);
  });
  it("returns typed.length when correct", () => {
    expect(firstErrorIndex("Hello world", "hello world")).toBe("hello world".length);
  });
  it("skips typed punctuation that doesn't contribute", () => {
    // typed has an extra "," at position 5 — not an error.
    expect(firstErrorIndex("hello world", "hello, world")).toBe("hello, world".length);
  });
  it("flags typing past the end of the reference", () => {
    expect(firstErrorIndex("hi", "hi!!x")).toBe(4);
  });
});

describe("hint", () => {
  it("reveals only letters that are still missing (veto test #3)", () => {
    // ref "hello", typed "he" — hint should be ".llo" (first two letters hidden)
    expect(hint("hello", "he")).toBe("..llo");
  });
  it("reveals the entire word when the user hasn't typed anything", () => {
    expect(hint("hello", "")).toBe("hello");
  });
  it("hides nothing past the first wrong character", () => {
    // typed "hex" — first match is 2 chars (he), so hint is "..llo"
    expect(hint("hello", "hex")).toBe("..llo");
  });
  it("ignores punctuation and case when matching the already-typed prefix", () => {
    // Reference "Hello, World" normalises to "hello world" (len 11).
    // typed "Hello" — correct prefix of length 5 → hint hides those 5 chars.
    expect(hint("Hello, World", "Hello")).toBe("..... world");
  });
});
