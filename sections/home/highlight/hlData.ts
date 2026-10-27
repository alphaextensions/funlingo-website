// Data for the homepage "highlight a word" layer, ported from the 2026
// redesign (Funlingo Home.dc.html). The homepage behaves like the extension:
// selecting a word, or hovering one of five hidden words in the headings, opens
// a popup with its meaning in the language being learned.

/** Languages a meaning is prepared for, as columns of GLOSS (after the part of speech). */
const LEARN_COLS = ["es", "fr", "it", "de", "ko", "ja", "zh"] as const;
type LearnCol = (typeof LEARN_COLS)[number];

const BCP: Record<LearnCol, string> = {
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
  de: "de-DE",
  ko: "ko-KR",
  ja: "ja-JP",
  zh: "zh-CN",
};

// [part of speech, es, fr, it, de, ko, ja, zh]. Korean, Japanese and Chinese
// carry a romanisation after "|".
const GLOSS: Record<string, [string, string, string, string, string, string, string, string]> = {
  watch: ["verb", "mirar", "regarder", "guardare", "schauen", "보다|boda", "見る|miru", "看|kàn"],
  love: ["verb", "amar", "aimer", "amare", "lieben", "사랑하다|saranghada", "愛する|ai suru", "爱|ài"],
  language: ["noun", "el idioma", "la langue", "la lingua", "die Sprache", "언어|eoneo", "言語|gengo", "语言|yǔyán"],
  studying: ["verb", "estudiar", "étudier", "studiare", "lernen", "공부하다|gongbuhada", "勉強する|benkyō suru", "学习|xuéxí"],
  lesson: ["noun", "la lección", "la leçon", "la lezione", "die Lektion", "수업|sueop", "レッスン|ressun", "课|kè"],
  learn: ["verb", "aprender", "apprendre", "imparare", "lernen", "배우다|baeuda", "学ぶ|manabu", "学|xué"],
  word: ["noun", "la palabra", "le mot", "la parola", "das Wort", "단어|daneo", "単語|tango", "单词|dāncí"],
  meaning: ["noun", "el significado", "le sens", "il significato", "die Bedeutung", "의미|uimi", "意味|imi", "意思|yìsi"],
  subtitles: ["noun", "los subtítulos", "les sous-titres", "i sottotitoli", "die Untertitel", "자막|jamak", "字幕|jimaku", "字幕|zìmù"],
  free: ["adj", "gratis", "gratuit", "gratis", "kostenlos", "무료|muryo", "無料|muryō", "免费|miǎnfèi"],
  episode: ["noun", "el episodio", "l'épisode", "l'episodio", "die Folge", "에피소드|episodeu", "エピソード|episōdo", "一集|yì jí"],
  tonight: ["adv", "esta noche", "ce soir", "stasera", "heute Abend", "오늘 밤|oneul bam", "今夜|kon’ya", "今晚|jīnwǎn"],
  friend: ["noun", "el amigo", "l'ami", "l'amico", "der Freund", "친구|chingu", "友達|tomodachi", "朋友|péngyou"],
  easy: ["adj", "fácil", "facile", "facile", "einfach", "쉬운|swiun", "簡単|kantan", "简单|jiǎndān"],
  delicious: ["adj", "delicioso", "délicieux", "delizioso", "lecker", "맛있는|masinneun", "おいしい|oishii", "好吃|hǎochī"],
  lemon: ["noun", "el limón", "le citron", "il limone", "die Zitrone", "레몬|remon", "レモン|remon", "柠檬|níngméng"],
  bake: ["verb", "hornear", "cuire au four", "cuocere", "backen", "굽다|gupda", "焼く|yaku", "烤|kǎo"],
  oven: ["noun", "el horno", "le four", "il forno", "der Ofen", "오븐|obeun", "オーブン|ōbun", "烤箱|kǎoxiāng"],
  sugar: ["noun", "el azúcar", "le sucre", "lo zucchero", "der Zucker", "설탕|seoltang", "砂糖|satō", "糖|táng"],
  kitchen: ["noun", "la cocina", "la cuisine", "la cucina", "die Küche", "부엌|bueok", "台所|daidokoro", "厨房|chúfáng"],
  recipe: ["noun", "la receta", "la recette", "la ricetta", "das Rezept", "레시피|resipi", "レシピ|reshipi", "食谱|shípǔ"],
  cake: ["noun", "el pastel", "le gâteau", "la torta", "der Kuchen", "케이크|keikeu", "ケーキ|kēki", "蛋糕|dàngāo"],
  street: ["noun", "la calle", "la rue", "la strada", "die Straße", "거리|geori", "通り|tōri", "街|jiē"],
  grandma: ["noun", "la abuela", "la grand-mère", "la nonna", "die Oma", "할머니|halmeoni", "おばあちゃん|obāchan", "奶奶|nǎinai"],
};

