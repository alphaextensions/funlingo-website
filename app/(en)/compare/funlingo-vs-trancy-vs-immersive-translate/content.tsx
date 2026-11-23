"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Minus } from "lucide-react";
import type { Strings } from "@/app/i18n/pages/compare";

export default function CompareContent({ s }: { s: Strings }) {
  // Check marks per row (Funlingo, Trancy, Immersive); text comes from `s`.
  const checks = [
    { fun: true, trancy: false, immersive: false },
    { fun: true, trancy: false, immersive: false },
    { fun: true, trancy: false, immersive: false },
    { fun: true, trancy: true, immersive: false },
    { fun: true, trancy: false, immersive: false },
    { fun: true, trancy: false, immersive: false },
  ];
  const tableRows = s.table.rows.map((row, i) => ({
    feature: row.feature,
    sub: row.sub,
    fun: { text: row.fun, check: checks[i]?.fun ?? false },
    trancy: { text: row.trancy, check: checks[i]?.trancy ?? false },
    immersive: { text: row.immersive, check: checks[i]?.immersive ?? false },
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Navbar currentPage="/compare" />
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[var(--bg)] to-[var(--bg)]">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mb-16">
          <Badge className="bg-[rgba(200,31,212,0.1)] text-[#C81FD4] border-[#C81FD4]/20 px-4 py-1.5 text-sm">{s.hero.badge}</Badge>
          <h1 className="font-heading-h1 text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] leading-tight">{s.hero.titleLine1}<br/>{s.hero.titleLine2}</h1>
          <p className="text-xl text-[var(--text-dim)] max-w-2xl">{s.hero.subtitle}</p>
        </div>

        <div className="w-full max-w-7xl mb-20">
          <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-sm">
            <div className="max-h-[600px] overflow-y-auto overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[800px] text-left border-collapse" aria-label={s.table.ariaLabel}>
                <thead className="sticky top-0 z-20 bg-[var(--surface)] shadow-sm">
                  <tr className="border-b border-[var(--border)]">
                    <th className="p-6 text-[var(--text-dim)] font-medium w-1/4">{s.table.featureHeader}</th>
                    <th className="p-6 text-[var(--text)] font-bold text-xl w-1/4 bg-[rgba(200,31,212,0.15)] border-t-2 border-t-[#C81FD4] border-b border-b-[#C81FD4]/20">{s.table.funlingoHeader}</th>
                    <th className="p-6 text-[var(--text-dim)] font-semibold w-1/4"><a href="https://www.trancy.org" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">{s.table.trancyHeader}</a></th>
                    <th className="p-6 text-[var(--text-dim)] font-semibold w-1/4"><a href="https://immersivetranslate.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[#C81FD4] transition-colors">{s.table.immersiveHeader}</a></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tableRows.map((row, i) => (
                    <tr key={i} className="group hover:bg-[var(--surface)] transition-colors">
                      <td className="p-6 text-[var(--text-dim)] font-medium"><h3 className="text-base font-semibold text-[var(--text)]">{row.feature}</h3>{row.sub && <span className="text-xs text-[var(--text-dim2)] block mt-1">{row.sub}</span>}</td>
                      <td className="p-6 bg-[rgba(200,31,212,0.05)]"><div className="flex items-start gap-2">{row.fun.check ? <Check className="w-5 h-5 text-green-400 mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-[var(--text-dim)] mt-1 shrink-0" />}<span className="text-sm text-[var(--text)]">{row.fun.text}</span></div></td>
                      <td className="p-6"><div className="flex items-start gap-2">{row.trancy.check ? <Check className="w-5 h-5 text-[var(--text-dim2)] mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-[var(--text-dim2)] mt-1 shrink-0" />}<span className="text-sm text-[var(--text-dim)]">{row.trancy.text}</span></div></td>
                      <td className="p-6"><div className="flex items-start gap-2">{row.immersive.check ? <Check className="w-5 h-5 text-[var(--text-dim2)] mt-1 shrink-0" /> : <Minus className="w-5 h-5 text-[var(--text-dim2)] mt-1 shrink-0" />}<span className="text-sm text-[var(--text-dim)]">{row.immersive.text}</span></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[var(--surface)] border-t border-[var(--border)] p-4 text-xs text-[var(--text-dim)] flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /><span>{s.table.legend.core}</span></div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--text-dim2)]" /><span>{s.table.legend.available}</span></div>
              <div className="flex items-center gap-2"><Minus className="w-4 h-4 text-[var(--text-dim2)]" /><span>{s.table.legend.limited}</span></div>
            </div>
            <style>{`.custom-scrollbar::-webkit-scrollbar{width:8px;height:8px}.custom-scrollbar::-webkit-scrollbar-track{background:rgba(255,255,255,0.05);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(200,31,212,0.3);border-radius:4px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(200,31,212,0.5)}`}</style>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full mb-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[var(--text)]">{s.why.title}</h2>
            <div className="space-y-4">
              {s.why.items.map((item, i) => (
                <div key={i} className="flex gap-3"><div className="mt-1 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-green-400" /></div><p className="text-[var(--text-dim)]">{item}</p></div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-center items-center text-center gap-6">
            <h3 className="text-2xl font-bold text-[var(--text)]">{s.cta.title}</h3>
            <p className="text-[var(--text-dim)]">{s.cta.body}</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[linear-gradient(135deg,#9A1C8E_0%,#C81FD4_100%)] h-12 px-8 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">{s.cta.button} <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
