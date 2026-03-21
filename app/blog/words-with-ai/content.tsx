"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const defined = (word: string, meaning: string) => (
  <div key={word} className="bg-white/5 rounded-lg px-4 py-3 border border-white/10">
    <span className="font-semibold text-white">{word}</span>
    <span className="text-gray-400 ml-2">— {meaning}</span>
  </div>
);

export default function WordsWithAIContent() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(30,58,138,0.40) 0%, black 60%, black 100%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
            <BookOpen className="w-3 h-3 mr-1" />
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Words That Have &apos;AI&apos; in Them — Complete List &amp; Meanings
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mt-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> March 20, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> Funlingo Team
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 8 min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="relative z-10 max-w-3xl mx-auto px-4 pb-24 prose prose-invert prose-lg">
        {/* 1 — Introduction */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Why Do People Search for Words&nbsp;with&nbsp;&quot;AI&quot;?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Whether you are a Scrabble enthusiast hunting for high-value tiles, an
            English learner exploring vowel digraphs, or a parent helping a child
            with phonics homework, knowing which words contain the letters{" "}
            <span className="text-[#C642FC] font-semibold">ai</span> is
            surprisingly useful. The &quot;ai&quot; combination is one of the most
            common vowel teams in English and appears in hundreds of everyday
            words. In this guide we have compiled a thorough, categorised list so
            you can find exactly the words you need — fast.
          </p>
        </section>

        {/* 2 — Common Everyday Words */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Common Everyday Words with &quot;AI&quot;
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            These are high-frequency words you will encounter in daily conversation,
            reading, and writing. They are a perfect starting point for anyone
            building foundational English vocabulary.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("rain", "water falling from clouds")}
            {defined("train", "a rail vehicle or to practice a skill")}
            {defined("brain", "the organ of thought inside the skull")}
            {defined("pain", "physical or emotional suffering")}
            {defined("chain", "connected metal links; a series")}
            {defined("main", "the most important; principal")}
            {defined("wait", "to stay in place until something happens")}
            {defined("claim", "to assert or demand something as one's own")}
            {defined("aim", "to point or direct toward a target")}
            {defined("aid", "help or assistance")}
          </div>
        </section>

        {/* 3 — Words ending in -ail */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Words Ending in <span className="text-[#C642FC]">-ail</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <em>-ail</em> ending is extremely productive in English. These
            words rhyme with each other, making them excellent for poetry, songs,
            and phonics exercises.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("bail", "money pledged as security for release")}
            {defined("fail", "to not succeed")}
            {defined("jail", "a place of confinement")}
            {defined("mail", "letters and packages sent by post")}
            {defined("nail", "a metal fastener; the tip of a finger")}
            {defined("rail", "a bar forming part of a fence or track")}
            {defined("sail", "a sheet catching wind on a boat")}
            {defined("tail", "the rear part of an animal's body")}
            {defined("wail", "to cry or lament loudly")}
            {defined("trail", "a path through wild country")}
            {defined("snail", "a slow-moving mollusk with a shell")}
            {defined("detail", "a small individual feature or fact")}
            {defined("retail", "the sale of goods to end consumers")}
          </div>
        </section>

        {/* 4 — Words ending in -ain */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Words Ending in <span className="text-[#C642FC]">-ain</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <em>-ain</em> pattern appears in both simple and advanced
            vocabulary. Mastering these words helps learners recognise the long
            &quot;a&quot; sound in unfamiliar contexts.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("brain", "the organ responsible for thought")}
            {defined("drain", "to draw off liquid; a channel for water")}
            {defined("grain", "a seed of wheat, rice, or similar cereal")}
            {defined("plain", "simple; a large flat area of land")}
            {defined("Spain", "a country in southwestern Europe")}
            {defined("stain", "a mark or discolouration")}
            {defined("strain", "a force pulling or stretching")}
            {defined("train", "a connected line of rail cars")}
            {defined("contain", "to hold or include within")}
            {defined("maintain", "to keep in a certain condition")}
            {defined("obtain", "to get or acquire")}
            {defined("remain", "to stay behind or continue to exist")}
            {defined("explain", "to make clear or understandable")}
            {defined("complain", "to express dissatisfaction")}
          </div>
        </section>

        {/* 5 — Words ending in -air */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Words Ending in <span className="text-[#C642FC]">-air</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <em>-air</em> ending produces a distinct vowel sound that blends
            into the &quot;r&quot; consonant. These words are common in both formal
            and informal registers.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("air", "the invisible mixture of gases we breathe")}
            {defined("chair", "a seat with a back, for one person")}
            {defined("fair", "just; a public gathering with rides")}
            {defined("hair", "strands growing from the skin")}
            {defined("pair", "a set of two matching items")}
            {defined("stair", "a step in a flight of steps")}
            {defined("affair", "an event, matter, or romantic liaison")}
            {defined("repair", "to fix or restore to good condition")}
            {defined("despair", "complete loss of hope")}
          </div>
        </section>

        {/* 6 — Words ending in -ait / containing ait */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Words with <span className="text-[#C642FC]">-ait</span> and Related
            Patterns
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The <em>-ait</em> ending is less common but still appears in several
            important words. Some of these have French origins, which is why they
            can feel slightly irregular in English spelling.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("wait", "to remain inactive until an event")}
            {defined("bait", "food used to lure fish or animals")}
            {defined("strait", "a narrow waterway between two landmasses")}
            {defined("portrait", "a painting or photo of a person")}
            {defined("trait", "a distinguishing quality or characteristic")}
          </div>
        </section>

        {/* 7 — Words with "ai" in the middle */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Words with &quot;AI&quot; in the&nbsp;Middle
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Many English words tuck the &quot;ai&quot; digraph into the middle of a
            longer word. Recognising this pattern can unlock the pronunciation of
            words you have never seen before.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {defined("maiden", "an unmarried girl; the first of its kind")}
            {defined("maintain", "to keep something in proper condition")}
            {defined("rainbow", "an arc of spectral colours in the sky")}
            {defined("raisin", "a dried grape")}
            {defined("praised", "past tense of praise; expressed approval")}
            {defined("raising", "lifting up; bringing up children")}
            {defined("captain", "the leader of a team or vessel")}
            {defined("fountain", "a decorative jet of water")}
            {defined("mountain", "a large natural elevation of land")}
            {defined("curtain", "a piece of cloth hung to cover a window")}
            {defined("certain", "sure; known without doubt")}
            {defined("bargain", "a good deal; an agreement between parties")}
            {defined("Britain", "an island comprising England, Scotland, and Wales")}
          </div>
        </section>

        {/* 8 — Pronunciation Guide */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Pronunciation Guide — How Is &quot;AI&quot; Pronounced?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            In the vast majority of cases, the digraph <strong>ai</strong> makes
            the <em>long &quot;a&quot;</em> sound, represented in the International
            Phonetic Alphabet as <strong>/eɪ/</strong>. Think of words like{" "}
            <em>rain</em>, <em>train</em>, and <em>claim</em> — the vowel sound
            is identical to the name of the letter &quot;A.&quot;
          </p>
          <div className="bg-white/5 rounded-xl border border-white/10 p-6 not-prose mb-4">
            <h3 className="text-lg font-semibold text-white mb-3">Notable Exceptions</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong className="text-white">-ain at word end (unstressed):</strong>{" "}
                In words like <em>captain</em>, <em>curtain</em>, and{" "}
                <em>mountain</em>, the &quot;ai&quot; is reduced to a short /ɪ/
                or schwa /ə/ because the syllable is unstressed.
              </li>
              <li>
                <strong className="text-white">-air words:</strong> The vowel
                blends into the following &quot;r,&quot; creating the /ɛr/ or /eər/
                sound heard in <em>chair</em> and <em>fair</em>.
              </li>
              <li>
                <strong className="text-white">said &amp; again:</strong> Two of
                the most common exceptions — <em>said</em> is pronounced /sɛd/ and{" "}
                <em>again</em> is often /əˈɡɛn/.
              </li>
            </ul>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Despite these exceptions, the core rule holds over 90% of the time: when
            you see &quot;ai,&quot; pronounce it as a long &quot;a.&quot;
          </p>
        </section>

        {/* 9 — Letter Patterns & Vocabulary Building */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            How Letter Patterns Accelerate Vocabulary Building
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Linguists call groups like <em>-ail</em>, <em>-ain</em>, and{" "}
            <em>-air</em> <strong>word families</strong>. Learning one member of a
            family makes it dramatically easier to read and spell the rest. Studies
            on phonics instruction consistently show that students who learn to
            recognise common letter patterns decode unfamiliar words faster and with
            greater accuracy.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Instead of memorising each word individually, try grouping your study
            sessions around patterns. For instance, once you know that &quot;ai&quot;
            makes the long &quot;a&quot; sound, encountering a new word like{" "}
            <em>exclaim</em> or <em>constrain</em> becomes far less intimidating.
            The pattern does the heavy lifting for you.
          </p>
        </section>

        {/* 10 — Funlingo Integration */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">
            Learn &quot;AI&quot; Words in Context with Funlingo
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Word lists are a great reference, but the fastest route to real fluency
            is seeing vocabulary <em>in context</em> — inside the shows, movies,
            and videos you already love. That is exactly what{" "}
            <span className="text-[#C642FC] font-semibold">Funlingo</span> is
            built for.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Funlingo overlays <strong>dual subtitles</strong> on platforms like
            Netflix, YouTube, and Disney+, showing your native language alongside
            English (or any target language). When a character says &quot;The train
            was delayed by the heavy rain,&quot; you see both the original line and
            its translation simultaneously — anchoring the words <em>train</em>,{" "}
            <em>rain</em>, and <em>delayed</em> in a memorable, real-world scene.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Over time, you will notice the &quot;ai&quot; pattern popping up
            naturally: a villain explaining their master <em>plan</em>, a hero
            climbing a <em>mountain</em>, or a detective following a{" "}
            <em>trail</em>. Contextual repetition like this is far more effective
            than rote memorisation — and a lot more fun.
          </p>
        </section>

        {/* 11 — FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 not-prose">
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How many English words contain &quot;ai&quot;?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Depending on the dictionary you consult, there are over 2,000
                English words that include the letter pair &quot;ai.&quot; The most
                commonly used ones — the roughly 200 you will encounter in everyday
                reading — are covered in this guide.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Is &quot;ai&quot; always pronounced the same way?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Not always. The standard pronunciation is the long &quot;a&quot;
                sound /eɪ/, as in <em>rain</em> and <em>paid</em>. However, when
                &quot;ai&quot; falls in an unstressed syllable (e.g.,{" "}
                <em>captain</em>) or precedes &quot;r&quot; (e.g., <em>fair</em>),
                the sound shifts. The word <em>said</em> is a well-known
                exception where &quot;ai&quot; sounds like a short &quot;e.&quot;
              </p>
            </div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What is the best way to memorise words with &quot;ai&quot;?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Group them by word family (-ail, -ain, -air, -ait) and practise
                each group together. Then reinforce what you have learned by
                encountering the words in real content — watching shows with dual
                subtitles via Funlingo is one of the most effective and enjoyable
                methods.
              </p>
            </div>
          </div>
        </section>

        {/* 12 — CTA */}
        <section className="mb-8">
          <div className="rounded-2xl p-8 md:p-10 text-center bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              See These Words Come Alive in Your Favourite&nbsp;Shows
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Install Funlingo and start learning vocabulary like <em>brain</em>,{" "}
              <em>mountain</em>, and <em>explain</em> through dual subtitles on
              Netflix, YouTube, and more — completely free.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="text-white text-lg px-8 py-6 rounded-full font-semibold inline-flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #7A1CAC 0%, #C642FC 100%)",
                }}
              >
                Add Funlingo to Chrome — It&apos;s Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </section>
      </article>

      <FooterSection />
    </div>
  );
}
