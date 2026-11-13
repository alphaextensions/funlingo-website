"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/sections/navbar";
import { STORE_URL } from "@/app/_components/cta";
import { track } from "@/app/_components/track";

// Native uninstall feedback form. Posts to the existing Google Form's
// `formResponse` endpoint, so responses still land in the same Google Sheet —
// we just replace the embedded survey iframe with a one-tap UI.
//
// Field map (from the live form's FB_PUBLIC_LOAD_DATA_). Only `reason` is
// required by the form, so a reason-only submission is accepted.
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdv2e6cdee5tguj0Fh1iS7QWcAmAp8dHTDkx0rqvyfVAq-MKw/formResponse";
const ENTRY = {
  howLong: "entry.1196327013", // multiple choice
  reason: "entry.1593236698", // checkbox (required)
  bug: "entry.1611518770", // paragraph: "What is not working properly?"
  feature: "entry.1989106553", // paragraph: "Any feature you'd want us to build"
  email: "entry.1449538150", // short text
} as const;

// Logs the extension's uninstall redirect (uid, version, …) to the analytics sheet.
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbywUx7pWZrqF8dQRHWewNlAo8CVMVAX2Tq2XjVpNhPs-JDm7lOJHrKk5eAuBfVfkmhFnw/exec";

type Followup = "bug" | "feature" | "platform" | "other";

// `value` is the exact checkbox option string the Google Form expects, or
// `{ other: "…" }` to send it through Forms' "Other" option with that text.
// To give an `other` reason its own option, add it to the form first, then
// switch `value` to that exact string — Forms drops values it doesn't list.
type Reason = {
  key: string;
  label: string;
  emoji: string;
  value: string | { other: string };
  followup: Followup;
  prompt: string;
  placeholder: string;
  recoverable: boolean;
};

const REASONS: Reason[] = [
  {
    key: "broken",
    label: "Something wasn't working",
    emoji: "🐞",
    value: "Not working properly",
    followup: "bug",
    prompt: "What went wrong?",
    placeholder: "Which site, and what happened? Even one line helps.",
    recoverable: true,
  },
  {
    key: "translations",
    label: "Translations weren't good enough",
    emoji: "🔤",
    value: { other: "Poor translations" },
    followup: "other",
    prompt: "Which language pair, and which site?",
    placeholder: "e.g. English → Spanish on Netflix, translations were too literal…",
    recoverable: true,
  },
  {
    key: "platform",
    label: "My streaming site isn't supported",
    emoji: "🧩",
    value: "Not present on my preferred platform (please mention which so that we can add it for you)",
    followup: "platform",
    prompt: "Which site or browser?",
    placeholder: "e.g. Safari, Firefox, a specific streaming site…",
    recoverable: true,
  },
  {
    key: "missing",
    label: "Missing a feature I needed",
    emoji: "✨",
    value: "Missing features",
    followup: "feature",
    prompt: "What were you missing?",
    placeholder: "e.g. a language, a streaming service, a word list…",
    recoverable: true,
  },
  {
    key: "switched",
    label: "I switched to another tool",
    emoji: "🔁",
    value: { other: "Switched to another tool" },
    followup: "other",
    prompt: "Which one?",
    placeholder: "e.g. Language Reactor, Trancy…",
    recoverable: false,
  },
  {
    key: "trying",
    label: "Just trying it out / don't need it now",
    emoji: "👋",
    value: { other: "Just trying it out" },
    followup: "other",
    prompt: "Anything that would have made you keep it?",
    placeholder: "Tell us in your own words.",
    recoverable: false,
  },
  {
    key: "other",
    label: "Something else",
    emoji: "💬",
    value: { other: "Something else" },
    followup: "other",
    prompt: "What made you uninstall?",
    placeholder: "Tell us in your own words.",
    recoverable: false,
  },
];

const HOW_LONG = ["Less than a day", "Less than a week", "1-3 weeks", "1-3 months"];

type Snapshot = { reasonKey: string | null; detail: string; howLong: string | null; email: string };

