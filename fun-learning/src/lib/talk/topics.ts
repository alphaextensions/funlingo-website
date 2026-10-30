/**
 * Talk topic + lesson catalog.
 *
 * SPEC §7.1 lists ~120 topics with 2–11 lessons each.
 *
 * v1 shipped a hand-authored subset of 6 generic (lang-neutral) topics with
 * 3–5 lessons each — kept below as `HARDCODED_TOPICS` because every API route
 * resolves lesson ids against this in-memory array via `findLessonById`.
 *
 * Wave 5 (content seeding) adds `SEEDED_TOPICS` compiled from the bundled
 * situations catalogs (`data/seed/situations*.json`) and merges them into
 * `TALK_TOPICS`. Both arrays share the same shape, so API lookups stay sync.
 *
 * Rule from LEGAL.md: these are ALL Funlingo-authored scenes. Nothing here
 * comes from a copyrighted script or lyric. The Wave 5 seed is Funlingo's own
 * bundled catalog, not third-party captions. Keep it that way.
 */

// Wave 5 content seeding — see src/lib/talk/seedCatalog.ts. The import must
// live near the top so lint rules against mid-file imports don't trip, even
// though the use is further down. The seeded catalog's type-only import of
// TalkTopic/TalkLesson from this file does not create a runtime cycle.
import { SEEDED_TOPICS as __SEEDED_TOPICS } from "./seedCatalog";

export interface TalkTopic {
  id: string;
  slug: string;
  category: string;
  title: string;
  emoji: string;
  blurb: string;
  lessons: TalkLesson[];
}

export interface TalkLesson {
  id: string;
  slug: string;
  topicSlug: string;
  title: string;
  scene: string;
  aiRole: string;
  userRole: string;
  tasks: string[];
  /** Shadowing warm-up (short, Funlingo-written). Never a copyrighted script. */
  shadowSentences: string[];
  /**
   * Wave 13 BLOCKER-22: the AI's first line in the conversation, written in
   * character for THIS specific scene. Used verbatim as the opener bubble
   * (no `(scene) role:` prefix). Hand-authored for every HARDCODED_TOPICS
   * lesson; a per-situation generic opener covers the Wave 5 seeded set.
   */
  opener: string;
}

const topic = (t: Omit<TalkTopic, "id"> & { id?: string }): TalkTopic => {
  const id = t.id ?? `topic:${t.slug}`;
  return {
    id,
    slug: t.slug,
    category: t.category,
    title: t.title,
    emoji: t.emoji,
    blurb: t.blurb,
    lessons: t.lessons.map((l) => ({ ...l, id: l.id ?? `lesson:${t.slug}:${l.slug}` })),
  };
};

