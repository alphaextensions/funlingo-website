"use client";

/**
 * Inline WordCard shown when the user taps a word in a caption line.
 *
 * - Rendered BESIDE the player (never over the iframe). Positioning: the
 *   parent passes a rect of the tapped word; this component clamps itself
 *   to the viewport and prefers to open to the right of the subtitle pane.
 * - Fetches /api/watch/wordCard (cache-first server endpoint). The
 *   user's actual sentence is included in the request body only (never a
 *   cache key — AGENT-PLAYBOOK: "cache by (lemma, lang_pair), not sentence").
 * - "In this video ×N" scans the client-side caption buffer for other
 *   occurrences of the same lemma — SESSION ONLY, never persisted.
 * - Focus-trap + Escape to close.
 *
 * Wave 16 (extension `word-hover-popup-mini` parity):
 * - Says the word on open ("Pronounce on click") + "Hear it again".
 * - Card settings: meanings shown 1–3, card size 50–150 %, pronounce on/off.
 * - Phrase lookup: extend the tapped word one word left/right; "Phrase" tag.
 * - "Root word" when the lemma differs from what you tapped.
 * - Example with the word highlighted + its translation + learner-language
 *   definition.
 * - Save ⇄ remove toggle; opens already "saved" for words in your deck.
 * - Saved-word self-test: meaning blurred → "Tap to reveal" → "I know this".
 * - Save celebration (star burst; sound is Wave 15's — see `feedback:` note).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { Caption } from "@/lib/watch/types";
import type { WordCard } from "@/lib/ai";
import { demoWordCard, demoWordCardFallback } from "@/lib/watch/demoBundle";
import { tokenize } from "@/lib/watch/tokenize";
import { highlightRanges } from "@/lib/watch/captionText";
import { CARD_SIZE_MAX, CARD_SIZE_MIN, type WatchPrefs } from "@/lib/watch/prefs";
import { speakWord, stopSpeaking, ttsSupported } from "@/lib/watch/tts";
import { buildW16 } from "@/lib/watch/strings";
import { useT } from "@/lib/i18n/client";
import styles from "./WordCardPopup.module.css";

/** What the learner's deck says about this word when the card opens. */
export type DeckState = "none" | "saved" | "known";

interface Props {
  open: boolean;
  word: string;
  captionIndex: number;
  captionText: string;
  /** Index of the tapped token in `tokenize(captionText)` (phrase extension). */
  tokenIndex?: number;
  anchorRect: DOMRect | null;
  sourceLang: string;
  nativeLang: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  captions: Caption[];
  onJumpTo: (captionIndex: number) => void;
  onSave: (lemma: string, line: string, captionIndex: number) => void;
  onClose: () => void;
  /** Wave 13 BLOCKER-16: when true, the popup reads a bundled WordCard
   *  instead of calling `/api/watch/wordCard`. Keeps `/watch/demo`
   *  working for signed-out visitors (401-free, DB-write-free). */
  demoMode?: boolean;
  /** Wave 13 B-16: controls the save button label. When false, we show
   *  "Sign in to save" copy; the parent surfaces the actual sign-in CTA
   *  through the toast. */
  isSignedIn?: boolean;
  /** Wave 16: card prefs + the deck lookup used for saved state. */
  prefs?: Pick<WatchPrefs, "numTranslations" | "cardSize" | "pronounceOnOpen" | "voice">;
  onPrefsChange?: (p: Partial<WatchPrefs>) => void;
  deckStateFor?: (lemma: string) => DeckState;
  onUnsave?: (lemma: string) => void;
  onKnown?: (lemma: string) => void;
}

const STARS = [
  { dx: -44, dy: -62, rot: "-30deg", delay: "0ms" },
  { dx: -18, dy: -74, rot: "15deg", delay: "40ms" },
  { dx: 8, dy: -78, rot: "-20deg", delay: "20ms" },
  { dx: 32, dy: -68, rot: "25deg", delay: "60ms" },
  { dx: 50, dy: -50, rot: "-10deg", delay: "10ms" },
  { dx: -28, dy: -55, rot: "35deg", delay: "50ms" },
];

