"use client";

/**
 * FeedbackSettings — Wave 15 port of the extension's settings drawer
 * (learn.html `#drawer`): "Audio & feedback" (Sound effects, Haptics, Voice)
 * and "Motion & display" (Animations, RTL preview).
 *
 * Reads/writes the shared feedback-prefs store, which persists to
 * Prefs.json via /api/settings when signed in and to localStorage when
 * signed out. Like the extension's `Me()` toggle handler, every change ends
 * with `fx.tap()` — so turning Sound ON confirms itself with a click, and
 * turning it OFF is silent.
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getFeedbackPrefs,
  setFeedbackPrefs,
  subscribeFeedbackPrefs,
  DEFAULT_FEEDBACK_PREFS,
  type FeedbackPrefs,
} from "@/lib/feedback/prefs";
import { fx } from "@/lib/feedback";
import { canVibrate } from "@/lib/feedback/haptics";
import { useT } from "@/lib/i18n/client";
import styles from "./Settings.module.css";

function useFeedbackPrefs(): FeedbackPrefs {
  return useSyncExternalStore(
    subscribeFeedbackPrefs,
    getFeedbackPrefs,
    () => DEFAULT_FEEDBACK_PREFS as FeedbackPrefs,
  );
}

/** Same ordering as slang-audio.js `h()`: natural/neural voices first, then A→Z. */
export function sortVoices<T extends { name: string }>(voices: T[]): T[] {
  const natural = (n: string) => /natural|neural|premium|enhanced/i.test(n || "");
  return voices.slice().sort((a, b) => {
    const na = natural(a.name);
    const nb = natural(b.name);
    if (na !== nb) return na ? -1 : 1;
    return String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" });
  });
}

function langName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function FeedbackSettings({
  learningLang,
  signedIn,
  showVoice = true,
}: {
  learningLang: string;
  signedIn: boolean;
  /** Wave 17 owns a per-language Listen-voice picker; hide this single one there. */
  showVoice?: boolean;
}) {
  const t = useT();
  const prefs = useFeedbackPrefs();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [vibrateOk, setVibrateOk] = useState(true);

  useEffect(() => {
    setVibrateOk(canVibrate());
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
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

  const update = async (patch: Partial<FeedbackPrefs>) => {
    setStatus("idle");
    const p = setFeedbackPrefs(patch);
    fx.tap();
    const ok = await p;
    setStatus(ok ? "saved" : "error");
  };

  const primary = learningLang.toLowerCase().split(/[-_]/)[0];
  const compatible = voices.filter(
    (v) => (v.lang || "").toLowerCase().split(/[-_]/)[0] === primary,
  );
  const sorted = sortVoices(voices);
  const voiceValue = sorted.some((v) => v.name === prefs.voicePref) ? prefs.voicePref : "auto";

  const toggles: Array<{
    key: "sound" | "haptics" | "motion" | "rtl";
    label: string;
    desc: string;
    group: "audio" | "motion";
  }> = [
    { key: "sound", label: t("feedback.soundEffects"), desc: t("feedback.soundEffectsDesc"), group: "audio" },
    {
      key: "haptics",
      label: t("feedback.haptics"),
      desc: vibrateOk ? t("feedback.hapticsDesc") : `${t("feedback.hapticsDesc")}. ${t("feedback.hapticsUnsupported")}`,
      group: "audio",
    },
    { key: "motion", label: t("feedback.animations"), desc: t("feedback.animationsDesc"), group: "motion" },
    { key: "rtl", label: t("feedback.rtlPreview"), desc: t("feedback.rtlPreviewDesc"), group: "motion" },
  ];

  const renderToggle = (t: (typeof toggles)[number]) => (
    <div className={styles.field} key={t.key}>
      <span className={styles.fLabel} id={`fx-${t.key}-label`}>{t.label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          role="switch"
          className={styles.toggle}
          aria-checked={prefs[t.key]}
          aria-labelledby={`fx-${t.key}-label`}
          data-testid={`fx-toggle-${t.key}`}
          onClick={() => void update({ [t.key]: !prefs[t.key] })}
        />
        <span className={styles.fHint}>{t.desc}</span>
      </div>
    </div>
  );

  return (
    <>
      <section className={styles.group} aria-labelledby="g-feedback" id="g-feedback-section">
        <h3 id="g-feedback" className={styles.groupTitle}>{t("feedback.audioFeedback")}</h3>
        {!signedIn && <p className={styles.groupLede}>{t("feedback.savedOnDevice")}</p>}
        {toggles.filter((t) => t.group === "audio").map(renderToggle)}
        {showVoice && <div className={styles.field}>
          <label htmlFor="fx-voice" className={styles.fLabel}>{t("feedback.voice")}</label>
          <div>
            <select
              id="fx-voice"
              className={styles.fSelect}
              value={voiceValue}
              data-testid="fx-voice"
              onChange={(e) => void update({ voicePref: e.target.value })}
            >
              <option value="auto">{t("feedback.voiceAuto")}</option>
              {compatible.length === 0 && (
                <option value="__funlingo_no_voices" disabled>
                  {t("feedback.voiceEmpty", { lang: langName(primary) })}
                </option>
              )}
              {sorted.map((v) => (
                <option key={`${v.name}-${v.lang}`} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
            <span className={styles.fHint}>{t("feedback.voiceDesc")}</span>
          </div>
        </div>}
      </section>

      <section className={styles.group} aria-labelledby="g-motion">
        <h3 id="g-motion" className={styles.groupTitle}>{t("feedback.motionDisplay")}</h3>
        {toggles.filter((t) => t.group === "motion").map(renderToggle)}
        <span className={styles.fHint} aria-live="polite">
          {status === "saved" ? t("feedback.statusSaved") : status === "error" ? t("feedback.statusSaveFailed") : ""}
        </span>
      </section>
    </>
  );
}
