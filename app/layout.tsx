import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
