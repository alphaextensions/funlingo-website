"use client";

/**
 * TopNav language pills — Native + Learning selects that persist on change.
 *
 * Split from `TopNav` so the shell stays a server component. The parent
 * passes the viewer's actual langs (resolved server-side); this component
 * mirrors them locally for the pill label, posts the change to
 * `/api/settings`, and asks Next to re-render on success so the rest of the
 * app sees the new learning lang.
 *
 * Pass-3 cleanup (Wave 4):
 *  - Native pill now also sets `uiLocale` so `<html dir>` + per-locale font
 *    overrides follow the learner's chosen native language. Learning pill
 *    only sets `activeLearningLang` — the UI stays in the native locale.
 *  - On a non-2xx response the local state rolls back to the server value
 *    and an inline aria-live message surfaces for ~4s.
 *  - Idempotency key is stable per intended value, so a double-tap on the
 *    same choice collapses correctly instead of racing two writes.
 */

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useT } from "@/lib/i18n/client";
import { fx } from "@/lib/feedback";
import styles from "./TopNav.module.css";

export interface LangOption {
  value: string;
  label: string;
}

type Partial = { nativeLang?: string; activeLearningLang?: string; uiLocale?: string };

interface Props {
  nativeLang: string;
  learningLang: string;
  nativeOptions: LangOption[];
  learningOptions: LangOption[];
}

function labelOf(options: LangOption[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value.toUpperCase();
}

export function LangPills({ nativeLang, learningLang, nativeOptions, learningOptions }: Props) {
  const router = useRouter();
  const [native, setNative] = useState(nativeLang);
  const [learning, setLearning] = useState(learningLang);
  const [, startTransition] = useTransition();
  const [error, setError] = useState<null | "native" | "learning">(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useT();

  useEffect(() => () => {
    if (errorTimer.current) clearTimeout(errorTimer.current);
  }, []);

  function surfaceError(which: "native" | "learning") {
    setError(which);
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => setError(null), 4000);
  }

  async function persist(partial: Partial, idempotencyKey: string): Promise<boolean> {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": idempotencyKey,
        },
        body: JSON.stringify(partial),
      });
      if (res.status === 401) {
        // Signed out: remember the choice in a cookie so the server-rendered
        // layout + content follow it. Signs-in later still use the DB value.
        const year = 60 * 60 * 24 * 365;
        if (partial.nativeLang) {
          document.cookie = `fl_native=${partial.nativeLang}; path=/; max-age=${year}; samesite=lax`;
        }
        if (partial.activeLearningLang) {
          document.cookie = `fl_learning=${partial.activeLearningLang}; path=/; max-age=${year}; samesite=lax`;
        }
        return true;
      }
      return res.ok;
    } catch {
      return false;
    }
  }

  async function changeNative(next: string) {
    const prev = native;
    setNative(next);
    setError(null);
    // Native-lang changes also move the UI into that locale so `<html dir>`,
    // the per-locale font-family overrides, and server-rendered copy follow.
    const ok = await persist(
      { nativeLang: next, uiLocale: next },
      `langpills-native-${next}`,
    );
    if (!ok) {
      setNative(prev);
      surfaceError("native");
      return;
    }
    startTransition(() => router.refresh());
  }

  async function changeLearning(next: string) {
    const prev = learning;
    setLearning(next);
    setError(null);
    // Learning-lang changes don't touch uiLocale — the learner's reading
    // chrome stays in their native locale while the content they study
    // changes.
    const ok = await persist(
      { activeLearningLang: next },
      `langpills-learning-${next}`,
    );
    if (!ok) {
      setLearning(prev);
      surfaceError("learning");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className={styles.langPills} role="group" aria-label={t("nav.langAriaGroup")}>
      <label className={styles.langPill}>
        <span className={styles.lpLabel}>{t("nav.langLabelNative")}</span>
        <span className={styles.lpValue}>{labelOf(nativeOptions, native)}</span>
        <select
          className={styles.lpSelect}
          aria-label={t("nav.langAriaNative")}
          value={native}
          onChange={(e) => {
            fx.tap();
            void changeNative(e.target.value);
          }}
        >
          {nativeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error === "native" ? (
          <span className={styles.lpError} role="status" aria-live="polite">
            {t("nav.langError")}
          </span>
        ) : null}
      </label>
      <label className={styles.langPill}>
        <span className={styles.lpLabel}>{t("nav.langLabelLearning")}</span>
        <span className={styles.lpValue}>{labelOf(learningOptions, learning)}</span>
        <select
          className={styles.lpSelect}
          aria-label={t("nav.langAriaLearning")}
          value={learning}
          onChange={(e) => {
            fx.tap();
            void changeLearning(e.target.value);
          }}
        >
          {learningOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {error === "learning" ? (
          <span className={styles.lpError} role="status" aria-live="polite">
            {t("nav.langError")}
          </span>
        ) : null}
      </label>
    </div>
  );
}
