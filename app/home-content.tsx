"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import FunlingoPlayer from "@/sections/home/FunlingoPlayer";
import GuessGame from "@/sections/home/GuessGame";
import AnySiteSection from "@/sections/home/AnySiteSection";
import { Reveal, CountUp } from "@/sections/home/reveal";
import { FlagSvg } from "@/sections/home/flags";
import { PLATFORMS, PlatformLogo } from "@/sections/home/platformLogos";
import { orderedReviews } from "@/sections/home/reviews";
import { ChromeCTA } from "@/app/_components/cta";
import { track } from "@/app/_components/track";
import { useT } from "@/app/i18n/I18nProvider";

// Hero social-proof avatars. Gradient monograms, not photos — the previous
// pravatar.cc images were third-party requests and not brand assets.
const PROOF_AVATARS = [
  { initial: "M", grad: "linear-gradient(135deg,#BC22D6,#E0319E)" },
  { initial: "A", grad: "linear-gradient(135deg,#7A3FF2,#C81FD4)" },
  { initial: "D", grad: "linear-gradient(135deg,#E0319E,#FF7A59)" },
];

// Chip set and order follow the 2026 redesign. Chinese is added (it has its own
// hero scene); German is dropped by the design to make room for it.
const HERO_LANGS = [
  { code: "en", label: "English" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italian" },
  { code: "ko", label: "Korean" },
];

const eyebrow: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--pink)",
  marginBottom: 14,
};

function StepIcon({ kind }: { kind: "download" | "play" | "tap" }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none" as const };
  if (kind === "download")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 3v11m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (kind === "play")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden="true">
      <path d="M9 3.5v8.2l-1.9-1.9a1.6 1.6 0 10-2.2 2.3l4.6 5A4 4 0 0012 18.6h3.3a3.4 3.4 0 003.4-3.4V11a1.5 1.5 0 10-3 0 1.5 1.5 0 10-3 0 1.5 1.5 0 10-3 0V3.5a1.4 1.4 0 10-2.8 0z" fill="currentColor" />
    </svg>
  );
}

