"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { posts, accBadge, accBar } from "./posts";


export default function BlogContent() {

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-4 mb-12 text-center">
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

        {/* Featured (latest) post */}
        {featured && (
          <Link href={featured.slug} className="no-underline group block mb-12">
            <Card className="relative overflow-hidden bg-white/5 border-white/10 hover:border-[#C642FC]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#C642FC]/20">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[200px] lg:min-h-[320px] overflow-hidden bg-[radial-gradient(130%_130%_at_0%_0%,#7A1CAC_0%,#1a0a28_55%,#000000_100%)] flex items-center justify-center p-8">
                  <div className="absolute -inset-16 bg-[radial-gradient(circle_at_30%_30%,rgba(198,66,252,0.45),transparent_60%)] blur-2xl group-hover:scale-110 transition-transform duration-700" />
                  <span className="relative font-heading-h3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 text-center leading-tight tracking-tight">
                    {featured.category}
                  </span>
                  <Badge className="absolute top-4 left-4 bg-[#C642FC] text-white border-0 shadow-lg shadow-purple-500/30">
                    ★ Latest
                  </Badge>
                </div>
                <CardContent className="p-6 sm:p-10 flex flex-col justify-center gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2.5 py-0.5 rounded-full border ${accBadge(featured.category)}`}>
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{featured.author}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C642FC] transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 line-clamp-3 sm:line-clamp-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-[#C642FC] font-semibold mt-1">
                    Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.id} href={post.slug} className="no-underline">
              <Card
                className="relative bg-white/5 border-white/10 overflow-hidden hover:border-[#C642FC]/50 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:shadow-[#C642FC]/10 hover:-translate-y-1 h-full"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accBar(post.category)} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${accBadge(post.category)}`}>
                      {post.category}
                    </span>
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
