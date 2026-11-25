"use client";

/**
 * Wave 16 — web port of the extension's subtitle-settings popup
 * (`subtitle-styles-popup`), its "More styles" panel
 * (`funlingo-subtitle-plus.js`) and the "Others" toggles
 * (`funlingo-replay.js`), plus the speed popover.
 *
 * Renders INLINE below the control strip — never over the YouTube iframe
 * (LEGAL #6). Marked `data-fnl-wordcard` so player shortcuts are ignored
 * while the learner works the controls (extension swallows k/j/l/m/f/c the
 * same way). Esc closes.
 *
 * Dropped on purpose: font family (Poppins only), vertical lift / safe
 * margin / text edge / background box (only meaningful over a video).
 */

import { useEffect, useRef, useState } from "react";
import {
  COLOR_TOKENS,
  LINE_HEIGHT_MAX,
  LINE_HEIGHT_MIN,
  SIZE_MAX,
  SIZE_MIN,
  SPEED_PRESETS,
  SPEED_STEPS,
  snapSpeed,
  stepSpeed,
  type CaptionColor,
  type CaptionWeight,
  type TrackMode,
  type WatchPrefs,
} from "@/lib/watch/prefs";
import { resolveVoice, speakWord, ttsSupported, voicesFor } from "@/lib/watch/tts";
import { buildW16 } from "@/lib/watch/strings";
import { useT } from "@/lib/i18n/client";
import styles from "./WatchSettingsPanel.module.css";

type Patch = (p: Partial<WatchPrefs>) => void;

function Toggle({
  on,
  label,
  onChange,
}: {
  on: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`${styles.toggle} ${on ? styles.toggleOn : ""}`}
      onClick={() => onChange(!on)}
    >
      <span className={styles.thumb} aria-hidden="true" />
    </button>
  );
}

