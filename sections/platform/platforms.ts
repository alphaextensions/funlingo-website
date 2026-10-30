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

export const platformPath = (slug: string) => `/learn-languages-with-${slug}`;

export function platformBySlug(slug: string): Platform {
  const p = PLATFORM_PAGES.find((x) => x.slug === slug);
  if (!p) throw new Error(`No platform page for "${slug}"`);
  return p;
}

export const fillName = (s: string, name: string) => s.split("{name}").join(name);
