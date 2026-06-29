"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";

type Word = {
  text: string;
  pos?: string;
  meaning?: string;
  pron?: string;
};
type LangData = {
  code: string;
  bcp: string;
  helper?: string;
  translation: string;
  line: Word[];
};

// Sample subtitle lines per learning language. This is demonstration content
// (not UI chrome), so meanings stay in English regardless of the UI locale.
const DATA: Record<string, LangData> = {
  en: {
    code: "EN",
    bcp: "en-US",
    helper: "ES",
    translation: "¿Por qué me das un regalo?",
    line: [
      { text: "Why" },
      { text: "are" },
      { text: "you" },
      { text: "giving", pos: "verb", meaning: "dar / entregar", pron: "GIV-ing" },
      { text: "me" },
      { text: "a" },
      { text: "gift?", pos: "noun", meaning: "un regalo", pron: "gift" },
    ],
  },
  es: {
    code: "ES",
    bcp: "es-ES",
    helper: "EN",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "¿Por" },
      { text: "qué" },
      { text: "me" },
      { text: "das", pos: "verb", meaning: "you give", pron: "dahs" },
      { text: "un" },
      { text: "regalo?", pos: "noun", meaning: "a gift", pron: "reh-GAH-loh" },
    ],
  },
  fr: {
    code: "FR",
    bcp: "fr-FR",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "Pourquoi" },
      { text: "tu" },
      { text: "m'offres", pos: "verb", meaning: "you give me", pron: "moffr" },
      { text: "un" },
      { text: "cadeau ?", pos: "noun", meaning: "a gift", pron: "kah-DOH" },
    ],
  },
  it: {
    code: "IT",
    bcp: "it-IT",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "Perché" },
      { text: "mi" },
      { text: "fai", pos: "verb", meaning: "you give / make", pron: "fye" },
      { text: "un" },
      { text: "regalo?", pos: "noun", meaning: "a gift", pron: "reh-GAH-loh" },
    ],
  },
  de: {
    code: "DE",
    bcp: "de-DE",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "Warum" },
      { text: "schenkst", pos: "verb", meaning: "you give (as a gift)", pron: "SHENKST" },
      { text: "du" },
      { text: "mir" },
      { text: "ein" },
      { text: "Geschenk?", pos: "noun", meaning: "a gift", pron: "geh-SHENK" },
    ],
  },
  ko: {
    code: "KO",
    bcp: "ko-KR",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "왜" },
      { text: "나에게" },
      { text: "선물을", pos: "noun", meaning: "a gift", pron: "seon-mul" },
      { text: "줘?", pos: "verb", meaning: "give", pron: "jwo" },
    ],
  },
  ja: {
    code: "JA",
    bcp: "ja-JP",
    translation: "Why are you giving me a gift?",
    line: [
      { text: "どうして" },
      { text: "私に" },
      { text: "プレゼント", pos: "noun", meaning: "a present", pron: "pu-re-zen-to" },
      { text: "を" },
      { text: "くれるの？", pos: "verb", meaning: "to give (me)", pron: "ku-re-ru" },
    ],
  },
};

function speak(text: string, bcp: string) {
  try {
    const u = new SpeechSynthesisUtterance(text.replace(/[¿?？.]/g, ""));
    u.lang = bcp;
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* SpeechSynthesis unavailable */
  }
}

