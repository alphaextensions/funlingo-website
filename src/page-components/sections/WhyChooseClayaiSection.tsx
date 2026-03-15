import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const progressItems = [
  {
    title: "Contextual Learning",
    description:
      "Learn words and phrases in the context of real conversations.",
    progress: "95%",
  },
  {
    title: "Fun & Engaging",
    description: "Turn your favorite videos into language lessons.",
    progress: "92%",
  },
  {
    title: "AI-Powered Insights",
    description: "Get instant explanations and grammar tips from our AI.",
    progress: "88%",
  },
];

export const WhyChooseFunlingoSection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-14 p-24 bg-backgroundbackdrop scroll-animate">
      <div className="inline-flex flex-col max-w-screen-sm items-center justify-center gap-5">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <span className="font-body-xs-medium text-textwhite">
            Why Funlingo
          </span>
        </Badge>
        <h2 className="font-heading-h3 text-textwhite text-center">
          The Smartest Way to Learn a Language
        </h2>
      </div>
      <div className="flex w-full max-w-[1008px] items-start gap-8">
        <Card className="flex-1 rounded-2xl overflow-hidden border border-solid border-[#ffffff33] [background:radial-gradient(50%_50%_at_51%_-14%,rgba(0,77,101,1)_0%,rgba(2,8,22,1)_100%)]">
          <CardContent className="flex flex-col h-full p-10 gap-8">
            {progressItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center">
                  <h4 className="font-heading-h6 text-textwhite">
                    {item.title}
                  </h4>
                  <span className="font-body-small-medium text-brandlime-green">
                    {item.progress}
                  </span>
                </div>
                <p className="font-body-normal-regular text-textbody">
                  {item.description}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-[linear-gradient(135deg,rgba(2,91,207,1)_0%,rgba(0,145,189,1)_100%)] h-2.5 rounded-full"
                    style={{ width: item.progress }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex-1">
          <img
            src="/figmaAssets/hero-image-placeholder.png"
            alt="Funlingo in action"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
