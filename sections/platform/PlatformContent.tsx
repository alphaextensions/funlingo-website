"use client";

import * as React from "react";
import Link from "next/link";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import FunlingoPlayer from "@/sections/home/FunlingoPlayer";
import GuessGame from "@/sections/home/GuessGame";
import { PlatformLogo } from "@/sections/home/platformLogos";
import { orderedReviews } from "@/sections/home/reviews";
import { ChromeCTA } from "@/app/_components/cta";
import { useT } from "@/app/i18n/I18nProvider";
import {
  PLATFORM_PAGES,
  PLATFORM_LABELS as L,
  LANG_NAMES,
  platformBySlug,
  platformPath,
  fillName,
} from "./platforms";

export type Guide = { slug: string; title: string; category: string; read?: string };

const eyebrow: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--pink)",
  marginBottom: 14,
};
const h2: React.CSSProperties = {
  fontSize: "clamp(30px,3.6vw,44px)",
  fontWeight: 800,
  margin: 0,
  color: "var(--text)",
  letterSpacing: "-.02em",
  lineHeight: 1.1,
  textWrap: "balance",
};
const card: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 22,
};
const wrap = "max-w-[1120px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-24";

// Learning languages the hero player has content for.
const PLAYER_LANGS = ["en", "es", "fr", "it", "de", "ko", "ja", "zh"];

function StepIcon({ i }: { i: number }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return <svg {...common}><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></svg>;
  if (i === 1) return <svg {...common}><rect x={3} y={4} width={18} height={13} rx={3} /><path d="M10 8.5v5l4-2.5z" fill="currentColor" /><path d="M8 21h8" /></svg>;
  return <svg {...common}><path d="M4 7h10M4 11h6" /><path d="M13 13l7 3-3 1.2-1.2 3z" fill="currentColor" /></svg>;
}

