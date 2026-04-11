import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://getfunlingo.com"),
  title: {
    default: "Funlingo - Free Dual Subtitles for Language Learning",
    template: "%s | Funlingo",
  },
  description: "Free dual subtitle Chrome extension for Netflix, YouTube & Prime. AI-powered bilingual subtitles, vocabulary building, and instant translations.",
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
        {/* Freshworks Customer Support Chat Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var s = document.createElement('script');
              s.src = '//in.fw-cdn.com/32727940/1543054.js';
              s.setAttribute('chat', 'true');
              document.body.appendChild(s);
            `,
          }}
        />
      </body>
    </html>
  );
}
