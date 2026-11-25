import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { IconRail, BottomTabs } from "./IconRail";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import styles from "./AppShell.module.css";

export async function AppShell({ children }: { children: ReactNode }) {
  const t = getT(await getViewer());
  return (
    <div className={styles.shell}>
      {/* Design QA HIGH-3 — skip to main content. Hidden until focused via
          the `skipLink` global class (see src/styles/globals.css). */}
      <a href="#main-content" className="skipLink">
        {t("nav.skipToContent")}
      </a>
      {/* TopNav is async (reads the viewer for lang pills). */}
      <TopNav />
      <div className={styles.body}>
        <IconRail />
        <main id="main-content" className={styles.main}>
          {children}
        </main>
      </div>
      <BottomTabs />
    </div>
  );
}
