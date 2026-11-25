/**
 * /words — word bank with tabs "My words" and "Lists" (SPEC §9).
 *
 * The /words/lists subpage shows Funlingo frequency / exam lists.
 * The default tab (this one) shows the user's own saved words.
 *
 * Wave 17 (popup parity): each row now carries the real meaning + up to 3
 * extra senses + CEFR (from the shared WordCardCache), how many times the
 * learner has met the word, and when they last saw it — the extension
 * popup's saved-word card fields. See docs/wave17-popup-parity.md §B.
 */

import { loadWords } from "@/server/words/load";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { PageHeader } from "@/components/PageHeader";
import { TabBar } from "@/components/TabBar";
import { WordsExplorer } from "@/components/words/WordsExplorer";
import { EmptyState } from "@/components/EmptyState";
import { CtaButton } from "@/components/CtaButton";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return { title: getT(await getViewer())("words.metaTitle") };
}

export default async function WordsPage() {
  const viewer = await getViewer();
  // Chrome = native lang; the word rows are scoped to viewer.activeLang.
  const t = getT(viewer);
  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("words.eyebrow")} title={t("words.title")} />
        <EmptyState
          eyebrow={t("words.signedOutEyebrow")}
          title={t("words.signedOutTitle")}
          body={t("words.signedOutBody")}
          actions={[
            { href: "/account" as never, label: t("words.actionSignIn") },
            { href: "/library" as never, label: t("words.actionBrowseLibrary"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  const rows = await loadWords(viewer.userId, viewer.activeLang, viewer.nativeLang);

  return (
    <>
      <PageHeader
        eyebrow={t("words.eyebrow")}
        title={t("words.title")}
        lede={t("words.lede")}
        actions={<CtaButton href="/review">{t("words.startReview")}</CtaButton>}
      />
      <TabBar
        ariaLabel={t("words.ariaTabs")}
        tabs={[
          { href: "/words", label: t("words.tabMy"), count: rows.length },
          { href: "/words/lists", label: t("words.tabLists") },
        ]}
      />
      <WordsExplorer rows={rows} lang={viewer.activeLang} />
    </>
  );
}
