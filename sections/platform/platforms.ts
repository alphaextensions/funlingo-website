// Platform landing pages ("Funlingo for Netflix" …), from the 2026 redesign
// (Funlingo For.dc.html + platforms.js). One shared template; each platform
// supplies its own copy. This is the English copy; other languages come from
// plat-tx.json (the design's plat-tx-*.js), applied in platformLocale.ts.
//
// Only platforms listed here get a page, and the "works on these too" links
// only point at platforms listed here, so a page never links to a 404.

export type PlatformShow = {
  title: string;
  level: string;
  note: string;
  /** plat-tx key for the translated note (the English note is per show). */
  d: string;
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
  /** Text after the gradient name, for languages that put the name mid-title. */
  h1c?: string;
  sub: string;
  intro: string;
  steps: [string, string][];
  features: [string, string][];
  showsH: string;
  /** Shows by language code. Catalogs vary by country: verify per region. */
  shows: Record<string, PlatformShow[]>;
  special: { eyebrow: string; h: string; items: [string, string][] };
  /** [question, answer, optional link shown after the answer]. */
  faqs: [string, string, { text: string; href: string }?][];
  /** Words that pick related reviews and blog guides. */
  kw: string[];
  /** PlatformLogo key, when it differs from the name. */
  logo?: string;
  // English-only SEO copy (Platform Pages SEO doc, Nov 2026). Translated
  // pages keep the design's generic wording, so platformLocale.ts drops these.
  setupH?: string;
  featH?: string;
  faqH?: string;
  /** Paragraph under the shows heading. */
  showsIntro?: string;
  /** Extra section right after the setup steps. */
  howTo?: { h: string; body: string };
  /** Extra section right after the shows. */
  afterShows?: { h: string; body: string };
  /** Leave out the tip section (its text moved elsewhere). */
  hideTip?: boolean;
  /** Short comparison before the FAQ; rows are [feature, Funlingo, other]. */
  compare?: { h: string; other: string; rows: [string, string, string][] };
};

