"use client";

import * as React from "react";
import {
  Play,
  Check,
  X,
  Lightbulb,
  Info,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

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

/** TL;DR / key-takeaways callout box. Works for any article. */
export function KeyTakeaways({
  items,
  title = "Key takeaways",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <div className="not-prose my-10 rounded-2xl border border-[#C642FC]/20 bg-[#C642FC]/[0.06] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#C642FC]" />
        <h3 className="text-white font-bold text-lg m-0">{title}</h3>
      </div>
      <ul className="list-none p-0 m-0 grid gap-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300">
            <Check className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Highlighted note / tip / warning callout. */
export function Callout({
  variant = "tip",
  title,
  children,
}: {
  variant?: "tip" | "note" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    tip: { icon: Lightbulb, color: "#C642FC", border: "rgba(198,66,252,0.3)", bg: "rgba(198,66,252,0.07)", label: "Tip" },
    note: { icon: Info, color: "#60a5fa", border: "rgba(96,165,250,0.3)", bg: "rgba(96,165,250,0.07)", label: "Note" },
    warning: { icon: AlertTriangle, color: "#fbbf24", border: "rgba(251,191,36,0.3)", bg: "rgba(251,191,36,0.08)", label: "Heads up" },
  }[variant];
  const Icon = styles.icon;
  return (
    <div
      className="not-prose my-8 rounded-xl border p-5 flex gap-4"
      style={{ borderColor: styles.border, background: styles.bg }}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: styles.color }} />
      <div>
        <p className="font-semibold text-white m-0 mb-1">{title ?? styles.label}</p>
        <div className="text-gray-300 text-[0.95rem] leading-relaxed [&_p]:m-0">{children}</div>
      </div>
    </div>
  );
}

/** Side-by-side pros / cons. */
export function ProsCons({
  pros,
  cons,
  proLabel = "Pros",
  conLabel = "Cons",
}: {
  pros: string[];
  cons: string[];
  proLabel?: string;
  conLabel?: string;
}) {
  return (
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] p-5">
        <p className="font-bold text-emerald-300 m-0 mb-3">{proLabel}</p>
        <ul className="list-none p-0 m-0 grid gap-2">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] p-5">
        <p className="font-bold text-rose-300 m-0 mb-3">{conLabel}</p>
        <ul className="list-none p-0 m-0 grid gap-2">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
              <span className="leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Grid of feature/highlight cards with gradient accents. */
export function FeatureGrid({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  return (
    <div className="not-prose my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#C642FC]/40 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C642FC] to-[#7A1CAC] flex items-center justify-center mb-3 shadow-lg shadow-purple-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-white font-semibold mb-1 leading-snug">{it.title}</h4>
          <p className="text-sm text-gray-400 leading-relaxed m-0">{it.desc}</p>
        </div>
      ))}
    </div>
  );
}
