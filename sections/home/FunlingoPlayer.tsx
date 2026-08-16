"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useT } from "@/app/i18n/I18nProvider";
import { track } from "@/app/_components/track";

type Concept = "give" | "gift" | "special" | "birthday" | "friend";
type PosKind = "verb" | "noun" | "adj";
type Word = {
  text: string;
  pron?: string;
  concept?: Concept; // interesting (highlighted) words carry a concept
  posKind?: PosKind;
};
type Line = { words: Word[] };
type LangData = {
  code: string;
  bcp: string;
  lines: Line[];
};

// The scene the player "plays" for each learning language. Every scene is the
// same three lines ("Why are you giving me a gift? / Because today is special. /
// Happy birthday, my friend!"), so each highlighted word carries a `concept`
// rather than a hardcoded gloss — the gloss, the translation line, the
// part-of-speech label and the helper-language chip all resolve into the
// VIEWER'S native language (the UI locale) at render time via NATIVE below.
const DATA: Record<string, LangData> = {
  en: {
    code: "EN",
    bcp: "en-US",
    lines: [
      { words: [
        { text: "Why" }, { text: "are" }, { text: "you" },
        { text: "giving", concept: "give", posKind: "verb", pron: "GIV-ing" },
        { text: "me" }, { text: "a" },
        { text: "gift?", concept: "gift", posKind: "noun", pron: "gift" },
      ] },
      { words: [
        { text: "Because" }, { text: "today" }, { text: "is" },
        { text: "special.", concept: "special", posKind: "adj", pron: "SPEH-shul" },
      ] },
      { words: [
        { text: "Happy" },
        { text: "birthday,", concept: "birthday", posKind: "noun", pron: "BERTH-day" },
        { text: "my" },
        { text: "friend!", concept: "friend", posKind: "noun", pron: "frend" },
      ] },
    ],
  },
  es: {
    code: "ES",
    bcp: "es-ES",
    lines: [
      { words: [
        { text: "¿Por" }, { text: "qué" }, { text: "me" },
        { text: "das", concept: "give", posKind: "verb", pron: "dahs" },
        { text: "un" },
        { text: "regalo?", concept: "gift", posKind: "noun", pron: "reh-GAH-loh" },
      ] },
      { words: [
        { text: "Porque" }, { text: "hoy" }, { text: "es" },
        { text: "especial.", concept: "special", posKind: "adj", pron: "es-peh-SYAL" },
      ] },
      { words: [
        { text: "¡Feliz" },
        { text: "cumpleaños,", concept: "birthday", posKind: "noun", pron: "koom-pleh-AH-nyos" },
        { text: "amigo!", concept: "friend", posKind: "noun", pron: "ah-MEE-goh" },
      ] },
    ],
  },
  fr: {
    code: "FR",
    bcp: "fr-FR",
    lines: [
      { words: [
        { text: "Pourquoi" }, { text: "tu" },
        { text: "m'offres", concept: "give", posKind: "verb", pron: "moffr" },
        { text: "un" },
        { text: "cadeau ?", concept: "gift", posKind: "noun", pron: "kah-DOH" },
      ] },
      { words: [
        { text: "Parce" }, { text: "qu'aujourd'hui" }, { text: "est" },
        { text: "spécial.", concept: "special", posKind: "adj", pron: "spay-SYAL" },
      ] },
      { words: [
        { text: "Joyeux" },
        { text: "anniversaire,", concept: "birthday", posKind: "noun", pron: "ah-nee-vehr-SEHR" },
        { text: "mon" },
        { text: "ami !", concept: "friend", posKind: "noun", pron: "ah-MEE" },
      ] },
    ],
  },
  it: {
    code: "IT",
    bcp: "it-IT",
    lines: [
      { words: [
        { text: "Perché" }, { text: "mi" },
        { text: "fai", concept: "give", posKind: "verb", pron: "fye" },
        { text: "un" },
        { text: "regalo?", concept: "gift", posKind: "noun", pron: "reh-GAH-loh" },
      ] },
      { words: [
        { text: "Perché" }, { text: "oggi" }, { text: "è" },
        { text: "speciale.", concept: "special", posKind: "adj", pron: "speh-CHAH-leh" },
      ] },
      { words: [
        { text: "Buon" },
        { text: "compleanno,", concept: "birthday", posKind: "noun", pron: "kom-pleh-AHN-noh" },
        { text: "amico!", concept: "friend", posKind: "noun", pron: "ah-MEE-koh" },
      ] },
    ],
  },
  de: {
    code: "DE",
    bcp: "de-DE",
    lines: [
      { words: [
        { text: "Warum" },
        { text: "schenkst", concept: "give", posKind: "verb", pron: "SHENKST" },
        { text: "du" }, { text: "mir" }, { text: "ein" },
        { text: "Geschenk?", concept: "gift", posKind: "noun", pron: "geh-SHENK" },
      ] },
      { words: [
        { text: "Weil" }, { text: "heute" },
        { text: "besonders", concept: "special", posKind: "adj", pron: "beh-ZON-ders" },
        { text: "ist." },
      ] },
      { words: [
        { text: "Alles" }, { text: "Gute" }, { text: "zum" },
        { text: "Geburtstag,", concept: "birthday", posKind: "noun", pron: "geh-BOORTS-tahk" },
        { text: "Freund!", concept: "friend", posKind: "noun", pron: "froynt" },
      ] },
    ],
  },
  ko: {
    code: "KO",
    bcp: "ko-KR",
    lines: [
      { words: [
        { text: "왜" }, { text: "나에게" },
        { text: "선물을", concept: "gift", posKind: "noun", pron: "seon-mul" },
        { text: "줘?", concept: "give", posKind: "verb", pron: "jwo" },
      ] },
      { words: [
        { text: "오늘은" },
        { text: "특별하니까.", concept: "special", posKind: "adj", pron: "teuk-byeol" },
      ] },
      { words: [
        { text: "생일", concept: "birthday", posKind: "noun", pron: "saeng-il" },
        { text: "축하해," },
        { text: "친구야!", concept: "friend", posKind: "noun", pron: "chin-gu" },
      ] },
    ],
  },
  ja: {
    code: "JA",
    bcp: "ja-JP",
    lines: [
      { words: [
        { text: "どうして" }, { text: "私に" },
        { text: "プレゼント", concept: "gift", posKind: "noun", pron: "pu-re-zen-to" },
        { text: "を" },
        { text: "くれるの？", concept: "give", posKind: "verb", pron: "ku-re-ru" },
      ] },
      { words: [
        { text: "今日は" },
        { text: "特別", concept: "special", posKind: "adj", pron: "to-ku-be-tsu" },
        { text: "だから。" },
      ] },
      { words: [
        { text: "お" },
        { text: "誕生日", concept: "birthday", posKind: "noun", pron: "tan-jou-bi" },
        { text: "おめでとう、" },
        { text: "友達！", concept: "friend", posKind: "noun", pron: "to-mo-da-chi" },
      ] },
    ],
  },
};

