"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import FunlingoPlayer from "@/sections/home/FunlingoPlayer";
import GuessGame from "@/sections/home/GuessGame";
import { FlagSvg } from "@/sections/home/flags";
import { PLATFORMS, PlatformLogo } from "@/sections/home/platformLogos";
import { ChromeCTA } from "@/app/_components/cta";
import { useT } from "@/app/i18n/I18nProvider";

const HERO_LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italian" },
  { code: "de", label: "German" },
  { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" },
];

const eyebrow: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--pink)",
  marginBottom: 14,
};

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
  const { t } = useT();
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

  const reviews = [
    { quote: t("home.rev1"), name: "Aastha Pandey", initials: "AP" },
    { quote: t("home.rev2"), name: "Daniel", initials: "D" },
    { quote: t("home.rev3"), name: "Shubham R.", initials: "SR" },
    { quote: t("home.rev4"), name: "Sarthak Shinde", initials: "SS" },
    { quote: t("home.rev5"), name: "Aastha P.", initials: "AP" },
    { quote: t("home.rev6"), name: "Indera", initials: "IC" },
  ];
  const loopA = [...reviews, ...reviews];
  const loopB = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

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

        {/* Floating word chips (desktop only) */}
        <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: 200, left: "50.5%", ["--r" as string]: "-8deg", animation: "fnl-float 6s ease-in-out infinite", padding: "10px 17px", borderRadius: 15, background: "var(--surface)", boxShadow: "0 12px 30px -10px rgba(150,30,160,.4)", border: "1px solid var(--border)", fontWeight: 700, color: "var(--magenta)", fontSize: 18 }}>hola</div>
        <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: 250, left: "64%", ["--r" as string]: "7deg", animation: "fnl-float 7.4s ease-in-out infinite", padding: "10px 17px", borderRadius: 15, background: "linear-gradient(135deg,#BC22D6,#E0319E)", boxShadow: "0 12px 30px -10px rgba(236,77,176,.5)", fontWeight: 700, color: "#fff", fontSize: 18 }}>bonjour</div>
        <div className="hidden min-[860px]:block absolute pointer-events-none z-[5]" style={{ top: 188, left: "80%", ["--r" as string]: "7deg", animation: "fnl-float 7s ease-in-out infinite", padding: "9px 15px", borderRadius: 15, background: "var(--surface)", boxShadow: "0 12px 30px -10px rgba(150,30,160,.4)", border: "1px solid var(--border)", fontWeight: 700, color: "var(--pink)", fontSize: 17 }}>안녕</div>

        <div className="relative z-[2] max-w-[1240px] mx-auto px-5 sm:px-[34px] grid grid-cols-1 min-[860px]:grid-cols-[1.02fr_1fr] gap-9 min-[860px]:gap-[50px] items-center pt-9 min-[860px]:pt-[60px] pb-12 min-[860px]:pb-[70px]">
          <div>
            <div className="inline-flex items-center gap-[9px] mb-6" style={{ padding: "9px 16px", borderRadius: 999, background: "var(--pink-soft)", border: "1px solid rgba(236,77,176,.3)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--pink)", animation: "fnl-pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pink)" }}>{t("home.badgeFree")}</span>
            </div>
            <h1 style={{ fontSize: "clamp(52px,5.6vw,82px)", lineHeight: 1, fontWeight: 800, margin: 0, letterSpacing: "-.02em", color: "var(--text)" }}>
              {t("home.heroPre")}{" "}
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
                      onClick={() => setLearn(l.code)}
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

            <div className="flex items-center gap-[14px]" style={{ marginTop: 22 }}>
              <div className="flex">
                {[
                  { l: "M", g: "linear-gradient(135deg,#BC22D6,#E0319E)" },
                  { l: "A", g: "linear-gradient(135deg,#7A3FF2,#C81FD4)" },
                  { l: "D", g: "linear-gradient(135deg,#E0319E,#FF7A59)" },
                ].map((a, i) => (
                  <span key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: a.g, border: "2px solid var(--bg)", marginLeft: i ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}>{a.l}</span>
                ))}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dim)" }}>
                <span style={{ color: "#F5A623", fontWeight: 800 }}>★ 4.9</span> {t("home.ratingTail")}
              </div>
            </div>
          </div>

          <div className="relative z-[4]">
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
          <div className="text-center mx-auto" style={{ maxWidth: 680, marginBottom: 58 }}>
            <div style={eyebrow}>{t("home.hiwEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em", lineHeight: 1.04 }}>
              {t("home.hiwH2a")}<br />{t("home.hiwH2b")}
            </h2>
          </div>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-3 gap-6" style={{ marginBottom: 56 }}>
            {steps.map((s) => (
              <div key={s.n} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "34px 30px" }}>
                <div className="flex items-center justify-center" style={{ fontSize: 17, fontWeight: 900, color: "#fff", width: 42, height: 42, borderRadius: 13, background: "var(--grad)", marginBottom: 20 }}>{s.n}</div>
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

      {/* ============ COMPARISON ============ */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1120px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div style={eyebrow}>{t("home.cmpEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>
              {t("home.cmpH2a")}<br />{t("home.cmpH2b")}
            </h2>
          </div>
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
            <div>
              <div style={eyebrow}>{t("home.sciEyebrow")}</div>
              <div style={{ fontSize: "clamp(80px,11vw,140px)", fontWeight: 900, lineHeight: 0.9, background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", letterSpacing: "-.03em" }}>50%</div>
              <p style={{ fontSize: 22, lineHeight: 1.45, color: "var(--text)", margin: "18px 0 0", fontWeight: 600, maxWidth: 420 }}>{t("home.sciCap")}</p>
              <p style={{ fontSize: 14, color: "var(--text-dim2)", margin: "14px 0 0", fontWeight: 600 }}>{t("home.sciSrc")}</p>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "38px 36px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-dim)", marginBottom: 26 }}>{t("home.chartCap")}</div>
              <div className="flex items-end gap-[30px]" style={{ height: 200 }}>
                <div className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-dim)", marginBottom: 8 }}>~30%</div>
                  <div style={{ width: "100%", height: "30%", borderRadius: "12px 12px 0 0", background: "var(--chip)" }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dim)", marginTop: 12 }}>{t("home.chartFlash")}</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-end" style={{ height: "100%" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "var(--pink)", marginBottom: 8 }}>~80%</div>
                  <div style={{ width: "100%", height: "80%", borderRadius: "12px 12px 0 0", background: "var(--grad)" }} />
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginTop: 12 }}>{t("home.chartFun")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="overflow-hidden border-t border-b" style={{ background: "var(--bg2)", borderColor: "var(--border)", padding: "96px 0" }}>
        <div className="text-center mx-auto px-5 sm:px-[34px]" style={{ maxWidth: 680, marginBottom: 50 }}>
          <div style={eyebrow}>{t("home.tstEyebrow")}</div>
          <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>{t("home.tstH2")}</h2>
        </div>
        <div className="flex" style={{ width: "max-content", gap: 20, animation: "fnl-mq 46s linear infinite", marginBottom: 20 }}>
          {loopA.map((rv, i) => (
            <ReviewCard key={i} quote={rv.quote} name={rv.name} initials={rv.initials} />
          ))}
        </div>
        <div className="flex" style={{ width: "max-content", gap: 20, animation: "fnl-mq2 46s linear infinite" }}>
          {loopB.map((rv, i) => (
            <ReviewCard key={i} quote={rv.quote} name={rv.name} initials={rv.initials} />
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[840px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px]">
          <div className="text-center" style={{ marginBottom: 50 }}>
            <div style={eyebrow}>{t("home.faqEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(38px,4.4vw,56px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>{t("home.faqH2")}</h2>
          </div>
          <div className="flex flex-col gap-[14px]">
            {faqs.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
                  <button
                    onClick={() => setFaqOpen(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-start"
                    style={{ padding: "22px 26px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text)" }}>{f.q}</span>
                    <span style={{ fontSize: 26, fontWeight: 400, lineHeight: 1, color: "var(--pink)", flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .2s ease" }}>+</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 26px 24px", fontSize: 16, lineHeight: 1.6, color: "var(--text-dim)", fontWeight: 500 }}>{f.a}</div>
                  )}
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

function ReviewCard({ quote, name, initials }: { quote: string; name: string; initials: string }) {
  return (
    <div style={{ width: 380, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 22, padding: "26px 28px" }}>
      <div style={{ color: "#F5A623", fontSize: 14, marginBottom: 12, letterSpacing: "2px" }}>★★★★★</div>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--text)", margin: "0 0 18px", fontWeight: 500 }}>{quote}</p>
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--grad)", color: "#fff", fontSize: 13, fontWeight: 800 }}>{initials}</div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{name}</span>
      </div>
    </div>
  );
}
