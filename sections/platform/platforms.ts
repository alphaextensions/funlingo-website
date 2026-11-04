// Platform landing pages ("Funlingo for Netflix" …), from the 2026 redesign
// (Funlingo For.dc.html + platforms.js). One shared template; each platform
// supplies its own copy. English only for now — the design's translations
// (plat-tx-*.js) move into the dictionaries when the pages are localized.
//
// Only platforms listed here get a page, and the "works on these too" links
// only point at platforms listed here, so a page never links to a 404.

export type PlatformShow = {
  title: string;
  level: string;
  note: string;
};

export type Platform = {
  slug: string;
  /** Name as on the homepage platform wall (PlatformLogo key). */
  name: string;
  chip: string;
  dot: string;
  /** Default learning language for the hero player. */
  lang: string;
  title: string;
  desc: string;
  h1a: string;
  h1b: string;
  sub: string;
  intro: string;
  steps: [string, string][];
  features: [string, string][];
  showsH: string;
  /** Shows by language code. Catalogs vary by country: verify per region. */
  shows: Record<string, PlatformShow[]>;
  special: { eyebrow: string; h: string; items: [string, string][] };
  faqs: [string, string][];
  /** Words that pick related reviews and blog guides. */
  kw: string[];
};

export const PLATFORM_PAGES: Platform[] = [
  {
    slug: "netflix",
    name: "Netflix",
    chip: "NETFLIX",
    dot: "#E50914",
    lang: "es",
    title: "Funlingo for Netflix: learn languages with dual subtitles",
    desc: "Watch Netflix with two subtitle lines, tap any word for its meaning and save it. Free Chrome extension, no account.",
    h1a: "Learn languages on ",
    h1b: "Netflix",
    sub: "Two subtitle lines, instant word meanings and a vocab list, right inside the Netflix player. Pick a show you love and keep watching.",
    intro:
      "Netflix shows only one subtitle track at a time. Funlingo adds a second line in desktop Chrome, so you can read the original and its meaning together while you watch Spanish, Korean, Japanese, French or German shows. It’s free, with no account.",
    steps: [
      ["Add Funlingo to Chrome", "One click from the Chrome Web Store. No sign-up."],
      ["Open any show on Netflix", "Start a title that has subtitles in the language you’re learning."],
      ["Turn on your two languages", "Your target language on top, yours underneath. Tap any word to look it up."],
    ],
    features: [
      ["Two subtitle lines", "The original line and its translation, stacked under the video."],
      ["Tap any word", "Meaning in context, pronunciation and a slower replay."],
      ["Save words with their scene", "Your list keeps the sentence the word came from."],
      ["Works with Netflix’s own tracks", "Uses the subtitle tracks Netflix already offers for each title."],
    ],
    showsH: "Netflix shows to learn with, by language",
    shows: {
      es: [
        { title: "Money Heist (La casa de papel)", level: "Intermediate", note: "Fast heist dialogue from Spain." },
        { title: "Elite", level: "Intermediate", note: "Everyday teen Spanish." },
        { title: "Club de Cuervos", level: "Beginner+", note: "Mexican Spanish comedy." },
      ],
      ko: [
        { title: "Squid Game", level: "Intermediate", note: "Clear, dramatic dialogue." },
        { title: "Crash Landing on You", level: "Beginner+", note: "Romantic drama with lots of repetition." },
      ],
      ja: [
        { title: "Alice in Borderland", level: "Intermediate", note: "Modern Tokyo Japanese." },
        { title: "Midnight Diner: Tokyo Stories", level: "Beginner+", note: "Slow, warm conversations." },
      ],
      fr: [
        { title: "Lupin", level: "Intermediate", note: "Contemporary Paris French." },
        { title: "Call My Agent!", level: "Advanced", note: "Quick, witty office talk." },
      ],
      de: [
        { title: "Dark", level: "Advanced", note: "Rich, careful German." },
        { title: "How to Sell Drugs Online (Fast)", level: "Intermediate", note: "Young, casual German." },
      ],
      it: [{ title: "Suburra", level: "Advanced", note: "Roman Italian and slang." }],
      hi: [{ title: "Sacred Games", level: "Advanced", note: "Mumbai Hindi with slang." }],
    },
    special: {
      eyebrow: "Netflix tip",
      h: "Switch the audio, keep your subtitles",
      items: [
        ["Dub, then original", "Watch a familiar show dubbed in your target language first, then switch to the original audio."],
        ["Use Netflix originals", "Originals usually have the most subtitle languages, so your pair is more likely to be there."],
      ],
    },
    faqs: [
      ["Does Netflix have dual subtitles?", "Not on its own. Netflix shows one subtitle track at a time. Funlingo adds a second line in desktop Chrome."],
      ["Is Funlingo free on Netflix?", "Yes. Every feature is free and there is no account."],
      ["Does it work on the Netflix app or my TV?", "No. Chrome extensions run in desktop Chrome, so it works when you watch Netflix in Chrome on a laptop or desktop."],
      ["Which languages can I learn on Netflix?", "Any pair Netflix has subtitles for. Spanish, Korean, Japanese, French and German have the most titles."],
    ],
    kw: ["netflix"],
  },
  {
    slug: "youtube",
    name: "YouTube",
    chip: "YOUTUBE",
    dot: "#FF0000",
    lang: "ko",
    title: "Funlingo for YouTube: learn languages from any video",
    desc: "Dual subtitles on YouTube, tap-to-translate and a vocab list. Works with uploaded and auto-generated captions. Free.",
    h1a: "Learn languages on ",
    h1b: "YouTube",
    sub: "Turn vlogs, interviews and lessons into practice. Two subtitle lines on any video with captions, and every word one tap away.",
    intro:
      "YouTube is the biggest free library of real speech in any language. Funlingo shows two subtitle lines on uploaded and auto-generated captions, so you can follow native speakers and look up any word without leaving the video.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open a YouTube video", "Pick one with captions in the language you’re learning."],
      ["Choose your two languages", "Both lines appear under the video. Tap a word to see what it means."],
    ],
    features: [
      ["Works with auto-captions", "Uses uploaded captions when they exist and auto-generated ones when they don’t."],
      ["Tap any word", "Meaning, pronunciation and slow replay in the popup."],
      ["Save as you watch", "Words keep the sentence they came from."],
      ["Shorts and long videos", "Same two lines on everything you watch."],
    ],
    showsH: "YouTube channels to learn with, by language",
    shows: {
      ko: [{ title: "Talk To Me In Korean", level: "Beginner", note: "Lessons and real conversations." }],
      es: [
        { title: "Dreaming Spanish", level: "Beginner → Advanced", note: "Comprehensible input by level." },
        { title: "Easy Spanish", level: "Intermediate", note: "Street interviews." },
      ],
      fr: [
        { title: "Easy French", level: "Intermediate", note: "Street interviews." },
        { title: "innerFrench", level: "Intermediate", note: "Slow, clear French on real topics." },
      ],
      de: [
        { title: "Easy German", level: "Intermediate", note: "Street interviews." },
        { title: "Nicos Weg (DW)", level: "Beginner", note: "A full beginner series." },
      ],
      ja: [{ title: "Comprehensible Japanese", level: "Beginner", note: "Simple, visual stories." }],
      en: [{ title: "BBC Learning English", level: "Beginner → Advanced", note: "Short lessons and news." }],
      it: [{ title: "Easy Italian", level: "Intermediate", note: "Street interviews." }],
      zh: [{ title: "Mandarin Corner", level: "Intermediate", note: "Real conversations with Chinese subtitles." }],
    },
    special: {
      eyebrow: "YouTube tip",
      h: "Slow it down when you need to",
      items: [
        ["Use 0.75× speed", "Drop the speed for fast speakers. Both subtitle lines stay in sync."],
        ["Rewatch one minute", "Pick a short clip, read both lines, then replay with the original line only."],
      ],
    },
    faqs: [
      ["Can I get dual subtitles on YouTube?", "Yes. Funlingo shows two subtitle lines on YouTube in desktop Chrome, for free."],
      ["Does it work with auto-generated captions?", "Yes. When a video has no uploaded captions, Funlingo uses YouTube’s auto-generated ones."],
      ["Does it work on YouTube Shorts?", "Yes, on desktop Chrome."],
      ["Is it free?", "Yes. No account and no paid tier."],
    ],
    kw: ["youtube"],
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    chip: "PRIME VIDEO",
    dot: "#00A8E1",
    lang: "es",
    title: "Funlingo for Prime Video: dual subtitles on Amazon Prime",
    desc: "Learn languages on Prime Video with two subtitle lines and tap-to-translate. Free Chrome extension.",
    h1a: "Learn languages on ",
    h1b: "Prime Video",
    sub: "Most dual-subtitle tools skip Prime Video. Funlingo doesn’t. Two lines, word meanings and your own vocab list.",
    intro:
      "Many dual-subtitle tools don’t support Amazon Prime Video. Funlingo does: two subtitle lines on Prime originals and licensed titles, with tap-to-translate and a saved word list, free in desktop Chrome.",
    steps: [
      ["Add Funlingo to Chrome", "One click from the Chrome Web Store."],
      ["Open Prime Video in Chrome", "Start a title with subtitles in your target language."],
      ["Pick your two languages", "Tap any word for its meaning and save it."],
    ],
    features: [
      ["Two subtitle lines", "Original and translation together."],
      ["Tap any word", "Meaning, pronunciation, slow replay."],
      ["Vocab with context", "Saved with the line it came from."],
      ["Prime originals included", "Works on Amazon originals and licensed titles with subtitles."],
    ],
    showsH: "Prime Video shows to learn with, by language",
    shows: {
      es: [
        { title: "El Cid", level: "Advanced", note: "Historical Castilian Spanish." },
        { title: "LOL: Last One Laughing Mexico", level: "Intermediate", note: "Casual Mexican comedy." },
      ],
      hi: [
        { title: "Mirzapur", level: "Advanced", note: "North Indian Hindi." },
        { title: "The Family Man", level: "Intermediate", note: "Hindi with some English." },
      ],
      ja: [
        { title: "Modern Love Tokyo", level: "Intermediate", note: "Everyday Tokyo Japanese." },
        { title: "Bachelor Japan", level: "Beginner+", note: "Unscripted conversation." },
      ],
      de: [
        { title: "Wir Kinder vom Bahnhof Zoo", level: "Advanced", note: "1970s Berlin German." },
        { title: "LOL: Last One Laughing Germany", level: "Intermediate", note: "Quick, casual German." },
      ],
      it: [
        { title: "Vita da Carlo", level: "Intermediate", note: "Roman comedy." },
        { title: "LOL: Chi ride è fuori", level: "Intermediate", note: "Casual Italian." },
      ],
      fr: [{ title: "Mixte", level: "Intermediate", note: "1960s school drama." }],
      en: [
        { title: "The Boys", level: "Advanced", note: "Fast American English." },
        { title: "Fleabag", level: "Advanced", note: "British English, very quick." },
      ],
    },
    special: {
      eyebrow: "Prime Video note",
      h: "Catalogs change by country",
      items: [
        ["Check the subtitle menu", "Prime Video’s subtitle languages vary by title and region. Funlingo uses what’s available."],
        ["Look for originals", "Amazon originals tend to have the widest choice of subtitles."],
      ],
    },
    faqs: [
      ["Can I get dual subtitles on Prime Video?", "Yes. Funlingo adds a second subtitle line on Prime Video in desktop Chrome."],
      ["Is it free?", "Yes, with no account."],
      ["Why don’t I see my language?", "Prime Video offers different subtitle languages per title and country. Funlingo can only use the tracks a title has."],
      ["Does it work on the Prime Video app?", "No, only in desktop Chrome."],
    ],
    kw: ["prime"],
  },
  {
    slug: "disney-hotstar",
    name: "Disney+ Hotstar",
    chip: "DISNEY+ HOTSTAR",
    dot: "#1F80E0",
    lang: "en",
    title: "Funlingo for Disney+ Hotstar: learn languages with dual subtitles",
    desc: "Learn English, Hindi and more on Disney+ Hotstar with two subtitle lines and tap-to-translate. Free.",
    h1a: "Learn languages on ",
    h1b: "Disney+ Hotstar",
    sub: "Marvel, Star Wars and Indian originals, with two subtitle lines and every word one tap away.",
    intro:
      "Disney+ Hotstar mixes Hollywood films with Hindi and regional series, which makes it a good place to learn English or Hindi. Funlingo puts two subtitle lines on the player and explains any word you tap, free in desktop Chrome.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open Disney+ Hotstar in Chrome", "Choose a title with subtitles."],
      ["Turn on your two languages", "Tap words to see their meaning and save them."],
    ],
    features: [
      ["Two subtitle lines", "Read the original and its meaning together."],
      ["Tap any word", "Meaning, pronunciation, slow replay."],
      ["Save as you watch", "Your list keeps the sentence."],
      ["English and Indian languages", "Great for English learners and for Hindi."],
    ],
    showsH: "Disney+ Hotstar shows to learn with, by language",
    shows: {
      en: [
        { title: "Loki", level: "Intermediate", note: "Clear, theatrical English." },
        { title: "The Avengers films", level: "Intermediate", note: "Action dialogue you can follow." },
      ],
      hi: [
        { title: "Special Ops", level: "Intermediate", note: "Thriller Hindi." },
        { title: "Aarya", level: "Intermediate", note: "Family drama in Hindi." },
      ],
      ko: [{ title: "Moving", level: "Intermediate", note: "Korean superhero drama." }],
      ja: [{ title: "Shōgun", level: "Advanced", note: "Period Japanese with English." }],
    },
    special: {
      eyebrow: "For English learners",
      h: "Start with films you’ve seen",
      items: [
        ["Rewatch a favourite", "You already know the story, so your attention goes to the words."],
        ["Hindi line underneath", "Keep English on top and Hindi below, then switch the bottom line off when you’re ready."],
      ],
    },
    faqs: [
      ["Does Funlingo work on Disney+ Hotstar?", "Yes, in desktop Chrome."],
      ["Can I learn English with it?", "Yes. Pick English on top and your language underneath."],
      ["Is it free?", "Yes. No account needed."],
      ["Does it work on the mobile app?", "No, only in desktop Chrome."],
    ],
    kw: ["disney", "hotstar"],
  },
  {
    slug: "apple-tv",
    name: "Apple TV",
    chip: "APPLE TV",
    dot: "#A2AAAD",
    lang: "es",
    title: "Funlingo for Apple TV: learn languages with dual subtitles",
    desc: "Watch Apple TV in Chrome with two subtitle lines and tap-to-translate. Free.",
    h1a: "Learn languages on ",
    h1b: "Apple TV",
    sub: "Apple originals in Spanish, Korean, French and more, with two subtitle lines and instant word meanings.",
    intro:
      "Apple TV has a growing set of multilingual originals. Funlingo adds two subtitle lines at tv.apple.com in desktop Chrome, so you can follow shows that move between languages and tap any word to see what it means.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open tv.apple.com in Chrome", "Pick a title with subtitles."],
      ["Choose your two languages", "Tap any word to look it up."],
    ],
    features: [
      ["Two subtitle lines", "Original and translation together."],
      ["Tap any word", "Meaning, pronunciation, slow replay."],
      ["Vocab with context", "Saved with its line."],
      ["Multilingual originals", "Many Apple originals mix languages, which suits learners."],
    ],
    showsH: "Apple TV shows to learn with, by language",
    shows: {
      es: [
        { title: "Acapulco", level: "Beginner+", note: "Spanish and English, easy to follow." },
        { title: "Now and Then", level: "Advanced", note: "Spanish thriller." },
      ],
      ko: [{ title: "Pachinko", level: "Intermediate", note: "Korean, Japanese and English." }],
      fr: [
        { title: "Drops of God", level: "Intermediate", note: "French and Japanese." },
        { title: "La Maison", level: "Advanced", note: "Paris fashion drama." },
      ],
      en: [
        { title: "Ted Lasso", level: "Intermediate", note: "British and American English." },
        { title: "Severance", level: "Intermediate", note: "Measured, clear English." },
      ],
    },
    special: {
      eyebrow: "Apple TV tip",
      h: "Use shows that switch languages",
      items: [
        ["Mixed-language scenes", "Shows like Pachinko and Acapulco move between languages, so you hear both in context."],
        ["Watch in Chrome", "Funlingo works at tv.apple.com in desktop Chrome."],
      ],
    },
    faqs: [
      ["Does Funlingo work on Apple TV?", "Yes, at tv.apple.com in desktop Chrome."],
      ["Does it work on the Apple TV box or app?", "No, only in desktop Chrome."],
      ["Is it free?", "Yes, with no account."],
      ["Which languages work?", "Any subtitle language a title offers."],
    ],
    kw: ["apple"],
  },
  {
    slug: "crunchyroll",
    name: "Crunchyroll",
    chip: "CRUNCHYROLL",
    dot: "#F47521",
    lang: "ja",
    title: "Funlingo for Crunchyroll: learn Japanese with anime",
    desc: "Learn Japanese on Crunchyroll with dual subtitles, word meanings with readings and a vocab list. Free.",
    h1a: "Learn Japanese on ",
    h1b: "Crunchyroll",
    sub: "Anime is hours of natural Japanese. Funlingo puts the Japanese line and your language together, with readings for every word.",
    intro:
      "Crunchyroll shows one subtitle language at a time. Funlingo shows Japanese and your own language together, with a reading and audio for every word you tap, so anime becomes daily listening practice. Free in desktop Chrome.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open an episode on Crunchyroll", "Choose one with Japanese audio."],
      ["Pick Japanese plus your language", "Tap a word for its meaning and reading."],
    ],
    features: [
      ["Japanese + your language", "Both lines under the video."],
      ["Readings for every word", "See how a word is pronounced, then hear it."],
      ["Save words from each episode", "Review them before the next one."],
      ["Simulcasts included", "Works on new episodes as they air."],
    ],
    showsH: "Anime to learn Japanese with, by level",
    shows: {
      ja: [
        { title: "Spy x Family", level: "Beginner", note: "Everyday family conversations." },
        { title: "Horimiya", level: "Beginner+", note: "School-life Japanese." },
        { title: "Frieren: Beyond Journey’s End", level: "Intermediate", note: "Calm, clear dialogue." },
        { title: "Demon Slayer", level: "Intermediate", note: "Repeated phrases, some old-fashioned speech." },
        { title: "Jujutsu Kaisen", level: "Advanced", note: "Fast, slangy dialogue." },
        { title: "Naruto", level: "Intermediate", note: "Lots of repetition and catchphrases." },
      ],
    },
    special: {
      eyebrow: "Anime by level",
      h: "Pick shows that match your level",
      items: [
        ["Beginner: slice of life", "School and family stories use everyday words you hear again and again."],
        ["Intermediate: comedy and romance", "More slang, still grounded in daily life."],
      ],
    },
    faqs: [
      ["Can I learn Japanese from anime?", "Anime is great listening practice. Pair it with a little review so new words stick."],
      ["Does Funlingo show readings?", "Yes. Tap a word to see how it’s read and hear it."],
      ["Is it free on Crunchyroll?", "Yes, every feature, no account."],
      ["Does it work on the Crunchyroll app?", "No, only in desktop Chrome."],
    ],
    kw: ["crunchyroll", "anime", "japanese"],
  },
  {
    slug: "tubi",
    name: "Tubi",
    chip: "TUBI",
    dot: "#FA541C",
    lang: "es",
    title: "Funlingo for Tubi: learn languages free on Tubi",
    desc: "Tubi is free and so is Funlingo. Watch with two subtitle lines and tap any word. No account.",
    h1a: "Learn languages on ",
    h1b: "Tubi",
    sub: "A free streaming service and a free extension. Two subtitle lines and word meanings on Tubi’s films and series.",
    intro:
      "Tubi is free, and so is Funlingo. Watch Tubi’s films and series in desktop Chrome with two subtitle lines and tap-to-translate, and practise a language without paying for anything.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open Tubi in Chrome", "Pick a title with subtitles."],
      ["Choose your two languages", "Tap any word to see what it means."],
    ],
    features: [
      ["Free + free", "No subscription for Tubi, no paid tier for Funlingo."],
      ["Two subtitle lines", "Original and translation together."],
      ["Tap any word", "Meaning, pronunciation, slow replay."],
      ["Save words", "Kept with the line they came from."],
    ],
    showsH: "Where to start on Tubi, by language",
    shows: {
      es: [{ title: "Tubi en Español", level: "All levels", note: "Tubi’s Spanish-language collection of films and series." }],
      ko: [{ title: "Korean drama collection", level: "Beginner+", note: "K-dramas with English subtitles." }],
      ja: [{ title: "Anime collection", level: "Beginner+", note: "Subtitled anime series and films." }],
      en: [{ title: "Classic films", level: "Intermediate", note: "Older films speak more slowly and clearly." }],
    },
    special: {
      eyebrow: "Tubi note",
      h: "Check subtitles before you start",
      items: [
        ["Not every title has subtitles", "Look for the CC icon. Funlingo needs a subtitle track to work with."],
        ["Catalog varies by country", "Tubi’s library differs between regions."],
      ],
    },
    faqs: [
      ["Does Funlingo work on Tubi?", "Yes, in desktop Chrome, on titles that have subtitles."],
      ["Is it really free?", "Yes. Tubi is free with ads and Funlingo is free with no account."],
      ["Why are there no subtitles on a title?", "Some Tubi titles don’t include subtitles, so there’s nothing to show."],
      ["Does it work on the Tubi app?", "No, only in desktop Chrome."],
    ],
    kw: ["tubi"],
  },
  {
    slug: "bilibili",
    name: "bilibili",
    chip: "BILIBILI",
    dot: "#00A1D6",
    lang: "zh",
    title: "Funlingo for bilibili: learn Chinese with dual subtitles",
    desc: "Learn Mandarin on bilibili with two subtitle lines, pinyin and tap-to-translate. Free Chrome extension.",
    h1a: "Learn Chinese on ",
    h1b: "bilibili",
    sub: "Dramas, documentaries and donghua in Mandarin, with your language underneath and pinyin for every word.",
    intro:
      "bilibili is full of real Mandarin: dramas, documentaries, lectures and donghua. Funlingo shows Chinese subtitles with your language underneath and pinyin for every word, so you can follow along and learn as you watch.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open a video on bilibili", "Pick one with Chinese subtitles."],
      ["Choose Chinese plus your language", "Tap a word for its meaning and pinyin."],
    ],
    features: [
      ["Chinese + your language", "Both lines under the video."],
      ["Pinyin on every word", "See and hear the pronunciation."],
      ["Save words", "Kept with the sentence."],
      ["Dramas, docs and donghua", "Real Mandarin across many genres."],
    ],
    showsH: "bilibili picks to learn Chinese with",
    shows: {
      zh: [
        { title: "Masters in the Forbidden City (我在故宫修文物)", level: "Intermediate", note: "Calm documentary Mandarin." },
        { title: "Link Click (时光代理人)", level: "Intermediate", note: "Modern everyday Mandarin." },
      ],
    },
    special: {
      eyebrow: "bilibili tip",
      h: "Turn off the danmaku",
      items: [
        ["Hide the comment stream", "The scrolling comments (弹幕) cover the subtitles. Switch them off while you study."],
        ["Start with documentaries", "Narration is slower and clearer than drama dialogue."],
      ],
    },
    faqs: [
      ["Does Funlingo work on bilibili?", "Yes, in desktop Chrome."],
      ["Does it show pinyin?", "Yes. Tap a word to see its pinyin and hear it."],
      ["Is it free?", "Yes, no account."],
      ["Do I need a bilibili account?", "Not for Funlingo. Some videos on bilibili may need you to sign in."],
    ],
    kw: ["bilibili", "chinese"],
  },
  {
    slug: "udemy",
    name: "Udemy",
    chip: "UDEMY",
    dot: "#A435F0",
    lang: "en",
    title: "Funlingo for Udemy: take courses in another language",
    desc: "Follow Udemy courses in a language you’re learning, with two subtitle lines and tap-to-translate. Free.",
    h1a: "Learn languages on ",
    h1b: "Udemy",
    sub: "Learn a skill and a language at the same time. Two subtitle lines on Udemy lectures, and technical words one tap away.",
    intro:
      "Udemy courses are a good way to learn a language through a subject you already care about. Funlingo shows two subtitle lines on lectures with captions and explains technical terms as you tap them. Free in desktop Chrome.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open a Udemy lecture", "Choose a course with captions."],
      ["Pick your two languages", "Tap a term to see what it means."],
    ],
    features: [
      ["Two subtitle lines", "Lecture captions with your translation."],
      ["Technical terms explained", "Tap any term for its meaning in context."],
      ["Save course vocabulary", "Build a glossary as you go."],
      ["Any subject", "Coding, design, business, anything with captions."],
    ],
    showsH: "How to choose a course",
    shows: {
      en: [
        { title: "A topic you already know", level: "Beginner+", note: "Familiar content makes new language easier to follow." },
        { title: "Short lectures", level: "Intermediate", note: "Five to ten minutes keeps focus high." },
      ],
    },
    special: {
      eyebrow: "Course tips",
      h: "Make every lecture a language lesson",
      items: [
        ["Pick a skill you need", "Motivation carries you through harder language."],
        ["Save the jargon", "Technical terms repeat across lectures, so they stick fast."],
      ],
    },
    faqs: [
      ["Does Funlingo work on Udemy?", "Yes, on lectures with captions, in desktop Chrome."],
      ["Can I take an English course to learn English?", "Yes. English captions on top, your language underneath."],
      ["Is it free?", "Yes, no account."],
      ["Does it work in the Udemy app?", "No, only in desktop Chrome."],
    ],
    kw: ["udemy", "course"],
  },
  {
    slug: "coursera",
    name: "Coursera",
    chip: "COURSERA",
    dot: "#0056D2",
    lang: "en",
    title: "Funlingo for Coursera: university courses in two languages",
    desc: "Follow Coursera lectures with two subtitle lines and tap-to-translate. Learn the subject and the language. Free.",
    h1a: "Learn languages on ",
    h1b: "Coursera",
    sub: "University lectures with your language underneath. Follow the course, and pick up the academic vocabulary as you go.",
    intro:
      "Coursera lectures use clear, structured language, which makes them useful for learning academic vocabulary. Funlingo shows two subtitle lines on lectures with subtitles and explains any word you tap, free in desktop Chrome.",
    steps: [
      ["Add Funlingo to Chrome", "One click, no account."],
      ["Open a Coursera lecture", "Choose one with subtitles."],
      ["Pick your two languages", "Tap any word to look it up."],
    ],
    features: [
      ["Two subtitle lines", "Lecture subtitles with your translation."],
      ["Academic words explained", "Meaning in context, plus pronunciation."],
      ["Build a course glossary", "Save terms with the sentence."],
      ["Courses in many languages", "Universities teach in English, Spanish, French and more."],
    ],
    showsH: "Courses to try, by language",
    shows: {
      en: [{ title: "Learning How to Learn", level: "Beginner+", note: "Clear, friendly English lectures." }],
      es: [{ title: "Courses from Universidad de los Andes", level: "Intermediate", note: "University courses taught in Spanish." }],
      fr: [{ title: "Courses from École Polytechnique", level: "Advanced", note: "University courses taught in French." }],
    },
    special: {
      eyebrow: "Course tips",
      h: "Study smarter with two lines",
      items: [
        ["Read the transcript first", "Skim the lecture text, then watch with both lines."],
        ["Keep the bottom line for hard parts", "Switch it off for sections you can follow."],
      ],
    },
    faqs: [
      ["Does Funlingo work on Coursera?", "Yes, on lectures with subtitles, in desktop Chrome."],
      ["Can I learn a language from university courses?", "Yes, especially academic vocabulary in a subject you care about."],
      ["Is it free?", "Funlingo is free. Coursera pricing depends on the course."],
      ["Does it work in the Coursera app?", "No, only in desktop Chrome."],
    ],
    kw: ["coursera", "course"],
  },
];

