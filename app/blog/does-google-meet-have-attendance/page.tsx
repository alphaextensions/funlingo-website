import type { Metadata } from "next";
import DoesGoogleMeetHaveAttendanceContent from "./content";

export const metadata: Metadata = {
  title: "Does Google Meet Have Attendance? (2026 Answer + Free Workaround)",
  description: "Free Google Meet does not have attendance tracking — only paid Workspace Education Plus and Standard plans do. But you can add full automatic attendance for free in 30 seconds. Here's how.",
  keywords: "does google meet have attendance, google meet attendance feature, does google meet take attendance, google meet attendance free, google meet attendance report, can google meet track attendance",
  alternates: { canonical: "/blog/does-google-meet-have-attendance" },
  openGraph: { title: "Does Google Meet Have Attendance? (2026 Answer + Free Workaround)", description: "Free Google Meet does not have attendance tracking. But you can add it for free in 30 seconds. Here's how.", type: "article", url: "/blog/does-google-meet-have-attendance" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "Does Google Meet Have Attendance? (2026 Answer + Free Workaround)", "description": "Free Google Meet does not have attendance tracking. Only paid Workspace Education Plus and Standard plans include it natively.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-05-23", "dateModified": "2026-05-23", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  { "@type": "Question", "name": "Does Google Meet have built-in attendance tracking?", "acceptedAnswer": { "@type": "Answer", "text": "Only on paid Google Workspace for Education Plus and Standard plans. The free version of Google Meet, personal Gmail accounts, and Workspace Business plans do not include attendance reports. To add attendance tracking to free Google Meet, install a free Chrome extension like Trackr." } },
  { "@type": "Question", "name": "How do I get Google Meet attendance for free?", "acceptedAnswer": { "@type": "Answer", "text": "Install the free Trackr Chrome extension. It auto-logs joins, leaves, and late arrivals in any Google Meet session, exports to CSV/Sheets/Excel/PDF, and stores data locally on your laptop. No signup, no payment, no IT admin required." } },
  { "@type": "Question", "name": "Can teachers see who attended their Google Meet?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. During the meeting, the People panel shows live participants. For a post-meeting record, paid Workspace Education plans email an attendance report; on free Meet, a Chrome extension like Trackr captures the same data and lets you export it in any format." } },
  { "@type": "Question", "name": "Why doesn't free Google Meet have attendance?", "acceptedAnswer": { "@type": "Answer", "text": "Google reserves the native attendance feature for its paid Workspace Education Plus and Standard tiers as a differentiator. It's a product decision, not a technical limitation. Third-party Chrome extensions fill the gap for free." } }
]};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DoesGoogleMeetHaveAttendanceContent />
    </>
  );
}
