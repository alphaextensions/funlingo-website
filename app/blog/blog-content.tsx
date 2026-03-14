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
      id: -6,
      title: "7 Best Dual Subtitle Extensions for Language Learning (2026)",
      excerpt: "Looking for the best dual subtitle extension? We compare 7 top Chrome extensions for Netflix, YouTube, and Prime Video — including one that's completely free.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/best-dual-subtitle-extension"
    },
    {
      id: -5,
      title: "How to Get Dual Subtitles on Netflix (2026 Guide)",
      excerpt: "Want dual subtitles on Netflix? Learn how to display two languages at once with FunLingo's free Chrome extension. Step-by-step setup in under 30 seconds.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/how-to-get-dual-subtitles-on-netflix"
    },
    {
      id: -4,
      title: "How to Learn Korean by Watching YouTube: A Complete 2026 Guide",
      excerpt: "Want to learn Korean watching YouTube? Get the best channels, a 15-minute daily routine, and free dual subtitle tools to turn every video into a lesson.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/learn-korean-watching-youtube"
    },
    {
      id: -3,
      title: "How to Learn Spanish Watching Netflix (Your Complete 2026 Guide)",
      excerpt: "Discover the best Netflix shows by level, a proven dual subtitle method, and a free 15-minute daily routine to learn Spanish. Start tonight.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/learn-spanish-watching-netflix"
    },
    {
      id: -2,
      title: "How to Build Vocabulary While Watching Shows (A Science-Backed Method)",
      excerpt: "Turn Netflix and YouTube into vocabulary lessons. Learn the 4-step method to save and retain new words while watching — backed by language science.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/vocabulary-building-watching-shows"
    },
    {
      id: -1,
      title: "How to Build Vocabulary While Watching: 5 Proven Strategies That Actually Work",
      excerpt: "Discover 5 proven strategies to build vocabulary while watching movies and TV shows. Learn how contextual vocabulary learning and spaced repetition transform screen time into real language growth.",
      date: "March 14, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/build-vocabulary-watching-shows"
    },
    {
      id: 0,
      title: "Website Translation for Language Learning: Read Any Website in Two Languages",
      excerpt: "Discover how FunLingo's website translation extension helps you learn languages while browsing. Read websites in two languages, understand words in context, and improve vocabulary naturally.",
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
      title: "FunLingo: AI-native, low-friction learning",
      excerpt: "FunLingo overlays dual subtitles and lets users click any word to see 1/2/3/All native-language translations, with phonetics, audio, and a save-to-vocab flow.",
      date: "January 28, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/language-learning-tips-and-ai-insights"
    },
    {
      id: 5,
      title: "Best AI Language Learning Tools (2026): Learn faster with AI & real content",
      excerpt: "Compare the top AI language learning tools and discover how FunLingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
      date: "January 21, 2026",
      author: "FunLingo Team",
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