function MarkYes() {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#BC22D6,#E0319E)",
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function MarkPart() {
  return <span style={{ width: 26, height: 4, borderRadius: 99, background: "var(--text-dim2)" }} />;
}
function MarkNo() {
  return <span style={{ color: "var(--text-dim2)", fontSize: 20, fontWeight: 800 }}>✕</span>;
}

export default function HomeContent() {
  const { t, locale } = useT();
  const [learn, setLearn] = React.useState("es");
  const [faqOpen, setFaqOpen] = React.useState(0);

  const steps = [
    { n: "1", title: t("home.step1Title"), body: t("home.step1Body") },
    { n: "2", title: t("home.step2Title"), body: t("home.step2Body") },
    { n: "3", title: t("home.step3Title"), body: t("home.step3Body") },
  ];

  const rows: { label: string; fun: React.ReactNode; tr: React.ReactNode; im: React.ReactNode }[] = [
    { label: t("home.row1"), fun: <MarkYes />, tr: <MarkPart />, im: <MarkNo /> },
    { label: t("home.row2"), fun: <MarkYes />, tr: <MarkPart />, im: <MarkNo /> },
    { label: t("home.row3"), fun: <MarkYes />, tr: <MarkPart />, im: <MarkPart /> },
    { label: t("home.row4"), fun: <MarkYes />, tr: <MarkNo />, im: <MarkNo /> },
    { label: t("home.row5"), fun: <MarkYes />, tr: <MarkPart />, im: <MarkNo /> },
  ];

  // Localized testimonials — the visitor's language shows first. Avatars are
  // gradient monograms; the English set keeps one 4-star review.
  const reviews = orderedReviews(locale);
  const half = Math.ceil(reviews.length / 2);
  const loopA = [...reviews.slice(0, half), ...reviews.slice(0, half)];
  const loopB = [...reviews.slice(half), ...reviews.slice(half)];

  const faqs = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`home.q${i}`),
    a: t(`home.a${i}`),
  }));

  const platformLoop = [...PLATFORMS, ...PLATFORMS];


  return (
    <div className="fnl-root overflow-x-hidden">
      <Navbar currentPage="/" />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ top: -180, left: -140, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(179,36,217,.24), transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ top: 80, right: -160, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,77,176,.22), transparent 65%)" }} />

        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 sm:px-[34px] grid grid-cols-1 min-[860px]:grid-cols-[1.02fr_1fr] gap-9 min-[860px]:gap-[50px] items-center pt-9 min-[860px]:pt-[60px] pb-12 min-[860px]:pb-[70px]">
          <div>
            <div className="inline-flex items-center gap-[9px] mb-6" style={{ padding: "9px 16px", borderRadius: 999, background: "var(--pink-soft)", border: "1px solid rgba(236,77,176,.3)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--pink)", animation: "fnl-pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pink)" }}>{t("home.badgeFree")}</span>
            </div>
            <h1 style={{ fontSize: "clamp(52px,5.6vw,82px)", lineHeight: 1, fontWeight: 800, margin: 0, letterSpacing: "-.02em", color: "var(--text)" }}>
              {/* Chinese, Japanese and Thai don't put spaces between words, so
                  the two halves join directly — a space there renders as a
                  visible gap ("边看边 学。" instead of "边看边学。"). */}
              {t("home.heroPre")}{/^(zh|ja|th)/.test(locale) ? "" : " "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{t("home.heroAccent")}</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-dim)", margin: "24px 0 0", maxWidth: 480, fontWeight: 500 }}>{t("home.heroSub")}</p>

            <div style={{ marginTop: 30 }}>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 12 }}>{t("home.learnLabel")}</div>
              <div className="flex flex-wrap gap-[10px] items-center">
                {HERO_LANGS.map((l) => {
                  const active = learn === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLearn(l.code);
                        track("learn_language_select", { lang: l.code });
                      }}
                      className="flex items-center gap-[9px]"
                      style={{
                        padding: "10px 16px",
                        borderRadius: 999,
                        cursor: "pointer",
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        border: active ? "1.5px solid transparent" : "1.5px solid var(--border)",
                        background: active ? "var(--pink-soft)" : "var(--surface)",
                        color: active ? "var(--pink)" : "var(--text)",
                        boxShadow: active ? "0 0 0 3px rgba(236,77,176,.18)" : "none",
                        transition: "all .15s ease",
                      }}
                    >
                      <span className="flex"><FlagSvg code={l.code} w={24} h={17} /></span>
                      <span>{l.label}</span>
                    </button>
                  );
                })}
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dim2)", paddingLeft: 4 }}>{t("home.learnMore")}</span>
              </div>
            </div>

            <div className="flex items-center gap-[14px] flex-wrap" style={{ marginTop: 30 }}>
              <ChromeCTA label={t("cta.long")} />
            </div>

            {/* Social-proof panel. Monogram avatars replace the former pravatar.cc
                images: three third-party requests, and not brand assets. */}
            <div
              className="fnl-proof"
              style={{ marginTop: 26, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="fnl-proof-main flex items-center" style={{ gap: 13 }}>
                <div className="flex" aria-hidden="true">
                  {PROOF_AVATARS.map((a, i) => (
                    <span
                      key={a.initial}
                      style={{ width: 34, height: 34, borderRadius: "50%", background: a.grad, border: "2px solid var(--surface)", marginLeft: i ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}
                    >
                      {a.initial}
                    </span>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.01em", background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    <CountUp value={t("home.usersCount")} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-dim)", marginTop: 1 }}>{t("home.usersLabel")}</div>
                </div>
              </div>

              <div className="fnl-proof-div" />

              <div className="fnl-proof-rating">
                <div className="flex items-center" style={{ gap: 6 }}>
                  <span style={{ color: "#F5A623", fontSize: 15, letterSpacing: 1 }}>★★★★★</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}><CountUp value="4.8" /></span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dim)", marginTop: 1 }}>{t("home.ratingStore")}</div>
              </div>
            </div>
          </div>

          <div className="relative z-[4]">
            {/* Floating word chips (desktop only). Anchored to the player, not to
                the section: they used fixed `top` offsets measured against the old
                two-line headline, so any copy change slid them onto the player's
                NETFLIX / LEARNING badges. Positioned off the player's own edges
                they stay put whatever the headline does, in any locale. */}
            <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: -26, left: "14%", ["--r" as string]: "-8deg", animation: "fnl-float 6s ease-in-out infinite", padding: "10px 17px", borderRadius: 15, background: "var(--surface)", boxShadow: "0 12px 30px -10px rgba(150,30,160,.4)", border: "1px solid var(--border)", fontWeight: 700, color: "var(--magenta)", fontSize: 18 }}>hola</div>
            <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: "22%", left: -40, ["--r" as string]: "7deg", animation: "fnl-float 7.4s ease-in-out infinite", padding: "10px 17px", borderRadius: 15, background: "linear-gradient(135deg,#BC22D6,#E0319E)", boxShadow: "0 12px 30px -10px rgba(236,77,176,.5)", fontWeight: 700, color: "#fff", fontSize: 18 }}>bonjour</div>
            <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: "11%", right: -30, ["--r" as string]: "7deg", animation: "fnl-float 7s ease-in-out infinite", padding: "9px 15px", borderRadius: 15, background: "var(--surface)", boxShadow: "0 12px 30px -10px rgba(150,30,160,.4)", border: "1px solid var(--border)", fontWeight: 700, color: "var(--pink)", fontSize: 17 }}>안녕</div>

            <FunlingoPlayer lang={learn} />
          </div>
        </div>
      </section>

      {/* ============ PLATFORM WALL ============ */}
      <section className="overflow-hidden border-t border-b" style={{ borderColor: "var(--border)", background: "var(--bg2)", padding: "30px 0" }}>
        <div className="text-center" style={{ fontSize: 14, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 22 }}>{t("home.platformHeading")}</div>
        <div className="flex" style={{ width: "max-content", gap: 16, animation: "fnl-mq 32s linear infinite" }}>
          {platformLoop.map((p, i) => (
            <div key={i} className="flex items-center gap-3" style={{ padding: "14px 24px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--border)", whiteSpace: "nowrap" }}>
              <span className="flex"><PlatformLogo name={p} /></span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS + GAME ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: 680, marginBottom: 58 }}>
            <div style={eyebrow}>{t("home.hiwEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em", lineHeight: 1.04 }}>
              {t("home.hiwH2a")}<br />{t("home.hiwH2b")}
            </h2>
          </div>
          </Reveal>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-6" style={{ marginBottom: 56 }}>
            {steps.map((s, si) => (
              <div key={s.n} className="fnl-step" style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "34px 30px" }}>
                {/* the ordinal moves to the corner; the tile carries an icon */}
                <span style={{ position: "absolute", top: 18, right: 22, fontSize: 13, fontWeight: 900, color: "var(--text-dim2)", letterSpacing: ".04em" }}>
                  {String(si + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center justify-center" style={{ color: "#fff", width: 56, height: 56, borderRadius: 17, background: "var(--grad)", marginBottom: 20 }}>
                  <StepIcon kind={si === 0 ? "download" : si === 1 ? "play" : "tap"} />
                </div>
                <h3 style={{ fontSize: 23, fontWeight: 700, margin: "0 0 9px", color: "var(--text)" }}>{s.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginBottom: 26 }}>
            <h3 style={{ fontSize: "clamp(26px,3vw,34px)", fontWeight: 800, color: "var(--text)", margin: "0 0 6px" }}>{t("home.gameH3")}</h3>
            <p style={{ fontSize: 17, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{t("home.gameSub")}</p>
          </div>
          <div className="mx-auto" style={{ maxWidth: 780 }}>
            <GuessGame lang={learn} />
          </div>
        </div>
      </section>

            <AnySiteSection learn={learn} />

{/* ============ COMPARISON ============ */}
      <section id="compare" style={{ background: "var(--bg2)", scrollMarginTop: "90px" }}>
        <div className="max-w-[1120px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <Reveal>
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div style={eyebrow}>{t("home.cmpEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>
              {t("home.cmpH2a")}<br />{t("home.cmpH2b")}
            </h2>
          </div>
          </Reveal>
          <div className="overflow-x-auto">
            <div style={{ border: "1px solid var(--border)", borderRadius: 28, overflow: "hidden", background: "var(--surface)", minWidth: 560 }}>
              <div className="grid" style={{ gridTemplateColumns: "1.7fr 1fr 1fr 1fr" }}>
                <div style={{ padding: "26px 30px" }} />
                <div className="text-center" style={{ padding: "26px 18px", background: "var(--grad)" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Funlingo</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,.9)", marginTop: 2 }}>{t("home.cmpFreeForever")}</div>
                </div>
                <div className="text-center" style={{ padding: "26px 18px", borderLeft: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dim)" }}>Trancy</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-dim2)", marginTop: 2 }}>$5–12/mo</div>
                </div>
                <div className="text-center" style={{ padding: "26px 18px", borderLeft: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-dim)" }}>Imm. Translate</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-dim2)", marginTop: 2 }}>$5–8/mo</div>
                </div>
              </div>
              {rows.map((row, i) => (
                <div key={i} className="grid items-center" style={{ gridTemplateColumns: "1.7fr 1fr 1fr 1fr", borderTop: "1px solid var(--border)" }}>
                  <div style={{ padding: "22px 30px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{row.label}</div>
                  <div className="flex justify-center" style={{ padding: "22px 18px", background: "var(--pink-soft)" }}>{row.fun}</div>
                  <div className="flex justify-center" style={{ padding: "22px 18px", borderLeft: "1px solid var(--border)" }}>{row.tr}</div>
                  <div className="flex justify-center" style={{ padding: "22px 18px", borderLeft: "1px solid var(--border)" }}>{row.im}</div>
                </div>
              ))}
              {/* price row */}
              <div className="grid items-center" style={{ gridTemplateColumns: "1.7fr 1fr 1fr 1fr", borderTop: "1px solid var(--border)" }}>
                <div style={{ padding: "22px 30px", fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{t("home.row6")}</div>
                <div className="flex justify-center" style={{ padding: "22px 18px", background: "var(--pink-soft)" }}><span style={{ fontWeight: 800, fontSize: 17, color: "#C81FD4" }}>{t("home.priceFree")}</span></div>
                <div className="flex justify-center" style={{ padding: "22px 18px", borderLeft: "1px solid var(--border)" }}><span style={{ fontWeight: 800, fontSize: 17, color: "var(--text-dim)" }}>$5–12/mo</span></div>
                <div className="flex justify-center" style={{ padding: "22px 18px", borderLeft: "1px solid var(--border)" }}><span style={{ fontWeight: 800, fontSize: 17, color: "var(--text-dim)" }}>$5–8/mo</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SCIENCE ============ */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="max-w-[1120px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-9 min-[860px]:gap-[54px] items-center">
            <Reveal>
            <div>
              <div style={eyebrow}>{t("home.sciEyebrow")}</div>
              <div style={{ fontSize: "clamp(80px,11vw,140px)", fontWeight: 900, lineHeight: 0.9, background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", letterSpacing: "-.03em" }}><CountUp value="50%" /></div>
              <p style={{ fontSize: 22, lineHeight: 1.45, color: "var(--text)", margin: "18px 0 0", fontWeight: 600, maxWidth: 420 }}>{t("home.sciCap")}</p>
              <p style={{ fontSize: 14, color: "var(--text-dim2)", margin: "14px 0 0", fontWeight: 600 }}>{t("home.sciSrc")}</p>
            </div>
            </Reveal>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "38px 36px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-dim)", marginBottom: 26 }}>{t("home.chartCap")}</div>
              <div className="flex items-end gap-[30px]" style={{ height: 200 }}>
                <div className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-dim)", marginBottom: 8 }}><CountUp value="~30%" /></div>
                  <div className="fnl-bar" style={{ width: "100%", height: "30%", borderRadius: "12px 12px 0 0", background: "var(--chip)" }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dim)", marginTop: 12 }}>{t("home.chartFlash")}</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "var(--pink)", marginBottom: 8 }}><CountUp value="~80%" /></div>
                  <div className="fnl-bar" style={{ width: "100%", height: "80%", borderRadius: "12px 12px 0 0", background: "var(--grad)" }} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginTop: 12 }}>{t("home.chartFun")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="overflow-hidden" style={{ background: "var(--bg2)", padding: "96px 0" }}>
        <Reveal>
        <div className="text-center mx-auto px-5 sm:px-[34px]" style={{ maxWidth: 680, marginBottom: 50 }}>
          <div style={eyebrow}>{t("home.tstEyebrow")}</div>
          <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>{t("home.tstH2")}</h2>
        </div>
        </Reveal>
        <div className="flex fnl-mqrow" style={{ width: "max-content", gap: 20, animation: "fnl-mq 90s linear infinite", marginBottom: 20 }}>
          {loopA.map((rv, i) => (
            <ReviewCard key={i} quote={rv.quote} name={rv.name} initials={rv.initials} stars={rv.stars} />
          ))}
        </div>
        <div className="flex fnl-mqrow" style={{ width: "max-content", gap: 20, animation: "fnl-mq2 90s linear infinite" }}>
          {loopB.map((rv, i) => (
            <ReviewCard key={i} quote={rv.quote} name={rv.name} initials={rv.initials} stars={rv.stars} />
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[840px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <Reveal>
          <div className="text-center" style={{ marginBottom: 50 }}>
            <div style={eyebrow}>{t("home.faqEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>{t("home.faqH2")}</h2>
          </div>
          </Reveal>
          <div className="flex flex-col gap-[14px]">
            {faqs.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
                  <button
                    onClick={() => {
                      const willOpen = !open;
                      setFaqOpen(willOpen ? i : -1);
                      if (willOpen) track("faq_open", { q: i + 1 });
                    }}
                    className="w-full flex items-center justify-between gap-4 text-start"
                    style={{ padding: "22px 26px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{f.q}</span>
                    <span style={{ fontSize: 26, fontWeight: 400, lineHeight: 1, color: "var(--pink)", flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .2s ease" }}>+</span>
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: open ? "1fr" : "0fr",
                      transition: "grid-template-rows .32s cubic-bezier(.4,0,.2,1)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          padding: "0 26px 24px",
                          fontSize: 16,
                          lineHeight: 1.6,
                          color: "var(--text-dim)",
                          fontWeight: 500,
                          opacity: open ? 1 : 0,
                          transform: open ? "translateY(0)" : "translateY(-6px)",
                          transition: "opacity .3s ease, transform .3s ease",
                        }}
                      >
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ padding: "30px 20px 80px" }}>
        <div className="max-w-[1120px] mx-auto relative overflow-hidden text-center" style={{ borderRadius: 36, background: "var(--grad)", padding: "84px 24px" }}>
          <div className="absolute pointer-events-none" style={{ bottom: -140, left: -70, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
          <div className="absolute pointer-events-none" style={{ top: -120, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
          <div className="relative">
            <h2 style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight: 900, margin: "0 0 16px", color: "#fff", letterSpacing: "-.02em", lineHeight: 1.02 }}>
              {t("home.ctaH2a")}<br />{t("home.ctaH2b")}
            </h2>
            <p className="mx-auto" style={{ fontSize: 20, color: "rgba(255,255,255,.92)", margin: "0 auto 32px", maxWidth: 540, fontWeight: 500 }}>{t("home.ctaSub")}</p>
            <ChromeCTA label={t("cta.long")} variant="white" glyphSize={21} />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

function ReviewCard({
  quote,
  name,
  initials,
  stars = 5,
}: {
  quote: string;
  name: string;
  initials: string;
  stars?: number;
}) {
  return (
    <div style={{ width: 380, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 22, padding: "26px 28px" }}>
      <div style={{ fontSize: 14, marginBottom: 12, letterSpacing: "2px" }} aria-label={`${stars} out of 5 stars`}>
        <span style={{ color: "#F5A623" }}>{"★".repeat(stars)}</span>
        <span style={{ color: "var(--text-dim2)" }}>{"★".repeat(5 - stars)}</span>
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text)", margin: "0 0 18px", fontWeight: 500 }}>{quote}</p>
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--grad)", color: "#fff", fontSize: 13, fontWeight: 800 }}>{initials}</div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{name}</span>
      </div>
    </div>
  );
}
