import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { TabBar } from "@/components/TabBar";

/**
 * Library section tabs. Server component so the labels resolve to the viewer's
 * native language via getT (QA 2026-10-26: the tab labels were hardcoded
 * English). The active-tab highlighting lives in the client <TabBar>; it just
 * receives plain localized strings. "YouTube" stays a brand name.
 */
export async function LibraryTabs() {
  const t = getT(await getViewer());
  return (
    <TabBar
      ariaLabel={t("library.sectionsAria")}
      tabs={[
        { href: "/library", label: "YouTube" },
        { href: "/library/podcasts", label: t("library.podcastsTitle") },
        { href: "/library/show-packs", label: t("library.showPacksTitle") },
        { href: "/library/sentence-packs", label: t("library.sentencePacksTitle") },
      ]}
    />
  );
}