// Viewer's native language (UI locale) → helper-chip code, RTL flag, the three
// translated subtitle lines, the concept glosses, and the part-of-speech labels.
type Native = {
  code: string;
  rtl?: boolean;
  s: [string, string, string];
  give: string;
  gift: string;
  special: string;
  birthday: string;
  friend: string;
  verb: string;
  noun: string;
  adj: string;
};

const NATIVE: Record<string, Native> = {
  en: { code: "EN", s: ["Why are you giving me a gift?", "Because today is special.", "Happy birthday, my friend!"], give: "to give", gift: "a gift", special: "special", birthday: "birthday", friend: "friend", verb: "verb", noun: "noun", adj: "adj" },
  "zh-CN": { code: "ZH", s: ["你为什么送我礼物？", "因为今天很特别。", "生日快乐，我的朋友！"], give: "送 / 给", gift: "礼物", special: "特别的", birthday: "生日", friend: "朋友", verb: "动词", noun: "名词", adj: "形容词" },
  "zh-TW": { code: "ZH", s: ["你為什麼送我禮物？", "因為今天很特別。", "生日快樂，我的朋友！"], give: "送 / 給", gift: "禮物", special: "特別的", birthday: "生日", friend: "朋友", verb: "動詞", noun: "名詞", adj: "形容詞" },
  es: { code: "ES", s: ["¿Por qué me das un regalo?", "Porque hoy es especial.", "¡Feliz cumpleaños, amigo!"], give: "dar", gift: "un regalo", special: "especial", birthday: "cumpleaños", friend: "amigo", verb: "verbo", noun: "sustantivo", adj: "adjetivo" },
  pt: { code: "PT", s: ["Por que você me dá um presente?", "Porque hoje é especial.", "Feliz aniversário, meu amigo!"], give: "dar", gift: "um presente", special: "especial", birthday: "aniversário", friend: "amigo", verb: "verbo", noun: "substantivo", adj: "adjetivo" },
  ru: { code: "RU", s: ["Почему ты даришь мне подарок?", "Потому что сегодня особенный день.", "С днём рождения, друг!"], give: "дарить", gift: "подарок", special: "особенный", birthday: "день рождения", friend: "друг", verb: "глагол", noun: "сущ.", adj: "прил." },
  ko: { code: "KO", s: ["왜 나에게 선물을 줘?", "오늘은 특별하니까.", "생일 축하해, 친구야!"], give: "주다", gift: "선물", special: "특별한", birthday: "생일", friend: "친구", verb: "동사", noun: "명사", adj: "형용사" },
  ja: { code: "JA", s: ["どうして私にプレゼントをくれるの？", "今日は特別だから。", "お誕生日おめでとう、友達！"], give: "くれる", gift: "プレゼント", special: "特別な", birthday: "誕生日", friend: "友達", verb: "動詞", noun: "名詞", adj: "形容詞" },
  fr: { code: "FR", s: ["Pourquoi tu m'offres un cadeau ?", "Parce qu'aujourd'hui est spécial.", "Joyeux anniversaire, mon ami !"], give: "offrir / donner", gift: "un cadeau", special: "spécial", birthday: "anniversaire", friend: "ami", verb: "verbe", noun: "nom", adj: "adjectif" },
  it: { code: "IT", s: ["Perché mi fai un regalo?", "Perché oggi è speciale.", "Buon compleanno, amico!"], give: "dare / fare", gift: "un regalo", special: "speciale", birthday: "compleanno", friend: "amico", verb: "verbo", noun: "sostantivo", adj: "aggettivo" },
  de: { code: "DE", s: ["Warum schenkst du mir ein Geschenk?", "Weil heute besonders ist.", "Alles Gute zum Geburtstag, Freund!"], give: "schenken", gift: "ein Geschenk", special: "besonders", birthday: "Geburtstag", friend: "Freund", verb: "Verb", noun: "Substantiv", adj: "Adjektiv" },
  ar: { code: "AR", rtl: true, s: ["لماذا تعطيني هدية؟", "لأن اليوم مميز.", "عيد ميلاد سعيد يا صديقي!"], give: "تُعطي", gift: "هدية", special: "مميّز", birthday: "عيد ميلاد", friend: "صديق", verb: "فعل", noun: "اسم", adj: "صفة" },
  tr: { code: "TR", s: ["Bana neden bir hediye veriyorsun?", "Çünkü bugün özel.", "Doğum günün kutlu olsun, dostum!"], give: "vermek", gift: "hediye", special: "özel", birthday: "doğum günü", friend: "arkadaş", verb: "fiil", noun: "isim", adj: "sıfat" },
  vi: { code: "VI", s: ["Sao bạn lại tặng tôi một món quà?", "Vì hôm nay rất đặc biệt.", "Chúc mừng sinh nhật, bạn của tôi!"], give: "tặng", gift: "món quà", special: "đặc biệt", birthday: "sinh nhật", friend: "bạn", verb: "động từ", noun: "danh từ", adj: "tính từ" },
  uk: { code: "UK", s: ["Чому ти даруєш мені подарунок?", "Тому що сьогодні особливий день.", "З днем народження, друже!"], give: "дарувати", gift: "подарунок", special: "особливий", birthday: "день народження", friend: "друг", verb: "дієслово", noun: "іменник", adj: "прикм." },
  nl: { code: "NL", s: ["Waarom geef je me een cadeau?", "Omdat vandaag speciaal is.", "Fijne verjaardag, mijn vriend!"], give: "geven", gift: "een cadeau", special: "speciaal", birthday: "verjaardag", friend: "vriend", verb: "werkwoord", noun: "zelfst. nw.", adj: "bijv. nw." },
  hu: { code: "HU", s: ["Miért adsz nekem ajándékot?", "Mert ma különleges nap van.", "Boldog születésnapot, barátom!"], give: "adni", gift: "ajándék", special: "különleges", birthday: "születésnap", friend: "barát", verb: "ige", noun: "főnév", adj: "melléknév" },
  bg: { code: "BG", s: ["Защо ми правиш подарък?", "Защото днес е специален.", "Честит рожден ден, приятелю!"], give: "давам", gift: "подарък", special: "специален", birthday: "рожден ден", friend: "приятел", verb: "глагол", noun: "същ.", adj: "прил." },
};

