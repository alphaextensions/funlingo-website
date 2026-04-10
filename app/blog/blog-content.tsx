"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogContent() {
  const posts = [
    {
      id: -39,
      title: "Best Free Language Learning Tools in 2026 — No Subscriptions Required",
      excerpt: "A complete zero-cost language learning stack. Dual subtitles, flashcards, grammar, speaking practice — every free tool worth using, compared honestly.",
      date: "April 10, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-free-language-learning-tools-2026"
    },
    {
      id: -38,
      title: "How to Learn French by Watching Netflix & YouTube (2026 Guide)",
      excerpt: "The complete guide to learning French with Netflix and YouTube. Best French shows by level, the dual subtitle method, daily routine, and why French listening is uniquely hard.",
      date: "April 10, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/learn-french-watching-netflix"
    },
    {
      id: -37,
      title: "How to Translate Hamster Website",
      excerpt: "Learn how to translate the Hamster website into any language using Funlingo. Bilingual display, word-level lookups, pronunciation audio, and vocabulary saving — all free.",
      date: "March 30, 2026",
      author: "Funlingo Team",
      category: "Trending",
      slug: "/blog/how-to-translate-hamster-website"
    },
    {
      id: -36,
      title: "油管视频下载 — 高清无水印保存方法 (2026)",
      excerpt: "最新油管(YouTube)视频下载方法，支持高清1080P/4K无水印保存。包括在线工具、浏览器扩展和命令行方案。",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Chinese Content",
      slug: "/blog/youtube-video-download-zh"
    },
    {
      id: -35,
      title: "Best English-Vietnamese Dictionary Apps & Sites (2026)",
      excerpt: "Compare the best English-Vietnamese dictionary apps and websites. VDICT, Laban Dictionary, Tra Tu, and more with features, pros/cons, and essential Vietnamese phrases.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Dictionary",
      slug: "/blog/english-vietnamese-dictionary"
    },
    {
      id: -34,
      title: "Phrase Translator — Best Tools for Idioms & Expressions (2026)",
      excerpt: "Regular translators butcher idioms and phrases. Find the best phrase translators that understand context, slang, and expressions across languages.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Translation",
      slug: "/blog/phrase-translator"
    },
    {
      id: -33,
      title: "YouTube字幕下载 — SRT一键导出指南 (2026)",
      excerpt: "一键下载YouTube字幕为SRT格式。多种YouTube字幕下载方法，包括在线工具、浏览器扩展和命令行方案。",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Chinese Content",
      slug: "/blog/youtube-subtitle-download-zh"
    },
    {
      id: -32,
      title: "推特视频下载 — 3种免费保存方法 (2026)",
      excerpt: "如何免费下载推特(X)视频？3种最简单的推特视频下载方法，支持高清无水印保存。",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Chinese Content",
      slug: "/blog/twitter-video-download-zh"
    },
    {
      id: -31,
      title: "AI for Translation — How AI Is Changing Language Translation (2026)",
      excerpt: "How AI is revolutionizing translation in 2026. From neural machine translation to LLMs, explore the technology behind modern AI translators.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "AI Translation",
      slug: "/blog/ai-for-translation"
    },
    {
      id: -30,
      title: "'Unless' — Meaning, Grammar Rules & Examples",
      excerpt: "Master the word 'unless' in English. Complete guide with meaning, grammar rules, conditional sentence patterns, common mistakes, and 30+ example sentences.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Dictionary",
      slug: "/blog/unless-meaning"
    },
    {
      id: -29,
      title: "Download YouTube Videos with Chinese Subtitles (2026 Guide)",
      excerpt: "Step-by-step guide to downloading YouTube videos with Chinese subtitles. 3 free methods for saving videos with Chinese captions for offline language learning.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Chinese Content",
      slug: "/blog/download-youtube-videos-chinese-subtitles"
    },
    {
      id: -28,
      title: "AiTalk Review — AI Language Practice Tool (2026)",
      excerpt: "Is AiTalk worth it for language practice? Full review of AiTalk's AI conversation features, pricing, pros and cons, and how it compares to alternatives.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "AI Translation",
      slug: "/blog/aitalk-review"
    },
    {
      id: -27,
      title: "Portuguese to English Translator — Best Tools 2026",
      excerpt: "Find the most accurate Portuguese to English translator. Compare Google Translate, DeepL, ChatGPT, and more with Brazilian vs European Portuguese tips.",
      date: "March 21, 2026",
      author: "Funlingo Team",
      category: "Translation",
      slug: "/blog/portuguese-to-english-translator"
    },
    {
      id: -26,
      title: "Language Reactor vs Trancy: Which Is Better in 2026?",
      excerpt: "Detailed comparison of Language Reactor and Trancy for language learning. Features, pricing, platform support, and which one is right for you.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/language-reactor-vs-trancy"
    },
    {
      id: -25,
      title: "How to Translate a Web Page in Safari (Mac, iPhone, iPad)",
      excerpt: "Step-by-step guide to translating web pages in Safari on Mac, iPhone, and iPad. Built-in features, limitations, and third-party alternatives.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/translate-page-in-safari"
    },
    {
      id: -24,
      title: "What Does 'Bilingual' Mean? Definition, Types & Examples",
      excerpt: "Everything about bilingualism: definition, types (simultaneous, sequential, compound, coordinate), benefits, and how to become bilingual as an adult.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/bilingual-meaning"
    },
    {
      id: -23,
      title: "Words That Have 'AI' in Them — Complete List & Meanings",
      excerpt: "Complete list of English words containing 'ai' organized by pattern. Includes pronunciation guide, example sentences, and vocabulary building tips.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/words-with-ai"
    },
    {
      id: -22,
      title: "Best Subtitle Download Sites — Top 15 for Any Language",
      excerpt: "Compare the 15 best subtitle download sites for movies and TV shows. OpenSubtitles, Subscene, YIFY, and more — with safety tips and format guides.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-subtitle-download-sites"
    },
    {
      id: -21,
      title: "AI Translator Tools: 10 Best Options Compared for 2026",
      excerpt: "Compare the 10 best AI translator tools including Google Translate, DeepL, ChatGPT, and more. Features, accuracy, pricing, and use cases compared.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-ai-translator-tools"
    },
    {
      id: -20,
      title: "Italian to English Translation: Best Tools & Tips",
      excerpt: "Best tools for Italian to English translation, common Italian phrases with translations, grammar tips, and how to learn Italian with dual subtitles.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/italian-to-english-translation"
    },
    {
      id: -19,
      title: "Immersive Translate: What It Is & Best Alternatives",
      excerpt: "Complete guide to Immersive Translate — features, pricing, limitations, and the 6 best alternatives including free options for video subtitles.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/immersive-translate-alternatives"
    },
    {
      id: -18.5,
      title: "Turkish to English Translation: Tools, Tips & Common Phrases",
      excerpt: "Best tools for Turkish to English translation, 20+ common Turkish phrases, grammar tips for English speakers, and Turkish shows to watch.",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/turkish-to-english-translation"
    },
    {
      id: -18.1,
      title: "沈浸式翻譯完整教學：安裝、設定與使用技巧",
      excerpt: "沈浸式翻譯完整指南：從安裝到進階設定，學習如何使用沈浸式翻譯工具來翻譯網頁、字幕和PDF。包含替代工具比較和使用技巧。",
      date: "March 20, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/immersive-translate-guide-zh"
    },
    {
      id: -16,
      title: "How to Download Subtitles from YouTube (3 Free Methods)",
      excerpt: "Learn 3 free methods to download subtitles from any YouTube video in SRT, VTT, or TXT format. Step-by-step guides for each method.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/download-subtitles-from-youtube"
    },
    {
      id: -15,
      title: "Why Can't I Change Playback Speed on YouTube? (Fixed)",
      excerpt: "YouTube playback speed not working? Here are the most common causes and step-by-step fixes for desktop, mobile, and embedded videos.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/why-cant-change-playback-speed-youtube"
    },
    {
      id: -14,
      title: "Netflix Language Learning: The Complete Guide for 2026",
      excerpt: "Everything you need to learn a language with Netflix. Best shows by language, the dual subtitle method, a 15-minute daily routine, and free tools.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/netflix-language-learning"
    },
    {
      id: -13,
      title: "Best YouTube Subtitle Downloaders — Top 10 Tools Compared",
      excerpt: "Compare the 10 best YouTube subtitle downloaders. Download subtitles in SRT, VTT, and TXT formats. Free and paid options with pros and cons.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-youtube-subtitle-downloaders"
    },
    {
      id: -12,
      title: "How to Get Dual Subtitles on Netflix (Step-by-Step)",
      excerpt: "Get dual subtitles on Netflix in under 30 seconds. Step-by-step setup guide, troubleshooting tips, and the best extensions compared.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/netflix-dual-subtitles"
    },
    {
      id: -11,
      title: "YouTube Bilingual Subtitles: Watch Videos in Two Languages",
      excerpt: "Learn how to get bilingual subtitles on YouTube. Watch any video with two languages displayed simultaneously using free browser extensions.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/youtube-bilingual-subtitles"
    },
    {
      id: -10,
      title: "What Is Shadowing in Language Learning? (+ AI Tools)",
      excerpt: "Discover the shadowing technique for language learning. Learn the science, get a step-by-step guide, and find the best AI tools to practice with.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/shadowing-language-learning"
    },
    {
      id: -9,
      title: "Netflix Language Learning Extensions: Top 5 for 2026",
      excerpt: "Compare the 5 best Chrome extensions for learning languages on Netflix. Features, pricing, and pros/cons for Funlingo, Language Reactor, Trancy, and more.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/netflix-language-learning-extensions"
    },
    {
      id: -8,
      title: "How to Download YouTube Videos (Specific Parts Only)",
      excerpt: "Learn 4 methods to download specific parts of YouTube videos. Online tools, screen recording, yt-dlp commands, and browser-based editors compared.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/download-youtube-video-parts"
    },
    {
      id: -7,
      title: "SRT Files Explained: How to Download & Use Subtitle Files",
      excerpt: "Everything about SRT subtitle files. Learn what they are, where to download them, how to use them in media players, and how to create your own.",
      date: "March 19, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/srt-files-subtitle-download"
    },
    {
      id: -18,
      title: "How to Learn Japanese with Anime: A Beginner's 2026 Guide",
      excerpt: "Want to learn Japanese through anime? Discover a structured method using dual subtitles, shadowing, and spaced repetition to turn every episode into a real lesson.",
      date: "March 18, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/learn-japanese-with-anime"
    },
    {
      id: -17,
      title: "5 Daily Habits That Make Language Learning Stick (Without Extra Study Time)",
      excerpt: "Struggling to stay consistent with language learning? Discover 5 simple daily habits that fit into your existing routine and make real progress without extra study time.",
      date: "March 18, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/daily-language-learning-habits"
    },
    {
      id: -19.5,
      title: "How to Learn Japanese with Anime: A Beginner's 2026 Guide",
      excerpt: "Want to learn Japanese through anime? Discover a structured method using dual subtitles, shadowing, and spaced repetition to turn every episode into a real lesson.",
      date: "March 18, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/learn-japanese-with-anime"
    },
    {
      id: -19.6,
      title: "5 Daily Habits That Make Language Learning Stick (Without Extra Study Time)",
      excerpt: "Struggling to stay consistent with language learning? Discover 5 simple daily habits that fit into your existing routine and make real progress without extra study time.",
      date: "March 18, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/daily-language-learning-habits"
    },
    {
      id: -6,
      title: "7 Best Dual Subtitle Extensions for Language Learning (2026)",
      excerpt: "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video — including one that's completely free.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-dual-subtitle-extension"
    },
    {
      id: -5,
      title: "How to Get Dual Subtitles on Netflix (2026 Guide)",
      excerpt: "Want dual subtitles on Netflix? Learn how to display two languages at once with Funlingo's free Chrome extension. Step-by-step setup in under 30 seconds.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/how-to-get-dual-subtitles-on-netflix"
    },
    {
      id: -4,
      title: "How to Learn Korean by Watching YouTube: A Complete 2026 Guide",
      excerpt: "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools to turn every video into a lesson.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/learn-korean-watching-youtube"
    },
    {
      id: -3,
      title: "How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)",
      excerpt: "Discover the best Netflix shows by level, a proven dual subtitle method, and a free 15-minute daily routine to learn Spanish. Start tonight.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/learn-spanish-watching-netflix"
    },
    {
      id: -2,
      title: "How to Build Vocabulary While Watching Shows (A Science-Backed Method)",
      excerpt: "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching — backed by language science.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/vocabulary-building-watching-shows"
    },
    {
      id: -1,
      title: "How to Build Vocabulary While Watching: 5 Proven Strategies That Actually Work",
      excerpt: "Discover 5 proven strategies to build vocabulary while watching movies and TV shows. Learn how contextual vocabulary learning and spaced repetition transform screen time into real language growth.",
      date: "March 14, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/build-vocabulary-watching-shows"
    },
    {
      id: 0,
      title: "Website Translation for Language Learning: Read Any Website in Two Languages",
      excerpt: "Discover how Funlingo's website translation extension helps you learn languages while browsing. Read websites in two languages, understand words in context, and improve vocabulary naturally.",
      date: "March 07, 2026",
      author: "Funlingo Team",
      category: "Feature",
      slug: "/blog/website-translation-language-learning"
    },
    {
      id: 1,
      title: "How to Learn a Language by Watching (Without Wasting Your Time)",
      excerpt: "Learn how to effectively learn a language by watching using structured methods, contextual learning, and subtitle strategies that actually improve retention.",
      date: "February 21, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/how-to-learn-a-language-by-watching"
    },
    {
      id: 2,
      title: "Reading Mode: How to Learn Languages While You Watch",
      excerpt: "Bilingual captions that actually work. Discover 5 concrete routines to turn passive viewing into repeatable vocabulary gains with Reading Mode.",
      date: "February 16, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/how-to-learn-languages-with-reading-mode"
    },
    {
      id: 3,
      title: "Reading Mode: Learn Naturally — Read Captions Side-by-Side While You Watch",
      excerpt: "Turn your watch time into a language lesson. Funlingo's Reading Mode shows synchronized bilingual captions with instant synonyms & examples.",
      date: "February 05, 2026",
      author: "Funlingo Team",
      category: "Feature",
      slug: "/blog/reading-mode-bilingual-captions"
    },
    {
      id: 4,
      title: "Funlingo: AI-native, low-friction learning",
      excerpt: "Funlingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow.",
      date: "January 28, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/language-learning-tips-and-ai-insights"
    },
    {
      id: 5,
      title: "Best AI Language Learning Tools (2026): Learn faster with AI & real content",
      excerpt: "Compare the top AI language learning tools and discover how Funlingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
      date: "January 21, 2026",
      author: "Funlingo Team",
      category: "Guide",
      slug: "/blog/best-ai-language-learning-tools-2026"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <Badge className="w-fit mx-auto bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
            Our Blog
          </Badge>
          <h1 className="font-heading-h1 text-4xl sm:text-5xl font-bold text-white">
            Latest Insights & Guides
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover tips, tricks, and in-depth comparisons to supercharge your language learning journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={post.slug} className="no-underline">
              <Card
                className="bg-white/5 border-white/10 overflow-hidden hover:border-[#C642FC]/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#C642FC]/10 h-full"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-white/20 text-gray-300">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-[#C642FC] transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 line-clamp-3 mb-6">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <Button variant="link" className="text-[#C642FC] p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
