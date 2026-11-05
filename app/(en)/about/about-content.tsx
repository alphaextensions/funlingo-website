"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { ChromeCTA } from "@/app/_components/cta";
import { useT } from "@/app/i18n/I18nProvider";

const eyebrow: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--pink)",
  marginBottom: 16,
};

export default function AboutContent() {
  const { t } = useT();

  const principles = [1, 2, 3, 4].map((n) => ({
    num: String(n),
    title: t(`about.p${n}Title`),
    body: t(`about.p${n}Body`),
  }));

  const stats = [1, 2, 3, 4].map((n) => ({
    big: t(`about.stat${n}Big`),
    label: t(`about.stat${n}Label`),
  }));

  return (
    <div className="fnl-root overflow-x-hidden">
      <Navbar currentPage="/about" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ top: -160, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,77,176,.22), transparent 65%)" }} />
        <div className="absolute pointer-events-none" style={{ top: 120, left: -140, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(179,36,217,.20), transparent 65%)" }} />
        <div className="relative z-[2] max-w-[960px] mx-auto px-5 sm:px-[34px] text-center pt-[72px] min-[860px]:pt-24 pb-[70px]">
          <div className="inline-flex items-center gap-[9px]" style={{ marginBottom: 26, padding: "9px 16px", borderRadius: 999, background: "var(--pink-soft)", border: "1px solid rgba(236,77,176,.3)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--pink)", animation: "fnl-pulse 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pink)" }}>{t("about.badge")}</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px,5.4vw,74px)", lineHeight: 1.02, fontWeight: 800, margin: 0, letterSpacing: "-.02em", color: "var(--text)" }}>
            {t("about.h1a")}{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{t("about.h1accent")}</span>
            {t("about.h1b")}
          </h1>
          <p className="mx-auto" style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-dim)", margin: "26px auto 0", maxWidth: 600, fontWeight: 500 }}>{t("about.sub")}</p>
        </div>
      </section>

      {/* STORY */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-24 grid grid-cols-1 min-[860px]:grid-cols-2 gap-9 min-[860px]:gap-[54px] items-center">
          <div>
            <div style={eyebrow}>{t("about.whyEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(30px,3.4vw,42px)", fontWeight: 800, margin: "0 0 20px", color: "var(--text)", letterSpacing: "-.01em", lineHeight: 1.08 }}>{t("about.whyH2")}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text-dim)", margin: "0 0 16px", fontWeight: 500 }}>{t("about.whyP1")}</p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{t("about.whyP2")}</p>
          </div>
          <div className="relative" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 26, padding: "44px 40px" }}>
            <div style={{ fontSize: 60, lineHeight: 0.6, color: "var(--pink)", fontWeight: 900 }}>&ldquo;</div>
            <p style={{ fontSize: 24, lineHeight: 1.45, fontWeight: 700, color: "var(--text)", margin: "6px 0 0" }}>{t("about.quote")}</p>
            <div className="flex items-center gap-3" style={{ marginTop: 24 }}>
              <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--grad)", color: "#fff", fontWeight: 800, fontSize: 15 }}>SK</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>{t("about.quoteName")}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-dim)" }}>{t("about.quoteRole")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[100px]">
          <div className="text-center mx-auto" style={{ maxWidth: 640, marginBottom: 56 }}>
            <div style={eyebrow}>{t("about.believeEyebrow")}</div>
            <h2 style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em" }}>{t("about.believeH2")}</h2>
          </div>
          <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-[22px]">
            {principles.map((p) => (
              <div key={p.num} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: "34px 32px" }}>
                <div className="flex items-center justify-center" style={{ width: 50, height: 50, borderRadius: 15, background: "var(--pink-soft)", color: "var(--pink)", marginBottom: 20, fontSize: 24, fontWeight: 900 }}>{p.num}</div>
                <h3 style={{ fontSize: 23, fontWeight: 700, margin: "0 0 10px", color: "var(--text)" }}>{p.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-[34px] py-[70px] grid grid-cols-2 min-[860px]:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "clamp(40px,5vw,60px)", fontWeight: 900, lineHeight: 1, background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{s.big}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-dim)", marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 20px" }}>
        <div className="max-w-[1080px] mx-auto relative overflow-hidden text-center" style={{ borderRadius: 36, background: "var(--grad)", padding: "80px 24px" }}>
          <div className="absolute pointer-events-none" style={{ bottom: -140, right: -70, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
          <div className="relative">
            <h2 style={{ fontSize: "clamp(36px,4.6vw,58px)", fontWeight: 900, margin: "0 0 16px", color: "#fff", letterSpacing: "-.02em", lineHeight: 1.04 }}>{t("about.ctaH2")}</h2>
            <p className="mx-auto" style={{ fontSize: 19, color: "rgba(255,255,255,.92)", margin: "0 auto 30px", maxWidth: 500, fontWeight: 500 }}>{t("about.ctaSub")}</p>
            <ChromeCTA label={t("cta.long")} variant="white" glyphSize={20} style={{ padding: "17px 32px", fontSize: 17 }} />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
