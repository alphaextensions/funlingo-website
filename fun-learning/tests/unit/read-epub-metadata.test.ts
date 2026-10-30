import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { extractEpubMetadata, EpubParseError } from "@/lib/read/epubMetadata";
import { prisma } from "@/server/db";

/**
 * EPUB metadata extraction + persistence test.
 *
 * LEGAL rule: when we persist a Book row for an uploaded EPUB, the book's TEXT
 * never lands in the DB. Only metadata (title, author, lang, cover, filesystem
 * ref) is stored. This test builds a tiny real EPUB with a canary line inside
 * one of its chapters, feeds it through the metadata extractor, writes the
 * resulting Book row, and asserts the canary never appears in Prisma.
 */

const CANARY = "CANARY_BOOK_LINE_9201:NEVER_IN_DB";

async function buildTinyEpub(opts: {
  title: string;
  author: string;
  language: string;
  chapterText: string;
}): Promise<Uint8Array> {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.folder("META-INF")!.file(
    "container.xml",
    `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
  );
  const oebps = zip.folder("OEBPS")!;
  oebps.file(
    "content.opf",
    `<?xml version="1.0" encoding="UTF-8"?>
<package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${opts.title}</dc:title>
    <dc:creator>${opts.author}</dc:creator>
    <dc:language>${opts.language}</dc:language>
    <dc:identifier id="BookId">urn:test:1</dc:identifier>
  </metadata>
  <manifest>
    <item id="ch1" href="ch1.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine><itemref idref="ch1"/></spine>
</package>`,
  );
  oebps.file(
    "ch1.xhtml",
    `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Chapter 1</title></head>
<body><p>${opts.chapterText}</p></body>
</html>`,
  );
  return zip.generateAsync({ type: "uint8array" });
}

async function freshUser(): Promise<string> {
  const email = `test+epub-meta-${Date.now()}@funlingo.local`;
  const u = await prisma.user.create({ data: { email, name: "epub-meta" } });
  return u.id;
}

describe("EPUB metadata extraction", () => {
  it("reads title, author and language from a valid EPUB", async () => {
    const bytes = await buildTinyEpub({
      title: "Alice in Testland",
      author: "Dr Test",
      language: "en",
      chapterText: `A sunny morning. ${CANARY} The end.`,
    });
    const meta = await extractEpubMetadata(bytes);
    expect(meta.title).toBe("Alice in Testland");
    expect(meta.author).toBe("Dr Test");
    expect(meta.language).toBe("en");
    expect(meta.coverBase64).toBeNull();
  });

  it("throws EpubParseError on a non-EPUB zip", async () => {
    const zip = new JSZip();
    zip.file("hello.txt", "not an epub");
    const bytes = await zip.generateAsync({ type: "uint8array" });
    await expect(extractEpubMetadata(bytes)).rejects.toBeInstanceOf(EpubParseError);
  });

  it("writing the Book row never persists the book's chapter text (canary)", async () => {
    const bytes = await buildTinyEpub({
      title: "A Canary Study",
      author: "Testy McTestface",
      language: "en",
      chapterText: `This chapter contains the canary ${CANARY} and nothing else.`,
    });
    const meta = await extractEpubMetadata(bytes);
    const userId = await freshUser();
    try {
      const book = await prisma.book.create({
        data: {
          source: "upload",
          ownerUserId: userId,
          title: meta.title,
          author: meta.author,
          lang: meta.language ?? "und",
          licence: "uploaded",
          // Simulating the real upload path shape.
          contentRef: `.uploads/${userId}/pretend.epub`,
          coverUrl: null,
        },
      });

      const rows = await prisma.book.findMany({ where: { ownerUserId: userId } });
      const serialized = JSON.stringify(rows);
      expect(serialized).not.toContain(CANARY);
      // Metadata DID land.
      expect(serialized).toContain("A Canary Study");

      await prisma.book.delete({ where: { id: book.id } });
    } finally {
      try {
        await prisma.user.delete({ where: { id: userId } });
      } catch {
        /* ignore */
      }
    }
  });
});
