import { describe, it, expect } from "vitest";
import { tokenize } from "../../src/lib/watch/tokenize";
import { sha256Hex } from "../../src/lib/watch/hash";

describe("tokenize", () => {
  it("splits a Latin sentence into word and non-word spans", () => {
    const parts = tokenize("Carry out the plan!");
    const words = parts.filter((p) => p.isWord).map((p) => p.word);
    expect(words).toEqual(["Carry", "out", "the", "plan"]);
  });

  it("preserves apostrophes inside words", () => {
    const parts = tokenize("I’ve been better, honestly.");
    const words = parts.filter((p) => p.isWord).map((p) => p.word);
    expect(words).toContain("I’ve");
  });

  it("tokenises CJK as runs of letters", () => {
    const parts = tokenize("今日は映画を見た");
    const words = parts.filter((p) => p.isWord);
    expect(words.length).toBeGreaterThan(0);
  });

  it("handles Devanagari words", () => {
    const parts = tokenize("मैं हिन्दी सीख रहा हूँ");
    const words = parts.filter((p) => p.isWord).map((p) => p.word);
    expect(words).toContain("हिन्दी");
  });
});

describe("sha256Hex (cache key only, never persisted raw text)", () => {
  it("is deterministic for the same input", async () => {
    const a = await sha256Hex("hello world");
    const b = await sha256Hex("hello world");
    expect(a).toBe(b);
    expect(a).toHaveLength(64);
  });
  it("differs for different inputs", async () => {
    const a = await sha256Hex("hello world");
    const b = await sha256Hex("hello world!");
    expect(a).not.toBe(b);
  });
});
