"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock, Check, X, Monitor, Smartphone, Tablet, Globe, AlertCircle } from "lucide-react";

export default function TranslatePageInSafariContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">How to Translate a Web Page in Safari (Mac, iPhone, iPad)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 20, 2026</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="lead text-xl leading-relaxed">Safari has had a built-in translation feature since 2020, but many users still do not know it exists or how to use it effectively. Whether you are browsing a foreign news site, reading a recipe in another language, or researching content for language learning, Safari can translate entire web pages with just a couple of taps. Here is everything you need to know about translating pages in Safari on Mac, iPhone, and iPad.</p>

          <p>If you are interested in using web translation as part of a language learning strategy, check out our guide on <a href="/blog/website-translation-language-learning" className="text-[#C642FC] hover:underline">website translation for language learning</a>.</p>

          <hr className="border-white/10 my-10" />

          {/* Mac Instructions */}
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-[#C642FC]" />
            <h2 className="text-3xl font-bold text-white m-0">Translate a Web Page in Safari on Mac</h2>
          </div>
          <p>Safari&apos;s translation on macOS is straightforward once you know where to look. Follow these steps:</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <ol className="space-y-4 list-none pl-0 m-0 counter-reset-none">
              {[
                { step: "1", title: "Open the web page", desc: "Navigate to any web page that is in a language different from your Mac's system language." },
                { step: "2", title: "Look for the translate icon", desc: "In the address bar (Smart Search Field), you will see a translate icon — it looks like two overlapping speech bubbles. If the icon does not appear, Safari does not detect a translatable foreign language on the page." },
                { step: "3", title: "Click the translate icon", desc: "A dropdown menu will appear showing the detected language and your preferred language." },
                { step: "4", title: "Select 'Translate to [Your Language]'", desc: "Click this option and Safari will translate the entire page. The text is replaced inline, so the layout stays intact." },
                { step: "5", title: "View the original", desc: "To switch back, click the translate icon again and select 'View Original'. You can toggle back and forth as needed." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-sm font-bold">{item.step}</span>
                  <div>
                    <strong className="text-white">{item.title}</strong>
                    <p className="text-gray-400 text-sm mt-1 mb-0">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p><strong className="text-white">Requirement:</strong> macOS Big Sur (11.0) or later. If you are running an older version of macOS, you will not have the built-in translation feature and will need a third-party solution.</p>

          <hr className="border-white/10 my-10" />

          {/* iPhone Instructions */}
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-[#C642FC]" />
            <h2 className="text-3xl font-bold text-white m-0">Translate a Web Page in Safari on iPhone</h2>
          </div>
          <p>Translating pages on iPhone is even simpler since Safari is the default browser for most iOS users.</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <ol className="space-y-4 list-none pl-0 m-0">
              {[
                { step: "1", title: "Open Safari and navigate to the page", desc: "Go to any web page in a foreign language using Safari on your iPhone." },
                { step: "2", title: "Tap the 'aA' button", desc: "In the address bar, tap the 'aA' button on the left side. This opens the page settings menu." },
                { step: "3", title: "Tap 'Translate to [Language]'", desc: "You will see a 'Translate to English' (or your system language) option. Tap it." },
                { step: "4", title: "Confirm if prompted", desc: "The first time you use this feature, Apple may ask you to confirm. Tap 'Enable Translation' to proceed." },
                { step: "5", title: "Toggle back anytime", desc: "To view the original, tap the 'aA' button again and select 'View Original'." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-sm font-bold">{item.step}</span>
                  <div>
                    <strong className="text-white">{item.title}</strong>
                    <p className="text-gray-400 text-sm mt-1 mb-0">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p><strong className="text-white">Requirement:</strong> iOS 14 or later. Most iPhones in use today support this, but if your device is stuck on an older version, the translate option will not appear.</p>

          <hr className="border-white/10 my-10" />

          {/* iPad Instructions */}
          <div className="flex items-center gap-3 mb-4">
            <Tablet className="w-6 h-6 text-[#C642FC]" />
            <h2 className="text-3xl font-bold text-white m-0">Translate a Web Page in Safari on iPad</h2>
          </div>
          <p>The process on iPad is nearly identical to iPhone, with a slight difference in where the button appears depending on your iPad model and orientation.</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <ol className="space-y-4 list-none pl-0 m-0">
              {[
                { step: "1", title: "Open a foreign language page in Safari", desc: "Navigate to any page written in a supported foreign language." },
                { step: "2", title: "Tap the 'aA' button in the address bar", desc: "On iPad, this is in the top-left of the address bar (similar to iPhone). On newer iPadOS versions, you may also see the translate icon directly." },
                { step: "3", title: "Select 'Translate to [Language]'", desc: "The translation will happen inline, preserving the page layout and images." },
                { step: "4", title: "Switch back with 'View Original'", desc: "Use the same menu to toggle back to the original language whenever you want." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-sm font-bold">{item.step}</span>
                  <div>
                    <strong className="text-white">{item.title}</strong>
                    <p className="text-gray-400 text-sm mt-1 mb-0">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p><strong className="text-white">Requirement:</strong> iPadOS 14 or later.</p>

          <hr className="border-white/10 my-10" />

          {/* Supported Languages */}
          <h2 className="text-3xl font-bold text-white">Supported Languages</h2>
          <p>As of 2026, Safari&apos;s built-in translation supports approximately 20 languages. Apple has been steadily adding more with each OS release. Here is the current list:</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "English", "Spanish", "French", "German", "Italian", "Portuguese (Brazil)",
                "Russian", "Chinese (Simplified)", "Chinese (Traditional)", "Japanese", "Korean",
                "Arabic", "Dutch", "Indonesian", "Polish", "Thai", "Turkish", "Ukrainian", "Vietnamese"
              ].map((lang, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <Globe className="w-3 h-3 text-[#C642FC] shrink-0" />
                  {lang}
                </div>
              ))}
            </div>
          </div>

          <p>If you need a language that is not on this list &mdash; for example, Hindi, Swahili, or Finnish &mdash; you will need to use a third-party translation tool instead.</p>

          <hr className="border-white/10 my-10" />

          {/* Limitations */}
          <h2 className="text-3xl font-bold text-white">Limitations of Safari Translation</h2>
          <p>While Safari&apos;s built-in translation is convenient, it does have some notable limitations you should be aware of:</p>

          <div className="space-y-3 my-8">
            {[
              { title: "Limited language support", desc: "Only about 20 languages are supported, far fewer than Google Translate's 130+." },
              { title: "No bilingual view", desc: "Safari replaces the original text entirely. You cannot view the original and translated text side by side, which limits its usefulness for language learning." },
              { title: "Does not work with PDFs", desc: "PDF files opened in Safari cannot be translated using the built-in feature." },
              { title: "JavaScript-heavy pages may fail", desc: "Pages that render content dynamically via JavaScript (like single-page apps) may not be fully detected or translated." },
              { title: "No word-level translations", desc: "You cannot click individual words for definitions or pronunciation — it is all-or-nothing page translation." },
              { title: "Accuracy varies", desc: "For complex or technical content, Safari's translations can be less accurate than Google Translate or DeepL." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white text-sm">{item.title}</strong>
                  <p className="text-gray-400 text-sm mt-1 mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-white/10 my-10" />

          {/* What to Do When Translation Isn't Available */}
          <h2 className="text-3xl font-bold text-white">What to Do When Translation Is Not Available</h2>
          <p>If Safari&apos;s translate option is not appearing or the language you need is not supported, here are some workarounds:</p>

          <ul className="space-y-2 list-none pl-0 my-6">
            {[
              "Reload the page — sometimes Safari needs a fresh load to detect the language.",
              "Check your OS version — translation requires macOS Big Sur / iOS 14 or later.",
              "Copy the URL and paste it into Google Translate's website translation tool (translate.google.com).",
              "Use a browser extension like Google Translate or Microsoft Translator for broader language support.",
              "Switch to Chrome or Edge temporarily, which have built-in Google Translate with 130+ languages.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-green-400 mt-1 shrink-0" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <hr className="border-white/10 my-10" />

          {/* Third-Party Alternatives */}
          <h2 className="text-3xl font-bold text-white">Third-Party Alternatives</h2>
          <p>If Safari&apos;s built-in translation does not meet your needs, these third-party tools can fill the gap:</p>

          <div className="space-y-4 my-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-2">Google Translate Extension</h3>
              <p className="text-gray-300 mb-3">While Google Translate does not have an official Safari extension, you can use the Google Translate website to translate any URL. Simply go to translate.google.com, paste the page URL, select your target language, and click the translated link. It supports 130+ languages and handles most page types well.</p>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> 130+ languages</span>
                <span className="flex items-center gap-1 text-red-400"><X className="w-4 h-4" /> No Safari extension</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mt-0 mb-2">Microsoft Translator</h3>
              <p className="text-gray-300 mb-3">Microsoft offers a Translator extension for Safari on Mac. It adds a translate button to your toolbar and supports over 70 languages. The translation quality is comparable to Google Translate for major languages. It is free to use and integrates smoothly with Safari&apos;s interface.</p>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> Safari extension available</span>
                <span className="flex items-center gap-1 text-green-400"><Check className="w-4 h-4" /> 70+ languages</span>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Web Translation for Language Learning */}
          <h2 className="text-3xl font-bold text-white">Using Web Translation for Language Learning</h2>
          <p>Page translation is not just a convenience feature &mdash; it can be a legitimate language learning tool when used strategically. Here are some effective approaches:</p>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10 my-8">
            <ul className="space-y-3 list-none pl-0 m-0">
              {[
                { title: "Read-then-compare method", desc: "Try reading the original page first, then translate to check your comprehension. This builds reading skills actively." },
                { title: "Paragraph-by-paragraph study", desc: "Read one paragraph in the original language, translate to check understanding, then re-read the original. This reinforces vocabulary in context." },
                { title: "News immersion", desc: "Read daily news in your target language using sites like NHK (Japanese), El Pais (Spanish), or Le Monde (French). Use translation as a safety net when you get stuck." },
                { title: "Vocabulary mining", desc: "When you encounter unknown words on translated pages, note them down for later study. Seeing words in real-world context helps retention." },
              ].map((item, i) => (
                <li key={i} className="text-sm">
                  <strong className="text-white">{item.title}:</strong>
                  <span className="text-gray-300 ml-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>The biggest limitation of standard page translation for learning is that it is all-or-nothing &mdash; you see either the original or the translation, never both. This is where specialized language learning tools have an advantage.</p>

          <hr className="border-white/10 my-10" />

          {/* Funlingo Alternative */}
          <h2 className="text-3xl font-bold text-white">Funlingo: A Better Option for Language Learners</h2>
          <div className="bg-[rgba(198,66,252,0.05)] rounded-xl p-8 border border-[#C642FC]/20 my-8">
            <p className="text-gray-300 mb-4">If your goal is not just to understand a page but to actually learn the language, a standard translator falls short. Funlingo takes a different approach &mdash; instead of replacing text, it helps you learn from the content you are already watching and reading online.</p>

            <p className="text-gray-300 mb-4">Funlingo&apos;s website translation feature shows bilingual text side by side, lets you click individual words for instant definitions and pronunciation, and saves vocabulary for later review. Combined with dual subtitles on Netflix, YouTube, and Prime Video, it turns your entire browsing and streaming experience into a language lesson.</p>

            <ul className="space-y-2 list-none pl-0 mb-4">
              {[
                "Bilingual web page display — see original and translation together",
                "Click any word for instant translation and pronunciation",
                "Dual subtitles on Netflix, YouTube, and Prime Video",
                "AI-powered grammar and context explanations",
                "Built-in vocabulary saver across all features",
                "Completely free — no subscription, no account required",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-green-400 mt-1 shrink-0" /><span className="text-gray-200">{f}</span></li>
              ))}
            </ul>
          </div>

          <hr className="border-white/10 my-10" />

          {/* FAQ */}
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>

          <div className="space-y-6 my-8">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">How many languages does Safari translate?</h3>
              <p className="text-gray-300 m-0">Safari supports approximately 20 languages for its built-in translation feature as of 2026. This includes major languages like English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, Russian, and Portuguese. Apple typically adds a few new languages with each major OS update, so the list continues to grow slowly.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">Why is translate not showing in Safari?</h3>
              <p className="text-gray-300 m-0">There are several reasons the translate option might not appear. First, make sure you are running macOS Big Sur or later (or iOS 14+ on iPhone/iPad). The feature does not exist on older OS versions. Second, Safari may not detect the page language if the page uses JavaScript rendering, has mixed languages, or is already in your device&apos;s system language. Try reloading the page. If the page language is not in Safari&apos;s supported list, the option will not appear at all.</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">Can Safari translate PDFs?</h3>
              <p className="text-gray-300 m-0">No. Safari&apos;s built-in translation feature does not work with PDF files viewed in the browser. PDFs are rendered as document objects rather than standard HTML, so Safari cannot apply its page translation to them. If you need to translate a PDF, use Google Translate&apos;s document upload feature at translate.google.com, or a dedicated tool like DeepL&apos;s document translator.</p>
            </div>
          </div>

          <hr className="border-white/10 my-10" />

          {/* Final CTA */}
          <div className="bg-[rgba(198,66,252,0.05)] rounded-xl p-8 border border-[#C642FC]/20 text-center my-8">
            <h2 className="text-2xl font-bold text-white mt-0 mb-3">Go Beyond Simple Translation</h2>
            <p className="text-gray-300 mb-6">Safari translates pages, but Funlingo helps you actually learn. Get dual subtitles, word-level translations, pronunciation audio, and vocabulary tools &mdash; all free.</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] text-white px-8 py-4 text-lg rounded-full hover:opacity-90 transition-opacity">
                Add Funlingo to Chrome &mdash; It&apos;s Free <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
