/**
 * Wave 5 content seeding — Sentence Packs from the bundled slang catalog.
 *
 * Source: Funlingo extension's bundled catalogs — Funlingo-authored content
 * (data/seed/slangs.json). LEGAL.md: safe to persist (our own writing, not
 * third-party captions).
 *
 * One Pack per locale → `Slang & idioms (<Language name>)`. 24 PackItem rows
 * each, text = `phrase`, translation = `meaning`. Idempotent via deterministic
 * ids (`pack:slang:{locale}`, `pack:slang:{locale}:item:{nn}`).
 *
 * Also seeds a small set of Show Packs that bundle slang entries into a
 * short-lines format (capped at 24 items), so the Show Packs tab is non-empty
 * for 'en' and 'es' learners.
 *
 * Run:
 *   pnpm tsx scripts/seed-packs.ts
 */

import { PrismaClient } from "@prisma/client";
import slangsJson from "../data/seed/slangs.json";

const prisma = new PrismaClient();

interface SlangExpr {
  phrase: string;
  romanization?: string;
  meaning: string;
  example?: string;
  register?: string;
  category?: string;
  era?: string;
}

interface SlangBundle {
  expressions: SlangExpr[];
}

const slangs = slangsJson as unknown as Record<string, SlangBundle>;

/** Human-readable language name for the pack title. Keyed on the full locale
 *  so e.g. "Slang & idioms (American English)" differs from "British English". */
const LOCALE_NAME: Record<string, string> = {
  ar: "Arabic",
  de: "German",
  en: "English",
  "en-GB": "British English",
  "en-US": "American English",
  es: "Spanish",
  "es-ES": "Spanish (Spain)",
  "es-LA": "Spanish (Latin America)",
  fr: "French",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  tr: "Turkish",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
};

function toLang(locale: string): string {
  const lc = locale.toLowerCase();
  if (lc.startsWith("en")) return "en";
  if (lc.startsWith("es")) return "es";
  if (lc.startsWith("pt")) return "pt";
  if (lc === "zh-cn" || lc === "zh-tw") return "zh";
  return lc;
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

async function seedSentencePacks() {
  const locales = Object.keys(slangs);
  let packCount = 0;
  let itemCount = 0;

  for (const locale of locales) {
    const bundle = slangs[locale];
    if (!bundle || !Array.isArray(bundle.expressions) || bundle.expressions.length === 0) {
      continue;
    }
    const lang = toLang(locale);
    const name = LOCALE_NAME[locale] ?? locale.toUpperCase();
    const packId = `pack:slang:${locale.toLowerCase()}`;
    const total = bundle.expressions.length;

    await prisma.pack.upsert({
      where: { id: packId },
      update: {
        title: `Slang & idioms (${name})`,
        kind: "sentence",
        lang,
        level: "A2",
        category: "Idioms",
        meta: JSON.stringify({
          blurb: `${total} everyday ${name} expressions — informal, native and current.`,
          itemCount: total,
          locale,
          source: "funlingo-slang-catalog",
        }),
      },
      create: {
        id: packId,
        kind: "sentence",
        lang,
        title: `Slang & idioms (${name})`,
        level: "A2",
        category: "Idioms",
        meta: JSON.stringify({
          blurb: `${total} everyday ${name} expressions — informal, native and current.`,
          itemCount: total,
          locale,
          source: "funlingo-slang-catalog",
        }),
      },
    });
    packCount += 1;

    for (let i = 0; i < bundle.expressions.length; i += 1) {
      const expr = bundle.expressions[i]!;
      const itemId = `${packId}:item:${pad2(i)}`;
      await prisma.packItem.upsert({
        where: { id: itemId },
        update: {
          packId,
          chapter: 0,
          order: i,
          kind: "sentence",
          text: expr.phrase,
          translation: expr.meaning,
          audioUrl: null,
        },
        create: {
          id: itemId,
          packId,
          chapter: 0,
          order: i,
          kind: "sentence",
          text: expr.phrase,
          translation: expr.meaning,
          audioUrl: null,
        },
      });
      itemCount += 1;
    }
  }

  console.log(`[seed-packs] Sentence Packs: ${packCount} packs, ${itemCount} items.`);
  return { packCount, itemCount };
}

async function seedShowPacks() {
  // Two Show Packs bundling slang expressions into a short-lines format
  // (capped at 24 items — the title must not claim a count it doesn't have).
  // Keeps the Show Packs tab non-empty for English + Spanish learners.
  const shows = [
    {
      id: "pack:show:everyday-en",
      lang: "en",
      locale: "en-US",
      title: "Everyday English — short lines",
      category: "Sitcoms",
      blurb: "Short, native-speaker lines from the kind of chats you overhear on US TV every week.",
    },
    {
      id: "pack:show:everyday-es",
      lang: "es",
      locale: "es-LA",
      title: "Español cotidiano — líneas cortas",
      category: "Everyday",
      blurb: "Expresiones cortas y naturales — así hablan en la calle y en las series.",
    },
  ];

  let packCount = 0;
  let itemCount = 0;

  for (const show of shows) {
    const bundle = slangs[show.locale];
    if (!bundle) continue;

    await prisma.pack.upsert({
      where: { id: show.id },
      update: {
        kind: "show",
        lang: show.lang,
        title: show.title,
        level: "B1",
        category: show.category,
        meta: JSON.stringify({
          platforms: ["Everyday"],
          blurb: show.blurb,
          itemCount: Math.min(bundle.expressions.length, 24),
          locale: show.locale,
          source: "funlingo-slang-catalog",
        }),
      },
      create: {
        id: show.id,
        kind: "show",
        lang: show.lang,
        title: show.title,
        level: "B1",
        category: show.category,
        meta: JSON.stringify({
          platforms: ["Everyday"],
          blurb: show.blurb,
          itemCount: Math.min(bundle.expressions.length, 24),
          locale: show.locale,
          source: "funlingo-slang-catalog",
        }),
      },
    });
    packCount += 1;

    const slice = bundle.expressions.slice(0, 24);
    for (let i = 0; i < slice.length; i += 1) {
      const expr = slice[i]!;
      const itemId = `${show.id}:item:${pad2(i)}`;
      await prisma.packItem.upsert({
        where: { id: itemId },
        update: {
          packId: show.id,
          chapter: 0,
          order: i,
          kind: "sentence",
          text: expr.phrase,
          translation: expr.meaning,
          audioUrl: null,
        },
        create: {
          id: itemId,
          packId: show.id,
          chapter: 0,
          order: i,
          kind: "sentence",
          text: expr.phrase,
          translation: expr.meaning,
          audioUrl: null,
        },
      });
      itemCount += 1;
    }
  }

  console.log(`[seed-packs] Show Packs: ${packCount} packs, ${itemCount} items.`);
  return { packCount, itemCount };
}

async function main() {
  const sent = await seedSentencePacks();
  const show = await seedShowPacks();
  console.log(
    `[seed-packs] Done. Totals: ${sent.packCount + show.packCount} packs, ` +
      `${sent.itemCount + show.itemCount} items.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
