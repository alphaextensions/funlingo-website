"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts, accBadge } from "./posts";
import { coverFor } from "./covers";
import type { BlogMeta } from "./blogMeta";
import BlogCover from "./_components/BlogCover";
import { track } from "@/app/_components/track";

const PAGE = 9;

const slugOf = (slug: string) => slug.split("/").filter(Boolean).pop() ?? "";
// Posts with photography ship a hero image at /blog-images/<slug>-hero.jpg.
const heroImg = (slug: string) => `/blog-images/${slugOf(slug)}-hero.jpg`;

export default function BlogContent({ meta }: { meta: BlogMeta }) {
  const featured = posts[0];
  const hasPhoto = (slug: string) => meta.photos.includes(slugOf(slug));
  const readOf = (slug: string) => meta.read[slugOf(slug)] ?? "";
  const [filter, setFilter] = React.useState("All");
  const [visible, setVisible] = React.useState(PAGE);

  // Category tabs — only categories that actually have posts, with counts.
  const categories = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of posts) counts[p.category] = (counts[p.category] || 0) + 1;
    const cats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return [
      { key: "All", count: posts.length },
      ...cats.map((c) => ({ key: c, count: counts[c] })),
    ];
  }, []);

  const showFeatured = filter === "All";
  const gridPosts =
    filter === "All"
      ? posts.slice(1)
      : posts.filter((p) => p.category === filter);

  const pickFilter = (c: string) => {
    setFilter(c);
    setVisible(PAGE);
    track("blog_filter", { category: c });
  };

  return (
    <div className="fnl-root flex flex-col min-h-screen overflow-x-hidden">
      <Navbar currentPage="/blog" />

      <main className="flex-1 w-full max-w-[1240px] mx-auto px-5 sm:px-[34px] py-16 sm:py-24">
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-14">
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--pink)",
              marginBottom: 14,
            }}
          >
            Our Blog
          </div>
          <h1
            style={{
              fontSize: "clamp(40px,5vw,64px)",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-.02em",
              lineHeight: 1.04,
              color: "var(--text)",
            }}
          >
            Tips, guides &amp;{" "}
            <span
              style={{
                background: "var(--grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              honest comparisons.
            </span>
          </h1>
          <p
            className="mx-auto"
            style={{
              fontSize: 20,
              lineHeight: 1.55,
              color: "var(--text-dim)",
              margin: "20px auto 0",
              maxWidth: 560,
              fontWeight: 500,
            }}
          >
            Everything to learn a language faster from the shows, videos and
            courses you already watch.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex flex-wrap justify-center gap-[6px] p-[6px] rounded-full"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            {categories.map((c) => {
              const active = filter === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => pickFilter(c.key)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "9px 16px",
                    borderRadius: 999,
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    background: active ? "var(--grad)" : "transparent",
                    color: active ? "#fff" : "var(--text-dim)",
                  }}
                >
                  {c.key} <span style={{ opacity: 0.6 }}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured (latest) post */}
        {showFeatured && featured && (
          <Link href={featured.slug} className="no-underline group block mb-12">
            <div
              className="relative overflow-hidden rounded-[28px] border transition-all duration-300 group-hover:-translate-y-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[220px] lg:min-h-[340px] overflow-hidden" style={{ background: "var(--grad)" }}>
                  {hasPhoto(featured.slug) ? (
                    <img src={heroImg(featured.slug)} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <BlogCover cover={coverFor(featured.slug, featured.category)} size="hero" />
                  )}
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-extrabold"
                    style={{ background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)" }}
                  >
                    ★ Latest
                  </span>
                </div>
                <div className="p-6 sm:p-10 flex flex-col justify-center gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--text-dim2)" }}>
                    <span className={`px-2.5 py-0.5 rounded-full border ${accBadge(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{featured.author}</span>
                    {readOf(featured.slug) && <span>{readOf(featured.slug)}</span>}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight transition-colors" style={{ color: "var(--text)" }}>
                    {featured.title}
                  </h2>
                  <p className="line-clamp-3 sm:line-clamp-4" style={{ color: "var(--text-dim)" }}>{featured.excerpt}</p>
                  <div className="flex items-center gap-2 font-semibold mt-1" style={{ color: "var(--pink)" }}>
                    Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid. Every post's card is in the page so search engines can follow
            every link; cards past "Show more" are just hidden. */}
        <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post, i) => {
            const photo = hasPhoto(post.slug);
            const read = readOf(post.slug);
            return (
              <Link
                key={post.id}
                href={post.slug}
                className="fnl-blogcard no-underline flex-col overflow-hidden rounded-[22px] border"
                style={{ display: i < visible ? "flex" : "none", background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 9", background: "var(--grad)" }}>
                  {photo ? (
                    <img src={heroImg(post.slug)} alt={post.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <BlogCover cover={coverFor(post.slug, post.category)} />
                  )}
                </div>
                <div className="flex flex-col flex-1" style={{ padding: "20px 22px 22px" }}>
                  <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
                    <span style={{ padding: "4px 11px", borderRadius: 999, background: "var(--pink-soft)", color: "var(--pink)", fontSize: 12, fontWeight: 800 }}>
                      {post.category}
                    </span>
                    <time style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dim2)" }}>{post.date}</time>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 9px", color: "var(--text)", lineHeight: 1.3, textWrap: "balance" }}>
                    {post.title}
                  </h3>
                  <p className="line-clamp-3" style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-dim)", margin: "0 0 16px", fontWeight: 500 }}>
                    {post.excerpt}
                  </p>
                  <span className="flex items-center justify-between" style={{ marginTop: "auto", fontSize: 14, fontWeight: 800, color: "var(--pink)" }}>
                    <span>Read article →</span>
                    {read && <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-dim2)" }}>{read}</span>}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Show more */}
        {visible < gridPosts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                const next = visible + PAGE;
                setVisible(next);
                track("blog_show_more", { shown: Math.min(next, gridPosts.length) });
              }}
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{
                padding: "14px 30px",
                fontSize: 15,
                color: "var(--text)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              Show more
              <span style={{ color: "var(--text-dim2)", fontWeight: 600 }}>
                ({gridPosts.length - visible})
              </span>
            </button>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