/** Shared section labels; {name} is the platform name. */
export const PLATFORM_LABELS = {
  forX: "Funlingo for {name}",
  freeLine: "Free · no account",
  setupEye: "Set up in 30 seconds",
  setupH: "How to use Funlingo on {name}",
  featEye: "What you get",
  featH: "Everything works inside the {name} player",
  showsEye: "What to watch",
  catalogNote: "Availability varies by country. Check your catalog for subtitles in your target language.",
  gameEye: "Try it now",
  gameH: "Guess the word, then hear it",
  revEye: "Learners",
  revH: "What learners say",
  faqH: "Funlingo on {name}: common questions",
  guidesH: "Guides for {name}",
  allGuides: "All guides →",
  othersH: "Funlingo works on these too",
  ctaH: "Start learning on {name} tonight.",
  ctaS: "Free, no account, and set up before your next episode starts.",
} as const;

export const LANG_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", fr: "French", de: "German", it: "Italian",
  ko: "Korean", ja: "Japanese", zh: "Chinese", hi: "Hindi", pt: "Portuguese",
};

export { platformPath } from "./platformLinks";

export function platformBySlug(slug: string): Platform {
  const p = PLATFORM_PAGES.find((x) => x.slug === slug);
  if (!p) throw new Error(`No platform page for "${slug}"`);
  return p;
}

export const fillName = (s: string, name: string) => s.split("{name}").join(name);