// URL-encoded body for the Google Form. `full=false` sends the reason only —
// used when the user leaves without pressing Send.
function buildBody(s: Snapshot, full: boolean): string {
  const r = REASONS.find((x) => x.key === s.reasonKey);
  if (!r) return "";
  const p = new URLSearchParams();
  const detail = full ? s.detail.trim() : "";
  if (typeof r.value === "string") {
    p.append(ENTRY.reason, r.value);
  } else {
    p.append(ENTRY.reason, "__other_option__");
    p.append(`${ENTRY.reason}.other_option_response`, detail ? `${r.value.other}: ${detail}` : r.value.other);
  }
  if (full) {
    if (detail && r.followup === "bug") p.append(ENTRY.bug, detail);
    if (detail && r.followup === "feature") p.append(ENTRY.feature, detail);
    if (detail && r.followup === "platform") p.append(ENTRY.feature, `Platform request: ${detail}`);
    if (s.howLong) p.append(ENTRY.howLong, s.howLong);
    if (s.email.trim()) p.append(ENTRY.email, s.email.trim());
  }
  return p.toString();
}

// Forward the extension's uninstall redirect params to the analytics sheet.
// Reads location directly (not useSearchParams) so the page needs no Suspense
// boundary and its static HTML renders the form before any JS runs.
function logUninstallRedirect() {
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  if (!params.uid) return;

  const payload = {
    eventType: "uninstall_redirect",
    analyticsCategory: "uninstall",
    timestamp: new Date().toISOString(),
    ...params,
  };
  const requestBody = JSON.stringify({ payload });
  const body = new Blob([requestBody], { type: "text/plain;charset=UTF-8" });

  if (!navigator.sendBeacon(APPS_SCRIPT_URL, body)) {
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: requestBody,
      keepalive: true,
    }).catch(() => {
      /* user is gone; nothing to do */
    });
  }
}

const fieldClass =
  "w-full rounded-xl bg-[var(--surface-2)] border border-[var(--border)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--magenta)] transition-colors";
const primaryButton =
  "rounded-full text-white font-medium h-12 px-8 inline-flex items-center justify-center hover:scale-[1.03] transition-transform duration-200 shadow-lg shadow-purple-500/20";

