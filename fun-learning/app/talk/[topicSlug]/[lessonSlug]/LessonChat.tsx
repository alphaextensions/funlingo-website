"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  advanceHelp,
  helpContentFor,
  helpDescription,
  helpLabel,
  initialHelpState,
  resetHelp,
  type HelpLevel,
  type HelpState,
} from "@/lib/talk/helpLadder";
import { normalizeToBCP47 } from "@/lib/i18n/speechLang";
import { useNativeLang, useT } from "@/lib/i18n/client";
import { fx } from "@/lib/feedback";
import styles from "./LessonChat.module.css";

const MAX_TURNS = 10; // SPEC §7.4 — session wraps at N turns

type ClientTurn = {
  id: string;
  role: "ai" | "user";
  text: string;
  translation?: string | null;
  correction?: Correction | null;
  speechScore?: SpeechScore | null;
};

type Correction = {
  original: string;
  corrected: string;
  isPerfect: boolean;
  diffs: { from: string; to: string }[];
  category: string;
  reasonShort: string;
};

type SpeechScore = {
  overall: number;
  words: { word: string; score: number }[];
  tips: string[];
};

type SessionReport = {
  duration_ms: number;
  turns: number;
  user_turns: number;
  corrections: Correction[];
  summary: string;
  tasks: string[];
  practise: string[];
};

