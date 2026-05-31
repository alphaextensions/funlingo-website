"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Users,
  Repeat,
  BellOff,
  TrendingUp,
  ClipboardList,
  Coffee,
  Check,
  X,
  ShieldCheck,
  Briefcase,
  Video,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";

export default function MeetingAttendanceTrackerRemoteTeamsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">For Remote Teams</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Meeting Attendance Tracker for Remote Teams (Free, No Bot Required)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 31, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80"
              alt="A remote team meeting on a video call grid"
              className="w-full rounded-2xl border border-white/10"
              loading="eager"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-3">Remote teams live in recurring video calls &mdash; standups, syncs, all-hands. Knowing who actually showed up matters.</figcaption>
          </figure>

          <p className="lead text-xl leading-relaxed">When your team is fully remote, the daily standup and the weekly sync aren&apos;t just meetings &mdash; they&apos;re the heartbeat. But tracking who actually shows up gets awkward fast. You don&apos;t want to be the manager calling roll like a substitute teacher, and you definitely don&apos;t want a creepy bot announcing itself in every call. This guide covers how to track Google Meet attendance for remote teams quietly, fairly, and for free &mdash; using the <strong className="text-white">Trackr</strong> extension.</p>

          <div className="bg-[rgba(34,197,94,0.06)] border-l-4 border-emerald-400 p-6 rounded-r-lg my-8">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <p className="m-0 text-gray-200"><strong className="text-white">The team-friendly answer:</strong> <strong className="text-white">Trackr</strong> is a free Chrome extension that logs Google Meet attendance automatically &mdash; no bot in the call, nothing visible to the team, and data stays on your laptop. It&apos;s built for recurring meetings, so it tracks patterns across standups and syncs without any manual roll call.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Why Remote Teams Need This (and Why It&apos;s Touchy)</h2>
          <p className="text-gray-300 mb-4">Attendance tracking has baggage. Done badly, it feels like surveillance and erodes trust. Done well, it&apos;s just operational hygiene &mdash; the same way you&apos;d expect people to reply to a calendar invite. Here&apos;s where it actually earns its keep:</p>

          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Repeat className="w-5 h-5 text-blue-400" /><strong className="text-white">Recurring standups</strong></div>
              <p className="text-gray-400 text-sm m-0">A teammate who quietly drops off three standups in a row is usually a signal &mdash; of blockers, burnout, or disengagement &mdash; worth catching early.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><ClipboardList className="w-5 h-5 text-purple-400" /><strong className="text-white">Compliance training</strong></div>
              <p className="text-gray-400 text-sm m-0">Mandatory sessions (security, HR, onboarding) often need a documented attendance record for audit purposes.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Briefcase className="w-5 h-5 text-amber-400" /><strong className="text-white">Client &amp; agency calls</strong></div>
              <p className="text-gray-400 text-sm m-0">Billable meetings and SLA reviews sometimes require proof of who attended and for how long.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-emerald-400" /><strong className="text-white">All-hands engagement</strong></div>
              <p className="text-gray-400 text-sm m-0">Leadership wants to know if the company-wide meeting is reaching people or quietly being skipped.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The Problem With Bot-Based Trackers</h2>
          <p className="text-gray-300 mb-4">Most meeting tools that log attendance do it by sending a bot into the call &mdash; a phantom participant that joins, records, and sits in the roster. For remote teams that creates real friction:</p>

          <div className="space-y-3 my-6">
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><Video className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">It&apos;s visible to everyone</strong><span className="text-gray-400 text-sm">A &quot;Notetaker&quot; or &quot;Recorder&quot; bot in the participant list changes the vibe of a casual standup and makes people self-conscious.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">It triggers recording-consent prompts</strong><span className="text-gray-400 text-sm">Many bots are recording bots first, attendance trackers second &mdash; pulling you into consent and data-retention questions you didn&apos;t want.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">Your roster lives on their servers</strong><span className="text-gray-400 text-sm">Cloud trackers store who-met-whom-when externally. For internal team data, that&apos;s an avoidable third-party exposure.</span></div></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How Trackr Works for Teams</h2>
          <p className="text-gray-300 mb-4">Trackr never joins the meeting. It runs in the host&apos;s (or any attendee&apos;s) browser and reads the participant panel locally &mdash; the same list you can already see. No bot, no recording, no consent prompt.</p>

          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="bg-[rgba(34,197,94,0.05)] p-5 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3"><BellOff className="w-5 h-5 text-emerald-400" /><strong className="text-white">Silent by design</strong></div>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />No bot in the participant list</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />No recording or transcription</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />No consent prompt to the team</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Data stays on your laptop</li>
              </ul>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3"><CalendarClock className="w-5 h-5 text-gray-400" /><strong className="text-white">Built for recurring meetings</strong></div>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Logs every session automatically</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Tracks attendance rate per person</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Flags repeated no-shows</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Exports to Sheets / CSV / PDF</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Set It Up in 30 Seconds</h2>
          <div className="space-y-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">1</div>
              <div><strong className="text-white block mb-1">Install Trackr from the Chrome Web Store</strong><p className="text-gray-400 text-sm m-0">One click. No account, no email, no admin approval needed for a personal Chrome profile.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">2</div>
              <div><strong className="text-white block mb-1">Host your standup or sync as usual</strong><p className="text-gray-400 text-sm m-0">Trackr detects the participant panel and logs join/leave times in the background.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">3</div>
              <div><strong className="text-white block mb-1">Check the weekly rollup</strong><p className="text-gray-400 text-sm m-0">Open Trackr to see attendance rates across sessions and a list of anyone trending toward disengagement.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">4</div>
              <div><strong className="text-white block mb-1">Export when you need a record</strong><p className="text-gray-400 text-sm m-0">Push to Google Sheets for ongoing tracking, or PDF for a compliance-training paper trail.</p></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Do It Without Killing Team Morale</h2>
          <p className="text-gray-300 mb-4">Tracking attendance well is mostly about intent and transparency. A few principles keep it from feeling like Big Brother:</p>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <ul className="space-y-3 list-none pl-0 m-0">
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Tell the team you track attendance.</strong> Secret monitoring is what destroys trust. A one-line note in the team handbook is enough.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Use it for patterns, not single misses.</strong> One missed standup is life. Three in a row is a conversation &mdash; a supportive one, ideally.</div></li>
              <li className="flex gap-3"><Coffee className="w-5 h-5 text-amber-400 shrink-0 mt-1" /><div><strong className="text-white">Don&apos;t weaponize the data.</strong> Attendance is a health signal, not a performance score. Lead with &quot;is everything okay?&quot; not &quot;you missed three meetings.&quot;</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Respect time zones.</strong> If your team spans continents, a &quot;miss&quot; at 3am someone&apos;s time isn&apos;t a miss. Read the log with context.</div></li>
            </ul>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Trackr vs. Bot-Based Tools for Teams</h2>
          <div className="bg-white/5 p-5 rounded-xl border border-white/10 my-6 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse m-0">
              <thead>
                <tr className="text-white border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">&nbsp;</th>
                  <th className="py-2 pr-4 font-semibold">Bot tools</th>
                  <th className="py-2 font-semibold">Trackr</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Visible in the call</td><td className="py-2 pr-4">Yes (bot)</td><td className="py-2 text-emerald-400">No</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Records / transcribes</td><td className="py-2 pr-4">Usually</td><td className="py-2 text-emerald-400">Never</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Data location</td><td className="py-2 pr-4">Their servers</td><td className="py-2 text-emerald-400">Your laptop</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Recurring-meeting patterns</td><td className="py-2 pr-4">Sometimes</td><td className="py-2 text-emerald-400">Built in</td></tr>
                <tr><td className="py-2 pr-4">Price</td><td className="py-2 pr-4">Often paid</td><td className="py-2 text-emerald-400">Free</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">What&apos;s the best free meeting attendance tracker for remote teams?</strong><p className="text-gray-400 text-sm">Trackr is a free Chrome extension that logs Google Meet attendance automatically with no bot in the call and no signup. It&apos;s built for recurring meetings, so it tracks attendance rates across standups and syncs.</p></div>
              <div><strong className="text-white block mb-1">Can I track attendance without a bot joining the meeting?</strong><p className="text-gray-400 text-sm">Yes. Trackr reads the Google Meet participant panel from your browser locally. Nothing joins the call, so there&apos;s no extra participant and no recording-consent prompt for the team.</p></div>
              <div><strong className="text-white block mb-1">Does it track attendance across recurring standups?</strong><p className="text-gray-400 text-sm">Yes. Trackr logs each session and builds per-person attendance rates over time, flagging repeated no-shows so you can spot disengagement early.</p></div>
              <div><strong className="text-white block mb-1">Is the attendance data private?</strong><p className="text-gray-400 text-sm">Yes. Data is stored locally in your browser. Trackr has no server and no accounts; nothing leaves your device unless you export it to Google Sheets or download a file.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">Want the fundamentals first? Read our <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">complete Google Meet attendance guide</a> and the <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">step-by-step tutorial</a>. Need to get the data into a spreadsheet? See <a href="/blog/export-google-meet-attendance-to-sheets" className="text-[#C642FC] hover:underline">how to export Meet attendance to Google Sheets</a>. Comparing options? Check the <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">best attendance extensions</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(34,197,94,0.05)] border border-emerald-500/20">
            <div className="flex items-center justify-center gap-2 mb-4"><Users className="w-6 h-6 text-emerald-400" /><h2 className="text-3xl font-bold text-white m-0">Track Team Attendance, Quietly</h2></div>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr logs Google Meet attendance for your standups and syncs &mdash; no bot, no recording, data on your laptop. Free, no signup.</p>
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
