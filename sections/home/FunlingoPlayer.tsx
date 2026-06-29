"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useT } from "@/app/i18n/I18nProvider";
import { track } from "@/app/_components/track";

type Word = {
  text: string;
  pos?: string;
  meaning?: string;
  pron?: string;
};
type Line = { translation: string; words: Word[] };
type LangData = {
  code: string;
  bcp: string;
  helper?: string;
  lines: Line[];
};

// A short multi-line "scene" per learning language. The player auto-advances
// through the lines so it feels like a real video playing, while any
// highlighted word stays hover-to-learn. This is demonstration content, so the
// meanings stay in English (the helper language) regardless of the UI locale.
const DATA: Record<string, LangData> = {
  en: {
    code: "EN",
    bcp: "en-US",
    helper: "ES",
    lines: [
      {
        translation: "¿Por qué me das un regalo?",
        words: [
          { text: "Why" }, { text: "are" }, { text: "you" },
          { text: "giving", pos: "verb", meaning: "dar / entregar", pron: "GIV-ing" },
          { text: "me" }, { text: "a" },
          { text: "gift?", pos: "noun", meaning: "un regalo", pron: "gift" },
        ],
      },
      {
        translation: "Porque hoy es especial.",
        words: [
          { text: "Because" }, { text: "today" }, { text: "is" },
          { text: "special.", pos: "adj", meaning: "especial", pron: "SPEH-shul" },
        ],
      },
      {
        translation: "¡Feliz cumpleaños, amigo!",
        words: [
          { text: "Happy" },
          { text: "birthday,", pos: "noun", meaning: "cumpleaños", pron: "BERTH-day" },
          { text: "my" },
          { text: "friend!", pos: "noun", meaning: "amigo", pron: "frend" },
        ],
      },
    ],
  },
  es: {
    code: "ES",
    bcp: "es-ES",
    helper: "EN",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "¿Por" }, { text: "qué" }, { text: "me" },
          { text: "das", pos: "verb", meaning: "you give", pron: "dahs" },
          { text: "un" },
          { text: "regalo?", pos: "noun", meaning: "a gift", pron: "reh-GAH-loh" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "Porque" }, { text: "hoy" }, { text: "es" },
          { text: "especial.", pos: "adj", meaning: "special", pron: "es-peh-SYAL" },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "¡Feliz" },
          { text: "cumpleaños,", pos: "noun", meaning: "birthday", pron: "koom-pleh-AH-nyos" },
          { text: "amigo!", pos: "noun", meaning: "friend", pron: "ah-MEE-goh" },
        ],
      },
    ],
  },
  fr: {
    code: "FR",
    bcp: "fr-FR",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "Pourquoi" }, { text: "tu" },
          { text: "m'offres", pos: "verb", meaning: "you give me", pron: "moffr" },
          { text: "un" },
          { text: "cadeau ?", pos: "noun", meaning: "a gift", pron: "kah-DOH" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "Parce" }, { text: "qu'aujourd'hui" }, { text: "est" },
          { text: "spécial.", pos: "adj", meaning: "special", pron: "spay-SYAL" },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "Joyeux" },
          { text: "anniversaire,", pos: "noun", meaning: "birthday", pron: "ah-nee-vehr-SEHR" },
          { text: "mon" },
          { text: "ami !", pos: "noun", meaning: "friend", pron: "ah-MEE" },
        ],
      },
    ],
  },
  it: {
    code: "IT",
    bcp: "it-IT",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "Perché" }, { text: "mi" },
          { text: "fai", pos: "verb", meaning: "you give / make", pron: "fye" },
          { text: "un" },
          { text: "regalo?", pos: "noun", meaning: "a gift", pron: "reh-GAH-loh" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "Perché" }, { text: "oggi" }, { text: "è" },
          { text: "speciale.", pos: "adj", meaning: "special", pron: "speh-CHAH-leh" },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "Buon" },
          { text: "compleanno,", pos: "noun", meaning: "birthday", pron: "kom-pleh-AHN-noh" },
          { text: "amico!", pos: "noun", meaning: "friend", pron: "ah-MEE-koh" },
        ],
      },
    ],
  },
  de: {
    code: "DE",
    bcp: "de-DE",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "Warum" },
          { text: "schenkst", pos: "verb", meaning: "you give (as a gift)", pron: "SHENKST" },
          { text: "du" }, { text: "mir" }, { text: "ein" },
          { text: "Geschenk?", pos: "noun", meaning: "a gift", pron: "geh-SHENK" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "Weil" }, { text: "heute" },
          { text: "besonders", pos: "adj", meaning: "special", pron: "beh-ZON-ders" },
          { text: "ist." },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "Alles" }, { text: "Gute" }, { text: "zum" },
          { text: "Geburtstag,", pos: "noun", meaning: "birthday", pron: "geh-BOORTS-tahk" },
          { text: "Freund!", pos: "noun", meaning: "friend", pron: "froynt" },
        ],
      },
    ],
  },
  ko: {
    code: "KO",
    bcp: "ko-KR",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "왜" }, { text: "나에게" },
          { text: "선물을", pos: "noun", meaning: "a gift", pron: "seon-mul" },
          { text: "줘?", pos: "verb", meaning: "give", pron: "jwo" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "오늘은" },
          { text: "특별하니까.", pos: "adj", meaning: "because it's special", pron: "teuk-byeol" },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "생일", pos: "noun", meaning: "birthday", pron: "saeng-il" },
          { text: "축하해," },
          { text: "친구야!", pos: "noun", meaning: "friend", pron: "chin-gu" },
        ],
      },
    ],
  },
  ja: {
    code: "JA",
    bcp: "ja-JP",
    lines: [
      {
        translation: "Why are you giving me a gift?",
        words: [
          { text: "どうして" }, { text: "私に" },
          { text: "プレゼント", pos: "noun", meaning: "a present", pron: "pu-re-zen-to" },
          { text: "を" },
          { text: "くれるの？", pos: "verb", meaning: "to give (me)", pron: "ku-re-ru" },
        ],
      },
      {
        translation: "Because today is special.",
        words: [
          { text: "今日は" },
          { text: "特別", pos: "noun", meaning: "special", pron: "to-ku-be-tsu" },
          { text: "だから。" },
        ],
      },
      {
        translation: "Happy birthday, my friend!",
        words: [
          { text: "お" },
          { text: "誕生日", pos: "noun", meaning: "birthday", pron: "tan-jou-bi" },
          { text: "おめでとう、" },
          { text: "友達！", pos: "noun", meaning: "friend", pron: "to-mo-da-chi" },
        ],
      },
    ],
  },
};

