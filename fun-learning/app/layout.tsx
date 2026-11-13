import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { fontClasses, fontRootStyle } from "@/styles/fonts";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { AppShell } from "@/components/AppShell";
import { GlobalKeyboard } from "@/components/GlobalKeyboard";
import { getViewer } from "@/server/session";
import { isRtl } from "@/lib/i18n/rtl";
import { chromeLocale, getT } from "@/server/i18n";
import { clientSlice } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { getPrefs } from "@/server/prefs";
import { FeedbackBoot } from "@/components/feedback/FeedbackBoot";

export async function generateMetadata(): Promise<Metadata> {
  const t = getT(await getViewer());
  return { title: t("app.title"), description: t("app.description") };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Dark-first per Funlingo Design System. `--fl-bg` = #0E0816.
  // Light-theme systems get the light surface via `media` entry.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0816" },
    { media: "(prefers-color-scheme: light)", color: "#FBF4FF" },
  ],
};

/* Wave 4 — theme bootstrap. Runs BEFORE the first paint so a viewer
   who picked `light`/`dark` doesn't flash the other scheme. Stored in
   `localStorage.theme` as "light" | "dark"; absent means "follow OS". */
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(_){}})()`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wave 14: the chrome locale is the viewer's NATIVE language
  // (nativeLang → uiLocale → "en"). It drives `<html lang/dir>`, the
  // per-locale font overrides, and every catalog string. The learning
  // language never decides chrome — it used to be a fallback here, which
  // would have flipped a Hindi-native learner's UI into Japanese.
  const viewer = await getViewer();
  const uiLocale = chromeLocale(viewer);
  const slice = clientSlice(uiLocale);
  const baseDir = isRtl(uiLocale) ? "rtl" : "ltr";
  // Wave 15 — apply the viewer's drawer prefs on first paint (the extension's
  // `G()` boot step): motion → body[data-motion], RTL preview → <html dir>.
  // Signed-out viewers get defaults here; FeedbackBoot then applies their
  // localStorage copy on mount.
  const prefs = viewer.userId ? await getPrefs(viewer.userId) : null;
  const feedbackInitial = prefs
    ? {
        sound: prefs.sound,
        haptics: prefs.haptics,
        motion: prefs.motion,
        rtl: prefs.rtl,
        voicePref: prefs.voicePref,
      }
    : null;
  const dir = prefs?.rtl ? "rtl" : baseDir;
  const motionAttr = prefs?.motion === false ? "off" : "on";

  return (
    // suppressHydrationWarning on <html>+<body>: the Funlingo Chrome extension
    // injects CSS vars onto both elements as a content-script side-effect
    // (--funlingo-ui-scale, --funlingo-caption-scale, --flsp-margin, etc.).
    // The pre-paint theme script also mutates <html>.dataset.theme. These
    // extension/script edits are expected and don't affect correctness; the
    // suppress keeps React quiet about them while still validating children.
    <html lang={uiLocale} dir={dir} data-locale={uiLocale} className={fontClasses} suppressHydrationWarning>
      <head>
        {/* Set [data-theme] from localStorage BEFORE the first paint
            so a saved light/dark choice doesn't flash the other scheme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body
        data-funlingo-root=""
        data-view="landing"
        data-motion={motionAttr}
        data-funlingo-locale={uiLocale}
        style={fontRootStyle}
        suppressHydrationWarning
      >
        <I18nProvider locale={uiLocale} nativeLang={viewer.user?.nativeLang ?? null} slice={slice}>
          <AmbientBackdrop />
          <GlobalKeyboard />
          <AppShell>{children}</AppShell>
          <FeedbackBoot
            signedIn={!!viewer.userId}
            initial={feedbackInitial}
            baseDir={baseDir}
          />
        </I18nProvider>
      </body>
    </html>
  );
}
