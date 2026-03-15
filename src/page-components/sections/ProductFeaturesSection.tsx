import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  "Engagement tracking",
  "Send on behalf of clients",
  "Open & click tracking",
];

const stats = [
  {
    number: "#1",
    title: "in the Market",
    description:
      "Real-life examples of stories built, & shared by some of the best PR teams.",
  },
  {
    number: "450+",
    title: "Talented PR Teams",
    description:
      "Take the stress out of contact management with a dedicated outreach CRM.",
  },
];

export const ProductFeaturesSection = (): React.JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-24 pt-0 pb-24 px-24 bg-backgroundbackdrop">
      <div className="flex w-full max-w-[1008px] items-center justify-center gap-12">
        <div className="flex flex-col max-w-[480px] items-start justify-center gap-5 flex-1">
          <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              CRM Design
            </span>
          </Badge>

          <div className="flex flex-col items-start gap-5 w-full">
            <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
              Designed to Take the <br />
              Pain Out of Contacts
            </h2>

            <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
              Organize your team&apos;s media lists in one tool and see how each{" "}
              <br />
              contact engages with your campaigns.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 w-full">
                <CheckIcon className="w-5 h-5 text-brandlime-green flex-shrink-0" />
                <span className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-[480px] h-[440.47px] flex-shrink-0">
          <div className="absolute right-0 top-0 w-[370px] h-[440px] rounded-2xl overflow-hidden [background:url(/figmaAssets/background-1.png)_50%_50%_/_cover]">
            <img
              className="mt-[-158.9px] w-[370px] h-[660px] object-cover"
              alt="Abstract fluid art"
              src="/figmaAssets/abstract-fluid-art-1.png"
            />
          </div>

          <div className="absolute left-0 top-[106px] w-[calc(100%_-_100px)] h-[335px] bg-[url(/figmaAssets/image-1-1.png)] bg-cover bg-[50%_50%]" />
        </div>
      </div>

      <div className="flex w-full max-w-[1008px] items-center justify-center gap-12">
        <div className="relative w-[480px] h-[400px] flex-shrink-0">
          <div className="absolute left-0 top-0 w-[336px] h-[400px] rounded-2xl overflow-hidden flex justify-end [background:url(/figmaAssets/background-2.png)_50%_50%_/_cover]">
            <img
              className="mt-[-0.4px] w-[600px] h-[400px] object-cover"
              alt="Abstract color"
              src="/figmaAssets/abstract-color-vortex-1.png"
            />
          </div>

          <div className="absolute left-40 top-[42px] w-[calc(100%_-_160px)] h-[157px] bg-[url(/figmaAssets/image-1-2.png)] bg-cover bg-[50%_50%]" />

          <div className="absolute left-20 top-[230px] w-[calc(100%_-_160px)] h-[157px] bg-[url(/figmaAssets/image-2-1.png)] bg-cover bg-[50%_50%]" />
        </div>

        <div className="flex flex-col max-w-[480px] items-start justify-center gap-5 flex-1">
          <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              Email Campaigns
            </span>
          </Badge>

          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            Email Campaigns &amp; <br />
            Pitching with a Record
          </h2>

          <div className="flex items-start gap-10 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 flex-1"
              >
                <div className="font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-brandlime-green text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)]">
                  {stat.number}
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-textwhite text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)]">
                    {stat.title}
                  </h3>

                  <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
