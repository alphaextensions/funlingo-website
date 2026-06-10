"use client";

import * as React from "react";
import { List, X } from "lucide-react";

type Heading = { id: string; text: string; level: 2 | 3 };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Auto-generated table of contents for blog posts.
 *
 * Rendered once via app/blog/layout.tsx so it applies to every post without
 * touching the 50 individual content files. It scans the rendered `.prose`
 * article for h2/h3 headings, injects stable ids, and renders:
 *   - a sticky "On this page" sidebar in the right gutter on xl+ screens
 *   - a floating button + dropdown panel on smaller screens
 * If no article (e.g. the /blog index) or fewer than 2 headings are found,
 * it renders nothing.
 */
export default function TableOfContents() {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const article = document.querySelector<HTMLElement>(".prose");
    if (!article) return;

    const nodes = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );
    const used = new Set<string>();
    const collected: Heading[] = [];

    for (const node of nodes) {
      const text = (node.textContent || "").trim();
      if (!text) continue;
      let id = node.id || slugify(text);
      if (!id) continue;
      // De-duplicate ids so anchors stay unique.
      let unique = id;
      let n = 2;
      while (used.has(unique)) unique = `${id}-${n++}`;
      used.add(unique);
      node.id = unique;
      node.style.scrollMarginTop = "88px";
      collected.push({
        id: unique,
        text,
        level: node.tagName === "H3" ? 3 : 2,
      });
    }

    if (collected.length < 2) return;
    setHeadings(collected);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );
    collected.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setOpen(false);
    }
  };

  const list = (
    <ul className="flex flex-col gap-1 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
          <a
            href={`#${h.id}`}
            onClick={(e) => handleClick(e, h.id)}
            className={`block py-1 leading-snug transition-colors border-l-2 pl-3 ${
              activeId === h.id
                ? "border-[#C642FC] text-[#C642FC]"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
            } ${h.level === 3 ? "text-[13px]" : ""}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar in the right gutter beside centered content */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block fixed top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
        style={{ left: "calc(50% + 25rem)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          On this page
        </p>
        {list}
      </nav>

      {/* Mobile / tablet: floating button + dropdown panel */}
      <div className="xl:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle table of contents"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
        >
          {open ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
          Contents
        </button>
        {open && (
          <div className="fixed bottom-24 right-6 z-50 w-72 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur p-5 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              On this page
            </p>
            {list}
          </div>
        )}
      </div>
    </>
  );
}
