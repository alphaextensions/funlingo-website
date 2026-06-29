"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { ChromeCTA } from "@/app/_components/cta";
import { track } from "@/app/_components/track";
import { FlagSvg } from "./flags";

type Round = { word: string; answer: string; options: string[] };
type LangSet = { label: string; flag: string; bcp: string; rounds: Round[] };

// Word sets per learning language. Options are in the helper/native language
// (English for all targets; Spanish when the learner picked English), matching
// the player demo. The selected "I want to learn" language drives which set
// the visitor plays.
const LANGS: Record<string, LangSet> = {
  es: {
    label: "Spanish",
    flag: "es",
    bcp: "es-ES",
    rounds: [
      { word: "playa", answer: "a beach", options: ["a plate", "a beach", "a game", "a door"] },
      { word: "gato", answer: "a cat", options: ["a cat", "a dog", "a hat", "a car"] },
      { word: "agua", answer: "water", options: ["bread", "water", "fire", "money"] },
      { word: "feliz", answer: "happy", options: ["tired", "happy", "hungry", "angry"] },
      { word: "libro", answer: "a book", options: ["a book", "a table", "a shoe", "a key"] },
      { word: "amigo", answer: "a friend", options: ["a friend", "a brother", "a neighbor", "a teacher"] },
    ],
  },
  fr: {
    label: "French",
    flag: "fr",
    bcp: "fr-FR",
    rounds: [
      { word: "cadeau", answer: "a gift", options: ["a gift", "a song", "a key", "a dog"] },
      { word: "chien", answer: "a dog", options: ["a cat", "a dog", "a bird", "a fish"] },
      { word: "eau", answer: "water", options: ["bread", "water", "wine", "milk"] },
      { word: "heureux", answer: "happy", options: ["sad", "happy", "tired", "busy"] },
      { word: "livre", answer: "a book", options: ["a book", "a pen", "a chair", "a window"] },
      { word: "ami", answer: "a friend", options: ["a friend", "an enemy", "a cousin", "a guest"] },
    ],
  },
  it: {
    label: "Italian",
    flag: "it",
    bcp: "it-IT",
    rounds: [
      { word: "felice", answer: "happy", options: ["tired", "happy", "hungry", "late"] },
      { word: "gatto", answer: "a cat", options: ["a cat", "a mouse", "a horse", "a cow"] },
      { word: "acqua", answer: "water", options: ["water", "bread", "salt", "oil"] },
      { word: "casa", answer: "a house", options: ["a house", "a road", "a tree", "a boat"] },
      { word: "libro", answer: "a book", options: ["a book", "a lamp", "a plate", "a coin"] },
      { word: "amico", answer: "a friend", options: ["a friend", "a stranger", "a doctor", "a king"] },
    ],
  },
  de: {
    label: "German",
    flag: "de",
    bcp: "de-DE",
    rounds: [
      { word: "Freund", answer: "a friend", options: ["bread", "a friend", "morning", "a street"] },
      { word: "Hund", answer: "a dog", options: ["a dog", "a cat", "a bird", "a bear"] },
      { word: "Wasser", answer: "water", options: ["water", "fire", "wind", "stone"] },
      { word: "glücklich", answer: "happy", options: ["angry", "happy", "sleepy", "sick"] },
      { word: "Buch", answer: "a book", options: ["a book", "a door", "a clock", "a spoon"] },
      { word: "Haus", answer: "a house", options: ["a house", "a garden", "a bridge", "a car"] },
    ],
  },
  ko: {
    label: "Korean",
    flag: "ko",
    bcp: "ko-KR",
    rounds: [
      { word: "사랑", answer: "love", options: ["water", "money", "love", "a friend"] },
      { word: "고양이", answer: "a cat", options: ["a cat", "a dog", "a fish", "a bird"] },
      { word: "물", answer: "water", options: ["water", "rice", "tea", "milk"] },
      { word: "행복", answer: "happiness", options: ["sadness", "happiness", "anger", "fear"] },
      { word: "책", answer: "a book", options: ["a book", "a pen", "a bag", "a phone"] },
      { word: "친구", answer: "a friend", options: ["a friend", "a teacher", "a sister", "a guest"] },
    ],
  },
  ja: {
    label: "Japanese",
    flag: "ja",
    bcp: "ja-JP",
    rounds: [
      { word: "ねこ", answer: "a cat", options: ["a book", "rain", "a star", "a cat"] },
      { word: "いぬ", answer: "a dog", options: ["a dog", "a cat", "a fish", "a frog"] },
      { word: "みず", answer: "water", options: ["water", "fire", "a tree", "gold"] },
      { word: "ともだち", answer: "a friend", options: ["a friend", "a stranger", "a brother", "a rival"] },
      { word: "ほん", answer: "a book", options: ["a book", "a desk", "a door", "a hat"] },
      { word: "しあわせ", answer: "happiness", options: ["sadness", "happiness", "anger", "worry"] },
    ],
  },
  en: {
    label: "English",
    flag: "en",
    bcp: "en-US",
    rounds: [
      { word: "gift", answer: "un regalo", options: ["una canción", "un regalo", "una llave", "un perro"] },
      { word: "cat", answer: "un gato", options: ["un gato", "un perro", "un pájaro", "un pez"] },
      { word: "water", answer: "agua", options: ["pan", "agua", "fuego", "dinero"] },
      { word: "happy", answer: "feliz", options: ["cansado", "feliz", "hambriento", "enojado"] },
      { word: "book", answer: "un libro", options: ["un libro", "una mesa", "un zapato", "una llave"] },
      { word: "friend", answer: "un amigo", options: ["un amigo", "un hermano", "un vecino", "un maestro"] },
    ],
  },
};

const CORRECT_MSGS = ["Nice!", "You got it!", "Exactly!", "Spot on!", "Yes!"];

function speak(text: string, bcp: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp;
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* unavailable */
  }
}

export default function GuessGame({ lang = "es" }: { lang?: string }) {
  const { t } = useT();
  const set = LANGS[lang] || LANGS.es;
  const rounds = set.rounds;
  const total = rounds.length;

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

  const r = rounds[round];
  const answered = picked != null;
  const last = round >= total - 1;

  const pick = (opt: string) => {
    if (picked != null) return;
    const right = opt === r.answer;
    speak(r.word, set.bcp);
    setPicked(opt);
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
                  <FlagSvg code={set.flag} />
                </span>
                <span
                  className="text-[15px] font-bold"
                  style={{ color: "var(--text-dim)" }}
                >
                  {t("game.prompt").replace("{lang}", set.label)}
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
                onClick={() => speak(r.word, set.bcp)}
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
              {r.options.map((opt) => {
                const isAnswer = opt === r.answer;
                const isPicked = opt === picked;
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
                    key={opt}
                    onClick={() => pick(opt)}
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
              {answered && picked === r.answer && (
                <span className="text-[17px] font-extrabold" style={{ color: "#16B57F" }}>
                  ✓ {CORRECT_MSGS[round % CORRECT_MSGS.length]}
                </span>
              )}
              {answered && picked !== r.answer && (
                <span className="text-[17px] font-extrabold" style={{ color: "#E0319E" }}>
                  {t("game.wrong").replace("{answer}", r.answer)}
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
