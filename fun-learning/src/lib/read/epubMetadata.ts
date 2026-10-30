/**
 * EPUB metadata extraction — reads title / author / language / cover from an
 * EPUB file's OPF manifest WITHOUT persisting the book's text anywhere.
 *
 * LEGAL (hard rule): the uploaded EPUB's text must NEVER land in the DB. This
 * helper intentionally does NOT return the content — only the small metadata
 * block that's safe to store. Callers upload the full .epub file to disk under
 * .uploads/<userId>/<bookId>.epub and keep ONLY the file path in Book.contentRef.
 */

import JSZip from "jszip";

export interface EpubMetadata {
  title: string;
  author: string | null;
  language: string | null;
  /** Base64 of the cover image, or null when the EPUB has no cover entry. */
  coverBase64: string | null;
  /** MIME of the cover (image/jpeg, image/png, …), or null. */
  coverMime: string | null;
}

export class EpubParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EpubParseError";
  }
}

/**
 * Extract metadata from an EPUB. Accepts a Node Buffer (server-side upload
 * handling) or an ArrayBuffer (browser `File.arrayBuffer()`), so the same
 * function works in both environments.
 *
 * Deliberately avoids `epubjs` here — epubjs is a *renderer*, not a parser,
 * and dragging it into the server bundle brings DOM dependencies we can't use
 * in Node. The OPF is a single XML file: a minimal regex pass is more than
 * enough for the four fields we need and keeps this importable from tests.
 */
export async function extractEpubMetadata(
  data: ArrayBuffer | Uint8Array,
): Promise<EpubMetadata> {
  const zip = await JSZip.loadAsync(data);

  // 1) Find the OPF path via META-INF/container.xml.
  const containerEntry = zip.file("META-INF/container.xml");
  if (!containerEntry) {
    throw new EpubParseError("Not an EPUB: missing META-INF/container.xml");
  }
  const containerXml = await containerEntry.async("string");
  const opfPathMatch = containerXml.match(/full-path="([^"]+)"/);
  if (!opfPathMatch) {
    throw new EpubParseError("EPUB container.xml is missing a rootfile.");
  }
  const opfPath = opfPathMatch[1];
  const opfEntry = zip.file(opfPath);
  if (!opfEntry) {
    throw new EpubParseError(`EPUB OPF not found at ${opfPath}`);
  }
  const opfXml = await opfEntry.async("string");

  // 2) Pull simple metadata from the <metadata> block.
  const title = pickText(opfXml, "dc:title") ?? "Untitled";
  const author = pickText(opfXml, "dc:creator");
  const language = pickText(opfXml, "dc:language");

  // 3) Cover: either a <meta name="cover" content="…"> pointing at an item id,
  //    or an item with properties="cover-image" (EPUB 3).
  let coverBase64: string | null = null;
  let coverMime: string | null = null;
  const coverIdMatch = opfXml.match(/<meta[^>]+name=["']cover["'][^>]+content=["']([^"']+)["']/i);
  const coverItemByProp = opfXml.match(/<item[^>]+properties=["'][^"']*cover-image[^"']*["'][^>]*\/?>/i);

  let coverHref: string | null = null;
  let coverItemMime: string | null = null;

  if (coverIdMatch) {
    const id = coverIdMatch[1];
    const item = findItemById(opfXml, id);
    if (item) {
      coverHref = extractAttr(item, "href");
      coverItemMime = extractAttr(item, "media-type");
    }
  }
  if (!coverHref && coverItemByProp) {
    coverHref = extractAttr(coverItemByProp[0], "href");
    coverItemMime = extractAttr(coverItemByProp[0], "media-type");
  }

  if (coverHref) {
    const absHref = resolveZipPath(opfPath, coverHref);
    const file = zip.file(absHref);
    if (file) {
      const buf = await file.async("uint8array");
      coverBase64 = uint8ToBase64(buf);
      coverMime = coverItemMime ?? guessImageMime(absHref);
    }
  }

  return { title, author, language, coverBase64, coverMime };
}

function pickText(xml: string, tag: string): string | null {
  const escTag = tag.replace(":", "\\:");
  const m = xml.match(new RegExp(`<${escTag}\\b[^>]*>([\\s\\S]*?)</${escTag}>`, "i"));
  if (!m) return null;
  const inner = m[1].trim();
  if (!inner) return null;
  // Strip simple HTML entities.
  return inner
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function findItemById(opf: string, id: string): string | null {
  const re = new RegExp(`<item[^>]*\\bid=["']${escapeRegex(id)}["'][^>]*\\/?>`, "i");
  const m = opf.match(re);
  return m ? m[0] : null;
}

function extractAttr(tag: string, attr: string): string | null {
  const m = tag.match(new RegExp(`\\b${attr}=["']([^"']+)["']`, "i"));
  return m ? m[1] : null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveZipPath(opfPath: string, href: string): string {
  // Strip URL fragments.
  const clean = href.split("#")[0];
  if (clean.startsWith("/")) return clean.slice(1);
  const opfDir = opfPath.includes("/") ? opfPath.slice(0, opfPath.lastIndexOf("/")) : "";
  if (!opfDir) return clean;
  // Simple ../ normalisation.
  const parts = `${opfDir}/${clean}`.split("/");
  const stack: string[] = [];
  for (const p of parts) {
    if (p === "" || p === ".") continue;
    if (p === "..") stack.pop();
    else stack.push(p);
  }
  return stack.join("/");
}

function guessImageMime(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

function uint8ToBase64(bytes: Uint8Array): string {
  // Chunk to avoid "Maximum call stack size" on large covers.
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  if (typeof btoa === "function") return btoa(binary);
  return Buffer.from(binary, "binary").toString("base64");
}