export const PLATFORM_PAGES: Platform[] = [
  {
    slug: "netflix",
    name: "Netflix",
    chip: "NETFLIX",
    dot: "#E50914",
    lang: "es",
    title: "Netflix Dual Subtitles: Learn Languages Free | Funlingo",
    desc: "Show two subtitles at once on Netflix. Tap any word for its meaning and save it with the scene. Free Chrome extension, no account.",
    h1a: "Dual subtitles on ",
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
    showsH: "Best Netflix shows to learn Spanish, Korean, Japanese and more",
    setupH: "How to show two subtitles on Netflix",
    featH: "Dual subtitles on Netflix: what you get",
    faqH: "Netflix dual subtitles: FAQ",
    // Rows and values from the homepage comparison (/#compare).
    compare: {
      h: "Funlingo vs Trancy on Netflix",
      other: "Trancy",
      rows: [
        ["In-player dual subtitles", "Yes", "Partly"],
        ["Word meaning + example in popup", "Yes", "Partly"],
        ["Per-word pronunciation (audio)", "Yes", "Partly"],
        ["Save-to-vocab & review deck", "Yes", "Partly"],
        ["Price", "Free", "$5–12/mo"],
      ],
    },
    shows: {
      es: [
        { title: "Money Heist (La casa de papel)", level: "Intermediate", note: "Fast heist dialogue from Spain.", d: "d_fast" },
        { title: "Elite", level: "Intermediate", note: "Everyday teen Spanish.", d: "d_everyday" },
        { title: "Club de Cuervos", level: "Beginner+", note: "Mexican Spanish comedy.", d: "d_comedy" },
        { title: "Cable Girls (Las chicas del cable)", level: "Intermediate", note: "1920s Madrid drama.", d: "d_hist" },
        { title: "The House of Flowers (La casa de las flores)", level: "Intermediate", note: "Mexico City family comedy.", d: "d_family" },
      ],
      ko: [
        { title: "Squid Game", level: "Intermediate", note: "Clear, dramatic dialogue.", d: "d_thriller" },
        { title: "Crash Landing on You", level: "Beginner+", note: "Romantic drama with lots of repetition.", d: "d_family" },
        { title: "Extraordinary Attorney Woo", level: "Beginner+", note: "Clear, careful dialogue.", d: "d_slow" },
        { title: "The Glory", level: "Advanced", note: "Revenge drama with sharp dialogue.", d: "d_thriller" },
        { title: "Kingdom", level: "Advanced", note: "Joseon-era period Korean.", d: "d_hist" },
      ],
      ja: [
        { title: "Alice in Borderland", level: "Intermediate", note: "Modern Tokyo Japanese.", d: "d_everyday" },
        { title: "Midnight Diner: Tokyo Stories", level: "Beginner+", note: "Slow, warm conversations.", d: "d_slow" },
        { title: "Terrace House: Boys & Girls in the City", level: "Beginner+", note: "Unscripted, everyday conversation.", d: "d_everyday" },
        { title: "First Love", level: "Intermediate", note: "Gentle romantic drama.", d: "d_family" },
        { title: "Old Enough!", level: "Beginner", note: "Short episodes with simple speech.", d: "d_slow" },
      ],
      fr: [
        { title: "Lupin", level: "Intermediate", note: "Contemporary Paris French.", d: "d_everyday" },
        { title: "Call My Agent!", level: "Advanced", note: "Quick, witty office talk.", d: "d_comedy" },
        { title: "Emily in Paris", level: "Beginner", note: "Mostly English with simple French.", d: "d_mixed" },
        { title: "Family Business", level: "Intermediate", note: "Paris family comedy.", d: "d_comedy" },
        { title: "The Hook Up Plan", level: "Intermediate", note: "Casual romantic comedy.", d: "d_slang" },
      ],
      de: [
        { title: "Dark", level: "Advanced", note: "Rich, careful German.", d: "d_thriller" },
        { title: "How to Sell Drugs Online (Fast)", level: "Intermediate", note: "Young, casual German.", d: "d_slang" },
        { title: "Biohackers", level: "Intermediate", note: "Clear, modern German.", d: "d_thriller" },
        { title: "We Are the Wave", level: "Intermediate", note: "Everyday young German.", d: "d_everyday" },
        { title: "Barbarians", level: "Advanced", note: "Historical drama, some Latin.", d: "d_hist" },
      ],
      it: [
        { title: "Suburra", level: "Advanced", note: "Roman Italian and slang.", d: "d_slang" },
        { title: "Baby", level: "Intermediate", note: "Teen drama set in Rome.", d: "d_everyday" },
        { title: "Summertime", level: "Beginner+", note: "Light summer romance.", d: "d_family" },
        { title: "Generation 56K", level: "Intermediate", note: "Naples comedy.", d: "d_comedy" },
      ],
      hi: [
        { title: "Sacred Games", level: "Advanced", note: "Mumbai Hindi with slang.", d: "d_slang" },
        { title: "Delhi Crime", level: "Intermediate", note: "Clear Hindi police drama.", d: "d_thriller" },
        { title: "Kota Factory", level: "Beginner+", note: "Student Hindi with some English.", d: "d_everyday" },
        { title: "Jamtara", level: "Advanced", note: "Rural Hindi and slang.", d: "d_slang" },
      ],
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
      ["How do I show two subtitles on Netflix at once?", "Add Funlingo to Chrome, open any title on netflix.com and pick your two languages in the Funlingo panel. Both lines show under the video."],
      ["Does Netflix have Japanese or Korean subtitles?", "Many titles do, but it depends on the title and your country. Open the title, click the subtitles icon and check the list. Funlingo uses Netflix’s own subtitle tracks."],
      ["Is Funlingo free on Netflix?", "Yes. Every feature is free and there is no account."],
      ["Does it work on the Netflix app or my TV?", "No. Chrome extensions run in desktop Chrome, so it works when you watch Netflix in Chrome on a laptop or desktop."],
      ["Which languages can I learn on Netflix?", "Any pair Netflix has subtitles for. Spanish, Korean, Japanese, French and German have the most titles."],
      ["How do I change the subtitle language on Netflix?", "While a title is playing, click the Audio & Subtitles icon (the speech bubble) and pick a language. If yours isn’t listed, add it to your profile’s language settings. The languages offered depend on the title and your country."],
      ["Is Funlingo a Language Reactor alternative?", "Yes. Both add dual subtitles to Netflix in Chrome. Funlingo is free, needs no account, and also works on YouTube, Prime Video, Crunchyroll, Apple TV, Tubi, bilibili, Udemy and Coursera.", { text: "See the full comparison", href: "/#compare" }],
    ],
    kw: ["netflix"],
  },
  {
    slug: "youtube",
    name: "YouTube",
    chip: "YOUTUBE",
    dot: "#FF0000",
    lang: "ko",
    title: "YouTube Dual Subtitles: Learn Languages Free | Funlingo",
    desc: "Watch YouTube with two subtitle lines at once. Tap any word for its meaning, slow videos down and save words. Free Chrome extension.",
    h1a: "Dual subtitles on ",
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
    showsH: "Best YouTube channels to learn Spanish, Korean, Japanese and more",
    setupH: "How to get dual subtitles on YouTube",
    featH: "Dual subtitles on YouTube: what you get",
    faqH: "YouTube dual subtitles: FAQ",
    afterShows: {
      h: "YouTube auto-translate vs Funlingo",
      body: "YouTube can auto-translate captions, but it shows one language at a time. Funlingo shows the original captions and your language together, so you can compare line by line, tap any word and save it.",
    },
    shows: {
      ko: [
        { title: "Talk To Me In Korean", level: "Beginner", note: "Lessons and real conversations.", d: "d_lessons" },
        { title: "Korean Unnie", level: "Beginner+", note: "Short lessons from a native speaker.", d: "d_lessons" },
        { title: "Go! Billy Korean", level: "Beginner", note: "Grammar explained step by step.", d: "d_lessons" },
        { title: "Seemile Korean", level: "Beginner", note: "Short, practical phrases.", d: "d_lessons" },
        { title: "KoreanClass101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      es: [
        { title: "Dreaming Spanish", level: "Beginner → Advanced", note: "Comprehensible input by level.", d: "d_lessons" },
        { title: "Easy Spanish", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "Español con Juan", level: "Intermediate", note: "Clear, funny lessons from Spain.", d: "d_slow" },
        { title: "Butterfly Spanish", level: "Beginner", note: "Friendly grammar lessons.", d: "d_lessons" },
        { title: "SpanishPod101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      fr: [
        { title: "Easy French", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "innerFrench", level: "Intermediate", note: "Slow, clear French on real topics.", d: "d_slow" },
        { title: "Français avec Pierre", level: "Intermediate", note: "Grammar and vocabulary lessons.", d: "d_lessons" },
        { title: "Comme une Française", level: "Intermediate", note: "Modern spoken French.", d: "d_everyday" },
        { title: "FrenchPod101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      de: [
        { title: "Easy German", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "Nicos Weg (DW)", level: "Beginner", note: "A full beginner series.", d: "d_lessons" },
        { title: "Deutsch für Euch", level: "Intermediate", note: "Grammar explained clearly.", d: "d_lessons" },
        { title: "Learn German with Jenny", level: "Beginner", note: "Lessons for beginners.", d: "d_lessons" },
        { title: "GermanPod101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      ja: [
        { title: "Comprehensible Japanese", level: "Beginner", note: "Simple, visual stories.", d: "d_slow" },
        { title: "Japanese Ammo with Misa", level: "Beginner+", note: "Grammar in clear, short lessons.", d: "d_lessons" },
        { title: "Nihongo no Mori", level: "Intermediate", note: "Lessons taught in Japanese.", d: "d_lessons" },
        { title: "Easy Japanese", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "JapanesePod101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      en: [
        { title: "BBC Learning English", level: "Beginner → Advanced", note: "Short lessons and news.", d: "d_lessons" },
        { title: "English with Lucy", level: "Beginner+", note: "British English lessons.", d: "d_lessons" },
        { title: "Rachel’s English", level: "Intermediate", note: "American pronunciation in detail.", d: "d_slow" },
        { title: "TED-Ed", level: "Advanced", note: "Short animated lectures.", d: "d_lecture" },
        { title: "EnglishClass101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      it: [
        { title: "Easy Italian", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "Learn Italian with Lucrezia", level: "Beginner+", note: "Lessons from a native speaker.", d: "d_lessons" },
        { title: "Italy Made Easy", level: "Beginner", note: "Grammar step by step.", d: "d_lessons" },
        { title: "Podcast Italiano", level: "Intermediate", note: "Clear Italian on real topics.", d: "d_slow" },
        { title: "ItalianPod101", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
      zh: [
        { title: "Mandarin Corner", level: "Intermediate", note: "Real conversations with Chinese subtitles.", d: "d_everyday" },
        { title: "Everyday Chinese", level: "Beginner", note: "Short phrase lessons.", d: "d_lessons" },
        { title: "Grace Mandarin Chinese", level: "Beginner+", note: "Clear lessons from a native speaker.", d: "d_lessons" },
        { title: "Easy Mandarin", level: "Intermediate", note: "Street interviews.", d: "d_street" },
        { title: "ChinesePod", level: "Beginner → Advanced", note: "Lessons for every level.", d: "d_lessons" },
      ],
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
      ["Can YouTube show two subtitles at once?", "Not on its own. YouTube shows one caption track at a time. With Funlingo in Chrome, you see the original and a translation together, one above the other."],
      ["Can I get dual subtitles on YouTube?", "Yes. Funlingo shows two subtitle lines on YouTube in desktop Chrome, for free."],
      ["Does it work with auto-generated captions?", "Yes. When a video has no uploaded captions, Funlingo uses YouTube’s auto-generated ones."],
      ["Does it work on YouTube Shorts?", "Yes, on desktop Chrome."],
      ["Is it free?", "Yes. No account and no paid tier."],
      ["How do I translate a YouTube video into English?", "Open the video, click Settings (the gear), then Subtitles/CC, then Auto-translate, and pick English. This works on videos that have captions. YouTube shows one language at a time; with Funlingo you see the original line and the English line together."],
      ["How do I turn on subtitles on YouTube?", "Click the CC button at the bottom of the player, or go to Settings, then Subtitles/CC, and pick a language. Funlingo uses the same captions to add a line in your second language."],
    ],
    kw: ["youtube"],
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    chip: "PRIME VIDEO",
    dot: "#00A8E1",
    lang: "es",
    title: "Prime Video Subtitles in Two Languages | Funlingo",
    desc: "Change Prime Video subtitles and show two languages at once. Tap any word for its meaning and save it. Free Chrome extension.",
    h1a: "Dual subtitles on ",
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
    showsH: "Best Prime Video shows to learn languages, by language",
    setupH: "How to get two subtitles on Prime Video",
    featH: "Dual subtitles on Prime Video: what you get",
    faqH: "Prime Video dual subtitles: FAQ",
    howTo: {
      h: "How to change subtitle language on Prime Video",
      body: "Start playing a title, click the Subtitles and Audio icon in the top-right of the player, and pick a language under Subtitles. To see two languages at once, turn on Funlingo and pick your second language.",
    },
    shows: {
      es: [
        { title: "El Cid", level: "Advanced", note: "Historical Castilian Spanish.", d: "d_hist" },
        { title: "LOL: Last One Laughing Mexico", level: "Intermediate", note: "Casual Mexican comedy.", d: "d_slang" },
        { title: "How to Survive Being Single (Cómo sobrevivir soltero)", level: "Intermediate", note: "Mexico City comedy.", d: "d_comedy" },
        { title: "Maradona: Blessed Dream", level: "Advanced", note: "Argentine Spanish.", d: "d_slang" },
      ],
      hi: [
        { title: "Mirzapur", level: "Advanced", note: "North Indian Hindi.", d: "d_everyday" },
        { title: "The Family Man", level: "Intermediate", note: "Hindi with some English.", d: "d_everyday" },
        { title: "Panchayat", level: "Beginner+", note: "Slow, gentle village Hindi.", d: "d_slow" },
        { title: "Made in Heaven", level: "Intermediate", note: "Hindi and English mixed.", d: "d_mixed" },
        { title: "Paatal Lok", level: "Advanced", note: "Gritty Delhi crime drama.", d: "d_thriller" },
      ],
      ja: [
        { title: "Modern Love Tokyo", level: "Intermediate", note: "Everyday Tokyo Japanese.", d: "d_everyday" },
        { title: "Bachelor Japan", level: "Beginner+", note: "Unscripted conversation.", d: "d_everyday" },
        { title: "Documental", level: "Intermediate", note: "Comedians trying not to laugh.", d: "d_comedy" },
        { title: "Kamen Rider Black Sun", level: "Intermediate", note: "Action drama.", d: "d_action" },
      ],
      de: [
        { title: "Wir Kinder vom Bahnhof Zoo", level: "Advanced", note: "1970s Berlin German.", d: "d_everyday" },
        { title: "LOL: Last One Laughing Germany", level: "Intermediate", note: "Quick, casual German.", d: "d_slang" },
        { title: "Die Discounter", level: "Intermediate", note: "Supermarket comedy.", d: "d_comedy" },
        { title: "Der Beischläfer", level: "Intermediate", note: "Small-town comedy.", d: "d_comedy" },
      ],
      it: [
        { title: "Vita da Carlo", level: "Intermediate", note: "Roman comedy.", d: "d_comedy" },
        { title: "LOL: Chi ride è fuori", level: "Intermediate", note: "Casual Italian.", d: "d_slang" },
        { title: "Bang Bang Baby", level: "Intermediate", note: "Crime drama set in the 1980s.", d: "d_thriller" },
        { title: "Prisma", level: "Intermediate", note: "Teen drama.", d: "d_family" },
      ],
      fr: [
        { title: "Mixte", level: "Intermediate", note: "1960s school drama.", d: "d_family" },
        { title: "LOL: Qui rit, sort !", level: "Intermediate", note: "Quick, casual French.", d: "d_slang" },
      ],
      en: [
        { title: "The Boys", level: "Advanced", note: "Fast American English.", d: "d_fast" },
        { title: "Fleabag", level: "Advanced", note: "British English, very quick.", d: "d_fast" },
        { title: "Reacher", level: "Intermediate", note: "Clear, direct American English.", d: "d_action" },
        { title: "Good Omens", level: "Intermediate", note: "Playful British English.", d: "d_comedy" },
        { title: "The Marvelous Mrs. Maisel", level: "Advanced", note: "Fast 1950s New York English.", d: "d_fast" },
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
      ["How do I turn on subtitles on Prime Video?", "Start playing a title, click the Subtitles and Audio icon in the top-right of the player, and pick a language under Subtitles."],
      ["Is it free?", "Yes, with no account."],
      ["Why don’t I see my language?", "Prime Video offers different subtitle languages per title and country. Funlingo can only use the tracks a title has."],
      ["Does it work on the Prime Video app?", "No, only in desktop Chrome."],
      ["Which subtitle languages does Prime Video have?", "It depends on the title and your country. Many titles offer several subtitle languages. To check, play the title and open the Subtitles and Audio menu in the top-right of the player."],
      ["How do I turn off subtitles on Prime Video?", "While a title is playing, open the Subtitles and Audio menu in the top-right of the player and choose Off under Subtitles."],
    ],
    kw: ["prime"],
  },
  {
    slug: "disney-hotstar",
    name: "Disney+ Hotstar",
    chip: "DISNEY+ HOTSTAR",
    dot: "#1F80E0",
    lang: "en",
    title: "Disney+ Hotstar Dual Subtitles | Funlingo",
    desc: "Learn English, Hindi and more on Disney+ Hotstar with two subtitle lines and tap-to-translate. Free.",
    h1a: "Dual subtitles on ",
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
    showsH: "Best Disney+ Hotstar shows to learn English, Hindi and more",
    setupH: "How to get dual subtitles on Disney+ Hotstar",
    featH: "Dual subtitles on Disney+ Hotstar: what you get",
    faqH: "Disney+ Hotstar dual subtitles: FAQ",
    shows: {
      en: [
        { title: "Loki", level: "Intermediate", note: "Clear, theatrical English.", d: "d_slow" },
        { title: "The Avengers films", level: "Intermediate", note: "Action dialogue you can follow.", d: "d_action" },
        { title: "Modern Family", level: "Beginner+", note: "Everyday American family English.", d: "d_family" },
        { title: "The Mandalorian", level: "Intermediate", note: "Short, clear lines.", d: "d_action" },
        { title: "Only Murders in the Building", level: "Intermediate", note: "Witty New York comedy.", d: "d_comedy" },
      ],
      hi: [
        { title: "Special Ops", level: "Intermediate", note: "Thriller Hindi.", d: "d_thriller" },
        { title: "Aarya", level: "Intermediate", note: "Family drama in Hindi.", d: "d_family" },
        { title: "Criminal Justice", level: "Intermediate", note: "Courtroom drama in Hindi.", d: "d_thriller" },
        { title: "Out of Love", level: "Intermediate", note: "Relationship drama.", d: "d_family" },
        { title: "The Night Manager", level: "Advanced", note: "Hindi spy thriller.", d: "d_thriller" },
      ],
      ko: [{ title: "Moving", level: "Intermediate", note: "Korean superhero drama.", d: "d_action" }],
      ja: [{ title: "Shōgun", level: "Advanced", note: "Period Japanese with English.", d: "d_hist" }],
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
      ["Is Disney+ Hotstar now JioHotstar?", "Yes, in India. Disney+ Hotstar merged with JioCinema in February 2025 and became JioHotstar. JioHotstar also replaced Hotstar in the UK, Canada and Singapore in September 2026. Funlingo works on JioHotstar in Chrome."],
      ["Can I learn Hindi with Disney+ Hotstar?", "Yes. Pick a Hindi title with Hindi subtitles and add English (or your language) as the second line in Funlingo. Tap any word to see its meaning and save it."],
    ],
    kw: ["disney", "hotstar"],
  },
  {
    slug: "apple-tv",
    name: "Apple TV",
    chip: "APPLE TV",
    dot: "#A2AAAD",
    lang: "es",
    title: "Apple TV Subtitles in Two Languages | Funlingo",
    desc: "Watch Apple TV on the web with two subtitle lines and tap-to-translate. Works on tv.apple.com in Chrome. Free.",
    h1a: "Dual subtitles on ",
    h1b: "Apple TV",
    h1c: " (web)",
    sub: "Apple originals in Spanish, Korean, French and more, with two subtitle lines and instant word meanings. Works on tv.apple.com in Chrome. It doesn’t work on the Apple TV box or the Apple TV app.",
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
    showsH: "Best Apple TV shows to learn languages, by language",
    setupH: "How to get dual subtitles on Apple TV",
    featH: "Dual subtitles on Apple TV: what you get",
    faqH: "Apple TV dual subtitles: FAQ",
    howTo: {
      h: "How to turn on subtitles on Apple TV (web)",
      body: "Play a title on tv.apple.com, click the subtitles icon in the player controls and pick a language. Then turn on Funlingo to add a second language.",
    },
    shows: {
      es: [
        { title: "Acapulco", level: "Beginner+", note: "Spanish and English, easy to follow.", d: "d_mixed" },
        { title: "Now and Then", level: "Advanced", note: "Spanish thriller.", d: "d_thriller" },
      ],
      ko: [
        { title: "Pachinko", level: "Intermediate", note: "Korean, Japanese and English.", d: "d_mixed" },
        { title: "Dr. Brain", level: "Advanced", note: "Korean sci-fi thriller.", d: "d_thriller" },
      ],
      fr: [
        { title: "Drops of God", level: "Intermediate", note: "French and Japanese.", d: "d_mixed" },
        { title: "La Maison", level: "Advanced", note: "Paris fashion drama.", d: "d_thriller" },
        { title: "Liaison", level: "Intermediate", note: "French and English spy thriller.", d: "d_mixed" },
      ],
      en: [
        { title: "Ted Lasso", level: "Intermediate", note: "British and American English.", d: "d_mixed" },
        { title: "Severance", level: "Intermediate", note: "Measured, clear English.", d: "d_slow" },
        { title: "Shrinking", level: "Intermediate", note: "Warm, everyday comedy.", d: "d_comedy" },
        { title: "Slow Horses", level: "Advanced", note: "Dry, fast British English.", d: "d_fast" },
        { title: "The Morning Show", level: "Intermediate", note: "Fast newsroom dialogue.", d: "d_fast" },
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
      ["Does it work with Apple TV+?", "Yes. Apple TV+ is now called Apple TV. Funlingo works with its shows on tv.apple.com in Chrome."],
      ["How do I turn on subtitles on Apple TV?", "On tv.apple.com, play a title, click the subtitles icon in the player and pick a language. On the Apple TV box, open the playback controls and choose the subtitles option. Funlingo’s dual subtitles work on the web version in Chrome only."],
      ["Does Apple TV have Spanish subtitles?", "Many Apple TV shows have Spanish subtitles, along with many other languages, but it varies by title. Play the title and open the subtitles menu to see what’s available."],
    ],
    kw: ["apple"],
  },
  {
    slug: "crunchyroll",
    name: "Crunchyroll",
    chip: "CRUNCHYROLL",
    dot: "#F47521",
    lang: "ja",
    title: "Learn Japanese with Anime on Crunchyroll | Funlingo",
    desc: "Learn Japanese on Crunchyroll with dual subtitles, word meanings with readings and a vocab list. Free.",
    h1a: "Learn Japanese with anime on ",
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
    showsH: "Best anime to learn Japanese, by level",
    setupH: "How to get dual subtitles on Crunchyroll",
    featH: "Dual subtitles on Crunchyroll: what you get",
    faqH: "Crunchyroll dual subtitles: FAQ",
    showsIntro:
      "Pick shows that match your level. Beginners: slice of life, where school and family stories use everyday words you hear again and again. Intermediate: comedy and romance, with more slang but still grounded in daily life.",
    hideTip: true,
    shows: {
      ja: [
        { title: "Spy x Family", level: "Beginner", note: "Everyday family conversations.", d: "d_family" },
        { title: "Horimiya", level: "Beginner+", note: "School-life Japanese.", d: "d_family" },
        { title: "Frieren: Beyond Journey’s End", level: "Intermediate", note: "Calm, clear dialogue.", d: "d_slow" },
        { title: "Demon Slayer", level: "Intermediate", note: "Repeated phrases, some old-fashioned speech.", d: "d_hist" },
        { title: "Jujutsu Kaisen", level: "Advanced", note: "Fast, slangy dialogue.", d: "d_slang" },
        { title: "Naruto", level: "Intermediate", note: "Lots of repetition and catchphrases.", d: "d_everyday" },
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
      ["Does Crunchyroll have Japanese subtitles?", "Only a few titles do. Most Crunchyroll titles have subtitles in English and other languages."],
      ["How do I change the subtitle language on Crunchyroll?", "While an episode plays, click the settings (gear) icon in the player, choose Subtitles/CC and pick a language. The languages offered depend on the episode and your region."],
      ["Does Crunchyroll use AI for subtitles?", "Crunchyroll says its vendors aren’t allowed to use AI-generated subtitles. In 2025, AI subtitles from a third-party vendor appeared on one show, and Crunchyroll said that broke its agreement with the vendor."],
    ],
    kw: ["crunchyroll", "anime", "japanese"],
  },
  {
    slug: "tubi",
    name: "Tubi",
    chip: "TUBI",
    dot: "#FA541C",
    lang: "es",
    title: "Tubi Subtitles: Learn Spanish Free with Tubi | Funlingo",
    desc: "Tubi is free and so is Funlingo. Watch free Spanish movies with two subtitle lines and tap any word. No account.",
    h1a: "Learn languages free on ",
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
    showsH: "Free movies on Tubi to learn Spanish and more, by language",
    setupH: "How to get dual subtitles on Tubi",
    featH: "Dual subtitles on Tubi: what you get",
    faqH: "Tubi dual subtitles: FAQ",
    shows: {
      es: [{ title: "Tubi en Español", level: "All levels", note: "Tubi’s Spanish-language collection of films and series.", d: "d_collection" }],
      ko: [{ title: "Korean drama collection", level: "Beginner+", note: "K-dramas with English subtitles.", d: "d_collection" }],
      ja: [{ title: "Anime collection", level: "Beginner+", note: "Subtitled anime series and films.", d: "d_collection" }],
      en: [{ title: "Classic films", level: "Intermediate", note: "Older films speak more slowly and clearly.", d: "d_slow" }],
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
      ["How do I turn on subtitles on Tubi?", "Play a title on tubi.tv, click the CC icon in the player and pick a language. Not every title has subtitles."],
      ["Why are there no subtitles on a title?", "Some Tubi titles don’t include subtitles, so there’s nothing to show."],
      ["Does it work on the Tubi app?", "No, only in desktop Chrome."],
      ["Does Tubi have subtitles?", "Many titles do. Tubi adds closed captions whenever its content partners provide them, so not every title has them. If a title has no CC icon, it has no captions on Tubi."],
      ["What are good Spanish movies on Tubi?", "Start with the Spanish picks on this page. Each one is free on Tubi and labeled by level. Tubi’s catalog changes often, so check that a title is still available before you plan around it."],
    ],
    kw: ["tubi"],
  },
  {
    slug: "bilibili",
    name: "bilibili",
    chip: "BILIBILI",
    dot: "#00A1D6",
    lang: "zh",
    title: "bilibili Dual Subtitles: English + Pinyin | Funlingo",
    desc: "Learn Mandarin on bilibili with two subtitle lines, pinyin and tap-to-translate. Free Chrome extension.",
    h1a: "Learn Chinese on ",
    h1b: "bilibili",
    h1c: " with dual subtitles",
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
    showsH: "Best bilibili videos and shows to learn Chinese",
    setupH: "How to get dual subtitles on bilibili",
    featH: "Dual subtitles on bilibili: what you get",
    faqH: "bilibili dual subtitles: FAQ",
    shows: {
      zh: [
        { title: "Masters in the Forbidden City (我在故宫修文物)", level: "Intermediate", note: "Calm documentary Mandarin.", d: "d_doc" },
        { title: "Link Click (时光代理人)", level: "Intermediate", note: "Modern everyday Mandarin.", d: "d_everyday" },
        { title: "Life Is a Barbecue (人生一串)", level: "Beginner+", note: "Food documentary with relaxed narration.", d: "d_doc" },
        { title: "Policing the Liberation West (守护解放西)", level: "Intermediate", note: "Real police work, everyday Mandarin.", d: "d_everyday" },
        { title: "Heaven Official’s Blessing (天官赐福)", level: "Intermediate", note: "Fantasy donghua.", d: "d_action" },
        { title: "Teacher Li Yongle (李永乐老师)", level: "Intermediate", note: "Science explained on a whiteboard.", d: "d_lecture" },
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
      ["Does bilibili have English subtitles?", "Some videos do, but most don’t. Funlingo adds a line in your language under the Chinese, with pinyin on every word."],
      ["What is bilibili?", "bilibili is one of China’s biggest video sites, similar to YouTube. It’s known for anime, donghua, documentaries and creator videos, and for danmaku, the viewer comments that scroll across the screen. Most videos are in Mandarin, which makes it a good place to learn Chinese."],
      ["How do I get English subtitles on bilibili?", "Some videos have English subtitles under the subtitle (字幕) button in the player, but most don’t. Funlingo adds a line in your language under the Chinese, with pinyin on every word."],
      ["Is bilibili free?", "Yes, most videos are free to watch. Some anime and dramas need a paid bilibili membership."],
    ],
    kw: ["bilibili", "chinese"],
  },
  {
    slug: "udemy",
    name: "Udemy",
    chip: "UDEMY",
    dot: "#A435F0",
    lang: "en",
    title: "Udemy Dual Subtitles: Courses in Two Languages | Funlingo",
    desc: "Follow Udemy courses in a language you’re learning, with two subtitle lines and tap-to-translate. Free.",
    h1a: "Take ",
    h1b: "Udemy",
    h1c: " courses with dual subtitles",
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
    setupH: "How to get dual subtitles on Udemy",
    featH: "Dual subtitles on Udemy: what you get",
    faqH: "Udemy dual subtitles: FAQ",
    shows: {
      en: [
        { title: "A topic you already know", level: "Beginner+", note: "Familiar content makes new language easier to follow.", d: "d_lecture" },
        { title: "Short lectures", level: "Intermediate", note: "Five to ten minutes keeps focus high.", d: "d_lecture" },
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
      ["Can I translate Udemy subtitles into my language?", "Yes. Funlingo shows the course’s subtitles and a translation in your language together, one above the other."],
      ["Do Udemy courses have subtitles?", "Most do. Udemy auto-generates captions in the language a course is taught in, and some courses also have captions in other languages. Turn them on with the CC button in the player. Funlingo shows them with a translation in your language."],
    ],
    kw: ["udemy", "course"],
  },
  {
    slug: "coursera",
    name: "Coursera",
    chip: "COURSERA",
    dot: "#0056D2",
    lang: "en",
    title: "Coursera Subtitles in Two Languages | Funlingo",
    desc: "Follow Coursera lectures with two subtitle lines and tap-to-translate. Learn the subject and the language. Free.",
    h1a: "",
    h1b: "Coursera",
    h1c: " lectures with subtitles in two languages",
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
    setupH: "How to get dual subtitles on Coursera",
    featH: "Dual subtitles on Coursera: what you get",
    faqH: "Coursera dual subtitles: FAQ",
    shows: {
      en: [{ title: "Learning How to Learn", level: "Beginner+", note: "Clear, friendly English lectures.", d: "d_lecture" }],
      es: [{ title: "Courses from Universidad de los Andes", level: "Intermediate", note: "University courses taught in Spanish.", d: "d_lecture" }],
      fr: [{ title: "Courses from École Polytechnique", level: "Advanced", note: "University courses taught in French.", d: "d_lecture" }],
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
      ["Can I translate Coursera subtitles into my language?", "Yes. Funlingo shows the lecture’s subtitles and a translation in your language together, one above the other."],
      ["Do Coursera videos have subtitles in other languages?", "Many do. Turn on subtitles in the player and pick a language. A course’s overview page lists which subtitle languages it offers. Funlingo shows the lecture’s subtitles together with a translation in your language."],
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

import { fillName } from "./platformLinks";
export { platformPath, fillName } from "./platformLinks";

export function platformBySlug(slug: string): Platform {
  const p = PLATFORM_PAGES.find((x) => x.slug === slug);
  if (!p) throw new Error(`No platform page for "${slug}"`);
  return p;
}

