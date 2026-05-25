"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HowToTakeAttendanceOnGoogleMeetContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Tutorial</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Take Attendance on Google Meet (Free, 30-Second Setup)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 23, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">The fastest way to take attendance on Google Meet is to install a free Chrome extension that logs it for you &mdash; no clicks during the meeting, no roll-call, no paid Google Workspace plan required. This guide walks through the entire setup with Trackr, the free extension built for teachers, coaches, and therapists. Total time: about 30 seconds.</p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200"><strong className="text-white">Before you start:</strong> You need Google Chrome (or Edge / Brave). The native Google Meet attendance feature is only available on paid Workspace Education Plus / Standard plans. For everyone else, an extension is the way.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Step 1: Install Trackr</h2>
          <p className="text-gray-300 mb-4">Open the Chrome Web Store in any Chromium browser (Chrome, Edge, Brave). Search for <strong className="text-white">Trackr</strong> &mdash; the free Google Meet attendance extension. Click <strong className="text-white">Add to Chrome</strong>, then confirm the install prompt.</p>
          <p className="text-gray-300 mb-4">No signup, no payment, no email required. The extension takes about 5 seconds to install and shows up as a small icon in your Chrome toolbar.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Step 2: Open Google Meet in Chrome</h2>
          <p className="text-gray-300 mb-4">Sign in to your Google account and either start a new meeting at <a href="https://meet.google.com" className="text-[#C642FC] hover:underline" target="_blank" rel="noopener noreferrer">meet.google.com</a> or join an existing one from your calendar. Trackr works on every type of Meet session: scheduled meetings, instant meetings, recurring class periods, even Meet links shared in chat.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Step 3: Start the Meeting Normally</h2>
          <p className="text-gray-300 mb-4">Run class the way you always do. You don&apos;t need to open the Trackr panel, click any &quot;start tracking&quot; button, or change your workflow. As soon as participants begin joining, Trackr captures their names and join timestamps in the background.</p>
          <p className="text-gray-300 mb-4">Trackr also automatically:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Filters out transcription bots</strong> (Otter, Read.ai, Fireflies, Tactiq) so they don&apos;t pollute your roster</li>
            <li><strong className="text-white">Flags late arrivals</strong> based on a threshold you set in the extension settings (default: 5 minutes after start)</li>
            <li><strong className="text-white">Tracks re-joins</strong> if someone&apos;s internet drops and they come back</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Step 4: View Attendance When the Meeting Ends</h2>
          <p className="text-gray-300 mb-4">After the meeting wraps, click the Trackr icon in your Chrome toolbar. You&apos;ll see a roster with every participant, their join time, leave time, total duration, and a late-arrival flag if they were past your threshold.</p>
          <p className="text-gray-300 mb-4">If something looks off &mdash; a name spelled wrong, a phone dial-in mis-attributed, a student who joined late but you want to give a pass &mdash; you can edit any row directly. The corrected version is what gets exported.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Step 5: Export Your Roster</h2>
          <p className="text-gray-300 mb-4">Choose the format your workflow wants:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">CSV</strong> &mdash; for paste-into-anything universality</li>
            <li><strong className="text-white">Excel (.xlsx)</strong> &mdash; formatted spreadsheet with frozen headers</li>
            <li><strong className="text-white">Google Sheets</strong> &mdash; pushes directly into a new Sheet in your Drive</li>
            <li><strong className="text-white">PDF</strong> &mdash; printable copy for paper records or parent conferences</li>
            <li><strong className="text-white">Email</strong> &mdash; sends the roster to yourself, an admin, or a co-host</li>
          </ul>
          <p className="text-gray-300">Your attendance data stays on your laptop. Trackr has no server &mdash; nothing leaves your browser unless you actively export it.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">A Quick Sanity Check</h2>
          <p className="text-gray-300 mb-4">On your first meeting with Trackr installed, the simplest sanity check: have a co-worker or friend join your Meet for 30 seconds, then leave. Click the Trackr icon &mdash; you should see one entry with the right name and timestamps. If it&apos;s missing, the most common cause is that the extension didn&apos;t have permission to read the page (Chrome will show a warning the first time). Click the puzzle icon in the toolbar, find Trackr, and pin it so it stays visible and active.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Common Questions While Setting Up</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Do students see that I&apos;m tracking attendance?</strong><p className="text-gray-400 text-sm">No. Trackr runs in your browser only and doesn&apos;t add a bot to the meeting. From the participants&apos; side, it&apos;s invisible.</p></div>
              <div><strong className="text-white block mb-1">Will it work if I&apos;m a co-host but not the meeting owner?</strong><p className="text-gray-400 text-sm">Yes. Trackr only needs the participant panel, which any meeting attendee can see. Even regular participants can track their own classes.</p></div>
              <div><strong className="text-white block mb-1">What if I forget to install it before a meeting starts?</strong><p className="text-gray-400 text-sm">As long as you install Trackr before the meeting ends, it picks up the current participant list from that moment forward. You&apos;ll miss the early joiners but capture everyone present when you installed.</p></div>
              <div><strong className="text-white block mb-1">Does it cost anything?</strong><p className="text-gray-400 text-sm">No. Trackr is free forever &mdash; no premium tier, no signup, no trial. The team built it as a side project to scratch a teacher&apos;s own itch.</p></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Beyond the Basics</h2>
          <p className="text-gray-300 mb-4">Once you have attendance working for a single meeting, two things are worth exploring:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Late-arrival thresholds</strong> &mdash; the default is 5 minutes, but you can set it to whatever fits your class. Some teachers prefer 1 minute for strict periods; some coaches prefer 10 minutes for casual sessions.</li>
            <li><strong className="text-white">Cross-session patterns</strong> &mdash; after a few weeks of use, Trackr surfaces participants who consistently arrive late or skip sessions. This is where the real value compounds.</li>
          </ul>
          <p className="text-gray-300">For deeper context on what Google Meet does and doesn&apos;t support, see our complete <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">Google Meet attendance guide</a>. If you&apos;re comparing tools, our <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">roundup of the best Google Meet attendance extensions</a> covers Trackr alongside Meet Attendance, Vexa, and the rest.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Install Trackr — Free, 30 Seconds</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">No signup. No card. Local-only data. Built for teachers, coaches, and therapists.</p>
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
