import { describe, it, expect } from "vitest";
import * as clientModule from "@/server/ai/client";

/**
 * Guard rail: the raw Groq client must NEVER be exported from
 * `src/server/ai/client.ts`. Any lane that imports the raw client bypasses
 * cost caps, the content-filter pass in `invokeJson`/`invokeStream`, and the
 * `Confidential<T>` boundary that keeps caption text out of persistent state.
 *
 * If this test fails, the fix is to funnel the new usage through
 * `src/server/ai/invoke.ts`, not to loosen the assertion.
 */
describe("src/server/ai/client", () => {
  it("does not export the raw `groq` client", () => {
    expect((clientModule as Record<string, unknown>).groq).toBeUndefined();
    expect(Object.keys(clientModule)).not.toContain("groq");
  });

  it("still exports the model-id constants", () => {
    expect(clientModule.MODEL_SMART).toBe("llama-3.3-70b-versatile");
    expect(clientModule.MODEL_FAST).toBe("llama-3.1-8b-instant");
  });
});
