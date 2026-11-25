/**
 * /library/show-packs — Funlingo-authored study material for shows.
 * SPEC §5.3: never a show's script or subtitles, always original writing.
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { LibraryTabs } from "@/components/library/LibraryTabs";
import { EmptyState } from "@/components/EmptyState";
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
  const key = `level${level.toUpperCase().replace(/\W/g, "")}`;
  const asKey = key as keyof typeof styles;
  return styles[asKey] ?? "";
}

export default async function LibraryShowPacksPage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  const packs = await prisma.pack.findMany({
    where: { kind: "show", lang: viewer.activeLang },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return (
    <>
      <PageHeader
        eyebrow={t("library.eyebrow")}
        title={t("library.showPacksTitle")}
        lede={t("library.showPacksLede")}
      />
      <LibraryTabs />

      {packs.length === 0 ? (
        <EmptyState
          eyebrow={t("library.showPacksEmptyEyebrow")}
          title={t("library.showPacksEmptyTitle")}
          body={t("library.showPacksEmptyBody")}
          actions={[{ href: "/library/sentence-packs" as never, label: t("library.showPacksTrySentence"), variant: "secondary" }]}
        />
      ) : (
        <section className={styles.grid} aria-label={t("library.showPacksAria")}>
          {packs.map((p) => {
            const meta = p.meta ? safeJson(p.meta) : null;
            const blurb = (meta?.blurb as string | undefined) ?? "";
            const platforms = (meta?.platforms as string[] | undefined) ?? [];
            return (
              <Link
                key={p.id}
                href={{ pathname: `/library/show-packs/${p.id}` } as never}
                className={styles.packCard}
              >
                <div className={styles.packChipRow}>
                  {p.level && <span className={`${styles.packChip} ${levelClass(p.level)}`}>{p.level}</span>}
                  {p.category && <span className={styles.packChip}>{p.category}</span>}
                  {platforms.slice(0, 2).map((pl) => (
                    <span key={pl} className={styles.packChip}>{pl}</span>
                  ))}
                </div>
                <h3 className={styles.packTitle}>{p.title}</h3>
                {blurb && <p className={styles.packBlurb}>{blurb}</p>}
                <div className={styles.packFoot}>
                  <span>{p.lang.toUpperCase()}</span>
                  <span>{t("library.showPacksOpen")}</span>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}
