/**
 * /library/sentence-packs/[packId] — Sentence Pack detail.
 *
 * Design BLOCKER-D3 sibling to show-packs/[packId]. CTA imports 10 of the
 * pack's sentences into the user's Review deck via /api/packs/[packId]/import
 * (an idempotent POST; stubbed to 202 for now — the real import can be a
 * future ticket).
 */

import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { CtaButton } from "@/components/CtaButton";
import { AddPackToReviewButton } from "./AddPackToReviewButton";
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

export default async function SentencePackDetailPage({
  params,
}: {
  params: Promise<{ packId: string }>;
}) {
  const { packId: rawPackId } = await params;
  // Next 15 delivers the dynamic segment percent-encoded, and our pack ids
  // contain colons (e.g. "pack:v2:travel:ja"), so the raw param arrives as
  // "pack%3Av2%3Atravel%3Aja" and never matches the stored id. Decode it,
  // mirroring app/read/[bookId]/page.tsx. (QA 2026-10-25: 72/73 packs 404'd.)
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

  if (!pack || pack.kind !== "sentence") notFound();

  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("library.pdSentenceEyebrow", { category: pack.category ?? "Library" })} title={pack.title} />
        <EmptyState
          eyebrow={t("library.pdSignedOutEyebrow")}
          title={t("library.pdSignInSentenceTitle")}
          body={t("library.pdSignInSentenceBody")}
          actions={[
            { href: "/account" as never, label: t("library.pdSignIn") },
            { href: "/library/sentence-packs" as never, label: t("library.pdBackToPacks"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  const meta = safeJson(pack.meta);
  const blurb = (meta?.blurb as string | undefined) ?? "";
  const firstTen = pack.items.slice(0, 10);
  const totalItems = pack.items.length;

  // Chapters list declared by the pack author (packs-v2) — used to label the
  // chapter dividers in the preview below. Non-chaptered packs leave this
  // empty and we show a flat list.
  const chapters =
    (meta?.chapters as Array<{ id: number; name: string }> | undefined) ?? [];
  const chapterName = new Map<number, string>(
    chapters.map((c) => [c.id, c.name]),
  );

  return (
    <>
      <PageHeader
        eyebrow={t("library.pdSentenceEyebrow", { category: pack.category ?? "Library" })}
        title={pack.title}
        lede={blurb || t("library.pdSentenceLede", { n: totalItems })}
        actions={<AddPackToReviewButton packId={pack.id} />}
      />

      <div className={styles.packChipRow} style={{ margin: "0 0 var(--s-5)" }}>
        {pack.level && (
          <span className={`${styles.packChip} ${levelClass(pack.level)}`}>{pack.level}</span>
        )}
        <span className={styles.packChip}>{pack.lang.toUpperCase()}</span>
        <span className={styles.packChip}>{t("library.packSentencesCount", { n: totalItems })}</span>
      </div>

      {totalItems === 0 ? (
        <EmptyState
          eyebrow={t("library.pdEmptyEyebrow")}
          title={t("library.pdEmptySentenceTitle")}
          body={t("library.pdEmptySentenceBody")}
          actions={[
            { href: "/library/sentence-packs" as never, label: t("library.pdBrowseOther") },
          ]}
          inline
        />
      ) : (
        <section aria-label="Sentences in pack">
          <ol className={styles.grid}>
            {firstTen.map((item, idx) => {
              const prev = idx > 0 ? firstTen[idx - 1]! : null;
              const showDivider =
                chapters.length > 0 &&
                (!prev || prev.chapter !== item.chapter) &&
                chapterName.has(item.chapter);
              return (
                <li key={item.id} className={styles.packCard} style={{ cursor: "default" }}>
                  {showDivider && (
                    <p
                      style={{
                        color: "var(--fl-accent)",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        margin: "0 0 var(--s-2)",
                      }}
                    >
                      {t("library.pdChapterNamed", { n: item.chapter, name: chapterName.get(item.chapter) ?? "" })}
                    </p>
                  )}
                  <div className={styles.packChipRow}>
                    <span className={styles.packChip}>#{idx + 1}</span>
                  </div>
                  <p className={styles.packTitle} style={{ fontSize: 15 }}>
                    {item.text}
                  </p>
                  {item.translation && <p className={styles.packBlurb}>{item.translation}</p>}
                </li>
              );
            })}
          </ol>
          {totalItems > 10 && (
            <p
              style={{
                color: "var(--fl-text-3)",
                fontSize: 13,
                textAlign: "center",
                marginTop: "var(--s-4)",
              }}
            >
              {t("library.pdMoreUnlockSentence", { n: totalItems - 10 })}
            </p>
          )}
          <div style={{ marginTop: "var(--s-6)", display: "flex", justifyContent: "center", gap: 8 }}>
            <CtaButton href="/library/sentence-packs" variant="secondary">
              {t("library.pdBackToSentencePacks")}
            </CtaButton>
          </div>
        </section>
      )}
    </>
  );
}
