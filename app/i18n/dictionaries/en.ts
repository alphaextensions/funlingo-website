// English dictionary — the SOURCE OF TRUTH for all UI strings.
//
// Every other locale is a (possibly partial) JSON file under this folder.
// At load time each locale is deep-merged on top of this object, so any
// missing/untranslated key gracefully falls back to English. The shape of
// this object defines the `Dictionary` type used everywhere.

export const en = {
  nav: {
    home: "Home",
    roadmap: "Roadmap",
    blog: "Blog",
    feedback: "Feedback",
    about: "About",
    download: "Download Extension",
  },
  badges: {
    learnWhileWatch: "Learn while you watch",
    freeExtension: "Free dual subtitle extension",
    worksOn: "Works on Netflix, YouTube, Prime & 5 more",
    twoLanguages: "Subtitles in two languages",
  },
  hero: {
    title: "Dual Subtitles for Netflix, YouTube, Prime & 5 more",
    subtitle:
      "Turn Netflix, YouTube, Prime Video, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy, and Coursera into an immersive language lesson. Research shows learners who use dual subtitles retain up to 50% more vocabulary than traditional methods. Funlingo supports 100+ languages with bilingual subtitles, instant AI definitions, and vocabulary building — a completely free alternative to paid extensions. Rated 4.92/5 stars on the Chrome Web Store.",
    ctaPrimary: "Add to Chrome - It's Free",
    ctaSecondary: "How it Works",
    platformsHeading: "Works on your favorite platforms",
  },
  footer: {
    quickLinks: "Quick Links",
    information: "Information",
    follow: "Follow",
    downloadExtension: "Download Extension",
    rights: "©2026 Funlingo. All rights reserved.",
    privacy: "Privacy Policy",
    support: "Support",
  },
  switcher: {
    label: "Language",
  },
} as const;

// Deeply-mutable mirror of the `en` shape, used as the runtime dictionary type
// so translated JSON files (which are plain strings) satisfy it.
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

export type Dictionary = DeepMutable<typeof en>;

export default en;