export function WordCardPopup({
  open,
  word: tappedWord,
  captionIndex,
  captionText,
  tokenIndex,
  anchorRect,
  sourceLang,
  nativeLang,
  level,
  captions,
  onJumpTo,
  onSave,
  onClose,
  demoMode = false,
  isSignedIn = true,
  prefs = { numTranslations: 3, cardSize: 100, pronounceOnOpen: true, voice: "auto" },
  onPrefsChange,
  deckStateFor,
  onUnsave,
  onKnown,
}: Props) {
  const t = useT();
  const W16 = buildW16(t);
  const [card, setCard] = useState<WordCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(false);
  const [burst, setBurst] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  // Self-test arms only for words ALREADY in the deck when the card loaded —
  // saving a new word must not instantly blur its meaning.
  const [testArmed, setTestArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ---- Phrase range (word-token indices into the line) ----
  const tokens = useMemo(() => tokenize(captionText), [captionText]);
  const wordIdx = useMemo(
    () => tokens.map((t, i) => (t.isWord ? i : -1)).filter((i) => i >= 0),
    [tokens],
  );
  const startPos = useMemo(() => {
    const p = typeof tokenIndex === "number" ? wordIdx.indexOf(tokenIndex) : -1;
    return p >= 0 ? p : -1;
  }, [tokenIndex, wordIdx]);
  const [range, setRange] = useState<[number, number]>([startPos, startPos]);
  useEffect(() => setRange([startPos, startPos]), [startPos, tappedWord, captionIndex]);
  const query = useMemo(() => {
    if (range[0] < 0) return tappedWord;
    const from = wordIdx[range[0]];
    const to = wordIdx[range[1]];
    return tokens
      .slice(from, to + 1)
      .map((t) => t.word)
      .join("")
      .trim();
  }, [range, wordIdx, tokens, tappedWord]);
  const isMultiWord = range[1] > range[0];

  const deckState: DeckState = deckStateFor?.((card?.lemma ?? query).toLowerCase()) ?? "none";

  // Fetch (or cache-hit) the word card.
  useEffect(() => {
    const word = query;
    if (!open || !word) return;
    const started = performance.now();
    setCard(null);
    setError(null);
    setRevealed(false);
    setKnown(false);
    // Wave 13 BLOCKER-16: `/watch/demo` for a signed-out viewer MUST NOT
    // hit `/api/watch/wordCard` — the route is wrapped in idempotency and
    // returns 401 with no sign-in affordance. Serve the bundled card
    // instead; fall back to a soft placeholder for any word not in the
    // ~25-word demo dictionary (honest copy, no fake definitions).
    if (demoMode) {
      setLoading(false);
      setCard(demoWordCard(word) ?? demoWordCardFallback(word));
      setLatencyMs(Math.round(performance.now() - started));
      return undefined;
    }
    const ctrl = new AbortController();
    setLoading(true);
    fetch("/api/watch/wordCard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": `wc-${word}-${sourceLang}-${nativeLang}-${Math.floor(Date.now() / 1000)}`,
      },
      body: JSON.stringify({
        wordOrPhrase: word,
        sentence: captionText,
        sourceLang,
        nativeLang,
        level,
      }),
      signal: ctrl.signal,
    })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json?.message ?? r.statusText);
        setCard(json);
        setLatencyMs(Math.round(performance.now() - started));
      })
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setError((e as Error).message || t("watch.couldNotLoadWord"));
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [open, query, captionText, sourceLang, nativeLang, level, demoMode, t]);

  // Saved state follows the deck (extension checks `isSaved` on open).
  useEffect(() => {
    setSaved(deckState !== "none");
  }, [deckState]);
  useEffect(() => {
    if (!card) {
      setTestArmed(false);
      return;
    }
    setTestArmed(deckStateFor?.(card.lemma.toLowerCase()) === "saved");
    // Deliberately keyed on the card only (see testArmed comment).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  // Say the word when the card opens (extension "Pronounce on click").
  const say = (text: string) => {
    if (!ttsSupported()) return;
    setSpeaking(true);
    void speakWord(text, sourceLang, prefs.voice).finally(() => setSpeaking(false));
  };
  useEffect(() => {
    if (!open || !query || !prefs.pronounceOnOpen) return;
    say(query);
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query]);

  // "In this video ×N" — count all occurrences of the lemma in the current
  // client-side caption buffer. SESSION ONLY (LEGAL).
  const occurrences = useMemo(() => {
    const lemma = (card?.lemma ?? query).toLowerCase();
    if (!lemma) return [] as Caption[];
    // Word-boundary regex that works for Latin + Devanagari/CJK. We fall
    // back to a loose substring match for CJK where \b doesn't apply.
    const isLatin = /^[\p{Script=Latn}'’\- ]+$/u.test(lemma);
    const re = isLatin
      ? new RegExp(`\\b${escapeRe(lemma)}\\b`, "iu")
      : new RegExp(escapeRe(lemma), "iu");
    return captions.filter((c) => re.test(c.text));
  }, [card?.lemma, query, captions]);

  // Focus trap: focus close button on open; Escape closes.
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      // "Save word (S)" — the page-level dispatcher ignores keys inside the
      // card, so the card honours its own advertised shortcut.
      if ((e.key === "s" || e.key === "S") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        const btn = rootRef.current?.querySelector<HTMLButtonElement>("[data-fnl-save-word]");
        if (btn && !btn.disabled) {
          e.preventDefault();
          btn.click();
        }
        return;
      }
      if (e.key === "Tab" && rootRef.current) {
        const focusable = rootRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Position: by default beside the subtitle pane (fixed to right of
  // viewport). If an anchor rect was given, we clamp vertically to it.
  const style: React.CSSProperties = {
    ...(anchorRect
      ? { top: Math.max(16, Math.min(anchorRect.top, window.innerHeight - 400)) }
      : { top: 80 }),
    // Extension "Size" 50–150 %. `zoom` keeps layout + scrolling honest.
    zoom: prefs.cardSize / 100,
  } as React.CSSProperties;

  const lemma = card?.lemma ?? query;
  const showRoot =
    !!card?.lemma && !isMultiWord && card.lemma.toLowerCase() !== query.toLowerCase();
  const isPhrase = isMultiWord || card?.isPhrase === true;
  const selfTest = testArmed && saved && !known;
  const blurMeaning = selfTest && !revealed;

  const canGrowLeft = range[0] > 0;
  const canGrowRight = range[1] >= 0 && range[1] < wordIdx.length - 1;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("watch.wordCardAria", { word: query })}
      className={styles.card}
      style={style}
      data-fnl-wordcard
    >
      <header className={styles.head}>
        <div className={styles.headMain}>
          <h3 className={styles.lemma}>{query}</h3>
          <p className={styles.pos}>
            {isPhrase && <span className={styles.tag}>{W16.phrase}</span>}
            {card?.pos}
            {card?.cefr ? <span className={styles.cefr}>{card.cefr}</span> : null}
          </p>
        </div>
        <div className={styles.headBtns}>
          {ttsSupported() && (
            <button
              type="button"
              className={`${styles.iconBtn} ${speaking ? styles.iconBtnOn : ""}`}
              aria-label={W16.listen}
              title={W16.listen}
              onClick={() => say(query)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                <path
                  d="M16.5 8.5a5 5 0 010 7M19 6a8 8 0 010 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          )}
          {onPrefsChange && (
            <button
              type="button"
              className={`${styles.iconBtn} ${settingsOpen ? styles.iconBtnOn : ""}`}
              aria-label={W16.cardSettings}
              aria-expanded={settingsOpen}
              title={W16.cardSettings}
              onClick={() => setSettingsOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          )}
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.close}
            aria-label={t("watch.closeWordCardAria")}
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </header>

      {(canGrowLeft || canGrowRight || isMultiWord) && (
        <div className={styles.phraseRow} role="group" aria-label={W16.phrase}>
          <button
            type="button"
            className={styles.chip}
            disabled={!canGrowLeft}
            onClick={() => setRange(([a, b]) => [a - 1, b])}
            aria-label={t("watch.addWordBefore")}
          >
            ＋ {canGrowLeft ? tokens[wordIdx[range[0] - 1]].word : ""}
          </button>
          {isMultiWord && (
            <button
              type="button"
              className={styles.chip}
              onClick={() => setRange([startPos, startPos])}
              aria-label={t("watch.backToSingleWord")}
            >
              ↺ {tappedWord}
            </button>
          )}
          <button
            type="button"
            className={styles.chip}
            disabled={!canGrowRight}
            onClick={() => setRange(([a, b]) => [a, b + 1])}
            aria-label={t("watch.addWordAfter")}
          >
            {canGrowRight ? tokens[wordIdx[range[1] + 1]].word : ""} ＋
          </button>
        </div>
      )}

      {settingsOpen && onPrefsChange && (
        <section className={styles.settings} aria-label={W16.cardSettings}>
          <div className={styles.setRow}>
            <span>{W16.translations}</span>
            <span className={styles.stepper}>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={prefs.numTranslations <= 1}
                aria-label={t("watch.fewer", { label: W16.translations })}
                onClick={() => onPrefsChange({ numTranslations: prefs.numTranslations - 1 })}
              >
                −
              </button>
              <span className={styles.stepVal}>{prefs.numTranslations}</span>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={prefs.numTranslations >= 3}
                aria-label={t("watch.more", { label: W16.translations })}
                onClick={() => onPrefsChange({ numTranslations: prefs.numTranslations + 1 })}
              >
                +
              </button>
            </span>
          </div>
          <div className={styles.setRow}>
            <span>{W16.cardSize}</span>
            <span className={styles.stepper}>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={prefs.cardSize <= CARD_SIZE_MIN}
                aria-label={t("watch.smaller", { label: W16.cardSize })}
                onClick={() => onPrefsChange({ cardSize: prefs.cardSize - 10 })}
              >
                −
              </button>
              <span className={styles.stepVal}>{prefs.cardSize}%</span>
              <button
                type="button"
                className={styles.stepBtn}
                disabled={prefs.cardSize >= CARD_SIZE_MAX}
                aria-label={t("watch.bigger", { label: W16.cardSize })}
                onClick={() => onPrefsChange({ cardSize: prefs.cardSize + 10 })}
              >
                +
              </button>
            </span>
          </div>
          <div className={styles.setRow}>
            <span>{W16.pronounce}</span>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.pronounceOnOpen}
              className={`${styles.chip} ${prefs.pronounceOnOpen ? styles.chipOn : ""}`}
              onClick={() => onPrefsChange({ pronounceOnOpen: !prefs.pronounceOnOpen })}
            >
              {prefs.pronounceOnOpen ? W16.on : W16.off}
            </button>
          </div>
        </section>
      )}

      {loading && <p className={styles.loading}>{t("watch.lookingUp")}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {card && (
        <>
          {showRoot && (
            <p className={styles.root}>
              <span className={styles.noteLabel}>{W16.rootWord}:</span> {card.lemma}
            </p>
          )}

          {blurMeaning ? (
            <button
              type="button"
              className={styles.reveal}
              onClick={() => setRevealed(true)}
              data-testid="wordcard-reveal"
            >
              <span className={styles.revealText} aria-hidden="true">
                {card.shortMeaning}
              </span>
              <span className={styles.revealHint}>{W16.tapToReveal}</span>
            </button>
          ) : (
            <p className={styles.short}>{card.shortMeaning}</p>
          )}

          {selfTest && revealed && onKnown && (
            <button
              type="button"
              className={styles.knowBtn}
              onClick={() => {
                setKnown(true);
                onKnown(lemma.toLowerCase());
              }}
            >
              {W16.iKnowThis}
            </button>
          )}

          {!blurMeaning && (
            <>
              <section className={styles.inSentence}>
                <p className={styles.inSentenceLabel}>{t("watch.inThisLine")}</p>
                <p className={styles.inSentenceText}>{captionText}</p>
              </section>

              {card.senses?.length > 0 && (
                <ul className={styles.senses}>
                  {card.senses.slice(0, prefs.numTranslations).map((s, i) => (
                    <li key={i} className={styles.sense}>
                      <span className={styles.senseGloss}>{s.nativeGloss}</span>
                      {s.learningDefinition && (
                        <span className={styles.senseDef} title={W16.definition}>
                          {s.learningDefinition}
                        </span>
                      )}
                      {s.example && (
                        <span className={styles.example}>
                          <em className={styles.senseEx}>
                            “
                            {highlightRanges(s.example, lemma).map((part, j) =>
                              part.hit ? (
                                <mark key={j} className={styles.hl}>
                                  {part.text}
                                </mark>
                              ) : (
                                <span key={j}>{part.text}</span>
                              ),
                            )}
                            ”
                          </em>
                          {s.exampleTranslation && (
                            <span className={styles.exTr}>{s.exampleTranslation}</span>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}

      {/* In this video ×N — session cache only, never persisted. */}
      {occurrences.length > 1 && (
        <section className={styles.inVideo}>
          <p className={styles.inVideoLabel}>
            {t("watch.inThisVideo", { n: occurrences.length })}
          </p>
          <ul className={styles.occList}>
            {occurrences.slice(0, 6).map((occ) => (
              <li key={occ.index}>
                <button
                  type="button"
                  className={styles.occBtn}
                  onClick={() => onJumpTo(occ.index)}
                  aria-label={t("watch.jumpToTs", { ts: formatTs(occ.startSec) })}
                >
                  <span className={styles.occTs}>{formatTs(occ.startSec)}</span>
                  <span className={styles.occText}>{occ.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className={styles.foot}>
        <span className={styles.saveWrap}>
          <button
            type="button"
            className={`${styles.saveBtn} ${saved ? styles.saveBtnOn : ""}`}
            data-fnl-save-word
            disabled={saved}
            onClick={() => {
              onSave(lemma, captionText, captionIndex);
              if (isSignedIn) {
                setSaved(true);
                setBurst((n) => n + 1);
                // feedback: word-saved (Wave 15 src/lib/feedback/sound + haptics)
              }
            }}
            aria-pressed={saved}
          >
            {/* Wave 13 BLOCKER-16: honest copy for signed-out visitors.
                The parent's saveWord short-circuits to a sign-in toast —
                surface the same intent on the button itself. */}
            {saved
              ? t("watch.saved")
              : isSignedIn
                ? t("watch.saveWordKey")
                : t("watch.signInToSaveArrow")}
          </button>
          {burst > 0 && (
            <span key={burst} className={styles.burst} aria-hidden="true">
              {STARS.map((s, i) => (
                <span
                  key={i}
                  className={styles.star}
                  style={
                    {
                      "--dx": `${s.dx}px`,
                      "--dy": `${s.dy}px`,
                      "--rot": s.rot,
                      "--delay": s.delay,
                    } as React.CSSProperties
                  }
                >
                  ★
                </span>
              ))}
            </span>
          )}
        </span>
        {saved && isSignedIn && onUnsave && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => {
              setSaved(false);
              setTestArmed(false);
              onUnsave(lemma.toLowerCase());
            }}
          >
            {W16.removeSaved}
          </button>
        )}
        {latencyMs !== null && (
          <span className={styles.latency} aria-hidden="true">
            {latencyMs}ms
          </span>
        )}
      </footer>
    </div>
  );
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatTs(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
