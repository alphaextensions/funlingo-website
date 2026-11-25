"use client";

import { useEffect, useState, useTransition } from "react";
import { CtaAction } from "@/components/CtaButton";
import { FeedbackSettings } from "./FeedbackSettings";
import { ThemeToggle } from "./ThemeToggle";
import { VoicePicker } from "./VoicePicker";
import type { VoicePrefs } from "@/lib/voice/prefs";
import { useT } from "@/lib/i18n/client";
import styles from "./Settings.module.css";

export interface SettingsSnapshot {
  name: string | null;
  email: string | null;
  nativeLang: string;
  activeLearningLang: string;
  uiLocale: string;
  /**
   * Wave 9 — opt-in to on-device Whisper transcription for Speaking +
   * Shadowing drills. See `src/lib/ai/local-whisper.ts`.
   */
  localPronunciation: boolean;
  /** Wave 17 — Listen-button voice per learning language. */
  voicePrefs: VoicePrefs;
  dailyGoalType: "minutes" | "reviews";
  dailyGoalValue: number;
}

export const UI_LOCALES: Array<{ value: string; label: string }> = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "mr", label: "मराठी" },
  { value: "gu", label: "ગુજરાતી" },
  { value: "ar", label: "العربية" },
  { value: "bn", label: "বাংলা" },
  { value: "ta", label: "தமிழ்" },
  { value: "te", label: "తెలుగు" },
  { value: "pa", label: "ਪੰਜਾਬੀ" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "zh", label: "中文" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "tr", label: "Türkçe" },
];

export const LEARN_LANGS: Array<{ value: string; label: string }> = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "zh", label: "中文" },
  { value: "hi", label: "हिन्दी" },
  { value: "ar", label: "العربية" },
  { value: "pt", label: "Português" },
];

