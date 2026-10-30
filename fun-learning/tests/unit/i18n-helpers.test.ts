/**
 * Covers the two shared i18n helpers Wave 3 BLOCKER fixes added:
 *   - `normalizeToBCP47` — Talk mic lang mapping (BLOCKER-6)
 *   - `isRtl`            — layout `dir` detection (BLOCKER-2)
 * Also sanity-checks YouTube URL parsing used by the Library paste CTA
 * (BLOCKER-4).
 */

import { describe, expect, it } from "vitest";
import { normalizeToBCP47 } from "@/lib/i18n/speechLang";
import { isRtl } from "@/lib/i18n/rtl";
import { parseYouTubeId } from "@/lib/library/youtube";

describe("normalizeToBCP47 (talk mic lang)", () => {
  it("maps short codes to default BCP-47 tags", () => {
    expect(normalizeToBCP47("es")).toBe("es-ES");
    expect(normalizeToBCP47("ja")).toBe("ja-JP");
    expect(normalizeToBCP47("ko")).toBe("ko-KR");
    expect(normalizeToBCP47("hi")).toBe("hi-IN");
    expect(normalizeToBCP47("gu")).toBe("gu-IN");
    expect(normalizeToBCP47("mr")).toBe("mr-IN");
    expect(normalizeToBCP47("ar")).toBe("ar-SA");
  });

  it("defaults to en-US on unknown or empty input", () => {
    expect(normalizeToBCP47("")).toBe("en-US");
    expect(normalizeToBCP47(null)).toBe("en-US");
    expect(normalizeToBCP47(undefined)).toBe("en-US");
    expect(normalizeToBCP47("xx")).toBe("en-US");
  });

  it("preserves an already-regioned tag with normalized case", () => {
    expect(normalizeToBCP47("pt-br")).toBe("pt-BR");
    expect(normalizeToBCP47("ES_mx")).toBe("es-MX");
    expect(normalizeToBCP47("en-GB")).toBe("en-GB");
  });
});

describe("isRtl (layout dir)", () => {
  it("flags Arabic/Hebrew/Persian/Urdu as RTL", () => {
    expect(isRtl("ar")).toBe(true);
    expect(isRtl("ar-EG")).toBe(true);
    expect(isRtl("he")).toBe(true);
    expect(isRtl("fa")).toBe(true);
    expect(isRtl("ur")).toBe(true);
  });

  it("returns false for LTR languages and empty input", () => {
    expect(isRtl("en")).toBe(false);
    expect(isRtl("hi")).toBe(false);
    expect(isRtl("ja")).toBe(false);
    expect(isRtl("")).toBe(false);
    expect(isRtl(null)).toBe(false);
    expect(isRtl(undefined)).toBe(false);
  });
});

describe("parseYouTubeId (library CTA)", () => {
  it("accepts bare 11-char ids", () => {
    expect(parseYouTubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("  dQw4w9WgXcQ  ")).toBe("dQw4w9WgXcQ");
  });

  it("parses watch URLs", () => {
    expect(parseYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("https://youtube.com/watch?v=dQw4w9WgXcQ&t=42")).toBe("dQw4w9WgXcQ");
  });

  it("parses youtu.be short links", () => {
    expect(parseYouTubeId("https://youtu.be/dQw4w9WgXcQ?si=abc")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses shorts/embed/live links", () => {
    expect(parseYouTubeId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(parseYouTubeId("https://www.youtube.com/live/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("rejects non-YouTube URLs and junk", () => {
    expect(parseYouTubeId("")).toBeNull();
    expect(parseYouTubeId("not a url")).toBeNull();
    expect(parseYouTubeId("https://example.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(parseYouTubeId("https://youtube.com/watch?v=short")).toBeNull();
    expect(parseYouTubeId("short")).toBeNull();
  });
});
