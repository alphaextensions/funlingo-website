"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowRight, Tv } from "lucide-react";
import { TITLES, type Title } from "@/app/data/movies";
import { INSTALL_URL } from "@/lib/site";

/**
 * "Search by movie" module embedded in subtitle-download blog posts.
 *
 * The full table is rendered on the server (so search engines index every
 * movie/platform pairing and there is no layout shift), while the input filters
 * the rows in memory — no network calls, no third-party search library. This
 * keeps the static, edge-cached nature of the blog intact while giving readers
 * an app-like way to answer "where can I watch X, and how do I get subtitles?".
 */
export default function SearchByMovie({
  heading = "Search by movie: where to watch + get subtitles",
}: {
  heading?: string;
}) {
  const [query, setQuery] = React.useState("");

  const rows = React.useMemo<Title[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TITLES;
    return TITLES.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.originalTitle?.toLowerCase().includes(q) ?? false) ||
        t.language.toLowerCase().includes(q) ||
        t.platforms.some((p) => p.toLowerCase().includes(q)) ||
        t.genres.some((g) => g.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <section className="not-prose my-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h3 className="mb-1 text-lg font-bold text-white">{heading}</h3>
      <p className="mb-4 text-sm text-gray-400">
        Find a title, see which platform streams it, then add free dual subtitles in any language with
        Funlingo &mdash; no files to download, no syncing.
      </p>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a movie, show, language, or platform..."
          aria-label="Search movies and shows"
          className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#C642FC]"
        />
      </div>

      <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-[#140a1e] text-gray-400">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Language</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Where to watch</th>
              <th className="px-4 py-3 text-right font-medium">Subtitles</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.slug} className="border-t border-white/5 transition-colors hover:bg-white/[0.03]">
                <td className="px-4 py-3 align-top">
                  <Link
                    href={`/watch/${t.slug}`}
                    className="font-medium text-white transition-colors hover:text-[#C642FC]"
                  >
                    {t.title}
                  </Link>
                  <span className="block text-xs text-gray-500">
                    {t.type === "movie" ? "Movie" : "Series"} &middot; {t.year}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-gray-300">{t.language}</td>
                <td className="hidden px-4 py-3 align-top text-gray-300 sm:table-cell">
                  <span className="flex flex-wrap gap-1.5">
                    {t.platforms.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300"
                      >
                        <Tv className="h-3 w-3 text-[#C642FC]" /> {p}
                      </span>
                    ))}
                  </span>
                </td>
                <td className="px-4 py-3 text-right align-top">
                  <Link
                    href={`/watch/${t.slug}`}
                    className="inline-flex items-center gap-1 whitespace-nowrap text-[#C642FC] hover:underline"
                  >
                    Get <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No matches yet &mdash; Funlingo still works on any title.{" "}
                  <a
                    href={INSTALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C642FC] hover:underline"
                  >
                    Install free
                  </a>{" "}
                  and turn on dual subtitles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Availability varies by region. Funlingo adds dual subtitles wherever the title streams.
      </p>
    </section>
  );
}
