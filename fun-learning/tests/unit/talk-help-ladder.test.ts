import { describe, it, expect } from "vitest";
import {
  advanceHelp,
  helpContentFor,
  initialHelpState,
  resetHelp,
  HELP_LADDER_MAX,
  helpLabel,
} from "@/lib/talk/helpLadder";

describe("Talk help ladder", () => {
  const sample = {
    suggestion: "A small espresso to go, please.",
    hint: "Something short and polite.",
    reason: "Opens the exchange on a clear, specific ask.",
  };

  it("starts at level 0 and climbs through 1, 2, 3", () => {
    let s = initialHelpState();
    expect(s.level).toBe(0);
    s = advanceHelp(s);
    expect(s.level).toBe(1);
    s = advanceHelp(s);
    expect(s.level).toBe(2);
    s = advanceHelp(s);
    expect(s.level).toBe(3);
  });

  it("clamps at HELP_LADDER_MAX (3)", () => {
    let s = { level: HELP_LADDER_MAX } as const;
    s = advanceHelp(s);
    expect(s.level).toBe(HELP_LADDER_MAX);
  });

  it("resets back to level 0", () => {
    const reset = resetHelp();
    expect(reset.level).toBe(0);
  });

  it("level 0 shows nothing", () => {
    expect(helpContentFor(0, sample)).toBeNull();
  });

  it("level 1 reveals a hint, not the whole suggestion", () => {
    const payload = helpContentFor(1, sample);
    expect(payload?.title).toBe(helpLabel(1));
    expect(payload?.body).toBe(sample.hint);
    expect(payload?.body).not.toContain(sample.suggestion);
    expect(payload?.reason).toBeUndefined();
  });

  it("level 2 reveals a starter (strictly less than the full suggestion)", () => {
    const payload = helpContentFor(2, sample);
    expect(payload?.title).toBe(helpLabel(2));
    // "A small…" or similar — must not include the final period of the full
    // suggestion.
    expect(payload?.body).toMatch(/…$/);
    expect(payload?.body.length).toBeLessThan(sample.suggestion.length);
    expect(payload?.body).not.toContain("please");
  });

  it("level 3 reveals the full suggestion verbatim + a reason", () => {
    const payload = helpContentFor(3, sample);
    expect(payload?.title).toBe(helpLabel(3));
    expect(payload?.body).toBe(sample.suggestion);
    expect(payload?.reason).toBe(sample.reason);
  });

  it("each level reveals strictly more than the previous", () => {
    const l1 = helpContentFor(1, sample)!.body;
    const l2 = helpContentFor(2, sample)!.body;
    const l3 = helpContentFor(3, sample)!.body;
    // Hint is a *different kind* of info (a style note), so we assert on
    // characters-of-the-actual-suggestion. L2 should contain the first word.
    const firstWord = sample.suggestion.split(" ")[0];
    expect(l2).toContain(firstWord);
    expect(l3).toContain(firstWord);
    // L3 has the final punctuation; L2 does not.
    expect(l3.endsWith(".")).toBe(true);
    expect(l2.endsWith(".")).toBe(false);
    // L1 doesn't leak the full suggestion.
    expect(l1).not.toBe(l3);
  });
});
