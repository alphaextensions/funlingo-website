/**
 * Word pronunciation for the Watch word card (Wave 16).
 *
 * Port of the extension's `funlingo-instant-tts.js`: browser speechSynthesis
 * with the same voice scoring (also used by `SlangAudioButton`). Only ever
 * speaks a single tapped WORD or short phrase — never a caption line
 * (LEGAL #1 bans TTS read-outs of subtitle tracks).
 */

import { normalizeToBCP47 } from "@/lib/i18n/speechLang";

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function scoreVoice(voice: SpeechSynthesisVoice, target: string): number {
  const vlang = (voice.lang || "").toLowerCase();
  const vprimary = vlang.split("-")[0] ?? vlang;
  const tprimary = target.toLowerCase().split("-")[0] ?? target.toLowerCase();
  if (vprimary !== tprimary) return -Infinity;
  const name = (voice.name || "").toLowerCase();
  let score = 0;
  if (vlang === target.toLowerCase()) score += 6;
  if (/google|natural|neural|online|premium|enhanced/.test(name)) score += 16;
  if (/microsoft/.test(name)) score += 8;
  if (voice.localService === false) score += 4;
  if (voice.default) score += 3;
  if (/compact|eloquence|novelty|espeak/.test(name)) score -= 20;
  return score;
}

/** Voices for a learning language, best first. */
export function voicesFor(lang: string): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  const target = normalizeToBCP47(lang);
  let all: SpeechSynthesisVoice[] = [];
  try {
    all = window.speechSynthesis.getVoices() ?? [];
  } catch {
    all = [];
  }
  return all
    .map((v) => ({ v, s: scoreVoice(v, target) }))
    .filter((x) => x.s > -Infinity)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.v);
}

export function resolveVoice(lang: string, pref: string): SpeechSynthesisVoice | null {
  const list = voicesFor(lang);
  if (pref && pref !== "auto") {
    const named = list.find((v) => v.name === pref);
    if (named) return named;
  }
  return list[0] ?? null;
}

/** Speak a word. Resolves when speech ends (or immediately if unsupported). */
export function speakWord(text: string, lang: string, voicePref = "auto"): Promise<void> {
  if (!ttsSupported() || !text.trim()) return Promise.resolve();
  return new Promise((resolve) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.slice(0, 80));
      const target = normalizeToBCP47(lang);
      const voice = resolveVoice(lang, voicePref);
      u.lang = voice?.lang || target;
      if (voice) u.voice = voice;
      u.rate = 0.95;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
      // Safety net — some engines never fire onend.
      setTimeout(resolve, 4000);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking(): void {
  try {
    if (ttsSupported()) window.speechSynthesis.cancel();
  } catch {
    /* noop */
  }
}