export function SettingsForm({ initial }: { initial: SettingsSnapshot }) {
  const t = useT();
  const [draft, setDraft] = useState<SettingsSnapshot>(initial);
  const [pending, start] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const save = async (patch: Partial<SettingsSnapshot>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    start(async () => {
      try {
        setStatus("idle");
        const res = await fetch("/api/settings", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `settings-${Date.now()}`,
          },
          body: JSON.stringify(next),
        });
        setStatus(res.ok ? "saved" : "error");
      } catch {
        setStatus("error");
      }
    });
  };

  // Wave 9 — detect whether the browser can actually run on-device Whisper.
  // We check in a `useEffect` so SSR output stays stable (the toggle starts
  // enabled on the server; the client disables it after mount if WASM is
  // unavailable). Keeps the UI consistent and avoids hydration churn.
  const [onDeviceSupported, setOnDeviceSupported] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supported =
      typeof WebAssembly !== "undefined" && typeof Worker !== "undefined";
    setOnDeviceSupported(supported);
  }, []);

  const toggleLocalPronunciation = () => {
    if (!onDeviceSupported) return;
    const next = !draft.localPronunciation;
    save({ localPronunciation: next });
  };

  return (
    <>
      <section className={styles.group} aria-labelledby="g-account">
        <h3 id="g-account" className={styles.groupTitle}>{t("settings.accountTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.accountLede")}</p>
        <div className={styles.field}>
          <label htmlFor="s-name" className={styles.fLabel}>{t("settings.name")}</label>
          <input
            id="s-name"
            className={styles.fInput}
            value={draft.name ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            onBlur={() => save({ name: draft.name })}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fLabel}>{t("settings.email")}</label>
          <div>
            <input className={styles.fInput} value={draft.email ?? ""} readOnly />
            <span className={styles.fHint}>{t("settings.emailHint")}</span>
          </div>
        </div>
      </section>

      <section className={styles.group} aria-labelledby="g-langs">
        <h3 id="g-langs" className={styles.groupTitle}>{t("settings.languagesTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.languagesLede")}</p>
        <div className={styles.field}>
          <label htmlFor="s-native" className={styles.fLabel}>{t("settings.nativeLanguage")}</label>
          <select
            id="s-native"
            className={styles.fSelect}
            value={draft.nativeLang}
            onChange={(e) => save({ nativeLang: e.target.value })}
          >
            {UI_LOCALES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="s-learn" className={styles.fLabel}>{t("settings.learningLanguage")}</label>
          <div>
            <select
              id="s-learn"
              className={styles.fSelect}
              value={draft.activeLearningLang}
              onChange={(e) => save({ activeLearningLang: e.target.value })}
            >
              {LEARN_LANGS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className={styles.fHint}>{t("settings.learningHint")}</span>
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="s-ui" className={styles.fLabel}>{t("settings.interface")}</label>
          <select
            id="s-ui"
            className={styles.fSelect}
            value={draft.uiLocale}
            onChange={(e) => save({ uiLocale: e.target.value })}
          >
            {UI_LOCALES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        {/* Wave 18 — reopen the /welcome first-run onboarding. */}
        <div className={styles.field}>
          <span className={styles.fLabel}>{t("settings.welcomeSetup")}</span>
          <div>
            <a className={` `} href="/welcome">{t("settings.runWelcome")}</a>
            <span className={styles.fHint}>{t("settings.welcomeSetupHint")}</span>
          </div>
        </div>
      </section>

      <section className={styles.group} aria-labelledby="g-goal">
        <h3 id="g-goal" className={styles.groupTitle}>{t("settings.goalTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.goalLede")}</p>
        <div className={styles.field}>
          <label className={styles.fLabel}>{t("settings.goalType")}</label>
          <select
            className={styles.fSelect}
            value={draft.dailyGoalType}
            onChange={(e) => save({ dailyGoalType: e.target.value as "minutes" | "reviews" })}
          >
            <option value="reviews">{t("settings.goalReviews")}</option>
            <option value="minutes">{t("settings.goalMinutes")}</option>
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.fLabel}>{t("settings.goalTarget")}</label>
          <input
            type="number"
            min={1}
            max={400}
            className={styles.fInput}
            value={draft.dailyGoalValue}
            onChange={(e) => setDraft((d) => ({ ...d, dailyGoalValue: Number(e.target.value || 0) }))}
            onBlur={() => save({ dailyGoalValue: draft.dailyGoalValue })}
          />
        </div>
      </section>

      <section className={styles.group} aria-labelledby="g-appearance">
        <h3 id="g-appearance" className={styles.groupTitle}>{t("settings.appearance")}</h3>
        <p className={styles.groupLede}>{t("settings.appearanceLede")}</p>
        <div className={styles.field}>
          <span className={styles.fLabel}>{t("settings.theme")}</span>
          <ThemeToggle />
          <span className={styles.fHint}>{t("settings.themeHint")}</span>
        </div>
      </section>

      {/* Wave 15 — Sound, Haptics, Animations, RTL. Voice is handled by the
          Wave 17 per-language VoicePicker below, so hide the single one here. */}
      <FeedbackSettings learningLang={draft.activeLearningLang} signedIn showVoice={false} />
      <section className={styles.group} aria-labelledby="g-voice">
        <h3 id="g-voice" className={styles.groupTitle}>{t("settings.voiceTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.voiceLede")}</p>
        <VoicePicker
          learningLang={draft.activeLearningLang}
          serverPrefs={initial.voicePrefs}
          onChange={(voicePrefs) => save({ voicePrefs })}
        />
      </section>

      <section className={styles.group} aria-labelledby="g-experimental">
        <h3 id="g-experimental" className={styles.groupTitle}>{t("settings.experimentalTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.experimentalLede")}</p>
        <div className={styles.field}>
          <span className={styles.fLabel}>{t("settings.onDevice")}</span>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <button
              type="button"
              className={styles.toggle}
              aria-pressed={draft.localPronunciation && onDeviceSupported}
              aria-label={t("settings.onDeviceAria")}
              aria-disabled={!onDeviceSupported}
              disabled={!onDeviceSupported}
              onClick={toggleLocalPronunciation}
              title={onDeviceSupported ? undefined : t("settings.onDeviceUnsupported")}
            />
            <span className={styles.fHint}>
              {onDeviceSupported ? t("settings.onDeviceHint") : t("settings.onDeviceUnsupported")}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.group} aria-labelledby="g-shortcuts">
        <h3 id="g-shortcuts" className={styles.groupTitle}>{t("settings.shortcutsTitle")}</h3>
        <p className={styles.groupLede}>
          {t("settings.shortcutsLedePre")} <span className={styles.kbd}>g</span>{" "}
          {t("settings.shortcutsLedePost")}
        </p>
        <table className={styles.shortcutTable}>
          <tbody>
            <tr><td>{t("nav.railHome")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>h</span></td></tr>
            <tr><td>{t("nav.railLibrary")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>l</span></td></tr>
            <tr><td>{t("nav.railWords")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>w</span></td></tr>
            <tr><td>{t("nav.railSentences")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>s</span></td></tr>
            <tr><td>{t("nav.railReview")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>r</span></td></tr>
            <tr><td>{t("nav.railTalk")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>t</span></td></tr>
            <tr><td>{t("nav.railRead")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>d</span></td></tr>
            <tr><td>{t("nav.railProgress")}</td><td><span className={styles.kbd}>g</span> <span className={styles.kbd}>p</span></td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.group} aria-labelledby="g-data">
        <h3 id="g-data" className={styles.groupTitle}>{t("settings.dataTitle")}</h3>
        <p className={styles.groupLede}>{t("settings.dataLede")}</p>
        <div className={styles.actions}>
          <a className={styles.btn} href="/api/export?format=csv">{t("settings.exportCsv")}</a>
          <a className={styles.btn} href="/api/export?format=json">{t("settings.exportJson")}</a>
          <CtaAction
            variant="danger"
            onClick={() => {
              if (typeof window === "undefined") return;
              if (!window.confirm(t("settings.deleteConfirm"))) return;
              void fetch("/api/account/delete", {
                method: "POST",
                headers: { "idempotency-key": `del-${Date.now()}` },
              }).then((r) => {
                if (r.ok) window.location.href = "/";
              });
            }}
          >
            {t("settings.deleteData")}
          </CtaAction>
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--fl-text-3)" }} aria-live="polite">
          {pending ? t("settings.statusSaving") : status === "saved" ? t("settings.statusSaved") : status === "error" ? t("settings.statusSaveFailed") : ""}
        </span>
      </div>
    </>
  );
}
