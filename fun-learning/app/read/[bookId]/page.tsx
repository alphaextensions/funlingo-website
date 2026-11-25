import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/server/db";
import { auth } from "@/server/auth";
import { findClassic, findGradedReader, findExternalGraded } from "@/lib/read/catalog";
import { EpubReader } from "./EpubReader";
import { GradedReader } from "./GradedReader";
import styles from "./reader.module.css";

export default async function BookReaderPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId: rawBookId } = await params;
  const bookId = decodeURIComponent(rawBookId);

  // Graded reader (hard-coded, text bundled in-repo).
  const graded = findGradedReader(bookId);
  if (graded) {
    return (
      <ReaderShell
        title={graded.title}
        author={graded.author}
        licence={graded.licence}
        source="graded"
      >
        <GradedReader bookId={graded.key} reader={graded} />
      </ReaderShell>
    );
  }

  // External graded reader — we only host metadata. Direct learners to the
  // publisher's own reader page (CC-BY attribution satisfied in the
  // "Open at publisher" link and the credits aside).
  const external = findExternalGraded(bookId);
  if (external) {
    return (
      <ReaderShell
        title={external.title}
        author={external.author}
        licence={external.licence}
        source="graded"
        publisher={external.publisher}
        publisherUrl={external.publisherUrl}
      >
        <div className={styles.externalReader}>
          <p className={styles.externalLede}>{external.summary}</p>
          <a
            className={styles.externalCta}
            href={external.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open at {external.publisher}
          </a>
          <p className={styles.externalFoot}>
            This book lives on the publisher's own reader — we only store the
            metadata. The link opens in a new tab.
          </p>
        </div>
      </ReaderShell>
    );
  }

  // Classic — streams from publisher URL in the client.
  const classic = findClassic(bookId);
  if (classic) {
    return (
      <ReaderShell
        title={classic.title}
        author={classic.author}
        licence={classic.licence}
        source="classics"
        publisher={classic.credits.publisher}
        publisherUrl={classic.credits.publisherUrl}
      >
        <EpubReader
          bookId={classic.key}
          epubUrl={classic.streamUrl}
          lang={classic.lang}
        />
      </ReaderShell>
    );
  }

  // User upload — serve from our file endpoint. Requires auth.
  const session = await auth();
  const userId = session?.user?.id;
  const upload = await prisma.book.findUnique({ where: { id: bookId } });
  if (!upload || upload.source !== "upload") notFound();
  if (upload.ownerUserId !== userId) notFound();

  return (
    <ReaderShell
      title={upload.title}
      author={upload.author ?? "Unknown"}
      licence={upload.licence ?? "uploaded"}
      source="upload"
    >
      <EpubReader
        bookId={upload.id}
        epubUrl={`/api/read/books/${upload.id}/file`}
        lang={upload.lang}
      />
    </ReaderShell>
  );
}

function ReaderShell({
  title,
  author,
  licence,
  source,
  publisher,
  publisherUrl,
  children,
}: {
  title: string;
  author: string;
  licence: string;
  source: string;
  publisher?: string;
  publisherUrl?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/read">Read</Link>
        <span aria-hidden="true"> › </span>
        <span className={styles.breadCurrent}>{title}</span>
      </nav>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.author}>{author}</p>
        </div>
        <aside className={styles.credits}>
          <dl>
            <dt>Source</dt>
            <dd>{source}</dd>
            <dt>Licence</dt>
            <dd>{licence}</dd>
            {publisher ? (
              <>
                <dt>Publisher</dt>
                <dd>
                  {publisherUrl ? (
                    <a href={publisherUrl} target="_blank" rel="noopener noreferrer">
                      {publisher}
                    </a>
                  ) : (
                    publisher
                  )}
                </dd>
              </>
            ) : null}
          </dl>
        </aside>
      </header>
      {children}
    </div>
  );
}
