"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GoogleMeetAttendanceForTeachersContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">For Teachers</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Google Meet Attendance for Teachers: A No-Nonsense Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 23, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 7 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Most teachers lose about 5 minutes per class period to roll-call. Five classes a day, 180 school days a year &mdash; that&apos;s ~75 hours of class time spent saying names aloud instead of teaching. On Google Meet it&apos;s worse, because students drift in over the first ten minutes and you end up calling roll twice. This guide covers the practical options for taking attendance on Google Meet as a teacher, and why most teachers end up using a free Chrome extension rather than waiting for IT to enable Google&apos;s paid feature.</p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200"><strong className="text-white">The short version for teachers:</strong> If your school has Workspace Education Plus AND your IT admin has enabled attendance reports, use Google&apos;s native feature. Otherwise, install <strong className="text-white">Trackr</strong> &mdash; a free Chrome extension that auto-logs joins, leaves, and late arrivals without disrupting class. No IT ticket, no signup, no payment. 30-second install.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The Real Problem: Attendance That Doesn&apos;t Disrupt Class</h2>
          <p className="text-gray-300 mb-4">There&apos;s nothing wrong with old-school roll-call. But on Google Meet, it has three specific problems teachers know well:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Students join over a long window.</strong> Period bells, mic-check stalls, internet drops &mdash; first arrivals might be 5 minutes ahead of last. You either call roll early and miss late arrivals, or call it late and waste the early students&apos; time.</li>
            <li><strong className="text-white">Names blur together.</strong> The participant panel shows real names but it&apos;s easy to miss someone. And the panel disappears when the meeting ends &mdash; no replay.</li>
            <li><strong className="text-white">Office paperwork.</strong> Whatever you do during class, you eventually need a record. Maybe for parent conferences, maybe for the office, maybe for grading participation. Hand-written rolls don&apos;t paste into spreadsheets cleanly.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Your Three Options as a Teacher</h2>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Option 1: Google Workspace Education Native</h3>
          <p className="text-gray-300 mb-4">If your school has the Education Plus or Standard tier AND your IT admin has flipped the attendance switch on, Google emails you an attendance report after every meeting. It&apos;s clean, it&apos;s FERPA-friendly, it requires zero workflow change on your part.</p>
          <p className="text-gray-300 mb-4">Why most teachers can&apos;t use this:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li>The Education Plus tier is the most expensive Google Workspace tier. Many schools are on the cheaper Education Fundamentals plan, which doesn&apos;t include it.</li>
            <li>Even when the school has the right tier, it has to be enabled by IT &mdash; you can&apos;t turn it on yourself.</li>
            <li>It doesn&apos;t flag late arrivals against a threshold. You get raw timestamps, you do the math.</li>
            <li>It doesn&apos;t filter out transcription bots, so if anyone in your class has Otter or Read.ai installed, those bots count as &quot;attendees.&quot;</li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Option 2: A Free Chrome Extension (Trackr)</h3>
          <p className="text-gray-300 mb-4">This is what most teachers end up using. Trackr installs on your personal Chrome browser in one click &mdash; no IT, no purchasing, no admin permissions. It auto-logs every join, leave, and late arrival, filters bots out automatically, and lets you export the roster to any format your school&apos;s grade book accepts.</p>
          <p className="text-gray-300 mb-4">What teachers like about it specifically:</p>
          <ul className="space-y-2 list-none pl-0 mb-6">
            {["Free forever — no premium tier, no trial, no signup", "Late-arrival flags with a configurable threshold (default 5 minutes)", "Bot filtering — Otter, Read.ai, Fireflies don't count as attendees", "Export to Google Sheets directly (no copy-paste)", "Local-only storage — FERPA-friendly because no third-party data sharing", "Invisible to students — no bot, no notification, no UI change"].map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-green-400 mt-1 shrink-0" /><span className="text-gray-200">{p}</span></li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Option 3: Hand-Written or Manual</h3>
          <p className="text-gray-300 mb-4">The fallback. Works in any setup. Costs ~5 minutes per class period. Hard to maintain when you teach 5+ periods a day.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">A 30-Second Setup Guide</h2>
          <p className="text-gray-300 mb-4">If you want to skip the calculus and just get attendance working today:</p>
          <div className="space-y-3 my-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10"><strong className="text-white">1.</strong> Search &quot;Trackr&quot; in the Chrome Web Store and click <strong className="text-white">Add to Chrome</strong>.</div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10"><strong className="text-white">2.</strong> Open your next Google Meet class normally.</div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10"><strong className="text-white">3.</strong> Teach. (Trackr runs in the background &mdash; no buttons to press during class.)</div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10"><strong className="text-white">4.</strong> After class, click the Trackr icon. Review the roster, fix anything that&apos;s off, export to Sheets or PDF.</div>
          </div>
          <p className="text-gray-300">That&apos;s it. The first time you use it, the sanity check is to have a student or colleague join briefly and confirm they show up in the log.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Teacher-Specific Use Cases</h2>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Parent-Teacher Conferences</h3>
          <p className="text-gray-300 mb-4">When a parent asks &quot;how often has my child been late?&quot; you can pull a cross-session report in 30 seconds instead of digging through old emails or grade-book entries. Trackr&apos;s pattern detection surfaces students with chronic tardiness automatically.</p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Grade-Weighted Participation</h3>
          <p className="text-gray-300 mb-4">If your syllabus weights attendance for a participation grade, export to Sheets, then sort by &quot;total time&quot; or &quot;late arrivals&quot; and apply your rubric. No more guessing whether a student attended 11 of 12 weeks or 10 of 12.</p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Substitute Teachers</h3>
          <p className="text-gray-300 mb-4">A sub who installs Trackr can leave you a clean, complete attendance log instead of a handwritten note that says &quot;most students were here.&quot; The log includes the same information you&apos;d collect yourself.</p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Hybrid Classes</h3>
          <p className="text-gray-300 mb-4">When half the class is in-person and half is on Meet, Trackr handles the remote side cleanly. You take in-person attendance the way you always did, and Trackr fills in the rest.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Privacy Considerations Worth Knowing</h2>
          <p className="text-gray-300 mb-4">Two things teachers ask about most often:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">FERPA</strong>: Trackr stores attendance data locally on your laptop only. There&apos;s no third-party data sharing, no cloud sync, no analytics pixel. This is FERPA-friendly because nothing goes to an external vendor. If your district has a stricter local policy, double-check with your tech coordinator &mdash; but in most districts, a local-only Chrome extension is well within bounds.</li>
            <li><strong className="text-white">Student awareness</strong>: Trackr doesn&apos;t add a bot to the meeting. Students don&apos;t see any indicator that attendance is being logged. Whether to tell them is a teaching judgment call, not a technical one.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">How do teachers take attendance on Google Meet?</strong><p className="text-gray-400 text-sm">The fastest way is a free Chrome extension like Trackr that auto-logs joins, leaves, and late arrivals. No clicks during class, no roll-call interruption.</p></div>
              <div><strong className="text-white block mb-1">Do I need my school&apos;s IT admin to enable attendance tracking?</strong><p className="text-gray-400 text-sm">Only if you want Google&apos;s native paid feature. A Chrome extension installs on your personal browser with one click — no IT involvement.</p></div>
              <div><strong className="text-white block mb-1">Can students tell that I&apos;m tracking their attendance?</strong><p className="text-gray-400 text-sm">No. Trackr runs in your browser only and doesn&apos;t add a bot to the meeting. The interface looks identical to standard Google Meet from the student&apos;s side.</p></div>
              <div><strong className="text-white block mb-1">Is Google Meet attendance data FERPA-compliant?</strong><p className="text-gray-400 text-sm">Yes for both options. Google&apos;s native feature is FERPA-friendly via your Workspace agreement. Trackr is FERPA-friendly because data stays on your laptop only — no third-party data sharing.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">For broader context on Google Meet attendance, see our <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">complete guide</a>, the <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">step-by-step tutorial</a>, or the <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">comparison of available extensions</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Get Back the 5 Minutes Per Class</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr is free forever. No signup. Local-only data. Built for teachers.</p>
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
