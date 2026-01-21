
import * as React from "react";
import Navbar from "./sections/navbar";
import { FooterSection } from "./sections/FooterSection";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export const BlogIndex = (): React.JSX.Element => {
  const [, setLocation] = useLocation();

  const posts = [
    {
      id: 1,
      title: "Best AI Language Learning Tools (2026): Learn faster with AI & real content",
      excerpt: "Compare the top AI language learning tools and discover how FunLingo turns your streaming time into fast, context-rich learning with in-player dual subtitles.",
      date: "January 21, 2026",
      author: "FunLingo Team",
      category: "Guide",
      slug: "/blog/best-ai-language-learning-tools-2026"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <SEO
        title="FunLingo Blog - Language Learning Tips & AI Insights"
        description="Read the latest articles about AI language learning, dual subtitles, and how to master new languages faster with FunLingo."
        canonical="/blog"
      />
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
            <Card 
              key={post.id} 
              className="bg-white/5 border-white/10 overflow-hidden hover:border-[#C642FC]/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#C642FC]/10" 
              onClick={() => setLocation(post.slug)}
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
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
