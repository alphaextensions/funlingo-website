/**
 * Wave 17 — Listen-button voice preference (port of learn.js `voicePref`).
 */

import { describe, expect, it } from "vitest";
import { preferredVoice, sanitizeVoicePrefs } from "@/lib/voice/prefs";

const v = (name: string, lang: string) =>
  ({ name, lang, voiceURI: name, localService: true, default: false }) as SpeechSynthesisVoice;

describe("voice prefs", () => {
  const voices = [v("Mónica", "es-ES"), v("Kyoko", "ja-JP"), v("Samantha", "en-US")];

  it("uses the saved voice for that language only", () => {
    const prefs = { es: "Mónica" };
    expect(preferredVoice(voices, "es-MX", prefs)?.name).toBe("Mónica");
    expect(preferredVoice(voices, "ja", prefs)).toBeNull();
  });

  it("ignores a saved voice that speaks another language (extension bug)", () => {
    expect(preferredVoice(voices, "ja-JP", { ja: "Mónica" })).toBeNull();
  });

  it("falls back to auto when the voice isn't installed", () => {
    expect(preferredVoice(voices, "es", { es: "Paulina" })).toBeNull();
  });

  it("sanitizes junk and drops 'auto'", () => {
    expect(
      sanitizeVoicePrefs({ es: "Mónica", ja: "auto", "x-bad": "a", en: 5, fr: "  " }),
    ).toEqual({ es: "Mónica" });
    expect(sanitizeVoicePrefs(null)).toEqual({});
  });
});
