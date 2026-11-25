"use client";

/**
 * `/welcome` — web port of the extension's first-run onboarding modal
 * (landing_onboarding.js, `showControlsStep: false`) followed by its
 * "You're all set!" card (firstTimeActivationInjector.js).
 *
 *   Step 1 of 2  Language Setup        — welcome header, Native + Learning
 *   Step 2 of 2  Learning Preferences  — Beginner / Intermediate (Recommended) / Advanced → Save
 *   All set      check + 1-2-3 + CTA   → `/`
 *
 * Dropped vs. the extension (see docs/wave18-onboarding-parity.md): the
 * Beginner → Standard/Active/Casual mode picker and the Display Controls
 * step — both drive the extension's on-player captions, which the web
 * doesn't have.
 *
 * Storage: signed-in → POST /api/settings (idempotent); signed-out (or a 401)
 * → fl_native / fl_learning / fl_level cookies, same as LangPills. Either way
 * fl_welcome=done|skipped is set so `/` stops redirecting here.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isRtl } from "@/lib/i18n/rtl";
import {
  COOKIE_MAX_AGE,
  LEARNING_COOKIE,
  LEARNING_OPTIONS,
  LEVEL_COOKIE,
  NATIVE_COOKIE,
  NATIVE_OPTIONS,
  PROFICIENCIES,
  TOTAL_STEPS,
  WELCOME_COOKIE,
  proficiencyToCefr,
  type OnboardingStatus,
  type Proficiency,
} from "@/lib/onboarding/flow";
import { tx, type ExtKey } from "@/lib/onboarding/strings";
import { useT } from "@/lib/i18n/client";
import { LangDropdown } from "./LangDropdown";
import styles from "./welcome.module.css";

export interface WelcomeFlowProps {
  signedIn: boolean;
  initialNative: string;
  initialLearning: string;
  initialProficiency: Proficiency;
}

type Step = 1 | 2 | "done";

const PROF_KEY: Record<Proficiency, ExtKey> = {
  beginner: "proficiency.beginner",
  intermediate: "proficiency.intermediate",
  advanced: "proficiency.advanced",
};

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function languageName(code: string, inLocale: string): string {
  try {
    const n = new Intl.DisplayNames([inLocale], { type: "language" }).of(code);
    if (n && n !== code) return n;
  } catch {
    /* fall through */
  }
  return [...NATIVE_OPTIONS, ...LEARNING_OPTIONS].find((o) => o.value === code)?.label ?? code;
}

async function postSettings(body: Record<string, unknown>, key: string): Promise<"ok" | "signed-out" | "error"> {
  try {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": key },
      body: JSON.stringify(body),
    });
    if (res.status === 401) return "signed-out";
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

