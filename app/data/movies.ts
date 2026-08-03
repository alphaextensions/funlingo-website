// Curated catalogue of high-demand movies & series that language learners most
// often search subtitles for. This is the SINGLE SOURCE OF TRUTH for both the
// blog "Search by movie" module and the /watch/[slug] programmatic pages, so the
// two never drift.
//
// Platform associations are deliberately conservative: each title is mapped to
// the service it is most durably tied to — originals to their originating
// platform, catalogue anime to Crunchyroll. Regional licensing shifts over time,
// so the UI always frames these as "commonly available on", never as a
// real-time guarantee. Synopses are written in-house (no copied marketing copy).

/** Streaming services Funlingo supports that this catalogue references. */
export const PLATFORMS = [
  "Netflix",
  "Prime Video",
  "Crunchyroll",
  "Disney+ Hotstar",
  "Apple TV",
  "YouTube",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export type TitleType = "movie" | "series";

export interface Title {
  /** URL-safe, stable identifier used in /watch/[slug]. Never reuse or rename. */
  slug: string;
  /** Display title (English or most common romanization). */
  title: string;
  /** Native-language title, when it differs from `title`. */
  originalTitle?: string;
  type: TitleType;
  /** Original spoken language — the language a viewer would be learning. */
  language: string;
  /** Services the title is most durably associated with. */
  platforms: Platform[];
  /** Release year (movie) or first-aired year (series). */
  year: number;
  /** One- to two-sentence, self-written synopsis. Doubles as meta description. */
  synopsis: string;
  genres: string[];
}

/**
 * Platform-specific "turn on Funlingo" steps. Kept per-platform because the
 * flow genuinely differs (e.g. Prime needs its own captions on first), which
 * also gives each programmatic page real content variation.
 */
export const PLATFORM_GUIDE: Record<Platform, string[]> = {
  Netflix: [
    "Open Netflix and start playing the title you want to watch.",
    "Click the Funlingo icon in your Chrome toolbar and pick your learning language plus your native language.",
    "Both subtitle tracks appear over the Netflix player — click any word for its meaning and save it to your vocabulary list.",
  ],
  "Prime Video": [
    "Start the title in Amazon Prime Video and switch on the platform's own subtitles once.",
    "Open Funlingo from the toolbar and choose the two languages you want shown together.",
    "Funlingo overlays synced dual subtitles on the Prime Video player, with click-to-translate on every word.",
  ],
  Crunchyroll: [
    "Begin streaming the anime on Crunchyroll with the original Japanese audio.",
    "Launch Funlingo and select Japanese plus the language you read most comfortably.",
    "Watch with dual subtitles and tap any word for readings, meaning, and pronunciation.",
  ],
  "Disney+ Hotstar": [
    "Play your movie or show on Disney+ Hotstar.",
    "Open Funlingo and choose your learning language and native language.",
    "Dual subtitles appear instantly on the player — no downloads, no syncing.",
  ],
  "Apple TV": [
    "Start the title in Apple TV in your browser.",
    "Enable Funlingo and pick your two subtitle languages.",
    "Funlingo shows both languages together and lets you save new words as you watch.",
  ],
  YouTube: [
    "Open the YouTube video you want to study.",
    "Turn on Funlingo and select the original language plus your translation language.",
    "Bilingual captions appear under the video, with instant word lookups on click.",
  ],
};

/**
 * Top titles seeded from the languages and shows learners most frequently ask
 * about in support. Extend this list to scale the programmatic pages; the blog
 * search table and sitemap read from the same array.
 */
export const TITLES: Title[] = [
  // ── Spanish ────────────────────────────────────────────────────────────────
  {
    slug: "money-heist",
    title: "Money Heist",
    originalTitle: "La Casa de Papel",
    type: "series",
    language: "Spanish",
    platforms: ["Netflix"],
    year: 2017,
    synopsis:
      "A criminal mastermind known as the Professor recruits eight strangers to pull off the biggest heist in history at Spain's Royal Mint. Its fast, colloquial Castilian Spanish makes it a favourite for intermediate learners.",
    genres: ["Crime", "Thriller", "Drama"],
  },
  {
    slug: "elite",
    title: "Elite",
    originalTitle: "Élite",
    type: "series",
    language: "Spanish",
    platforms: ["Netflix"],
    year: 2018,
    synopsis:
      "When three working-class teenagers win scholarships to an exclusive private school, class tension boils over into a murder mystery. Modern teen slang and everyday dialogue suit conversational Spanish practice.",
    genres: ["Teen", "Drama", "Mystery"],
  },
  {
    slug: "narcos",
    title: "Narcos",
    type: "series",
    language: "Spanish",
    platforms: ["Netflix"],
    year: 2015,
    synopsis:
      "The rise and fall of Colombia's cocaine cartels, told through the agents who hunted them. It mixes clear English narration with authentic Colombian and Mexican Spanish, easing learners in.",
    genres: ["Crime", "Biography", "Drama"],
  },
  // ── Korean ─────────────────────────────────────────────────────────────────
  {
    slug: "squid-game",
    title: "Squid Game",
    originalTitle: "오징어 게임",
    type: "series",
    language: "Korean",
    platforms: ["Netflix"],
    year: 2021,
    synopsis:
      "Hundreds of debt-ridden players compete in deadly versions of childhood games for a life-changing cash prize. Its simple, high-frequency Korean and huge popularity make it an ideal entry point for learners.",
    genres: ["Thriller", "Drama", "Survival"],
  },
  {
    slug: "kingdom",
    title: "Kingdom",
    originalTitle: "킹덤",
    type: "series",
    language: "Korean",
    platforms: ["Netflix"],
    year: 2019,
    synopsis:
      "A crown prince investigates a mysterious plague that reanimates the dead in Korea's Joseon era. The historical register pairs well with dual subtitles for more advanced learners.",
    genres: ["Historical", "Horror", "Thriller"],
  },
  {
    slug: "all-of-us-are-dead",
    title: "All of Us Are Dead",
    originalTitle: "지금 우리 학교는",
    type: "series",
    language: "Korean",
    platforms: ["Netflix"],
    year: 2022,
    synopsis:
      "Students trapped inside their high school fight to survive a fast-spreading zombie outbreak. It is packed with contemporary teen Korean and everyday slang.",
    genres: ["Horror", "Drama", "Teen"],
  },
  // ── German ─────────────────────────────────────────────────────────────────
  {
    slug: "dark",
    title: "Dark",
    type: "series",
    language: "German",
    platforms: ["Netflix"],
    year: 2017,
    synopsis:
      "A child's disappearance in a small German town unravels a time-travel mystery spanning four families and three generations. Precise, standard German rewards serious learners.",
    genres: ["Sci-Fi", "Mystery", "Thriller"],
  },
  {
    slug: "barbarians",
    title: "Barbarians",
    originalTitle: "Barbaren",
    type: "series",
    language: "German",
    platforms: ["Netflix"],
    year: 2020,
    synopsis:
      "A Roman officer of Germanic birth is torn between empire and tribe on the eve of a legendary battle. It blends classical Latin with clear, deliberate German.",
    genres: ["Historical", "War", "Drama"],
  },
  // ── French ─────────────────────────────────────────────────────────────────
  {
    slug: "lupin",
    title: "Lupin",
    type: "series",
    language: "French",
    platforms: ["Netflix"],
    year: 2021,
    synopsis:
      "Inspired by the gentleman thief Arsène Lupin, Assane Diop plots an elaborate revenge against the family that wronged his father. Its clear Parisian French makes it very accessible.",
    genres: ["Crime", "Mystery", "Drama"],
  },
  {
    slug: "call-my-agent",
    title: "Call My Agent!",
    originalTitle: "Dix pour cent",
    type: "series",
    language: "French",
    platforms: ["Netflix"],
    year: 2015,
    synopsis:
      "Talent agents at a Paris firm scramble to keep their star clients happy after their founder's sudden death. Witty, natural workplace French, perfect for picking up idioms.",
    genres: ["Comedy", "Drama"],
  },
  // ── Japanese (live action) ──────────────────────────────────────────────────
  {
    slug: "alice-in-borderland",
    title: "Alice in Borderland",
    originalTitle: "今際の国のアリス",
    type: "series",
    language: "Japanese",
    platforms: ["Netflix"],
    year: 2020,
    synopsis:
      "A directionless gamer and his friends are transported to an eerie, deserted Tokyo where they must win dangerous games to survive. Modern, casual Japanese throughout.",
    genres: ["Sci-Fi", "Thriller", "Action"],
  },
  {
    slug: "your-name",
    title: "Your Name",
    originalTitle: "君の名は。",
    type: "movie",
    language: "Japanese",
    platforms: ["Prime Video"],
    year: 2016,
    synopsis:
      "Two teenagers who have never met mysteriously begin swapping bodies, setting off a search across time and distance. Its beautiful, accessible Japanese makes it a learner favourite.",
    genres: ["Anime", "Romance", "Fantasy"],
  },
  // ── Anime (Crunchyroll) ─────────────────────────────────────────────────────
  {
    slug: "attack-on-titan",
    title: "Attack on Titan",
    originalTitle: "進撃の巨人",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 2013,
    synopsis:
      "Humanity's survivors live inside enormous walls that shield them from man-eating giants — until the walls are breached. One of the most-watched anime for Japanese learners.",
    genres: ["Anime", "Action", "Dark Fantasy"],
  },
  {
    slug: "demon-slayer",
    title: "Demon Slayer",
    originalTitle: "鬼滅の刃",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 2019,
    synopsis:
      "After his family is slaughtered and his sister turned into a demon, a kind-hearted boy becomes a demon slayer to cure her. Its clear, standard Japanese is beginner-friendly.",
    genres: ["Anime", "Action", "Fantasy"],
  },
  {
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    originalTitle: "呪術廻戦",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 2020,
    synopsis:
      "A high-schooler swallows a cursed relic and is pulled into a hidden world of sorcerers battling deadly curses. Fast, modern Japanese with lots of natural slang.",
    genres: ["Anime", "Action", "Supernatural"],
  },
  {
    slug: "one-piece",
    title: "One Piece",
    originalTitle: "ワンピース",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 1999,
    synopsis:
      "Monkey D. Luffy and his crew sail the Grand Line in search of the legendary treasure that will crown him King of the Pirates. Its enormous library suits long-term learners.",
    genres: ["Anime", "Adventure", "Fantasy"],
  },
  {
    slug: "my-hero-academia",
    title: "My Hero Academia",
    originalTitle: "僕のヒーローアカデミア",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 2016,
    synopsis:
      "In a world where almost everyone has superpowers, a powerless boy earns a place at the top hero academy. Everyday school Japanese mixed with energetic shonen dialogue.",
    genres: ["Anime", "Action", "Superhero"],
  },
  {
    slug: "spy-x-family",
    title: "Spy x Family",
    originalTitle: "スパイファミリー",
    type: "series",
    language: "Japanese",
    platforms: ["Crunchyroll"],
    year: 2022,
    synopsis:
      "A spy, an assassin, and a telepathic child form a fake family, each hiding their identity from the others. Warm, conversational Japanese with plenty of comedy.",
    genres: ["Anime", "Comedy", "Action"],
  },
  // ── Portuguese ─────────────────────────────────────────────────────────────
  {
    slug: "3-percent",
    title: "3%",
    type: "series",
    language: "Portuguese",
    platforms: ["Netflix"],
    year: 2016,
    synopsis:
      "In a divided future, young people get one shot at a selection process that admits only the top 3% to a life of abundance. A great introduction to Brazilian Portuguese.",
    genres: ["Sci-Fi", "Thriller", "Drama"],
  },
  // ── Italian ────────────────────────────────────────────────────────────────
  {
    slug: "suburra",
    title: "Suburra: Blood on Rome",
    originalTitle: "Suburra",
    type: "series",
    language: "Italian",
    platforms: ["Netflix"],
    year: 2017,
    synopsis:
      "Politicians, mobsters, and the Vatican collide over a plan to transform a seaside town near Rome. Contemporary Roman Italian with plenty of street register.",
    genres: ["Crime", "Drama"],
  },
  // ── Hindi ──────────────────────────────────────────────────────────────────
  {
    slug: "sacred-games",
    title: "Sacred Games",
    type: "series",
    language: "Hindi",
    platforms: ["Netflix"],
    year: 2018,
    synopsis:
      "A Mumbai police officer receives a cryptic warning from a legendary gangster that the city has just 25 days left. It weaves Hindi, Marathi, and English street dialogue together.",
    genres: ["Crime", "Thriller", "Drama"],
  },
  {
    slug: "mirzapur",
    title: "Mirzapur",
    type: "series",
    language: "Hindi",
    platforms: ["Prime Video"],
    year: 2018,
    synopsis:
      "A ruthless crime lord rules the lawless town of Mirzapur while rival families vie for control. Gritty, colloquial Hindi that reflects how the language is really spoken.",
    genres: ["Crime", "Action", "Drama"],
  },
];

/** Every slug in the catalogue — used by generateStaticParams for /watch. */
export const getAllTitleSlugs = (): string[] => TITLES.map((t) => t.slug);

/** Look up a single title by its slug, or undefined if it does not exist. */
export const getTitleBySlug = (slug: string): Title | undefined =>
  TITLES.find((t) => t.slug === slug);

/**
 * Related titles for internal linking: same language first, then other titles,
 * excluding the current one.
 */
export function getRelatedTitles(slug: string, n = 4): Title[] {
  const current = getTitleBySlug(slug);
  const others = TITLES.filter((t) => t.slug !== slug);
  if (!current) return others.slice(0, n);
  const sameLang = others.filter((t) => t.language === current.language);
  const rest = others.filter((t) => t.language !== current.language);
  return [...sameLang, ...rest].slice(0, n);
}
