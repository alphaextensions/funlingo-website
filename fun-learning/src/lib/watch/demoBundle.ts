/**
 * Demo bundle for /watch/demo (Wave 13 — PM BLOCKER-16 fix).
 *
 * `/watch/demo` is the single landing we point cold prospects at. Every
 * production AI route is behind `withIdempotency` which returns 401 for a
 * signed-out viewer, so a cold prospect used to hit:
 *   - "translating 0/7 forever" → 15s timeout → red retry
 *   - word tap → red "Could not load this word"
 *   - save word → red "Could not save word"
 *
 * The chosen fix (spec option (b)): ship a precomputed translation + a tiny
 * WordCard dictionary beside DEMO_CAPTIONS. The learner's translation
 * renders instantly from the bundle; the word-tap WordCard is static; the
 * save-word button shows a sign-in prompt instead of a 401. Nothing hits
 * `/api/*` from the demo path for a signed-out viewer, so no auth, no DB
 * write, no idempotency key, no AI call.
 *
 * Signed-in demo viewers (B-17): the demo UI still uses the bundled
 * translation / WordCard (fast + offline + cheap) but the SAVE action
 * still writes a real `UserWord` into their active-lang deck via
 * `/api/watch/saveWord`. See WatchClient.saveWord.
 *
 * All text here is Funlingo-authored (not scraped from a copyrighted
 * script). The lemma list covers every tappable word in DEMO_CAPTIONS.
 */

import type { WordCard } from "@/lib/ai";

/** Natural translations of the 7 DEMO_CAPTIONS lines, keyed by lang code.
 *  Keys match `targetLang` codes used in Settings. Add a new language by
 *  dropping another 7-item array in. Falls back to English if the viewer's
 *  nativeLang isn't bundled. */
export const DEMO_TRANSLATIONS: Record<string, string[]> = {
  en: [
    "We choose to learn languages.",
    "Not because it is easy, but because it is fun.",
    "We break the ice with every new word.",
    "Same old, same old — until today.",
    "How have you been with your studies?",
    "Honestly, I've been better, but I'll keep going.",
    "Carry out one more lesson, then take a break.",
  ],
  es: [
    "Elegimos aprender idiomas.",
    "No porque sea fácil, sino porque es divertido.",
    "Rompemos el hielo con cada palabra nueva.",
    "Lo de siempre, lo de siempre — hasta hoy.",
    "¿Cómo te ha ido con tus estudios?",
    "Honestamente, he estado mejor, pero voy a seguir.",
    "Haz una lección más y luego tómate un descanso.",
  ],
  fr: [
    "Nous choisissons d'apprendre les langues.",
    "Pas parce que c'est facile, mais parce que c'est amusant.",
    "On brise la glace avec chaque mot nouveau.",
    "Toujours la même chose — jusqu'à aujourd'hui.",
    "Comment vont tes études ?",
    "Honnêtement, j'ai été mieux, mais je continue.",
    "Fais une leçon de plus, puis prends une pause.",
  ],
  de: [
    "Wir entscheiden uns, Sprachen zu lernen.",
    "Nicht weil es einfach ist, sondern weil es Spaß macht.",
    "Wir brechen das Eis mit jedem neuen Wort.",
    "Immer dasselbe — bis heute.",
    "Wie läuft es mit deinen Studien?",
    "Ehrlich gesagt, mir ging's schon besser, aber ich mache weiter.",
    "Mach noch eine Lektion, dann leg eine Pause ein.",
  ],
  pt: [
    "Escolhemos aprender idiomas.",
    "Não porque é fácil, mas porque é divertido.",
    "Quebramos o gelo com cada palavra nova.",
    "O de sempre, o de sempre — até hoje.",
    "Como têm sido os seus estudos?",
    "Para ser honesto, já estive melhor, mas vou continuar.",
    "Faça mais uma lição e depois dê um descanso.",
  ],
  it: [
    "Scegliamo di imparare le lingue.",
    "Non perché sia facile, ma perché è divertente.",
    "Rompiamo il ghiaccio con ogni nuova parola.",
    "Il solito — fino a oggi.",
    "Come stanno andando i tuoi studi?",
    "Onestamente, sono stato meglio, ma vado avanti.",
    "Fai un'altra lezione e poi fai una pausa.",
  ],
  ja: [
    "私たちは言語を学ぶことを選びます。",
    "簡単だからではなく、楽しいから。",
    "新しい単語ごとに打ち解けていく。",
    "いつも通り — 今日までは。",
    "最近、勉強の調子はどう？",
    "正直、もっと良い時もあったけど、続けるよ。",
    "もう一つレッスンをやってから、休もう。",
  ],
  ko: [
    "우리는 언어를 배우기로 선택합니다.",
    "쉬워서가 아니라, 재미있어서예요.",
    "새 단어를 만날 때마다 어색함을 깨요.",
    "늘 똑같은 하루 — 오늘까지는.",
    "요즘 공부는 어때요?",
    "솔직히, 더 좋았던 적도 있지만, 계속 할 거예요.",
    "한 과만 더 하고, 그다음 쉬어요.",
  ],
  hi: [
    "हम भाषाएँ सीखना चुनते हैं।",
    "इसलिए नहीं कि यह आसान है, बल्कि इसलिए कि यह मज़ेदार है।",
    "हर नए शब्द के साथ हम बर्फ़ तोड़ते हैं।",
    "वही पुराना रूटीन — आज तक।",
    "पढ़ाई कैसी चल रही है?",
    "सच कहूँ तो, पहले से बेहतर रहा हूँ, पर मैं लगा रहूँगा।",
    "एक और सबक पूरा करो, फिर ब्रेक लो।",
  ],
  zh: [
    "我们选择学习语言。",
    "不是因为它简单,而是因为它有趣。",
    "我们用每一个新单词打破隔阂。",
    "日复一日 — 直到今天。",
    "你最近学习怎么样?",
    "说实话,我有过更好的日子,但我会坚持下去。",
    "再做一节课,然后休息一下。",
  ],
  ar: [
    "نختار أن نتعلم اللغات.",
    "ليس لأنه سهل، بل لأنه ممتع.",
    "نكسر الجليد مع كل كلمة جديدة.",
    "نفس الروتين القديم — حتى اليوم.",
    "كيف تسير دراستك؟",
    "بصراحة، لقد كنت في حال أفضل، لكنني سأستمر.",
    "أنجز درسًا آخر، ثم خذ استراحة.",
  ],
  tr: [
    "Dil öğrenmeyi seçiyoruz.",
    "Kolay olduğu için değil, eğlenceli olduğu için.",
    "Her yeni kelimeyle buzları kırıyoruz.",
    "Her günkü aynı rutin — bugüne kadar.",
    "Çalışmaların nasıl gidiyor?",
    "Dürüst olmak gerekirse, daha iyi günlerim oldu, ama devam edeceğim.",
    "Bir ders daha yap, sonra bir mola ver.",
  ],
};

