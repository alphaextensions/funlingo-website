/**
 * Wave 5 content seeding — compiles Funlingo's bundled situations catalogs
 * (data/seed/situations.json + situations-2.json) into TalkTopic / TalkLesson
 * shape so (a) the Talk index can render them live from Prisma after the seed
 * script has run, and (b) the API routes (findLessonById etc.) can resolve
 * seeded lesson ids against the merged in-memory catalog.
 *
 * Source: Funlingo extension's bundled catalogs — Funlingo-authored content.
 * LEGAL.md: safe to persist (our own writing, not third-party captions).
 */

import situationsJson from "../../../data/seed/situations.json";
import situations2Json from "../../../data/seed/situations-2.json";
import type { TalkLesson, TalkTopic } from "./topics";

/* ---------------- Source JSON types ---------------- */

interface SeedPhrase {
  phrase: string;
  romanization?: string;
  meaning: string;
  usage?: string;
  literal?: string | null;
}

interface SeedSituation {
  title: string;
  /** Present only in situations-2 (non-Latin locales). */
  titleEn?: string;
  /** Present only in situations.json (Latin locales). */
  icon?: string;
  phrases: SeedPhrase[];
}

type SeedLocaleBundle = Record<string, SeedSituation>;

const situations = situationsJson as unknown as Record<string, SeedLocaleBundle>;
const situations2 = situations2Json as unknown as Record<string, SeedLocaleBundle>;

/* ---------------- Mappings ---------------- */

/** Locale code (as it appears in the JSON) → ISO 639-1 language. */
function localeToLang(locale: string): string {
  const lc = locale.toLowerCase();
  if (lc.startsWith("en")) return "en";
  if (lc.startsWith("es")) return "es";
  if (lc.startsWith("pt")) return "pt";
  if (lc === "zh-cn" || lc === "zh-tw") return "zh";
  return lc;
}

/** Short, URL-safe variant tag used for slug uniqueness. */
function localeTag(locale: string): string {
  // "en" → "en", "en-US" → "en-us", "zh-CN" → "zh-cn"
  return locale.toLowerCase();
}

/** Human-friendly label for the UI (e.g. "en-US" badge). */
function localeLabel(locale: string): string {
  return locale;
}

/** Situation slug → broad Fun Learning category. */
const SITUATION_CATEGORIES: Record<string, string> = {
  restaurant: "Food",
  airport: "Travel",
  taxi: "Travel",
  hotel: "Travel",
  shopping: "Daily life",
  doctor: "Health",
  dating: "Social",
  interview: "Work",
};

/** Fallback emoji when the source JSON omits one (true for non-Latin locales). */
const SITUATION_ICON_FALLBACK: Record<string, string> = {
  restaurant: "🍽️",
  airport: "✈️",
  taxi: "🚕",
  hotel: "🏨",
  shopping: "🛍️",
  doctor: "🩺",
  dating: "💕",
  interview: "💼",
};

/** Short Funlingo-voiced blurb per situation. */
const SITUATION_BLURBS: Record<string, string> = {
  restaurant: "Order, ask questions, and split the bill — without rehearsing.",
  airport: "Check in, make a connection, and sail through security.",
  taxi: "Say where you're going, agree on the fare, and be on your way.",
  hotel: "Check in, ask for what you need, and leave on good terms.",
  shopping: "Find your size, try things on, and pay without the awkward pause.",
  doctor: "Describe what's wrong clearly and ask the right questions back.",
  dating: "Open the chat, suggest a plan, and keep it light.",
  interview: "Walk in confident — introduce, answer, and ask a sharp question.",
};

/** Generic AI role per situation (used in the Talk prompt). */
const AI_ROLE: Record<string, string> = {
  restaurant: "A friendly server at a casual neighbourhood restaurant.",
  airport: "A patient airline agent at the counter.",
  taxi: "A chatty taxi driver who knows the city well.",
  hotel: "A warm receptionist at a mid-size hotel.",
  shopping: "A helpful shop assistant on the floor.",
  doctor: "A kind doctor taking a short consultation.",
  dating: "Someone open and curious on a first casual date.",
  interview: "A hiring manager running a friendly first-round chat.",
};

/** Generic user role per situation. */
const USER_ROLE: Record<string, string> = {
  restaurant: "A diner working through a short order.",
  airport: "A traveller making their way through the terminal.",
  taxi: "A rider heading somewhere specific.",
  hotel: "A guest checking in or asking for help.",
  shopping: "A shopper figuring out what fits and what it costs.",
  doctor: "A patient explaining what's going on.",
  dating: "Someone on a casual first date.",
  interview: "A candidate making a strong first impression.",
};

/** Three per-situation lesson slots, each slicing the phrase list and giving the
 *  lesson a title + Funlingo-voiced scene. Phrases become `shadowSentences`.
 *
 *  Wave 13 BLOCKER-22: `opener` is the AI's first line, written in character
 *  for the scene. Rendered verbatim in the chat (NEVER with the old
 *  `(scene) role:` prefix). */