export default function FunlingoPlayer({ lang = "es" }: { lang?: string }) {
  const { t } = useT();
  const data = DATA[lang] || DATA.es;
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState<{ key: string; text: string; meaning: string }[]>(
    []
  );
  const leaveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset hover/saved when the learning language changes.
  React.useEffect(() => {
    setHovered(null);
    setSaved([]);
  }, [lang]);

  const enter = (key: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovered(key);
  };
  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 150);
  };
  const toggleSave = (w: { key: string; text: string; meaning: string }) =>
    setSaved((s) =>
      s.some((x) => x.key === w.key) ? s : [...s, w]
    );

  const langUpper = data.code;
  const helperUpper = data.helper || "EN";

  return (
    <div className="w-full" style={{ fontFamily: "'Poppins',sans-serif" }}>
      {/* Player / TV */}
      <div
        className="relative rounded-[26px] overflow-hidden"
        style={{ background: "#130C1F", boxShadow: "0 40px 80px -30px rgba(150,20,140,.6)" }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            height: 372,
            background:
              "radial-gradient(130% 110% at 72% 6%, #4A1F6E 0%, #2B1240 44%, #140A22 100%)",
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              top: -70,
              right: -40,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(236,77,176,.5), rgba(236,77,176,0) 70%)",
              filter: "blur(6px)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: -130,
              left: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(150,40,220,.45), rgba(150,40,220,0) 70%)",
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            style={{
              height: 150,
              background: "linear-gradient(to top, rgba(8,4,16,.9), rgba(8,4,16,0))",
            }}
          />

          {/* Netflix chip */}
          <div
            className="absolute flex items-center gap-2"
            style={{
              top: 18,
              left: 20,
              padding: "7px 12px",
              borderRadius: 999,
              background: "rgba(8,4,16,.5)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#E50914" }}
            />
            <span
              style={{
                color: "rgba(255,255,255,.92)",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: ".06em",
              }}
            >
              NETFLIX
            </span>
          </div>
          {/* Learning chip */}
          <div
            className="absolute flex items-center gap-[7px]"
            style={{
              top: 18,
              right: 20,
              padding: "7px 13px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#BC22D6,#E0319E)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 0 3px rgba(255,255,255,.35)",
              }}
            />
            <span
              style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: ".06em" }}
            >
              {t("player.learning")} {langUpper}
            </span>
          </div>

          {/* Subtitles */}
          <div
            className="absolute left-0 right-0 flex flex-col items-center gap-[10px] px-7"
            style={{ bottom: 34 }}
          >
            <div
              className="flex flex-wrap justify-center"
              style={{
                gap: "4px 3px",
                fontSize: 29,
                fontWeight: 700,
                lineHeight: 1.25,
                textShadow: "0 2px 14px rgba(0,0,0,.7)",
              }}
            >
              {data.line.map((w, i) => {
                const interesting = !!w.meaning;
                const key = lang + ":" + i;
                const isHover = hovered === key;
                const isSaved = saved.some((s) => s.key === key);
                return (
                  <span
                    key={key}
                    className="relative inline-block"
                    onMouseEnter={() => interesting && enter(key)}
                    onMouseLeave={() => leave()}
                  >
                    <span
                      onClick={() =>
                        interesting && (isHover ? setHovered(null) : enter(key))
                      }
                      style={
                        interesting
                          ? {
                              color: "#fff",
                              cursor: "pointer",
                              padding: "1px 7px",
                              borderRadius: 10,
                              borderBottom: "2px dashed #EC4DB0",
                              background: isHover
                                ? "rgba(236,77,176,.30)"
                                : "rgba(236,77,176,.12)",
                              transition: "background .15s ease",
                              display: "inline-block",
                            }
                          : { color: "rgba(255,255,255,.94)", padding: "0 1px" }
                      }
                    >
                      {w.text}
                    </span>
                    {isHover && interesting && (
                      <div
                        className="absolute z-40"
                        style={{
                          bottom: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          paddingBottom: 12,
                        }}
                        onMouseEnter={() => enter(key)}
                        onMouseLeave={() => leave()}
                      >
                        <div
                          style={{
                            width: 240,
                            background: "#fff",
                            borderRadius: 18,
                            boxShadow: "0 20px 48px -10px rgba(80,10,80,.55)",
                            padding: "15px 17px",
                            textAlign: "left",
                          }}
                        >
                          <div
                            className="flex items-baseline gap-2"
                            style={{ marginBottom: 3 }}
                          >
                            <span
                              style={{ fontSize: 20, fontWeight: 800, color: "#1B0F26" }}
                            >
                              {w.text}
                            </span>
                            {w.pos && (
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  letterSpacing: ".05em",
                                  color: "#C81FD4",
                                  textTransform: "uppercase",
                                }}
                              >
                                {w.pos}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: "#1B0F26",
                              marginBottom: 10,
                            }}
                          >
                            {w.meaning}
                          </div>
                          <button
                            onClick={() => speak(w.text, data.bcp)}
                            className="w-full flex items-center gap-2"
                            style={{
                              padding: "8px 11px",
                              border: "none",
                              cursor: "pointer",
                              borderRadius: 11,
                              background: "#FBEEF8",
                              marginBottom: 11,
                              fontFamily: "'Poppins',sans-serif",
                            }}
                          >
                            <span style={{ color: "#C81FD4", display: "flex" }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                                <path
                                  d="M16.5 8.5a5 5 0 010 7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#7A4E72",
                                fontStyle: "italic",
                              }}
                            >
                              {w.pron}
                            </span>
                            <span
                              style={{
                                marginLeft: "auto",
                                fontSize: 11,
                                fontWeight: 800,
                                color: "#C81FD4",
                              }}
                            >
                              {t("player.play")}
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              toggleSave({ key, text: w.text, meaning: w.meaning! })
                            }
                            className="w-full"
                            style={{
                              border: "none",
                              cursor: "pointer",
                              borderRadius: 12,
                              padding: "10px 12px",
                              fontFamily: "'Poppins',sans-serif",
                              fontSize: 14,
                              fontWeight: 800,
                              background: isSaved
                                ? "rgba(236,77,176,.14)"
                                : "linear-gradient(135deg,#BC22D6,#E0319E)",
                              color: isSaved ? "#B81E8E" : "#fff",
                            }}
                          >
                            {isSaved ? t("player.saved") : t("player.save")}
                          </button>
                        </div>
                      </div>
                    )}
                  </span>
                );
              })}
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 600,
                color: "#F277C0",
                textShadow: "0 1px 10px rgba(0,0,0,.6)",
              }}
            >
              {data.translation}
            </div>
          </div>
        </div>

        {/* Control strip */}
        <div
          className="flex items-center gap-[14px]"
          style={{ padding: "13px 18px", background: "#0E0719" }}
        >
          <span style={{ color: "#fff", display: "flex", opacity: 0.95 }}>
            <svg width="21" height="21" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
          <div
            className="flex-1 relative"
            style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,.16)" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: "38%",
                borderRadius: 99,
                background: "linear-gradient(90deg,#BC22D6,#E0319E)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "38%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,.4)",
              }}
            />
          </div>
          <span
            style={{
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            12:04 / 47:30
          </span>
          <div
            className="flex items-center"
            style={{ padding: 3, borderRadius: 999, background: "rgba(255,255,255,.1)" }}
          >
            <span
              style={{
                padding: "5px 11px",
                borderRadius: 999,
                background: "#fff",
                color: "#1B0F26",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {langUpper}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: 11,
                fontWeight: 900,
                padding: "0 5px",
              }}
            >
              +
            </span>
            <span
              style={{
                padding: "5px 11px",
                borderRadius: 999,
                background: "linear-gradient(135deg,#BC22D6,#E0319E)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {helperUpper}
            </span>
          </div>
        </div>
      </div>

      {/* Vocab card */}
      <div
        className="mt-4 rounded-[22px] border"
        style={{
          background: "var(--surface-2)",
          padding: "18px 20px",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-[9px]" style={{ marginBottom: 13 }}>
          <span style={{ color: "#E0319E", display: "flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>
            {t("player.myWords")}
          </span>
          <span
            style={{
              marginLeft: "auto",
              padding: "3px 12px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#BC22D6,#E0319E)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {saved.length}
          </span>
        </div>
        {saved.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {saved.map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-[7px]"
                style={{
                  padding: "8px 13px",
                  borderRadius: 13,
                  background: "var(--chip)",
                }}
              >
                <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>
                  {s.text}
                </span>
                <span style={{ color: "#E0319E", fontSize: 14 }}>→</span>
                <span style={{ fontWeight: 600, color: "var(--text-dim)", fontSize: 14 }}>
                  {s.meaning}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-dim)",
              lineHeight: 1.5,
            }}
          >
            {t("player.emptyHint")}
          </div>
        )}
      </div>
    </div>
  );
}
