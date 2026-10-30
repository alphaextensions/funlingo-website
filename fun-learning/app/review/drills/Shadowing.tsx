"use client";

/**
 * Shadowing drill — play the audio, then record yourself.
 *
 *   - Default (flag OFF): posts the recording to `/api/ai/scoreSpeech` for
 *     the pre-Wave-9 Groq word-score flow. The reference text gets a
 *     coloured per-word score + up to 3 "worst sound" tips.
 *
 *   - On-device mode (flag ON + browser supports WASM/WebGPU): transcribes
 *     locally with Whisper-tiny, then compares against the reference using
 *     word-level alignment (`src/lib/ai/word-match.ts`). The UI shows
 *     match / miss / extra chips plus an honest "X of N words matched"
 *     summary — no overall score, no per-phoneme tips.
 *
 * Non-color signal: every match-chip carries a leading glyph (✓ · +) so the
 * state still reads in a grey-scale display.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewSessionCard, UiGrade } from "../types";
import { GradeRow } from "./GradeRow";
import { useT } from "@/lib/i18n/client";
import styles from "./Shadowing.module.css";
import chipStyles from "@/components/DrillChip.module.css";

type T = (key: string, params?: Record<string, string | number>) => string;
import {
  isLocalWhisperAvailable,
  preloadModel,
  transcribeAudio,
} from "@/lib/ai/local-whisper";
import { wordMatch, type WordChip } from "@/lib/ai/word-match";

interface SpeechScore {
  overall: number;
  words: { word: string; score: number }[];
  tips: string[];
}

interface LocalScore {
  transcript: string;
  words: WordChip[];
  matchedCount: number;
  totalCount: number;
  warnings: string[];
}

export function Shadowing({
  card,
  onGrade,
  onSkip,
  userId,
  disabled,
  localPronunciation,
}: {
  card: ReviewSessionCard;
  onGrade: (g: UiGrade) => void;
  onSkip?: () => void;
  userId: string;
  disabled?: boolean;
  localPronunciation?: boolean;
}) {
  const t = useT();
  const sentence = card.sentence?.text ?? "";
  const [recording, setRecording] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [score, setScore] = useState<SpeechScore | null>(null);
  const [localScore, setLocalScore] = useState<LocalScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [onDeviceMode, setOnDeviceMode] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
    }
    setOnDeviceMode(Boolean(localPronunciation) && isLocalWhisperAvailable());
  }, [localPronunciation]);

  useEffect(() => {
    if (!onDeviceMode) return;
    let cancelled = false;
    setModelLoading(true);
    void preloadModel({ size: "tiny" })
      .then(() => {
        if (!cancelled) setModelReady(true);
      })
      .catch((e) => {
        if (!cancelled) {
          console.error("[Shadowing] whisper preload failed", e);
        }
      })
      .finally(() => {
        if (!cancelled) setModelLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [onDeviceMode]);

  const play = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(sentence);
    u.lang = toBcp47(card.lang);
    u.rate = 0.95;
    synth.speak(u);
  }, [sentence, card.lang]);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setScoring(true);
        try {
          if (onDeviceMode) {
            const transcript = await transcribeAudio(blob, card.lang);
            const match = wordMatch(transcript.text, sentence, card.lang);
            setLocalScore({
              transcript: transcript.text,
              words: match.words,
              matchedCount: match.matchedCount,
              totalCount: match.totalCount,
              warnings: transcript.warnings,
            });
          } else {
            const base64 = await blobToBase64(blob);
            const res = await fetch("/api/ai/scoreSpeech", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "idempotency-key": `score:${card.cardId}:${Date.now()}`,
                ...(process.env.NODE_ENV !== "production"
                  ? { "x-dev-user-id": userId }
                  : {}),
              },
              body: JSON.stringify({
                audioBase64: base64,
                referenceText: sentence,
                lang: card.lang,
              }),
            });
            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              if (err.error === "RATE_LIMITED") {
                setError(t("reviewDrill.errBudget"));
              } else {
                setError(t("reviewDrill.errScore"));
              }
              return;
            }
            const data = (await res.json()) as SpeechScore;
            setScore(data);
          }
        } catch (err) {
          setError(t("reviewDrill.errScore"));
          console.error(err);
        } finally {
          setScoring(false);
        }
      };
      mediaRecRef.current = rec;
      rec.start();
      setRecording(true);
    } catch (err) {
      setSupported(false);
      setError(t("reviewDrill.errMic"));
      console.error(err);
    }
  }, [card.cardId, card.lang, sentence, userId, onDeviceMode, t]);

  const stopRecording = useCallback(() => {
    mediaRecRef.current?.stop();
    setRecording(false);
  }, []);

  if (!card.sentence) return null;

  const hasResult = onDeviceMode ? !!localScore : !!score;

  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={chipStyles.chip}>
          {onDeviceMode ? t("reviewDrill.shadowChipLocal") : t("review.drillShadow")}
        </span>
        {card.sentence.sourceTitle && (
          <span className={styles.source}>{card.sentence.sourceTitle}</span>
        )}
      </header>

      <p className={styles.sentence}>{sentence}</p>
      {card.sentence.translation && (
        <p className={styles.translation}>{card.sentence.translation}</p>
      )}

      {onDeviceMode && modelLoading && !modelReady && (
        <p className={styles.notice} aria-live="polite">
          {t("reviewDrill.loadingEngine")}
        </p>
      )}

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.playBtn}
          onClick={play}
          disabled={disabled}
          aria-label={t("reviewDrill.shadowPlayAria")}
        >
          <span aria-hidden="true">▶</span> {t("reviewDrill.playBtn")}
        </button>
        {supported ? (
          !recording ? (
            <button
              type="button"
              className={styles.recordBtn}
              onClick={() => void startRecording()}
              disabled={disabled || scoring}
              aria-label={t("reviewDrill.shadowRecordAria")}
            >
              <span aria-hidden="true" className={styles.recordDot}>●</span>
              {hasResult ? t("reviewDrill.recordAgain") : t("reviewDrill.record")}
            </button>
          ) : (
            <button
              type="button"
              className={styles.recordBtn}
              data-recording="true"
              onClick={stopRecording}
              disabled={disabled}
              aria-label={t("reviewDrill.stopRecordAria")}
            >
              <span aria-hidden="true" className={styles.recordDot}>■</span>
              {t("reviewDrill.stop")}
            </button>
          )
        ) : null}
      </div>

      {!supported && (
        <p className={styles.notice}>
          {t("reviewDrill.shadowNoRecord")}
        </p>
      )}
      {scoring && (
        <p className={styles.notice} aria-live="polite">
          {onDeviceMode ? t("reviewDrill.transcribing") : t("reviewDrill.scoring")}
        </p>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!onDeviceMode && !hasResult && !scoring && !error && (
        <p className={styles.notice}>
          {t("reviewDrill.enableOnDevice")}
        </p>
      )}

      {onDeviceMode && localScore && <OnDeviceResult result={localScore} t={t} />}
      {!onDeviceMode && score && <ClassicResult score={score} t={t} />}

      <GradeRow onGrade={onGrade} disabled={disabled || recording || scoring} />
      {onSkip && (
        <button
          type="button"
          className={styles.skipLink}
          onClick={onSkip}
          disabled={disabled}
        >
          {t("quiz.skip")}
        </button>
      )}
    </article>
  );
}

function OnDeviceResult({ result, t }: { result: LocalScore; t: T }) {
  const { transcript, words, matchedCount, totalCount, warnings } = result;
  const encouragement = buildEncouragement(matchedCount, totalCount, t);
  return (
    <div className={styles.result}>
      <p className={styles.transcript} aria-live="polite">
        <span className={styles.transcriptEyebrow}>{t("reviewDrill.transcribedAs")}</span>
        <span className={styles.transcriptText}>
          {transcript ? `“${transcript}”` : t("reviewDrill.nothingPickedUp")}
        </span>
      </p>
      {words.length > 0 && (
        <p className={styles.wordRow} aria-label={t("reviewDrill.perWordMatchAria")}>
          {words.map((w, i) => (
            <span
              key={`${w.word}-${i}`}
              className={styles.word}
              data-state={w.state}
              data-tier={w.state === "match" ? "good" : w.state === "extra" ? "warn" : "bad"}
              title={labelFor(w.state, t)}
            >
              <span aria-hidden="true" className={styles.wordGlyph}>
                {w.state === "match" ? "✓" : w.state === "extra" ? "+" : "·"}
              </span>
              {w.word}
              <span className={styles.srOnly}>{labelFor(w.state, t)}</span>
            </span>
          ))}
        </p>
      )}
      <p className={styles.encouragement}>{encouragement}</p>
      {warnings.length > 0 && (
        <ul className={styles.warnings}>
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ClassicResult({ score, t }: { score: SpeechScore; t: T }) {
  return (
    <div className={styles.result}>
      <div className={styles.score}>
        <span className={styles.scoreNum}>{Math.round(score.overall)}</span>
        <span className={styles.scoreUnit}>/ 100</span>
      </div>
      <p
        className={styles.wordRow}
        aria-label={t("reviewDrill.perWordAccuracyAria")}
      >
        {score.words.map((w, i) => (
          <span
            key={`${w.word}-${i}`}
            className={styles.word}
            data-tier={toneFor(w.score)}
            title={`${w.word}: ${Math.round(w.score)}%`}
          >
            <span aria-hidden="true" className={styles.wordGlyph}>
              {toneFor(w.score) === "good"
                ? "✓"
                : toneFor(w.score) === "warn"
                  ? "·"
                  : "×"}
            </span>
            {w.word}
          </span>
        ))}
      </p>
      {score.tips.length > 0 && (
        <ul className={styles.tips}>
          {score.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildEncouragement(matched: number, total: number, t: T): string {
  if (total === 0) return t("reviewDrill.encNothingCompare");
  if (matched === 0) return t("reviewDrill.shadowEncZero");
  if (matched === total) return t("reviewDrill.shadowEncPerfect", { total });
  const pct = matched / total;
  if (pct >= 0.8) return t("reviewDrill.shadowEncGreat", { matched, total });
  if (pct >= 0.5) return t("reviewDrill.shadowEncGood", { matched, total });
  return t("reviewDrill.shadowEncLow", { matched, total });
}

function labelFor(state: WordChip["state"], t: T): string {
  if (state === "match") return t("reviewDrill.wordMatched");
  if (state === "miss") return t("reviewDrill.wordMissed");
  return t("reviewDrill.wordExtra");
}

function toneFor(score: number): "good" | "warn" | "bad" {
  if (score >= 75) return "good";
  if (score >= 50) return "warn";
  return "bad";
}

function toBcp47(lang: string): string {
  const map: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    ja: "ja-JP",
    ko: "ko-KR",
    hi: "hi-IN",
    ar: "ar-SA",
    gu: "gu-IN",
    mr: "mr-IN",
  };
  return map[lang] ?? lang;
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(fr.error);
    fr.onload = () => {
      const url = fr.result as string;
      // strip the "data:...;base64," prefix.
      const comma = url.indexOf(",");
      resolve(comma >= 0 ? url.slice(comma + 1) : url);
    };
    fr.readAsDataURL(blob);
  });
}