function speak(text: string, bcp: string) {
  try {
    const u = new SpeechSynthesisUtterance(text.replace(/[¿?？.,!]/g, ""));
    u.lang = bcp;
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* SpeechSynthesis unavailable */
  }
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function FunlingoPlayer({ lang = "es" }: { lang?: string }) {
  const { t } = useT();
  const data = DATA[lang] || DATA.es;
  const total = data.lines.length;

  // Auto-advances through the subtitle lines on a 2s timer; the 3 clickable
  // points let you jump at any time.
  const [lineIndex, setLineIndex] = React.useState(0);
  const [hover, setHover] = React.useState<{ key: string; w: Word; rect: DOMRect } | null>(null);
  const [saved, setSaved] = React.useState<
    { key: string; text: string; meaning: string }[]
  >([]);
  const leaveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when the learning language changes.
  React.useEffect(() => {
    setLineIndex(0);
    setHover(null);
    setSaved([]);
  }, [lang]);

  // Auto-advance: 2s per line, looping. Pauses while a word popup is open, and
  // the 2s window restarts whenever the line changes (e.g. after a manual jump).
  // Respects reduced-motion (stays static; the clickable points still work).
  React.useEffect(() => {
    if (hover) return;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* no matchMedia */
    }
    if (reduce) return;
    const id = setTimeout(() => setLineIndex((i) => (i + 1) % total), 2000);
    return () => clearTimeout(id);
  }, [lineIndex, hover, total, lang]);

  const enter = (key: string, w: Word, el: Element) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHover({ key, w, rect: el.getBoundingClientRect() });
  };
  const cancelLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };
  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHover(null), 150);
  };
  const toggleSave = (w: { key: string; text: string; meaning: string }) =>
    setSaved((s) => {
      if (s.some((x) => x.key === w.key)) return s;
      track("vocab_save", { word: w.text, lang });
      return [...s, w];
    });

  // Jump to a subtitle line via one of the clickable points.
  const jumpToLine = (i: number) => {
    setHover(null);
    setLineIndex(i);
    track("player_line_select", { line: i + 1, lang });
  };

  const langUpper = data.code;
  const helperUpper = data.helper || "EN";
  const current = data.lines[lineIndex];
  // Position along the bar: 3 evenly-spaced points (0 / 50 / 100% for 3 lines).
  const pos = total > 1 ? lineIndex / (total - 1) : 0;
  const curTime = fmtTime(12 + lineIndex * 21);

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
          <div className="absolute pointer-events-none" style={{ top: -70, right: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,77,176,.5), rgba(236,77,176,0) 70%)", filter: "blur(6px)" }} />
          <div className="absolute pointer-events-none" style={{ bottom: -130, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,40,220,.45), rgba(150,40,220,0) 70%)" }} />
          <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ height: 150, background: "linear-gradient(to top, rgba(8,4,16,.9), rgba(8,4,16,0))" }} />

          {/* Netflix chip */}
          <div className="absolute flex items-center gap-2" style={{ top: 18, left: 20, padding: "7px 12px", borderRadius: 999, background: "rgba(8,4,16,.5)", backdropFilter: "blur(6px)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E50914" }} />
            <span style={{ color: "rgba(255,255,255,.92)", fontSize: 12, fontWeight: 800, letterSpacing: ".06em" }}>NETFLIX</span>
          </div>
          {/* Learning chip */}
          <div className="absolute flex items-center gap-[7px]" style={{ top: 18, right: 20, padding: "7px 13px", borderRadius: 999, background: "linear-gradient(135deg,#BC22D6,#E0319E)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 3px rgba(255,255,255,.35)" }} />
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: ".06em" }}>{t("player.learning")} {langUpper}</span>
          </div>

          {/* Subtitles — keyed on lineIndex so each new line animates in */}
          <div className="absolute left-0 right-0 flex flex-col items-center gap-[10px] px-7" style={{ bottom: 34 }}>
            <div
              key={lineIndex}
              className="flex flex-col items-center gap-[10px] w-full"
              style={{ animation: "fnl-subin .45s ease" }}
            >
              <div className="flex flex-wrap justify-center" style={{ gap: "4px 3px", fontSize: 29, fontWeight: 700, lineHeight: 1.25, textShadow: "0 2px 14px rgba(0,0,0,.7)" }}>
                {current.words.map((w, i) => {
                  const interesting = !!w.meaning;
                  const key = `${lang}:${lineIndex}:${i}`;
                  const isHover = hover?.key === key;
                  return (
                    <span
                      key={key}
                      className="relative inline-block"
                      onMouseEnter={(e) => interesting && enter(key, w, e.currentTarget)}
                      onMouseLeave={() => leave()}
                    >
                      <span
                        onClick={(e) =>
                          interesting &&
                          (isHover ? setHover(null) : enter(key, w, e.currentTarget))
                        }
                        style={
                          interesting
                            ? {
                                color: "#fff",
                                cursor: "pointer",
                                padding: "1px 7px",
                                borderRadius: 10,
                                borderBottom: "2px dashed #EC4DB0",
                                background: isHover ? "rgba(236,77,176,.30)" : "rgba(236,77,176,.12)",
                                transition: "background .15s ease",
                                display: "inline-block",
                              }
                            : { color: "rgba(255,255,255,.94)", padding: "0 1px" }
                        }
                      >
                        {w.text}
                      </span>
                    </span>
                  );
                })}
              </div>
              <div style={{ fontSize: 19, fontWeight: 600, color: "#F277C0", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}>{current.translation}</div>
            </div>
          </div>

          {/* clickable line points — jump between the subtitle lines */}
          <div className="absolute left-0 right-0 flex items-center justify-center gap-[10px]" style={{ bottom: 12, zIndex: 6 }}>
            {data.lines.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToLine(i)}
                aria-label={`Go to line ${i + 1}`}
                title={`Line ${i + 1}`}
                style={{
                  width: i === lineIndex ? 26 : 11,
                  height: 11,
                  borderRadius: 99,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    i === lineIndex
                      ? "linear-gradient(90deg,#BC22D6,#E0319E)"
                      : "rgba(255,255,255,.4)",
                  boxShadow: i === lineIndex ? "0 2px 8px -2px rgba(224,49,158,.8)" : "none",
                  transition: "width .25s ease, background .25s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Control strip */}
        <div className="flex items-center gap-[14px]" style={{ padding: "13px 18px", background: "#0E0719" }}>
          <div
            className="flex-1 relative"
            style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,.16)" }}
            role="group"
            aria-label="Subtitle line selector"
          >
            <div className="absolute left-0 top-0 bottom-0" style={{ width: `${pos * 100}%`, borderRadius: 99, background: "linear-gradient(90deg,#BC22D6,#E0319E)", transition: "width .25s ease" }} />
            {/* position indicators (non-interactive) — the clickable points are
                the 3 dots inside the video above */}
            {data.lines.map((_, i) => {
              const p = total > 1 ? i / (total - 1) : 0;
              const isActive = i === lineIndex;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${p * 100}%`,
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: isActive ? 14 : 11,
                    height: isActive ? 14 : 11,
                    borderRadius: "50%",
                    border: "2px solid rgba(14,7,25,.9)",
                    background: i <= lineIndex ? "#fff" : "rgba(255,255,255,.5)",
                    boxShadow: isActive ? "0 0 0 3px rgba(224,49,158,.55)" : "none",
                    pointerEvents: "none",
                    transition: "all .2s ease",
                  }}
                />
              );
            })}
          </div>
          <span style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{curTime} / 47:30</span>
          <div className="flex items-center" style={{ padding: 3, borderRadius: 999, background: "rgba(255,255,255,.1)" }}>
            <span style={{ padding: "5px 11px", borderRadius: 999, background: "#fff", color: "#1B0F26", fontSize: 11, fontWeight: 900 }}>{langUpper}</span>
            <span style={{ color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 900, padding: "0 5px" }}>+</span>
            <span style={{ padding: "5px 11px", borderRadius: 999, background: "linear-gradient(135deg,#BC22D6,#E0319E)", color: "#fff", fontSize: 11, fontWeight: 900 }}>{helperUpper}</span>
          </div>
        </div>
      </div>

      {/* Vocab card */}
      <div className="mt-4 rounded-[22px] border" style={{ background: "var(--surface-2)", padding: "18px 20px", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-[9px]" style={{ marginBottom: 13 }}>
          <span style={{ color: "#E0319E", display: "flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" fill="currentColor" /></svg>
          </span>
          <span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{t("player.myWords")}</span>
          <span style={{ marginLeft: "auto", padding: "3px 12px", borderRadius: 999, background: "linear-gradient(135deg,#BC22D6,#E0319E)", color: "#fff", fontSize: 12, fontWeight: 800 }}>{saved.length}</span>
        </div>
        {saved.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {saved.map((s) => (
              <div key={s.key} className="flex items-center gap-[7px]" style={{ padding: "8px 13px", borderRadius: 13, background: "var(--chip)" }}>
                <span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{s.text}</span>
                <span style={{ color: "#E0319E", fontSize: 14 }}>→</span>
                <span style={{ fontWeight: 600, color: "var(--text-dim)", fontSize: 14 }}>{s.meaning}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-dim)", lineHeight: 1.5 }}>{t("player.emptyHint")}</div>
        )}
      </div>

      {/* Word popup — portaled to <body> so it layers ABOVE the floating word
          chips (which stay above the video player), and escapes the player's
          rounded/overflow box. Positioned just above the hovered word. */}
      {hover &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: hover.rect.left + hover.rect.width / 2,
              top: hover.rect.top,
              transform: "translate(-50%, -100%)",
              paddingBottom: 12,
              zIndex: 50,
              fontFamily: "'Poppins',sans-serif",
            }}
            onMouseEnter={cancelLeave}
            onMouseLeave={leave}
          >
            <div style={{ width: 240, background: "#fff", borderRadius: 18, boxShadow: "0 20px 48px -10px rgba(80,10,80,.55)", padding: "15px 17px", textAlign: "left" }}>
              <div className="flex items-baseline gap-2" style={{ marginBottom: 3 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#1B0F26" }}>{hover.w.text}</span>
                {hover.w.pos && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", color: "#C81FD4", textTransform: "uppercase" }}>{hover.w.pos}</span>
                )}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B0F26", marginBottom: 10 }}>{hover.w.meaning}</div>
              <button
                onClick={() => speak(hover.w.text, data.bcp)}
                className="w-full flex items-center gap-2"
                style={{ padding: "8px 11px", border: "none", cursor: "pointer", borderRadius: 11, background: "#FBEEF8", marginBottom: 11, fontFamily: "'Poppins',sans-serif" }}
              >
                <span style={{ color: "#C81FD4", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                    <path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#7A4E72", fontStyle: "italic" }}>{hover.w.pron}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 800, color: "#C81FD4" }}>{t("player.play")}</span>
              </button>
              {(() => {
                const isSaved = saved.some((s) => s.key === hover.key);
                return (
                  <button
                    onClick={() => toggleSave({ key: hover.key, text: hover.w.text, meaning: hover.w.meaning! })}
                    className="w-full"
                    style={{
                      border: "none", cursor: "pointer", borderRadius: 12, padding: "10px 12px",
                      fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 800,
                      background: isSaved ? "rgba(236,77,176,.14)" : "linear-gradient(135deg,#BC22D6,#E0319E)",
                      color: isSaved ? "#B81E8E" : "#fff",
                    }}
                  >
                    {isSaved ? t("player.saved") : t("player.save")}
                  </button>
                );
              })()}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
