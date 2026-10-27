"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useT } from "@/app/i18n/I18nProvider";
import { STORE_URL } from "@/app/_components/cta";
import { track } from "@/app/_components/track";
import { fadeOut, flyTo, pop, sparks } from "../celebrate";
import { glossWord, hasHiddenWords, hiddenToken, HIDDEN_COUNT, type Gloss, type HiddenSlot } from "./hlData";

/* The homepage behaves like the extension. Selecting a word anywhere on the
   page, or hovering one of five hidden words in the headings, opens a popup
   with its meaning in the language being learned, a play button and Save.
   Saved and found words collect in a "My Words" pill; finding all five sets
   off confetti. A one-time hint card points visitors at it. */

type Popup = {
  word: string;
  g: Gloss | null;
  x: number;
  y: number;
  above: boolean;
  hidden: boolean;
};

type Api = {
  open: (word: string, rect: DOMRect, hidden: boolean, display?: string) => void;
  closeSoon: (delay?: number) => void;
};

const Ctx = React.createContext<Api | null>(null);

const HINT_KEY = "funlingo-hl-hint";
const markHintSeen = () => {
  try {
    localStorage.setItem(HINT_KEY, "1");
  } catch {
    /* storage blocked */
  }
};

// Speak the learning-language word with a real voice for that language. If the
// device has no such voice, stay silent rather than reading it in the page's
// voice (that garbles it). Articles like "to", "the" and "el" are dropped.
function speakGloss(g: Gloss) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const text = (g.speakText || g.tr)
      .replace(/^(to|a|an|the) /i, "")
      .replace(/^(el|la|los|las|le|les|l'|il|lo|i|der|die|das) /i, "");
    const bcp = g.bcp;
    const base = bcp.split("-")[0].toLowerCase();
    const go = () => {
      const voices = synth.getVoices() || [];
      let best: SpeechSynthesisVoice | null = null;
      let bestScore = -1;
      for (const v of voices) {
        const vl = (v.lang || "").toLowerCase().replace("_", "-");
        let s = vl === bcp.toLowerCase() ? 50 : vl.split("-")[0] === base ? 35 : -1;
        if (s < 0) continue;
        if (/natural|neural|premium|enhanced|google|samantha|monica|paulina|amelie|kyoko|yuna|anna/i.test(v.name)) s += 18;
        if (v.localService) s += 4;
        if (/compact|espeak/i.test(v.name)) s -= 18;
        if (s > bestScore) {
          bestScore = s;
          best = v;
        }
      }
      if (voices.length && !best) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = bcp;
      if (best) u.voice = best;
      u.rate = 0.88;
      u.pitch = 1.02;
      synth.cancel();
      synth.speak(u);
    };
    if ((synth.getVoices() || []).length) go();
    else {
      synth.onvoiceschanged = () => {
        synth.onvoiceschanged = null;
        go();
      };
      setTimeout(go, 350);
    }
  } catch {
    /* speech unavailable */
  }
}