export default function PlatformContent({ slug, guides }: { slug: string; guides: Guide[] }) {
  const { t, locale } = useT();
  const p = platformBySlug(slug);
  const name = p.name;
  const fill = (s: string) => fillName(s, name);

  const showLangs = Object.keys(p.shows);
  const [learn, setLearn] = React.useState(p.lang);
  const [showLang, setShowLang] = React.useState(p.shows[p.lang] ? p.lang : showLangs[0]);
  const [faqOpen, setFaqOpen] = React.useState(0);

  // The platform's own language first, then the languages it has shows in.
  const pillLangs = Array.from(new Set([p.lang, ...showLangs, "en", "es", "fr", "ja", "ko"]))
    .filter((c) => PLAYER_LANGS.includes(c))
    .slice(0, 6);

  // Reviews that mention the platform first, then the visitor's language.
  const all = orderedReviews(locale);
  const mentions = all.filter((r) => p.kw.some((k) => r.quote.toLowerCase().includes(k)));
  const reviews = [...mentions, ...all.filter((r) => !mentions.includes(r))].slice(0, 3);

  const others = PLATFORM_PAGES.filter((x) => x.slug !== p.slug);

  const pill = (on: boolean): React.CSSProperties => ({
    border: on ? "1px solid transparent" : "1px solid var(--border)",
    background: on ? "var(--grad)" : "var(--surface)",
    color: on ? "#fff" : "var(--text)",
    borderRadius: 999,
    padding: "9px 16px",
    minHeight: 40,
    fontFamily: "'Poppins',sans-serif",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  });

  return (
    <div className="fnl-root overflow-x-hidden">
      <Navbar currentPage={platformPath(p.slug)} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ top: -160, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,77,176,.22), transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ top: 160, left: -160, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(179,36,217,.18), transparent 65%)" }} />
        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 sm:px-[34px] grid grid-cols-1 min-[860px]:grid-cols-[1fr_1.05fr] gap-9 min-[860px]:gap-14 items-center pt-10 min-[860px]:pt-16 pb-14 min-[860px]:pb-20">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dim2)", marginBottom: 18 }}>
              <Link href="/" className="inline-flex items-center min-h-[44px] min-[701px]:min-h-0" style={{ color: "var(--text-dim)", textDecoration: "none" }}>{t("nav.home")}</Link>
              <span aria-hidden="true">/</span>
              <span>{name}</span>
            </nav>
            <div className="inline-flex items-center gap-[10px]" style={{ padding: "6px 14px 6px 6px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--border)", marginBottom: 22 }}>
              <PlatformLogo name={name} />
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>{fill(L.forX)}</span>
            </div>
            <h1 className="text-[40px] min-[701px]:text-[clamp(42px,5vw,66px)]" style={{ lineHeight: 1.03, fontWeight: 800, margin: 0, letterSpacing: "-.02em", color: "var(--text)", textWrap: "balance" }}>
              {p.h1a}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{p.h1b}</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text-dim)", margin: "20px 0 0", maxWidth: 500, fontWeight: 500, textWrap: "pretty" }}>{p.sub}</p>
            <div className="flex flex-wrap items-center gap-[14px]" style={{ marginTop: 28 }}>
              <ChromeCTA label={t("cta.long")} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dim)" }}>{L.freeLine}</span>
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 10 }}>{t("home.learnLabel")}</div>
              <div className="flex flex-wrap gap-2">
                {pillLangs.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={c === learn}
                    onClick={() => {
                      setLearn(c);
                      if (p.shows[c]) setShowLang(c);
                    }}
                    style={pill(c === learn)}
                  >
                    {LANG_NAMES[c] ?? c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <FunlingoPlayer lang={learn} chip={p.chip} chipDot={p.dot} />
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[820px] mx-auto px-5 sm:px-[34px] text-center" style={{ paddingTop: 8, paddingBottom: 72 }}>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, fontWeight: 500, textWrap: "pretty" }}>{p.intro}</p>
        </div>
      </section>

      {/* ============ STEPS ============ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className={wrap}>
          <div className="text-center mx-auto" style={{ maxWidth: 640, marginBottom: 48 }}>
            <div style={eyebrow}>{L.setupEye}</div>
            <h2 style={{ ...h2, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08 }}>{fill(L.setupH)}</h2>
          </div>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-5 min-[860px]:gap-[22px]">
            {p.steps.map(([title, body], i) => (
              <div key={title} className="fnl-step" style={{ ...card, position: "relative", borderRadius: 24, padding: "32px 28px" }}>
                <span style={{ position: "absolute", top: 28, right: 28, fontSize: 13, fontWeight: 800, letterSpacing: ".06em", color: "var(--text-dim2)" }}>{`0${i + 1}`}</span>
                <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 16, background: "var(--grad)", color: "#fff", marginBottom: 20, boxShadow: "0 14px 28px -14px rgba(200,31,212,.8)" }}>
                  <StepIcon i={i} />
                </div>
                <h3 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 8px", color: "var(--text)" }}>{title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className={wrap}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <div style={eyebrow}>{L.featEye}</div>
            <h2 style={{ ...h2, fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.08 }}>{fill(L.featH)}</h2>
          </div>
          <div className="grid grid-cols-1 min-[701px]:grid-cols-2 gap-[18px]">
            {p.features.map(([title, body]) => (
              <div key={title} className="flex items-start gap-[18px]" style={{ ...card, padding: 26 }}>
                <span className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 13, background: "var(--pink-soft)", color: "var(--pink)" }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 6px", color: "var(--text)" }}>{title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SHOWS BY LANGUAGE ============ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-5" style={{ marginBottom: 32 }}>
            <div style={{ maxWidth: 620 }}>
              <div style={eyebrow}>{L.showsEye}</div>
              <h2 style={h2}>{p.showsH}</h2>
            </div>
            <div role="tablist" className="flex flex-wrap gap-[6px]" style={{ padding: 5, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--border)" }}>
              {showLangs.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={c === showLang}
                  onClick={() => setShowLang(c)}
                  style={{ border: "none", borderRadius: 999, padding: "9px 15px", minHeight: 40, fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", background: c === showLang ? "var(--grad)" : "transparent", color: c === showLang ? "#fff" : "var(--text-dim)" }}
                >
                  {LANG_NAMES[c] ?? c}
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-[18px]">
            {(p.shows[showLang] || []).map((s) => (
              <div key={s.title} className="flex flex-col gap-[10px]" style={{ ...card, padding: 24 }}>
                <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: 999, background: "var(--pink-soft)", color: "var(--pink)", fontSize: 12, fontWeight: 800 }}>{s.level}</span>
                <h3 style={{ fontSize: 19, fontWeight: 800, margin: 0, color: "var(--text)", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{s.note}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-dim2)", margin: "18px 0 0", fontWeight: 500 }}>{L.catalogNote}</p>
        </div>
      </section>

      {/* ============ PLATFORM TIP ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className={wrap}>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-[.85fr_1.15fr] gap-8 min-[860px]:gap-12 items-start">
            <div>
              <div style={eyebrow}>{p.special.eyebrow}</div>
              <h2 style={h2}>{p.special.h}</h2>
            </div>
            <div className="flex flex-col gap-[14px]">
              {p.special.items.map(([title, body], i) => (
                <div key={title} className="flex gap-4" style={{ ...card, borderRadius: 20, padding: "22px 24px" }}>
                  <span className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, borderRadius: 10, background: "var(--grad)", color: "#fff", fontSize: 14, fontWeight: 900 }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-dim)", fontWeight: 500 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ GAME ============ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className={wrap}>
          <div className="text-center mx-auto" style={{ maxWidth: 620, marginBottom: 36 }}>
            <div style={eyebrow}>{L.gameEye}</div>
            <h2 style={h2}>{L.gameH}</h2>
          </div>
          <div className="mx-auto" style={{ maxWidth: 780 }}>
            <GuessGame lang={learn} />
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className={wrap}>
          <div className="text-center mx-auto" style={{ maxWidth: 620, marginBottom: 40 }}>
            <div style={eyebrow}>{L.revEye}</div>
            <h2 style={h2}>{L.revH}</h2>
          </div>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-[18px]">
            {reviews.map((r) => (
              <figure key={r.name} className="fnl-step flex flex-col gap-4" style={{ ...card, margin: 0, padding: "26px 26px 22px" }}>
                <div aria-label={`${r.stars ?? 5} out of 5 stars`} style={{ color: "#F5A623", fontSize: 16, letterSpacing: 2 }}>
                  {"★".repeat(r.stars ?? 5)}{"☆".repeat(5 - (r.stars ?? 5))}
                </div>
                <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--text)", fontWeight: 500 }}>{r.quote}</blockquote>
                <figcaption className="flex items-center gap-[10px] mt-auto">
                  <span className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--grad)", color: "#fff", fontSize: 13, fontWeight: 800 }}>{r.initials}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{r.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ background: "var(--bg2)" }}>
        <div className={wrap}>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-[.8fr_1.2fr] gap-8 min-[860px]:gap-12 items-start">
            <div>
              <div style={eyebrow}>FAQ</div>
              <h2 style={h2}>{fill(L.faqH)}</h2>
            </div>
            <div className="flex flex-col gap-[10px]">
              {p.faqs.map(([q, a], i) => {
                const open = faqOpen === i;
                return (
                  <div key={q} style={{ ...card, borderRadius: 18, overflow: "hidden" }}>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      onClick={() => setFaqOpen(open ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4"
                      style={{ padding: "20px 22px", border: "none", background: "transparent", cursor: "pointer", textAlign: "start", fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)" }}
                    >
                      <span>{q}</span>
                      <span className="flex items-center justify-center shrink-0" style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--pink-soft)", color: "var(--pink)", fontSize: 18, fontWeight: 800, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s ease" }}>+</span>
                    </button>
                    {/* Answers stay in the HTML when closed, so crawlers read them. */}
                    <div id={`faq-${i}`} hidden={!open} style={{ padding: "0 22px 20px", fontSize: 15, lineHeight: 1.65, color: "var(--text-dim)", fontWeight: 500 }}>{a}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED GUIDES ============ */}
      {guides.length > 0 && (
        <section style={{ background: "var(--bg)" }}>
          <div className="max-w-[1120px] mx-auto px-5 sm:px-[34px] pt-16 min-[860px]:pt-24 pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4" style={{ marginBottom: 28 }}>
              <h2 style={{ ...h2, fontSize: "clamp(28px,3.2vw,40px)" }}>{fill(L.guidesH)}</h2>
              <Link href="/blog" className="inline-flex items-center min-h-[44px]" style={{ fontSize: 15, fontWeight: 800, color: "var(--pink)", textDecoration: "none" }}>{L.allGuides}</Link>
            </div>
            <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-[18px]">
              {guides.map((g) => (
                <Link key={g.slug} href={g.slug} className="fnl-blogcard no-underline flex flex-col gap-[10px]" style={{ ...card, padding: 24, color: "var(--text)" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--pink)" }}>{g.category}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3 }}>{g.title}</span>
                  {g.read && <span className="mt-auto" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dim2)" }}>{g.read}</span>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ OTHER PLATFORMS ============ */}
      {others.length > 0 && (
        <section style={{ background: "var(--bg)" }}>
          <div className="max-w-[1120px] mx-auto px-5 sm:px-[34px] pt-14 pb-16 min-[860px]:pb-24">
            <h2 style={{ ...h2, fontSize: "clamp(24px,2.6vw,32px)", letterSpacing: "-.01em", marginBottom: 22 }}>{L.othersH}</h2>
            <div className="grid grid-cols-2 min-[860px]:grid-cols-3 gap-3">
              {others.map((o) => (
                <Link key={o.slug} href={platformPath(o.slug)} className="fnl-blogcard flex items-center gap-3" style={{ ...card, borderRadius: 16, padding: "14px 16px", minHeight: 56, textDecoration: "none", color: "var(--text)" }}>
                  <PlatformLogo name={o.name} />
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{fillName(L.forX, o.name)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ FINAL CTA ============ */}
      {/* The other-platforms grid normally supplies the space above this box. */}
      <section style={{ padding: `${others.length > 0 ? 0 : 56}px 20px 96px`, background: "var(--bg)" }}>
        <div className="max-w-[1080px] mx-auto relative overflow-hidden text-center" style={{ borderRadius: 36, background: "var(--grad)", padding: "76px 24px" }}>
          <div className="absolute pointer-events-none" style={{ bottom: -140, right: -70, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
          <div className="relative">
            <h2 style={{ fontSize: "clamp(34px,4.4vw,54px)", fontWeight: 900, margin: "0 0 14px", color: "#fff", letterSpacing: "-.02em", lineHeight: 1.05, textWrap: "balance" }}>{fill(L.ctaH)}</h2>
            <p className="mx-auto" style={{ fontSize: 18, color: "rgba(255,255,255,.92)", margin: "0 auto 28px", maxWidth: 520, fontWeight: 500 }}>{L.ctaS}</p>
            {/* At full size the button is wider than the box on a 375px phone. */}
            <ChromeCTA label={t("cta.long")} variant="white" glyphSize={21} className="max-[480px]:!text-[15px] max-[480px]:!px-5" />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
