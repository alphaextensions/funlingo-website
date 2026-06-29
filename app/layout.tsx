import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Analytics from "./analytics";
import HtmlLangSetter from "./i18n/HtmlLangSetter";

export const metadata: Metadata = {
  metadataBase: new URL("https://getfunlingo.com"),
  title: {
    default: "Funlingo - Free Dual Subtitles for Language Learning",
    template: "%s | Funlingo",
  },
  description: "Free dual subtitle Chrome extension for Netflix, YouTube, Prime, Disney+ Hotstar, Apple TV, Crunchyroll, Udemy & Coursera. AI-powered bilingual subtitles, vocabulary building, and instant translations.",
  openGraph: {
    siteName: "Funlingo",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "Funlingo",
  },
};

// Runs before paint to apply the saved theme, preventing a flash of the wrong
// theme. Defaults to dark when nothing is stored.
const themeInit = `(function(){try{var t=localStorage.getItem('funlingo-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <Analytics />
        <HtmlLangSetter />
        {children}
        <Toaster />
        {/* Crisp Customer Support Chat Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];window.CRISP_WEBSITE_ID="1aa3f434-80cf-4d5e-b1f4-28cf8936dbea";
              (function(){var d=document;var s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            `,
          }}
        />
      </body>
    </html>
  );
}
