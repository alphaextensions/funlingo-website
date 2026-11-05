import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Analytics from "@/app/analytics";
import type { Dir } from "@/app/i18n/config";

// Runs before paint to apply the saved theme, preventing a flash of the wrong
// theme. Defaults to dark when nothing is stored.
// Light is the default from the 2026 redesign. A stored preference still wins,
// so anyone who already chose dark keeps it.
const themeInit = `(function(){try{var t=localStorage.getItem('funlingo-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

/**
 * The <html> document every page shares. Each root layout passes its own
 * language, so the HTML Google receives says the right one: there are two
 * root layouts (English and /[locale]) because the static export can't
 * change <html lang> any other way.
 */
export default function RootShell({ lang, dir = "ltr", children }: { lang: string; dir?: Dir; children: React.ReactNode }) {
  return (
    <html lang={lang} dir={dir} data-theme="light" suppressHydrationWarning>
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
