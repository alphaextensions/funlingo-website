"use client";

import * as React from "react";
import Link from "next/link";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Tv, Languages, Film, Clapperboard, Check } from "lucide-react";
import { PLATFORM_GUIDE, getRelatedTitles, type Title } from "@/app/data/movies";
import { INSTALL_URL } from "@/lib/site";

/**
 * Programmatic "Watch [title] with dual subtitles" page. Fully static (built at
 * export time from the movie catalogue). Every visible section maps to the
 * structured data emitted by the sibling page.tsx, so the rich results Google
 * sees match what the reader sees.
 */
export default function WatchContent({
  title,
  faqs,
}: {
  title: Title;
  faqs: { q: string; a: string }[];
}) {
  const related = getRelatedTitles(title.slug, 4);
  const typeLabel = title.type === "movie" ? "Movie" : "Series";

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/watch" />

      {/* Hero */}
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b1158]/50 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
            {title.language} {typeLabel}
          </Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Watch {title.title} with Dual Subtitles
          </h1>
          {title.originalTitle && (
            <p className="text-gray-400 text-lg -mt-2">
              Original title: <span className="text-gray-300">{title.originalTitle}</span>
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1.5"><Languages className="w-4 h-4 text-[#C642FC]" /> {title.language}</div>
            <div className="flex items-center gap-1.5"><Film className="w-4 h-4 text-[#C642FC]" /> {typeLabel} &middot; {title.year}</div>
            <div className="flex items-center gap-1.5"><Tv className="w-4 h-4 text-[#C642FC]" /> {title.platforms.join(", ")}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
            <a href={INSTALL_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="w-full sm:w-auto bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
                Add dual subtitles free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        {/* Intro / synopsis */}
        <p className="text-xl leading-relaxed text-gray-200 mb-6">
          Here is where to stream {title.title} and how to add free dual {title.language} subtitles
          with Funlingo &mdash; no SRT files, no downloads, no syncing.
        </p>
        <p className="text-gray-300 mb-10">{title.synopsis}</p>

        <hr className="border-white/10 my-10" />

        {/* Where to watch */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Where to watch {title.title}</h2>
        <p className="text-gray-300 mb-5">
          {title.title} is commonly available to stream on the {title.platforms.length > 1 ? "platforms" : "platform"} below.
          Availability changes over time and differs by country, so open whichever service you have in your region.
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          {title.platforms.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white"
            >
              <Tv className="w-4 h-4 text-[#C642FC]" /> {p}
            </span>
          ))}
        </div>

        {/* How to enable dual subtitles, per platform */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          How to turn on dual subtitles for {title.title}
        </h2>
        <div className="grid gap-5 mb-12">
          {title.platforms.map((p) => (
            <div key={p} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clapperboard className="w-5 h-5 text-[#C642FC]" />
                <h3 className="text-lg font-semibold text-white m-0">On {p}</h3>
              </div>
              <ol className="list-none p-0 m-0 grid gap-3">
                {PLATFORM_GUIDE[p].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Why Funlingo */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Why learners watch {title.title} with Funlingo
        </h2>
        <ul className="list-none p-0 m-0 grid gap-3 mb-12">
          {[
            `See two languages at once — the original ${title.language} plus your own.`,
            "Click any word for an instant, context-aware translation.",
            "Hear native pronunciation and save new words to your vocabulary list.",
            "No files to download, nothing to sync, and completely free.",
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <Check className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mb-12 text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
          <p className="text-lg text-gray-200 mb-2 font-semibold">
            Ready to watch {title.title} in {title.language}?
          </p>
          <p className="text-gray-400 mb-6">
            Install Funlingo, open {title.title} on {title.platforms[0]}, and turn on dual subtitles. It
            takes about 30 seconds and costs nothing.
          </p>
          <a href={INSTALL_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
            <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
              Install Funlingo free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* FAQ — mirrors the FAQPage structured data in page.tsx */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently asked questions</h2>
        <div className="grid gap-4 mb-12">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{f.q}</h3>
              <p className="text-gray-300 m-0">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Related titles */}
        {related.length > 0 && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Keep watching &amp; learning</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/watch/${r.slug}`} className="no-underline group">
                  <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#C642FC]/50 hover:-translate-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#C642FC] mb-2">
                      <Languages className="w-3.5 h-3.5" /> {r.language}
                    </span>
                    <h3 className="text-white font-semibold leading-snug group-hover:text-[#C642FC] transition-colors mb-1">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{r.synopsis}</p>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
