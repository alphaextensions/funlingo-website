// Small Web Animations helpers shared by the hero player and the
// highlight-a-word layer: a saved word flying into its counter, sparks, a "+1",
// a counter pop and a popup fading out. All are decorative, so each one is a
// no-op (or finishes at once) for visitors who ask for less motion.

const SPARK_COLOURS = ["#BC22D6", "#E0319E", "#EC4DB0", "#F5A623", "#16B57F", "#C81FD4"];

export function reducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

const cleanWord = (text: string) => text.replace(/[^\p{L}\p{M}'’-]/gu, "");

/** A gradient chip with `text` flies in an arc from `src` into `target`, then calls `done`. */
export function flyTo(text: string, src: DOMRect | null, target: Element | null, done?: () => void) {
  if (!src || !target || reducedMotion() || typeof document === "undefined") {
    done?.();
    return;
  }
  try {
    const dst = target.getBoundingClientRect();
    const fly = document.createElement("div");
    fly.textContent = cleanWord(text);
    Object.assign(fly.style, {
      position: "fixed",
      left: `${src.left + src.width / 2}px`,
      top: `${src.top + src.height / 2}px`,
      zIndex: "9999",
      pointerEvents: "none",
      padding: "7px 14px",
      borderRadius: "999px",
      background: "linear-gradient(135deg,#BC22D6,#E0319E)",
      color: "#fff",
      font: "800 15px 'Poppins',sans-serif",
      boxShadow: "0 14px 30px -10px rgba(200,31,212,.8)",
      whiteSpace: "nowrap",
      transform: "translate(-50%,-50%)",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(fly);
    const dx = dst.left + dst.width / 2 - (src.left + src.width / 2);
    const dy = dst.top + dst.height / 2 - (src.top + src.height / 2);
    const lift = Math.min(-60, dy * 0.25 - 80);
    const anim = fly.animate(
      [
        { transform: "translate(-50%,-50%) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * 0.45}px), calc(-50% + ${lift}px)) scale(1.15) rotate(-6deg)`, opacity: 1, offset: 0.45 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.35) rotate(4deg)`, opacity: 0.2 },
      ],
      { duration: 720, easing: "cubic-bezier(.45,0,.25,1)" },
    );
    anim.onfinish = () => {
      fly.remove();
      done?.();
    };
  } catch {
    done?.();
  }
}

/** The counter grows 1.45× with a soft ring and springs back. */
export function pop(el: Element | null) {
  if (!el || reducedMotion()) return;
  el.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.45)", boxShadow: "0 0 0 8px rgba(236,77,176,.25)" },
      { transform: "scale(1)" },
    ],
    { duration: 420, easing: "cubic-bezier(.2,1.4,.4,1)" },
  );
}

/** `n` small coloured sparks burst out from the centre of `r`. */
export function sparks(r: DOMRect, n = 10, spread = 16) {
  if (reducedMotion() || typeof document === "undefined") return;
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.4;
    const d = 26 + Math.random() * spread;
    Object.assign(p.style, {
      position: "fixed",
      left: `${cx}px`,
      top: `${cy}px`,
      width: "7px",
      height: "7px",
      borderRadius: i % 2 ? "2px" : "50%",
      background: SPARK_COLOURS[i % SPARK_COLOURS.length],
      zIndex: "9999",
      pointerEvents: "none",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(p);
    p.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(ang) * d}px), calc(-50% + ${Math.sin(ang) * d}px)) scale(.2)`, opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)" },
    ).onfinish = () => p.remove();
  }
}

/** A pink "+1" rises off the centre of `r` and fades. */
export function plusOne(r: DOMRect) {
  if (reducedMotion() || typeof document === "undefined") return;
  const plus = document.createElement("span");
  plus.textContent = "+1";
  Object.assign(plus.style, {
    position: "fixed",
    left: `${r.left + r.width / 2}px`,
    top: `${r.top + r.height / 2 - 14}px`,
    zIndex: "9999",
    pointerEvents: "none",
    font: "900 14px 'Poppins',sans-serif",
    color: "#E0319E",
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(plus);
  plus.animate(
    [
      { transform: "translate(-50%,0)", opacity: 1 },
      { transform: "translate(-50%,-26px)", opacity: 0 },
    ],
    { duration: 700, easing: "ease-out" },
  ).onfinish = () => plus.remove();
}

/** Fades and drops `el` out, then calls `done`. Calls `done` at once without motion. */
export function fadeOut(el: Element | null, done: () => void, duration = 140) {
  if (!el || reducedMotion() || !("animate" in el)) {
    done();
    return;
  }
  const a = el.animate(
    [
      { opacity: 1, transform: "none" },
      { opacity: 0, transform: "translateY(6px) scale(.96)" },
    ],
    { duration, easing: "ease-in", fill: "forwards" },
  );
  a.onfinish = done;
}
