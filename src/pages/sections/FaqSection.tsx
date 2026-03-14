import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "How do I install FunLingo?",
    answer: "Visit the Chrome Web Store, search for 'FunLingo,' and click 'Add to Chrome.' The extension installs in seconds and works immediately on YouTube, Netflix, and Prime Video. No account creation or configuration is required — just open a video and your dual subtitles appear automatically.",
  },
  {
    question: "Is FunLingo really free?",
    answer: "Yes, FunLingo is completely free with no hidden costs, premium tiers, or paywalls. You get full access to dual subtitles, AI-powered word definitions, pronunciation guides, and the vocabulary builder at no charge. Unlike competitors like Trancy or Language Reactor, there is no paid upgrade required for core features.",
  },
  {
    question: "What languages does FunLingo support?",
    answer: "FunLingo supports over 100 languages for dual subtitles, including Spanish, French, Japanese, Korean, Mandarin, German, Portuguese, Arabic, Hindi, and many more. You can display any combination of two languages simultaneously, making it ideal for learners at any level.",
  },
  {
    question: "How do dual subtitles help me learn a language?",
    answer: "Dual subtitles display two languages at once — the original audio language and your native language — so you can instantly compare words, phrases, and grammar in real conversational context. Research in second language acquisition shows that contextual exposure through authentic media improves vocabulary retention by up to 50% compared to traditional flashcard methods.",
  },
  {
    question: "Which streaming platforms does FunLingo work with?",
    answer: "FunLingo currently supports YouTube, Netflix, and Amazon Prime Video. These three platforms cover millions of videos and shows across every genre and language. The extension integrates directly into the video player, so subtitles appear seamlessly without disrupting your viewing experience.",
  },
];

export const FaqSection = (): React.JSX.Element => {
  return (
    <section className="flex w-full items-start pt-24 pb-12 px-24 bg-backgroundbackdrop">
      <div className="flex flex-col items-start justify-center gap-8 flex-1">
        <div className="gap-5 self-stretch w-full flex flex-col items-start">
          <Badge className="inline-flex items-center justify-center px-4 py-1.5 rounded-[99px] border border-solid border-[#ffffff1a] shadow-[inset_0px_-1px_4px_#00000040,inset_0px_0px_0px_#e5e5e8] bg-[linear-gradient(118deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] h-auto">
            <span className="font-body-xs-medium font-[number:var(--body-xs-medium-font-weight)] text-textwhite text-[length:var(--body-xs-medium-font-size)] tracking-[var(--body-xs-medium-letter-spacing)] leading-[var(--body-xs-medium-line-height)] [font-style:var(--body-xs-medium-font-style)]">
              FAQs
            </span>
          </Badge>

          <h2 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-textwhite text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
            Frequently
            <br />
            Asked Questions
          </h2>

          <p className="font-body-normal-regular font-[number:var(--body-normal-regular-font-weight)] text-textbody text-[length:var(--body-normal-regular-font-size)] tracking-[var(--body-normal-regular-letter-spacing)] leading-[var(--body-normal-regular-line-height)] [font-style:var(--body-normal-regular-font-style)]">
            Everything you need to know about
            <br />
            learning languages with FunLingo.
          </p>
        </div>

        <Button className="h-10 gap-0.5 px-5 py-2 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(229,229,232,1)_100%)] hover:opacity-90">
          <span className="font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textblack text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] [font-style:var(--body-normal-medium-font-style)]">
            Get Started
          </span>
        </Button>
      </div>

      <div className="flex flex-col items-start gap-4 w-[582px]">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="bg-backgroundbackdrop rounded-[10px] border border-solid border-[#ffffff33] shadow-[inset_0px_-2px_4px_#00000026] px-6 py-3"
            >
              <AccordionTrigger className="flex items-center justify-between w-full hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="flex-1 text-left [font-family:'Inter',Helvetica] font-medium text-textwhite text-lg tracking-[-0.18px] leading-7">
                  {item.question}
                </span>
                <ChevronDownIcon className="w-7 h-7 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