export const HIDDEN_COUNT = 5;

/** Headings that carry a hidden word, in order: hero, how-it-works ×2, reviews, final CTA. */
export type HiddenSlot = 0 | 1 | 2 | 3 | 4;

// For each page language, the word to underline in each heading and the
// concept it stands for. English underlines the word itself. Tokens follow this
// site's own heading translations (the design's differ in places).
const HIDDEN_EN: [string, string][] = [
  ["watch", "watch"],
  ["love", "love"],
  ["language", "language"],
  ["studying", "studying"],
  ["lesson", "lesson"],
];
const HIDDEN: Record<string, [string, string][]> = {
  "zh-CN": [["边学", "learn"], ["喜爱", "love"], ["语言", "language"], ["学习", "studying"], ["课", "lesson"]],
  "zh-TW": [["邊學", "learn"], ["喜愛", "love"], ["語言", "language"], ["學習", "studying"], ["課", "lesson"]],
  tr: [["öğren", "learn"], ["sevdiğini", "love"], ["dil", "language"], ["ders çalışmak", "studying"], ["dersinize", "lesson"]],
  "pt-BR": [["assiste", "watch"], ["ama", "love"], ["idioma", "language"], ["estudar", "studying"], ["aula", "lesson"]],
  "pt-PT": [["vê", "watch"], ["adora", "love"], ["língua", "language"], ["estudar", "studying"], ["aula", "lesson"]],
  es: [["miras", "watch"], ["gusta", "love"], ["idioma", "language"], ["estudiar", "studying"], ["clase", "lesson"]],
  ru: [["смотрите", "watch"], ["любите", "love"], ["язык", "language"], ["учёба", "studying"], ["урок", "lesson"]],
  ko: [["배우세요", "learn"], ["좋아하는", "love"], ["언어", "language"], ["공부", "studying"], ["수업", "lesson"]],
  ja: [["学ぼう", "learn"], ["好き", "love"], ["言語", "language"], ["勉強", "studying"], ["レッスン", "lesson"]],
  fr: [["regardant", "watch"], ["aimez", "love"], ["langue", "language"], ["bachotage", "studying"], ["leçon", "lesson"]],
  vi: [["xem", "watch"], ["thích", "love"], ["ngôn ngữ", "language"], ["học", "studying"], ["bài học", "lesson"]],
  it: [["guardi", "watch"], ["ami", "love"], ["lingua", "language"], ["studio", "studying"], ["lezione", "lesson"]],
  de: [["schaust", "watch"], ["liebst", "love"], ["sprache", "language"], ["lernen", "studying"], ["lektion", "lesson"]],
  ar: [["تشاهد", "watch"], ["تحب", "love"], ["اللغة", "language"], ["المذاكرة", "studying"], ["درسك", "lesson"]],
  uk: [["дивитеся", "watch"], ["любите", "love"], ["мову", "language"], ["навчання", "studying"], ["урок", "lesson"]],
  nl: [["kijkt", "watch"], ["houdt", "love"], ["taal", "language"], ["studeren", "studying"], ["les", "lesson"]],
  hu: [["nézel", "watch"], ["szeretsz", "love"], ["nyelv", "language"], ["tanulás", "studying"], ["leckéd", "lesson"]],
  bg: [["гледаш", "watch"], ["обичаш", "love"], ["езика", "language"], ["учене", "studying"], ["урок", "lesson"]],
  hi: [["सीखें", "learn"], ["पसंद", "love"], ["भाषा", "language"], ["पढ़ाई", "studying"], ["पाठ", "lesson"]],
};