/**
 * Static WordCards for every tappable lemma in DEMO_CAPTIONS. Lemma keys are
 * lowercased; the lookup in WordCardPopup normalizes before matching.
 *
 * Covers roughly 25 words. Not every tap gets a card — the fallback is a
 * minimal placeholder generated at tap time (see WatchClient.saveWord ->
 * `getDemoWordCard`), which keeps the surface honest if a learner taps
 * "the" or "to" (we never pretend we have content for every word).
 */
export const DEMO_WORD_CARDS: Record<string, WordCard> = {
  choose: {
    lemma: "choose",
    pos: "verb",
    cefr: "A2",
    shortMeaning: "to pick one option from several",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to pick / to decide on",
        learningDefinition: "to make a decision between two or more possibilities",
        example: "We choose to learn languages.",
        exampleTranslation: "Elegimos aprender idiomas.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  learn: {
    lemma: "learn",
    pos: "verb",
    cefr: "A1",
    shortMeaning: "to pick up knowledge or a skill",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to study, to acquire a skill",
        learningDefinition: "to gain knowledge or ability through study or practice",
        example: "We choose to learn languages.",
        exampleTranslation: "Elegimos aprender idiomas.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  languages: {
    lemma: "language",
    pos: "noun",
    cefr: "A1",
    shortMeaning: "a system of words people use to communicate",
    senses: [
      {
        pos: "noun",
        nativeGloss: "idioma / tongue",
        learningDefinition: "a system of communication in words, spoken or written",
        example: "English and Spanish are my favourite languages.",
        exampleTranslation: "El inglés y el español son mis idiomas favoritos.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  easy: {
    lemma: "easy",
    pos: "adj",
    cefr: "A1",
    shortMeaning: "not needing much effort",
    senses: [
      {
        pos: "adj",
        nativeGloss: "simple / effortless",
        learningDefinition: "achieved without difficulty",
        example: "It was easy to understand.",
        exampleTranslation: "Fue fácil de entender.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  fun: {
    lemma: "fun",
    pos: "adj",
    cefr: "A1",
    shortMeaning: "something enjoyable",
    senses: [
      {
        pos: "noun / adj",
        nativeGloss: "enjoyable / entertaining",
        learningDefinition: "giving pleasure or enjoyment",
        example: "Learning on Funlingo is fun.",
        exampleTranslation: "Aprender en Funlingo es divertido.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  break: {
    lemma: "break",
    pos: "verb",
    cefr: "A2",
    shortMeaning: "to separate something into pieces, or stop something",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to shatter / to pause",
        learningDefinition: "to cause something to separate into pieces; also to interrupt",
        example: "Let's take a short break.",
        exampleTranslation: "Tomemos un breve descanso.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  "break the ice": {
    lemma: "break the ice",
    pos: "idiom",
    cefr: "B1",
    shortMeaning: "to make a tense or awkward moment easier",
    senses: [
      {
        pos: "idiom",
        nativeGloss: "romper el hielo — ease the start of a social moment",
        learningDefinition: "to say or do something that relaxes a tense first meeting",
        example: "A quick joke was all we needed to break the ice.",
        exampleTranslation: "Un chiste rápido fue todo lo que necesitábamos para romper el hielo.",
      },
    ],
    isPhrase: true,
    cultureNote:
      "In English, 'break the ice' almost always carries a positive, friendly tone — nobody breaks the ice to be rude.",
  },
  ice: {
    lemma: "ice",
    pos: "noun",
    cefr: "A1",
    shortMeaning: "frozen water",
    senses: [
      {
        pos: "noun",
        nativeGloss: "frozen water / cold",
        learningDefinition: "water that has frozen solid",
        example: "There's still ice on the lake.",
        exampleTranslation: "Todavía hay hielo en el lago.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  word: {
    lemma: "word",
    pos: "noun",
    cefr: "A1",
    shortMeaning: "a single meaningful unit of a language",
    senses: [
      {
        pos: "noun",
        nativeGloss: "palabra",
        learningDefinition: "a sound or a set of sounds carrying a single meaning",
        example: "Every new word takes you a step forward.",
        exampleTranslation: "Cada palabra nueva te hace avanzar un paso.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  new: {
    lemma: "new",
    pos: "adj",
    cefr: "A1",
    shortMeaning: "existing or made for the first time",
    senses: [
      {
        pos: "adj",
        nativeGloss: "nuevo / recent",
        learningDefinition: "not existing before, or seen for the first time",
        example: "She started a new class last week.",
        exampleTranslation: "Comenzó una clase nueva la semana pasada.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  "same old": {
    lemma: "same old",
    pos: "idiom",
    cefr: "B1",
    shortMeaning: "the usual thing, nothing new",
    senses: [
      {
        pos: "idiom",
        nativeGloss: "lo de siempre — the same old routine",
        learningDefinition: "a casual way to say nothing new is happening, often doubled up for emphasis ('same old, same old')",
        example: "Honestly, same old, same old.",
        exampleTranslation: "Honestamente, lo de siempre, lo de siempre.",
      },
    ],
    isPhrase: true,
    cultureNote:
      "English speakers often double this up as 'same old, same old' — a friendly shrug that means life is quiet.",
  },
  today: {
    lemma: "today",
    pos: "adv",
    cefr: "A1",
    shortMeaning: "this day; the current day",
    senses: [
      {
        pos: "adv",
        nativeGloss: "hoy",
        learningDefinition: "on or during this very day",
        example: "I'll finish it today.",
        exampleTranslation: "Lo terminaré hoy.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  studies: {
    lemma: "study",
    pos: "noun",
    cefr: "A2",
    shortMeaning: "the activity of learning something",
    senses: [
      {
        pos: "noun",
        nativeGloss: "los estudios / learning",
        learningDefinition: "a devoted period of learning a subject",
        example: "How have your studies been?",
        exampleTranslation: "¿Cómo han ido tus estudios?",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  honestly: {
    lemma: "honestly",
    pos: "adv",
    cefr: "B1",
    shortMeaning: "sincerely; to tell the truth",
    senses: [
      {
        pos: "adv",
        nativeGloss: "en serio / sinceramente",
        learningDefinition: "used to add a sincere tone to a statement",
        example: "Honestly, I'd rather stay in.",
        exampleTranslation: "Honestamente, preferiría quedarme en casa.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  better: {
    lemma: "better",
    pos: "adj",
    cefr: "A2",
    shortMeaning: "of higher quality than before",
    senses: [
      {
        pos: "adj",
        nativeGloss: "mejor",
        learningDefinition: "comparative of 'good' — more desirable or improved",
        example: "Today was a better day.",
        exampleTranslation: "Hoy fue un día mejor.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  keep: {
    lemma: "keep",
    pos: "verb",
    cefr: "A2",
    shortMeaning: "to continue or to hold onto",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to continue / to retain",
        learningDefinition: "to continue doing something, or to hold onto something",
        example: "Keep going — you're almost there.",
        exampleTranslation: "Sigue — ya casi llegas.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  going: {
    lemma: "go",
    pos: "verb",
    cefr: "A1",
    shortMeaning: "to move or to proceed",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to move / to proceed",
        learningDefinition: "to travel from one place to another; to progress",
        example: "Keep going until the end.",
        exampleTranslation: "Sigue hasta el final.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  "carry out": {
    lemma: "carry out",
    pos: "phrasal verb",
    cefr: "B1",
    shortMeaning: "to complete or to perform a task",
    senses: [
      {
        pos: "phrasal verb",
        nativeGloss: "llevar a cabo / to execute",
        learningDefinition: "to put a plan or instruction into action and finish it",
        example: "We'll carry out the plan tomorrow morning.",
        exampleTranslation: "Llevaremos a cabo el plan mañana por la mañana.",
      },
    ],
    isPhrase: true,
    cultureNote:
      "'Carry out' is the standard formal phrasing in English for completing a task — a bit crisper than 'do' or 'finish'.",
  },
  carry: {
    lemma: "carry",
    pos: "verb",
    cefr: "A2",
    shortMeaning: "to hold and move something",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to carry / to transport",
        learningDefinition: "to hold something while moving it from one place to another",
        example: "He'll carry the bags.",
        exampleTranslation: "Él llevará las bolsas.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  out: {
    lemma: "out",
    pos: "prep / adv",
    cefr: "A1",
    shortMeaning: "away from the inside",
    senses: [
      {
        pos: "prep / adv",
        nativeGloss: "afuera / outside",
        learningDefinition: "moving or located away from the inside of a place",
        example: "He stepped out for a moment.",
        exampleTranslation: "Salió un momento.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  lesson: {
    lemma: "lesson",
    pos: "noun",
    cefr: "A1",
    shortMeaning: "a short teaching session",
    senses: [
      {
        pos: "noun",
        nativeGloss: "lección",
        learningDefinition: "a period of teaching or something you learn from an experience",
        example: "The lesson lasted an hour.",
        exampleTranslation: "La lección duró una hora.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
  take: {
    lemma: "take",
    pos: "verb",
    cefr: "A1",
    shortMeaning: "to pick up or to accept",
    senses: [
      {
        pos: "verb",
        nativeGloss: "to pick up / to accept",
        learningDefinition: "to pick up and hold, or to accept something offered",
        example: "Take a seat, please.",
        exampleTranslation: "Toma asiento, por favor.",
      },
    ],
    isPhrase: false,
    cultureNote: null,
  },
};

/**
 * Lookup helper used by WordCardPopup when it detects demo mode. Normalises
 * the lemma + checks the two-word phrase set first (so a tap on "break" in
 * the "break the ice" line can match the phrase if we chose to). Returns
 * `null` for words we don't have — the UI then shows the generic
 * placeholder below rather than erroring out.
 */
export function demoWordCard(word: string): WordCard | null {
  const key = word.trim().toLowerCase();
  if (!key) return null;
  return DEMO_WORD_CARDS[key] ?? null;
}

/** Builds a soft placeholder WordCard for any tap we don't have content for.
 *  Honest copy: tells the learner this one isn't in the demo bundle. */
export function demoWordCardFallback(word: string): WordCard {
  return {
    lemma: word.trim().toLowerCase() || word,
    pos: "—",
    cefr: null,
    shortMeaning: "This word isn't in the demo bundle — sign in to look it up live.",
    senses: [],
    isPhrase: false,
    cultureNote: null,
  };
}

/** Pick the right translation track for the viewer's native language. Falls
 *  back to English when the exact code isn't bundled. */
export function demoTranslationsFor(nativeLang: string): string[] {
  const code = (nativeLang || "en").toLowerCase().split("-")[0];
  return DEMO_TRANSLATIONS[code] ?? DEMO_TRANSLATIONS.en;
}