const LESSON_SLOTS: Record<
  string,
  Array<{ slug: string; title: string; scene: string; opener: string }>
> = {
  restaurant: [
    { slug: "arriving", title: "Getting a table", scene: "You've just walked in. Greet the host and get seated.", opener: "Good evening — welcome in! A table for how many?" },
    { slug: "ordering", title: "Ordering", scene: "You're ready to order. Ask questions, mention anything you can't eat, and lock it in.", opener: "Hi! Have you had a chance to look at the menu?" },
    { slug: "wrapping-up", title: "The bill", scene: "The meal's done. Ask for the bill, split it if you need to, and wrap up warmly.", opener: "How was everything? Can I bring you anything else?" },
  ],
  airport: [
    { slug: "check-in", title: "At check-in", scene: "You're at the counter. Confirm your flight details, ask for a seat, and move on.", opener: "Good morning — passport and travel plans, please." },
    { slug: "security", title: "Security & gate", scene: "You're through check-in. Ask what you can bring, find your gate, and keep moving.", opener: "Any liquids over 100ml, laptops, or sharp items? Pop them in the tray." },
    { slug: "arriving", title: "Arrivals & baggage", scene: "You've just landed. Find your bags, handle customs, and get out of the terminal.", opener: "Welcome. Anything to declare today?" },
  ],
  taxi: [
    { slug: "hailing", title: "Flagging a ride", scene: "You've got a destination in mind. Agree on where you're going and roughly what it'll cost.", opener: "Hop in — where are we headed?" },
    { slug: "on-the-way", title: "On the way", scene: "You're on the move. Make small talk, ask for a detour, or ask them to slow down.", opener: "First time in town, or do you live around here?" },
    { slug: "arriving", title: "Dropping off", scene: "You've arrived. Pay, say thanks, and remember the trunk.", opener: "Here we are — that'll be about fifteen on the meter." },
  ],
  hotel: [
    { slug: "check-in", title: "Check-in", scene: "You've just walked up to reception. Confirm your reservation and get your key.", opener: "Welcome to the Grand — do you have a reservation with us?" },
    { slug: "during-stay", title: "During the stay", scene: "You're settling in. Ask for the Wi-Fi, breakfast, and a late checkout.", opener: "Reception, hi — how can I help?" },
    { slug: "checkout", title: "Check-out", scene: "You're on your way out. Settle the bill, store your bag, and head off.", opener: "Good morning — checking out? What was the room number?" },
  ],
  shopping: [
    { slug: "finding", title: "Finding what you want", scene: "You're on the floor. Ask where things are, what fits, and what colours you have.", opener: "Hi — can I help you find anything today?" },
    { slug: "trying", title: "Trying it on", scene: "You've picked something up. Try it on, ask for a different size, and decide.", opener: "Fitting rooms are right over there — how many pieces?" },
    { slug: "paying", title: "Paying", scene: "You're done. Pay, ask about returns, and skip the plastic bag.", opener: "All set? Just the one item today?" },
  ],
  doctor: [
    { slug: "symptoms", title: "What's going on", scene: "You're sat in the doctor's office. Explain what hurts and when it started.", opener: "Come on in. So, what's bringing you in today?" },
    { slug: "advice", title: "Diagnosis & advice", scene: "The doctor is explaining. Ask what to do, what to avoid, and when to come back.", opener: "Alright, based on what you've described, here's where I'd land — any questions as we go?" },
    { slug: "prescription", title: "Prescription & follow-up", scene: "You're wrapping up. Get the dose right and book the next visit.", opener: "I'm going to write you a short course of this — want to walk through how to take it?" },
  ],
  dating: [
    { slug: "opening", title: "Opening the chat", scene: "You've just met up. Break the ice without over-rehearsing.", opener: "Hey — nice to actually meet in person. Were you waiting long?" },
    { slug: "flow", title: "Keeping it going", scene: "The chat is flowing. Share a story, ask good follow-ups, be present.", opener: "Okay, go on — I want to hear the whole story." },
    { slug: "closing", title: "The soft close", scene: "The date's winding down. Say you had fun, make a loose plan, head off.", opener: "This has been really nice. What's your week looking like?" },
  ],
  interview: [
    { slug: "opening", title: "The opener", scene: "You've just sat down. Introduce yourself and talk about what you do.", opener: "Thanks for coming in — to start, tell me a bit about yourself." },
    { slug: "answering", title: "The questions", scene: "They're asking. Give focused answers and show you've done the homework.", opener: "Great. Walk me through a project you're proud of from the last year or two." },
    { slug: "closing", title: "Your turn to ask", scene: "They've handed you the mic. Ask one sharp question and wrap up.", opener: "We've got a few minutes left — what questions do you have for me?" },
  ],
};

/* ---------------- Compilation ---------------- */

