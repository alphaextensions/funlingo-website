"use client";

/**
 * Settings › Voice — Wave 17 port of the extension learn.js drawer's
 * "Voice · For Listen buttons" select (`voicePref`, default "Auto (best
 * available)").
 *
 * Lists the browser's installed voices for the active learning language.
 * The choice is stored per language on the server (Prefs.json.voicePrefs)
 * and mirrored to localStorage so every Listen button picks it up.
 */

import { useEffect, useState } from "react";
import { SlangAudioButton } from "@/components/SlangAudioButton";
import {
  VOICE_AUTO,
  primaryLang,
  readVoicePrefs,
  sanitizeVoicePrefs,
  writeVoicePrefs,
  type VoicePrefs,
} from "@/lib/voice/prefs";
import styles from "./Settings.module.css";

/** English copy (Wave 14 owns the catalog — listed in the playbook). */
export const VOICE_STR = {
  label: "Voice",
  auto: "Auto (best available)",
  hint: "Used by every Listen button for this language. Voices come from your browser and device.",
  none: "Your browser has no voices for this language yet, so Listen uses its default.",
  unsupported: "Audio isn't available in this browser.",
  preview: "Hear a sample",
} as const;

const SAMPLE: Record<string, string> = {
  en: "Hey, how's it going?",
  es: "Hola, ¿qué tal?",
  fr: "Salut, ça va ?",
  de: "Hallo, wie geht's?",
  it: "Ciao, come va?",
  pt: "Olá, tudo bem?",
  ja: "こんにちは、元気？",
  ko: "안녕하세요, 잘 지내요?",
  zh: "你好，最近怎么样？",
  hi: "नमस्ते, कैसे हो?",
  ar: "مرحبا، كيف حالك؟",
};

export function VoicePicker({
  learningLang,
  serverPrefs,
  onChange,
}: {
  learningLang: string;
  serverPrefs: VoicePrefs;
  onChange: (next: VoicePrefs) => void;
}) {
  const lang = primaryLang(learningLang);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | null>(null);
  const [prefs, setPrefs] = useState<VoicePrefs>(serverPrefs);
  // Starts true so SSR and first client render match; flips after mount.
  const [supported, setSupported] = useState(true);

  // Server is the source of truth; mirror it into this browser once.
  useEffect(() => {
    const merged = sanitizeVoicePrefs({ ...readVoicePrefs(), ...serverPrefs });
    writeVoicePrefs(merged);
    setPrefs(merged);
  }, [serverPrefs]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      setVoices([]);
      return;
    }
    const refresh = () => {
      try {
        setVoices(window.speechSynthesis.getVoices() ?? []);
      } catch {
        setVoices([]);
      }
    };
    refresh();
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
  }, []);

  const forLang = (voices ?? [])
    .filter((v) => primaryLang(v.lang) === lang)
    .sort((a, b) => a.name.localeCompare(b.name));
  const current = prefs[lang] ?? VOICE_AUTO;
  // A saved voice that isn't installed here still shows, so we never
  // silently claim "Auto" when the learner picked something.
  const missingSaved = current !== VOICE_AUTO && !forLang.some((v) => v.name === current);

  const choose = (name: string) => {
    const next: VoicePrefs = { ...prefs };
    if (name === VOICE_AUTO) delete next[lang];
    else next[lang] = name;
    const clean = sanitizeVoicePrefs(next);
    setPrefs(clean);
    writeVoicePrefs(clean);
    onChange(clean);
  };

  return (
    <div className={styles.field}>
      <label htmlFor="s-voice" className={styles.fLabel}>{VOICE_STR.label}</label>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            id="s-voice"
            className={styles.fSelect}
            value={current}
            onChange={(e) => choose(e.target.value)}
            disabled={!supported}
          >
            <option value={VOICE_AUTO}>{VOICE_STR.auto}</option>
            {missingSaved && <option value={current}>{current}</option>}
            {forLang.map((v) => (
              <option key={v.voiceURI || v.name} value={v.name}>
                {v.name}
                {v.lang ? ` (${v.lang})` : ""}
              </option>
            ))}
          </select>
          <SlangAudioButton
            text={SAMPLE[lang] ?? "Funlingo"}
            lang={learningLang}
            ariaLabel={VOICE_STR.preview}
          />
        </div>
        <span className={styles.fHint}>
          {!supported
            ? VOICE_STR.unsupported
            : voices !== null && forLang.length === 0
              ? VOICE_STR.none
              : VOICE_STR.hint}
        </span>
      </div>
    </div>
  );
}