// A visitor learning English sees these English forms for the hidden concepts.
const EN_WORD: Record<string, string> = {
  watch: "to watch",
  love: "to love",
  language: "language",
  studying: "studying",
  lesson: "a lesson",
  learn: "to learn",
};

// The demo word in the visitor's own language, for visitors learning English
// (the extension explains an English page in your own language).
const DELICIOUS_NATIVE: Record<string, string> = {
  "zh-CN": "美味的", "zh-TW": "美味的", tr: "lezzetli", "pt-BR": "delicioso", "pt-PT": "delicioso",
  es: "delicioso", ru: "вкусный", ko: "맛있는", ja: "おいしい", fr: "délicieux", vi: "ngon",
  it: "delizioso", de: "lecker", ar: "لذيذ", uk: "смачний", nl: "heerlijk", hu: "finom", bg: "вкусен", hi: "स्वादिष्ट",
};

/** The page locale as HIDDEN / DELICIOUS_NATIVE key it, or "en". */
export function pageBase(locale: string): string {
  if (locale.startsWith("en")) return "en";
  if (HIDDEN[locale]) return locale;
  if (locale.startsWith("zh")) return /tw|hant/i.test(locale) ? "zh-TW" : "zh-CN";
  if (locale.startsWith("pt")) return locale === "pt-PT" ? "pt-PT" : "pt-BR";
  return locale.split("-")[0];
}

/** [token to underline, concept] for a heading on this page, or null when none. */
export function hiddenToken(locale: string, slot: HiddenSlot): [string, string] | null {
  const base = pageBase(locale);
  if (base === "en") return HIDDEN_EN[slot];
  return HIDDEN[base]?.[slot] ?? null;
}

export function hasHiddenWords(locale: string): boolean {
  return pageBase(locale) === "en" || !!HIDDEN[pageBase(locale)];
}

export type Gloss = {
  key: string;
  pos: string;
  tr: string;
  pron: string;
  code: string;
  bcp: string;
  /** What to speak, when it isn't `tr` (the English demo word). */
  speakText?: string;
};

/** The learning language as a GLOSS column, or "en"; unknown ones read as Spanish. */
function learnCol(learn: string): LearnCol | "en" {
  const base = learn.split("-")[0];
  if (base === "en") return "en";
  return (LEARN_COLS as readonly string[]).includes(base) ? (base as LearnCol) : "es";
}

/** Meaning of an English word (or concept) in the language being learned, or null. */
export function glossWord(raw: string, learn: string, locale: string): Gloss | null {
  const w = raw.toLowerCase().replace(/[^a-z']/g, "");
  const key = GLOSS[w] ? w : GLOSS[w.replace(/s$/, "")] ? w.replace(/s$/, "") : GLOSS[w.replace(/ing$/, "")] ? w.replace(/ing$/, "") : null;
  if (!key) return null;
  const row = GLOSS[key];
  const col = learnCol(learn);
  if (col === "en") {
    // Learning English from another page language: the demo word is explained
    // in the visitor's own language; hidden concepts show their English form.
    const base = pageBase(locale);
    const nat = key === "delicious" ? DELICIOUS_NATIVE[base] : undefined;
    if (nat) return { key, pos: row[0], tr: nat, pron: "", code: base.split("-")[0].toUpperCase(), bcp: "en-US", speakText: "delicious" };
    if (EN_WORD[key]) return { key, pos: row[0], tr: EN_WORD[key], pron: "", code: "EN", bcp: "en-US" };
    return null;
  }
  const [tr, pron = ""] = row[LEARN_COLS.indexOf(col) + 1].split("|");
  return { key, pos: row[0], tr, pron, code: col.toUpperCase(), bcp: BCP[col] };
}
