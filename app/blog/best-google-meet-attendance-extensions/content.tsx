"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BestGoogleMeetAttendanceExtensionsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Comparison</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">5 Best Google Meet Attendance Extensions (2026) &mdash; Tested &amp; Compared</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 23, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Five Chrome extensions claim to track attendance in Google Meet. They are not all the same. Some are genuinely free; some pretend to be free until you hit a paywall. Some store your roster on their cloud; one keeps it on your laptop. Some count Otter or Read.ai as &quot;attendees&quot; because those bots joined your call; one filters them out. This is the honest version of which one to install &mdash; including when each one is the wrong choice.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Quick Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 my-8">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase tracking-wider bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Tool</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Signup</th>
                  <th className="px-4 py-3">Late flags</th>
                  <th className="px-4 py-3">Bot filter</th>
                  <th className="px-4 py-3">Local data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="bg-[rgba(198,66,252,0.08)]"><td className="px-4 py-3 font-bold text-white">Trackr <span className="ml-1 text-xs text-[#C642FC]">★ Best free</span></td><td className="px-4 py-3">Free forever</td><td className="px-4 py-3">No</td><td className="px-4 py-3">✓</td><td className="px-4 py-3">✓</td><td className="px-4 py-3">✓</td></tr>
                <tr><td className="px-4 py-3">Meet Attendance</td><td className="px-4 py-3">Free</td><td className="px-4 py-3">No</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td><td className="px-4 py-3">✓</td></tr>
                <tr><td className="px-4 py-3">Vexa</td><td className="px-4 py-3">$10/mo</td><td className="px-4 py-3">Required</td><td className="px-4 py-3">✓</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td></tr>
                <tr><td className="px-4 py-3">Fellow</td><td className="px-4 py-3">$7–15/user/mo</td><td className="px-4 py-3">Required</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td></tr>
                <tr><td className="px-4 py-3">Read.ai</td><td className="px-4 py-3">$19.75/mo Pro</td><td className="px-4 py-3">Required</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td><td className="px-4 py-3">—</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm italic">Pricing accurate as of May 2026. Verify on each vendor&apos;s site before purchasing.</p>

          <hr className="border-white/10 my-10" />

          <div className="bg-white/5 rounded-xl p-8 border border-[#C642FC]/30 my-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C642FC] text-white text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-1"><Crown className="w-3 h-3" /> Best Free Option</div>
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">1. Trackr</h2>
            <p className="text-[#C642FC] font-medium mb-4">Free forever &mdash; No signup, no premium tier</p>
            <p className="text-gray-300 mb-4">Trackr is a free Chrome extension purpose-built for Google Meet attendance. It auto-logs every join, leave, and late arrival, filters out transcription bots so they don&apos;t pollute your roster, and exports to CSV, PDF, Excel, Google Sheets, or email. All data lives locally in your browser &mdash; nothing in the cloud, nothing to leak, no BAA needed for HIPAA contexts.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Completely free, forever", "No signup or account required", "Bot filtering is unique in this category", "Local-only storage (HIPAA-friendly)", "Multi-format export including Sheets push", "Late-arrival flags with configurable threshold"].map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4>
                <ul className="space-y-1 list-none pl-0 m-0">
                  {["Google Meet only (Zoom + Teams on roadmap)", "Chrome / Edge / Brave only — no Firefox", "Newer extension with smaller community than Meet Attendance"].map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic"><strong className="text-gray-300">Best for:</strong> Teachers on free Google Meet, group therapists (HIPAA), coaches, course creators &mdash; basically anyone who wants attendance without paying for Workspace Education Plus.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">2. Meet Attendance (Niraj Sheth)</h2>
            <p className="text-yellow-400 font-medium mb-4">Free &mdash; The OG of the category</p>
            <p className="text-gray-300 mb-4">The first widely-used free Google Meet attendance extension, predating Trackr by years. Still works, still free, still has a large install base. Reliable for the basic case (who joined and for how long). Doesn&apos;t do late flags, bot filtering, or anything beyond CSV export.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4><ul className="space-y-1 list-none pl-0 m-0">{["Genuinely free", "First-mover, well-known in teacher circles", "Reliable basic attendance logging"].map((p,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>))}</ul></div>
              <div><h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4><ul className="space-y-1 list-none pl-0 m-0">{["No late-arrival flags","No bot filtering — Otter/Read.ai count as attendees","CSV export only — no Sheets push, no PDF","No cross-session pattern detection","Limited active development"].map((c,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>))}</ul></div>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic"><strong className="text-gray-300">Best for:</strong> Users who already have it installed and only need the basic case. If you&apos;re starting fresh, Trackr does everything this does plus more.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">3. Vexa</h2>
            <p className="text-yellow-400 font-medium mb-4">Freemium &mdash; Paid tier ~$10/user/month</p>
            <p className="text-gray-300 mb-4">SaaS attendance + analytics platform with a polished dashboard. Real company, real product roadmap, real team features. The free tier is heavily limited (a few meetings per month); meaningful use requires the paid plan. Your roster lives on Vexa&apos;s servers.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4><ul className="space-y-1 list-none pl-0 m-0">{["Polished cross-meeting dashboard","Multi-user team support","Calendar integration","Active development"].map((p,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>))}</ul></div>
              <div><h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4><ul className="space-y-1 list-none pl-0 m-0">{["Free tier is meaningfully limited","Cloud-only — not HIPAA-friendly out of box","Requires signup + account","No bot filtering as a first-class feature"].map((c,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>))}</ul></div>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic"><strong className="text-gray-300">Best for:</strong> Mid-size teams who need a multi-user dashboard and can budget $10/user/month.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">4. Fellow</h2>
            <p className="text-yellow-400 font-medium mb-4">Paid &mdash; $7&ndash;$15/user/month</p>
            <p className="text-gray-300 mb-4">A full meeting management suite &mdash; agendas, action items, feedback &mdash; with attendance as one feature among many. Excellent if you want the whole meeting-workflow stack. Overkill (and overpriced) if you just need attendance.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4><ul className="space-y-1 list-none pl-0 m-0">{["Polished, complete meeting workflow product","Strong integrations (Slack, Notion, Asana)","Recognized brand in B2B"].map((p,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>))}</ul></div>
              <div><h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4><ul className="space-y-1 list-none pl-0 m-0">{["Massive overkill for attendance alone","Paid only","Built for tech teams, not teachers","Cloud-only, same privacy considerations as Vexa"].map((c,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>))}</ul></div>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic"><strong className="text-gray-300">Best for:</strong> Tech-company team leads who want one tool for everything. Wrong fit for teachers, therapists, or solo coaches.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 border border-white/10 my-8">
            <h2 className="text-3xl font-bold text-white mb-2 mt-0">5. Read.ai</h2>
            <p className="text-yellow-400 font-medium mb-4">Freemium &mdash; Pro $19.75/month</p>
            <p className="text-gray-300 mb-4">AI meeting assistant that records, transcribes, summarizes &mdash; and tracks attendance as a side effect. Strong transcription product. But you&apos;re paying $20/month for features you don&apos;t need if attendance is your only goal. And Read.ai joins meetings as a visible bot, which other participants notice.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><h4 className="text-sm font-bold text-green-400 mb-2">Pros</h4><ul className="space-y-1 list-none pl-0 m-0">{["High-quality AI transcription","Auto-generated meeting summaries","Detailed analytics (talk time, sentiment)"].map((p,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-3 h-3 text-green-400 shrink-0" />{p}</li>))}</ul></div>
              <div><h4 className="text-sm font-bold text-red-400 mb-2">Cons</h4><ul className="space-y-1 list-none pl-0 m-0">{["Attendance is a tertiary feature","Read.ai joins as visible bot — disruptive in classrooms","Cloud-stored everything","Pricey if you only want attendance","Not HIPAA-friendly by default"].map((c,i)=>(<li key={i} className="flex items-center gap-2 text-sm text-gray-300"><X className="w-3 h-3 text-red-400 shrink-0" />{c}</li>))}</ul></div>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic"><strong className="text-gray-300">Best for:</strong> Teams who genuinely need transcription + summaries and treat attendance as a bonus.</p>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How to Choose</h2>
          <p className="text-gray-300 mb-4">Three questions in order:</p>
          <ol className="space-y-3 list-decimal pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">What&apos;s your privacy constraint?</strong> If you&apos;re a therapist, school IT, or anyone handling sensitive context, you need local-only storage. Only Trackr offers that out of the box.</li>
            <li><strong className="text-white">What&apos;s your budget?</strong> If $0, Trackr or Meet Attendance. If $10+/month and you need a dashboard, Vexa. If $200+/year and you want a full meeting product, Fellow.</li>
            <li><strong className="text-white">Do you also need transcription?</strong> If yes, Read.ai or Otter (then use Trackr separately for attendance). If no, don&apos;t pay $20/month for features you&apos;ll never use.</li>
          </ol>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">What is the best free Google Meet attendance extension?</strong><p className="text-gray-400 text-sm">Trackr. It does everything Meet Attendance does plus late flags, bot filtering, and multi-format export &mdash; all free.</p></div>
              <div><strong className="text-white block mb-1">Do I need IT admin to install these?</strong><p className="text-gray-400 text-sm">No. Chrome extensions install on your personal browser with one click. This is the main advantage over Google&apos;s native paid feature.</p></div>
              <div><strong className="text-white block mb-1">Which one is HIPAA-friendly?</strong><p className="text-gray-400 text-sm">Only Trackr stores data locally with no cloud sync. Everything else requires a BAA for HIPAA-sensitive use.</p></div>
              <div><strong className="text-white block mb-1">Does any of these work on Zoom or Teams?</strong><p className="text-gray-400 text-sm">No &mdash; all five are Google Meet specific. Trackr has Zoom + Teams on its roadmap but neither has shipped.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">For broader context, see our complete <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">Google Meet attendance guide</a> or the step-by-step <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">setup tutorial</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Try the Best Free Option</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr is free forever. No signup. Local-only data. 30-second install.</p>
            <a href="https://meet-attendence-website.vercel.app" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Trackr Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
