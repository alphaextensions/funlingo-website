import type { Metadata } from "next";
import TranslatePageInSafariContent from "./content";

export const metadata: Metadata = {
  title: "How to Translate a Web Page in Safari (Mac, iPhone, iPad) | FunLingo",
  description: "Step-by-step guide to translating web pages in Safari on Mac, iPhone, and iPad. Learn about Safari's built-in translation, supported languages, limitations, and the best third-party alternatives for 2026.",
  keywords: "how to translate a page in safari, safari translate web page, translate website safari mac, safari translation iphone, safari translate not showing, translate page safari ipad",
  alternates: {
    canonical: "/blog/translate-page-in-safari",
  },
  openGraph: {
    title: "How to Translate a Web Page in Safari (Mac, iPhone, iPad)",
    description: "Step-by-step guide to translating web pages in Safari on Mac, iPhone, and iPad. Learn about Safari's built-in translation, supported languages, limitations, and the best third-party alternatives for 2026.",
    type: "article",
    url: "/blog/translate-page-in-safari",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Translate a Web Page in Safari (Mac, iPhone, iPad)",
  "description": "Step-by-step guide to translating web pages in Safari on Mac, iPhone, and iPad. Learn about Safari's built-in translation, supported languages, limitations, and the best third-party alternatives for 2026.",
  "author": { "@type": "Organization", "name": "FunLingo Team" },
  "datePublished": "2026-03-20",
  "dateModified": "2026-03-20",
  "image": "https://getfunlingo.com/og-image.jpg",
  "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How many languages does Safari translate?", "acceptedAnswer": { "@type": "Answer", "text": "As of 2026, Safari's built-in translation supports around 20 languages including English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified and Traditional), Japanese, Korean, Arabic, Dutch, Indonesian, Polish, Thai, Turkish, Ukrainian, and Vietnamese. Apple adds new languages with each major OS update." } },
    { "@type": "Question", "name": "Why is translate not showing in Safari?", "acceptedAnswer": { "@type": "Answer", "text": "The translate option may not appear if the page language is not supported, the page is already in your device language, your OS version is outdated (translation requires iOS 14+ or macOS Big Sur+), or the page uses complex JavaScript rendering that Safari cannot detect. Try reloading the page or updating your OS." } },
    { "@type": "Question", "name": "Can Safari translate PDFs?", "acceptedAnswer": { "@type": "Answer", "text": "No, Safari's built-in translation does not work with PDF files opened in the browser. PDFs are rendered differently from standard web pages, so Safari cannot detect or translate their text content. For PDF translation, use a dedicated tool like Google Translate's document upload feature or a third-party PDF translation service." } }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TranslatePageInSafariContent />
    </>
  );
}
