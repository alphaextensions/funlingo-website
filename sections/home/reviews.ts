// Testimonials. The English set keeps stock-photo avatars (and one 4-star);
// every other language ships native-language reviews with initials avatars.
// `orderedReviews(locale)` surfaces the visitor's language first, then the rest
// — mirroring the design's reviews.js.

export type Review = {
  lang: string;
  name: string;
  initials: string;
  quote: string;
  photo?: string;
  stars?: number; // defaults to 5
};

const REVIEWS: Review[] = [
  // English — keeps photos + one 4-star
  { lang: "en", name: "Aastha Pandey", initials: "AP", stars: 5, photo: "https://i.pravatar.cc/96?img=42", quote: "Watching Netflix while picking up new words feels effortless now. The dual subtitles and instant meanings make everything click." },
  { lang: "en", name: "Daniel Carter", initials: "DC", stars: 4, photo: "https://i.pravatar.cc/96?img=8", quote: "It's amazing how much my skills improved just by watching videos. It fits right into my daily routine." },
  { lang: "en", name: "Rohan Mehta", initials: "RM", stars: 5, photo: "https://i.pravatar.cc/96?img=59", quote: "The only tool with a UI this clean. It actually made me start learning when I'd been putting it off for ages." },
  { lang: "en", name: "Sofia Rossi", initials: "SR", stars: 5, photo: "https://i.pravatar.cc/96?img=26", quote: "Learning while watching has never been this fun. It blends perfectly into the player." },
  { lang: "en", name: "Vikram Reddy", initials: "VR", stars: 5, photo: "https://i.pravatar.cc/96?img=60", quote: "The dual subtitles help me catch new words instantly, and the built-in meanings make everything easy." },
  { lang: "en", name: "Emma Larsen", initials: "EL", stars: 5, photo: "https://i.pravatar.cc/96?img=5", quote: "Honestly the easiest way I've found to learn a language. I just keep watching my shows." },

  // Spanish
  { lang: "es", name: "Lucía Fernández", initials: "LF", quote: "Veo mis series favoritas y aprendo sin darme cuenta. Los subtítulos dobles son una maravilla." },
  { lang: "es", name: "Mateo Rossi", initials: "MR", quote: "Toco una palabra, la escucho y la guardo. Nunca aprender inglés fue tan natural." },
  // Portuguese (BR)
  { lang: "pt-BR", name: "Beatriz Almeida", initials: "BA", quote: "Maratono minhas séries e aprendo sem esforço. As legendas duplas mudaram tudo pra mim." },
  { lang: "pt-BR", name: "Rafael Souza", initials: "RS", quote: "Toco na palavra, ouço a pronúncia e salvo. Ficou fácil demais aprender assistindo." },
  // Chinese (Simplified)
  { lang: "zh-CN", name: "王雪 (Wang Xue)", initials: "王", quote: "边追剧边记单词，完全不费力。双语字幕真的太好用了。" },
  { lang: "zh-CN", name: "李明 (Li Ming)", initials: "李", quote: "点一下单词就能看意思、听发音、还能收藏，学英语从没这么自然过。" },
  // Chinese (Traditional)
  { lang: "zh-TW", name: "陳怡君 (Chen Yi-chun)", initials: "陳", quote: "一邊追劇一邊記單字，毫不費力。雙語字幕真的太好用了。" },
  { lang: "zh-TW", name: "林建宏 (Lin Chien-hung)", initials: "林", quote: "點一下單字就能看意思、聽發音，學語言從沒這麼自然過。" },
  // Russian
  { lang: "ru", name: "Анна Смирнова", initials: "АС", quote: "Смотрю сериалы и запоминаю слова без усилий. Двойные субтитры — это гениально." },
  { lang: "ru", name: "Дмитрий Козлов", initials: "ДК", quote: "Нажал на слово, услышал произношение, сохранил. Учить язык стало по-настоящему легко." },
  // Ukrainian
  { lang: "uk", name: "Олена Ткаченко", initials: "ОТ", quote: "Дивлюся серіали й запам’ятовую слова без зусиль. Подвійні субтитри — це геніально." },
  { lang: "uk", name: "Андрій Мельник", initials: "АМ", quote: "Натиснув на слово, почув вимову, зберіг. Вчити мову стало справді легко." },
  // Bulgarian
  { lang: "bg", name: "Мария Петрова", initials: "МП", quote: "Гледам сериали и запомням думи без усилие. Двойните субтитри промениха всичко." },
  { lang: "bg", name: "Георги Иванов", initials: "ГИ", quote: "Докосвам дума, чувам произношението и я запазвам. Ученето стана наистина лесно." },
  // Korean
  { lang: "ko", name: "김서연 (Kim Seo-yeon)", initials: "김", quote: "좋아하는 드라마를 보면서 단어가 저절로 외워져요. 이중 자막 정말 최고예요." },
  { lang: "ko", name: "박준호 (Park Jun-ho)", initials: "박", quote: "단어를 탭하면 뜻도 보고 발음도 듣고 저장까지. 이렇게 자연스러운 학습은 처음이에요." },
  // Japanese
  { lang: "ja", name: "佐藤美咲 (Sato Misaki)", initials: "佐", quote: "好きなドラマを見ながら単語が自然に覚えられます。二重字幕が本当に便利。" },
  { lang: "ja", name: "田中健 (Tanaka Ken)", initials: "田", quote: "単語をタップすると意味も発音も分かって保存もできる。こんなに自然な学習は初めてです。" },
  // French
  { lang: "fr", name: "Camille Laurent", initials: "CL", quote: "Je regarde mes séries et j’apprends sans effort. Les sous-titres doubles, c’est génial." },
  { lang: "fr", name: "Hugo Martin", initials: "HM", quote: "Je touche un mot, j’entends la prononciation, je l’enregistre. Apprendre n’a jamais été aussi naturel." },
  // Italian
  { lang: "it", name: "Giulia Conti", initials: "GC", quote: "Guardo le mie serie e imparo senza sforzo. I sottotitoli doppi sono fantastici." },
  { lang: "it", name: "Lorenzo Bruno", initials: "LB", quote: "Tocco una parola, ne sento la pronuncia e la salvo. Imparare non è mai stato così naturale." },
  // German
  { lang: "de", name: "Lena Schäfer", initials: "LS", quote: "Ich schaue meine Serien und lerne ganz nebenbei. Die doppelten Untertitel sind genial." },
  { lang: "de", name: "Jonas Weber", initials: "JW", quote: "Wort antippen, Aussprache hören, speichern. So natürlich habe ich noch nie gelernt." },
  // Dutch
  { lang: "nl", name: "Sanne de Vries", initials: "SV", quote: "Ik kijk mijn series en leer moeiteloos. De dubbele ondertiteling is geweldig." },
  { lang: "nl", name: "Daan Jansen", initials: "DJ", quote: "Tik op een woord, hoor de uitspraak, sla het op. Zo natuurlijk heb ik nooit geleerd." },
  // Turkish
  { lang: "tr", name: "Elif Yılmaz", initials: "EY", quote: "Dizilerimi izlerken kelimeler kendiliğinden aklımda kalıyor. Çift altyazı harika." },
  { lang: "tr", name: "Emre Demir", initials: "ED", quote: "Bir kelimeye dokunuyorum, telaffuzunu duyuyorum, kaydediyorum. Öğrenmek hiç bu kadar doğal olmamıştı." },
  // Vietnamese
  { lang: "vi", name: "Nguyễn Thu Hà", initials: "NH", quote: "Xem phim mà từ vựng cứ tự nhiên nhớ. Phụ đề kép thật sự tuyệt vời." },
  { lang: "vi", name: "Trần Minh Quân", initials: "TQ", quote: "Chạm vào từ là nghe được phát âm rồi lưu lại. Học chưa bao giờ tự nhiên đến thế." },
  // Hungarian
  { lang: "hu", name: "Kovács Anna", initials: "KA", quote: "Nézem a sorozataimat, és magától ragadnak rám a szavak. A kettős felirat zseniális." },
  { lang: "hu", name: "Nagy Bálint", initials: "NB", quote: "Rákoppintok egy szóra, meghallom a kiejtését, elmentem. Sosem tanultam ilyen természetesen." },
  // Arabic
  { lang: "ar", name: "ليلى حسن (Layla Hassan)", initials: "ل", quote: "أشاهد مسلسلاتي وأتعلّم الكلمات دون عناء. الترجمة المزدوجة رائعة حقًا." },
  { lang: "ar", name: "عمر خالد (Omar Khaled)", initials: "ع", quote: "ألمس كلمة، أسمع نطقها، وأحفظها. لم يكن التعلّم يومًا بهذه الطبيعية." },
];

const SUPPORTED = new Set(REVIEWS.map((r) => r.lang));

// Normalise a UI locale to a review-language bucket (falls back to English).
function base(code?: string): string {
  if (!code) return "en";
  if (code.indexOf("zh") === 0) return code.toLowerCase().includes("tw") || code.includes("Hant") ? "zh-TW" : "zh-CN";
  if (code === "en-GB") return "en";
  if (code === "pt-PT") return "pt-BR";
  const two = code.split("-")[0];
  if (SUPPORTED.has(code)) return code;
  if (SUPPORTED.has(two)) return two;
  return "en";
}

/** Visitor's language first, then everything else. */
export function orderedReviews(code?: string): Review[] {
  const b = base(code);
  const mine = REVIEWS.filter((r) => r.lang === b);
  const rest = REVIEWS.filter((r) => r.lang !== b);
  return [...mine, ...rest];
}