export function HighlightProvider({ learn, children }: { learn: string; children: React.ReactNode }) {
  const { t, locale } = useT();
  const [popup, setPopup] = React.useState<Popup | null>(null);
  const [found, setFound] = React.useState<string[]>([]);
  const foundRef = React.useRef<string[]>([]);
  const [myWords, setMyWords] = React.useState<{ key: string; w: string; tr: string }[]>([]);
  const [hintOn, setHintOn] = React.useState(false);
  const [pillOpen, setPillOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const countRef = React.useRef<HTMLSpanElement>(null);
  const popupRef = React.useRef<Popup | null>(null);
  popupRef.current = popup;
  const hidden = hasHiddenWords(locale);

  const close = React.useCallback((delay = 0) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => fadeOut(cardRef.current, () => setPopup(null), 160), delay);
  }, []);

  const confetti = React.useCallback(() => {
    const el = countRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    sparks(r, 18, 30);
    setTimeout(() => sparks(r, 14, 30), 180);
    setPillOpen(true);
  }, []);

  const open = React.useCallback(
    (word: string, rect: DOMRect, isHidden: boolean, display?: string) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      const g = glossWord(word, learn, locale);
      const x = Math.max(135, Math.min(window.innerWidth - 135, rect.left + rect.width / 2));
      const above = rect.top > 230;
      setPopup({
        word: (display ?? word).replace(/[^\p{L}\p{M}'’-]/gu, ""),
        g,
        x,
        y: above ? rect.top : rect.bottom,
        above,
        hidden: isHidden,
      });
      setHintOn(false);
      markHintSeen();
      if (isHidden && g) {
        if (!foundRef.current.includes(g.key)) {
          const next = [...foundRef.current, g.key];
          foundRef.current = next;
          setFound(next);
          track("hl_found", { word: g.key, found: next.length });
          if (next.length === HIDDEN_COUNT) setTimeout(confetti, 250);
        }
      } else {
        track("hl_lookup", { known: !!g });
      }
    },
    [learn, locale, confetti],
  );

  // Page-wide listeners: selecting a short run of text opens the popup for its
  // first word; pressing anywhere outside the popup or scrolling closes it; the
  // hint card appears once, after the visitor scrolls past the hero.
  React.useEffect(() => {
    setMounted(true);
    let hintEligible = false;
    try {
      hintEligible = hidden && !localStorage.getItem(HINT_KEY);
    } catch {
      hintEligible = hidden;
    }
    let selTimer: ReturnType<typeof setTimeout> | undefined;
    const onSel = () => {
      clearTimeout(selTimer);
      selTimer = setTimeout(() => {
        const sel = window.getSelection?.();
        if (!sel || sel.isCollapsed || !sel.rangeCount) return;
        const txt = String(sel).trim();
        if (!txt || txt.length > 40 || txt.split(/\s+/).length > 3) return;
        const a = sel.anchorNode;
        const node = a && (a.nodeType === 1 ? (a as Element) : a.parentElement);
        if (!node || node.closest("[data-hlpop],input,textarea,button,a,header,footer")) return;
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if (!rect.width) return;
        open(txt.split(/\s+/)[0], rect, false);
      }, 320);
    };
    const onDown = (e: PointerEvent) => {
      if (popupRef.current && !(e.target as Element).closest?.("[data-hlpop]")) {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setPopup(null);
      }
    };
    const onScroll = () => {
      if (hintEligible && window.scrollY > 700) {
        hintEligible = false;
        setHintOn(true);
      }
      if (popupRef.current) close(0);
    };
    document.addEventListener("selectionchange", onSel);
    document.addEventListener("pointerdown", onDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(selTimer);
      document.removeEventListener("selectionchange", onSel);
      document.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, close, hidden]);

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    const p = popup;
    if (!p?.g || myWords.some((m) => m.key === p.g!.key)) return;
    const g = p.g;
    setMyWords((list) => [...list, { key: g.key, w: p.word.toLowerCase(), tr: g.tr }]);
    track("hl_save", { word: g.key, lang: learn });
    const src = e.currentTarget.getBoundingClientRect();
    // The pill appears with the first save, so fly once it has rendered.
    requestAnimationFrame(() =>
      flyTo(p.word, src, countRef.current, () => {
        const el = countRef.current;
        if (!el) return;
        pop(el);
        sparks(el.getBoundingClientRect());
      }),
    );
    close(900);
  };

  const api = React.useMemo<Api>(() => ({ open, closeSoon: (d = 260) => close(d) }), [open, close]);

  const g = popup?.g ?? null;
  const isSaved = !!g && myWords.some((m) => m.key === g.key);
  const showPill = myWords.length > 0 || found.length > 0;
  const foundLine =
    found.length >= HIDDEN_COUNT ? t("home.hlAllFound") : `${found.length}/${HIDDEN_COUNT} ${t("home.hlFound")}`;

  const layer = (
    <>
      {popup && (
        <div
          data-hlpop
          onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
          onMouseLeave={() => close(220)}
          style={{
            position: "fixed",
            left: popup.x,
            top: popup.y,
            transform: popup.above ? "translate(-50%,-100%)" : "translate(-50%,0)",
            padding: popup.above ? "0 0 12px" : "12px 0 0",
            zIndex: 200,
          }}
        >
          <div
            ref={cardRef}
            data-popin
            style={{ width: 250, background: "#fff", borderRadius: 18, boxShadow: "0 22px 50px -12px rgba(80,10,80,.55)", padding: "15px 17px", textAlign: "start", fontFamily: "'Poppins',sans-serif", transformOrigin: "50% 100%", animation: "fnl-popin .22s cubic-bezier(.2,.8,.2,1) both" }}
          >
            {g ? (
              <div>
                <div className="flex items-baseline" style={{ gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#675579" }}>{popup.word}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".05em", color: "#C81FD4", textTransform: "uppercase" }}>{g.pos}</span>
                  <span style={{ marginInlineStart: "auto", padding: "2px 8px", borderRadius: 7, background: "#FBEEF8", color: "#C81FD4", fontSize: 11, fontWeight: 900 }}>{g.code}</span>
                </div>
                <button
                  type="button"
                  onClick={() => speakGloss(g)}
                  aria-label={t("home.hlPlay")}
                  className="flex items-center w-full"
                  style={{ gap: 10, padding: 0, border: "none", background: "transparent", cursor: "pointer", textAlign: "start", fontFamily: "'Poppins',sans-serif" }}
                >
                  <span className="flex items-center justify-center" style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: "#FBEEF8", color: "#C81FD4" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                      <path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 21, fontWeight: 800, lineHeight: 1.15, color: "#1B0F26" }}>{g.tr}</span>
                    {g.pron && <span style={{ display: "block", fontSize: 13, fontWeight: 600, fontStyle: "italic", color: "#7A4E72" }}>{g.pron}</span>}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="w-full"
                  style={{ marginTop: 12, border: "none", borderRadius: 11, padding: "9px 12px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 800, background: isSaved ? "rgba(236,77,176,.14)" : "linear-gradient(135deg,#BC22D6,#E0319E)", color: isSaved ? "#B81E8E" : "#fff" }}
                >
                  {isSaved ? t("home.webSaved") : t("home.webSave")}
                </button>
                {popup.hidden && (
                  <div style={{ marginTop: 10, fontSize: 12, fontWeight: 800, color: "#16B57F" }}>
                    {found.length >= HIDDEN_COUNT ? foundLine : `✓ ${foundLine}`}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1B0F26", marginBottom: 4 }}>“{popup.word}”</div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: "#675579", marginBottom: 12 }}>{t("home.hlUnknown")}</div>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta
                  className="flex items-center justify-center"
                  style={{ gap: 8, padding: "10px 12px", borderRadius: 12, background: "linear-gradient(135deg,#BC22D6,#E0319E)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 800 }}
                >
                  {t("cta.short")}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {hintOn && (
        <div
          className="fnl-hlhint flex items-start"
          role="status"
          style={{ position: "fixed", zIndex: 95, gap: 12, padding: "14px 16px", borderRadius: 18, background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 24px 50px -20px rgba(80,10,80,.45)", animation: "fnl-hintin .45s cubic-bezier(.2,.8,.2,1) both" }}
        >
          <span className="flex items-center justify-center" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 11, background: "var(--grad)", color: "#fff" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h9M4 17h6" />
            </svg>
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{t("home.hlHintT")}</div>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: "var(--text-dim)" }}>{t("home.hlHintB")}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setHintOn(false);
              markHintSeen();
            }}
            aria-label="Dismiss"
            style={{ flexShrink: 0, width: 28, height: 28, border: "none", borderRadius: "50%", background: "var(--chip)", color: "var(--text-dim)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}

      <div
        className="fnl-hlpill"
        aria-hidden={!showPill}
        style={{ position: "fixed", zIndex: 96, transition: "opacity .3s ease, transform .3s cubic-bezier(.2,.8,.2,1)", opacity: showPill ? 1 : 0, transform: showPill ? "none" : "translateY(16px) scale(.9)", pointerEvents: showPill ? "auto" : "none" }}
      >
        {pillOpen && (
          <div
            data-popin
            style={{ position: "absolute", right: 0, bottom: "calc(100% + 10px)", width: 280, padding: 16, borderRadius: 18, background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 24px 50px -18px rgba(80,10,80,.5)", animation: "fnl-popin .2s ease both", transformOrigin: "100% 100%" }}
          >
            <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-dim2)", marginBottom: 10 }}>{t("home.webMyWords")}</div>
            <div className="flex flex-wrap" style={{ gap: 7, marginBottom: 12 }}>
              {myWords.map((m) => (
                <div key={m.key} data-chipin className="flex items-center" style={{ gap: 6, padding: "6px 11px", borderRadius: 11, background: "var(--chip)", fontSize: 13, animation: "fnl-chipin .45s cubic-bezier(.2,1.2,.4,1) both" }}>
                  <span style={{ fontWeight: 700, color: "var(--text)" }}>{m.w}</span>
                  <span style={{ color: "#E0319E" }}>→</span>
                  <span style={{ fontWeight: 600, color: "var(--text-dim)" }}>{m.tr}</span>
                </div>
              ))}
            </div>
            {hidden && <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", marginBottom: 10 }}>{foundLine}</div>}
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta
              className="flex items-center justify-center"
              style={{ padding: "11px 12px", borderRadius: 12, background: "var(--grad)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 800 }}
            >
              {t("home.hlKeep")}
            </a>
          </div>
        )}
        <button
          type="button"
          onClick={() => setPillOpen((o) => !o)}
          aria-expanded={pillOpen}
          className="flex items-center"
          style={{ gap: 9, padding: "9px 16px 9px 9px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--surface)", boxShadow: "0 18px 40px -16px rgba(80,10,80,.5)", cursor: "pointer", fontFamily: "'Poppins',sans-serif" }}
        >
          <span ref={countRef} className="flex items-center justify-center" style={{ minWidth: 30, height: 30, padding: "0 8px", borderRadius: 999, background: "var(--grad)", color: "#fff", fontSize: 13, fontWeight: 900 }}>
            {myWords.length}
          </span>
          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{t("home.webMyWords")}</span>
          {hidden && found.length > 0 && (
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--pink)" }}>
              {found.length}/{HIDDEN_COUNT}
            </span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      {mounted && createPortal(layer, document.body)}
    </Ctx.Provider>
  );
}

/** Opens the shared popup from another component (null outside the provider). */
export const useHighlight = () => React.useContext(Ctx);

const hiddenStyle = (onDark: boolean): React.CSSProperties => ({
  textDecoration: `underline dashed ${onDark ? "rgba(255,255,255,.9)" : "#EC4DB0"}`,
  textDecorationThickness: 2,
  textUnderlineOffset: 5,
  textDecorationSkipInk: "none",
  cursor: "pointer",
  borderRadius: 6,
  transition: "background .15s ease",
});

/**
 * A heading with its hidden word underlined. Hover or tap opens the popup and
 * counts it as found. Renders the plain text when this page language has no
 * hidden word for the heading.
 */
export function HiddenWord({ slot, text, onDark = false }: { slot: Exclude<HiddenSlot, 0>; text: string; onDark?: boolean }) {
  const api = React.useContext(Ctx);
  const { locale } = useT();
  const tok = hiddenToken(locale, slot);
  const at = tok ? text.toLowerCase().indexOf(tok[0].toLowerCase()) : -1;
  if (!api || !tok || at < 0) return <>{text}</>;
  const shown = text.slice(at, at + tok[0].length);
  const openIt = (e: React.SyntheticEvent<HTMLSpanElement>) =>
    api.open(tok[1], e.currentTarget.getBoundingClientRect(), true, shown);
  return (
    <>
      {text.slice(0, at)}
      <span
        className={onDark ? "fnl-hidden fnl-hidden-dark" : "fnl-hidden"}
        onMouseEnter={openIt}
        onMouseLeave={() => api.closeSoon(260)}
        onClick={openIt}
        style={hiddenStyle(onDark)}
      >
        {shown}
      </span>
      {text.slice(at + tok[0].length)}
    </>
  );
}

/** The hero's gradient accent ("watch."), underlined as the first hidden word. */
export function HiddenAccent({ text, style }: { text: string; style: React.CSSProperties }) {
  const api = React.useContext(Ctx);
  const { locale } = useT();
  const tok = hiddenToken(locale, 0);
  if (!api || !tok) return <span style={style}>{text}</span>;
  const openIt = (e: React.SyntheticEvent<HTMLSpanElement>) =>
    api.open(tok[1], e.currentTarget.getBoundingClientRect(), true, text.replace(/[.。！!।]/g, ""));
  return (
    <span onMouseEnter={openIt} onMouseLeave={() => api.closeSoon(260)} onClick={openIt} style={{ ...style, ...hiddenStyle(false) }}>
      {text}
    </span>
  );
}