function sliceEqual<T>(arr: T[], parts: number): T[][] {
  const out: T[][] = [];
  const size = Math.max(1, Math.ceil(arr.length / parts));
  for (let i = 0; i < parts; i += 1) {
    const chunk = arr.slice(i * size, (i + 1) * size);
    if (chunk.length > 0) out.push(chunk);
  }
  // If arr is shorter than `parts`, pad with the last chunk so every slot has
  // at least one phrase (we never create empty lessons).
  while (out.length < parts && arr.length > 0) {
    out.push([arr[arr.length - 1]!]);
  }
  return out;
}

function phrasesToShadow(phrases: SeedPhrase[]): string[] {
  // Shadow sentences are IN the learning language — i.e. the `phrase` field.
  // We cap at 3 per lesson so the warm-up stays short.
  return phrases.slice(0, 3).map((p) => p.phrase);
}

function phrasesToTasks(phrases: SeedPhrase[]): string[] {
  // Each phrase's `meaning` is roughly "what you're trying to say". Use it
  // verbatim — our source authors have already written them concisely.
  return phrases.slice(0, 3).map((p) => p.meaning);
}

function compileSituation(
  locale: string,
  situationSlug: string,
  situation: SeedSituation,
): TalkTopic {
  const lang = localeToLang(locale);
  const tag = localeTag(locale);
  const topicSlug = `sit-${situationSlug}-${tag}`;
  const topicId = `topic:v2:${tag}:${situationSlug}`;
  // Native title in the learner's own language. Each lang's seed data
  // ships `title` as the local-script name (レストランで for ja,
  // "En el Aeropuerto" for es, etc.); `titleEn` is only ever a fallback
  // for debugging. Showing the native title is what Trancy + the live
  // extension do, and it's what Jay asked for 2026-10-25.
  const title = situation.title;
  const emoji = situation.icon || SITUATION_ICON_FALLBACK[situationSlug] || "💬";
  const category = SITUATION_CATEGORIES[situationSlug] ?? "Daily life";
  const blurb = SITUATION_BLURBS[situationSlug] ?? "Short, real conversations from this scene.";

  const slots = LESSON_SLOTS[situationSlug] ?? [
    { slug: "a", title: "Lesson A", scene: "A short, realistic chat.", opener: "Hi there — ready to start?" },
    { slug: "b", title: "Lesson B", scene: "A short, realistic chat.", opener: "Hi there — ready to start?" },
    { slug: "c", title: "Lesson C", scene: "A short, realistic chat.", opener: "Hi there — ready to start?" },
  ];

  const phraseSlices = sliceEqual(situation.phrases, slots.length);

  const lessons: TalkLesson[] = slots.map((slot, i) => {
    const slice = phraseSlices[i] ?? [];
    return {
      id: `lesson:v2:${tag}:${situationSlug}:${slot.slug}`,
      slug: slot.slug,
      topicSlug,
      title: slot.title,
      scene: slot.scene,
      aiRole: AI_ROLE[situationSlug] ?? "A patient conversation partner.",
      userRole: USER_ROLE[situationSlug] ?? "A learner practising this scene.",
      tasks: phrasesToTasks(slice),
      shadowSentences: phrasesToShadow(slice),
      opener: slot.opener,
    };
  });

  return {
    id: topicId,
    slug: topicSlug,
    category,
    // No "(ja)" / "(es-ES)" suffix — the Talk index is already lang-scoped
    // on `activeLearningLang`, so there's no multi-lang disambiguation needed.
    title,
    emoji,
    blurb,
    lessons,
  };
}

function compileAll(): TalkTopic[] {
  const all: TalkTopic[] = [];
  const push = (bundle: Record<string, SeedLocaleBundle>) => {
    for (const [locale, byslug] of Object.entries(bundle)) {
      for (const [slug, situation] of Object.entries(byslug)) {
        if (!situation || !Array.isArray(situation.phrases) || situation.phrases.length === 0) {
          continue;
        }
        all.push(compileSituation(locale, slug, situation));
      }
    }
  };
  push(situations);
  push(situations2);
  return all;
}

/** All (locale, situation) pairs compiled into TalkTopic / TalkLesson shape. */
export const SEEDED_TOPICS: TalkTopic[] = compileAll();

/** Metadata about which language each seeded topic belongs to — used when
 *  seeding Prisma (TalkTopic.lang) and when the Talk page scopes by viewer. */
export const SEEDED_TOPIC_LANG: Record<string, string> = Object.fromEntries(
  SEEDED_TOPICS.map((t) => {
    // Recover lang from the id: `topic:v2:{localeTag}:{situationSlug}`.
    const parts = t.id.split(":");
    const localeTagPart = parts[2] ?? "en";
    return [t.id, localeToLang(localeTagPart)];
  }),
);

/** Convenience for callers that need the lang alongside each topic. */
export interface SeededTopicRow {
  topic: TalkTopic;
  lang: string;
}

export function seededTopicRows(): SeededTopicRow[] {
  return SEEDED_TOPICS.map((topic) => ({
    topic,
    lang: SEEDED_TOPIC_LANG[topic.id] ?? "en",
  }));
}
