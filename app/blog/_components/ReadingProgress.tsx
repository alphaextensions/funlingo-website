"use client";

import * as React from "react";

/**
 * Thin gradient bar at the top of the viewport that tracks reading progress
 * through a blog article. Renders only on pages that contain a `.prose`
 * article (so it's a no-op on the /blog index), and updates via rAF-throttled
 * scroll for smoothness. Uses a CSS scaleX transform driven by --scroll.
 */
export default function ReadingProgress() {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const article = document.querySelector<HTMLElement>(".prose");
    if (!article) return;
    setActive(true);

    let ticking = false;
    const update = () => {
      ticking = false;
      const start = article.offsetTop;
      const end = start + article.offsetHeight - window.innerHeight;
      const progress =
        end <= start
          ? 1
          : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      if (ref.current) {
        ref.current.style.setProperty("--scroll", String(progress));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!active) return null;
  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}
