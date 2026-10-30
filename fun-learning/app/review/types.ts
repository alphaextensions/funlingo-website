/**
 * Shared types between the Review page client UI and the session API.
 * Keep this in sync with `app/api/review/session/route.ts`.
 */

export type ReviewCardType = "word" | "sentence";

export type ReviewFormat =
  | "flashcard"
  | "guess"
  | "dictation"
  | "shadow"
  | "speaking";

export type UiGrade = 1 | 2 | 3 | 4;

export interface ReviewWordEncounter {
  line: string;
  translation: string | null;
  timestampSec: number | null;
  savedAt: string;
  sourceTitle: string | null;
  /** Non-null when the encounter came from a real Source (not demo/typed).
   * Powers the "Rewatch this scene" CTA on the Flashcard back. */
  sourceId: string | null;
  /** Lets the UI pick an icon / disable the rewatch CTA for non-video
   * sources (e.g. book, upload). */
  sourceType: string | null;
}

export interface ReviewWord {
  lemma: string;
  pos: string | null;
  note: string | null;
  encounter?: ReviewWordEncounter;
}

export interface ReviewSentence {
  text: string;
  translation: string | null;
  timestampSec: number | null;
  sourceTitle: string | null;
}

export interface ReviewSessionCard {
  cardType: ReviewCardType;
  cardId: string;
  lang: string;
  due: string;
  reps: number;
  state: number;
  word?: ReviewWord;
  sentence?: ReviewSentence;
}

export interface ReviewSessionResponse {
  lang: string;
  count: number;
  cards: ReviewSessionCard[];
}

export interface GradeResponse {
  logId: string;
  due: string;
  scheduledDays: number;
  state: number;
}

/** How we pick a drill for a given card. Word -> flashcard/guess; Sentence
 * -> dictation/shadowing/speaking. We rotate within type by card index so
 * every session mixes drills. */
export function pickDrillFor(
  card: ReviewSessionCard,
  index: number,
): ReviewFormat {
  if (card.cardType === "word") {
    // Alternate flashcard / guess every other word.
    return index % 2 === 0 ? "flashcard" : "guess";
  }
  // Sentence: dictation / shadow / speaking in rotation.
  const i = index % 3;
  if (i === 0) return "dictation";
  if (i === 1) return "shadow";
  return "speaking";
}