// UI locale → native-dictionary bucket (mirrors the design's nbase()).
function nbase(code?: string): string {
  if (!code) return "en";
  if (code.indexOf("zh") === 0)
    return code.toLowerCase().includes("tw") || code.includes("Hant") ? "zh-TW" : "zh-CN";
  if (code.indexOf("pt") === 0) return "pt";
  if (code.indexOf("en") === 0) return "en";
  const two = code.split("-")[0];
  return NATIVE[code] ? code : NATIVE[two] ? two : "en";
}

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
  const { t, locale } = useT();
  const data = DATA[lang] || DATA.es;
  const total = data.lines.length;

  // The viewer's native language — everything glossed in the player resolves here.
  const N = NATIVE[nbase(locale)] || NATIVE.en;
  const meaningOf = (w: Word) => (w.concept ? N[w.concept] : "");
  const posOf = (w: Word) =>
    w.posKind === "verb" ? N.verb : w.posKind === "adj" ? N.adj : N.noun;

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
  const helperUpper = N.code;
  const tipDir = N.rtl ? "rtl" : "ltr";
  const current = data.lines[lineIndex];
  const curTranslation = N.s[lineIndex] || "";
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
              <div dir="ltr" className="flex flex-wrap justify-center" style={{ gap: "4px 3px", fontSize: 29, fontWeight: 700, lineHeight: 1.25, textShadow: "0 2px 14px rgba(0,0,0,.7)" }}>
                {current.words.map((w, i) => {
                  const interesting = !!w.concept;
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
              <div dir={tipDir} style={{ fontSize: 19, fontWeight: 600, color: "#F277C0", textShadow: "0 1px 10px rgba(0,0,0,.6)", textAlign: "center" }}>{curTranslation}</div>
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
          <div dir="ltr" className="flex items-center" style={{ padding: 3, borderRadius: 999, background: "rgba(255,255,255,.1)" }}>
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
                <span dir="ltr" style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{s.text}</span>
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
              // Clamp the centered 240px popup inside the viewport so it never
              // spills past a screen edge (which caused horizontal scroll on mobile).
              left: Math.min(
                Math.max(hover.rect.left + hover.rect.width / 2, 128),
                (typeof window !== "undefined" ? window.innerWidth : 400) - 128
              ),
              top: hover.rect.top,
              transform: "translate(-50%, -100%)",
              paddingBottom: 12,
              zIndex: 50,
              fontFamily: "'Poppins',sans-serif",
            }}
            onMouseEnter={cancelLeave}
            onMouseLeave={leave}
          >
            <div dir={tipDir} style={{ width: 240, background: "#fff", borderRadius: 18, boxShadow: "0 20px 48px -10px rgba(80,10,80,.55)", padding: "15px 17px", textAlign: "start" }}>
              <div className="flex items-baseline gap-2" style={{ marginBottom: 3 }}>
                <span dir="ltr" style={{ fontSize: 20, fontWeight: 800, color: "#1B0F26" }}>{hover.w.text}</span>
                {hover.w.posKind && (
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", color: "#C81FD4", textTransform: "uppercase" }}>{posOf(hover.w)}</span>
                )}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1B0F26", marginBottom: 10 }}>{meaningOf(hover.w)}</div>
              <button
                onClick={() => speak(hover.w.text, data.bcp)}
                data-cta
                className="w-full flex items-center gap-2"
                style={{ padding: "8px 11px", border: "none", cursor: "pointer", borderRadius: 11, background: "#FBEEF8", marginBottom: 11, fontFamily: "'Poppins',sans-serif" }}
              >
                <span style={{ color: "#C81FD4", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                    <path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span dir="ltr" style={{ fontSize: 13, fontWeight: 700, color: "#7A4E72", fontStyle: "italic" }}>{hover.w.pron}</span>
                <span style={{ marginInlineStart: "auto", fontSize: 11, fontWeight: 800, color: "#C81FD4" }}>{t("player.play")}</span>
              </button>
              {(() => {
                const isSaved = saved.some((s) => s.key === hover.key);
                return (
                  <button
                    onClick={() => toggleSave({ key: hover.key, text: hover.w.text, meaning: meaningOf(hover.w) })}
                    data-cta
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
