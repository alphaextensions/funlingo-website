"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRelatedPosts, type BlogPost } from "../posts";

/**
 * End-of-article block rendered on every blog post: a "Keep reading" grid of
 * related posts (same category first), each with its reading time. It is
 * portaled in just before the page <footer> so it sits at the natural end of
 * the article without editing any of the 50 post files.
 */
export default function ArticleEnd({ read }: { read: Record<string, string> }) {
  const [mount, setMount] = React.useState<HTMLElement | null>(null);
  const [related, setRelated] = React.useState<BlogPost[]>([]);
  const pathname = usePathname();

  React.useEffect(() => {
    // Reset for the new route — this component lives in the persistent blog
    // layout, so it must re-run on client-side navigation between posts.
    setMount(null);
    setRelated([]);
    // Only on article pages (skip the /blog index, which has no .prose).
    if (!document.querySelector(".prose")) return;
    const footer = document.querySelector("footer");
    if (!footer || !footer.parentNode) return;

    const slug = (pathname || window.location.pathname).replace(/\/$/, "");
    setRelated(getRelatedPosts(slug, 3));

    const el = document.createElement("div");
    el.setAttribute("data-article-end", "");
    footer.parentNode.insertBefore(el, footer);
    setMount(el);
    return () => {
      el.remove();
    };
  }, [pathname]);

  if (!mount) return null;

  return createPortal(
    <section className="w-full max-w-3xl mx-auto px-6 pb-16">
      {related.length > 0 && (
        <div className="border-t border-[var(--border)] pt-10">
          <h2 className="text-[26px] font-extrabold text-[var(--text)] mb-5">Keep reading</h2>
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <Link
                key={post.id}
                href={post.slug}
                className="fnl-blogcard no-underline flex flex-col gap-2 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[22px] text-[var(--text)]"
              >
                <span className="text-[12px] font-extrabold tracking-[.06em] uppercase text-[var(--pink)]">{post.category}</span>
                <span className="text-[17px] font-bold leading-[1.3]">{post.title}</span>
                {read[post.slug.split("/").pop() ?? ""] && (
                  <span className="mt-auto text-[14px] font-semibold text-[var(--text-dim)]">{read[post.slug.split("/").pop() ?? ""]}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>,
    mount
  );
}
