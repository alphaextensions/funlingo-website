import type { Metadata } from "next";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import SearchByMovie from "@/app/blog/_components/SearchByMovie";
import { TITLES } from "@/app/data/movies";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch Movies & Shows with Free Dual Subtitles",
  description:
    "Pick a movie or series, see where it streams, and add free dual subtitles in any language with Funlingo — no downloads, no SRT files. Great for learning Spanish, Korean, Japanese, French and more.",
  keywords:
    "watch with dual subtitles, dual subtitles movies, language learning shows, subtitles for movies, learn language watching tv",
  alternates: { canonical: "/watch" },
  openGraph: {
    title: "Watch Movies & Shows with Free Dual Subtitles",
    description:
      "Pick a movie or series, see where it streams, and add free dual subtitles in any language with Funlingo.",
    type: "website",
    url: "/watch",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Watch with dual subtitles",
  itemListElement: TITLES.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `${SITE_URL}/watch/${t.slug}`,
  })),
};

export default function WatchIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar currentPage="/watch" />

        <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b1158]/50 via-black to-black z-0 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center">
            <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Watch anything with dual subtitles
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find a movie or show, see which platform streams it, then add free dual subtitles in any
              language with Funlingo &mdash; no files to download and no syncing.
            </p>
          </div>
        </section>

        <main className="w-full max-w-4xl mx-auto px-6 pb-24">
          <SearchByMovie heading="Find a movie or show" />
        </main>

        <FooterSection />
      </div>
    </>
  );
}
