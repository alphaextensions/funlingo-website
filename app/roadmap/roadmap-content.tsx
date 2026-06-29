"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { useT } from "@/app/i18n/I18nProvider";
import { track } from "@/app/_components/track";

type Status = "shipped" | "progress" | "planned";

const ITEMS: { status: Status; key: number }[] = [
  { status: "shipped", key: 1 },
  { status: "shipped", key: 2 },
  { status: "shipped", key: 3 },
  { status: "shipped", key: 4 },
  { status: "shipped", key: 5 },
  { status: "shipped", key: 6 },
  { status: "progress", key: 7 },
  { status: "progress", key: 8 },
  { status: "progress", key: 9 },
  { status: "planned", key: 10 },
  { status: "planned", key: 11 },
  { status: "planned", key: 12 },
  { status: "planned", key: 13 },
];

export default function RoadmapContent() {
  const { t } = useT();
  const [filter, setFilter] = React.useState<"all" | Status>("all");

  const counts = {
    all: ITEMS.length,
    shipped: ITEMS.filter((i) => i.status === "shipped").length,
    progress: ITEMS.filter((i) => i.status === "progress").length,
    planned: ITEMS.filter((i) => i.status === "planned").length,
  };

  const tabs: { k: "all" | Status; label: string; count: number }[] = [
    { k: "all", label: t("roadmap.tabAll"), count: counts.all },
    { k: "shipped", label: t("roadmap.tabShipped"), count: counts.shipped },
    { k: "progress", label: t("roadmap.tabProgress"), count: counts.progress },
    { k: "planned", label: t("roadmap.tabPlanned"), count: counts.planned },
  ];

  const statusMeta: Record<Status, { label: string; style: React.CSSProperties }> = {
    shipped: { label: t("roadmap.statusShipped"), style: { background: "linear-gradient(135deg,#BC22D6,#E0319E)", color: "#fff" } },
    progress: { label: t("roadmap.statusProgress"), style: { background: "var(--pink-soft)", color: "var(--pink)", border: "1px solid rgba(236,77,176,.35)" } },
    planned: { label: t("roadmap.statusPlanned"), style: { background: "var(--chip)", color: "var(--text-dim)" } },
  };

  const items = ITEMS.filter((i) => filter === "all" || i.status === filter);

  return (
    <div className="fnl-root overflow-x-hidden">
      <Navbar currentPage="/roadmap" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ top: -150, left: "50%", transform: "translateX(-50%)", width: 620, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(179,36,217,.20), transparent 65%)" }} />
        <div className="relative z-[2] max-w-[900px] mx-auto px-5 sm:px-[34px] text-center pt-[70px] min-[860px]:pt-[90px] pb-14">
          <div className="inline-flex items-center gap-[9px] mb-6" style={{ padding: "9px 16px", borderRadius: 999, background: "var(--pink-soft)", border: "1px solid rgba(236,77,176,.3)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--pink)", animation: "fnl-pulse 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--pink)" }}>{t("roadmap.badge")}</span>
          </div>
          <h1 style={{ fontSize: "clamp(44px,5.4vw,76px)", lineHeight: 1, fontWeight: 800, margin: 0, letterSpacing: "-.02em", color: "var(--text)" }}>
            {t("roadmap.h1pre")}{" "}
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{t("roadmap.h1accent")}</span>
          </h1>
          <p className="mx-auto" style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-dim)", margin: "24px auto 0", maxWidth: 560, fontWeight: 500 }}>{t("roadmap.sub")}</p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-[34px] pb-[14px] flex justify-center">
          <div className="inline-flex gap-[6px] flex-wrap justify-center" style={{ padding: 6, borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            {tabs.map((tab) => {
              const active = filter === tab.k;
              return (
                <button
                  key={tab.k}
                  onClick={() => {
                    setFilter(tab.k);
                    track("roadmap_filter", { filter: tab.k });
                  }}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    background: active ? "var(--grad)" : "transparent",
                    color: active ? "#fff" : "var(--text-dim)",
                    transition: "all .15s ease",
                  }}
                >
                  {tab.label} <span style={{ opacity: 0.6 }}>{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ITEMS */}
      <section style={{ background: "var(--bg)" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-[34px] pt-10 pb-24">
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[860px]:grid-cols-3 gap-5">
            {items.map((it) => {
              const meta = statusMeta[it.status];
              return (
                <div key={it.key} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 22, padding: "26px" }}>
                  <div style={{ display: "inline-block", padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: ".01em", ...meta.style }}>{meta.label}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, margin: "16px 0 8px", color: "var(--text)" }}>{t(`roadmap.i${it.key}Title`)}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{t(`roadmap.i${it.key}Body`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUEST CTA */}
      <section style={{ padding: "20px 20px 90px" }}>
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-[30px] flex-wrap" style={{ border: "1px solid var(--border)", borderRadius: 28, background: "var(--bg2)", padding: "54px 32px" }}>
          <div>
            <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 800, margin: "0 0 8px", color: "var(--text)", letterSpacing: "-.01em" }}>{t("roadmap.ctaTitle")}</h2>
            <p style={{ fontSize: 17, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>{t("roadmap.ctaSub")}</p>
          </div>
          <a href="/feedback" data-cta className="inline-flex items-center gap-[10px]" style={{ textDecoration: "none", whiteSpace: "nowrap", padding: "16px 28px", borderRadius: 14, background: "var(--grad)", color: "#fff", fontSize: 16, fontWeight: 800, boxShadow: "0 14px 30px -12px rgba(200,31,212,.7)" }}>{t("roadmap.ctaBtn")}</a>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