export default function UninstallContent() {
  const [reasonKey, setReasonKey] = useState<string | null>(null);
  const [detail, setDetail] = useState("");
  const [howLong, setHowLong] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const uninstallLogSentRef = useRef(false);
  const submittedRef = useRef(false);
  // Latest field values, mirrored into a ref so the page-exit fallback can read
  // them without re-registering its listener on every keystroke.
  const snap = useRef<Snapshot>({ reasonKey: null, detail: "", howLong: null, email: "" });
  useEffect(() => {
    snap.current = { reasonKey, detail, howLong, email };
  }, [reasonKey, detail, howLong, email]);

  const selected = REASONS.find((r) => r.key === reasonKey) || null;

  useEffect(() => {
    if (uninstallLogSentRef.current) return;
    uninstallLogSentRef.current = true;
    logUninstallRedirect();
    track("uninstall_view");
  }, []);

  // The Crisp chat bubble (loaded site-wide in RootShell) sits on top of the
  // form here, so hide it on this page and bring it back on the way out.
  useEffect(() => {
    const w = window as unknown as { $crisp?: unknown[][] };
    w.$crisp?.push(["do", "chat:hide"]);
    return () => {
      w.$crisp?.push(["do", "chat:show"]);
    };
  }, []);

  // Page-exit safety net: if a reason was picked but never sent, flush it as
  // the tab closes. `submittedRef` guarantees we never write two rows.
  // (pagehide only — a visibilitychange flush would fire when the user merely
  // switches tabs, e.g. to copy a video link, and drop their full answer.)
  useEffect(() => {
    const flush = () => {
      if (submittedRef.current || !snap.current.reasonKey) return;
      submittedRef.current = true;
      const body = new Blob([buildBody(snap.current, false)], { type: "application/x-www-form-urlencoded" });
      navigator.sendBeacon(FORM_ACTION, body);
      track("uninstall_reason_only", { reason: snap.current.reasonKey });
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, []);

  function pickReason(key: string) {
    if (key === reasonKey) return;
    setReasonKey(key);
    setDetail("");
    track("uninstall_reason_select", { reason: key });
  }

  function submit() {
    if (!reasonKey || submittedRef.current) return;
    submittedRef.current = true;
    // no-cors fire-and-forget: the response is opaque and there's nothing to
    // read back. keepalive lets it finish even if the tab closes right after.
    fetch(FORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: buildBody(snap.current, true),
      keepalive: true,
    }).catch(() => {
      /* nothing to recover; the user already sees the thank-you state */
    });
    track("uninstall_feedback_submit", {
      reason: reasonKey,
      has_detail: detail.trim().length > 0,
      has_email: email.trim().length > 0,
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col items-start relative fnl-root min-h-screen">
      <Navbar minimal />

      <main className="flex flex-col w-full items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col max-w-2xl w-full items-center gap-8">
          {!submitted ? (
            <>
              <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-[var(--text)] text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[var(--heading-h1-letter-spacing)]">
                  What made you uninstall?
                </h1>
                <p className="text-[var(--text-dim)] text-lg sm:text-xl">
                  One tap is enough. It goes straight to the team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full" role="radiogroup" aria-label="Reason for uninstalling">
                {REASONS.map((r, i) => {
                  const active = reasonKey === r.key;
                  // An odd last button spans both columns instead of sitting alone.
                  const span = i === REASONS.length - 1 && REASONS.length % 2 === 1 ? "sm:col-span-2" : "";
                  return (
                    <button
                      key={r.key}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => pickReason(r.key)}
                      className={`${span} flex items-center gap-3 text-left rounded-2xl border px-5 py-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--magenta)] ${
                        active
                          ? "border-[var(--magenta)] bg-[var(--pink-soft)] shadow-lg shadow-purple-500/15"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--pink)] hover:bg-[var(--chip)]"
                      }`}
                    >
                      <span className="text-2xl leading-none" aria-hidden>
                        {r.emoji}
                      </span>
                      <span className="text-[var(--text)] font-medium text-base">{r.label}</span>
                    </button>
                  );
                })}
              </div>

              {selected && (
                <div className="w-full flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 animate-slide-in">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="detail" className="text-[var(--text)] font-medium">
                      {selected.prompt} <span className="text-[var(--text-dim)] font-normal">(optional)</span>
                    </label>
                    {selected.followup === "platform" ? (
                      <input
                        id="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder={selected.placeholder}
                        className={fieldClass}
                      />
                    ) : (
                      <textarea
                        id="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder={selected.placeholder}
                        rows={3}
                        className={`${fieldClass} resize-none`}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[var(--text-dim)] text-sm">How long did you use Funlingo? (optional)</span>
                    <div className="flex flex-wrap gap-2">
                      {HOW_LONG.map((h) => (
                        <button
                          key={h}
                          type="button"
                          aria-pressed={howLong === h}
                          onClick={() => setHowLong(howLong === h ? null : h)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                            howLong === h
                              ? "border-[var(--magenta)] bg-[var(--pink-soft)] text-[var(--text)]"
                              : "border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--pink)]"
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[var(--text-dim)] text-sm">
                      Email (optional), so we can tell you when it&apos;s fixed
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={fieldClass}
                    />
                  </div>

                  <button type="button" onClick={submit} className={`${primaryButton} self-start`} style={{ background: "var(--grad)" }}>
                    Send feedback
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-5 text-center py-8 animate-slide-in">
              <div className="w-16 h-16 rounded-full bg-[var(--pink-soft)] border border-[var(--magenta)] flex items-center justify-center text-3xl text-[var(--magenta)]">
                ✓
              </div>
              <h1 className="font-heading-h1 text-[var(--text)] text-3xl sm:text-4xl font-bold">Thanks, we got it.</h1>
              <p className="text-[var(--text-dim)] text-lg max-w-md">
                {selected?.recoverable
                  ? "We ship fixes and new features every week. If you give Funlingo another try, this might already be sorted."
                  : "Your feedback goes straight to the team. Thanks for taking the time."}
              </p>
              {email.trim() && (
                <p className="text-[var(--text-dim)] text-sm">We&apos;ll email you at {email.trim()} when there&apos;s news.</p>
              )}
              {selected?.recoverable && (
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("uninstall_reinstall_click", { reason: reasonKey })}
                  className={primaryButton}
                  style={{ background: "var(--grad)" }}
                >
                  Give Funlingo another try
                </a>
              )}
              <a href="/" className="text-[var(--text-dim)] hover:text-[var(--text)] text-sm transition-colors underline underline-offset-4">
                Back to home
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Transform-only entrance: content is never hidden behind an opacity fade. */}
      <style>{`
        @keyframes slide-in {
          0% { transform: translateY(12px); }
          100% { transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
