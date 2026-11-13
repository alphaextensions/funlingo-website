/**
 * /words/lists — Funlingo-built frequency and theme lists (SPEC §9).
 * Lives next to /words. Shows Pack rows of kind "word_list".
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { PageHeader } from "@/components/PageHeader";
import { TabBar } from "@/components/TabBar";
import { EmptyState } from "@/components/EmptyState";
import libStyles from "@/components/library/Library.module.css";

export const dynamic = "force-dynamic";

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export default async function WordsListsPage() {
  const viewer = await getViewer();
  const lists = await prisma.pack.findMany({
    where: { kind: "word_list", lang: viewer.activeLang },
    orderBy: { createdAt: "desc" },
    take: 40,
  });
  const myCount = viewer.userId
    ? await prisma.userWord.count({ where: { userId: viewer.userId, lang: viewer.activeLang } })
    : 0;

  return (
    <>
      <PageHeader
        eyebrow="Words"
        title="Word lists"
        lede="Hand-picked lists for your learning language — frequency, exam prep, themes. Add any list to your deck in one tap."
      />
      <TabBar
        ariaLabel="Word sections"
        tabs={[
          { href: "/words", label: "My words", count: myCount },
          { href: "/words/lists", label: "Lists" },
        ]}
      />

      {lists.length === 0 ? (
        <EmptyState
          eyebrow="Nothing to study yet"
          title="Lists ship with your learning language"
          body="Frequency lists, CEFR themes and exam prep (IELTS, TOEFL, JLPT, TOPIK, DELE). All free, all written or openly licensed."
          actions={[{ href: "/words" as never, label: "Back to my words", variant: "secondary" }]}
        />
      ) : (
        <section className={libStyles.grid} aria-label="Word lists">
          {lists.map((p) => {
            const meta = p.meta ? safeJson(p.meta) : null;
            const blurb = (meta?.blurb as string | undefined) ?? "";
            const itemCount = meta?.itemCount as number | undefined;
            return (
              <Link
                key={p.id}
                href={{ pathname: `/words/lists/${p.id}` } as never}
                className={libStyles.packCard}
              >
                <div className={libStyles.packChipRow}>
                  {p.level && <span className={libStyles.packChip}>{p.level}</span>}
                  {p.category && <span className={libStyles.packChip}>{p.category}</span>}
                </div>
                <h3 className={libStyles.packTitle}>{p.title}</h3>
                {blurb && <p className={libStyles.packBlurb}>{blurb}</p>}
                <div className={libStyles.packFoot}>
                  <span>{itemCount ? `${itemCount} words` : p.lang.toUpperCase()}</span>
                  <span>Study →</span>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
}
