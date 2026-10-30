/**
 * /welcome — first-run onboarding (Wave 18, extension parity).
 *
 * `/` redirects here once for a new visitor (see `needsWelcome`); Settings
 * links here to run it again. This route always renders the flow, pre-filled
 * with the visitor's current choices.
 */

import { welcomeInitial } from "@/server/onboarding";
import { getViewer } from "@/server/session";
import { chromeLocale, getT } from "@/server/i18n";
import { pageClientSlice, ONBOARDING_KEY_PREFIXES } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { WelcomeFlow } from "./WelcomeFlow";

export const dynamic = "force-dynamic";

// Localized tab title (QA 2026-10-26: was a static English string). Reuses the
// already-translated onboarding dialog label.
export async function generateMetadata() {
  const t = getT(await getViewer());
  return { title: t("onboarding.dialogLabel") };
}

export default async function WelcomePage() {
  const init = await welcomeInitial();
  // Wave 19 — onboarding web-only copy ships only to /welcome.
  const viewer = await getViewer();
  const locale = chromeLocale(viewer);
  return (
    <I18nProvider
      locale={locale}
      nativeLang={viewer.user?.nativeLang ?? viewer.nativeLang ?? null}
      slice={pageClientSlice(locale, ONBOARDING_KEY_PREFIXES)}
    >
      <WelcomeFlow
        signedIn={init.signedIn}
        initialNative={init.native}
        initialLearning={init.learning}
        initialProficiency={init.proficiency}
      />
    </I18nProvider>
  );
}
