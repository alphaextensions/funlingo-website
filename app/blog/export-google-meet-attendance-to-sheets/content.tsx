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
  FileSpreadsheet,
  Download,
  Table2,
  Clipboard,
  RefreshCw,
  Check,
  X,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

export default function ExportGoogleMeetAttendanceToSheetsContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">How-To Guide</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">How to Export Google Meet Attendance to Google Sheets (Free, 2026)</h1>
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
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              alt="A laptop showing spreadsheet charts and attendance data on a desk"
              className="w-full rounded-2xl border border-white/10"
              loading="eager"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-3">Attendance data is only useful once it's in a spreadsheet you can sort, filter, and total.</figcaption>
          </figure>

          <p className="lead text-xl leading-relaxed">Taking attendance in a Google Meet is only half the job. The other half is getting that roster out of the meeting and into a spreadsheet &mdash; somewhere you can sort by name, total minutes attended, flag the no-shows, and hand a clean report to whoever asked for it. Google doesn&apos;t make this easy. This guide walks through every way to export Google Meet attendance to Google Sheets, from the painful manual method to a free one-click export with the <strong className="text-white">Trackr</strong> extension.</p>

          <div className="bg-[rgba(34,197,94,0.06)] border-l-4 border-emerald-400 p-6 rounded-r-lg my-8">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <p className="m-0 text-gray-200"><strong className="text-white">The short answer:</strong> Free Google Meet has no built-in attendance export. <strong className="text-white">Trackr</strong> is a free Chrome extension that logs attendance automatically and exports it to Google Sheets, CSV, or PDF in one click &mdash; no signup, no bot in your meeting, and data stays on your laptop.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What Google Meet Gives You Natively (and What It Doesn&apos;t)</h2>
          <p className="text-gray-300 mb-4">If you&apos;re on a paid Google Workspace plan with the attendance feature enabled, Meet emails the host a CSV attendance report after meetings with 5+ participants. That&apos;s genuinely useful &mdash; but it comes with three catches that send most people looking for an alternative:</p>

          <div className="space-y-3 my-6">
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><X className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">It&apos;s paid-only</strong><span className="text-gray-400 text-sm">Attendance reports require Business Standard, Business Plus, or one of the Education/Enterprise tiers. Free Gmail accounts get nothing.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><X className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">It&apos;s a flat CSV, not a live sheet</strong><span className="text-gray-400 text-sm">You get a static file emailed after the fact. To build a running attendance log across sessions, you&apos;re copy-pasting CSVs into a master sheet by hand.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><X className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">The admin has to turn it on</strong><span className="text-gray-400 text-sm">Attendance tracking is off by default and controlled at the Workspace admin level. If you&apos;re a teacher or team lead, that&apos;s an IT ticket away.</span></div></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Method 1: The Manual Way (Free, but Tedious)</h2>
          <p className="text-gray-300 mb-4">If you only run the occasional small meeting, you can do this by hand. It works, but it doesn&apos;t scale, and it&apos;s error-prone the moment people join late or leave early.</p>

          <div className="space-y-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">1</div>
              <div><strong className="text-white block mb-1">Open the participant panel</strong><p className="text-gray-400 text-sm m-0">Click the &quot;People&quot; icon in the bottom bar to see everyone currently in the call.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">2</div>
              <div><strong className="text-white block mb-1">Create a fresh Google Sheet</strong><p className="text-gray-400 text-sm m-0">Add columns for Name, Join Time, Leave Time, and Status. Type each name in by hand.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">3</div>
              <div><strong className="text-white block mb-1">Watch for late joiners and early leavers</strong><p className="text-gray-400 text-sm m-0">Keep glancing at the panel and updating timestamps. This is where the method falls apart in a 30-person class.</p></div>
            </div>
          </div>

          <div className="bg-[rgba(234,179,8,0.06)] border-l-4 border-yellow-400 p-5 rounded-r-lg my-6">
            <div className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-1" /><p className="m-0 text-gray-300 text-sm">Manual tracking pulls your attention away from teaching or presenting, and a single missed name means re-doing the count. For anything recurring, automate it.</p></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Method 2: One-Click Export with Trackr (Free)</h2>
          <p className="text-gray-300 mb-4">Trackr watches the Google Meet participant panel for you and builds the attendance log automatically as people join and leave. When the session ends, you export &mdash; no typing, no missed names, no babysitting timestamps.</p>

          <div className="space-y-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">1</div>
              <div><strong className="text-white block mb-1">Install Trackr from the Chrome Web Store</strong><p className="text-gray-400 text-sm m-0">One click, no account, no email. It activates only on meet.google.com.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">2</div>
              <div><strong className="text-white block mb-1">Run your meeting normally</strong><p className="text-gray-400 text-sm m-0">Trackr detects the participant panel and logs join/leave times in the background. Nothing appears to your attendees &mdash; there&apos;s no bot in the call.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">3</div>
              <div><strong className="text-white block mb-1">Click the Trackr icon to review the roster</strong><p className="text-gray-400 text-sm m-0">You&apos;ll see every name, join time, leave time, total minutes, and a late-arrival flag.</p></div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">4</div>
              <div><strong className="text-white block mb-1">Export to Google Sheets, CSV, or PDF</strong><p className="text-gray-400 text-sm m-0">Choose Sheets for a live, sortable report; CSV for importing into another system; PDF for a fixed record.</p></div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What the Exported Sheet Looks Like</h2>
          <p className="text-gray-300 mb-4">A Trackr export drops a clean, structured table into your spreadsheet &mdash; the kind you can pivot, filter, and chart immediately:</p>

          <div className="bg-white/5 p-5 rounded-xl border border-white/10 my-6 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse m-0">
              <thead>
                <tr className="text-white border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">Name</th>
                  <th className="py-2 pr-4 font-semibold">Joined</th>
                  <th className="py-2 pr-4 font-semibold">Left</th>
                  <th className="py-2 pr-4 font-semibold">Minutes</th>
                  <th className="py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Aisha Khan</td><td className="py-2 pr-4">09:00</td><td className="py-2 pr-4">10:02</td><td className="py-2 pr-4">62</td><td className="py-2 text-emerald-400">Present</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Marco Rossi</td><td className="py-2 pr-4">09:11</td><td className="py-2 pr-4">10:00</td><td className="py-2 pr-4">49</td><td className="py-2 text-yellow-400">Late</td></tr>
                <tr><td className="py-2 pr-4">Lena Park</td><td className="py-2 pr-4">&mdash;</td><td className="py-2 pr-4">&mdash;</td><td className="py-2 pr-4">0</td><td className="py-2 text-red-400">Absent</td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Table2 className="w-5 h-5 text-blue-400" /><strong className="text-white">Sortable columns</strong></div>
              <p className="text-gray-400 text-sm m-0">Sort by minutes attended to instantly surface partial-attendance and no-shows.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><BarChart3 className="w-5 h-5 text-purple-400" /><strong className="text-white">Pivot-ready</strong></div>
              <p className="text-gray-400 text-sm m-0">One row per attendee per session means you can build attendance-rate pivots across weeks.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><RefreshCw className="w-5 h-5 text-emerald-400" /><strong className="text-white">Append, don&apos;t replace</strong></div>
              <p className="text-gray-400 text-sm m-0">Export into the same master sheet each week to build a term-long attendance history.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Manual vs. Trackr: Side by Side</h2>
          <div className="bg-white/5 p-5 rounded-xl border border-white/10 my-6 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse m-0">
              <thead>
                <tr className="text-white border-b border-white/10">
                  <th className="py-2 pr-4 font-semibold">&nbsp;</th>
                  <th className="py-2 pr-4 font-semibold">Manual</th>
                  <th className="py-2 font-semibold">Trackr</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Cost</td><td className="py-2 pr-4">Free</td><td className="py-2 text-emerald-400">Free</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Time per session</td><td className="py-2 pr-4">5&ndash;15 min</td><td className="py-2 text-emerald-400">~5 sec</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Late/early timestamps</td><td className="py-2 pr-4">Error-prone</td><td className="py-2 text-emerald-400">Automatic</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 pr-4">Scales to 50+ people</td><td className="py-2 pr-4">No</td><td className="py-2 text-emerald-400">Yes</td></tr>
                <tr><td className="py-2 pr-4">Direct Sheets export</td><td className="py-2 pr-4">Manual</td><td className="py-2 text-emerald-400">One click</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Tips for a Clean Attendance Report</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <ul className="space-y-3 list-none pl-0 m-0">
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Keep one master sheet per class or team.</strong> Append each session as new rows rather than starting a fresh file every time.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Set a late threshold.</strong> Decide what &quot;late&quot; means (e.g. joined 5+ minutes in) and let the Status column do the flagging.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Use a minutes-attended cutoff.</strong> A pivot on total minutes makes &quot;present for the whole session&quot; easy to enforce for credit or billing.</div></li>
              <li className="flex gap-3"><Clipboard className="w-5 h-5 text-blue-400 shrink-0 mt-1" /><div><strong className="text-white">Standardize display names.</strong> Ask attendees to set their real name in Meet so the export matches your roster without cleanup.</div></li>
            </ul>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Can you export Google Meet attendance to Google Sheets for free?</strong><p className="text-gray-400 text-sm">Yes. Free Google Meet has no native export, but the free Trackr Chrome extension logs attendance automatically and exports it to Google Sheets, CSV, or PDF in one click &mdash; no signup required.</p></div>
              <div><strong className="text-white block mb-1">Does Google Meet have a built-in attendance report?</strong><p className="text-gray-400 text-sm">Only on paid Workspace plans (Business Standard and above, plus Education/Enterprise tiers), and only when an admin enables it. It emails a static CSV after meetings of 5+ people; it does not write to a live sheet.</p></div>
              <div><strong className="text-white block mb-1">Will attendees see that I&apos;m tracking attendance?</strong><p className="text-gray-400 text-sm">No. Trackr runs in your browser and reads the participant panel locally. There&apos;s no bot in the meeting and nothing visible to other participants.</p></div>
              <div><strong className="text-white block mb-1">Where is my attendance data stored?</strong><p className="text-gray-400 text-sm">Locally, in your browser. Trackr has no server and no account system; the export only leaves your device when you choose to send it to Google Sheets or download a file.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">New to Meet attendance in general? Start with our <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">complete Google Meet attendance guide</a> or the <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">step-by-step tutorial</a>. Comparing tools? See the <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">best attendance extensions</a>, and for persona-specific advice, our guides for <a href="/blog/google-meet-attendance-for-teachers" className="text-[#C642FC] hover:underline">teachers</a> and <a href="/blog/attendance-tracker-for-online-classes" className="text-[#C642FC] hover:underline">online instructors</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(34,197,94,0.05)] border border-emerald-500/20">
            <div className="flex items-center justify-center gap-2 mb-4"><Download className="w-6 h-6 text-emerald-400" /><h2 className="text-3xl font-bold text-white m-0">Export Attendance in One Click</h2></div>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr logs Google Meet attendance automatically and exports straight to Google Sheets, CSV, or PDF. Free, no signup, no bot in your meeting.</p>
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
