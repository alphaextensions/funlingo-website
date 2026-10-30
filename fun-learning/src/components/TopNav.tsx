import Link from "next/link";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { LangPills, type LangOption } from "./LangPills";
import styles from "./TopNav.module.css";

// Scaffold-only: the lang-pills render as native <select> like the extension.
// A later lane may fetch the full LearningLanguage catalog from the DB.
// Native/interface languages = exactly the 12 locales with a UI catalog
// (kept identical to flow.ts NATIVE_OPTIONS; test-pinned). mr/gu stay in the
// LEARNING list only — as a native lang they'd fall back to English chrome.
const NATIVE_OPTIONS: LangOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "tr", label: "Türkçe" },
  { value: "ar", label: "العربية" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "zh", label: "中文" },
];

const LEARNING_OPTIONS: LangOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "hi", label: "हिन्दी" },
  { value: "mr", label: "मराठी" },
  { value: "gu", label: "ગુજરાતી" },
  { value: "ar", label: "العربية" },
  { value: "zh", label: "中文" },
  { value: "th", label: "ไทย" },
];

export async function TopNav() {
  const viewer = await getViewer();
  const nativeLang = viewer.nativeLang;
  const learningLang = viewer.activeLang;
  const t = getT(viewer);

  return (
    <nav className={styles.nav}>
      <div className={styles.navIn}>
        <Link href={{ pathname: "/" }} className={styles.navBrand} aria-label={t("nav.brandAriaHome")} data-fx="tap">
          <span className={styles.logoMark} aria-hidden="true">
            {/* Real Funlingo brand mark from the Design System zip (purple
                play-triangle with white F). The authoritative mark lives at
                /public/brand/funlingo-mark.png — do not swap for a generic. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/funlingo-mark.png"
              alt=""
              width="32"
              height="32"
            />
          </span>
          {/* Wide (>=1200px) viewports: show the Funlingo wordmark alongside
              the "Fun Learning" title. Narrower viewports stay with the mark
              + title to save horizontal space. CSS switches which is visible. */}
          <span className={styles.logoWordmark} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/funlingo-wordmark.png"
              alt=""
              height="20"
            />
          </span>
          <span className={styles.navTitle} translate="no">Fun Learning</span>
        </Link>
        <div className={styles.navSpacer} />

        <LangPills
          nativeLang={nativeLang}
          learningLang={learningLang}
          nativeOptions={NATIVE_OPTIONS}
          learningOptions={LEARNING_OPTIONS}
        />

        <Link
          href={{ pathname: "/settings" }}
          className={styles.navGear}
          aria-label={t("nav.settings")}
          data-fx="tap"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
