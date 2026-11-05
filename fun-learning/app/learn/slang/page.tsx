/**
 * /learn/slang — Wave 10 Slang Hang (deck layout).
 *
 * Shows the Funlingo-authored slang expressions for the viewer's active
 * learning language as a single-card deck. Prev/Next, tap-to-flip, keyboard
 * shortcuts (←/→ nav, Space/Enter flip). The in-context example on the
 * BACK face intentionally stays in the LEARNING language — mirrors the
 * extension's "example stays in the learning language on purpose" rule.
 *
 * Wave 10 rebuild: replaced the 3-column grid of 24 cards with the
 * extension-parity deck (see docs/design-reference/extension-fun-learning.css
 * line ~705 "FLASHCARD DECK (Tiny Lessons + Slang Hang)").
 */

import { getViewer } from "@/server/session";
import { catalogLocale, getT } from "@/server/i18n";
import { listSlangs } from "@/lib/learn/content";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { SlangDeck } from "./SlangDeck";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
  return { title: getT(await getViewer())("slang.metaTitle") };
}

/** The learning language's name, written in the viewer's chrome language
 *  ("Japanese" for an English native, "जापानी" for a Hindi native). */
function languageName(code: string, inLocale: string): string {
  try {
    return new Intl.DisplayNames([inLocale], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export default async function SlangPage() {
  const viewer = await getViewer();
  const bundle = listSlangs(viewer.activeLang);
  const t = getT(viewer);

  if (!bundle) {
    const langName = languageName(viewer.activeLang, catalogLocale(viewer));
    return (
      <>
        <PageHeader
          eyebrow={t("slang.eyebrow")}
          title={t("deck.slangTitle")}
          lede={t("slang.ledeShort")}
        />
        <EmptyState
          eyebrow={t("slang.emptyEyebrow")}
          title={t("slang.emptyTitle", { lang: langName })}
          body={t("slang.emptyBody")}
          actions={[
            { href: "/learn" as never, label: t("slang.emptyBack"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t("slang.eyebrow")}
        title={t("deck.slangTitle")}
        lede={t("slang.lede")}
      />
      <SlangDeck
        lang={bundle.lang}
        localeLabel={bundle.localeLabel}
        expressions={bundle.expressions}
      />
    </>
  );
}