export function WelcomeFlow({ signedIn, initialNative, initialLearning, initialProficiency }: WelcomeFlowProps) {
  const t = useT();
  const [step, setStep] = useState<Step>(1);
  const [native, setNative] = useState(initialNative);
  const [learning, setLearning] = useState(initialLearning);
  const [prof, setProf] = useState<Proficiency>(initialProficiency);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // AppShell's `.shell` is a stacking context (z-index:1) that sits under the
  // sticky TopNav (40) and BottomTabs (50); portal to <body> after mount so
  // the scrim covers the chrome like the extension's full-page overlay.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Extension parity: picking a native language re-localises the modal live.
  const loc = native;
  const dir = isRtl(loc) ? "rtl" : "ltr";

  // Move focus to each step's heading (the all-set CTA on the last card).
  useEffect(() => {
    if (!mounted) return; // the portal re-mounts the nodes; focus after that
    if (step === "done") ctaRef.current?.focus();
    else headingRef.current?.focus();
  }, [step, mounted]);

  const skip = useCallback(async () => {
    if (step === "done") return;
    setCookie(WELCOME_COOKIE, "skipped" satisfies OnboardingStatus);
    if (signedIn) await postSettings({ onboarding: "skipped" }, "welcome-skipped");
    window.location.assign("/");
  }, [signedIn, step]);

  // Escape = skip (the extension's scrim-click close). Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        e.preventDefault();
        if (step === "done") window.location.assign("/");
        else void skip();
      } else if (e.key === "Tab" && modalRef.current) {
        const f = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [skip, step]);

  async function save() {
    if (saving) return;
    setSaving(true);
    setError(false);
    // feedback: onboarding-save (extension plays a 900 Hz sine beep, 0.3 s)
    const level = proficiencyToCefr(prof);
    let storeInCookies = !signedIn;
    if (signedIn) {
      const r = await postSettings(
        { nativeLang: native, uiLocale: native, activeLearningLang: learning, level, onboarding: "done" },
        `welcome-done-${native}-${learning}-${level}`,
      );
      if (r === "error") {
        setSaving(false);
        setError(true);
        return;
      }
      storeInCookies = r === "signed-out";
    }
    if (storeInCookies) {
      setCookie(NATIVE_COOKIE, native);
      setCookie(LEARNING_COOKIE, learning);
      setCookie(LEVEL_COOKIE, level);
    }
    setCookie(WELCOME_COOKIE, "done" satisfies OnboardingStatus);
    setSaving(false);
    setStep("done");
  }

  const numbered = step === "done" ? null : step;
  const progress = numbered ? (numbered / TOTAL_STEPS) * 100 : 100;

  const overlay = (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        // Scrim click = skip (extension: clicking outside closes the modal).
        if (e.target === e.currentTarget) {
          if (step === "done") window.location.assign("/");
          else void skip();
        }
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={t("onboarding.dialogLabel")}
        lang={loc}
        dir={dir}
        data-funlingo-locale={loc}
      >
        {step === "done" ? (
          <AllSet native={native} learning={learning} loc={loc} ctaRef={ctaRef} />
        ) : (
          <>
            <div className={styles.stepIndicator}>
              {tx(loc, "onboarding.stepOf", { current: step, total: TOTAL_STEPS })}
            </div>
            {step > 1 ? (
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep(1)}
                aria-label={tx(loc, "onboarding.goBack")}
                title={tx(loc, "onboarding.goBack")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            ) : null}
            <div
              className={styles.progress}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label={tx(loc, "onboarding.stepOf", { current: step, total: TOTAL_STEPS })}
            >
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            {step === 1 ? (
              <section key="s1" className={styles.step} aria-labelledby="welcome-h-1">
                <div className={styles.welcomeHeader}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/funlingo-lockup.png" alt="Funlingo" className={styles.welcomeMark} />
                  <p className={styles.welcomeSubtext}>{tx(loc, "onboarding.welcomeSubtext")}</p>
                </div>
                <h2 id="welcome-h-1" ref={headingRef} tabIndex={-1} className={styles.h2}>
                  {tx(loc, "onboarding.languageSetup")}
                </h2>
                <div className={styles.body}>
                  <LangDropdown
                    label={tx(loc, "onboarding.nativeLanguage")}
                    value={native}
                    options={NATIVE_OPTIONS}
                    onSelect={setNative}
                  />
                  <LangDropdown
                    label={tx(loc, "onboarding.learningLanguage")}
                    value={learning}
                    options={LEARNING_OPTIONS}
                    onSelect={setLearning}
                  />
                </div>
                <div className={styles.footer}>
                  <button type="button" className={styles.primary} onClick={() => setStep(2)}>
                    {tx(loc, "onboarding.nextStep")}
                  </button>
                  <button type="button" className={styles.skip} onClick={() => void skip()}>
                    {t("onboarding.skipForNow")}
                  </button>
                </div>
              </section>
            ) : (
              <section key="s2" className={styles.step} aria-labelledby="welcome-h-2">
                <h2 id="welcome-h-2" ref={headingRef} tabIndex={-1} className={styles.h2}>
                  {tx(loc, "onboarding.learningPreferences")}
                </h2>
                <div className={styles.body}>
                  <div className={styles.profSection} role="group" aria-labelledby="welcome-prof-label">
                    <span id="welcome-prof-label" className={styles.rowLabel}>
                      {tx(loc, "onboarding.proficiencyLevel")}
                    </span>
                    <div className={styles.profButtons}>
                      {PROFICIENCIES.map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={styles.profBtn}
                          aria-pressed={prof === p}
                          onClick={() => setProf(p)}
                        >
                          <span>{tx(loc, PROF_KEY[p])}</span>
                          {p === "intermediate" ? (
                            <span className={styles.recommended}>{tx(loc, "onboarding.recommended")}</span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.footer}>
                  <button
                    type="button"
                    className={styles.primary}
                    onClick={() => void save()}
                    disabled={saving}
                    aria-busy={saving}
                  >
                    {saving ? t("onboarding.saving") : tx(loc, "onboarding.save")}
                  </button>
                  {error ? (
                    <p className={styles.error} role="status" aria-live="polite">
                      {t("onboarding.saveError")}
                    </p>
                  ) : null}
                  <button type="button" className={styles.skip} onClick={() => void skip()}>
                    {t("onboarding.skipForNow")}
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
  return mounted ? createPortal(overlay, document.body) : overlay;
}

function AllSet({
  native,
  learning,
  loc,
  ctaRef,
}: {
  native: string;
  learning: string;
  loc: string;
  ctaRef: React.RefObject<HTMLAnchorElement>;
}) {
  const t = useT();
  const nativeName = languageName(native, loc);
  const learningName = languageName(learning, loc);
  const steps = [
    t("onboarding.allSetStep1"),
    tx(loc, "fta.step2", { native: nativeName, learning: learningName }),
    t("onboarding.allSetStep3"),
  ];
  return (
    <section className={styles.allSet} aria-labelledby="welcome-h-done">
      <div className={styles.asIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 id="welcome-h-done" className={styles.asHeading}>
        {tx(loc, "fta.heading")}
      </h2>
      <p className={styles.asSub}>{t("onboarding.allSetSub", { learning: learningName })}</p>
      <ol className={styles.asSteps}>
        {steps.map((s, i) => (
          <li key={i} className={styles.asStep}>
            <span className={styles.asNum} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.asStepText}>{s}</span>
          </li>
        ))}
      </ol>
      {/* Full navigation (not router.push) so the layout re-reads the new
          language cookies / user row for <html lang dir> and the pills. */}
      <Link ref={ctaRef} href="/" className={styles.primary}>
        {t("onboarding.allSetCta")}
      </Link>
    </section>
  );
}
