/**
 * /library/show-packs/[packId] — Show Pack detail.
 *
 * Design BLOCKER-D3: the pack-grid tiles in `/library/show-packs` link to
 * `/library/show-packs/${p.id}`, but no page existed. This stub reads the pack
 * by id and shows the first 10 items plus a CTA that routes to the first
 * item's source if there is one, else "Add to Review".
 */

import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { CtaButton } from "@/components/CtaButton";
import styles from "@/components/library/Library.module.css";

export const dynamic = "force-dynamic";

function safeJson(raw: string | null | undefined): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function levelClass(level: string | null): string {
  if (!level) return "";
  const key = `level${level.toUpperCase().replace(/\W/g, "")}` as keyof typeof styles;
  return styles[key] ?? "";
}

export default async function ShowPackDetailPage({
  params,
}: {
  params: Promise<{ packId: string }>;
}) {
  const { packId: rawPackId } = await params;
  // Decode the percent-encoded dynamic segment — pack ids contain colons.
  // Same latent bug as sentence-packs; harmless today only because the one
  // seeded show pack has a colon-free id. Mirror app/read/[bookId]/page.tsx.
  const packId = decodeURIComponent(rawPackId);
  const viewer = await getViewer();
  const t = getT(viewer);

  const pack = await prisma.pack.findUnique({
    where: { id: packId },
    include: {
      items: {
        orderBy: [{ chapter: "asc" }, { order: "asc" }],
      },
    },
  });

  if (!pack || pack.kind !== "show") notFound();

  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("library.pdShowEyebrow", { category: pack.category ?? "Library" })} title={pack.title} />
        <EmptyState
          eyebrow={t("library.pdSignedOutEyebrow")}
          title={t("library.pdSignInShowTitle")}
          body={t("library.pdSignInShowBody")}
          actions={[
            { href: "/account" as never, label: t("library.pdSignIn") },
            { href: "/library/show-packs" as never, label: t("library.pdBackToPacks"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  const meta = safeJson(pack.meta);
  const blurb = (meta?.blurb as string | undefined) ?? "";
  const platforms = (meta?.platforms as string[] | undefined) ?? [];
  const firstTen = pack.items.slice(0, 10);
  const totalItems = pack.items.length;

  // Primary CTA: route to first scene if the pack carries a Source reference,
  // otherwise fall back to adding the pack to Review.
  const firstSourceId =
    (meta?.firstSourceId as string | undefined) ??
    (firstTen[0] && (safeJson(pack.meta)?.firstSourceId as string | undefined)) ??
    null;

  return (
    <>
      <PageHeader
        eyebrow={t("library.pdShowEyebrow", { category: pack.category ?? "Library" })}
        title={pack.title}
        lede={blurb || t("library.pdShowLede", { n: totalItems })}
        actions={
          firstSourceId ? (
            <CtaButton href={`/watch/${encodeURIComponent(firstSourceId)}` as never}>
              {t("library.pdStudyFirstScene")}
            </CtaButton>
          ) : (
            <CtaButton href="/review">{t("library.pdAddToReview")}</CtaButton>
          )
        }
      />

      <div className={styles.packChipRow} style={{ margin: "0 0 var(--s-5)" }}>
        {pack.level && (
          <span className={`${styles.packChip} ${levelClass(pack.level)}`}>{pack.level}</span>
        )}
        <span className={styles.packChip}>{pack.lang.toUpperCase()}</span>
        {platforms.map((p) => (
          <span key={p} className={styles.packChip}>
            {p}
          </span>
        ))}
      </div>

      {totalItems === 0 ? (
        <EmptyState
          eyebrow={t("library.pdEmptyEyebrow")}
          title={t("library.pdEmptyShowTitle")}
          body={t("library.pdEmptyShowBody")}
          actions={[
            { href: "/library/show-packs" as never, label: t("library.pdBrowseOther") },
          ]}
          inline
        />
      ) : (
        <section aria-label="Pack items" className={styles.grid}>
          {firstTen.map((item) => (
            <article key={item.id} className={styles.packCard} style={{ cursor: "default" }}>
              <div className={styles.packChipRow}>
                <span className={styles.packChip}>{item.kind}</span>
                <span className={styles.packChip}>{t("library.pdChapter", { n: item.chapter + 1 })}</span>
              </div>
              <h3 className={styles.packTitle}>{item.text}</h3>
              {item.translation && <p className={styles.packBlurb}>{item.translation}</p>}
            </article>
          ))}
          {totalItems > 10 && (
            <article className={styles.packCard} style={{ cursor: "default" }}>
              <h3 className={styles.packTitle}>{t("library.pdMoreCount", { n: totalItems - 10 })}</h3>
              <p className={styles.packBlurb}>
                {t("library.pdMoreUnlockShow")}
              </p>
            </article>
          )}
        </section>
      )}
    </>
  );
}
