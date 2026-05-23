"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GoogleMeetAttendanceContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Meet Attendance</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Google Meet Attendance: The Complete 2026 Guide</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 23, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Google Meet has attendance tracking &mdash; but only sometimes, and only for some people. If you&apos;re on a paid Google Workspace for Education Plus or Standard plan, Google emails you a participant report automatically after every meeting. If you&apos;re on free Google Meet, a personal Gmail account, or a Workspace Business plan, that feature simply doesn&apos;t exist. This guide covers exactly what Google ships natively, what&apos;s missing, and how to add full automatic attendance to any Google Meet session in about 30 seconds &mdash; for free.</p>

          <div className="bg-white/5 border-l-4 border-[#C642FC] p-6 rounded-r-lg my-8">
            <p className="m-0 text-gray-200"><strong className="text-white">The short version:</strong> Free Google Meet has no attendance feature. Paid Workspace Education Plus/Standard plans do. For everyone in between &mdash; teachers on free accounts, coaches, therapists, course creators &mdash; a free Chrome extension called <strong className="text-white">Trackr</strong> auto-logs joins, leaves, and late arrivals, exports to CSV / Sheets / Excel / PDF, and stores everything locally on your laptop.</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Does Google Meet Track Attendance Automatically?</h2>
          <p className="text-gray-300 mb-4">Out of the box, Google Meet shows you a live participant panel during the call. After the meeting ends, that panel disappears. There is no built-in &quot;attendance history&quot; button on free Google Meet or on Workspace Business plans. If you want a record of who joined, when, and whether they were late, you have three paths:</p>
          <ol className="space-y-3 list-decimal pl-6 text-gray-300 mb-8">
            <li><strong className="text-white">Upgrade to Google Workspace for Education Plus or Standard.</strong> Google sends an attendance email after each meeting with 2+ participants lasting more than 2 minutes. This is the &quot;native&quot; option.</li>
            <li><strong className="text-white">Install a Chrome extension.</strong> A purpose-built attendance extension like Trackr captures the same data (and more &mdash; late flags, exports, pattern detection) without requiring a paid plan or IT involvement.</li>
            <li><strong className="text-white">Roll-call by hand.</strong> The fallback most teachers still use: pause class, read names off a list. Costs about 5 minutes per session.</li>
          </ol>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Google&apos;s Native Attendance Report &mdash; What It Does and Doesn&apos;t Cover</h2>
          <p className="text-gray-300 mb-4">If your school or organization has the right Workspace tier and your admin has turned on attendance tracking, the experience is straightforward. After a meeting ends, the host (and only the host) gets an email with a spreadsheet attached. The spreadsheet lists each participant&apos;s name, email, total time in the call, and the timestamps of every join and leave event.</p>
          <p className="text-gray-300 mb-4">What that report does well:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li>It&apos;s automatic &mdash; no setup beyond enabling it once at the admin level</li>
            <li>It&apos;s tied to verified Google identities (no fake-name impersonation)</li>
            <li>It&apos;s FERPA-friendly because Google handles the data inside Workspace</li>
          </ul>
          <p className="text-gray-300 mb-4">What it doesn&apos;t do:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li>It costs money (Education Plus, Standard, or Enterprise plans only)</li>
            <li>It requires an IT admin to enable it &mdash; individual teachers can&apos;t turn it on</li>
            <li>It doesn&apos;t flag &quot;late arrivals&quot; with a configurable threshold &mdash; you get raw timestamps, you do the math</li>
            <li>It counts transcription bots (Otter, Read.ai, Fireflies) as &quot;attendees&quot;</li>
            <li>It only exports as an email attachment &mdash; no direct Google Sheets push, no PDF, no API</li>
            <li>It doesn&apos;t persist data across sessions for trend detection</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">The Free Alternative: Chrome Extensions</h2>
          <p className="text-gray-300 mb-4">For the 80% of Google Meet users who aren&apos;t on a paid Education plan, browser extensions fill the gap. They install on your own Chrome browser (no IT admin, no purchasing), they read the same participant data the Meet UI already shows, and they output to whichever format your workflow expects.</p>
          <p className="text-gray-300 mb-4">The category isn&apos;t crowded. Three options matter:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Trackr</strong> &mdash; Free forever, no signup. Auto-logs attendance with late-arrival flags, bot filtering, multi-format export, and local-only storage. The HIPAA-friendly choice for therapists.</li>
            <li><strong className="text-white">Meet Attendance</strong> (by Niraj Sheth) &mdash; The original free extension. Basic attendance logging, CSV export. No late flags, no bot filtering, no cross-session patterns.</li>
            <li><strong className="text-white">Vexa</strong> &mdash; Freemium SaaS. Polished dashboard, multi-user team support, but real features sit behind a paid plan and your roster lives on their servers.</li>
          </ul>
          <p className="text-gray-300">For a detailed side-by-side, see our roundup of the <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">best Google Meet attendance extensions</a>.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">How to Add Free Attendance Tracking to Google Meet</h2>
          <p className="text-gray-300 mb-4">If you&apos;re a teacher, coach, therapist, or course creator on free Google Meet, here&apos;s the 30-second setup:</p>
          <div className="space-y-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white">1. Install Trackr from the Chrome Web Store.</strong>
              <p className="text-gray-400 text-sm mt-1">One click. No signup. No payment.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white">2. Open Google Meet in Chrome.</strong>
              <p className="text-gray-400 text-sm mt-1">Works on any Meet session &mdash; scheduled or instant.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white">3. Start your meeting.</strong>
              <p className="text-gray-400 text-sm mt-1">Trackr activates automatically when it detects the Meet participant panel. No buttons to click during class.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <strong className="text-white">4. After the meeting, click the Trackr icon to view + export.</strong>
              <p className="text-gray-400 text-sm mt-1">CSV, PDF, Excel, Google Sheets push, or email. Your data stays on your laptop &mdash; nothing leaves.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Privacy: Where Does the Attendance Data Live?</h2>
          <p className="text-gray-300 mb-4">This is the deciding factor for a lot of users, especially therapists and schools with strict data policies. Three rough options:</p>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Google Workspace native</strong> &mdash; data lives in Google&apos;s cloud, governed by your Workspace contract. FERPA-friendly if your org has the right agreement.</li>
            <li><strong className="text-white">Vexa / Fellow / Read.ai</strong> &mdash; data lives on the vendor&apos;s servers. You need their privacy policy and possibly a BAA for HIPAA contexts.</li>
            <li><strong className="text-white">Trackr</strong> &mdash; data lives in your browser&apos;s local storage. The Trackr team has no server, no database, no telemetry. Nothing to leak because nothing leaves your laptop. This is the only option that works out-of-the-box for HIPAA-sensitive contexts (group therapy, telehealth).</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Common Edge Cases</h2>
          <ul className="space-y-3 list-disc pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">Phone dial-in attendees</strong>: Don&apos;t appear in the participant panel the same way. Most extensions (including Trackr) flag them but can&apos;t fully attribute join/leave times.</li>
            <li><strong className="text-white">Transcription bots</strong>: Otter, Read.ai, Fireflies, Tactiq join as &quot;participants.&quot; Trackr filters them out by default; Google&apos;s native report does not.</li>
            <li><strong className="text-white">Co-hosts who didn&apos;t open Chrome</strong>: Attendance extensions only work in the browser where they&apos;re installed. If two co-hosts are running Meet, only one needs the extension to capture the roster.</li>
            <li><strong className="text-white">Camera-off attendees</strong>: Don&apos;t affect attendance &mdash; presence is detected from the participant panel, not the video feed.</li>
            <li><strong className="text-white">Multiple sessions in a day</strong>: Each meeting is logged separately. Trackr also detects cross-session patterns (chronic tardiness, repeated no-shows) over time.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">When to Use Which Approach</h2>
          <table className="w-full text-sm text-left text-gray-300 my-6 border border-white/10 rounded-lg overflow-hidden">
            <thead className="text-xs uppercase tracking-wider bg-white/5 text-gray-400">
              <tr>
                <th className="px-4 py-3">Your situation</th>
                <th className="px-4 py-3">Recommended approach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr><td className="px-4 py-3">School with Education Plus/Standard, IT admin available</td><td className="px-4 py-3">Use native Google attendance + Trackr for late-arrival flags</td></tr>
              <tr><td className="px-4 py-3">Individual teacher on free Meet or personal Gmail</td><td className="px-4 py-3">Trackr (free, no IT needed)</td></tr>
              <tr><td className="px-4 py-3">Group therapist (HIPAA)</td><td className="px-4 py-3">Trackr (local-only storage is the only option)</td></tr>
              <tr><td className="px-4 py-3">Coach with paying clients</td><td className="px-4 py-3">Trackr (export to Sheets for invoicing)</td></tr>
              <tr><td className="px-4 py-3">Online course creator running cohort calls</td><td className="px-4 py-3">Trackr (cross-session patterns for certificate eligibility)</td></tr>
              <tr><td className="px-4 py-3">Corporate team with Workspace Business</td><td className="px-4 py-3">Vexa or Trackr (Business plans don&apos;t include native attendance)</td></tr>
            </tbody>
          </table>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Does Google Meet have built-in attendance tracking?</strong><p className="text-gray-400 text-sm">Only on paid Workspace for Education Plus and Standard plans. The free version, personal Gmail, and Workspace Business plans do not include attendance. Use a free Chrome extension like Trackr to add it.</p></div>
              <div><strong className="text-white block mb-1">Is there a free attendance tracker for Google Meet?</strong><p className="text-gray-400 text-sm">Yes &mdash; Trackr is a free Chrome extension that auto-logs joins, leaves, and late arrivals. No signup, no payment, no cloud storage.</p></div>
              <div><strong className="text-white block mb-1">How do I see who joined my Google Meet?</strong><p className="text-gray-400 text-sm">During the meeting, click the People icon. For a permanent post-meeting record, you need either a paid Workspace Education plan (which emails a report) or a Chrome extension like Trackr (which logs everyone and exports to CSV / Sheets / PDF).</p></div>
              <div><strong className="text-white block mb-1">Can teachers use Google Meet attendance without IT involvement?</strong><p className="text-gray-400 text-sm">Yes. Google&apos;s native feature requires an IT admin to enable it on a paid plan. A Chrome extension like Trackr installs in one click on your own browser &mdash; no IT ticket needed.</p></div>
              <div><strong className="text-white block mb-1">Does attendance tracking work on the Google Meet mobile app?</strong><p className="text-gray-400 text-sm">No. Browser extensions only work on the Chrome desktop version. Use Meet in Chrome on a laptop, or wait for native mobile attendance.</p></div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Add Free Attendance Tracking to Your Next Meet</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr is a free Chrome extension. 30-second install. No signup. Local-only data. Built for teachers, coaches, and therapists.</p>
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
