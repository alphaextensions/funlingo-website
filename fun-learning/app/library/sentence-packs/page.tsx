/**
 * /library/sentence-packs — Funlingo-written sentence decks for
 * dictation and shadowing (SPEC §5.4).
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { LibraryTabs } from "@/components/library/LibraryTabs";
import { EmptyState } from "@/components/EmptyState";
import { CtaButton } from "@/components/CtaButton";
import styles from "@/components/library/Library.module.css";

export const dynamic = "force-dynamic";

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function levelClass(level: string | null): string {
  if (!level) return "";
  const asKey = `level${level.toUpperCase().replace(/\W/g, "")}` as keyof typeof styles;
  return styles[asKey] ?? "";
}

export default async function LibrarySentencePacksPage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  const packs = await prisma.pack.findMany({
    where: { kind: "sentence", lang: viewer.activeLang },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <>
      <PageHeader
        eyebrow={t("library.eyebrow")}
        title={t("library.sentencePacksTitle")}
        lede={t("library.sentencePacksLede")}
        actions={
          <CtaButton href="/sentences" variant="secondary">
            {t("library.sentencePacksNewFromSaved")}
          </CtaButton>
        }
      />
      <LibraryTabs />

      {packs.length === 0 ? (
        <EmptyState
          eyebrow={t("library.sentencePacksEmptyEyebrow")}
          title={t("library.sentencePacksEmptyTitle")}
          body={t("library.sentencePacksEmptyBody")}
          actions={[
            { href: "/sentences" as never, label: t("library.sentencePacksOpenMine") },
            { href: "/library/show-packs" as never, label: t("library.sentencePacksTryShow"), variant: "secondary" },
          ]}
        />
      ) : (
        <section className={styles.grid} aria-label={t("library.sentencePacksAria")}>
          {packs.map((p) => {
            const meta = p.meta ? safeJson(p.meta) : null;
            const blurb = (meta?.blurb as string | undefined) ?? "";
            const itemCount = meta?.itemCount as number | undefined;
            return (
              <Link
                key={p.id}
                href={{ pathname: `/library/sentence-packs/${p.id}` } as never}
                className={styles.packCard}
              >
                <div className={styles.packChipRow}>
                  {p.level && <span className={`${styles.packChip} ${levelClass(p.level)}`}>{p.level}</span>}
                  {p.category && <span className={styles.packChip}>{p.category}</span>}
                </div>
                <h3 className={styles.packTitle}>{p.title}</h3>
                {blurb && <p className={styles.packBlurb}>{blurb}</p>}
                <div className={styles.packFoot}>
                  <span>{itemCount ? t("library.packSentencesCount", { n: itemCount }) : p.lang.toUpperCase()}</span>
                  <span>{t("library.sentencePacksPractise")}</span>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}
