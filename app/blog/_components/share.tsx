"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Link2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Brand glyphs (inline so we don't depend on deprecated lucide brand icons).
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const WhatsAppIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);
const RedditIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .956.516 1.789 1.282 2.251-.046.218-.073.438-.073.662 0 3.347 4.143 6.064 9.236 6.064 5.094 0 9.237-2.717 9.237-6.064 0-.223-.027-.443-.072-.661.766-.462 1.282-1.295 1.282-2.252zm-17.726 1.435c0-.795.65-1.442 1.448-1.442.797 0 1.446.647 1.446 1.442 0 .795-.649 1.443-1.446 1.443-.798 0-1.448-.648-1.448-1.443zm8.563 4.668c-.857.857-2.499.926-2.979.926-.481 0-2.123-.069-2.98-.926a.328.328 0 010-.464.33.33 0 01.464 0c.541.541 1.69.733 2.516.733.825 0 1.974-.192 2.515-.733a.328.328 0 11.464.464zm-.193-3.226c-.799 0-1.448-.648-1.448-1.443 0-.795.649-1.442 1.448-1.442.797 0 1.446.647 1.446 1.442 0 .795-.649 1.443-1.446 1.443z" />
  </svg>
);

function useShareContext() {
  const pathname = usePathname();
  const [data, setData] = React.useState({ url: "", title: "" });
  React.useEffect(() => {
    setData({
      url: window.location.href,
      title: document.title.replace(/\s*\|\s*Funlingo\s*$/, ""),
    });
  }, [pathname]);
  return data;
}

function buildLinks(url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { name: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { name: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { name: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
    { name: "Share on Reddit", href: `https://www.reddit.com/submit?url=${u}&title=${t}`, Icon: RedditIcon },
  ];
}

function CopyButton({ url, className }: { url: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it anywhere." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Couldn't copy link" });
    }
  };
  return (
    <button type="button" onClick={copy} aria-label="Copy link" className={className}>
      {copied ? <Check className="w-[18px] h-[18px]" /> : <Link2 className="w-[18px] h-[18px]" />}
    </button>
  );
}

const railBtn =
  "w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 hover:text-white hover:border-[#C642FC]/50 hover:bg-[#C642FC]/10 flex items-center justify-center transition-colors";

/** Desktop-only vertical share rail in the left gutter, sticky while reading. */
export function ShareRail() {
  const { url, title } = useShareContext();
  const [active, setActive] = React.useState(false);
  const pathname = usePathname();
  React.useEffect(() => {
    setActive(!!document.querySelector(".prose"));
  }, [pathname]);
  if (!active) return null;
  const links = buildLinks(url, title);
  return (
    <div
      className="hidden xl:flex flex-col items-center gap-2 fixed top-1/3"
      style={{ left: "calc(50% - 27.5rem)" }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1 [writing-mode:vertical-rl] rotate-180">
        Share
      </span>
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.name} className={railBtn}>
          <l.Icon className="w-[18px] h-[18px]" />
        </a>
      ))}
      <CopyButton url={url} className={railBtn} />
    </div>
  );
}

/** Horizontal share row for the end of an article (all screen sizes). */
export function ShareRow() {
  const { url, title } = useShareContext();
  const links = buildLinks(url, title);
  return (
    <div className="not-prose flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-white">Share this article</span>
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.name} className={railBtn}>
            <l.Icon className="w-[18px] h-[18px]" />
          </a>
        ))}
        <CopyButton url={url} className={railBtn} />
      </div>
    </div>
  );
}