export function LessonChat(props: {
  topicSlug: string;
  lessonSlug: string;
  lessonId: string;
  lessonTitle: string;
  lessonScene: string;
  aiRole: string;
  userRole: string;
  tasks: string[];
  shadowSentences: string[];
  /** The learning language of the lesson, as a short code ("es", "ja", "hi"). */
  lang: string;
  /** Wave 13 BLOCKER-22: the AI's first line, hand-authored per lesson in
   *  the catalog (src/lib/talk/topics.ts + src/lib/talk/seedCatalog.ts).
   *  Rendered verbatim — never with the old `(scene) role:` prefix. */
  opener: string;
}) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">(
    "intermediate",
  );
  const [turns, setTurns] = useState<ClientTurn[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [helpState, setHelpState] = useState<HelpState>(initialHelpState());
  const [helpPayload, setHelpPayload] = useState<null | {
    suggestion: string;
    hint: string;
    reason: string;
  }>(null);
  const [helpLoading, setHelpLoading] = useState(false);
  const [report, setReport] = useState<SessionReport | null>(null);
  const [recording, setRecording] = useState(false);
  // Chrome strings follow the viewer's native lang (I18nProvider); the
  // conversation itself is in props.lang (the learning lang).
  const t = useT();
  const scrollRef = useRef<HTMLDivElement>(null);

  const userTurnCount = useMemo(() => turns.filter((t) => t.role === "user").length, [turns]);
  const sessionDone = report !== null || userTurnCount >= MAX_TURNS;

  // Scroll to the newest turn.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns.length]);

  // Translation target = the learner's SAVED native language. The browser
  // locale is only a fallback for viewers who never set one (a Hindi-native
  // learner on an English-locale laptop used to get English glosses).
  const savedNative = useNativeLang();
  const nativeLang = useMemo(
    () =>
      savedNative ??
      (typeof navigator !== "undefined" ? navigator.language.split("-")[0] ?? "en" : "en"),
    [savedNative],
  );

  const startSession = useCallback(async () => {
    setStartError(null);
    try {
      const res = await fetch("/api/talk/sessions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `start-${props.lessonId}-${Date.now()}`,
        },
        body: JSON.stringify({ lessonId: props.lessonId, difficulty }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        setStartError(err?.error ?? `HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { sessionId: string };
      setSessionId(data.sessionId);
      setTurns([
        {
          id: "opener",
          role: "ai",
          // Wave 13 BLOCKER-22: use the hand-authored opener from the
          // catalog. Replaces the "(scene) role: Hi there…" template
          // that read like a developer stub for every lesson.
          text: props.opener,
          translation: null,
        },
      ]);
    } catch (e) {
      setStartError(e instanceof Error ? e.message : "NETWORK_ERROR");
    }
  }, [difficulty, props.lessonId, props.opener]);

  const sendTurn = useCallback(
    async (utterance: string, speechScore?: SpeechScore) => {
      if (!sessionId || !utterance.trim()) return;
      setSending(true);
      setSessionError(null);
      // Optimistically add the user turn.
      const userTurn: ClientTurn = {
        id: `optimistic-${Date.now()}`,
        role: "user",
        text: utterance,
        speechScore: speechScore ?? null,
      };
      setTurns((prev) => [...prev, userTurn]);
      setInput("");
      setHelpState(resetHelp());
      setHelpPayload(null);

      try {
        const res = await fetch(`/api/talk/sessions/${sessionId}/turns`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `turn-${sessionId}-${Date.now()}`,
          },
          body: JSON.stringify({
            utterance,
            helpLevel: helpState.level,
            nativeLang,
            speechScore,
            correctionsOff: false,
          }),
        });
        if (!res.ok || !res.body) {
          const err = (await res.json().catch(() => null)) as { error?: string } | null;
          setSessionError(err?.error ?? `HTTP ${res.status}`);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let aiTextSoFar = "";
        let aiTranslationSoFar = "";
        let aiStreamTurnId: string | null = null;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let newlineAt;
          while ((newlineAt = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, newlineAt).trim();
            buffer = buffer.slice(newlineAt + 1);
            if (!line) continue;
            let event: unknown;
            try {
              event = JSON.parse(line);
            } catch {
              continue;
            }
            const e = event as {
              kind: string;
              correction?: Correction | null;
              reply?: { text: string; translation: string };
              aiTurnId?: string;
              userTurnId?: string;
              status?: number;
              message?: string;
            };
            if (e.kind === "correction" && e.userTurnId) {
              setTurns((prev) =>
                prev.map((t) =>
                  t.id === userTurn.id
                    ? { ...t, id: e.userTurnId!, correction: e.correction ?? null }
                    : t,
                ),
              );
            } else if (e.kind === "reply" && e.reply) {
              aiTextSoFar = e.reply.text;
              aiTranslationSoFar = e.reply.translation;
              if (!aiStreamTurnId) {
                aiStreamTurnId = `stream-${Date.now()}`;
                setTurns((prev) => [
                  ...prev,
                  {
                    id: aiStreamTurnId!,
                    role: "ai",
                    text: aiTextSoFar,
                    translation: aiTranslationSoFar,
                  },
                ]);
              } else {
                setTurns((prev) =>
                  prev.map((t) =>
                    t.id === aiStreamTurnId
                      ? { ...t, text: aiTextSoFar, translation: aiTranslationSoFar }
                      : t,
                  ),
                );
              }
            } else if (e.kind === "done" && e.aiTurnId && aiStreamTurnId) {
              setTurns((prev) =>
                prev.map((t) =>
                  t.id === aiStreamTurnId ? { ...t, id: e.aiTurnId! } : t,
                ),
              );
            } else if (e.kind === "error") {
              setSessionError(e.message ?? "AI_ERROR");
            }
          }
        }
      } catch (e) {
        setSessionError(e instanceof Error ? e.message : "NETWORK_ERROR");
      } finally {
        setSending(false);
      }
    },
    [helpState.level, nativeLang, sessionId],
  );

  const askHelp = useCallback(async () => {
    if (!sessionId) return;
    const nextState = advanceHelp(helpState);
    setHelpState(nextState);
    const lastAi = [...turns].reverse().find((t) => t.role === "ai");
    if (!lastAi) return;
    if (!helpPayload) {
      setHelpLoading(true);
      try {
        const res = await fetch("/api/talk/help", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": `help-${sessionId}-${turns.length}`,
          },
          body: JSON.stringify({ sessionId, aiLastLine: lastAi.text, nativeLang }),
        });
        if (res.ok) {
          const data = (await res.json()) as {
            suggestion: string;
            hint: string;
            reason: string;
          };
          setHelpPayload(data);
        }
      } finally {
        setHelpLoading(false);
      }
    }
  }, [helpPayload, helpState, nativeLang, sessionId, turns]);

  const endSession = useCallback(async () => {
    if (!sessionId || report) return;
    try {
      const res = await fetch(`/api/talk/sessions/${sessionId}/end`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `end-${sessionId}`,
        },
        body: JSON.stringify({ nativeLang }),
      });
      if (res.ok) {
        const data = (await res.json()) as { report: SessionReport };
        setReport(data.report);
      }
    } catch (e) {
      setSessionError(e instanceof Error ? e.message : "NETWORK_ERROR");
    }
  }, [nativeLang, report, sessionId]);

  // Auto-end once the user has used all N turns.
  useEffect(() => {
    if (userTurnCount >= MAX_TURNS && sessionId && !report) {
      void endSession();
    }
  }, [endSession, report, sessionId, userTurnCount]);

  const toggleRecording = useCallback(async () => {
    // Browser-only — SpeechRecognition shim lives in the window global in
    // Chromium-based browsers. We fall back to a stub when not available.
    const w = window as unknown as {
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
      SpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const SR = w.webkitSpeechRecognition ?? w.SpeechRecognition;
    if (!SR) {
      setSessionError(t("talkLesson.voiceUnsupported"));
      return;
    }
    if (recording) {
      // Toggle off — the running recognition instance stops itself on end.
      setRecording(false);
      return;
    }
    const rec = new SR();
    // Blocker-fix: the mic transcribes in the LEARNING language so a Spanish
    // learner's first spoken turn doesn't come back as English.
    rec.lang = normalizeToBCP47(props.lang);
    rec.interimResults = false;
    rec.onresult = (ev: SpeechRecognitionEventLike) => {
      const transcript = ev.results[0]?.[0]?.transcript ?? "";
      setInput(transcript);
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
    setRecording(true);
  }, [props.lang, recording]);

  // Wave 13 BLOCKER-22: `openerFor` is gone. Every lesson now carries a
  // hand-authored `opener` in the catalog, used verbatim in the opener
  // bubble. No stage-direction prefix, no raw aiRole, no "Hi there"
  // template that didn't fit any scene.

  // --- Render -------------------------------------------------------------
  const latestHelp = helpContentFor(helpState.level, helpPayload ?? {
    suggestion: "...",
    hint: helpDescription(helpState.level === 0 ? 1 : helpState.level) ?? "",
    reason: "",
  });

  if (report) {
    return <SessionReportView report={report} lessonTitle={props.lessonTitle} />;
  }

  if (!sessionId) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.panelHead}>{t("talkLesson.readyHead")}</h2>
        <p className={styles.panelLede}>{t("talkLesson.readyLede", { n: MAX_TURNS })}</p>
        <fieldset className={styles.diffBox}>
          <legend>{t("talkLesson.difficultyLegend")}</legend>
          {(["beginner", "intermediate", "advanced"] as const).map((d) => (
            <label key={d} className={styles.diffOption}>
              <input
                type="radio"
                name="difficulty"
                value={d}
                checked={difficulty === d}
                onChange={() => setDifficulty(d)}
              />
              <span>{t(DIFFICULTY_KEY[d])}</span>
            </label>
          ))}
        </fieldset>
        {props.shadowSentences.length > 0 ? (
          <details className={styles.shadowBox}>
            <summary>{t("talkLesson.shadowSummary")}</summary>
            <ol>
              {props.shadowSentences.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </details>
        ) : null}
        <button type="button" className={styles.primaryBtn} onClick={startSession}>
          {t("talkLesson.startBtn")}
        </button>
        {startError ? <p className={styles.err}>{friendlyError(startError, t)}</p> : null}
      </aside>
    );
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.panelTop}>
        {/* PM-polish fix 6: eyebrow-style turn chip gives the learner a
            soft warning that the session is bounded, so hitting MAX_TURNS
            isn't a surprise end. Matches eyebrow chip visual language. */}
        <span
          className={styles.turnChip}
          role="status"
          aria-live="polite"
          aria-label={t("talkLesson.turnChip", { current: Math.min(userTurnCount + 1, MAX_TURNS), total: MAX_TURNS })}
          data-testid="talk-turn-chip"
        >
          <span className={styles.turnChipDot} aria-hidden="true" />
          {t("talkLesson.turnChip", { current: Math.min(userTurnCount + 1, MAX_TURNS), total: MAX_TURNS })}
        </span>
        <button type="button" className={styles.ghostBtn} onClick={endSession}>
          {t("talkLesson.endBtn")}
        </button>
      </div>

      <div className={styles.scroll} ref={scrollRef}>
        {turns.map((t) => (
          <TurnBubble key={t.id} turn={t} />
        ))}
      </div>
      {/* Cross-feature wire 3: once the AI surfaces a correction, learners
          can shelve it as a drill sentence for later /review. */}

      {latestHelp ? (
        <div className={styles.helpCard} role="note" aria-live="polite">
          <span className={styles.helpTitle}>{latestHelp.title}</span>
          <p>{latestHelp.body}</p>
          {latestHelp.reason ? <small>{latestHelp.reason}</small> : null}
        </div>
      ) : null}

      <form
        className={styles.inputRow}
        onSubmit={(e) => {
          e.preventDefault();
          if (!sending && !sessionDone && input.trim()) {
            // Wave 15 — web-only Talk send; tap cue.
            fx.tap();
            sendTurn(input);
          }
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("talkLesson.replyPlaceholder")}
          rows={2}
          aria-label={t("talkLesson.replyAria")}
          disabled={sending || sessionDone}
        />
        <div className={styles.inputActions}>
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={askHelp}
            disabled={helpLoading || helpState.level >= 3 || sending}
            aria-label={t("talkLesson.helpAria", { label: helpLabel(((helpState.level + 1) as HelpLevel) <= 3 ? ((helpState.level + 1) as HelpLevel) : 3) })}
          >
            {helpLoading ? "…" : helpLabel(((helpState.level + 1) as HelpLevel) <= 3 ? ((helpState.level + 1) as HelpLevel) : 3)}
          </button>
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={toggleRecording}
            aria-pressed={recording}
            disabled={sending || sessionDone}
          >
            {recording ? t("talkLesson.stopMic") : t("talkLesson.mic")}
          </button>
          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={sending || !input.trim() || sessionDone}
          >
            {sending ? t("talkLesson.sending") : t("talkLesson.send")}
          </button>
        </div>
      </form>
      {sessionError ? <p className={styles.err}>{friendlyError(sessionError, t)}</p> : null}
    </aside>
  );
}

function TurnBubble({ turn }: { turn: ClientTurn }) {
  const className = turn.role === "ai" ? styles.aiTurn : styles.userTurn;
  // Local save state for Wire 3 — the corrected form becomes a Sentence row.
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState<string | null>(null);
  const t = useT();

  const saveCorrection = useCallback(async () => {
    if (!turn.correction || savedId || saving) return;
    // We only save corrections tied to a persisted TalkTurn (one that has a
    // real server id, i.e. not an "optimistic-…" placeholder).
    if (turn.id.startsWith("optimistic-") || turn.id.startsWith("stream-")) {
      setSaveErr("TURN_PENDING");
      return;
    }
    setSaving(true);
    setSaveErr(null);
    try {
      const res = await fetch("/api/talk/corrections/save", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": `talk-save-${turn.id}`,
        },
        body: JSON.stringify({
          talkTurnId: turn.id,
          correctedText: turn.correction.corrected,
          originalText: turn.correction.original,
          reasonShort: turn.correction.reasonShort,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setSaveErr(data?.error ?? `HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { sentenceId: string };
      setSavedId(data.sentenceId);
    } catch (e) {
      setSaveErr(e instanceof Error ? e.message : "NETWORK_ERROR");
    } finally {
      setSaving(false);
    }
  }, [savedId, saving, turn.correction, turn.id]);

  return (
    <div className={className}>
      <div className={styles.turnText}>{turn.text}</div>
      {turn.translation ? (
        <div className={styles.turnTranslation}>{turn.translation}</div>
      ) : null}
      {turn.correction && !turn.correction.isPerfect ? (
        <div className={styles.correction}>
          <span className={styles.correctionBadge}>{t("talkLesson.correctionTry")}</span>{" "}
          <span className={styles.correctionText}>{turn.correction.corrected}</span>
          <div className={styles.correctionWhy}>{turn.correction.reasonShort}</div>
          <div className={styles.correctionActions}>
            {savedId ? (
              <span className={styles.correctionSaved}>
                {t("talkLesson.correctionSaved")}{" "}
                <a href="/sentences" className={styles.correctionSavedLink}>
                  {t("talkLesson.correctionSavedLink")}
                </a>
              </span>
            ) : (
              <button
                type="button"
                className={styles.correctionSaveBtn}
                onClick={saveCorrection}
                disabled={saving}
                aria-label={t("talkLesson.saveAria", { text: turn.correction.corrected })}
              >
                {/* PM-polish fix 7: glyph before the label — Design MED-7
                    from Pass 3. Hover border lifts to --fl-accent in the
                    CSS; glyph is decorative. */}
                <span className={styles.correctionSaveGlyph} aria-hidden="true">✎</span>
                {saving ? t("talkLesson.saving") : t("talkLesson.saveForDrill")}
              </button>
            )}
            {saveErr ? (
              <span className={styles.correctionSaveErr} role="status" aria-live="polite">
                {saveErr === "TURN_PENDING"
                  ? t("talkLesson.turnPending")
                  : saveErr === "TURN_NOT_FOUND"
                  ? t("talkLesson.turnNotSaved")
                  : saveErr === "UNAUTHENTICATED" ? (
                      t("talkLesson.signInToSave")
                    ) : (
                      <>
                        {t("talkLesson.couldntSave")}{" "}
                        <button
                          type="button"
                          className={styles.correctionSaveRetry}
                          onClick={saveCorrection}
                          disabled={saving}
                          aria-label={t("talkLesson.retryAria")}
                        >
                          {saving ? t("talkLesson.retrying") : t("talkLesson.retry")}
                        </button>
                      </>
                    )}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
      {turn.speechScore ? (
        <div className={styles.score}>{t("talkLesson.pronunciation", { score: Math.round(turn.speechScore.overall) })}</div>
      ) : null}
    </div>
  );
}

function SessionReportView({ report, lessonTitle }: { report: SessionReport; lessonTitle: string }) {
  const minutes = Math.max(1, Math.round(report.duration_ms / 60_000));
  const t = useT();
  return (
    <aside className={styles.panel}>
      <h2 className={styles.panelHead}>{t("talkLesson.reportHead")}</h2>
      <p className={styles.panelLede}>
        {t("talkLesson.reportLede", { lesson: lessonTitle, minutes, turns: report.user_turns })}
      </p>
      {report.summary ? (
        <div className={styles.reportBlock}>
          <h3>{t("talkLesson.recap")}</h3>
          <p>{report.summary}</p>
        </div>
      ) : null}
      {report.corrections.length > 0 ? (
        <div className={styles.reportBlock}>
          <h3>{t("talkLesson.toWorkOn")}</h3>
          <ul>
            {report.corrections.map((c, i) => (
              <li key={i}>
                <del>{c.original}</del> → <b>{c.corrected}</b>{" "}
                <small>({c.category})</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.reportBlock}>
          <h3>{t("talkLesson.perfectRun")}</h3>
          <p>{t("talkLesson.perfectBody")}</p>
        </div>
      )}
      {report.practise.length > 0 ? (
        <div className={styles.reportBlock}>
          <h3>{t("talkLesson.threeToPractise")}</h3>
          <ol>
            {report.practise.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </aside>
  );
}

const DIFFICULTY_KEY = {
  beginner: "talkLesson.diffBeginner",
  intermediate: "talkLesson.diffIntermediate",
  advanced: "talkLesson.diffAdvanced",
} as const;

function friendlyError(code: string, t: ReturnType<typeof useT>): string {
  switch (code) {
    case "NO_ACTIVE_LEARNING_LANG":
      return t("talkLesson.errNoLang");
    case "UNAUTHENTICATED":
      return t("talkLesson.errUnauth");
    case "RATE_LIMITED":
      return t("talkLesson.errRate");
    case "SAFETY_BLOCKED":
      return t("talkLesson.errSafety");
    default:
      return t("talkLesson.errDefault", { code });
  }
}

// ---------- Browser SpeechRecognition shim typing ----------
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  onresult: (ev: SpeechRecognitionEventLike) => void;
  onerror: (ev: unknown) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
