"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { track } from "@/app/_components/track";

/* "Works on every website, too." — the 2026 redesign's pitch that Funlingo is
   not only a streaming-player tool. A mock browser shows an ordinary recipe
   blog with one word live: hover or tap it and the real word popup opens, in
   whichever language the visitor picked in the hero.

   The design also makes the whole marketing page selectable (five hidden
   words). That is a separate, larger interaction and is not built here. */

// [part of speech, es, fr, it, de, ko, ja, zh] — lifted from the design's own
// demo dictionary. Korean/Japanese/Chinese carry a romanisation after "|".
const DEMO_WORD: Record<string, [string, string, string, string, string, string, string, string]> = {
  delicious: ["adj", "delicioso", "délicieux", "delizioso", "lecker", "맛있는|masinneun", "おいしい|oishii", "好吃|hǎochī"],
};
const ORDER = ["es", "fr", "it", "de", "ko", "ja", "zh"] as const;

function demoGloss(word: string, learn: string) {
  const row = DEMO_WORD[word];
  if (!row) return { pos: "adj", tr: word, pron: "" };
  const base = learn.split("-")[0];
  const idx = ORDER.indexOf(base as (typeof ORDER)[number]);
  // English learners see the word itself — it is already English.
  const raw = idx >= 0 ? row[idx + 1] : word;
  const [tr, pron] = raw.split("|");
  return { pos: row[0], tr, pron: pron || "" };
}

export default function AnySiteSection({ learn = "es" }: { learn?: string }) {
  const { t } = useT();
  const [open, setOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const { pos, tr } = demoGloss("delicious", learn);
  const code = learn.split("-")[0].toUpperCase();

  const steps = [t("home.webS1"), t("home.webS2"), t("home.webS3")];

  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-[34px] py-16 min-[860px]:py-[104px] grid grid-cols-1 min-[860px]:grid-cols-[.85fr_1.15fr] gap-10 min-[860px]:gap-[54px] items-center">
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 14 }}>
            {t("home.webEyebrow")}
          </div>
          <h2 style={{ fontSize: "clamp(34px,4vw,50px)", fontWeight: 800, margin: 0, color: "var(--text)", letterSpacing: "-.02em", lineHeight: 1.05, textWrap: "balance" }}>
            {t("home.webH2")}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text-dim)", margin: "20px 0 0", maxWidth: "46ch", fontWeight: 500 }}>
            {t("home.webSub")}
          </p>

          <ol style={{ listStyle: "none", margin: "26px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
            {steps.map((s, i) => (
              <li key={i} className="flex items-center" style={{ gap: 13 }}>
                <span
                  aria-hidden="true"
                  style={{ width: 26, height: 26, flex: "0 0 26px", borderRadius: 8, background: "var(--pink-soft)", color: "var(--pink)", fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 15.5, fontWeight: 700, color: "var(--text)" }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mock browser */}
        <div style={{ borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", overflow: "clip", boxShadow: "0 30px 70px -30px rgba(150,20,140,.45)" }}>
          <div className="flex items-center" style={{ gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <span className="flex" style={{ gap: 6 }} aria-hidden="true">
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
            </span>
            <span style={{ flex: 1, minWidth: 0, padding: "7px 14px", borderRadius: 999, background: "var(--chip)", fontSize: 13, fontWeight: 600, color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis" }}>
              grandmas-kitchen.blog/lemon-cake
            </span>
            <span className="flex items-center" style={{ gap: 7, padding: "5px 10px 5px 6px", borderRadius: 999, background: "var(--pink-soft)", flexShrink: 0 }}>
              <img src="/assets/logo.png" alt="" style={{ height: 16, width: "auto", display: "block" }} />
              <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999, background: "var(--grad)", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {saved ? 1 : 0}
              </span>
            </span>
          </div>

          <div style={{ position: "relative", padding: "30px 32px 34px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 8 }}>
              Recipes · 4 min read
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-.01em", lineHeight: 1.15, marginBottom: 14 }}>
              Grandma&apos;s lemon cake
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-dim)", margin: "0 0 12px", fontWeight: 500 }}>
              Every Sunday, my grandma would bake this cake in her tiny kitchen. The whole street knew when it was in the oven.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>
              The recipe is easy: lemon, sugar, butter and a little patience. The result is simply{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                <button
                  type="button"
                  aria-expanded={open}
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  onClick={() => setOpen((v) => !v)}
                  style={{ font: "inherit", fontFamily: "inherit", color: "var(--text)", fontWeight: 700, cursor: "pointer", border: "none", borderBottom: "2px dashed var(--pink)", background: open ? "rgba(236,77,176,.3)" : "rgba(236,77,176,.14)", borderRadius: 6, padding: "1px 4px", transition: "background .15s ease" }}
                >
                  delicious
                </button>

                {open && (
                  <span
                    role="tooltip"
                    style={{ position: "absolute", left: "50%", bottom: "100%", transform: "translateX(-50%)", marginBottom: 10, width: 210, background: "#fff", borderRadius: 16, boxShadow: "0 18px 40px -12px rgba(80,10,80,.5)", padding: "13px 15px", zIndex: 5, textAlign: "left" }}
                  >
                    <span className="flex items-baseline" style={{ gap: 7 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: "#1B0F26" }}>delicious</span>
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: "#C81FD4", textTransform: "uppercase" }}>{pos}</span>
                      <span style={{ marginInlineStart: "auto", padding: "2px 7px", borderRadius: 6, background: "#FBEEF8", color: "#C81FD4", fontSize: 10, fontWeight: 900 }}>{code}</span>
                    </span>
                    <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#1B0F26", margin: "2px 0 10px" }}>{tr}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!saved) {
                          setSaved(true);
                          track("anysite_demo_save", { word: "delicious", lang: learn });
                        }
                      }}
                      style={{ width: "100%", border: "none", cursor: "pointer", borderRadius: 11, padding: "9px 12px", fontFamily: "inherit", fontSize: 13.5, fontWeight: 800, background: saved ? "rgba(236,77,176,.14)" : "var(--grad-2, linear-gradient(135deg,#BC22D6,#E0319E))", color: saved ? "#B81E8E" : "#fff" }}
                    >
                      {saved ? t("home.webSaved") : t("home.webSave")}
                    </button>
                  </span>
                )}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
