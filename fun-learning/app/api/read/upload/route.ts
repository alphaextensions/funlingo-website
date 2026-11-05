// POST /api/read/upload — upload an EPUB file.
//
// LEGAL (hard rule): we store ONLY metadata in the Book table (title, author,
// language, cover). The EPUB bytes land on the local filesystem under
// .uploads/<userId>/<bookId>.epub — never in the DB, never in cloud storage.
// `src/lib/read/epubMetadata.ts` is used BOTH on the client (to show a
// preview before upload) and here on the server (so the stored metadata
// matches the file bytes, not a client-supplied string).
//
// Idempotency: wrapped. A client that retries the same upload (same body +
// same Idempotency-Key) replays the cached JSON response.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { prisma } from "@/server/db";
import { withIdempotency } from "@/server/middleware/idempotency";
import { extractEpubMetadata } from "@/lib/read/epubMetadata";
import { logger } from "@/server/logging/scrubber";

const MAX_EPUB_BYTES = 25 * 1024 * 1024; // 25MB

export const POST = withIdempotency(async (req, { userId }) => {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return Response.json(
      { error: "UNSUPPORTED_CONTENT_TYPE", message: "Expected multipart/form-data." },
      { status: 415 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch (err) {
    logger.warn({ err: String(err) }, "upload: formData parse failed");
    return Response.json({ error: "BAD_FORM" }, { status: 400 });
  }

  const file = form.get("file");
  const lang = typeof form.get("lang") === "string" ? (form.get("lang") as string) : null;
  if (!(file instanceof File)) {
    return Response.json({ error: "FILE_MISSING" }, { status: 400 });
  }
  if (file.size > MAX_EPUB_BYTES) {
    return Response.json(
      { error: "FILE_TOO_LARGE", limitBytes: MAX_EPUB_BYTES },
      { status: 413 },
    );
  }
  if (!/\.epub$/i.test(file.name)) {
    return Response.json({ error: "ONLY_EPUB" }, { status: 415 });
  }

  // Extract metadata server-side (don't trust client labels for the stored
  // row; the client only uses them for preview).
  const bytes = new Uint8Array(await file.arrayBuffer());
  let meta;
  try {
    meta = await extractEpubMetadata(bytes);
  } catch (err) {
    logger.warn({ err: String(err) }, "upload: EPUB parse failed");
    return Response.json({ error: "INVALID_EPUB" }, { status: 422 });
  }

  // Build cover URL as a tiny data URL (keeps the Book row self-contained;
  // the DB field is bounded by the OPF cover we extracted, which is almost
  // always under a few hundred KB).
  const coverUrl =
    meta.coverBase64 && meta.coverMime
      ? `data:${meta.coverMime};base64,${meta.coverBase64}`
      : null;

  // Create the Book row FIRST so we get a cuid for the file path.
  const book = await prisma.book.create({
    data: {
      source: "upload",
      ownerUserId: userId,
      title: meta.title,
      author: meta.author ?? undefined,
      lang: lang ?? meta.language ?? "und",
      licence: "uploaded",
      coverUrl,
      // contentRef gets its real value after the file is written below.
      contentRef: `pending:${userId}`,
    },
  });

  const dir = join(process.cwd(), ".uploads", userId);
  await mkdir(dir, { recursive: true });
  const filePath = join(dir, `${book.id}.epub`);
  await writeFile(filePath, bytes);

  await prisma.book.update({
    where: { id: book.id },
    data: { contentRef: filePath },
  });

  return Response.json({
    bookId: book.id,
    title: book.title,
    author: book.author,
    lang: book.lang,
    coverUrl,
  });
});
