"use client";

import * as React from "react";
import Link from "next/link";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";

// Small shared pieces for the /learn pages, styled with the site's design tokens.

export function LearnShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fnl-root min-h-screen overflow-x-hidden">
      <Navbar currentPage="/learn" />
      <main className="max-w-[920px] mx-auto px-4 sm:px-[34px] pt-10 min-[860px]:pt-16 pb-20">{children}</main>
      <FooterSection />
    </div>
  );
}

const pill = "inline-flex items-center justify-center gap-2 rounded-full h-12 px-6 text-[15px] font-semibold";

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} data-cta className={`${pill} text-white`} style={{ background: "var(--grad)" }}>
      {children}
    </Link>
  );
}

export function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-cta
      className={`${pill} border`}
      style={{ background: "var(--chip)", borderColor: "var(--border)", color: "var(--text)" }}
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${pill} text-white disabled:opacity-40`}
      style={{ background: "var(--grad)" }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${pill} border`}
      style={{ background: "var(--chip)", borderColor: "var(--border)", color: "var(--text)" }}
    >
      {children}
    </button>
  );
}

export function ProgressRing({ pct, size = 44 }: { pct: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${pct}% complete`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bc22d6" />
          <stop offset="100%" stopColor="#e0319e" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--chip)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={size * 0.27}
        fontWeight={700}
        fill="var(--text)"
      >
        {pct}%
      </text>
    </svg>
  );
}

export function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-[5px] w-full rounded-full overflow-hidden" style={{ background: "var(--chip)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--grad)" }} />
    </div>
  );
}
