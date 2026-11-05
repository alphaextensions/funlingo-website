"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { List, ChevronDown } from "lucide-react";

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
 * touching the individual content files. It scans the rendered `.prose`
 * article for h2/h3 headings, injects stable ids, and renders:
 *   - a sticky "On this page" sidebar in the right gutter on xl+ screens
 *   - an inline collapsible card at the top of the article on smaller screens
 *     (portaled into the article so it never collides with the chat widget /
 *     back-to-top button in the bottom-right corner)
 * If no article or fewer than 2 headings are found, it renders nothing.
 */
export default function TableOfContents() {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [mount, setMount] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();

  React.useEffect(() => {
    // Reset for the new route — these run inside app/blog/layout.tsx, which
    // persists across client-side navigation between posts.
    setHeadings([]);
    setActiveId("");
    setMount(null);
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
      const base = node.id || slugify(text);
      if (!base) continue;
      let unique = base;
      let n = 2;
      while (used.has(unique)) unique = `${base}-${n++}`;
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

    // Mount point for the inline (mobile/tablet) TOC at the top of the article.
    const el = document.createElement("div");
    el.setAttribute("data-toc-inline", "");
    article.insertBefore(el, article.firstChild);
    setMount(el);

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
      const node = document.getElementById(h.id);
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      el.remove();
    };
  }, [pathname]);

  if (headings.length < 2) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
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
                ? "border-[#C81FD4] text-[#C81FD4]"
                : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--border)]"
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
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-dim2)] mb-3">
          On this page
        </p>
        {list}
      </nav>

      {/* Mobile / tablet: inline collapsible card at the top of the article */}
      {mount &&
        createPortal(
          <nav
            aria-label="Table of contents"
            className="xl:hidden not-prose mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                <List className="w-4 h-4 text-[#C81FD4]" />
                On this page
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-dim)] transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && <div className="px-5 pb-4 pt-1">{list}</div>}
          </nav>,
          mount
        )}
    </>
  );
}
