import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    image: "/figmaAssets/group-2085664640.png",
    title: "User Management",
    description:
      "Effortlessly configure your preferred keyboard shortcuts, enabling seamless integration.",
  },
  {
    image: "/figmaAssets/group-2085664048-1.png",
    title: "Native, Fast & Powerful",
    description:
      "Offers a library of prompts that you can leverage to get the most out of the AI assistance.",
    isMiddleCard: true,
  },
  {
    image: "/figmaAssets/group-2085664640-1.png",
    title: "Native, Fast & Powerful",
    description:
      "Offers a library of prompts that you can leverage to get the most out of the AI assistance.",
  },
];

const budgetItems = [
  {
    icon: "/figmaAssets/group-2085664048-1.png",
    title: "Grocery",
    amount: "$500",
    bgColor: "bg-[#ffffff]",
    progressColor: "bg-brandblue-dark",
  },
  {
    icon: "/figmaAssets/bx-phone-call.svg",
    title: "Mobile Recharge",
    amount: "$800",
    bgColor: "bg-[#0091bd1a]",
    progressColor: "bg-brandblue-light",
  },
  {
    icon: "/figmaAssets/bx-coffee.svg",
    title: "Tea & Coffee",
    amount: "$900",
    bgColor: "bg-[#73d0b91a]",
    progressColor: "bg-brandlime-green",
  },
  {
    icon: "/figmaAssets/bx-wifi.svg",
    title: "Wi-Fi Bill",
    amount: "$400",
    bgColor: "bg-[#ebf4ef]",
    progressColor: "bg-brandblue-dark",
    hasBorder: true,
  },
];

export const WhyChooseClayaiContentSection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-14 py-24 px-24 bg-backgroundbackdrop">
      <div className="inline-flex flex-col max-w-screen-sm items-center justify-center gap-5">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
            Why Choose Claypro
          </span>
        </Badge>

        <div className="flex flex-col w-[640px] items-center gap-4">
          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            How it works
          </h2>

          <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] text-center tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
            This customization increases Claypro&#39;s flexibility and
            usefulness, making it a powerful tool for a wide range of
            professionals.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex items-start gap-8 overflow-x-auto">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[488px] h-[590px] rounded-2xl border border-solid border-[#ffffff33] [background:radial-gradient(50%_50%_at_51%_-14%,rgba(0,77,101,1)_0%,rgba(2,8,22,1)_100%)] overflow-hidden"
            >
              <CardContent className="flex flex-col items-start gap-8 p-8">
                {card.isMiddleCard ? (
                  <div className="w-[409px] h-[402.48px] bg-[#ffffff] rounded-[11.56px]">
                    <div className="relative h-[364px]">
                      {budgetItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={`absolute top-[${itemIndex * 91}px] left-0 w-[409px] h-[91px] flex gap-[20.1px] bg-[#ffffff] ${
                            itemIndex < 3
                              ? "border-b-[0.83px] [border-bottom-style:solid] border-[#f2f2f2]"
                              : ""
                          }`}
                        >
                          <div
                            className={`mt-[20.4px] w-[50.08px] h-[50.08px] ml-[29.2px] flex items-center justify-center ${
                              item.bgColor
                            } rounded-[25.04px] ${item.hasBorder ? "border-[1.11px] border-solid border-[#eff7ef]" : ""}`}
                          >
                            <img
                              className="w-[26.71px] h-[26.71px]"
                              alt={item.title}
                              src={item.icon}
                            />
                          </div>

                          <div className="w-[282.53px] mt-[14.8px] h-[59.92px] relative">
                            <div className="absolute top-0 left-0 [font-family:'Montserrat',Helvetica] font-medium text-black text-[17.8px] tracking-[-0.36px] leading-[17.8px] whitespace-nowrap">
                              {item.title}
                            </div>

                            <div className="absolute w-[36.10%] h-[20.03%] top-[45.47%] left-0 bg-[#ebedf3] rounded-[47.29px]" />

                            <div className="absolute top-6 left-[214px] [font-family:'Montserrat',Helvetica] font-normal text-black text-[13.3px] text-right tracking-[0] leading-[17.8px] whitespace-nowrap">
                              <span className="font-medium text-[#0e100f]">
                                {item.amount}
                              </span>
                              <span className="text-[#0e100f]">&nbsp;</span>
                              <span className="text-[#616265]">Left</span>
                            </div>

                            <div
                              className={`absolute top-[51px] left-px w-[277px] h-[9px] flex ${
                                itemIndex === 0
                                  ? "bg-[#025bcf]"
                                  : "bg-[#ececec]"
                              } rounded-[8.88px]`}
                            >
                              <div
                                className={`w-[205.29px] h-[8.88px] ${item.progressColor} rounded-[8.88px]`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <img
                    className="w-[409px] h-[402.48px]"
                    alt={card.title}
                    src={card.image}
                  />
                )}

                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)]">
                      {card.title}
                    </h3>

                    <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <img
          className="w-full max-w-[1008px] h-12"
          alt="Progress"
          src="/figmaAssets/progress.svg"
        />
      </div>
    </section>
  );
};
