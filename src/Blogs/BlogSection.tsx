import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    image: "/figmaAssets/image.png",
    readTime: "2 min read",
    title: "The Power of ClayAI Framer Template",
    description:
      "In today's digital era, where every aspect of business is be.",
    url: null,
    layout: "large",
  },
  {
    id: 2,
    image: "/figmaAssets/image-3.png",
    readTime: "5 min read",
    title: "A Practical Guide for ClayAI Template",
    description: "As businesses seek competitive advantages in an increasingly",
    url: "https://clayai.framer.website/blog/a-practical-guide-for-clayai",
    layout: "small",
  },
  {
    id: 3,
    image: "/figmaAssets/image-4.png",
    readTime: "3 min read",
    title: "Why You Should Invest in our Templates",
    description: "In the dynamic world of digital design, staying ahead means",
    url: "https://clayai.framer.website/blog/why-you-should-invest-in-the-clayai",
    layout: "small",
  },
];

export const BlogSection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-14 p-24 relative [background:radial-gradient(50%_50%_at_0%_0%,rgba(85,225,221,1)_0%,rgba(0,100,158,1)_24%,rgba(2,8,22,1)_100%)]">
      <header className="inline-flex flex-col max-w-screen-sm items-center justify-center gap-5 relative">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
            Latest Insights
          </span>
        </Badge>

        <h2 className="w-[572px] font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] text-center leading-[var(--heading-h3-line-height)] tracking-[var(--heading-h3-letter-spacing)] [font-style:var(--heading-h3-font-style)]">
          Blog Exploration
        </h2>
      </header>

      <div className="flex max-w-[1008px] w-full items-start justify-center gap-4 relative">
        <Card className="flex flex-col items-start gap-6 pt-4 pb-6 px-4 flex-1 self-stretch rounded-2xl border border-solid border-[#ffffff33] bg-transparent">
          <CardContent className="p-0 w-full">
            <div
              className="w-full h-[363px] rounded-2xl bg-cover bg-[50%_50%] mb-6"
              style={{ backgroundImage: `url(${blogPosts[0].image})` }}
            />

            <div className="flex flex-col items-start gap-2 w-full">
              <p className="font-[number:var(--body-xs-medium-font-weight)] text-[length:var(--body-xs-medium-font-size)] leading-[var(--body-xs-medium-line-height)] font-body-xs-medium text-textbody tracking-[var(--body-xs-medium-letter-spacing)] [font-style:var(--body-xs-medium-font-style)]">
                {blogPosts[0].readTime}
              </p>

              <h3 className="font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-textwhite text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] [font-style:var(--heading-h5-font-style)]">
                {blogPosts[0].title}
              </h3>

              <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                {blogPosts[0].description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-start justify-center gap-4 flex-1">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="flex items-center gap-6 pt-4 pb-6 px-4 w-full rounded-2xl border border-solid border-[#ffffff33] bg-transparent"
            >
              <CardContent className="p-0 flex items-center gap-6 w-full">
                <div
                  className="flex-1 h-[211.53px] rounded-2xl bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${post.image})` }}
                />

                <div className="flex flex-col items-start gap-2 flex-1">
                  {post.url ? (
                    <>
                      <a
                        className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textbody text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]"
                        href={post.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {post.readTime}
                      </a>

                      <a
                        className="font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-textwhite text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] [font-style:var(--heading-h5-font-style)]"
                        href={post.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {post.title}
                      </a>

                      <a
                        className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]"
                        href={post.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {post.description}
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textbody text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
                        {post.readTime}
                      </p>

                      <h3 className="font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-textwhite text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] [font-style:var(--heading-h5-font-style)]">
                        {post.title}
                      </h3>

                      <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                        {post.description}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button className="bg-[linear-gradient(180deg,rgba(2,91,207,1)_0%,rgba(0,145,189,1)_100%)] h-10 px-5 py-2 rounded-lg h-auto">
        <span className="font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)]">
          View All
        </span>
      </Button>
    </section>
  );
};
