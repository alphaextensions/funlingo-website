// Branded covers for posts without photography: a mock player frame with a
// dual-subtitle line in the post's language, so the product itself is the
// illustration. From the 2026 redesign (blog-covers.js); the last 17 lines were
// written for posts the design didn't cover.
// [platform chip, language pair, line before, highlighted word, line after, translation]

export type Cover = {
  chip: string;
  pair: string;
  pre: string;
  hw: string;
  post: string;
  tr: string;
};

const COVERS: Record<string, [string, string, string, string, string, string]> = {
  "does-netflix-have-dual-subtitles": ["NETFLIX", "ES · EN", "¿Dónde están los ", "subtítulos", "?", "Where are the subtitles?"],
  "immersive-translate-free": ["ANY SITE", "FR · EN", "C'est ", "gratuit", " ?", "Is it free?"],
  "learn-spanish-watching-tv": ["NETFLIX", "ES · EN", "Vamos a ", "aprender", " juntos.", "We're going to learn together."],
  "language-reactor-alternatives": ["YOUTUBE", "DE · EN", "Es gibt eine ", "Alternative", ".", "There is an alternative."],
  "best-free-language-learning-tools-2026": ["ANY SITE", "IT · EN", "Tutto è ", "gratis", ".", "Everything is free."],
  "vocabulary-building-watching-shows": ["PRIME VIDEO", "FR · EN", "Chaque ", "mot", " compte.", "Every word counts."],
  "shadowing-language-learning": ["YOUTUBE", "JA · EN", "もう一度", "言って", "ください。", "Say it again, please."],
  "language-reactor-vs-trancy": ["NETFLIX", "KO · EN", "어느 쪽이 ", "더 나아", "?", "Which one is better?"],
  "website-translation-language-learning": ["ANY SITE", "ES · EN", "Lee ", "cualquier", " página.", "Read any page."],
  "ai-for-translation": ["ANY SITE", "DE · EN", "Die ", "Übersetzung", " stimmt.", "The translation is right."],
  "aitalk-review": ["YOUTUBE", "ES · EN", "¿Puedo ", "practicar", " hablando?", "Can I practise by speaking?"],
  "english-vietnamese-dictionary": ["ANY SITE", "VI · EN", "Từ này ", "nghĩa", " là gì?", "What does this word mean?"],
  "unless-meaning": ["NETFLIX", "EN · ES", "Not ", "unless", " you ask.", "No, a menos que lo pidas."],
  "phrase-translator": ["ANY SITE", "IT · EN", "Una ", "frase", " alla volta.", "One phrase at a time."],
  "portuguese-to-english-translator": ["NETFLIX", "PT · EN", "Tudo ", "bem", ", amigo?", "All good, friend?"],
  "how-to-translate-hamster-website": ["ANY SITE", "ZH · EN", "这个", "网站", "怎么翻译？", "How do I translate this site?"],
  "bilingual-meaning": ["YOUTUBE", "FR · EN", "Deux ", "langues", ", un écran.", "Two languages, one screen."],
  "daily-language-learning-habits": ["NETFLIX", "ES · EN", "Un ", "episodio", " al día.", "One episode a day."],
  "immersive-translate-alternatives": ["ANY SITE", "FR · EN", "Il y a ", "mieux", " ?", "Is there something better?"],
  // Written for this site.
  "youtube-video-download-zh": ["YOUTUBE", "ZH · EN", "这个", "视频", "怎么下载？", "How do I download this video?"],
  "youtube-subtitle-download-zh": ["YOUTUBE", "ZH · EN", "下载", "字幕", "很简单。", "Downloading subtitles is easy."],
  "twitter-video-download-zh": ["ANY SITE", "ZH · EN", "保存这个", "视频", "。", "Save this video."],
  "download-youtube-videos-chinese-subtitles": ["YOUTUBE", "ZH · EN", "带", "中文字幕", "观看。", "Watch with Chinese subtitles."],
  "translate-page-in-safari": ["ANY SITE", "FR · EN", "Traduire la ", "page", " entière.", "Translate the whole page."],
  "best-subtitle-download-sites": ["NETFLIX", "ES · EN", "Necesito los ", "subtítulos", ".", "I need the subtitles."],
  "italian-to-english-translation": ["NETFLIX", "IT · EN", "Che cosa ", "significa", "?", "What does it mean?"],
  "turkish-to-english-translation": ["NETFLIX", "TR · EN", "Bu ne ", "demek", "?", "What does this mean?"],
  "immersive-translate-guide-zh": ["ANY SITE", "ZH · EN", "双语", "对照", "阅读。", "Read two languages side by side."],
  "download-subtitles-from-youtube": ["YOUTUBE", "DE · EN", "Die ", "Untertitel", " herunterladen.", "Download the subtitles."],
  "why-cant-change-playback-speed-youtube": ["YOUTUBE", "ES · EN", "Más ", "despacio", ", por favor.", "Slower, please."],
  "best-youtube-subtitle-downloaders": ["YOUTUBE", "FR · EN", "Les meilleurs ", "outils", " gratuits.", "The best free tools."],
  "netflix-language-learning-extensions": ["NETFLIX", "KO · EN", "이 ", "확장 프로그램", "이 최고야.", "This extension is the best."],
  "download-youtube-video-parts": ["YOUTUBE", "JA · EN", "この", "部分", "だけ見たい。", "I only want to watch this part."],
  "srt-files-subtitle-download": ["ANY SITE", "PT · EN", "Cadê a ", "legenda", "?", "Where are the subtitles?"],
  "how-to-learn-languages-with-reading-mode": ["ANY SITE", "IT · EN", "Leggo ", "ogni", " giorno.", "I read every day."],
  "language-learning-tips-and-ai-insights": ["NETFLIX", "ES · EN", "Un ", "consejo", " cada día.", "One tip a day."],
  "best-subtitle-extensions-chrome": ["YOUTUBE", "ES · EN", "Los mejores ", "subtítulos", ".", "The best subtitles."],
  "how-to-add-subtitles-to-a-video": ["YOUTUBE", "FR · EN", "Ajouter des ", "sous-titres", ".", "Add subtitles."],
};

// The platform dot takes that platform's colour (the design used red for all).
export const CHIP_DOT: Record<string, string> = {
  NETFLIX: "#E50914",
  YOUTUBE: "#FF0033",
  "PRIME VIDEO": "#1A98FF",
  "ANY SITE": "#EC4DB0",
};

/** The cover for a post, by its slug (with or without "/blog/"). */
export function coverFor(slug: string, category = "Funlingo"): Cover {
  const key = slug.split("/").filter(Boolean).pop() ?? "";
  const c = COVERS[key] ?? ["ANY SITE", "ES · EN", "", "Funlingo", "", category];
  return { chip: c[0], pair: c[1], pre: c[2], hw: c[3], post: c[4], tr: c[5] };
}
