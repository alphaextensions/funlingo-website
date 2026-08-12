"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { ChromeCTA } from "@/app/_components/cta";
import { track } from "@/app/_components/track";
import { FlagSvg } from "./flags";
import { GAME_ROUNDS, optWord, audioKey } from "./gameData";

// The "I want to learn" language drives which word set the visitor plays; the
// option/answer meanings are resolved into the viewer's native (UI) language by
// gameData's optWord(). Rounds live in gameData.ts (concept-keyed, localized).
const LEARN_LABELS: Record<string, string> = {
  es: "Spanish",
  fr: "French",
  it: "Italian",
  de: "German",
  ko: "Korean",
  ja: "Japanese",
  en: "English",
};

const CORRECT_MSGS = ["Nice!", "You got it!", "Exactly!", "Spot on!", "Yes!"];

let currentAudio: HTMLAudioElement | null = null;
let voicesLoaded = false;

const NATURAL_VOICE_HINTS = [
  "natural",
  "neural",
  "premium",
  "enhanced",
  "google",
  "microsoft",
  "samantha",
  "monica",
  "paulina",
  "amelie",
  "kyoko",
  "yuna",
  "anna",
];

function matchingVoiceScore(voice: SpeechSynthesisVoice, bcp: string) {
  const requested = bcp.toLowerCase();
  const requestedBase = requested.split("-")[0];
  const voiceLang = voice.lang.toLowerCase();
  const voiceName = voice.name.toLowerCase();
  let score = 0;

  if (voiceLang === requested) score += 50;
  else if (voiceLang.split("-")[0] === requestedBase) score += 35;
  else return -1;

  if (voice.localService) score += 8;
  if (voice.default) score += 2;
  if (NATURAL_VOICE_HINTS.some((hint) => voiceName.includes(hint))) score += 18;
  if (voiceName.includes("compact")) score -= 18;

  return score;
}

