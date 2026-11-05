/**
 * /settings — Account, Languages, Appearance, Shortcuts, Delete my data.
 *
 * The form is a client component that posts PATCH-style updates through
 * `/api/settings` (idempotent).
 */

import { getViewer } from "@/server/session";
import { getT, chromeLocale } from "@/server/i18n";
import { getPrefs } from "@/server/prefs";
import { pageClientSlice, SETTINGS_KEY_PREFIXES } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { FeedbackSettings } from "@/components/settings/FeedbackSettings";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import styles from "@/components/settings/Settings.module.css";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const viewer = await getViewer();
  const t = getT(viewer);
  // Wave 19 — /settings carries its own slice (global + settings.*/feedback.*)
  // so the long settings copy never ships to other pages.
  const locale = chromeLocale(viewer);
  const slice = pageClientSlice(locale, SETTINGS_KEY_PREFIXES);
  const nativeLang = viewer.user?.nativeLang ?? viewer.nativeLang ?? null;
  if (!viewer.userId || !viewer.user) {
    return (
      <I18nProvider locale={locale} nativeLang={nativeLang} slice={slice}>
        <PageHeader eyebrow={t("settings.eyebrow")} title={t("settings.title")} />
        <EmptyState
          eyebrow={t("settings.signedOutEyebrow")}
          title={t("settings.signedOutTitle")}
          body={t("settings.signedOutBody")}
          actions={[
            { href: "/account" as never, label: t("settings.signIn") },
            // Wave 18 — reopen the first-run onboarding (works signed-out too).
            { href: "/welcome" as never, label: t("settings.runWelcome"), variant: "secondary" },
          ]}
        />
        {/* Wave 15 — the extension's drawer prefs work signed-out too
            (stored in localStorage on this device). Theme is per-device too, so
            the toggle lives here as well, not only in the signed-in form. */}
        <div className={styles.signedOutPrefs}>
          <section className={styles.group} aria-labelledby="g-appearance">
            <h3 id="g-appearance" className={styles.groupTitle}>{t("settings.appearance")}</h3>
            <p className={styles.groupLede}>{t("settings.appearanceLede")}</p>
            <div className={styles.field}>
              <span className={styles.fLabel}>{t("settings.theme")}</span>
              <ThemeToggle />
              <span className={styles.fHint}>{t("settings.themeHint")}</span>
            </div>
          </section>
          <FeedbackSettings learningLang={viewer.activeLang} signedIn={false} />
        </div>
      </I18nProvider>
    );
  }
  const u = viewer.user;
  const prefs = await getPrefs(viewer.userId);

  return (
    <I18nProvider locale={locale} nativeLang={nativeLang} slice={slice}>
      <PageHeader
        eyebrow={t("settings.eyebrow")}
        title={t("settings.title")}
        lede={t("settings.lede")}
      />
      <div className={styles.layout}>
        <nav className={styles.sideNav} aria-label={t("settings.sectionsAria")}>
          <a href="#g-account" className={styles.sideLink}>{t("settings.navAccount")}</a>
          <a href="#g-langs" className={styles.sideLink}>{t("settings.navLanguages")}</a>
          <a href="#g-goal" className={styles.sideLink}>{t("settings.navGoal")}</a>
          <a href="#g-appearance" className={styles.sideLink}>{t("settings.navAppearance")}</a>
          <a href="#g-feedback" className={styles.sideLink}>{t("settings.navFeedback")}</a>
          <a href="#g-voice" className={styles.sideLink}>{t("settings.navVoice")}</a>
          <a href="#g-experimental" className={styles.sideLink}>{t("settings.navExperimental")}</a>
          <a href="#g-shortcuts" className={styles.sideLink}>{t("settings.navShortcuts")}</a>
          <a href="#g-data" className={styles.sideLink}>{t("settings.navData")}</a>
        </nav>
        <div>
          <SettingsForm
            initial={{
              name: u.name,
              email: u.email,
              nativeLang: u.nativeLang ?? "en",
              activeLearningLang: u.activeLearningLang ?? "en",
              uiLocale: u.uiLocale ?? "en",
              localPronunciation: prefs.localPronunciation ?? false,
              voicePrefs: prefs.voicePrefs ?? {},
              dailyGoalType: (u.dailyGoalType as "minutes" | "reviews") ?? "reviews",
              dailyGoalValue: u.dailyGoalValue ?? 20,
            }}
          />
        </div>
      </div>
    </I18nProvider>
  );
}
