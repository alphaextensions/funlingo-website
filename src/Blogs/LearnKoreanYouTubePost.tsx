import * as React from "react";
import Navbar from "@/pages/sections/navbar";
import { FooterSection } from "@/pages/sections/FooterSection";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, AlertTriangle, Music, Tv, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const LearnKoreanYouTubePost = (): React.JSX.Element => {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Learn Korean by Watching YouTube: A Complete 2026 Guide",
        "description": "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools to turn every video into a lesson.",
        "author": { "@type": "Organization", "name": "FunLingo Team" },
        "datePublished": "2026-03-14",
        "dateModified": "2026-03-14",
        "image": "https://getfunlingo.com/og-image.jpg",
        "publisher": {
            "@type": "Organization",
            "name": "FunLingo",
            "logo": { "@type": "ImageObject", "url": "https://getfunlingo.com/logo.png" }
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can you learn Korean by watching YouTube?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, but only with active engagement. When you combine YouTube with dual subtitles, vocabulary saving, spaced repetition review, and pronunciation practice, YouTube becomes one of the most effective ways to learn Korean."
                }
            },
            {
                "@type": "Question",
                "name": "What are the best YouTube channels to learn Korean for free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For beginners: Talk To Me In Korean, Korean Unnie, and GO! Billy Korean. For intermediate: Korean Englishman, JOLLY, and Didi's Day. For advanced: tvN and KBS News. For K-pop fans: 1theK and BANGTANTV."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to learn Korean by watching YouTube videos?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With 15 minutes of active daily practice, most learners recognize 150 to 200 common words within the first month. After six months, you can typically follow the main ideas of natural Korean vlogs and understand 40-60% of K-drama dialogue."
                }
            },
            {
                "@type": "Question",
                "name": "Should I watch Korean YouTube with or without subtitles?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use dual subtitles (Korean and English together) as a beginner. As you progress, switch to Korean-only subtitles. At the advanced stage, try watching without any subtitles for pure listening practice."
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <SEO
                title="How to Learn Korean Watching YouTube (2026 Guide) | FunLingo"
                description="Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools to turn every video into a lesson."
                keywords="learn korean watching youtube, learn korean youtube, korean youtube channels, learn korean free, korean language youtube, learn hangul"
                canonical="/blog/learn-korean-watching-youtube"
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
                        How to Learn Korean by Watching YouTube: A Complete 2026 Guide
                    </h1>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> March 14, 2026</div>
                        <div className="flex items-center gap-1"><User className="w-4 h-4" /> FunLingo Team</div>
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 14 min read</div>
                    </div>
                </div>
            </section>

            <main className="w-full max-w-3xl mx-auto px-6 pb-24">
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">

                    {/* Intro */}
                    <p className="lead text-xl leading-relaxed text-gray-200 mb-6">
                        Korean is everywhere. BTS sells out stadiums on every continent. <em>Squid Game</em> became the most-watched series in Netflix history. Korean food, skincare, and fashion dominate social media. And behind all that cultural momentum, millions of fans want to understand Korean content for themselves.
                    </p>
                    <p className="text-gray-300 mb-6">
                        If you want to <strong className="text-white">learn Korean watching YouTube</strong>, you are in excellent company. Korean is now the seventh most-studied language globally, and YouTube is the single largest free source of Korean-language content on the internet. The problem is that most people approach it wrong — they press play, read the English subtitles, and hope something sticks. That is passive watching, and it rarely leads to real progress.
                    </p>
                    <p className="text-gray-300 mb-6">
                        This guide gives you a different approach. You will get the best Korean YouTube channels organized by level, a structured 15-minute daily routine, and a free tool that turns every Korean video into an interactive lesson. For the foundational method, check out our{" "}
                        <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] hover:underline">complete guide to learning a language by watching</a>.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* Why YouTube */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why YouTube Is One of the Best Places to Learn Korean</h2>
                    <h3 className="text-xl font-bold text-white mb-3 mt-8">Free, Unlimited Korean Content</h3>
                    <p className="text-gray-300 mb-6">
                        YouTube hosts hundreds of millions of Korean-language videos — K-pop music videos, variety shows, cooking channels, daily vlogs, news broadcasts, drama clips, and more. Unlike a textbook that gets outdated, YouTube delivers fresh Korean content every single day. And it costs nothing.
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3 mt-8">Real Korean, Not Textbook Korean</h3>
                    <p className="text-gray-300 mb-6">
                        Textbooks teach formal Korean. YouTube teaches you how people actually talk. A Korean vlogger describing their morning routine uses natural speech patterns, slang, and the kind of casual Korean that textbooks skip entirely. You also get cultural context for free — food vocabulary in real kitchens, direction words on actual Korean streets, and how Koreans express emotion through honorifics.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* 10 Best Channels */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">The 10 Best Korean YouTube Channels for Language Learners</h2>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Beginner Channels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {[
                            { name: "Talk To Me In Korean", subs: "1M+", desc: "Structured lessons from absolute beginner to advanced. The gold standard." },
                            { name: "Korean Unnie", subs: "800K+", desc: "Natural, conversational Korean with clear pronunciation and plenty of repetition." },
                            { name: "GO! Billy Korean", subs: "500K+", desc: "Grammar explained with humor and visuals. Makes verb conjugation click." },
                        ].map((ch, i) => (
                            <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <Mic className="w-6 h-6 text-[#C642FC] mb-3" />
                                <h4 className="text-white font-bold mb-1">{ch.name}</h4>
                                <p className="text-xs text-[#C642FC] mb-2">{ch.subs} subscribers</p>
                                <p className="text-sm text-gray-400">{ch.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Intermediate Channels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {[
                            { name: "Korean Englishman", subs: "6M+", desc: "Two British friends explore Korean culture and speak natural Korean throughout." },
                            { name: "JOLLY", subs: "3M+", desc: "Cultural exchange content with natural Korean dialogue. Mix of English and Korean." },
                            { name: "Didi's Day", subs: "500K+", desc: "Daily life vlogs in Korean — groceries, cooking, errands. Practical vocabulary." },
                        ].map((ch, i) => (
                            <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <Tv className="w-6 h-6 text-[#C642FC] mb-3" />
                                <h4 className="text-white font-bold mb-1">{ch.name}</h4>
                                <p className="text-xs text-[#C642FC] mb-2">{ch.subs} subscribers</p>
                                <p className="text-sm text-gray-400">{ch.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Advanced & K-Pop Channels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {[
                            { name: "tvN", subs: "8M+", desc: "Full clips from Korean dramas and variety shows. Fast, unfiltered Korean.", icon: <Tv className="w-6 h-6 text-[#C642FC] mb-3" /> },
                            { name: "KBS News", subs: "Major broadcaster", desc: "Formal, clearly enunciated Korean covering current events. Builds formal register.", icon: <Tv className="w-6 h-6 text-[#C642FC] mb-3" /> },
                            { name: "1theK", subs: "30M+", desc: "Largest K-pop music video channel. Songs use repetition and rhyme that anchors vocabulary.", icon: <Music className="w-6 h-6 text-[#C642FC] mb-3" /> },
                            { name: "BANGTANTV", subs: "75M+", desc: "BTS content in Korean — behind-the-scenes, live streams, interviews. Built-in motivation.", icon: <Music className="w-6 h-6 text-[#C642FC] mb-3" /> },
                        ].map((ch, i) => (
                            <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10">
                                {ch.icon}
                                <h4 className="text-white font-bold mb-1">{ch.name}</h4>
                                <p className="text-xs text-[#C642FC] mb-2">{ch.subs}</p>
                                <p className="text-sm text-gray-400">{ch.desc}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="border-white/10 my-12" />

                    {/* Active Learning Method */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Actually Learn Korean from YouTube (Not Passive Watching)</h2>
                    <p className="text-gray-300 mb-6">
                        Pressing play on a Korean video does not teach you Korean. When you watch with only English subtitles, your brain reads the English and ignores the Korean audio almost entirely. You need a system that turns watching into doing.
                    </p>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">The Active YouTube Learning Method</h3>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/10 mb-12">
                        {[
                            { title: "Watch with Dual Subtitles", desc: "Display Korean and English text simultaneously so you can match what you hear to what you read, with your native language as a safety net." },
                            { title: "Click Words You Don't Know", desc: "Get instant definitions, pronunciation guides, and contextual explanations for unfamiliar Korean words without leaving the video." },
                            { title: "Save to Vocabulary Builder", desc: "Capture new words with one click so they are waiting for you when it is time to review." },
                            { title: "Replay Key Scenes", desc: "Shadow the pronunciation. Repeat what the speaker says, matching their tone and rhythm. This builds speaking skills, not only listening." },
                            { title: "Review Saved Words", desc: "Spend the last few minutes of each session reviewing saved vocabulary using spaced repetition to lock words into long-term memory." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6 relative">
                                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#C642FC]/50 flex items-center justify-center text-[#C642FC] font-bold shrink-0 z-10">{i + 1}</div>
                                <div className="pt-2 text-gray-300">
                                    <strong className="text-white block mb-1">{step.title}</strong>
                                    {step.desc}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">How FunLingo Makes This Effortless on YouTube</h3>
                    <p className="text-gray-300 mb-6">
                        <a href="https://funlingo.ai" className="text-[#C642FC] hover:underline">FunLingo</a> is a free Chrome extension designed specifically for active video learning. It adds <strong className="text-white">Dual Subtitles</strong> to any YouTube video, lets you click any Korean word to see its definition and hear its pronunciation, includes transliteration for learners still learning Hangul, and saves words to a built-in <strong className="text-white">Vocabulary Builder</strong> with spaced repetition. It also offers{" "}
                        <a href="/blog/reading-mode-bilingual-captions" className="text-[#C642FC] hover:underline">Reading Mode</a> for focused study sessions. Unlike paid alternatives, every feature is completely free.
                    </p>

                    {/* Mid CTA */}
                    <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
                        <p className="text-lg text-gray-200 mb-6">Turn every Korean YouTube video into a language lesson.</p>
                        <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
                            <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">
                                Add to Chrome — It's Free
                            </Button>
                        </a>
                    </div>

                    <hr className="border-white/10 my-12" />

                    {/* 15-Minute Routine */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">A 15-Minute Daily Korean YouTube Routine</h2>
                    <p className="text-gray-300 mb-6">
                        Consistency beats intensity. Short, daily practice sessions produce dramatically better long-term retention than occasional marathon sessions.
                    </p>

                    <div className="bg-gradient-to-br from-[#C642FC]/20 to-transparent p-8 rounded-xl border border-[#C642FC]/20 mb-8">
                        <h3 className="text-2xl font-bold text-white mb-6 mt-0">The Core Routine</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
                                <div className="flex-1">
                                    <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 1-2</span>
                                    <span className="text-white font-medium">Choose a video that matches your current level from the channel recommendations above.</span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 border-b border-white/10 pb-4">
                                <div className="flex-1">
                                    <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 3-12</span>
                                    <span className="text-white font-medium">Watch with dual subtitles. Click five to eight words you do not know. Save them to your Vocabulary Builder.</span>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <span className="text-[#C642FC] text-sm uppercase tracking-wider block mb-1">Minutes 13-15</span>
                                    <span className="text-white font-medium">Review your saved vocabulary from today and previous sessions.</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 mt-6 italic">Fifteen minutes, five days a week. After 30 days, learners typically recognize 150 to 200 common Korean words.</p>
                    </div>

                    {/* Progression */}
                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Beginner Progression (Weeks 1-4)</h3>
                    <ul className="space-y-2 list-disc pl-5 text-gray-300 mb-6">
                        <li><strong className="text-white">Watch:</strong> TTMIK lessons, Korean Unnie, or GO! Billy Korean</li>
                        <li><strong className="text-white">Focus:</strong> High-frequency words — greetings, numbers, basic verbs (hada, gada, meokda)</li>
                        <li><strong className="text-white">Milestone:</strong> Recognize common greetings, count to 100, follow beginner-level videos</li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Intermediate Progression (Months 2-6)</h3>
                    <ul className="space-y-2 list-disc pl-5 text-gray-300 mb-6">
                        <li><strong className="text-white">Watch:</strong> Korean Englishman, JOLLY, Didi's Day, K-drama clips</li>
                        <li><strong className="text-white">Focus:</strong> Conversational phrases, grammar patterns (SOV structure, particles), connectors</li>
                        <li><strong className="text-white">Milestone:</strong> Follow main ideas of natural Korean vlogs, understand 40-60% of K-drama dialogue</li>
                    </ul>

                    <h3 className="text-xl font-bold text-white mb-4 mt-8">Advanced Progression (6+ Months)</h3>
                    <ul className="space-y-2 list-disc pl-5 text-gray-300 mb-12">
                        <li><strong className="text-white">Watch:</strong> tvN drama clips, KBS News, unscripted interviews, variety shows</li>
                        <li><strong className="text-white">Focus:</strong> Nuance, formality levels, idioms, and specialized vocabulary</li>
                        <li><strong className="text-white">Milestone:</strong> Follow Korean news, catch humor in variety shows, hold basic conversations</li>
                    </ul>

                    <hr className="border-white/10 my-12" />

                    {/* Learn Hangul */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Learn Hangul First: Why the Korean Alphabet Makes YouTube Learning Faster</h2>
                    <p className="text-gray-300 mb-6">
                        Unlike Chinese characters or Japanese kanji, the Korean alphabet was intentionally designed to be accessible. King Sejong the Great created Hangul in the 15th century specifically so that ordinary people could learn to read. The system has 14 basic consonants and 10 basic vowels. Most dedicated learners can read Hangul (slowly) within two to three hours.
                    </p>
                    <p className="text-gray-300 mb-6">
                        Once you can read Hangul, Korean subtitles on YouTube transform from mysterious symbols into readable text. You start noticing word boundaries, recognizing repeated words, and matching written Korean to spoken Korean.
                    </p>
                    <p className="text-gray-300 mb-12">
                        If you are not ready to learn Hangul yet, FunLingo's transliteration feature shows romanized Korean text alongside the Hangul script. This bridges the gap while you build your reading skills.
                    </p>

                    <hr className="border-white/10 my-12" />

                    {/* Common Mistakes */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common Mistakes When Learning Korean from YouTube</h2>
                    <div className="space-y-4 mb-12">
                        {[
                            { title: "Only Watching with English Subtitles", desc: "English subtitles train your eyes to read English, not your ears to process Korean. Use dual subtitles instead." },
                            { title: "Choosing Content That Is Too Hard", desc: "If you are a beginner watching an unscripted variety show, you will understand almost nothing. Match content to your level." },
                            { title: "Never Reviewing What You Learned", desc: "Without review, new vocabulary fades within days. The five-minute vocabulary review at the end of each session matters." },
                            { title: "Passive Watching Without Interaction", desc: "Click words. Save them. Replay scenes. Shadow pronunciation. Active watching is what produces progress." },
                            { title: "Skipping Pronunciation Practice", desc: "Korean has sounds that do not exist in English. Use FunLingo's pronunciation guides with audio playback, then repeat them." },
                        ].map((mistake, i) => (
                            <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
                                <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block mb-1">{mistake.title}</strong>
                                    <p className="text-sm text-gray-400">{mistake.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
                        <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-white block mb-1">Can you learn Korean by watching YouTube?</strong>
                                <p className="text-gray-400 text-sm">Yes, but only with active engagement. Combine YouTube with dual subtitles, vocabulary saving, spaced repetition review, and pronunciation practice. Tools like FunLingo turn passive watching into active learning by making every word clickable, saveable, and reviewable.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">What are the best YouTube channels to learn Korean for free?</strong>
                                <p className="text-gray-400 text-sm">For beginners: Talk To Me In Korean, Korean Unnie, and GO! Billy Korean. Intermediate: Korean Englishman, JOLLY, and Didi's Day. Advanced: tvN drama clips and KBS News. For K-pop fans: 1theK and BANGTANTV.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">How long does it take to learn Korean by watching YouTube?</strong>
                                <p className="text-gray-400 text-sm">With 15 minutes of active daily practice, most learners recognize 150 to 200 common words within the first month. After six months, you can typically follow the main ideas of natural Korean vlogs and understand 40-60% of K-drama dialogue.</p>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Should I watch Korean YouTube with or without subtitles?</strong>
                                <p className="text-gray-400 text-sm">Use dual subtitles (Korean and English) as a beginner. As you progress, switch to Korean-only subtitles. At the advanced stage, try watching without subtitles, then rewatch with Korean subtitles to check what you missed.</p>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
                        <h2 className="text-3xl font-bold text-white mb-4">Start Learning Korean from YouTube Today</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                            FunLingo makes every Korean YouTube video a language lesson — with dual subtitles, AI-powered definitions, pronunciation guides, and a Vocabulary Builder. Completely free.
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