function bestFallbackVoice(bcp: string) {
  if (typeof speechSynthesis === "undefined") return undefined;
  const voices = speechSynthesis.getVoices();
  return voices
    .map((voice) => ({ voice, score: matchingVoiceScore(voice, bcp) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

// Browser fallback, used only when the pre-generated neural clip is missing or
// can't play (offline, blocked, etc). We choose the best language-matching
// voice available instead of relying on the browser default.
function speakFallback(text: string, bcp: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    const voice = bestFallbackVoice(bcp);
    u.lang = bcp;
    if (voice) u.voice = voice;
    u.rate = 0.82;
    u.pitch = 1.04;
    u.volume = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* unavailable */
  }
}

// Play the human-sounding pre-generated clip (public/audio/game/<key>.mp3,
// produced by scripts/generate-game-audio.mjs). Falls back to the browser's
// speech synthesizer if the file can't be played.
function speak(text: string, bcp: string) {
  try {
    if (typeof speechSynthesis !== "undefined" && !voicesLoaded) {
      voicesLoaded = true;
      speechSynthesis.getVoices();
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    const audio = new Audio(`/audio/game/${audioKey(bcp, text)}.mp3`);
    currentAudio = audio;
    audio.play().catch(() => speakFallback(text, bcp));
  } catch {
    speakFallback(text, bcp);
  }
}

export default function GuessGame({ lang = "es" }: { lang?: string }) {
  const { t, locale } = useT();
  const rounds = GAME_ROUNDS[lang] || GAME_ROUNDS.es;
  const total = rounds.length;
  const flag = rounds[0].flag;
  const label = LEARN_LABELS[lang] || LEARN_LABELS.es;
  const rtl = (locale || "").split("-")[0] === "ar";

  const [round, setRound] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  // Restart the game whenever the learning language changes.
  React.useEffect(() => {
    setRound(0);
    setPicked(null);
    setCorrectCount(0);
    setFinished(false);
  }, [lang]);

  React.useEffect(() => {
    if (typeof speechSynthesis === "undefined") return;

    const loadVoices = () => {
      voicesLoaded = true;
      speechSynthesis.getVoices();
    };

    loadVoices();
    speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
    return () => speechSynthesis.removeEventListener?.("voiceschanged", loadVoices);
  }, []);

  const r = rounds[round];
  const answered = picked != null;
  const last = round >= total - 1;

  const pick = (concept: string) => {
    if (picked != null) return;
    const right = concept === r.ans;
    speak(r.word, r.bcp);
    setPicked(concept);
    if (right) setCorrectCount((c) => c + 1);
  };
  const next = () => {
    if (last) {
      setFinished(true);
      track("game_complete", { score: correctCount, total, lang });
    } else {
      setRound((x) => x + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setRound(0);
    setPicked(null);
    setCorrectCount(0);
    setFinished(false);
  };

  const resultEmoji = correctCount >= total ? "🎉" : correctCount >= Math.ceil(total / 2) ? "👏" : "💪";

  return (
    <div className="w-full relative" style={{ fontFamily: "'Poppins',sans-serif" }}>
      <div
        dir={rtl ? "rtl" : "ltr"}
        className="relative rounded-[28px] overflow-hidden border p-[22px] min-[560px]:p-9 min-[560px]:pb-[38px]"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "0 30px 70px -30px rgba(150,20,140,.45)",
        }}
      >
        {!finished && (
          <div>
            {/* top row */}
            <div className="flex items-center justify-between gap-4 mb-[26px]">
              <div className="flex items-center gap-[11px]">
                <span className="flex">
                  <FlagSvg code={flag} />
                </span>
                <span
                  className="text-[15px] font-bold"
                  style={{ color: "var(--text-dim)" }}
                >
                  {t("game.prompt").replace("{lang}", label)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[13px] font-extrabold"
                  style={{ color: "var(--text-dim2)" }}
                >
                  {t("game.wordOf")
                    .replace("{n}", String(round + 1))
                    .replace("{total}", String(total))}
                </span>
                <div className="flex gap-[5px]">
                  {rounds.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background:
                          i < round
                            ? "#16B57F"
                            : i === round
                            ? "#EC4DB0"
                            : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* the word */}
            <div className="text-center mb-2">
              <button
                dir="ltr"
                onClick={() => speak(r.word, r.bcp)}
                className="inline-flex items-center gap-[14px] border-0 cursor-pointer bg-transparent"
                style={{ fontFamily: "'Poppins',sans-serif" }}
              >
                <span
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    lineHeight: 1,
                    background: "linear-gradient(135deg,#BC22D6,#E0319E)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {r.word}
                </span>
                <span
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: "var(--pink-soft)",
                    color: "#EC4DB0",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                    <path
                      d="M16.5 8.5a5 5 0 010 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 6a8 8 0 010 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className="text-[14px] font-semibold mt-1.5"
                style={{ color: "var(--text-dim2)" }}
              >
                {t("game.tapHear")}
              </div>
            </div>

            {/* options */}
            <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-[14px] mt-[26px]">
              {r.opts.map((concept) => {
                const opt = optWord(locale, concept);
                const isAnswer = concept === r.ans;
                const isPicked = concept === picked;
                let bg = "var(--surface-2)";
                let col = "var(--text)";
                let bd = "1px solid var(--border)";
                let anim = "none";
                if (answered) {
                  if (isAnswer) {
                    bg = "rgba(22,181,127,.16)";
                    col = "#16B57F";
                    bd = "1.5px solid #16B57F";
                  } else if (isPicked) {
                    bg = "rgba(224,49,158,.14)";
                    col = "#E0319E";
                    bd = "1.5px solid #E0319E";
                    anim = "gg-shake .4s";
                  } else {
                    col = "var(--text-dim2)";
                  }
                }
                return (
                  <button
                    key={concept}
                    onClick={() => pick(concept)}
                    className="flex items-center gap-[10px] text-left"
                    style={{
                      padding: "18px 20px",
                      borderRadius: 14,
                      background: bg,
                      border: bd,
                      color: col,
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      cursor: answered ? "default" : "pointer",
                      animation: anim,
                      transition: "all .15s ease",
                    }}
                  >
                    <span>{opt}</span>
                    {answered && isAnswer && (
                      <span className="ml-auto flex">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    {answered && isPicked && !isAnswer && (
                      <span className="ml-auto font-extrabold">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* feedback */}
            <div className="text-center mt-[18px]" style={{ height: 30 }}>
              {answered && picked === r.ans && (
                <span className="text-[17px] font-extrabold" style={{ color: "#16B57F" }}>
                  ✓ {CORRECT_MSGS[round % CORRECT_MSGS.length]}
                </span>
              )}
              {answered && picked !== r.ans && (
                <span className="text-[17px] font-extrabold" style={{ color: "#E0319E" }}>
                  {t("game.wrong").replace("{answer}", optWord(locale, r.ans))}
                </span>
              )}
            </div>

            {answered && (
              <div className="text-center mt-1.5">
                <button
                  onClick={next}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "13px 32px",
                    borderRadius: 14,
                    background: "linear-gradient(135deg,#BC22D6,#E0319E)",
                    color: "#fff",
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    boxShadow: "0 12px 28px -10px rgba(200,31,212,.7)",
                  }}
                >
                  {last ? t("game.seeScore") : t("game.next")}
                </button>
              </div>
            )}
          </div>
        )}

        {finished && (
          <div className="text-center pt-[14px] pb-1.5">
            <div style={{ fontSize: 60, lineHeight: 1, marginBottom: 6 }}>
              {resultEmoji}
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: 6,
              }}
            >
              {t("game.scoreLine")
                .replace("{score}", String(correctCount))
                .replace("{total}", String(total))}
            </div>
            <div
              className="mx-auto"
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: "var(--text-dim)",
                maxWidth: 440,
                marginBottom: 24,
              }}
            >
              {t("game.resultBlurb")}
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <ChromeCTA label={t("cta.long")} glyphSize={18} style={{ padding: "15px 28px", fontSize: 16 }} />
              <button
                onClick={restart}
                style={{
                  border: "1.5px solid var(--border)",
                  cursor: "pointer",
                  background: "transparent",
                  color: "var(--text)",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  padding: "14px 24px",
                  borderRadius: 14,
                }}
              >
                {t("game.playAgain")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
