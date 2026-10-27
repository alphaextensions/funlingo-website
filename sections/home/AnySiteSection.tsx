"use client";

import * as React from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { track } from "@/app/_components/track";
import { reducedMotion } from "./celebrate";
import { glossWord } from "./highlight/hlData";
import { useHighlight } from "./highlight/HighlightLayer";

/* "Works on every website, too." — Funlingo is not only a streaming-player
   tool. A mock browser shows an ordinary recipe blog and plays a short demo on
   a loop: a cursor glides to "delicious", highlights it, the word popup opens
   in the language picked in the hero, Save is pressed and the extension badge
   counts up. Hovering or touching the mock hands over to the visitor ("Your
   turn"), who can then select any word or tap "delicious" for the real popup. */

type Demo = {
  step: number; // 0 idle · 1 cursor moving · 2 highlighted · 3 popup · 4 Save pressed · 5 saved
  cx: number;
  cy: number;
  bw: number;
  saved: boolean;
};

export default function AnySiteSection({ learn = "es" }: { learn?: string }) {
  const { t, locale } = useT();
  const hl = useHighlight();
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const wordRef = React.useRef<HTMLSpanElement>(null);
  const badgeRef = React.useRef<HTMLSpanElement>(null);
  const [demo, setDemo] = React.useState<Demo>({ step: 0, cx: 0, cy: 0, bw: 400, saved: false });
  const [count, setCount] = React.useState(0);
  const [user, setUser] = React.useState(false);

  const g = glossWord("delicious", learn, locale);
  const code = g ? g.code : learn.split("-")[0].toUpperCase();

  // The demo loop. Each pass measures the word's position afresh, so it
  // follows layout changes (resizes, font loading).
  React.useEffect(() => {
    if (user) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };
    const run = () => {
      const body = bodyRef.current;
      const word = wordRef.current;
      if (!body || !word) return later(400, run);
      const b = body.getBoundingClientRect();
      const w = word.getBoundingClientRect();
      const wx = w.left - b.left + w.width / 2;
      const wy = w.top - b.top + w.height * 0.7;
      if (reducedMotion()) {
        setDemo({ step: 3, cx: wx, cy: wy, bw: b.width, saved: false });
        return;
      }
      const rest = { cx: b.width - 60, cy: b.height - 30 };
      const seq: [number, Partial<Demo>][] = [
        [0, { step: 0, ...rest, saved: false, bw: b.width }],
        [700, { step: 1, cx: wx, cy: wy }],
        [1700, { step: 2 }],
        [2200, { step: 3 }],
        [3300, { step: 4, cy: wy - 34 }],
        [3900, { step: 5, saved: true }],
        [6200, { step: 0, ...rest, saved: false }],
      ];
      for (const [at, patch] of seq) {
        later(at, () => {
          setDemo((d) => ({ ...d, ...patch }));
          if (patch.saved) {
            setCount((c) => c + 1);
            badgeRef.current?.animate(
              [{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
              { duration: 380, easing: "cubic-bezier(.2,1.4,.4,1)" },
            );
          }
        });
      }
      later(7100, () => {
        setCount(0);
        run();
      });
    };
    later(1200, run);
    return () => timers.forEach(clearTimeout);
  }, [user]);

  const takeOver = () => {
    if (user) return;
    setUser(true);
    setDemo((d) => ({ ...d, step: 0, saved: false }));
    track("anysite_demo_takeover", { lang: learn });
  };

  const steps = [t("home.webS1"), t("home.webS2"), t("home.webS3")];
  const showDemo = !user;
  const lit = showDemo && demo.step >= 2;

  return (
    <section style={{ background: "var(--bg2)" }}>
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
                <span className="text-[15px] min-[701px]:text-[15.5px]" style={{ fontWeight: 700, color: "var(--text)" }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mock browser */}
        <div
          onMouseEnter={takeOver}
          onTouchStart={takeOver}
          style={{ borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", overflow: "clip", boxShadow: "0 30px 70px -30px rgba(150,20,140,.45)" }}
        >
          <div className="flex items-center" style={{ gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <span className="flex" style={{ gap: 6 }} aria-hidden="true">
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
            </span>
            {/* The address bar hides on phones to give the article room. */}
            <span className="hidden min-[701px]:block" style={{ flex: 1, minWidth: 0, padding: "7px 14px", borderRadius: 999, background: "var(--chip)", fontSize: 13, fontWeight: 600, color: "var(--text-dim)", whiteSpace: "nowrap", overflow: "clip", textOverflow: "ellipsis" }}>
              grandmas-kitchen.blog/lemon-cake
            </span>
            <span ref={badgeRef} className="flex items-center" style={{ marginInlineStart: "auto", gap: 7, padding: "5px 10px 5px 6px", borderRadius: 999, background: "var(--pink-soft)", flexShrink: 0 }}>
              <img src="/assets/logo.png" alt="" style={{ height: 16, width: "auto", display: "block" }} />
              <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999, background: "var(--grad)", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {count}
              </span>
            </span>
          </div>

          <div ref={bodyRef} className="relative px-[18px] pt-[22px] pb-[26px] min-[701px]:px-8 min-[701px]:pt-[30px] min-[701px]:pb-[34px]">
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 8 }}>
              Recipes · 4 min read
            </div>
            <div className="text-[22px] min-[701px]:text-[28px]" style={{ fontWeight: 800, color: "var(--text)", letterSpacing: "-.01em", lineHeight: 1.15, marginBottom: 14 }}>
              Grandma&apos;s lemon cake
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-dim)", margin: "0 0 12px", fontWeight: 500 }}>
              Every Sunday, my grandma would bake this cake in her tiny kitchen. The whole street knew when it was in the oven.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, fontWeight: 500 }}>
              The recipe is easy: lemon, sugar, butter and a little patience. The result is simply{" "}
              <span
                ref={wordRef}
                onClick={(e) => user && hl?.open("delicious", e.currentTarget.getBoundingClientRect(), false)}
                style={{
                  padding: "1px 3px",
                  borderRadius: 5,
                  cursor: user ? "pointer" : "default",
                  color: lit ? "#1B0F26" : "inherit",
                  fontWeight: lit ? 700 : "inherit",
                  borderBottom: user ? "2px dashed var(--pink)" : "2px solid transparent",
                  backgroundImage: "linear-gradient(rgba(236,77,176,.35),rgba(236,77,176,.35))",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: lit ? "100% 100%" : "0% 100%",
                  transition: "background-size .45s ease",
                }}
              >
                delicious
              </span>
              .
            </p>

            {showDemo && demo.step >= 3 && (
              // Stays inside the mock at any width: centred on the cursor but
              // clamped half a popup-width from either edge.
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: Math.max(117, Math.min(demo.bw - 117, demo.cx)), top: demo.cy - 18, transform: "translate(-50%,-100%)", zIndex: 3 }}
              >
                <div data-popin style={{ width: 210, background: "#fff", borderRadius: 16, boxShadow: "0 18px 40px -12px rgba(80,10,80,.5)", padding: "13px 15px", textAlign: "start", transformOrigin: "50% 100%", animation: "fnl-popin .22s cubic-bezier(.2,.8,.2,1) both" }}>
                  <div className="flex items-baseline" style={{ gap: 7 }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#1B0F26" }}>delicious</span>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".05em", color: "#C81FD4", textTransform: "uppercase" }}>{g?.pos ?? "adj"}</span>
                    <span style={{ marginInlineStart: "auto", padding: "2px 7px", borderRadius: 6, background: "#FBEEF8", color: "#C81FD4", fontSize: 10, fontWeight: 900 }}>{code}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1B0F26", margin: "2px 0 10px" }}>{g?.tr ?? "delicioso"}</div>
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: 10,
                      padding: "8px 10px",
                      fontSize: 13,
                      fontWeight: 800,
                      background: demo.saved ? "rgba(236,77,176,.14)" : "linear-gradient(135deg,#BC22D6,#E0319E)",
                      color: demo.saved ? "#B81E8E" : "#fff",
                      transform: demo.step === 4 ? "scale(.96)" : "none",
                      transition: "all .2s ease",
                    }}
                  >
                    {demo.saved ? t("home.webSaved") : t("home.webSave")}
                  </div>
                </div>
              </div>
            )}

            {/* The demo cursor */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: demo.cx,
                top: demo.cy,
                zIndex: 4,
                pointerEvents: "none",
                opacity: showDemo ? 1 : 0,
                transition: "left .9s cubic-bezier(.45,0,.25,1), top .9s cubic-bezier(.45,0,.25,1), opacity .3s ease",
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,.25))",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M5 3l14 8-6 1.5L10 19z" fill="#1B0F26" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>

            {user && (
              <div className="inline-flex items-center" style={{ marginTop: 18, gap: 8, padding: "8px 14px", borderRadius: 999, background: "var(--pink-soft)", color: "var(--pink)", fontSize: 13, fontWeight: 800 }}>
                {t("home.webTurn")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
