import * as React from "react";
import { CHIP_DOT, type Cover } from "../covers";

/**
 * A branded cover: a mock player frame with one dual-subtitle line, a
 * highlighted word and its translation. Fills its (positioned) parent.
 * "card" sizes it for the blog grid, "hero" for the top of an article.
 */
export default function BlogCover({ cover, size = "card" }: { cover: Cover; size?: "card" | "hero" }) {
  const hero = size === "hero";
  const chipPad = hero ? "6px 11px" : "4px 9px";
  const chipFont = hero ? 11 : 10;
  const inset = hero ? 20 : 14;
  return (
    <span
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "radial-gradient(130% 110% at 72% 6%, #4A1F6E 0%, #2B1240 44%, #140A22 100%)" }}
    >
      <span style={{ position: "absolute", top: -40, right: -30, width: hero ? 260 : 160, height: hero ? 260 : 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,77,176,.45), rgba(236,77,176,0) 70%)" }} />
      <span style={{ position: "absolute", top: hero ? 18 : 12, left: inset, display: "flex", alignItems: "center", gap: 6, padding: chipPad, borderRadius: 999, background: "rgba(8,4,16,.5)" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: CHIP_DOT[cover.chip] ?? "#E50914" }} />
        <span style={{ color: "rgba(255,255,255,.92)", fontSize: chipFont, fontWeight: 800, letterSpacing: ".06em" }}>{cover.chip}</span>
      </span>
      <span style={{ position: "absolute", top: hero ? 18 : 12, right: inset, padding: chipPad, borderRadius: 999, background: "linear-gradient(135deg,#BC22D6,#E0319E)", color: "#fff", fontSize: chipFont, fontWeight: 800, letterSpacing: ".06em" }}>
        {cover.pair}
      </span>
      <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%", background: "linear-gradient(to top, rgba(8,4,16,.9), rgba(8,4,16,0))" }} />
      <span
        dir="ltr"
        style={{ position: "absolute", left: hero ? 28 : 16, right: hero ? 28 : 16, bottom: hero ? 30 : 16, display: "flex", flexDirection: "column", alignItems: "center", gap: hero ? 8 : 5, textAlign: "center" }}
      >
        <span style={{ color: "#fff", fontSize: hero ? "clamp(22px,3vw,32px)" : 17, fontWeight: 700, lineHeight: 1.25, textShadow: "0 2px 12px rgba(0,0,0,.6)" }}>
          {cover.pre}
          <span style={{ padding: hero ? "0 6px" : "0 4px", borderRadius: 8, background: "rgba(236,77,176,.22)", textDecoration: "underline dashed #EC4DB0", textDecorationThickness: 2, textUnderlineOffset: 4 }}>
            {cover.hw}
          </span>
          {cover.post}
        </span>
        <span style={{ color: "#F277C0", fontSize: hero ? "clamp(15px,1.8vw,19px)" : 13, fontWeight: 600, textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>{cover.tr}</span>
      </span>
    </span>
  );
}
