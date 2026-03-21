import * as React from "react";
import Navbar from "@/pages/sections/navbar";
import { FooterSection } from "@/pages/sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Shield, Zap, Globe, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DualSubtitleExtensionPost = (): React.JSX.Element => {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "7 Best Dual Subtitle Extensions for Language Learning (2026)",
        "description": "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video — including one that's completely free.",
        "author": { "@type": "Organization", "name": "Funlingo Team" },
        "datePublished": "2026-03-14",
        "dateModified": "2026-03-14",
        "image": "https://getfunlingo.com/og-image.jpg",
        "publisher": {
            "@type": "Organization",
            "name": "Funlingo",
            "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" }
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a dual subtitle extension?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A dual subtitle extension is a Chrome browser extension that displays subtitles in two languages simultaneously while you watch videos on platforms like Netflix, YouTube, and Prime Video. The original language appears alongside your native language, letting you follow the dialogue while naturally picking up new vocabulary."
                }
            },
            {
                "@type": "Question",
                "name": "Are there any completely free dual subtitle extensions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Funlingo is completely free with all features unlocked — no premium tier, no trial period, and no paywall. Most other dual subtitle extensions offer a limited free version with advanced features locked behind a paid subscription."
                }
            },
            {
                "@type": "Question",
                "name": "Can dual subtitles actually help you learn a language?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes — when used actively. Research in applied linguistics supports the effectiveness of bilingual subtitle exposure for vocabulary acquisition. Passive watching alone has limited impact, but clicking on words, saving vocabulary, and reviewing with spaced repetition turns entertainment into measurable learning."
                }
            },
            {
                "@type": "Question",
                "name": "Do dual subtitle extensions slow down my browser?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Modern dual subtitle extensions are lightweight and should not noticeably slow down your browser or streaming playback. Funlingo uses a privacy-first design that renders subtitles locally, minimizing data transfer."
                }
            },
            {
                "@type": "Question",
                "name": "Which dual subtitle extension works on Netflix, YouTube, and Prime Video?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Funlingo is the only free dual subtitle extension that fully supports all three major streaming platforms — Netflix, YouTube, and Amazon Prime Video — plus websites."
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <SEO
                title="7 Best Dual Subtitle Extensions for Language Learning (2026) | Funlingo"
                description="Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video — including one that's completely free."
                keywords="best dual subtitle extension, dual subtitle chrome extension, bilingual subtitles extension, dual subtitles netflix, dual subtitles youtube, language learning chrome extension"
                canonical="/blog/best-dual-subtitle-extension"
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Navbar currentPage="/blog" />

            {/* Hero Section */}
            <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
                    <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
                        Blog Post
                    </Badge>
                    <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        7 Best Dual Subtitle Extensions for Language Learning (2026)
                    </h1>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
                        <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo Team</div>
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 min read</div>
                    </div>
                </div>
            </section>

            <main className="w-full max-w-3xl mx-auto px-6 pb-24">
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">

                    {/* Intro */}
                    <p className="lead text-xl leading-relaxed text-gray-200 mb-6">
                        You found a dual subtitle extension, installed it, opened Netflix in Spanish — and then hit a paywall the moment you tried to save a word. Sound familiar?
                    </p>
                    <p className="text-gray-300 mb-6">
                        Most "free" subtitle tools lock their best features behind a subscription. Pronunciation guides, vocabulary saving, AI explanations — the tools that actually help you learn — are almost always premium-only. It is frustrating, and it wastes your time.
                    </p>
                    <p className="text-gray-300 mb-6">
                        We tested seven of the most popular dual subtitle extensions to find the <strong className="text-white">best dual subtitle extension</strong> for language learners in 2026. We looked at pricing, platform support, learning features, and ease of use — and gave each one an honest breakdown of what you actually get for free versus what costs money.
                    </p>
                    <p className="text-gray-300 mb-6">
                        The good news? One of these extensions gives you everything — AI explanations, pronunciation guides, a Vocabulary Builder, Reading Mode, and multi-platform support — without charging a single cent.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* What to Look For */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What to Look For in a Dual Subtitle Extension</h2>
                    <p className="text-gray-300 mb-6">Before diving into the list, here is what separates a great bilingual subtitles extension from a mediocre one:</p>
                    <ul className="space-y-3 list-none pl-0 text-gray-300 mb-12">
                        {[
                            { icon: <Globe className="w-5 h-5 text-[#C642FC]" />, title: "Platform support", desc: "Does it work on Netflix, YouTube, and Prime Video — or only one platform?" },
                            { icon: <Zap className="w-5 h-5 text-[#C642FC]" />, title: "Language coverage", desc: "Look for 100+ language pairs so you can learn any language, not only the popular ones." },
                            { icon: <Search className="w-5 h-5 text-[#C642FC]" />, title: "Learning features beyond subtitles", desc: "The best tools add hover definitions, pronunciation guides, vocabulary saving, and AI-powered explanations." },
                            { icon: <Shield className="w-5 h-5 text-[#C642FC]" />, title: "Pricing transparency", desc: "\"Free\" means different things to different extensions. Check what is actually free versus premium-only." },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="mt-1 shrink-0">{item.icon}</span>
                                <span><strong className="text-white">{item.title}:</strong> {item.desc}</span>
                            </li>
                        ))}
                    </ul>

                    {/* The 7 Best */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The 7 Best Dual Subtitle Extensions Compared</h2>

                    {/* 1. Funlingo */}
                    <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-8">
                        <h3 className="text-xl font-bold text-white mb-2 mt-0">1. Funlingo — Best Free Dual Subtitle Extension</h3>
                        <div className="flex flex-wrap gap-3 mb-4 text-sm">
                            <span className="bg-white/10 px-3 py-1 rounded-full">YouTube, Netflix, Prime Video, Websites</span>
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Completely Free</span>
                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">4.92/5 ★</span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Funlingo is the only dual subtitle extension that gives you a full-featured language learning toolkit at zero cost. There is no premium tier, no subscription, and no feature gating. Everything is unlocked from the moment you install it.
                        </p>
                        <p className="text-gray-300 mb-4">
                            What sets Funlingo apart is the depth of its learning features. <strong className="text-white">Dual Subtitles</strong> display two languages simultaneously while you watch, and clicking any word opens a popup with the multi-translation selector — choose to see one, two, three, or all translations for that word. The <strong className="text-white">Pronunciation Guide</strong> provides spelled-out phonetic cues alongside audio playback and a slow-play option. <strong className="text-white">AI Explanations</strong> go beyond basic translation to give you contextual grammar notes and usage examples.
                        </p>
                        <p className="text-gray-300 mb-4">
                            Funlingo also includes a <strong className="text-white">Vocabulary Builder</strong> for saving words with one click and reviewing them with spaced repetition, and <strong className="text-white">Reading Mode</strong> offers a split-screen interface with synchronized bilingual captions.
                        </p>
                        <p className="text-sm text-gray-400"><strong className="text-white">Best for:</strong> Language learners who want a complete, full-featured tool without paying anything.</p>
                    </div>

                    {/* 2-7 Extensions */}
                    {[
                        { num: 2, name: "Trancy", best: "Best for Sentence Mining", platforms: "YouTube, Netflix", pricing: "Free tier with limits, Pro plan required", rating: "4.6/5", desc: "Trancy is a well-established extension with dual subtitles, sentence mining, and AI-powered analysis. The free tier provides basic dual subtitle functionality, but advanced sentence mining, full AI analysis, and unlimited usage require a Pro subscription.", bestFor: "Advanced learners willing to pay for detailed sentence-level analysis.", limitation: "Core learning features are locked behind a paywall." },
                        { num: 3, name: "Language Reactor", best: "Best for Netflix-Focused Learners", platforms: "Netflix, YouTube", pricing: "Free tier, Pro plan for advanced features", rating: "4.7/5", desc: "Language Reactor (formerly Language Learning with Netflix) was one of the first extensions to bring dual subtitles to streaming. It offers catalog browsing and machine-translated dual subtitles for Netflix and YouTube.", bestFor: "Learners who primarily use Netflix and want a trusted, established tool.", limitation: "No Prime Video support. Several advanced features require the Pro plan." },
                        { num: 4, name: "Immersive Translate", best: "Best for Webpage Translation", platforms: "Webpages (primary), limited video support", pricing: "Freemium", rating: "4.8/5", desc: "Immersive Translate excels at translating entire webpages into a bilingual format. It has added video subtitle translation as a secondary feature, but it is not purpose-built for video-based language learning.", bestFor: "Learners who want bilingual webpage translation as their primary use case.", limitation: "Video subtitle features are secondary and lack depth of tools built for subtitle-based learning." },
                        { num: 5, name: "Substital", best: "Best for Broad Site Compatibility", platforms: "Dailymotion, Vimeo, and more", pricing: "Free with optional Premium", rating: "4.3/5", desc: "Substital lets you add subtitles to videos across many different websites. If you watch content on niche platforms that other extensions don't support, Substital fills that gap.", bestFor: "Learners who watch videos on platforms beyond Netflix, YouTube, and Prime Video.", limitation: "Learning features are basic. No vocabulary building, pronunciation, or AI explanations." },
                        { num: 6, name: "eJOY English", best: "Best for English Learners", platforms: "YouTube, Netflix", pricing: "Freemium", rating: "4.5/5", desc: "eJOY English combines dual subtitles with vocabulary games and flashcard reviews. It is specifically designed for people learning English, with features tailored to that language pair.", bestFor: "Learners studying English specifically who want gamified vocabulary practice.", limitation: "Primarily focused on English. Less useful for Korean, Japanese, French, or other languages." },
                        { num: 7, name: "Mate Translate", best: "Best for Quick Translations", platforms: "Webpages, some video support", pricing: "Freemium", rating: "4.5/5", desc: "Mate Translate is a general-purpose translation tool that includes a dictionary, text-to-speech, and webpage translation. It is handy for quick lookups while browsing.", bestFor: "Users who want a lightweight, general-purpose translation tool.", limitation: "Not specialized for subtitle-based learning." },
                    ].map((ext) => (
                        <div key={ext.num} className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                            <h3 className="text-xl font-bold text-white mb-2 mt-0">{ext.num}. {ext.name} — {ext.best}</h3>
                            <div className="flex flex-wrap gap-3 mb-4 text-sm">
                                <span className="bg-white/10 px-3 py-1 rounded-full">{ext.platforms}</span>
                                <span className="bg-white/10 px-3 py-1 rounded-full">{ext.pricing}</span>
                                <span className="bg-white/10 px-3 py-1 rounded-full">{ext.rating} ★</span>
                            </div>
                            <p className="text-gray-300 mb-3">{ext.desc}</p>
                            <p className="text-sm text-gray-400 mb-1"><strong className="text-white">Best for:</strong> {ext.bestFor}</p>
                            <p className="text-sm text-gray-400"><strong className="text-white">Limitation:</strong> {ext.limitation}</p>
                        </div>
                    ))}

                    <hr className="border-white/10 my-12" />

                    {/* Comparison Table */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Side-by-Side Comparison</h2>
                    <div className="overflow-x-auto mb-12">
                        <table className="w-full text-sm text-left text-gray-300 border border-white/10 rounded-xl overflow-hidden">
                            <thead className="bg-white/5 text-white text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3">Feature</th>
                                    <th className="px-4 py-3">Funlingo</th>
                                    <th className="px-4 py-3">Trancy</th>
                                    <th className="px-4 py-3">Language Reactor</th>
                                    <th className="px-4 py-3">Immersive Translate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                <tr><td className="px-4 py-3 font-medium text-white">Price</td><td className="px-4 py-3 text-green-400">Free (all features)</td><td className="px-4 py-3">Freemium</td><td className="px-4 py-3">Freemium</td><td className="px-4 py-3">Freemium</td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Netflix</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3 text-gray-500">Limited</td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">YouTube</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3 text-gray-500">Limited</td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Prime Video</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">AI Explanations</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3 text-gray-500">Pro only</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Pronunciation Guide</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3 text-gray-500">Limited</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Vocabulary Builder</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3 text-gray-500">Pro only</td><td className="px-4 py-3 text-gray-500">Limited</td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Reading Mode</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Multi-Translation</td><td className="px-4 py-3"><Check className="w-4 h-4 text-green-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td><td className="px-4 py-3"><X className="w-4 h-4 text-red-400" /></td></tr>
                                <tr><td className="px-4 py-3 font-medium text-white">Languages</td><td className="px-4 py-3">100+</td><td className="px-4 py-3">100+</td><td className="px-4 py-3">100+</td><td className="px-4 py-3">100+</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* How to Choose */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Choose the Right Dual Subtitle Extension</h2>

                    <h3 className="text-xl font-bold text-white mb-3 mt-8">If You Want Everything Free</h3>
                    <p className="text-gray-300 mb-6">
                        Go with <strong className="text-white">Funlingo</strong>. It is the only extension that provides AI explanations, pronunciation guides, a Vocabulary Builder, Reading Mode, and multi-platform support without any paywall. You can explore a{" "}
                        <a href="/compare/funlingo-vs-trancy-vs-immersive-translate" className="text-[#C642FC] hover:underline">detailed feature comparison</a> to see exactly how the tools differ.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-3 mt-8">If You Are Willing to Pay for Extras</h3>
                    <p className="text-gray-300 mb-6">
                        <strong className="text-white">Trancy Pro</strong> is worth considering if sentence mining and advanced AI analysis are priorities. <strong className="text-white">Language Reactor Pro</strong> works well if Netflix is your primary learning platform.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-3 mt-8">If You Mostly Read Webpages</h3>
                    <p className="text-gray-300 mb-6">
                        <strong className="text-white">Immersive Translate</strong> is the strongest choice for bilingual webpage translation. Funlingo also offers{" "}
                        <a href="/blog/website-translation-language-learning" className="text-[#C642FC] hover:underline">website translation for language learning</a>, so it is worth trying both.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-3 mt-8">If You Are Learning English Specifically</h3>
                    <p className="text-gray-300 mb-12">
                        <strong className="text-white">eJOY English</strong> offers a tailored experience with gamified vocabulary games for English learners.
                    </p>

                    {/* How to Get Started */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Get Started with Dual Subtitles in Five Minutes</h2>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
                        {[
                            { title: "Choose your extension", desc: "We recommend starting with Funlingo since it is free and full-featured — you can always try others later." },
                            { title: "Install from Chrome Web Store", desc: "It takes about 30 seconds. Click \"Add to Chrome\" and you are done." },
                            { title: "Open Netflix, YouTube, or Prime Video", desc: "Pick a show or video in your target language. Starting with something you have already seen helps — you already know the plot." },
                            { title: "Enable Dual Subtitles", desc: "The extension overlay appears automatically. Select your native language and target language." },
                            { title: "Start learning actively", desc: "Click on unfamiliar words, check pronunciation, and save vocabulary. Even catching 30-40% of the dialogue is real progress." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">
                                    {i + 1}
                                </div>
                                <div className="pt-2 text-gray-300">
                                    <strong className="text-white block mb-1">{step.title}</strong>
                                    {step.desc}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-300 mb-12">
                        <strong className="text-white">Pro tip:</strong> Build a 15-20 minute daily routine. According to research on comprehensible input, language acquisition happens most effectively when you understand most of what you hear, with some new vocabulary mixed in. Dual subtitles create exactly that environment. Check out our{" "}
                        <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">guide to learning a language by watching</a> for a complete routine you can follow.
                    </p>

                    {/* FAQ */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
                        <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-white block mb-1">What is a dual subtitle extension?</strong>
                                <p className="text-gray-400 text-sm">A dual subtitle extension is a Chrome browser extension that displays subtitles in two languages simultaneously while you watch videos on platforms like Netflix, YouTube, and Prime Video. Extensions like Funlingo add learning tools on top — hover definitions, pronunciation, and vocabulary saving.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Are there any completely free dual subtitle extensions?</strong>
                                <p className="text-gray-400 text-sm">Yes. Funlingo is completely free with all features unlocked — no premium tier, no trial period, and no paywall. Most other extensions lock advanced features behind a paid subscription. Check out our roundup of the{" "}
                                    <a href="/blog/best-ai-language-learning-tools-2026" className="text-[#C642FC] hover:underline">best AI language learning tools in 2026</a> for more free options.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Can dual subtitles actually help you learn a language?</strong>
                                <p className="text-gray-400 text-sm">Yes — when used actively. Clicking on words, saving vocabulary, and reviewing with spaced repetition turns entertainment into measurable learning. The key is consistency: 15-20 minutes daily produces better results than occasional long sessions. Funlingo's{" "}
                                    <a href="/blog/reading-mode-bilingual-captions" className="text-[#C642FC] hover:underline">Reading Mode with bilingual captions</a> is designed specifically for focused study sessions.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Do dual subtitle extensions slow down my browser?</strong>
                                <p className="text-gray-400 text-sm">Modern dual subtitle extensions are lightweight and should not noticeably slow down your browser or streaming playback. Funlingo uses a privacy-first design that renders subtitles locally, minimizing data transfer.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Which dual subtitle extension works on Netflix, YouTube, and Prime Video?</strong>
                                <p className="text-gray-400 text-sm">Funlingo is the only free dual subtitle extension that fully supports all three major streaming platforms — Netflix, YouTube, and Amazon Prime Video — plus websites. Most competitors support only one or two platforms.</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
                        <h2 className="text-3xl font-bold text-white mb-4">Find Your Best Dual Subtitle Extension</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                            If you want the most complete free option — with Dual Subtitles across Netflix, YouTube, Prime Video, and websites — Funlingo is the clear winner.
                        </p>
                        <a
                            href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                        >
                            <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">
                                Add to Chrome — It's Free <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                    </div>

                </div>
            </main>

            <FooterSection />
        </div>
    );
};
