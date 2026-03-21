import type { Metadata } from "next";
import UnlessMeaningContent from "./content";

export const metadata: Metadata = {
  title: "'Unless' — Meaning, Grammar Rules & Examples",
  description: "Master the word 'unless' in English. Complete guide with meaning, grammar rules, conditional sentence patterns, common mistakes, and 30+ example sentences for ESL learners.",
  keywords: "unless, unless meaning, unless grammar, unless in a sentence, unless conditional, unless vs if not, unless examples, english grammar unless, unless meaning in english, learn english grammar, funlingo",
  alternates: { canonical: "/blog/unless-meaning" },
  openGraph: { title: "'Unless' — Meaning, Grammar Rules & Examples", description: "Complete guide to using 'unless' in English with grammar rules and examples.", type: "article", url: "/blog/unless-meaning" },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": "'Unless' — Meaning, Grammar Rules & Examples", "description": "Complete guide to using 'unless' in English with grammar rules and examples.", "author": { "@type": "Organization", "name": "Funlingo Team" }, "datePublished": "2026-03-21", "dateModified": "2026-03-21", "image": "https://getfunlingo.com/og-image.jpg", "publisher": { "@type": "Organization", "name": "Funlingo", "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" } } };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What does 'unless' mean?", "acceptedAnswer": { "@type": "Answer", "text": "'Unless' means 'except if' or 'if...not.' It introduces a condition that is the only exception to a statement. For example, 'I won't go unless you come with me' means 'I won't go if you don't come with me.'" } }, { "@type": "Question", "name": "What is the difference between 'unless' and 'if not'?", "acceptedAnswer": { "@type": "Answer", "text": "'Unless' and 'if not' are often interchangeable in first conditional sentences. However, 'unless' cannot be used with unreal/hypothetical conditions (second and third conditionals). You can say 'If I hadn't been tired, I would have come' but NOT 'Unless I had been tired, I would have come.'" } }] };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UnlessMeaningContent />
    </>
  );
}
