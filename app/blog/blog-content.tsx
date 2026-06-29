"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts, accBadge } from "./posts";

const PAGE = 6;

// Posts ship a hero image at /blog-images/<slug>-hero.jpg.
const heroImg = (slug: string) =>
  `/blog-images/${slug.split("/").filter(Boolean).pop()}-hero.jpg`;

export default function BlogContent() {
  const featured = posts[0];
  const rest = posts.slice(1);
  const [visible, setVisible] = React.useState(PAGE);

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
            Latest insights &amp;{" "}
            <span
              style={{
                background: "var(--grad)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              guides
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
            Tips, tricks, and in-depth comparisons to supercharge your language
            learning journey.
          </p>
        </div>

        {/* Featured (latest) post */}
        {featured && (
          <Link href={featured.slug} className="no-underline group block mb-12">
            <div
              className="relative overflow-hidden rounded-[28px] border transition-all duration-300 group-hover:-translate-y-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[220px] lg:min-h-[340px] overflow-hidden" style={{ background: "var(--grad)" }}>
                  <img
                    src={heroImg(featured.slug)}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
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

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, visible).map((post) => (
            <Link key={post.id} href={post.slug} className="no-underline">
              <div
                className="relative h-full overflow-hidden rounded-[22px] border cursor-pointer group transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${accBadge(post.category)}`}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-dim2)" }}>
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-3" style={{ color: "var(--text)" }}>
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 mb-6" style={{ color: "var(--text-dim)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-auto border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-dim2)" }}>
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform" style={{ color: "var(--pink)" }}>
                      Read more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show more */}
        {visible < rest.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisible((v) => v + PAGE)}
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
                ({rest.length - visible} more)
              </span>
            </button>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
