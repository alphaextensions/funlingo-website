/**
 * Wave 6 content seeding — per-language Sentence Packs.
 *
 * Reads every JSON file under `data/seed/packs-v2/` and upserts one Pack per
 * (category × language) with its PackItem rows. 72 Packs total (6 categories ×
 * 12 languages). Pack.kind is always "sentence"; items carry chapter + order so
 * the detail page can group them.
 *
 * Why "v2": the first Wave 6 attempt built one multilingual pack per category
 * with English-only items, useless to a Japanese learner studying JP. This
 * replaces that with real per-lang content — a separate pack per (category,
 * lang), items in the target language with English gloss.
 *
 * Content rules (docs/LEGAL.md):
 *  - Funlingo-authored lines (safe), Tatoeba CC-BY, or strict public domain
 *    (Famous Quotes).
 *  - NO copyrighted scripts, lyrics, or movie dialogue.
 *
 * Deterministic ids (idempotent — re-run is a safe no-op):
 *   Pack:     pack:v2:{category}:{lang}
 *   PackItem: pack:v2:{category}:{lang}:item:{nn}
 *
 * Run:
 *   pnpm tsx scripts/seed-packs-v2.ts
 */

import { PrismaClient } from "@prisma/client";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

type LangCode =
  | "en" | "es" | "fr" | "de" | "it" | "pt"
  | "ja" | "ko" | "zh" | "hi" | "tr" | "ar";

const SUPPORTED_LANGS: LangCode[] = [
  "en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh", "hi", "tr", "ar",
];

interface PackItemAuthored {
  text: string;
  translation: string;
  chapter?: number;
  order?: number;
  meta?: Record<string, unknown>;
}

interface PackAuthored {
  title: string;
  blurb: string;
  level?: string;
  items: PackItemAuthored[];
  /** Per-pack author note (shows in meta JSON for the UI). */
  authorNote?: string;
}

interface CategoryFile {
  category: string;
  label: string;
  chapters?: { id: number; name: string }[];
  packs: Partial<Record<LangCode, PackAuthored>>;
}

/** Pretty label used in the fallback / "Category" chip on the pack card. */
const CATEGORY_LABEL: Record<string, string> = {
  everyday: "Everyday",
  famous: "Famous Quotes",
  proverbs: "Proverbs & Idioms",
  travel: "Travel",
  business: "Business & Email",
  emotions: "Emotions & Small Talk",
};

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Guard against duplicate `text` values inside a pack (CLAUDE.md "no duplicates"). */
function assertNoDuplicateText(packId: string, items: PackItemAuthored[]): void {
  const seen = new Map<string, number>();
  for (let i = 0; i < items.length; i += 1) {
    const key = items[i]!.text.trim();
    if (seen.has(key)) {
      const first = seen.get(key)!;
      throw new Error(
        `[seed-packs-v2] Duplicate text in ${packId}: items #${first} and #${i} both say "${key}"`,
      );
    }
    seen.set(key, i);
  }
}

/** Famous-quotes items MUST carry an `author` in meta — enforce it. */
function assertFamousItemsHaveAuthors(packId: string, items: PackItemAuthored[]): void {
  for (let i = 0; i < items.length; i += 1) {
    const author = items[i]!.meta?.author as string | undefined;
    if (!author || !author.trim()) {
      throw new Error(
        `[seed-packs-v2] Famous-quotes item ${packId}#${i} has no author in meta.`,
      );
    }
  }
}

async function seedCategory(file: CategoryFile): Promise<{ packs: number; items: number }> {
  const category = file.category;
  const chapters = file.chapters ?? [];
  const categoryLabel = CATEGORY_LABEL[category] ?? file.label ?? category;
  let packCount = 0;
  let itemCount = 0;

  for (const lang of SUPPORTED_LANGS) {
    const pack = file.packs[lang];
    if (!pack) {
      // Fine to skip a lang if the author flagged "unable to source verified
      // material" in a category — the smoke tests will catch the shortage.
      continue;
    }
    const items = pack.items ?? [];
    if (items.length === 0) continue;

    const packId = `pack:v2:${category}:${lang}`;
    assertNoDuplicateText(packId, items);
    if (category === "famous") {
      assertFamousItemsHaveAuthors(packId, items);
    }

    const meta = {
      blurb: pack.blurb,
      itemCount: items.length,
      source: `funlingo-packs-v2-${category}`,
      authorNote: pack.authorNote,
      chapters: chapters.length > 0 ? chapters : undefined,
    };

    await prisma.pack.upsert({
      where: { id: packId },
      update: {
        kind: "sentence",
        lang,
        title: pack.title,
        level: pack.level ?? "A2",
        category: categoryLabel,
        meta: JSON.stringify(meta),
      },
      create: {
        id: packId,
        kind: "sentence",
        lang,
        title: pack.title,
        level: pack.level ?? "A2",
        category: categoryLabel,
        meta: JSON.stringify(meta),
      },
    });
    packCount += 1;

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]!;
      const itemId = `${packId}:item:${pad2(i)}`;
      await prisma.packItem.upsert({
        where: { id: itemId },
        update: {
          packId,
          chapter: item.chapter ?? 0,
          order: item.order ?? i,
          kind: "sentence",
          text: item.text,
          translation: item.translation,
          audioUrl: null,
        },
        create: {
          id: itemId,
          packId,
          chapter: item.chapter ?? 0,
          order: item.order ?? i,
          kind: "sentence",
          text: item.text,
          translation: item.translation,
          audioUrl: null,
        },
      });
      itemCount += 1;
    }
  }

  return { packs: packCount, items: itemCount };
}

async function main() {
  const dir = join(process.cwd(), "data", "seed", "packs-v2");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();

  let totalPacks = 0;
  let totalItems = 0;

  for (const name of files) {
    const path = join(dir, name);
    const raw = readFileSync(path, "utf8");
    const data = JSON.parse(raw) as CategoryFile;
    const { packs, items } = await seedCategory(data);
    totalPacks += packs;
    totalItems += items;
    console.log(`[seed-packs-v2] ${data.category}: ${packs} packs, ${items} items.`);
  }

  console.log(`[seed-packs-v2] Totals: ${totalPacks} packs, ${totalItems} items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
