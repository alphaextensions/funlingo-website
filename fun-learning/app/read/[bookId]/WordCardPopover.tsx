"use client";

import { useEffect, useState } from "react";
import styles from "./reader.module.css";

type Card = {
  lemma: string;
  pos: string;
  cefr: string | null;
  shortMeaning: string;
  senses: {
    pos: string;
    nativeGloss: string;
    learningDefinition: string;
    example: string;
    exampleTranslation: string;
  }[];
};

/**
 * WordCardPopover — inline word card shown when the learner clicks a word in
 * the reader. Calls /api/ai/wordCard for a fresh definition. Pressing "Save"
 * (or the global S shortcut) POSTs an Encounter with source=book.
 *
 * SPEC §6.3 inline card contract — mirrors the one the Watch lane will ship
 * once it lands. For now, Talk+Read builds its own copy so it isn't blocked.
 */
export function WordCardPopover({
  anchor,
  word,
  line,
  bookId,
  lang,
  onClose,
}: {
  anchor: { x: number; y: number };
  word: string;
  line: string;
  bookId: string;
  lang: string;
  onClose: () => void;
}) {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch the word card.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/wordCard", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `wc-${lang}-${word}-${Date.now()}`,
          },
          body: JSON.stringify({
            wordOrPhrase: word,
            sentence: line,
            sourceLang: lang,
            nativeLang: typeof navigator !== "undefined" ? navigator.language.split("-")[0] : "en",
            level: "B1",
          }),
        });
        if (!res.ok) {
          const err = (await res.json().catch(() => null)) as { error?: string } | null;
          if (!cancelled) setError(err?.error ?? `HTTP ${res.status}`);
          return;
        }
        const data = (await res.json()) as Card;
        if (!cancelled) setCard(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "NETWORK_ERROR");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang, line, word]);

  const onSave = async () => {
    if (saving || saved) return;
    setSaving(true);
    try {
      const res = await fetch("/api/read/encounters", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `enc-${bookId}-${word}-${Date.now()}`,
        },
        body: JSON.stringify({
          bookId,
          lemma: card?.lemma ?? word.toLowerCase(),
          location: "cfi:unknown",
          line,
          lang,
        }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  // Position within viewport, clamped.
  const style: React.CSSProperties = {
    left: Math.min(Math.max(anchor.x - 160, 12), (typeof window !== "undefined" ? window.innerWidth : 1000) - 340),
    top: Math.min(anchor.y + 18, (typeof window !== "undefined" ? window.innerHeight : 800) - 320),
  };

  return (
    <div
      className={styles.popover}
      role="dialog"
      aria-label={`Word card for ${word}`}
      style={style}
    >
      <div className={styles.popoverHead}>
        <strong>{card?.lemma ?? word}</strong>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      {loading ? (
        <div className={styles.popoverBody}>Looking it up…</div>
      ) : error ? (
        <div className={styles.popoverBody}>Couldn&apos;t load this word ({error}).</div>
      ) : card ? (
        <>
          <div className={styles.popoverBody}>
            <p className={styles.wordMeaning}>{card.shortMeaning}</p>
            {card.senses[0]?.example ? (
              <p className={styles.wordExample}>
                <em>{card.senses[0].example}</em>
                <br />
                <small>{card.senses[0].exampleTranslation}</small>
              </p>
            ) : null}
            <div className={styles.popoverTags}>
              {card.pos ? <span className={styles.tag}>{card.pos}</span> : null}
              {card.cefr ? <span className={styles.tag}>{card.cefr}</span> : null}
            </div>
          </div>
          <div className={styles.popoverFoot}>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={onSave}
              disabled={saving || saved}
            >
              {saved ? "Saved" : saving ? "Saving…" : "Save (S)"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

/**
 * Figure out what word the user tapped. Walks the data-word attribute first
 * (graded reader), then falls back to splitting the text node at the click
 * position (epubjs iframe content).
 */
export function extractWordAtPoint(
  target: HTMLElement,
  x: number,
  y: number,
): { word: string; line: string } | null {
  const dataWord = target.getAttribute("data-word");
  if (dataWord) {
    const parent = target.closest("p, h1, h2, h3, li, div");
    return { word: dataWord, line: parent?.textContent?.trim() ?? dataWord };
  }
  // Fallback: use caretRangeFromPoint on the parent iframe document (epubjs).
  const doc = target.ownerDocument;
  const range = doc?.caretRangeFromPoint?.(x, y);
  if (!range || !range.startContainer || range.startContainer.nodeType !== Node.TEXT_NODE) {
    return null;
  }
  const node = range.startContainer as Text;
  const text = node.data;
  const offset = range.startOffset;
  if (!text) return null;
  // Find word boundaries around offset.
  let start = offset;
  let end = offset;
  const isWordChar = (ch: string) => /\p{L}|\p{N}|'|’|-/u.test(ch);
  while (start > 0 && isWordChar(text[start - 1])) start--;
  while (end < text.length && isWordChar(text[end])) end++;
  const word = text.slice(start, end).trim();
  if (!word) return null;
  const sentence =
    (node.parentElement?.textContent ?? text).replace(/\s+/g, " ").trim();
  return { word: word.toLowerCase(), line: sentence };
}
