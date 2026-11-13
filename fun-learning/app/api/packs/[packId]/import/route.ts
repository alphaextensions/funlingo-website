/**
 * POST /api/packs/[packId]/import — add sentences from a Sentence Pack into
 * the viewer's Review deck.
 *
 * Idempotent at two layers:
 *   1. `withIdempotency` wraps the whole response (same client key → replay).
 *   2. The sentence insert is self-dedupe: we match `(userId, text, lists
 *      contains "pack:<packId>")` so retrying — or clicking "Add" twice —
 *      won't double-insert the same text. The pack id lives inside `lists`
 *      because the Sentence schema has no first-class `packId` column
 *      (Pass-3 cleanup: no schema change this wave; a composite UNIQUE in
 *      Prisma would be ideal once the Review lane stabilises).
 *
 * Returns 201 with the real count that landed. New sentences surface in
 * Review via the scheduler's "fresh sentences" branch
 * (`src/server/review/scheduler.ts`) — no ReviewCardState pre-seeding needed.
 */

import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";

interface ImportPayload {
  count?: number;
}

async function parse(req: Request): Promise<ImportPayload> {
  try {
    const b = (await req.json()) as ImportPayload;
    return b ?? {};
  } catch {
    return {};
  }
}

function extractPackId(req: Request): string | null {
  try {
    const u = new URL(req.url);
    const parts = u.pathname.split("/");
    // /api/packs/<packId>/import
    const idx = parts.findIndex((p) => p === "packs");
    if (idx === -1 || idx + 1 >= parts.length) return null;
    return parts[idx + 1] ?? null;
  } catch {
    return null;
  }
}

const PACK_LIST_TOKEN = (packId: string) => `pack:${packId}`;

/** Build the comma-joined `lists` string a pack-imported sentence carries. */
function listsFor(packId: string): string {
  return ["favorite", PACK_LIST_TOKEN(packId)].join(",");
}

export const POST = withIdempotency(async (req, { userId }) => {
  const packId = extractPackId(req);
  if (!packId) {
    return Response.json({ error: "BAD_REQUEST", message: "Missing pack id." }, { status: 400 });
  }

  const pack = await prisma.pack.findUnique({
    where: { id: packId },
    select: { id: true, kind: true, title: true, lang: true },
  });

  if (!pack) {
    return Response.json(
      { error: "NOT_FOUND", message: "That pack doesn't exist." },
      { status: 404 },
    );
  }

  if (pack.kind !== "sentence") {
    return Response.json(
      { error: "WRONG_KIND", message: "Only Sentence Packs can be imported into Review." },
      { status: 400 },
    );
  }

  const body = await parse(req);
  const requested = Math.max(1, Math.min(50, Math.floor(body.count ?? 10)));

  // Pull enough pack items to likely satisfy `requested` even after dedupe.
  // 2x headroom is cheap — the pack rarely has more than 100 items anyway.
  const items = await prisma.packItem.findMany({
    where: { packId: pack.id, kind: "sentence" },
    orderBy: [{ chapter: "asc" }, { order: "asc" }],
    take: requested * 2,
    select: { text: true, translation: true },
  });

  if (items.length === 0) {
    return Response.json(
      { ok: true, imported: 0, packId: pack.id, message: "This pack has no sentences yet." },
      { status: 201 },
    );
  }

  // Idempotent self-dedupe: find Sentence rows this user already owns from
  // this pack (any Sentence row whose `lists` contains `pack:<packId>`).
  // SQLite's `contains` lowers to `LIKE %…%`, which is fine here — the
  // list is tiny and the token is unambiguous.
  const existing = await prisma.sentence.findMany({
    where: {
      userId,
      lang: pack.lang,
      lists: { contains: PACK_LIST_TOKEN(pack.id) },
    },
    select: { text: true },
  });
  const alreadyImported = new Set(existing.map((s) => s.text));

  const toCreate = [];
  for (const it of items) {
    if (alreadyImported.has(it.text)) continue;
    toCreate.push({
      userId,
      lang: pack.lang,
      text: it.text,
      translation: it.translation ?? null,
      lists: listsFor(pack.id),
    });
    if (toCreate.length >= requested) break;
  }

  if (toCreate.length === 0) {
    return Response.json(
      {
        ok: true,
        imported: 0,
        packId: pack.id,
        message: "You already have these sentences in Review.",
      },
      { status: 200 },
    );
  }

  // Transaction keeps the import atomic — if any insert fails, the whole
  // batch rolls back and the next retry starts clean.
  await prisma.$transaction(toCreate.map((data) => prisma.sentence.create({ data })));

  return Response.json(
    {
      ok: true,
      imported: toCreate.length,
      packId: pack.id,
      message:
        toCreate.length === 1
          ? "Added 1 sentence to Review."
          : `Added ${toCreate.length} sentences to Review.`,
    },
    { status: 201 },
  );
});
