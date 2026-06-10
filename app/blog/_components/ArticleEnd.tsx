"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getRelatedPosts, accBadge, accBar, type BlogPost } from "../posts";
import { ShareRow } from "./share";

/**
 * End-of-article block rendered on every blog post: a share row plus a
 * "Continue reading" grid of related posts (same category first). It is
 * portaled in just before the page <footer> so it sits at the natural end of
 * the article without editing any of the 50 post files.
 */
export default function ArticleEnd() {
  const [mount, setMount] = React.useState<HTMLElement | null>(null);
  const [related, setRelated] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    // Only on article pages (skip the /blog index, which has no .prose).
    if (!document.querySelector(".prose")) return;
    const footer = document.querySelector("footer");
    if (!footer || !footer.parentNode) return;

    const slug = window.location.pathname.replace(/\/$/, "");
    setRelated(getRelatedPosts(slug, 3));

    const el = document.createElement("div");
    el.setAttribute("data-article-end", "");
    footer.parentNode.insertBefore(el, footer);
    setMount(el);
    return () => {
      el.remove();
    };
  }, []);

  if (!mount) return null;

  return createPortal(
    <section className="w-full max-w-3xl mx-auto px-6 pb-16">
      <div className="border-t border-white/10 pt-8">
        <ShareRow />
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Continue reading</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <Link key={post.id} href={post.slug} className="no-underline group">
                <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#C642FC]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${accBar(post.category)} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  <div className="p-5 flex flex-col h-full">
                    <span className={`w-fit px-2.5 py-0.5 rounded-full border text-xs font-medium mb-3 ${accBadge(post.category)}`}>
                      {post.category}
                    </span>
                    <h3 className="text-white font-semibold leading-snug group-hover:text-[#C642FC] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C642FC] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>,
    mount
  );
}
