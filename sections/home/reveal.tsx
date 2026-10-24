"use client";

import * as React from "react";

/* Scroll choreography from the 2026 redesign.

   Reveal: content fades in and rises 28px as it enters the viewport, with
   children staggered 90ms apart. Two rules keep it from being annoying:

     - anything already on screen at first paint is NOT animated, so the page
       never flickers on load;
     - sections jumped past (anchor links, Page Down, restored scroll) still
       end up visible rather than stuck at opacity 0.

   CountUp: a number rolls to its final value once, over 1.4s, when it scrolls
   into view — and always lands on exactly the string it was given, so locale
   formatting, suffixes and symbols survive untouched.

   Both no-op under prefers-reduced-motion. */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Fires once when the element first intersects. */
function useInView<T extends HTMLElement>(enabled: boolean) {
  const ref = React.useRef<T | null>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!enabled || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    // Already on screen at mount: show immediately, never animate.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return { ref, seen };
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: {
  children: React.ReactNode;
  /** stagger in ms — the design uses 90ms between siblings */
  delay?: number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, seen } = useInView<HTMLDivElement>(!reduced);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(reduced
          ? null
          : {
              opacity: seen ? 1 : 0,
              transform: seen ? "none" : "translateY(28px)",
              transition: `opacity .6s cubic-bezier(.2,.7,.3,1) ${delay}ms, transform .6s cubic-bezier(.2,.7,.3,1) ${delay}ms`,
            }),
      }}
    >
      {children}
    </Tag>
  );
}

/** Staggers its children by `step` ms, in document order. */
export function RevealGroup({
  children,
  step = 90,
  className,
  style,
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, i) => (
        <Reveal delay={i * step}>{child}</Reveal>
      ))}
    </div>
  );
}

/* ── CountUp ──────────────────────────────────────────────────────────────
   `value` is the literal string that must appear when the animation ends —
   "20,000+", "4.8", "50%", "~30%". We animate only the digits inside it and
   restore the exact original string on the final frame, so thousands
   separators, decimals, prefixes and suffixes are never reformatted. */
export function CountUp({
  value,
  duration = 1400,
  className,
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, seen } = useInView<HTMLSpanElement>(!reduced);
  const [shown, setShown] = React.useState<string>(() => (reduced ? value : value));
  const started = React.useRef(false);

  // The first run of digits in the string, e.g. "20,000" in "20,000+".
  const match = React.useMemo(() => value.match(/[\d][\d.,]*/), [value]);

  React.useEffect(() => {
    if (reduced || !seen || started.current || !match) {
      if (reduced || !match) setShown(value);
      return;
    }
    started.current = true;

    const raw = match[0];
    const decimals = (raw.split(".")[1] || "").length;
    const target = parseFloat(raw.replace(/,/g, ""));
    if (!isFinite(target)) {
      setShown(value);
      return;
    }
    const grouped = raw.includes(",");
    const t0 = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      if (p >= 1) {
        setShown(value); // land on the exact original string
        return;
      }
      const n = target * eased;
      const body = grouped
        ? n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      setShown(value.replace(raw, body));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, reduced, value, duration, match]);

  return (
    <span ref={ref} className={className} style={style}>
      {shown}
    </span>
  );
}
