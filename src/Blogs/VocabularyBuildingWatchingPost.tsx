import * as React from "react";
import Navbar from "@/pages/sections/navbar";
import { FooterSection } from "@/pages/sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Target, BookOpen, Sparkles, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const VocabularyBuildingWatchingPost = (): React.JSX.Element => {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Build Vocabulary While Watching Shows (A Science-Backed Method)",
        "description": "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching — backed by language science.",
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
                "name": "How many words can I learn from watching shows daily?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With a structured approach, you can realistically save and retain five to eight new words per 15-minute session. That adds up to 35 to 50 words per week and roughly 100 words per month in your active vocabulary. Over six months, consistent daily practice can build a foundation of 500+ words."
                }
            },
            {
                "@type": "Question",
                "name": "Is watching shows better than flashcards for vocabulary?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Watching shows and flashcard review work best together. Shows provide real-world context, natural pronunciation, emotional associations, and visual cues. Research shows contextual learning produces roughly 50% better retention than isolated word lists. But without spaced repetition review, you will forget most of what you encounter."
                }
            },
            {
                "@type": "Question",
                "name": "What tools help build vocabulary while watching?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chrome extensions like Funlingo are purpose-built for vocabulary building while watching. Funlingo adds dual subtitles to YouTube, Netflix, and Prime Video, lets you click any word for instant definitions and pronunciation, and saves words to a built-in Vocabulary Builder with spaced repetition review. It is completely free."
                }
            },
            {
                "@type": "Question",
                "name": "How long before I notice vocabulary improvement?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most learners start recognizing recurring words and phrases within the first two weeks of consistent daily practice. By the one-month mark, you should have roughly 100 new words in your active vocabulary. Meaningful conversational comfort typically develops around the three-to-six-month mark."
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <SEO
                title="How to Build Vocabulary While Watching Shows (Science-Backed) | Funlingo"
                description="Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching — backed by language science."
                keywords="vocabulary building while watching, build vocabulary watching shows, learn vocabulary from movies, contextual vocabulary learning, vocabulary builder chrome extension, spaced repetition vocabulary"
                canonical="/blog/vocabulary-building-watching-shows"
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Navbar currentPage="/blog" />

            {/* Hero */}
            <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
                    <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">Guide</Badge>
                    <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        How to Build Vocabulary While Watching Shows (A Science-Backed Method)
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
                        You have watched 200 hours of foreign-language Netflix. You can recognize "hola" and "gracias." Something is not working.
                    </p>
                    <p className="text-gray-300 mb-6">
                        The problem is not what you are watching — it is <em>how</em> you are watching. <strong className="text-white">Vocabulary building while watching</strong> shows only works when you move beyond passive listening. Without active engagement, your brain discards up to 80% of new words within 48 hours.
                    </p>
                    <p className="text-gray-300 mb-6">
                        The good news? You do not need to stop watching your favorite shows. You need a system that turns each episode into a structured vocabulary-building session. In this guide, you will learn the <strong className="text-white">4-Step Vocabulary Pipeline</strong> — a science-backed framework that transforms passive entertainment into measurable word growth. For the foundational approach, start with our{" "}
                        <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">complete guide to learning a language by watching</a>.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* Why It Works */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Vocabulary Building While Watching Shows Actually Works</h2>
                    <h3 className="text-xl font-bold text-white mb-3 mt-8">The Science of Contextual Vocabulary Learning</h3>
                    <p className="text-gray-300 mb-6">
                        Linguist Stephen Krashen's Input Hypothesis argues that language acquisition happens when learners receive "comprehensible input" — material slightly above their current level. Watching shows with support tools creates exactly this environment. Researcher Stuart Webb (2007) found that learners who encountered vocabulary in sentence context retained words at rates roughly 50% higher than those using decontextualized methods.
                    </p>
                    <p className="text-gray-300 mb-6">
                        Allan Paivio's Dual Coding Theory explains that when you receive information through multiple channels — visual scenes, spoken audio, and written subtitles — your brain creates stronger memory traces. And Paul Nation's vocabulary research shows that learners typically need 12 to 15 contextual encounters with a word before it enters long-term memory. Binge-watching a series naturally provides those repeated encounters.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-3 mt-8">Passive vs. Active Vocabulary Building</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <h4 className="text-white font-bold mb-2">Passive Watching</h4>
                            <p className="text-sm text-gray-400">Watch with native-language subtitles only. Vocabulary gain is close to zero.</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <h4 className="text-white font-bold mb-2">Semi-Active Watching</h4>
                            <p className="text-sm text-gray-400">Watch with target-language subtitles. You recognize some words, but unfamiliar ones fly by.</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-5 rounded-xl border border-[#C642FC]/30">
                            <h4 className="text-white font-bold mb-2">Active Watching</h4>
                            <p className="text-sm text-gray-300">Watch with dual subtitles, click unknown words, save them, review later. This is where vocabulary building happens.</p>
                        </div>
                    </div>

                    <hr className="border-white/10 my-12" />

                    {/* 4-Step Pipeline */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The 4-Step Vocabulary Building Pipeline</h2>
                    <p className="text-gray-300 mb-6">Most articles stop at "look up the word." That is only step one. Real retention requires a complete pipeline.</p>

                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-8">
                        {[
                            { title: "Encounter Words in Context", desc: "Watch with dual subtitles for 10 minutes. Funlingo adds Dual Subtitles to YouTube, Netflix, and Prime Video, showing both languages simultaneously. Identify 5-8 words you do not recognize but can infer from context." },
                            { title: "Capture Words Instantly", desc: "Click any word in the subtitles to see its meaning, pronunciation, and AI-powered context explanation — without leaving the video player. Save it to your Vocabulary Builder with one click. The act of clicking and choosing to save creates deeper cognitive engagement. Target: 5-10 new words per session." },
                            { title: "Review with Spaced Repetition", desc: "Without review, you forget roughly 80% of new information within 48 hours (Ebbinghaus, 1885). Spaced repetition produces over 200% better long-term retention than cramming (Cepeda et al., 2006). Funlingo's Vocabulary Builder includes built-in spaced repetition review. Target: 3 minutes reviewing yesterday's words." },
                            { title: "Use Words Actively", desc: "There is a crucial difference between recognizing a word (receptive) and using it (productive). Pick 2-3 saved words and write a sentence or say it out loud. Funlingo's Pronunciation Guide helps with spelled-out phonetic cues and audio playback. Target: 2-3 words used in sentences daily." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div>
                                <div className="pt-2 text-gray-300">
                                    <strong className="text-white block mb-1">Step {i + 1}: {step.title}</strong>
                                    {step.desc}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-6 rounded-xl border border-[#C642FC]/20 mb-12">
                        <p className="text-gray-200 mt-0 mb-0">
                            <strong className="text-white">The compounding math:</strong> If you save 5 words per day and retain even 60% of them through this pipeline, that is roughly 1,100 words per year. At 1,800 retained words, you reach basic conversational comfort in most languages.
                        </p>
                    </div>

                    {/* Mid CTA */}
                    <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
                        <p className="text-lg text-gray-200 mb-6">Start building your vocabulary from every show you watch.</p>
                        <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
                            <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
                                Add to Chrome — It's Free
                            </Button>
                        </a>
                    </div>

                    <hr className="border-white/10 my-12" />

                    {/* 15-Minute Routine */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your 15-Minute Daily Vocabulary Building Routine</h2>

                    <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-8">
                        <h3 className="text-2xl font-bold text-white mb-6 mt-0">Daily Session</h3>
                        <div className="space-y-4">
                            <div className="border-b border-white/10 pb-4">
                                <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 1-10</span>
                                <span className="text-white font-medium">Watch a show with dual subtitles. Hover on unknown words. Save 5-8 new words to your vocabulary list.</span>
                            </div>
                            <div className="border-b border-white/10 pb-4">
                                <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 11-13</span>
                                <span className="text-white font-medium">Review yesterday's saved words using spaced repetition. Mark words you remember and flag ones that need more practice.</span>
                            </div>
                            <div>
                                <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 14-15</span>
                                <span className="text-white font-medium">Write 1-2 sentences using 2-3 words from your saved list. Say them aloud using the pronunciation guide.</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
                            <p className="text-2xl font-bold text-[#C642FC] mb-1">35-50</p>
                            <p className="text-sm text-gray-400">New words per week</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
                            <p className="text-2xl font-bold text-[#C642FC] mb-1">~100</p>
                            <p className="text-sm text-gray-400">Words retained per month</p>
                        </div>
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
                            <p className="text-2xl font-bold text-[#C642FC] mb-1">500+</p>
                            <p className="text-sm text-gray-400">Words in 6 months</p>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-6">
                        For more ways to combine Funlingo features into a learning routine, explore{" "}
                        <a href="/blog/how-to-learn-languages-with-reading-mode" className="text-[#C642FC] hover:underline">Reading Mode for focused vocabulary sessions</a>.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* What to Watch */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What to Watch for Maximum Vocabulary Growth</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <Target className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Beginner</h3>
                            <p className="text-sm text-gray-400">Children's shows, familiar movies, YouTube channels with clear, slow speech.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <BookOpen className="w-8 h-8 text-yellow-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Intermediate</h3>
                            <p className="text-sm text-gray-400">Sitcoms, cooking shows, travel vlogs, talk shows. Conversational vocabulary that transfers to real life.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <Sparkles className="w-8 h-8 text-red-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Advanced</h3>
                            <p className="text-sm text-gray-400">Dramas, documentaries, news. Specialized vocabulary, complex structures, natural-speed speech.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-6 rounded-xl border border-[#C642FC]/20 mb-12">
                        <h3 className="text-xl font-bold text-white mb-3 mt-0">The 70/30 Comprehension Rule</h3>
                        <p className="text-gray-300 mb-0">
                            Aim for roughly <strong className="text-white">70% comprehension</strong>. The remaining 30% provides enough unknown words to learn from without overwhelming you. Below 50%? Step down a level. Above 90%? Challenge yourself harder. Dual subtitles help you stay in that sweet spot. To explore how AI tools enhance this process, check out the{" "}
                            <a href="/blog/best-ai-language-learning-tools-2026" className="text-[#C642FC] hover:underline">best AI language learning tools in 2026</a>.
                        </p>
                    </div>

                    <hr className="border-white/10 my-12" />

                    {/* Common Mistakes */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common Mistakes That Kill Vocabulary Retention</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            "Watching passively without engaging with unknown words.",
                            "Saving too many words per session. Cap yourself at 10 — quality over quantity.",
                            "Never reviewing saved words. Without review, words vanish within days.",
                            "Choosing content that is too difficult. Remember the 70/30 rule.",
                            "Only reading subtitles without listening to pronunciation.",
                            "Skipping the \"use it\" step. Recognition is not fluency — produce words in writing or speech.",
                        ].map((mistake, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 flex gap-3 items-start">
                                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                <p className="text-gray-300 text-sm">{mistake}</p>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
                        <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-white block mb-1">How many words can I learn from watching shows daily?</strong>
                                <p className="text-gray-400 text-sm">With a structured approach, you can save and retain 5-8 new words per 15-minute session. That adds up to 35-50 words per week and roughly 100 words per month. Over six months, consistent practice builds a foundation of 500+ words.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Is watching shows better than flashcards for vocabulary?</strong>
                                <p className="text-gray-400 text-sm">They work best together. Shows provide real-world context, natural pronunciation, and emotional associations. Research shows contextual learning produces roughly 50% better retention than isolated word lists. But without spaced repetition review, you will forget most of what you encounter.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">What tools help build vocabulary while watching?</strong>
                                <p className="text-gray-400 text-sm">Funlingo is purpose-built for this. It adds dual subtitles to YouTube, Netflix, and Prime Video, lets you click any word for definitions and pronunciation, and saves words to a Vocabulary Builder with spaced repetition. It is completely free. For alternatives, see our guide to the{" "}
                                    <a href="/blog/best-ai-language-learning-tools-2026" className="text-[#C642FC] hover:underline">best AI language learning tools in 2026</a>.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">How long before I notice vocabulary improvement?</strong>
                                <p className="text-gray-400 text-sm">Most learners start recognizing recurring words within two weeks. By one month, roughly 100 new words in active vocabulary. Conversational comfort typically develops around three to six months, depending on consistency.</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
                        <h2 className="text-3xl font-bold text-white mb-4">Start Building Your Vocabulary Tonight</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                            Dual subtitles. One-click save. Spaced repetition. Pronunciation guides. Everything you need to turn screen time into vocabulary growth — completely free.
                        </p>
                        <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
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
