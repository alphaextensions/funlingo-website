"use client";

import * as React from "react";
import { Play } from "lucide-react";

/**
 * Reusable, brand-aligned visual building blocks for blog posts.
 * Pure presentational components (dark theme + purple gradient) used to add
 * real graphic content — diagrams, demos, stat callouts — inside articles.
 * They carry `not-prose` so the global prose typography rules leave them alone.
 */

/** A faux video player showing dual subtitles, with one highlighted word. */
export function DualSubtitleDemo({
  targetLang = "Spanish",
  target = "¿Quién eres tú?",
  highlight = "Quién",
  native = "Who are you?",
}: {
  targetLang?: string;
  target?: string;
  highlight?: string;
  native?: string;
}) {
  const parts = target.split(new RegExp(`(${highlight})`));
  return (
    <figure className="not-prose my-10">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20">
        <div className="relative aspect-video bg-[radial-gradient(120%_120%_at_30%_20%,#3b1158_0%,#160a22_55%,#000000_100%)]">
          {/* scene glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-[radial-gradient(circle,rgba(198,66,252,0.25),transparent_70%)] blur-2xl" />
          {/* play button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
          {/* subtitle stack */}
          <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 px-4">
            <div className="px-4 py-2 rounded-lg bg-black/70 backdrop-blur text-white text-lg sm:text-2xl font-semibold text-center">
              {parts.map((p, i) =>
                p.toLowerCase() === highlight.toLowerCase() ? (
                  <span
                    key={i}
                    className="rounded-md bg-[#C642FC]/30 ring-1 ring-[#C642FC]/60 px-1.5 py-0.5 text-white"
                  >
                    {p}
                  </span>
                ) : (
                  <span key={i}>{p}</span>
                )
              )}
            </div>
            <div className="px-4 py-1.5 rounded-lg bg-black/50 text-gray-300 text-base sm:text-lg text-center">
              {native}
            </div>
          </div>
          {/* mock word tooltip */}
          <div className="absolute left-1/2 bottom-[40%] -translate-x-1/2 rounded-xl border border-[#C642FC]/40 bg-[#0a0a0a]/95 px-4 py-2 text-sm shadow-xl shadow-purple-500/20">
            <span className="text-white font-semibold">{highlight}</span>
            <span className="text-gray-400"> · /kjen/ · </span>
            <span className="text-[#C642FC]">who</span>
          </div>
        </div>
      </div>
      <figcaption className="text-center text-sm text-gray-500 mt-3">
        Dual subtitles in {targetLang} + your language — tap any word for an instant definition.
      </figcaption>
    </figure>
  );
}

/** Numbered step flow with gradient chips. */
export function StepFlow({
  steps,
}: {
  steps: { title: string; desc: string }[];
}) {
  return (
    <ol className="not-prose list-none p-0 my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={i}
          className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#C642FC]/40 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-purple-500/20">
            {i + 1}
          </div>
          <h4 className="text-white font-semibold mb-1 leading-snug">{s.title}</h4>
          <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** Big-number stat callouts. */
export function StatGrid({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  const cols =
    stats.length >= 4
      ? "grid-cols-2 sm:grid-cols-4"
      : stats.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-2";
  return (
    <div className={`not-prose my-10 grid gap-4 ${cols}`}>
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#C642FC]/20 bg-[#C642FC]/[0.06] p-5 text-center"
        >
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-[#C642FC] to-[#e9a6ff] bg-clip-text text-transparent">
            {s.value}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
