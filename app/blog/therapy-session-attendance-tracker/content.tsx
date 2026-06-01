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
  ShieldCheck,
  Lock,
  HeartHandshake,
  FileText,
  Users,
  Cloud,
  CloudOff,
  Server,
  Stethoscope,
  AlertTriangle,
  Check,
  X,
  Briefcase,
  Eye,
  EyeOff,
} from "lucide-react";

export default function TherapySessionAttendanceTrackerContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">For Therapists</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">HIPAA-Friendly Therapy Session Attendance Tracker</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> May 26, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">If you run group therapy sessions or telehealth on Google Meet, you already know the attendance problem isn&apos;t really about attendance &mdash; it&apos;s about documentation. Insurance won&apos;t reimburse a group session without a record of who was in the room. The cloud-based attendance tools your colleagues use for sales meetings won&apos;t pass a HIPAA audit. And every &quot;HIPAA-compliant&quot; tool wants you to sign a BAA, vet a vendor, and trust an external party with PHI. This post walks through why local-only attendance tracking is the right architecture for therapy &mdash; and how to set it up in 30 seconds.</p>

          <div className="bg-[rgba(34,197,94,0.06)] border-l-4 border-emerald-400 p-6 rounded-r-lg my-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <p className="m-0 text-gray-200"><strong className="text-white">The architecture that works for therapy:</strong> <strong className="text-white">Trackr</strong> is a free Chrome extension that auto-logs Google Meet attendance entirely on your laptop. No cloud sync. No vendor server. No BAA required. The same attendance data you&apos;d get from a paid tool, but the data physically never leaves the device you&apos;re running it on.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Why Therapy Attendance Is Different From Everyone Else&apos;s</h2>
          <p className="text-gray-300 mb-4">A teacher tracking attendance has FERPA to think about, and that&apos;s real &mdash; but a therapist faces a stricter stack of obligations rolled into one log:</p>

          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><FileText className="w-5 h-5 text-blue-400" /><strong className="text-white">Insurance billing</strong></div>
              <p className="text-gray-400 text-sm m-0">Reimbursement for group therapy (CPT codes like 90853, 90837 for individual telehealth) requires session documentation. The attendance log is part of that record.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Lock className="w-5 h-5 text-purple-400" /><strong className="text-white">HIPAA + state laws</strong></div>
              <p className="text-gray-400 text-sm m-0">A roster identifying patients in a group session is PHI. State privacy laws (CCPA, NYSHIELD, etc.) layer additional obligations on top of HIPAA.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><HeartHandshake className="w-5 h-5 text-rose-400" /><strong className="text-white">Confidentiality contracts</strong></div>
              <p className="text-gray-400 text-sm m-0">Group therapy participants sign confidentiality agreements with each other. Any external system holding their names is a potential breach surface.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Briefcase className="w-5 h-5 text-amber-400" /><strong className="text-white">Court-required records</strong></div>
              <p className="text-gray-400 text-sm m-0">Court-ordered therapy, IOP attendance for probation, custody-related family therapy &mdash; all need auditable attendance records you can produce on request.</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Where Cloud-Based Attendance Tools Fail Therapists</h2>
          <p className="text-gray-300 mb-4">The generic SaaS attendance category (Vexa, Fellow, Read.ai, Otter, Tactiq) all share an architectural choice: your roster lives on their servers. For a sales-meeting log that&apos;s fine. For therapy, it creates four specific problems:</p>

          <div className="space-y-3 my-6">
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><Cloud className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">BAA negotiation</strong><span className="text-gray-400 text-sm">Even with a BAA, you&apos;ve added a business associate to your compliance scope. That means annual review, breach-notification obligations, and vendor audits.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><Server className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">Breach surface</strong><span className="text-gray-400 text-sm">Cloud vendors get breached. When they do, your group&apos;s roster &mdash; identifying patients by name and group topic &mdash; is in the breach disclosure.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><Eye className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">Vendor employee access</strong><span className="text-gray-400 text-sm">Most SaaS vendors&apos; engineers can technically access customer data for &quot;support purposes.&quot; That&apos;s incompatible with patient confidentiality contracts.</span></div></div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/20 flex gap-3"><AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-1" /><div><strong className="text-white block mb-1">Cross-jurisdiction data flows</strong><span className="text-gray-400 text-sm">PHI flowing through a vendor in another state (or country) creates compliance complications for therapists licensed in jurisdictions with strict data-localization rules.</span></div></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Local-Only Storage: The Architecture That Actually Fits</h2>
          <p className="text-gray-300 mb-4">Trackr is built around a different choice. Attendance data lives in your browser&apos;s local storage on the laptop you use to run sessions. There&apos;s no server, no database, no vendor employee with access. The team behind Trackr can&apos;t leak data they never had.</p>

          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="bg-[rgba(34,197,94,0.05)] p-5 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-3"><CloudOff className="w-5 h-5 text-emerald-400" /><strong className="text-white">What stays local</strong></div>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Participant names</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Join &amp; leave timestamps</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Late-arrival flags</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Session duration totals</li>
                <li className="flex items-center gap-2 text-gray-300"><Check className="w-3 h-3 text-emerald-400 shrink-0" />Notes you add manually</li>
              </ul>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3"><EyeOff className="w-5 h-5 text-gray-400" /><strong className="text-white">What Trackr can&apos;t see</strong></div>
              <ul className="space-y-1 list-none pl-0 m-0 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-gray-500 shrink-0" />Anything &mdash; no servers</li>
                <li className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-gray-500 shrink-0" />No analytics, no telemetry</li>
                <li className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-gray-500 shrink-0" />No user accounts</li>
                <li className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-gray-500 shrink-0" />No third-party processors</li>
                <li className="flex items-center gap-2 text-gray-300"><X className="w-3 h-3 text-gray-500 shrink-0" />No support-access pathways</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-300">This architecture means there&apos;s no business associate relationship to formalize. PHI doesn&apos;t leave your control, so it doesn&apos;t reach a business associate, so the BAA requirement doesn&apos;t apply. You still have your own HIPAA obligations as a covered entity &mdash; that doesn&apos;t change. But the vendor-management piece simplifies dramatically.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Use Cases for Group Therapy &amp; Telehealth</h2>

          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-[#C642FC]" /> Group therapy (DBT, CBT, support groups)</h3>
          <p className="text-gray-300 mb-4">Each session generates a participant log automatically. At the end of the group, click the Trackr icon, review the roster, export to CSV or paste into your EHR&apos;s session note. CPT code 90853 (group psychotherapy) requires documentation of group attendance &mdash; Trackr generates that documentation without disrupting the therapeutic flow.</p>

          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-[#C642FC]" /> Intensive Outpatient Programs (IOP)</h3>
          <p className="text-gray-300 mb-4">IOPs run 9&ndash;12 hours of group therapy per week across multiple sessions. Insurance requires attendance documentation at each session &mdash; and patient progression through the program depends on consistent attendance. Trackr&apos;s cross-session pattern detection flags participants who miss two sessions in a row, often before clinical staff would notice manually.</p>

          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><HeartHandshake className="w-5 h-5 text-[#C642FC]" /> Court-ordered therapy</h3>
          <p className="text-gray-300 mb-4">When a patient is court-ordered into therapy (substance use, anger management, family court mandates), attendance documentation is non-negotiable. The court may request it on short notice. Trackr keeps a permanent local log you can export to PDF for any session, going back as far as you&apos;ve had the extension installed.</p>

          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Briefcase className="w-5 h-5 text-[#C642FC]" /> Telehealth individual sessions</h3>
          <p className="text-gray-300 mb-4">One-on-one telehealth doesn&apos;t need an attendance log the way group does &mdash; but for no-show billing (typically 50&ndash;100% of session fee), late-arrival documentation, or insurance disputes, having the timestamp record helps. Trackr captures it passively.</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">30-Second Setup for a Therapy Practice</h2>
          <div className="space-y-4 my-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">1</div>
              <div>
                <strong className="text-white block mb-1">Install Trackr from the Chrome Web Store</strong>
                <p className="text-gray-400 text-sm m-0">One click. No signup, no account, no email address required.</p>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">2</div>
              <div>
                <strong className="text-white block mb-1">Confirm data is local-only in the extension settings</strong>
                <p className="text-gray-400 text-sm m-0">Trackr&apos;s default is local-only. If your practice&apos;s compliance officer asks, you can show the settings page that confirms no cloud sync is enabled (and that no such option even exists).</p>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">3</div>
              <div>
                <strong className="text-white block mb-1">Run your group on Google Meet as usual</strong>
                <p className="text-gray-400 text-sm m-0">Trackr activates when it detects the participant panel. No buttons during the session, nothing visible to participants, no bot in the meeting.</p>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] font-bold flex items-center justify-center">4</div>
              <div>
                <strong className="text-white block mb-1">Export the session log to your EHR</strong>
                <p className="text-gray-400 text-sm m-0">CSV for SimplePractice / TherapyNotes / TheraNest paste-in, PDF for paper records, or a printable summary for billing.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Compliance Checklist for Your Practice</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <ul className="space-y-3 list-none pl-0 m-0">
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Document the architectural choice.</strong> Note in your HIPAA risk assessment that attendance data is stored only in browser local storage, no business associate relationship exists.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Use a dedicated practice device.</strong> If you share a laptop across personal and clinical use, separate Chrome profiles or a clinical-only device reduces blast radius.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Encrypt the laptop at the disk level.</strong> FileVault (Mac), BitLocker (Windows). Local-only storage doesn&apos;t help if the laptop itself is lost unencrypted.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Export and clear regularly.</strong> After each session, export the log to your secure EHR or encrypted local folder, then clear it from Trackr. Keeps the active dataset small.</div></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-400 shrink-0 mt-1" /><div><strong className="text-white">Don&apos;t install Trackr on a shared / unmanaged browser.</strong> Public computers, library machines, kiosks &mdash; never run a session log from those.</div></li>
              <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-1" /><div><strong className="text-white">Consult your compliance officer.</strong> Trackr&apos;s architecture removes the BAA requirement &mdash; but your practice&apos;s specific policies may still require sign-off. This blog post is not legal advice.</div></li>
            </ul>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-4">
              <div><strong className="text-white block mb-1">Is there a HIPAA-friendly attendance tracker for therapy sessions?</strong><p className="text-gray-400 text-sm">Yes &mdash; Trackr stores attendance entirely on your laptop with no cloud sync. No BAA required because no PHI ever leaves your device. Free, no signup.</p></div>
              <div><strong className="text-white block mb-1">Do I need a Business Associate Agreement (BAA) to use Trackr?</strong><p className="text-gray-400 text-sm">No. A BAA is required when you share PHI with an external vendor. Trackr&apos;s team has no server, no database, no access to your roster. Without data leaving your control, the BAA requirement doesn&apos;t apply.</p></div>
              <div><strong className="text-white block mb-1">How do therapists document group session attendance for insurance billing?</strong><p className="text-gray-400 text-sm">Insurance reimbursement for group therapy (CPT 90853 and others) requires a participant log. Trackr auto-generates this for every Google Meet group session and exports as CSV, PDF, or directly into Sheets for EHR paste-in.</p></div>
              <div><strong className="text-white block mb-1">Can I use Trackr for telehealth one-on-one sessions?</strong><p className="text-gray-400 text-sm">Yes, though one-on-one usually doesn&apos;t need a formal log. Trackr captures it passively if you do need documentation (no-show billing, court-required records).</p></div>
              <div><strong className="text-white block mb-1">What&apos;s the difference between Trackr and a cloud-based attendance tool?</strong><p className="text-gray-400 text-sm">Cloud tools (Vexa, Fellow) store your roster on their servers &mdash; that&apos;s PHI in third-party hands, which requires a BAA and vendor due diligence. Trackr stores nothing externally; the same data exists, but locally on your laptop only.</p></div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">For more context on Google Meet attendance setup generally, see our <a href="/blog/google-meet-attendance" className="text-[#C642FC] hover:underline">complete Google Meet attendance guide</a>, the <a href="/blog/how-to-take-attendance-on-google-meet" className="text-[#C642FC] hover:underline">step-by-step tutorial</a>, or the <a href="/blog/best-google-meet-attendance-extensions" className="text-[#C642FC] hover:underline">comparison of attendance extensions</a>. For other persona angles, see our guides for <a href="/blog/google-meet-attendance-for-teachers" className="text-[#C642FC] hover:underline">teachers</a> and <a href="/blog/attendance-tracker-for-online-classes" className="text-[#C642FC] hover:underline">online instructors</a>.</p>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(34,197,94,0.05)] border border-emerald-500/20">
            <div className="flex items-center justify-center gap-2 mb-4"><ShieldCheck className="w-6 h-6 text-emerald-400" /><h2 className="text-3xl font-bold text-white m-0">HIPAA-Friendly. Local-Only. Free.</h2></div>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Trackr stores attendance data only on your laptop &mdash; no BAA, no signup, no cloud. Built for therapists, counselors, and group facilitators.</p>
            <a href="https://meet-attendence-website.vercel.app" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">Get Trackr Free <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
            <p className="text-xs text-gray-500 mt-6 max-w-lg mx-auto">This post is not legal or compliance advice. Consult your practice&apos;s HIPAA officer before deploying any new tool with PHI workflows.</p>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