export const HARDCODED_TOPICS: TalkTopic[] = [
  topic({
    slug: "coffee",
    category: "Daily life",
    title: "Ordering a coffee",
    emoji: "☕",
    blurb: "Walk up to a counter and order the drink you actually want.",
    lessons: [
      {
        id: "lesson:coffee:small-order",
        slug: "small-order",
        topicSlug: "coffee",
        title: "Just an espresso, to go",
        scene: "A busy neighbourhood café at 9am. The learner steps up to the counter to order a small coffee to take with them.",
        aiRole: "A friendly barista at a neighbourhood café.",
        userRole: "A customer ordering a drink to go.",
        tasks: [
          "Order a small espresso",
          "Say you want it to go",
          "Pay by card",
        ],
        shadowSentences: [
          "A small espresso to go, please.",
          "Can I pay by card?",
          "Thanks, have a good one.",
        ],
        opener: "Morning! What can I get started for you?",
      },
      {
        id: "lesson:coffee:customize",
        slug: "customize",
        topicSlug: "coffee",
        title: "Milk, size, sweetness",
        scene: "A chain café at lunch. The learner wants a bigger drink with oat milk and less sugar.",
        aiRole: "A patient barista talking the learner through options.",
        userRole: "A customer who wants their drink made a specific way.",
        tasks: [
          "Choose a size",
          "Ask for oat milk",
          "Ask for less sugar",
        ],
        shadowSentences: [
          "Can I get a large one with oat milk?",
          "Half the sugar, please.",
          "That's it for me, thanks.",
        ],
        opener: "Hi there — what size are we thinking?",
      },
      {
        id: "lesson:coffee:to-stay",
        slug: "to-stay",
        topicSlug: "coffee",
        title: "Finding a seat",
        scene: "A small café in the afternoon. The learner wants to sit, order a drink, and find out where the bathroom is.",
        aiRole: "A barista who also runs the floor.",
        userRole: "A customer settling in to study for an hour.",
        tasks: [
          "Ask if a seat is free",
          "Order a drink to stay",
          "Ask where the bathroom is",
        ],
        shadowSentences: [
          "Is this seat free?",
          "A flat white, to stay, please.",
          "Where's the bathroom?",
        ],
        opener: "Hey — go ahead and grab any open seat, I'll be right over.",
      },
    ],
  }),
  topic({
    slug: "friend",
    category: "Social",
    title: "Meeting a friend",
    emoji: "👋",
    blurb: "Catch up after a while apart — small talk that doesn't feel small.",
    lessons: [
      {
        id: "lesson:friend:first-meet",
        slug: "first-meet",
        topicSlug: "friend",
        title: "First time meeting",
        scene: "A friend-of-a-friend introduces the learner to someone at a casual Saturday get-together.",
        aiRole: "The new acquaintance — friendly, curious, open.",
        userRole: "Someone who was just introduced.",
        tasks: [
          "Say your name",
          "Say what you do",
          "Ask them something back",
        ],
        shadowSentences: [
          "Nice to finally meet you.",
          "I work in tech — nothing exciting.",
          "What about you?",
        ],
        opener: "Hey, nice to meet you — I've heard your name a few times. How do you two know each other?",
      },
      {
        id: "lesson:friend:catch-up",
        slug: "catch-up",
        topicSlug: "friend",
        title: "Catching up after months",
        scene: "The learner runs into an old friend they haven't seen since the start of the year.",
        aiRole: "An old friend — warm, a bit nostalgic.",
        userRole: "An old friend trying to catch up without staying forever.",
        tasks: [
          "Say how you've been",
          "Ask about their news",
          "Make a loose plan to see them again",
        ],
        shadowSentences: [
          "It's been forever.",
          "Honestly, same old, same old.",
          "Let's grab lunch next week?",
        ],
        opener: "No way — it's been months! How have you been?",
      },
      {
        id: "lesson:friend:apology",
        slug: "apology",
        topicSlug: "friend",
        title: "Apologising for being late",
        scene: "The learner arrives 20 minutes late to meet a friend. Traffic was awful.",
        aiRole: "A friend who's been waiting — patient but ready to tease a little.",
        userRole: "Someone who feels bad about being late.",
        tasks: [
          "Apologise once",
          "Explain briefly",
          "Suggest making it up",
        ],
        shadowSentences: [
          "I'm so sorry, the trains were a mess.",
          "Let me get the first round.",
          "You've been waiting forever, haven't you?",
        ],
        opener: "There you are — I was about to send a search party.",
      },
      {
        id: "lesson:friend:bad-day",
        slug: "bad-day",
        topicSlug: "friend",
        title: "A friend's rough day",
        scene: "The learner's friend has had a tough day at work and wants to vent for a bit.",
        aiRole: "A friend who had a bad day.",
        userRole: "A friend who listens, then gently reframes.",
        tasks: [
          "Listen without rushing to fix",
          "Ask one open question",
          "Offer something small and kind",
        ],
        shadowSentences: [
          "That sounds brutal.",
          "What made it worst?",
          "Want to just get out of here for a bit?",
        ],
        opener: "I don't even know where to start — today was a disaster.",
      },
    ],
  }),
  topic({
    slug: "directions",
    category: "Travel",
    title: "Getting directions",
    emoji: "🗺️",
    blurb: "Lost in a new neighbourhood? Ask without feeling stuck.",
    lessons: [
      {
        id: "lesson:directions:to-station",
        slug: "to-station",
        topicSlug: "directions",
        title: "Finding the station",
        scene: "A quiet side street in a city the learner doesn't know. They need to find the nearest metro station.",
        aiRole: "A friendly local out walking their dog.",
        userRole: "A visitor trying to find the metro.",
        tasks: [
          "Ask politely",
          "Confirm which direction",
          "Thank them clearly",
        ],
        shadowSentences: [
          "Sorry to bother you — do you know where the nearest station is?",
          "So, straight down this road?",
          "Thanks so much, that's really kind.",
        ],
        opener: "Hey — you look a bit lost. Looking for somewhere?",
      },
      {
        id: "lesson:directions:lost-tourist",
        slug: "lost-tourist",
        topicSlug: "directions",
        title: "Lost near the old town",
        scene: "The learner thinks they overshot a landmark on the way back to their hotel. The map isn't loading.",
        aiRole: "A shopkeeper taking a break outside.",
        userRole: "A tired tourist trying to get home.",
        tasks: [
          "Describe where you're trying to get to",
          "Ask how long it'll take on foot",
          "Clarify a left or right",
        ],
        shadowSentences: [
          "I'm trying to get back to the Palace hotel.",
          "How long is that on foot?",
          "Left at the fountain, got it.",
        ],
        opener: "Are you alright? You've walked past twice now — can I help?",
      },
      {
        id: "lesson:directions:transit",
        slug: "transit",
        topicSlug: "directions",
        title: "Which bus goes there?",
        scene: "At a bus stop. The learner needs the right line and isn't sure how often it comes.",
        aiRole: "Another passenger who takes this stop every day.",
        userRole: "A newcomer who's never used this line before.",
        tasks: [
          "Confirm the line number",
          "Ask about how often it comes",
          "Ask how to pay",
        ],
        shadowSentences: [
          "Does this stop go to the museum?",
          "Every ten minutes, or so?",
          "Do I pay the driver, or tap a card?",
        ],
        opener: "The 14 just left — the next one's usually here in about ten minutes.",
      },
    ],
  }),
  topic({
    slug: "restaurant",
    category: "Food",
    title: "At a restaurant",
    emoji: "🍜",
    blurb: "From the first greeting to splitting the bill.",
    lessons: [
      {
        id: "lesson:restaurant:booking",
        slug: "booking",
        topicSlug: "restaurant",
        title: "Booking a table",
        scene: "A Friday night. The learner calls to book a table for two for the next evening.",
        aiRole: "A host taking reservations.",
        userRole: "Someone trying to book for two at 8pm.",
        tasks: [
          "Give a date and time",
          "Give a party size",
          "Confirm it in your own words",
        ],
        shadowSentences: [
          "Could I book a table for two?",
          "Tomorrow, around eight.",
          "Great — so, two of us at eight tomorrow.",
        ],
        opener: "Good evening, Osteria Nova — are you looking to make a reservation?",
      },
      {
        id: "lesson:restaurant:order",
        slug: "order",
        topicSlug: "restaurant",
        title: "Ordering with a question",
        scene: "The learner is sitting down with a menu but doesn't recognise one of the dishes.",
        aiRole: "A warm server happy to recommend.",
        userRole: "A diner curious about a dish they don't know.",
        tasks: [
          "Ask what a dish is",
          "Ask what the server recommends",
          "Order with any adjustments you need",
        ],
        shadowSentences: [
          "Sorry, what's in the house special?",
          "What would you recommend?",
          "I'll go with that, but no cilantro, please.",
        ],
        opener: "Hi! Have you had a chance to look at the menu, or should I give you another minute?",
      },
      {
        id: "lesson:restaurant:bill",
        slug: "bill",
        topicSlug: "restaurant",
        title: "Splitting the bill",
        scene: "End of a group dinner. The learner wants to pay their own share.",
        aiRole: "The server trying to help a confused table.",
        userRole: "The friend trying to split cleanly.",
        tasks: [
          "Ask for the bill",
          "Ask to split by person",
          "Thank them and wrap up",
        ],
        shadowSentences: [
          "Could we have the bill, please?",
          "Can we split it four ways?",
          "That's perfect, thank you.",
        ],
        opener: "How was everything tonight? Can I bring you anything else?",
      },
    ],
  }),
  topic({
    slug: "work",
    category: "Work",
    title: "Work small talk",
    emoji: "💼",
    blurb: "Monday-morning talk that doesn't make you cringe.",
    lessons: [
      {
        id: "lesson:work:intro",
        slug: "intro",
        topicSlug: "work",
        title: "Meeting a new colleague",
        scene: "First day. The learner sits down near someone new at the office kitchen.",
        aiRole: "A colleague who's been there a few years.",
        userRole: "A new hire on their first morning.",
        tasks: [
          "Introduce yourself",
          "Ask about their work",
          "Keep it short",
        ],
        shadowSentences: [
          "Hey, I just started on the design team.",
          "What do you work on?",
          "Nice meeting you — see you around.",
        ],
        opener: "Hi — I don't think we've met. Are you new here?",
      },
      {
        id: "lesson:work:ask-help",
        slug: "ask-help",
        topicSlug: "work",
        title: "Asking a quick favour",
        scene: "The learner needs a colleague to review a slide before a meeting at 2pm.",
        aiRole: "A busy colleague.",
        userRole: "Someone making a small, specific ask.",
        tasks: [
          "Be specific about what you need",
          "Give a tight timeframe",
          "Say thanks",
        ],
        shadowSentences: [
          "Could you look over one slide before two?",
          "It won't take more than a minute.",
          "I owe you one.",
        ],
        opener: "Hey — what's up? I've got about five minutes before my next call.",
      },
      {
        id: "lesson:work:feedback",
        slug: "feedback",
        topicSlug: "work",
        title: "Pushing back politely",
        scene: "A review meeting. The learner disagrees with a decision but doesn't want to burn bridges.",
        aiRole: "A manager open to a conversation.",
        userRole: "An employee with a clear counter-argument.",
        tasks: [
          "Acknowledge their point first",
          "Share your concern simply",
          "Suggest a next step",
        ],
        shadowSentences: [
          "I hear you on that.",
          "I'm just worried about the timeline.",
          "Could we do a quick check-in next week?",
        ],
        opener: "Thanks for jumping on this. I wanted to walk through the plan — any first reactions?",
      },
    ],
  }),
  topic({
    slug: "doctor",
    category: "Health",
    title: "At the doctor",
    emoji: "🩺",
    blurb: "Describe what's wrong without rehearsing it a dozen times first.",
    lessons: [
      {
        id: "lesson:doctor:cold",
        slug: "cold",
        topicSlug: "doctor",
        title: "A cold that won't quit",
        scene: "A GP visit. The learner has had a cough for over a week.",
        aiRole: "A kind GP taking notes.",
        userRole: "A patient explaining symptoms.",
        tasks: [
          "Say when it started",
          "Describe the symptoms",
          "Ask one question back",
        ],
        shadowSentences: [
          "It started about ten days ago.",
          "I'm mostly okay, but the cough is really stubborn.",
          "Is there anything that would help me sleep better?",
        ],
        opener: "Come on in. So, what's been going on?",
      },
      {
        id: "lesson:doctor:prescription",
        slug: "prescription",
        topicSlug: "doctor",
        title: "Picking up a prescription",
        scene: "A pharmacy counter. The learner is picking up medicine and needs to double-check the instructions.",
        aiRole: "A careful pharmacist.",
        userRole: "A patient who wants to be sure.",
        tasks: [
          "Confirm the dosage",
          "Ask about food",
          "Thank them clearly",
        ],
        shadowSentences: [
          "So — one in the morning, one at night?",
          "Should I take it with food?",
          "Thanks, that's really helpful.",
        ],
        opener: "Hi there — picking up a prescription? Can I grab a name?",
      },
      {
        id: "lesson:doctor:booking",
        slug: "booking",
        topicSlug: "doctor",
        title: "Booking an appointment",
        scene: "Phone call to a clinic. The learner wants the first available non-urgent slot.",
        aiRole: "A clinic receptionist.",
        userRole: "A patient trying to book.",
        tasks: [
          "Say what you need",
          "Say when you're free",
          "Confirm the appointment at the end",
        ],
        shadowSentences: [
          "I'd like to book a check-up.",
          "I'm free most afternoons next week.",
          "Thursday at three — got it.",
        ],
        opener: "Good morning, Elm Street Clinic — how can I help?",
      },
    ],
  }),
];

/** Full catalog (hard-coded + Wave 5 seeded). Readers should use this.
 *  Prisma stays the source of truth once scripts/seed-talk.ts has run; this
 *  merged in-memory array is the fallback and the sync lookup for API routes
 *  (findLesson / findLessonById), which must resolve lesson ids off a single
 *  catalog without an async DB round-trip. */
export const TALK_TOPICS: TalkTopic[] = [...HARDCODED_TOPICS, ...__SEEDED_TOPICS];

export function findTopic(slug: string): TalkTopic | undefined {
  return TALK_TOPICS.find((t) => t.slug === slug);
}

export function findLesson(
  topicSlug: string,
  lessonSlug: string,
): { topic: TalkTopic; lesson: TalkLesson } | undefined {
  const t = findTopic(topicSlug);
  if (!t) return undefined;
  const lesson = t.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { topic: t, lesson };
}

export function findLessonById(
  lessonId: string,
): { topic: TalkTopic; lesson: TalkLesson } | undefined {
  for (const t of TALK_TOPICS) {
    const l = t.lessons.find((x) => x.id === lessonId);
    if (l) return { topic: t, lesson: l };
  }
  return undefined;
}
