import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Savings Goals & Automation",
    description:
      "Our extensive data security measures ensure that your sensitive information is safeguarded against unauthorized access, whether for a rainy day.",
    isActive: true,
  },
  {
    title: "Financial Reports & Insights",
    description:
      "Simplify your workforce's time management with our intuitive HR Management SaaS, streamlining. Automatically track every transaction.",
    isActive: false,
  },
  {
    title: "Income & Expense Tracking",
    description:
      "Our platform automates transfers to your savings to make reaching those goals easier. We provide recommendations. Create and stick to personalized budgets.",
    isActive: false,
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const chartBars = [
  { marginTop: "mt-[61.7px]", height: "h-[120.24px]" },
  { marginTop: "mt-[29.3px]", height: "h-[152.61px]" },
  { marginTop: "mt-0", height: "h-[181.9px]" },
  { marginTop: "mt-[87.1px]", height: "h-[94.8px]" },
  { marginTop: "mt-[10.0px]", height: "h-[171.88px]" },
  { marginTop: "mt-[47.0px]", height: "h-[134.88px]" },
];

export const FeaturesSection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-24 pt-0 pb-24 px-24 bg-backgroundbackdrop">
      <header className="flex flex-col max-w-[1008px] items-center justify-center gap-5">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)]">
            Claypro Features
          </span>
        </Badge>

        <div className="flex flex-col max-w-[800px] items-center gap-4">
          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            Maximize efficiency with Our
            <br />
            best features
          </h2>

          <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] text-center tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
            Spending trends with detailed reports. No more juggling multiple
            apps or manual tracking.
          </p>
        </div>
      </header>

      <div className="flex flex-col items-start gap-24 w-full max-w-[1008px]">
        <div className="flex items-center justify-between w-full gap-8">
          <div className="flex w-full max-w-[488px] items-center gap-8">
            <div className="relative w-1 h-[520px] bg-textblack rounded-lg">
              <div className="h-[156px] rounded-lg bg-[linear-gradient(180deg,rgba(2,91,207,1)_0%,rgba(0,145,189,1)_100%)]" />
            </div>

            <div className="gap-14 flex-1 flex flex-col items-start">
              {features.map((feature, index) => (
                <article
                  key={index}
                  className="flex flex-col items-start justify-center gap-4 w-full"
                >
                  <h3
                    className={`[font-family:'Inter',Helvetica] font-normal text-xl tracking-[0] leading-7 ${feature.isActive ? "text-textwhite" : "text-textwhite"}`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)] ${feature.isActive ? "text-textwhite" : "text-textbody"}`}
                  >
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <Card className="w-full max-w-[487.19px] h-[481.24px] rounded-2xl overflow-hidden border border-solid border-[#ffffff33] [background:radial-gradient(50%_50%_at_51%_-14%,rgba(0,77,101,0.06)_0%,rgba(2,8,22,1)_100%)]">
            <CardContent className="p-8">
              <div className="w-full max-w-[423px] h-[416px] flex items-center justify-center bg-[#ffffff] rounded-[11.56px]">
                <div className="h-[363.53px] w-[358.41px] relative">
                  <div className="absolute top-[183px] left-0 w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />
                  <div className="absolute top-[145px] left-px w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />
                  <div className="absolute top-[221px] left-0 w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />
                  <div className="absolute top-[259px] left-0 w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />
                  <div className="absolute top-[297px] left-0 w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />
                  <div className="absolute top-[334px] left-0 w-[358px] h-px rounded-[26.56px] border-[1.15px] border-dashed border-[#e8e8e8]" />

                  <div className="absolute top-[58px] left-px w-[125px] h-[54px] flex flex-col gap-[9.5px]">
                    <div className="w-[121px] h-[17px] [font-family:'Montserrat',Helvetica] font-normal text-[#666666] text-[13.8px] tracking-[-0.28px] leading-[normal]">
                      Spend this month
                    </div>

                    <div className="w-[97px] h-7 [font-family:'Montserrat',Helvetica] font-semibold text-black text-[23px] leading-[23.0px]">
                      <span className="text-[#0e100f] tracking-[-0.11px] leading-[27.6px]">
                        $5,267
                      </span>
                      <span className="text-[#0e100f] text-[18.5px] tracking-[0] leading-[0.1px]">
                        .
                      </span>
                      <span className="text-[#0e100f] text-[16.1px] tracking-[-0.05px] leading-[27.6px]">
                        50
                      </span>
                    </div>
                  </div>

                  <div className="flex w-[351px] h-[19px] items-center gap-[33.14px] absolute top-[345px] left-[3px]">
                    {months.map((month, index) => (
                      <div
                        key={index}
                        className="[font-family:'Montserrat',Helvetica] font-normal text-[#636363] text-[16.1px] tracking-[0] leading-[18.4px] whitespace-nowrap"
                      >
                        {month}
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-[69px] left-[264px] w-24 h-[31px]">
                    <div className="absolute top-0 left-0 w-[94px] h-[31px] rounded-[26.56px] border-[1.15px] border-solid border-[#e6e6e6]" />
                    <div className="absolute top-1.5 left-3.5 [font-family:'Montserrat',Helvetica] font-medium text-black text-[13.8px] tracking-[-0.28px] leading-[18.4px] whitespace-nowrap">
                      Month
                    </div>
                    <img
                      className="absolute top-1.5 left-[67px] w-[18px] h-[18px]"
                      alt="Bx caret down"
                      src="/figmaAssets/bx-caret-down.svg"
                    />
                  </div>

                  <div className="flex flex-col w-[358px] h-[38px] items-start gap-[12.33px] absolute top-0 left-px">
                    <div className="flex items-center justify-between w-full">
                      <div className="[font-family:'Montserrat',Helvetica] font-semibold text-black text-[20.7px] tracking-[-0.41px] leading-[normal]">
                        Overview
                      </div>
                      <div className="[font-family:'Montserrat',Helvetica] font-medium text-brandblue-light text-[13.8px] text-right tracking-[0] leading-[normal]">
                        See reports
                      </div>
                    </div>
                    <div className="w-full h-[1.15px] bg-[#f3f3f3] rounded-[26.56px]" />
                  </div>

                  <div className="absolute top-[153px] left-[5px] w-[344px] h-[182px] flex gap-[35.5px]">
                    {chartBars.map((bar, index) => (
                      <div
                        key={index}
                        className={`${bar.marginTop} w-[27.75px] ${bar.height} ${index === 2 ? "bg-brandblue-dark rounded-[26.56px]" : "bg-[#ebedf3] rounded-[58.58px]"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
