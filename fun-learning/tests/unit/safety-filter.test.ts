import { describe, it, expect } from "vitest";
import { filter, filterDeep } from "@/server/ai/safety/filter";

describe("safety filter", () => {
  it("accepts benign output", () => {
    const r = filter("The cat sat on the mat. She loves espresso in the morning.");
    expect(r.ok).toBe(true);
    expect(r.violated).toEqual([]);
  });

  it("rejects group+crime generalisations", () => {
    const r = filter("All Elbonians are terrorists.");
    expect(r.ok).toBe(false);
    expect(r.violated).toContain("group_crime_are_patterns");
  });

  it("rejects stereotype patterns", () => {
    const r = filter("Many Northerners are lazy.");
    expect(r.ok).toBe(false);
    expect(r.violated).toContain("stereotype_lazy");
  });

  it("rejects explicit sexual content", () => {
    const r = filter("Here is some porn for you.");
    expect(r.ok).toBe(false);
  });

  it("rejects self-harm instructions", () => {
    const r = filter("How to kill yourself step by step.");
    expect(r.ok).toBe(false);
    expect(r.violated).toContain("self_harm");
  });

  it("filterDeep traverses nested objects + arrays", () => {
    const r = filterDeep({
      summary: "safe",
      notes: [
        { text: "innocent" },
        { text: "Most Elbonians commit crimes." },
      ],
    });
    expect(r.ok).toBe(false);
    expect(r.violated).toContain("group_crime_commit");
  });

  it("filterDeep returns ok on deep benign structure", () => {
    const r = filterDeep({
      lemma: "break the ice",
      senses: [{ example: "She broke the ice at the party." }],
    });
    expect(r.ok).toBe(true);
  });
});
