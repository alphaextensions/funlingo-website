import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testimonialsData = [
  {
    id: 1,
    quote:
      "My company provides critical software services for customers such as Medium, Spotify, Google, Spotify, Coinbase, and many others.",
    name: "Floyd Miles",
    role: "Business Strategist",
    avatar: "/figmaAssets/avatar.png",
    size: "small",
  },
  {
    id: 2,
    quote:
      "\"It's simple. ClayAI makes me more productive. Whether I write copy, tasks, code or anything in between I'm faster and make fewer mistakes. It's one of those things that when missing. My company provides critical software services for customers such as Medium, Spotify, Google, Spotify, Coinbase, and many others. I liked the idea of inline triggers.",
    name: "Devon Lane",
    role: "Business Analyser",
    avatar: "/figmaAssets/avatar-1.png",
    size: "large",
  },
  {
    id: 3,
    quote:
      "I have been using Clay for quite some time now and been absolutely loving every part of the experience. Super intuitive! leave my current task.",
    name: "Jerome Bell",
    role: "Interaction Designer",
    avatar: "/figmaAssets/avatar-2.png",
    size: "small",
  },
  {
    id: 4,
    quote:
      "Super intuitive! Its release as I am a sucker for beautiful native apps. I liked the idea of inline triggers that let's you do things like generating.",
    name: "Tristram Jones",
    role: "Founder",
    avatar: "/figmaAssets/avatar-3.png",
    size: "small",
  },
  {
    id: 5,
    quote:
      "I bought ClayAI shortly after its release as I am a sucker for beautiful native apps. I liked the idea of inline triggers that let's you do things like generating.",
    name: "Cody Fisher",
    role: "UX/UI Designer",
    avatar: "/figmaAssets/avatar-4.png",
    size: "small",
  },
];

export const TestimonialsSection = (): React.JSX.Element => {
  const firstRowTestimonials = testimonialsData.slice(0, 2);
  const secondRowTestimonials = testimonialsData.slice(2, 5);

  return (
    <section className="flex flex-col w-full items-center justify-center gap-14 pt-0 pb-24 px-24 relative [background:radial-gradient(50%_50%_at_0%_100%,rgba(58,228,242,1)_0%,rgba(0,100,158,1)_24%,rgba(2,8,22,1)_100%)]">
      <header className="inline-flex flex-col max-w-screen-sm items-center justify-center gap-5 relative flex-[0_0_auto]">
        <Badge className="inline-flex items-center justify-center px-4 py-1.5 relative flex-[0_0_auto] rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] whitespace-nowrap [font-style:var(--body-xs-medium-font-style)]">
            Testimonial
          </span>
        </Badge>

        <h2 className="relative flex items-center justify-center w-[572px] font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] text-center tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
          Professionals use Claypro to 10x their Productivity
        </h2>
      </header>

      <div className="inline-flex flex-col items-center justify-center gap-6 relative flex-[0_0_auto]">
        <div className="inline-flex gap-6 flex-[0_0_auto] items-start relative">
          {firstRowTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className={`flex flex-col items-start gap-6 p-8 bg-textwhite rounded-xl overflow-hidden border-0 ${
                testimonial.size === "small" ? "w-80" : "w-[664px]"
              }`}
            >
              <CardContent className="p-0 flex flex-col gap-6 w-full">
                <p className="text-white relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)]">
                  {testimonial.quote}
                </p>

                <img
                  className="relative flex-[0_0_auto]"
                  alt="Star rating"
                  src="/figmaAssets/star.svg"
                />

                <div className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                  <Avatar className="relative w-10 h-10 rounded-[28px]">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="flex flex-col items-start relative flex-1 grow">
                    <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-small-medium text-textblack text-[length:var(--body-small-medium-font-size)] leading-[var(--body-small-medium-line-height)] font-[number:var(--body-small-medium-font-weight)] tracking-[var(--body-small-medium-letter-spacing)] [font-style:var(--body-small-medium-font-style)]">
                      {testimonial.name}
                    </p>

                    <p className="relative flex items-center justify-center self-stretch font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-textblack text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] [font-style:var(--body-small-regular-font-style)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="inline-flex gap-6 flex-[0_0_auto] items-start relative">
          {secondRowTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex flex-col w-80 items-start gap-6 p-8 bg-textwhite rounded-xl overflow-hidden border-0"
            >
              <CardContent className="p-0 flex flex-col gap-6 w-full">
                <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)]">
                  {testimonial.quote}
                </p>

                <img
                  className="relative flex-[0_0_auto]"
                  alt="Star rating"
                  src="/figmaAssets/star.svg"
                />

                <div className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                  <Avatar className="relative w-10 h-10 rounded-[28px]">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="flex flex-col items-start relative flex-1 grow">
                    <p className="relative flex items-center justify-center self-stretch mt-[-1.00px] font-body-small-medium text-textblack text-[length:var(--body-small-medium-font-size)] leading-[var(--body-small-medium-line-height)] font-[number:var(--body-small-medium-font-weight)] tracking-[var(--body-small-medium-letter-spacing)] [font-style:var(--body-small-medium-font-style)]">
                      {testimonial.name}
                    </p>

                    <p className="relative flex items-center justify-center self-stretch font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-textblack text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] [font-style:var(--body-small-regular-font-style)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
