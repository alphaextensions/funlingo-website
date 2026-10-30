/**
 * Read catalog.
 *
 * Classics: public-domain EPUBs with publisher cover URLs. The reader fetches
 * the EPUB from `streamUrl` in the client at render time (CORS allowing) or
 * falls back to "Open at source" when the publisher blocks direct
 * cross-origin reads. We NEVER store the book's text in the DB.
 *
 * Wave 6 (content-seed-II): the Classics array is now loaded from
 * `data/seed/classics.json` so the catalogue grows without touching code.
 * `scripts/seed-classics.ts` upserts the same JSON into Prisma Book rows for
 * features that query the DB (My Shelf, future shared bookmarks).
 *
 * Graded readers come in two flavours now:
 *   - `GRADED_READERS`: Funlingo-authored inline short texts (A1–B2). The
 *     text is a small constant that lives in the repo — our own writing,
 *     not extracted from any copyrighted work (LEGAL.md).
 *   - `EXTERNAL_GRADED_READERS`: CC-BY titles from StoryWeaver, African
 *     Storybook, Book Dash and GDL. We store ONLY metadata — the full book
 *     opens on the publisher's own reader page.
 */

import classicsJson from "../../../data/seed/classics.json";
import gradedExternalJson from "../../../data/seed/graded.json";

export interface ClassicBook {
  key: string; // stable id → becomes the DB bookId
  title: string;
  author: string;
  lang: string; // ISO-639-1
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  genre?: string;
  licence: string;
  source: "standard_ebooks" | "gutenberg" | "aozora";
  streamUrl: string; // public EPUB or HTML URL
  coverUrl: string | null;
  credits: {
    publisher: string;
    publisherUrl: string;
  };
  verified?: boolean;
}

interface ClassicsJsonEntry {
  key: string;
  title: string;
  author: string;
  lang: string;
  level: string;
  genre?: string;
  licence: string;
  source: string;
  streamUrl: string;
  coverUrl: string | null;
  credits: { publisher: string; publisherUrl: string };
  verified?: boolean;
}

interface ClassicsJsonFile {
  _about?: string;
  entries: ClassicsJsonEntry[];
}

const classicsRaw = (classicsJson as unknown as ClassicsJsonFile).entries;

export const CLASSICS: ClassicBook[] = classicsRaw.map((e) => ({
  key: e.key,
  title: e.title,
  author: e.author,
  lang: e.lang,
  level: e.level as ClassicBook["level"],
  genre: e.genre,
  licence: e.licence,
  source: e.source as ClassicBook["source"],
  streamUrl: e.streamUrl,
  coverUrl: e.coverUrl,
  credits: e.credits,
  verified: e.verified,
}));

// ---------------------------------------------------------------------------
// Graded readers — Funlingo-authored short texts.
//
// Each `pages` entry is one spread (left + right pages on desktop, two
// consecutive pages on mobile). The reader paginates these as-is; EPUB CFIs
// are substituted with `graded:<key>:<pageIndex>` for ReadingPosition.
// ---------------------------------------------------------------------------

export interface GradedPage {
  heading?: string;
  body: string;
}

export interface GradedReader {
  key: string; // stable id → becomes the DB bookId
  title: string;
  author: string; // always "Funlingo"
  lang: string;
  level: "A1" | "A2" | "B1" | "B2";
  licence: string; // CC-BY-4.0 (our own writing)
  summary: string;
  pages: GradedPage[];
}

