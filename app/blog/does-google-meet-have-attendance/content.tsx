"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DoesGoogleMeetHaveAttendanceContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Quick Answer</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Does Google Meet Have Attendance?</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 23, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 3 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="leading-relaxed text-gray-300 mb-6 text-xl">Google Meet has built-in attendance reports <strong className="text-white">only on paid Google Workspace for Education Plus and Standard plans</strong>. The free version of Google Meet, personal Gmail accounts, and Workspace Business plans do not include attendance tracking. To add attendance tracking to free Google Meet, install a free Chrome extension like <strong className="text-white">Trackr</strong>, which auto-logs every join, leave, and late arrival — all stored locally on your laptop with no signup.</p>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The Long Answer</h2>
          <p className="text-gray-300 mb-4">Google&apos;s attendance feature is locked behind specific paid tiers, with two requirements that surprise most users:</p>
          <ol className="space-y-3 list-decimal pl-6 text-gray-300 mb-6">
            <li><strong className="text-white">You need a paid Workspace plan.</strong> Specifically Education Plus, Education Standard, or Enterprise. Workspace Business plans do not include it. Free Meet and personal Gmail do not include it.</li>
            <li><strong className="text-white">Your IT admin has to enable it.</strong> Individual teachers can&apos;t turn it on themselves. The setting is org-wide and lives in the Google Admin console.</li>
          </ol>
          <p className="text-gray-300 mb-4">If both conditions are met, the meeting host (and only the host) gets an email with a CSV attachment after every meeting with 2+ participants lasting more than 2 minutes. The CSV lists each participant&apos;s name, email, total time, and join/leave timestamps.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">What If You&apos;re Not on a Paid Education Plan?</h2>
          <p className="text-gray-300 mb-4">Most teachers, coaches, therapists, and individual users aren&apos;t. The workaround is a Chrome extension that reads the same participant data the Meet UI already shows, and writes it out as an attendance log you can export.</p>
          <p className="text-gray-300 mb-4">The cleanest free option is <strong className="text-white">Trackr</strong>:</p>
          <ul className="space-y-2 list-disc pl-6 text-gray-300 mb-6">
            <li>Free forever, no signup, no premium tier</li>
            <li>Auto-logs joins, leaves, late arrivals (with a configurable threshold)</li>
            <li>Filters out transcription bots (Otter, Read.ai, Fireflies) so they don&apos;t count as attendees</li>
            <li>Exports to CSV, PDF, Excel, Google Sheets, or email</li>
            <li>Stores data locally on your laptop — nothing in the cloud, HIPAA-friendly for therapy contexts</li>
          </ul>
          <p className="text-gray-300">Installation takes about 30 seconds. The next Meet session you join, attendance gets logged automatically — no clicks during class.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Why Doesn&apos;t Google Just Ship Attendance to Free Meet?</h2>
          <p className="text-gray-300 mb-4">It&apos;s a product decision, not a technical limitation. Attendance is one of the differentiators Google uses to justify the Education Plus price tier (which also includes meeting recording, polling, breakout rooms with attendance, and other features). Free Meet exists primarily as a low-friction acquisition tool for the broader Google account ecosystem &mdash; attendance reporting isn&apos;t part of that goal.</p>
          <p className="text-gray-300">There&apos;s no current Google product roadmap commitment to add attendance to free Meet.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Does Google Meet have built-in attendance tracking?</strong><p className="text-gray-400 text-sm">Only on paid Workspace Education Plus and Standard plans. Free Meet, personal Gmail, and Workspace Business plans do not include it. Use a free Chrome extension like Trackr to add it.</p></div>
              <div><strong className="text-white block mb-1">How do I get Google Meet attendance for free?</strong><p className="text-gray-400 text-sm">Install Trackr. It auto-logs every join, leave, and late arrival. Free, no signup, local-only data.</p></div>
              <div><strong className="text-white block mb-1">Can teachers see who attended their Google Meet?</strong><p className="text-gray-400 text-sm">During the meeting, the People panel shows live participants. For a post-meeting record, paid Workspace Education plans email a report; on free Meet, a Chrome extension like Trackr captures it.</p></div>
              <div><strong className="text-white block mb-1">Why doesn&apos;t free Google Meet have attendance?</strong><p className="text-gray-400 text-sm">It&apos;s a product decision &mdash; Google reserves attendance for paid Workspace Education tiers as a feature differentiator. Third-party extensions fill the gap.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">For a deeper walkthrough see our <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">complete Google Meet attendance guide</a> or the step-by-step <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">setup tutorial</a>. To compare every available extension, see our <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">roundup of the best Google Meet attendance extensions</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Add Attendance to Free Google Meet — In 30 Seconds</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr is free forever. No signup. Local-only data. Built for teachers, coaches, and therapists.</p>
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
