import type { Metadata } from "next";
import HowToTakeAttendanceOnGoogleMeetContent from "./content";

export const metadata: Metadata = {
  title: "How to Take Attendance on Google Meet (Free, 30-Second Setup)",
  description: "The fastest way to take attendance on Google Meet — free, no signup, no IT ticket. Step-by-step guide with screenshots, plus tips for late arrivals and exports.",
  keywords: "how to take attendance on google meet, take attendance google meet, google meet attendance, free google meet attendance, google meet roll call, attendance for google meet teachers",
  alternates: { canonical: "/blog/how-to-take-attendance-on-google-meet" },
  openGraph: { title: "How to Take Attendance on Google Meet (Free, 30-Second Setup)", description: "The fastest way to take attendance on Google Meet — free, no signup, no IT ticket. Step-by-step guide.", type: "article", url: "/blog/how-to-take-attendance-on-google-meet" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "How to Take Attendance on Google Meet (Free, 30-Second Setup)", "description": "Step-by-step guide to taking attendance on Google Meet for free using a Chrome extension.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-23", "dateModified": "2026-05-23", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take Attendance on Google Meet for Free",
  "description": "Set up automatic attendance tracking on Google Meet in under 30 seconds using the free Trackr Chrome extension.",
  "totalTime": "PT1M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
  "tool": [
    { "@type": "HowToTool", "name": "Google Chrome browser" },
    { "@type": "HowToTool", "name": "Trackr Chrome extension" },
    { "@type": "HowToTool", "name": "A Google Meet session" }
  ],
  "step": [
    { "@type": "HowToStep", "name": "Install Trackr", "text": "Open the Chrome Web Store, search for Trackr (the free Google Meet attendance extension), and click Add to Chrome. Confirm the install prompt." },
    { "@type": "HowToStep", "name": "Open Google Meet in Chrome", "text": "Sign in to your Google account and start (or join) any Google Meet session in your Chrome browser." },
    { "@type": "HowToStep", "name": "Start the meeting", "text": "Trackr activates automatically as soon as it detects the Meet participant panel. No buttons to click during class." },
    { "@type": "HowToStep", "name": "View attendance after the meeting", "text": "After the meeting ends, click the Trackr icon in your Chrome toolbar to see who joined, when, and whether they were late." },
    { "@type": "HowToStep", "name": "Export your roster", "text": "Choose your export format — CSV, PDF, Excel, Google Sheets, or email. The file downloads instantly with timestamps for every participant." }
  ]
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "Can I take attendance on Google Meet for free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Free Chrome extensions like Trackr add automatic attendance tracking to free Google Meet at zero cost. No signup, no payment, no trial. The extension installs in one click and activates automatically when you join a meeting." } },
  { "@type": "Question", "name": "Does Google Meet automatically take attendance?", "acceptedAnswer": { "@type": "Answer", "text": "Only on paid Workspace Education Plus and Standard plans. Free Google Meet, personal Gmail accounts, and Workspace Business plans do not include automatic attendance reports." } },
  { "@type": "Question", "name": "How do I export Google Meet attendance to Excel?", "acceptedAnswer": { "@type": "Answer", "text": "Install the Trackr Chrome extension. After your meeting ends, open Trackr and choose the Excel (.xlsx) export. The file includes participant name, join time, leave time, total duration, and late-arrival flags." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToTakeAttendanceOnGoogleMeetContent />
    </>
  );
}