export const GRADED_READERS: GradedReader[] = [
  {
    key: "graded:en:a1-market-morning",
    title: "A Morning at the Market",
    author: "Funlingo",
    lang: "en",
    level: "A1",
    licence: "CC-BY-4.0",
    summary: "A1 story about buying fruit on a sunny morning. Short, present tense.",
    pages: [
      {
        heading: "At the stall",
        body: "The sun is bright. Nora walks to the market. She has a small basket. She wants three apples and a lemon. The apples are red and the lemon is yellow.",
      },
      {
        heading: "The seller",
        body: "The seller smiles. \"Good morning, Nora.\" Nora smiles back. \"Good morning. Three apples, please.\" The seller puts the apples in her basket. The apples are heavy.",
      },
      {
        heading: "The lemon",
        body: "\"A lemon too?\" asks the seller. \"Yes, one lemon.\" The lemon is small and round. Nora pays and says thank you. She walks home with her basket.",
      },
      {
        heading: "At home",
        body: "At home, Nora washes the apples. She cuts the lemon. The kitchen smells fresh. She puts a slice in her water. It is a good morning.",
      },
    ],
  },
  {
    key: "graded:en:a2-wrong-bus",
    title: "The Wrong Bus",
    author: "Funlingo",
    lang: "en",
    level: "A2",
    licence: "CC-BY-4.0",
    summary: "A2 story about taking the wrong bus and finding the way back.",
    pages: [
      {
        body: "Marco is new in the city. On Monday morning, he gets on the first bus he sees. He thinks it goes to the office. He puts on his headphones and watches the window.",
      },
      {
        body: "After twenty minutes, he looks up. He does not know this street. The signs are strange. He is nervous. He asks the driver, \"Does this bus go to Central?\" The driver shakes his head.",
      },
      {
        body: "\"Get off here,\" the driver says. \"Take the number 7 across the road. Three stops.\" Marco thanks him. He gets off and crosses the road. He feels silly, but a little proud too.",
      },
      {
        body: "The number 7 arrives. Marco gets on. Three stops later, he is at Central. He is only ten minutes late. His manager laughs. \"The first week is always like this.\"",
      },
    ],
  },
  {
    key: "graded:en:b1-interview",
    title: "The Short Interview",
    author: "Funlingo",
    lang: "en",
    level: "B1",
    licence: "CC-BY-4.0",
    summary: "B1 story about an interview that doesn't go as planned.",
    pages: [
      {
        body: "Priya had been preparing for the interview for two weeks. She had answers ready for every question she could think of. She wore the shirt she only wore for important days.",
      },
      {
        body: "The interviewer was late. When he finally arrived, he smiled, apologised, and said, \"Tell me about a time you were wrong.\" Priya had not prepared for that one. She paused.",
      },
      {
        body: "She told him about a project last year. She had been sure it would work. It did not. The team had to redo three months of work. She told him what she had learned.",
      },
      {
        body: "The interviewer nodded, took a note, and asked another question. By the end of the hour, Priya was not sure how it had gone. Two days later, they offered her the job.",
      },
    ],
  },
  {
    key: "graded:es:a1-cafe",
    title: "Un café en la plaza",
    author: "Funlingo",
    lang: "es",
    level: "A1",
    licence: "CC-BY-4.0",
    summary: "A1 — Spanish — ordering a coffee in a sunny plaza.",
    pages: [
      {
        body: "Es sábado. Hace sol. Luis camina a la plaza. En la plaza hay un café pequeño. Las mesas están afuera.",
      },
      {
        body: "Luis se sienta en una mesa. Una camarera se acerca. \"Buenos días. ¿Qué desea?\" Luis sonríe. \"Un café con leche, por favor.\"",
      },
      {
        body: "La camarera trae el café. El café está caliente. Luis mira la plaza. Hay niños, flores y música. Es un sábado tranquilo.",
      },
    ],
  },
  {
    key: "graded:ja:a2-konbini",
    title: "コンビニの夜",
    author: "Funlingo",
    lang: "ja",
    level: "A2",
    licence: "CC-BY-4.0",
    summary: "A2 — Japanese — a late-night convenience store trip.",
    pages: [
      {
        body: "夜の十一時。アキは眠れません。だから、近くのコンビニへ歩いていきます。空に星が見えます。風は冷たいです。",
      },
      {
        body: "コンビニのドアが開きます。「いらっしゃいませ。」店員の声は明るいです。アキはおにぎりとお茶を取ります。",
      },
      {
        body: "レジで店員は言います。「お箸はご入り用ですか。」アキは首をふります。「いいえ、大丈夫です。」そして家へ帰ります。",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// External graded readers (CC-BY, hosted by publishers).
//
// Wave 6 (content-seed-II): we only store metadata and link out to the
// publisher's own reader. No book text, no page content, no embedding — just
// a card the learner can tap to open the book on StoryWeaver / African
// Storybook / Book Dash / GDL.
// ---------------------------------------------------------------------------

export interface ExternalGradedReader {
  key: string;
  title: string;
  author: string;
  illustrator: string | null;
  lang: string;
  level: "A1" | "A2" | "B1" | "B2";
  licence: string;
  publisher: string;
  publisherUrl: string;
  sourceUrl: string;
  coverUrl: string | null;
  summary: string;
  verified?: boolean;
}

interface GradedJsonEntry {
  key: string;
  title: string;
  author: string;
  illustrator: string | null;
  lang: string;
  level: string;
  licence: string;
  publisher: string;
  publisherUrl: string;
  sourceUrl: string;
  coverUrl: string | null;
  summary: string;
  verified?: boolean;
}

interface GradedJsonFile {
  _about?: string;
  entries: GradedJsonEntry[];
}

const gradedExternalRaw = (gradedExternalJson as unknown as GradedJsonFile).entries;

export const EXTERNAL_GRADED_READERS: ExternalGradedReader[] = gradedExternalRaw.map(
  (e) => ({
    key: e.key,
    title: e.title,
    author: e.author,
    illustrator: e.illustrator,
    lang: e.lang,
    level: e.level as ExternalGradedReader["level"],
    licence: e.licence,
    publisher: e.publisher,
    publisherUrl: e.publisherUrl,
    sourceUrl: e.sourceUrl,
    coverUrl: e.coverUrl,
    summary: e.summary,
    verified: e.verified,
  }),
);

export function findClassic(key: string): ClassicBook | undefined {
  return CLASSICS.find((c) => c.key === key);
}

export function findGradedReader(key: string): GradedReader | undefined {
  return GRADED_READERS.find((g) => g.key === key);
}

export function findExternalGraded(
  key: string,
): ExternalGradedReader | undefined {
  return EXTERNAL_GRADED_READERS.find((g) => g.key === key);
}
