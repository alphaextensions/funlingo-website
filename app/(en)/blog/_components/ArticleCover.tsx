"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { coverFor } from "../covers";
import { posts } from "../posts";
import BlogCover from "./BlogCover";

/**
 * Posts without photography get their branded cover at full width under the
 * title, the same one their blog card shows. Posts with a photo already show
 * it in their content, so this renders nothing for them. Portaled in just
 * above the article body so none of the post files need editing.
 */
export default function ArticleCover({ photos }: { photos: string[] }) {
  const [mount, setMount] = React.useState<HTMLElement | null>(null);
  const pathname = usePathname();
  const slug = (pathname || "").replace(/\/$/, "").split("/").pop() ?? "";

  React.useEffect(() => {
    setMount(null);
    if (!slug || photos.includes(slug)) return;
    // Only on article pages (the /blog index has no .prose).
    const body = document.querySelector(".prose");
    if (!body || !body.parentNode) return;
    const el = document.createElement("div");
    el.setAttribute("data-article-cover", "");
    body.parentNode.insertBefore(el, body);
    setMount(el);
    return () => {
      el.remove();
    };
  }, [slug, photos]);

  if (!mount) return null;
  const post = posts.find((p) => p.slug === `/blog/${slug}`);
  return createPortal(
    <figure style={{ margin: "0 0 32px" }}>
      <span
        role="img"
        aria-label={post?.title ?? ""}
        style={{ position: "relative", display: "block", width: "100%", aspectRatio: "16 / 9", borderRadius: 22, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 30px 70px -36px rgba(150,20,140,.45)" }}
      >
        <BlogCover cover={coverFor(slug, post?.category)} size="hero" />
      </span>
    </figure>,
    mount,
  );
}
