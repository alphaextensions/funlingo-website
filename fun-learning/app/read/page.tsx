import { CLASSICS, GRADED_READERS, EXTERNAL_GRADED_READERS } from "@/lib/read/catalog";
import { ShelfTabs } from "./ShelfTabs";
import { auth } from "@/server/auth";
import { prisma } from "@/server/db";
import { CtaButton } from "@/components/CtaButton";
import { EmptyState } from "@/components/EmptyState";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import styles from "./page.module.css";

export async function generateMetadata() {
  const t = getT(await getViewer());
  return { title: t("read.metaTitle"), description: t("read.metaDesc") };
}

export default async function ReadIndexPage() {
  const session = await auth();
  const userId = session?.user?.id;
  // Chrome = native lang (resolved via getViewer, same as every other page).
  const viewer = await getViewer();
  const t = getT(viewer);
  // Shelves show books in the language the learner is STUDYING — not every
  // language at once (QA 2026-10-25: a JA learner saw ~10 languages jumbled,
  // their 15 JA books buried under Dostoevsky/Dickens). ShelfTabs renders a
  // localized empty state when a language has no catalog books yet.
  const learnLang = viewer.activeLang;

  let myShelf: {
    bookId: string;
    title: string;
    author: string | null;
    lang: string;
    coverUrl: string | null;
    percent: number;
  }[] = [];
  if (userId) {
    const rows = await prisma.book.findMany({
      where: { ownerUserId: userId, source: "upload" },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { positions: { where: { userId }, select: { percent: true } } },
    });
    myShelf = rows.map((b) => ({
      bookId: b.id,
      title: b.title,
      author: b.author,
      lang: b.lang,
      coverUrl: b.coverUrl,
      percent: b.positions[0]?.percent ?? 0,
    }));
  }

  const classics = CLASSICS.filter((c) => c.lang === learnLang).map((c) => ({
    bookId: c.key,
    title: c.title,
    author: c.author,
    lang: c.lang,
    level: c.level,
    coverUrl: c.coverUrl,
    publisher: c.credits.publisher,
  }));
  const graded = [
    ...GRADED_READERS.filter((g) => g.lang === learnLang).map((g) => ({
      bookId: g.key,
      title: g.title,
      author: g.author,
      lang: g.lang,
      level: g.level,
      coverUrl: null,
      publisher: "Funlingo",
    })),
    ...EXTERNAL_GRADED_READERS.filter((g) => g.lang === learnLang).map((g) => ({
      bookId: g.key,
      title: g.title,
      author: g.author,
      lang: g.lang,
      level: g.level,
      coverUrl: g.coverUrl,
      publisher: g.publisher,
    })),
  ];

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{t("read.eyebrow")}</span>
        <h1 className={styles.title}>{t("read.title")}</h1>
        <p className={styles.lede}>{t("read.lede")}</p>
        <div className={styles.actions}>
          <CtaButton href="/read/upload">{t("read.uploadBtn")}</CtaButton>
        </div>
      </header>

      <ShelfTabs
        myShelf={myShelf}
        classics={classics}
        graded={graded}
        isAuthed={Boolean(userId)}
        signedOutState={
          <EmptyState
            eyebrow={t("read.signedOutShelfEyebrow")}
            title={t("read.signedOutShelfTitle")}
            body={t("read.signedOutShelfBody")}
            actions={[
              { href: "/account" as never, label: t("read.actionSignIn") },
              { href: "/read" as never, label: t("read.actionBrowseClassics"), variant: "secondary" },
            ]}
            inline
          />
        }
      />
    </div>
  );
}
