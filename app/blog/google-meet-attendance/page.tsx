import type { Metadata } from "next";
import GoogleMeetAttendanceContent from "./content";

export const metadata: Metadata = {
  title: "Google Meet Attendance: The Complete 2026 Guide (Free)",
  description: "Everything you need to know about Google Meet attendance — what Google ships natively, what's missing, and how to add full automatic attendance tracking with a free Chrome extension. Built for teachers, coaches, and therapists.",
  keywords: "google meet attendance, google meet attendance tracker, google meet attendance extension, free google meet attendance, google meet attendance for teachers, google meet roster, take attendance google meet, google meet attendance report",
  alternates: { canonical: "/blog/google-meet-attendance" },
  openGraph: { title: "Google Meet Attendance: The Complete 2026 Guide (Free)", description: "Everything you need to know about Google Meet attendance — what Google ships natively, what's missing, and how to add full automatic attendance tracking with a free Chrome extension.", type: "article", url: "/blog/google-meet-attendance" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Google Meet Attendance: The Complete 2026 Guide", "description": "Everything you need to know about Google Meet attendance — what Google ships natively, what's missing, and how to add full automatic attendance tracking with a free Chrome extension.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-23", "dateModified": "2026-05-23", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "Does Google Meet have built-in attendance tracking?", "acceptedAnswer": { "@type": "Answer", "text": "Only on paid Google Workspace for Education Plus and Standard plans. The free version of Google Meet does not include attendance reports. To add attendance tracking to free Google Meet, install a free Chrome extension like Trackr, which auto-logs joins, leaves, and late arrivals." } },
  { "@type": "Question", "name": "Is there a free attendance tracker for Google Meet?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Trackr is a free Chrome extension that automatically tracks attendance in Google Meet sessions. It requires no signup, no payment, and stores your data locally on your laptop — nothing in the cloud." } },
  { "@type": "Question", "name": "How do I see who joined my Google Meet?", "acceptedAnswer": { "@type": "Answer", "text": "During the meeting, click the People icon in the Meet controls to see the live participant panel. To get a permanent record after the meeting ends, you need either a paid Workspace Education plan (which emails you an attendance report) or a Chrome extension like Trackr (which auto-logs everyone and lets you export to CSV, PDF, Excel, or Google Sheets)." } },
  { "@type": "Question", "name": "Can teachers use Google Meet attendance without IT involvement?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Google's native attendance feature requires an IT admin to enable it org-wide on a paid Education plan. But a Chrome extension like Trackr installs in one click on your own browser — no IT ticket, no admin permissions, no purchasing process." } },
  { "@type": "Question", "name": "Does attendance tracking work on the Google Meet mobile app?", "acceptedAnswer": { "@type": "Answer", "text": "No. Browser-based attendance extensions only work on the Chrome desktop version of Google Meet. The mobile app, tablet apps, and Smart TV apps do not support browser extensions. To track mobile attendance, you would need to use Meet in Chrome on a laptop, or wait for native attendance to ship in the mobile app." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GoogleMeetAttendanceContent />
    </>
  );
}
