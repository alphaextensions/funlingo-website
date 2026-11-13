import { describe, it, expect } from "vitest";
import {
  markConfidential,
  isConfidential,
  unwrapConfidential,
} from "@/server/types/confidential";
import { __test__ } from "@/server/logging/scrubber";

describe("Confidential<T>", () => {
  it("brands and unwraps a string", () => {
    const line = markConfidential("Same old, same old.");
    expect(unwrapConfidential(line)).toBe("Same old, same old.");
  });

  it("brands objects at runtime so the scrubber can see them", () => {
    const payload = markConfidential({ caption: "secret" });
    expect(isConfidential(payload)).toBe(true);
  });
});

describe("logger scrubber", () => {
  it("redacts a branded value anywhere in the payload", () => {
    const line = markConfidential({ text: "hello" });
    const scrubbed = __test__.scrub({ ok: true, line });
    expect(scrubbed).toEqual({ ok: true, line: __test__.REDACTED });
  });

  it("leaves plain data untouched", () => {
    const scrubbed = __test__.scrub({ ok: true, count: 3, nested: { a: 1 } });
    expect(scrubbed).toEqual({ ok: true, count: 3, nested: { a: 1 } });
  });
});
