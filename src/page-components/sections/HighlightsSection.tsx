import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    icon: "/figmaAssets/svg-8.svg",
    title: "AI-Driven Generation",
    description:
      "From punchy tweets to \nYouTube scripts, generate \nimpactful that resonates.",
  },
  {
    icon: "/figmaAssets/svg.svg",
    title: "User-Friendly Interface",
    description:
      "Navigate the content creation \nprocess with an easy and intuitive, form-based platform.",
  },
  {
    icon: "/figmaAssets/svg-15.svg",
    title: "Brand-Aligned Content",
    description:
      "Maintain consistent messaging \nthat echoes your unique brand \nidentity on every channel.",
  },
  {
    icon: "/figmaAssets/svg-10.svg",
    title: "Custom AI Assistants",
    description:
      "With Claypro, you can create \ncustom AI assistants, tailoring \nthe AI's behavior to suit.",
  },
];

export const HighlightsSection = (): React.JSX.Element => {
  return (
    <section className="flex w-full items-start gap-4 p-24 bg-backgroundbackdrop">
      <div className="flex flex-col w-[346px] items-start justify-center gap-8 self-stretch">
        <div className="gap-5 self-stretch w-full flex flex-col items-start">
          <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              Highlights
            </span>
          </Badge>

          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            Transform
            <br />
            Your Ideas into Reality
          </h2>

          <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
            In the digital age, your voice on social
            <br />
            media is your brand&#39;s heartbeat.
          </p>
        </div>

        <Button className="h-10 px-5 py-2 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] hover:opacity-90">
          <span className="font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)]">
            Get Started
          </span>
        </Button>
      </div>

      <div className="flex flex-col items-start gap-8">
        <div className="flex items-start gap-8">
          {featureCards.slice(0, 2).map((card, index) => (
            <Card
              key={index}
              className="max-w-[308px] w-[308px] bg-backgroundbackdrop rounded-xl border border-solid border-[#ffffff33]"
            >
              <CardContent className="flex flex-col items-start justify-center gap-5 p-8">
                <img className="w-10 h-10" alt={card.title} src={card.icon} />

                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="[font-family:'Inter',Helvetica] font-normal text-textwhite text-xl tracking-[0] leading-7">
                    {card.title}
                  </h3>

                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] whitespace-pre-line">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-start gap-8">
          {featureCards.slice(2, 4).map((card, index) => (
            <Card
              key={index}
              className="max-w-[308px] w-[308px] bg-backgroundbackdrop rounded-xl border border-solid border-[#ffffff33]"
            >
              <CardContent className="flex flex-col items-start justify-center gap-5 p-8">
                <img className="w-10 h-10" alt={card.title} src={card.icon} />

                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="[font-family:'Inter',Helvetica] font-normal text-textwhite text-xl tracking-[0] leading-7">
                    {card.title}
                  </h3>

                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] whitespace-pre-line">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
