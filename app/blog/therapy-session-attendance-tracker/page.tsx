import type { Metadata } from "next";
import TherapySessionAttendanceTrackerContent from "./content";

export const metadata: Metadata = {
  title: "HIPAA-Friendly Therapy Session Attendance Tracker (Free, Local-Only)",
  description: "Group therapy and telehealth need an attendance tracker that doesn't store your roster in someone else's cloud. Trackr is a free Chrome extension for Google Meet sessions — local-only data, no BAA required, no signup. Built for therapists, counselors, and group facilitators.",
  keywords: "therapy session attendance tracker, hipaa attendance tracker, group therapy attendance, telehealth attendance, therapist attendance google meet, hipaa friendly attendance tool, group session attendance, attendance tracker for therapists, counseling group attendance",
  alternates: { canonical: "/blog/therapy-session-attendance-tracker" },
  openGraph: { title: "HIPAA-Friendly Therapy Session Attendance Tracker (Free, Local-Only)", description: "A free Chrome extension that logs Google Meet attendance for group therapy and telehealth — local-only data, no BAA required.", type: "article", url: "/blog/therapy-session-attendance-tracker" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "HIPAA-Friendly Therapy Session Attendance Tracker (Free, Local-Only)", "description": "A free Chrome extension for tracking group therapy and telehealth session attendance — local-only storage, no BAA required.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-26", "dateModified": "2026-05-26", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "Is there a HIPAA-friendly attendance tracker for therapy sessions?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trackr is a free Chrome extension that logs Google Meet attendance entirely on your laptop — no cloud sync, no server, no third-party data processor. Because nothing leaves your device, there's no Business Associate Agreement (BAA) to negotiate and nothing for an external vendor to leak. Most cloud-based attendance tools require a BAA before they can be used with PHI; Trackr sidesteps that requirement by design." } },
  { "@type": "Question", "name": "Do I need a Business Associate Agreement (BAA) to use Trackr?", "acceptedAnswer": { "@type": "Answer", "text": "No. A BAA is required when you share Protected Health Information (PHI) with an external vendor. Trackr stores attendance data only in your browser's local storage on your laptop — the Trackr team has no server, no database, and no access to your roster. Without data leaving your control, there's no business associate relationship and no BAA needed." } },
  { "@type": "Question", "name": "How do therapists document group session attendance for insurance billing?", "acceptedAnswer": { "@type": "Answer", "text": "Insurance reimbursement for group therapy (CPT code 90853 and others) typically requires a participant log showing who attended, when they joined, and how long they stayed. Trackr auto-generates this for every Google Meet group session and exports it as a CSV, PDF, or directly into Google Sheets for paste-into-EHR workflows. Free, no signup, local-only." } },
  { "@type": "Question", "name": "Can I use Trackr for telehealth one-on-one sessions?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — though one-on-one telehealth usually doesn't need an attendance log the way group therapy does. Trackr works in any Google Meet session, so if you do need a record (for missed-appointment documentation, no-show billing, or court-required attendance verification), Trackr logs it automatically." } },
  { "@type": "Question", "name": "What's the difference between Trackr and a cloud-based attendance tool?", "acceptedAnswer": { "@type": "Answer", "text": "Cloud-based tools (Vexa, Fellow, Read.ai) store your attendance roster on the vendor's servers. For therapy use, that means PHI flowing through a third party — which requires a signed BAA, vendor due diligence, and ongoing compliance oversight. Trackr stores nothing externally. The same attendance data exists, but it lives in your browser's local storage, accessible only to you on that specific laptop." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TherapySessionAttendanceTrackerContent />
    </>
  );
}
