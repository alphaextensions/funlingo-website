"use client";

/**
 * Speaking drill — SPEC §11 "Guess-the-meaning / Shadowing / Speaking".
 *
 *   - Default (flag OFF): shows a prompt, records audio, posts to
 *     `/api/ai/scoreSpeech` which runs a Groq text-vs-text comparison and
 *     returns a 0-100 score with per-word percentages and tips. This is
 *     the pre-Wave-9 flow, kept intact so the demo stays live.
 *
 *   - On-device mode (flag ON + browser supports WASM/WebGPU): records
 *     audio, transcribes it with Whisper-tiny in the learner's browser
 *     (`src/lib/ai/local-whisper.ts`), then renders a word-match chip row
 *     comparing what Whisper heard against the reference sentence. No
 *     score / 100, no per-phoneme tips. Encouragement copy below. See
 *     `src/lib/ai/word-match.ts` for the alignment algorithm.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReviewSessionCard, UiGrade } from "../types";
import { GradeRow } from "./GradeRow";
import { useT } from "@/lib/i18n/client";
import styles from "./Speaking.module.css";
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

export function Speaking({
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
  const prompt = useMemo(
    () => buildPrompt(sentence, card.lang, t),
    [sentence, card.lang, t],
  );

  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [score, setScore] = useState<SpeechScore | null>(null);
  const [localScore, setLocalScore] = useState<LocalScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Resolve the mode once we're on the client. On the server + before mount
  // we treat the flow as "classic" so the markup is stable.
  const [onDeviceMode, setOnDeviceMode] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
    }
    setOnDeviceMode(Boolean(localPronunciation) && isLocalWhisperAvailable());
  }, [localPronunciation]);

  // Pre-warm the model on mount when on-device mode is active. First
  // transcription then feels snappy; the chip hints that this is a one-time
  // ~5 s wait.
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
          console.error("[Speaking] whisper preload failed", e);
          // Non-fatal — we can still try again on the actual click. The
          // first transcribe call will show the loading state again.
        }
      })
      .finally(() => {
        if (!cancelled) setModelLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [onDeviceMode]);

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
                "idempotency-key": `speak:${card.cardId}:${Date.now()}`,
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
          {onDeviceMode ? t("reviewDrill.speakChipLocal") : t("review.drillSpeaking")}
        </span>
        {card.sentence.sourceTitle && (
          <span className={styles.source}>{card.sentence.sourceTitle}</span>
        )}
      </header>

      <p className={styles.prompt}>{prompt}</p>
      <details className={styles.hintDetails}>
        <summary>{t("reviewDrill.speakRevealModel")}</summary>
        <p className={styles.hintSentence}>{sentence}</p>
      </details>

      {onDeviceMode && modelLoading && !modelReady && (
        <p className={styles.notice} aria-live="polite">
          {t("reviewDrill.loadingEngine")}
        </p>
      )}

      {supported ? (
        <div className={styles.controls}>
          {!recording ? (
            <button
              type="button"
              className={styles.recordBtn}
              onClick={() => void startRecording()}
              disabled={disabled || scoring}
              aria-label={t("reviewDrill.speakRecordAria")}
            >
              <span aria-hidden="true" className={styles.recordDot}>●</span>
              {hasResult ? t("reviewDrill.tryAgain") : t("reviewDrill.record")}
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
          )}
        </div>
      ) : (
        <p className={styles.notice}>
          {t("reviewDrill.speakNoRecord")}
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

      {onDeviceMode && localScore && (
        <OnDeviceResult result={localScore} t={t} />
      )}

      {!onDeviceMode && score && (
        <ClassicResult score={score} t={t} />
      )}

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
      <p className={styles.wordRow} aria-label={t("reviewDrill.perWordAccuracyAria")}>
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
          {score.tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildEncouragement(matched: number, total: number, t: T): string {
  if (total === 0) return t("reviewDrill.encNothingCompare");
  if (matched === 0) return t("reviewDrill.speakEncZero");
  if (matched === total) return t("reviewDrill.speakEncPerfect", { total });
  const pct = matched / total;
  if (pct >= 0.8) return t("reviewDrill.speakEncGreat", { matched, total });
  if (pct >= 0.5) return t("reviewDrill.speakEncGood", { matched, total });
  return t("reviewDrill.speakEncLow", { matched, total });
}

function labelFor(state: WordChip["state"], t: T): string {
  if (state === "match") return t("reviewDrill.wordMatched");
  if (state === "miss") return t("reviewDrill.wordMissed");
  return t("reviewDrill.wordExtra");
}

/** Build a safe, generic speaking prompt from the saved sentence. We keep it
 *  local for v1 — a future lane can replace this with `talkTurn` so the AI
 *  tailors it to the user's level. The prompt never includes caption text
 *  verbatim beyond the sentence the user themselves saved. The surrounding
 *  instruction is localized (learner's native lang); the saved sentence stays
 *  in the learning language. */
function buildPrompt(sentence: string, lang: string, t: T): string {
  if (!sentence) return t("reviewDrill.speakPromptEmpty");
  const trimmed = sentence.length > 80 ? sentence.slice(0, 77) + "…" : sentence;
  return t("reviewDrill.speakPrompt", { sentence: trimmed, lang: lang.toUpperCase() });
}

function toneFor(score: number): "good" | "warn" | "bad" {
  if (score >= 75) return "good";
  if (score >= 50) return "warn";
  return "bad";
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(fr.error);
    fr.onload = () => {
      const url = fr.result as string;
      const comma = url.indexOf(",");
      resolve(comma >= 0 ? url.slice(comma + 1) : url);
    };
    fr.readAsDataURL(blob);
  });
}