function Stepper({
  value,
  min,
  max,
  step = 1,
  label,
  format = (v: number) => String(v),
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.stepBtn}
        aria-label={`${label} — smaller`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        −
      </button>
      <span className={styles.stepVal} aria-live="polite">
        {format(value)}
      </span>
      <button
        type="button"
        className={styles.stepBtn}
        aria-label={`${label} — bigger`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        +
      </button>
    </div>
  );
}

function Segmented<T extends string | number>({
  value,
  options,
  label,
  onChange,
}: {
  value: T;
  options: { v: T; label: string }[];
  label: string;
  onChange: (v: T) => void;
}) {
  return (
    <div className={styles.segmented} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.v)}
          type="button"
          role="radio"
          aria-checked={o.v === value}
          className={`${styles.seg} ${o.v === value ? styles.segOn : ""}`}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const COLOR_ORDER: CaptionColor[] = ["default", "accent", "warning", "success", "muted"];

function Swatches({
  value,
  label,
  onChange,
}: {
  value: CaptionColor;
  label: string;
  onChange: (c: CaptionColor) => void;
}) {
  const W16 = buildW16(useT());
  return (
    <div className={styles.swatches} role="radiogroup" aria-label={label}>
      {COLOR_ORDER.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={c === value}
          aria-label={W16.colors[c]}
          title={W16.colors[c]}
          className={`${styles.swatch} ${c === value ? styles.swatchOn : ""}`}
          style={{ "--sw": COLOR_TOKENS[c] } as React.CSSProperties}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
}

function TrackSection({
  title,
  mode,
  size,
  color,
  onMode,
  onSize,
  onColor,
}: {
  title: string;
  mode: TrackMode;
  size: number;
  color: CaptionColor;
  onMode: (m: TrackMode) => void;
  onSize: (n: number) => void;
  onColor: (c: CaptionColor) => void;
}) {
  const W16 = buildW16(useT());
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.row}>
        <Segmented<TrackMode>
          label={title}
          value={mode}
          onChange={onMode}
          options={[
            { v: "show", label: W16.show },
            { v: "blur", label: W16.blur },
            { v: "hide", label: W16.hide },
          ]}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{W16.size}</span>
        <Stepper label={`${title} ${W16.size}`} value={size} min={SIZE_MIN} max={SIZE_MAX} onChange={onSize} />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{W16.color}</span>
        <Swatches label={`${title} ${W16.color}`} value={color} onChange={onColor} />
      </div>
    </section>
  );
}

export function WatchSettingsPanel({
  prefs,
  onChange,
  onClose,
  learningLang,
}: {
  prefs: WatchPrefs;
  onChange: Patch;
  onClose: () => void;
  learningLang: string;
}) {
  const W16 = buildW16(useT());
  const rootRef = useRef<HTMLDivElement>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    rootRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!ttsSupported()) return;
    const refresh = () => setVoices(voicesFor(learningLang));
    refresh();
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
  }, [learningLang]);

  return (
    <div
      ref={rootRef}
      className={styles.panel}
      role="dialog"
      aria-label={W16.subtitleSettings}
      data-fnl-wordcard
      data-testid="watch-settings-panel"
    >
      <header className={styles.head}>
        <h2 className={styles.title}>{W16.subtitleSettings}</h2>
        <button type="button" className={styles.close} aria-label={`${W16.close} (Esc)`} onClick={onClose}>
          ×
        </button>
      </header>

      <div className={styles.grid}>
        <TrackSection
          title={W16.learningLine}
          mode={prefs.learningMode}
          size={prefs.learningSize}
          color={prefs.learningColor}
          onMode={(m) => onChange({ learningMode: m })}
          onSize={(n) => onChange({ learningSize: n })}
          onColor={(c) => onChange({ learningColor: c })}
        />
        <TrackSection
          title={W16.nativeLine}
          mode={prefs.nativeMode}
          size={prefs.nativeSize}
          color={prefs.nativeColor}
          onMode={(m) => onChange({ nativeMode: m })}
          onSize={(n) => onChange({ nativeSize: n })}
          onColor={(c) => onChange({ nativeColor: c })}
        />

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{W16.textSection}</h3>
          <div className={styles.row}>
            <Segmented<CaptionWeight>
              label={W16.weight}
              value={prefs.weight}
              onChange={(w) => onChange({ weight: w })}
              options={[
                { v: 0, label: W16.weightAuto },
                { v: 400, label: W16.weightRegular },
                { v: 600, label: W16.weightSemi },
                { v: 800, label: W16.weightBold },
              ]}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="fnl-lh">
              {W16.lineSpacing}
            </label>
            <div className={styles.rangeWrap}>
              <input
                id="fnl-lh"
                type="range"
                className={styles.range}
                min={LINE_HEIGHT_MIN}
                max={LINE_HEIGHT_MAX}
                step={5}
                value={prefs.lineHeight}
                onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
              />
              <span className={styles.stepVal}>{(prefs.lineHeight / 100).toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{W16.removeBrackets}</span>
            <Toggle
              on={prefs.removeBrackets}
              label={W16.removeBrackets}
              onChange={(v) => onChange({ removeBrackets: v })}
            />
          </div>
          <p className={styles.hint}>{W16.removeBracketsHint}</p>
          <p className={styles.hint}>{W16.blurHint}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{W16.others}</h3>
          <div className={styles.row}>
            <span className={styles.label}>{W16.pauseAfterReplay}</span>
            <Toggle
              on={prefs.pauseAfterReplay}
              label={W16.pauseAfterReplay}
              onChange={(v) => onChange({ pauseAfterReplay: v })}
            />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{W16.hoverPause}</span>
            <Toggle on={prefs.hoverPause} label={W16.hoverPause} onChange={(v) => onChange({ hoverPause: v })} />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{W16.pronounce}</span>
            <Toggle
              on={prefs.pronounceOnOpen}
              label={W16.pronounce}
              onChange={(v) => onChange({ pronounceOnOpen: v })}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="fnl-voice">
              {W16.voice}
            </label>
            <div className={styles.voiceRow}>
              {voices.length === 0 ? (
                <span className={styles.hint}>{W16.voiceEmpty}</span>
              ) : (
                <select
                  id="fnl-voice"
                  className={styles.select}
                  value={prefs.voice}
                  onChange={(e) => onChange({ voice: e.target.value })}
                >
                  <option value="auto">{W16.voiceAuto}</option>
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              )}
              {voices.length > 0 && (
                <button
                  type="button"
                  className={styles.stepBtn}
                  aria-label={W16.voicePreview}
                  title={W16.voicePreview}
                  onClick={() => {
                    const v = resolveVoice(learningLang, prefs.voice);
                    void speakWord(previewWord(learningLang), v?.lang || learningLang, prefs.voice);
                  }}
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/** A neutral greeting per language for the voice preview — our own words. */
function previewWord(lang: string): string {
  const p = lang.toLowerCase().split("-")[0];
  const map: Record<string, string> = {
    en: "Hello", es: "Hola", fr: "Bonjour", de: "Hallo", it: "Ciao", pt: "Olá",
    ja: "こんにちは", ko: "안녕하세요", zh: "你好", hi: "नमस्ते", ru: "Привет",
    nl: "Hallo", sv: "Hej", tr: "Merhaba", ar: "مرحبا", vi: "Xin chào",
  };
  return map[p] ?? "Hello";
}

export function SpeedPanel({
  speed,
  onChange,
  onClose,
}: {
  speed: number;
  onChange: (r: number) => void;
  onClose: () => void;
}) {
  const W16 = buildW16(useT());
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    rootRef.current?.querySelector<HTMLElement>("input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const idx = SPEED_STEPS.indexOf(snapSpeed(speed) as (typeof SPEED_STEPS)[number]);
  return (
    <div
      ref={rootRef}
      className={`${styles.panel} ${styles.speedPanel}`}
      role="dialog"
      aria-label={W16.speed}
      data-fnl-wordcard
      data-testid="watch-speed-panel"
    >
      <header className={styles.head}>
        <h2 className={styles.title}>{W16.speed}</h2>
        <button type="button" className={styles.close} aria-label={`${W16.close} (Esc)`} onClick={onClose}>
          ×
        </button>
      </header>
      <p className={styles.bigSpeed}>
        {speed.toFixed(2)}
        <span className={styles.bigX}>×</span>
      </p>
      <div className={styles.speedRow}>
        <button
          type="button"
          className={styles.stepBtn}
          aria-label={W16.slower}
          title={W16.slower}
          disabled={idx <= 0}
          onClick={() => onChange(stepSpeed(speed, -1))}
        >
          −
        </button>
        <input
          type="range"
          className={styles.range}
          min={0}
          max={SPEED_STEPS.length - 1}
          step={1}
          value={idx}
          aria-label={W16.speed}
          aria-valuetext={`${SPEED_STEPS[idx]}×`}
          onChange={(e) => onChange(SPEED_STEPS[Number(e.target.value)])}
        />
        <button
          type="button"
          className={styles.stepBtn}
          aria-label={W16.faster}
          title={W16.faster}
          disabled={idx >= SPEED_STEPS.length - 1}
          onClick={() => onChange(stepSpeed(speed, 1))}
        >
          +
        </button>
      </div>
      <div className={styles.presets} role="radiogroup" aria-label={W16.speed}>
        {SPEED_PRESETS.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={s === speed}
            className={`${styles.seg} ${s === speed ? styles.segOn : ""}`}
            onClick={() => onChange(s)}
          >
            {s}×
          </button>
        ))}
      </div>
      <button type="button" className={styles.reset} disabled={speed === 1} onClick={() => onChange(1)}>
        {W16.resetSpeed}
      </button>
    </div>
  );
}
