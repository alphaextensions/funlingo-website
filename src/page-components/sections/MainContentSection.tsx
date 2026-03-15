import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const integrationCards = [
  {
    icon: "/figmaAssets/frame-1597882858.png",
    title: "Sigma",
    description: "No code required, fast, flexible, and secure.",
  },
  {
    icon: "/figmaAssets/frame-1597882859.png",
    title: "Flack",
    description: "Seamlessly integrate with existing tools.",
  },
  {
    icon: "/figmaAssets/frame-1597882859-1.png",
    title: "Niscord",
    description: "Tools and databases — no code required.",
  },
  {
    icon: "/figmaAssets/frame-1597882860.png",
    title: "Keplin",
    description: "Fast, flexible, and secure integrations.",
  },
];

export const MainContentSection = (): React.JSX.Element => {
  return (
    <section className="flex-[0_0_auto] overflow-hidden flex flex-col w-full items-center gap-14 pt-0 pb-24 px-24 relative bg-backgroundbackdrop">
      <div className="absolute top-[248px] left-[calc(50.00%_-_427px)] w-[853px] h-[911px] rotate-180 pointer-events-none">
        <img
          className="absolute top-[51px] left-[calc(50.00%_-_426px)] w-[854px] h-[854px] -rotate-180"
          alt="Ellipse"
          src="/figmaAssets/ellipse-705.svg"
        />

        <img
          className="absolute top-[129px] left-[calc(50.00%_-_348px)] w-[698px] h-[698px] -rotate-180"
          alt="Ellipse"
          src="/figmaAssets/ellipse-706.svg"
        />

        <img
          className="absolute top-[215px] left-[calc(50.00%_-_262px)] w-[526px] h-[526px] -rotate-180"
          alt="Ellipse"
          src="/figmaAssets/ellipse-707.svg"
        />

        <img
          className="absolute top-[301px] left-[calc(50.00%_-_176px)] w-[354px] h-[354px] -rotate-180"
          alt="Ellipse"
          src="/figmaAssets/ellipse-708.svg"
        />
      </div>

      <div className="inline-flex flex-col max-w-screen-sm items-center justify-center gap-5 relative flex-[0_0_auto] z-10">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 h-auto rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]">
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
            Integrations
          </span>
        </Badge>

        <div className="flex flex-col w-[640px] items-center gap-4 relative flex-[0_0_auto]">
          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            Connect all your apps
          </h2>

          <p className="text-center font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
            Our platform transforms data into actionable insights—helping you
            make
            <br />
            smarter decisions with confidence.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[1011px] items-center gap-12 relative flex-[0_0_auto] z-10">
        <div className="grid grid-cols-4 gap-6 w-full">
          {integrationCards.map((card, index) => (
            <Card
              key={index}
              className="flex flex-col items-center rounded-2xl border border-solid border-[#ffffff33] [background:radial-gradient(50%_50%_at_51%_-14%,rgba(0,77,101,1)_0%,rgba(2,8,22,1)_100%)]"
            >
              <CardContent className="flex flex-col items-center gap-6 p-6 w-full">
                <div
                  className="w-14 h-14 rounded-xl bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${card.icon})` }}
                />

                <div className="flex flex-col items-start gap-3 w-full">
                  <h3 className="w-full text-center font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)]">
                    {card.title}
                  </h3>

                  <p className="w-full text-center font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
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
