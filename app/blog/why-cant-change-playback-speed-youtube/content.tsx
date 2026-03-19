"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Check,
  X,
  AlertTriangle,
  Monitor,
  Smartphone,
  RefreshCw,
  Settings,
  Lightbulb,
  ChevronDown,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PlaybackSpeedYoutubeContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />

      {/* Hero Section */}
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">
            Guide
          </Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Why Can&apos;t I Change Playback Speed on YouTube? (Fixed)
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
            Troubleshoot and fix the most common reasons why YouTube playback
            speed controls aren&apos;t working on your device.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> March 19, 2026
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" /> FunLingo Team
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 6 min read
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {/* Introduction */}
          <p>
            YouTube&apos;s playback speed control is one of its most useful features.
            Whether you want to speed through a long lecture at 2x or slow down a
            foreign-language video to 0.5x, speed control makes YouTube far more
            flexible. So when you suddenly{" "}
            <strong>can&apos;t change playback speed on YouTube</strong>, it can be
            genuinely frustrating.
          </p>
          <p>
            The good news? This problem almost always has a straightforward fix.
            In this guide, we&apos;ll cover the six most common causes — and the
            exact steps to resolve each one. We&apos;ll also explain how playback
            speed interacts with subtitles, which is especially relevant for
            language learners.
          </p>

          {/* Quick Overview */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8 not-prose">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C642FC]" /> Quick Overview of Causes
            </h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>Outdated browser or YouTube app</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>Browser extensions causing conflicts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>Embedded videos with restricted controls</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span>Live streams and premieres (speed disabled by design)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                <span>Mobile app glitches</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                <span>Corrupted cache or cookies</span>
              </div>
            </div>
          </div>

          {/* Cause 1 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            1. Your Browser or YouTube App Is Outdated
          </h2>
          <p>
            This is the single most common reason people{" "}
            <strong>can&apos;t change playback speed on YouTube</strong>. YouTube
            regularly updates its player, and older browsers may not support
            newer features — including the speed control menu.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#C642FC]" /> How to Fix
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">Desktop:</strong> Update your
                  browser to the latest version. In Chrome, go to{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">chrome://settings/help</code>{" "}
                  to check for updates.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">Mobile:</strong> Open the App
                  Store (iOS) or Google Play Store (Android) and update the
                  YouTube app to the latest version.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-white">Smart TV / Console:</strong>{" "}
                  Check for system or app updates in your device settings.
                </span>
              </div>
            </div>
          </div>

          {/* Cause 2 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            2. Browser Extensions Are Interfering
          </h2>
          <p>
            Browser extensions — especially ad blockers, video downloaders, and
            other YouTube-related extensions — can sometimes interfere with
            YouTube&apos;s player controls. An extension might override the settings
            menu, hide the speed option, or cause JavaScript errors that break
            the control.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#C642FC]" /> How to Fix
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Open YouTube in an <strong className="text-white">incognito / private window</strong>{" "}
                  (Ctrl+Shift+N in Chrome). If playback speed works there,
                  an extension is the culprit.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Disable extensions one by one (go to{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">chrome://extensions</code>)
                  and reload YouTube after each to identify the conflicting
                  extension.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Once found, either remove the extension, update it, or
                  check its settings for a YouTube compatibility option.
                </span>
              </div>
            </div>
          </div>

          <p>
            Note that well-built extensions like{" "}
            <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C642FC] no-underline hover:underline"
            >
              FunLingo
            </a>{" "}
            are designed to work alongside YouTube&apos;s native controls without
            interfering with features like playback speed.
          </p>

          {/* Cause 3 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            3. The Video Is Embedded on Another Website
          </h2>
          <p>
            When a YouTube video is embedded on a third-party website (like a
            blog, course platform, or forum), the uploader or site owner can
            restrict which player controls appear. Playback speed is one of the
            features that can be disabled in embedded players.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-[#C642FC]" /> How to Fix
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Click the <strong className="text-white">YouTube logo</strong>{" "}
                  in the bottom-right of the embedded player. This opens the
                  video directly on YouTube where all controls are available.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Alternatively, right-click the video, select{" "}
                  <strong className="text-white">&quot;Copy video URL&quot;</strong>, and
                  open it in a new tab on youtube.com.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Use a browser extension for speed control (like Video Speed
                  Controller) that overrides embedded player restrictions using
                  HTML5 video controls.
                </span>
              </div>
            </div>
          </div>

          {/* Cause 4 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            4. You&apos;re Watching a Live Stream or Premiere
          </h2>
          <p>
            YouTube <strong>disables playback speed controls for live streams</strong>{" "}
            by design. Since live content is broadcasting in real time, speeding
            it up or slowing it down doesn&apos;t make sense. The same applies to
            Premieres while they&apos;re actively streaming.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" /> What to Do
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Wait for the live stream to end. Once it&apos;s saved as a regular
                  video, playback speed controls will become available.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  For Premieres, the speed control unlocks after the premiere
                  finishes and the video transitions to a standard upload.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Some third-party speed control extensions can still adjust
                  the speed of the HTML5 player during live streams, though
                  results may vary.
                </span>
              </div>
            </div>
          </div>

          {/* Cause 5 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            5. Mobile App Glitches
          </h2>
          <p>
            The YouTube mobile app sometimes has bugs where the playback speed
            option disappears from the settings menu, or tapping it does nothing.
            This is more common on older devices or after a recent app update
            that introduced a bug.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Smartphone className="w-6 h-6 text-[#C642FC] mb-3" />
              <h4 className="text-white font-semibold mb-2">Android Fixes</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Force stop the YouTube app and reopen it
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Clear app cache: Settings &gt; Apps &gt; YouTube &gt; Storage &gt; Clear Cache
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Update the app from Google Play Store
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Uninstall updates and reinstall: Settings &gt; Apps &gt; YouTube &gt; Uninstall Updates
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Smartphone className="w-6 h-6 text-[#C642FC] mb-3" />
              <h4 className="text-white font-semibold mb-2">iOS Fixes</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Close the YouTube app completely and reopen it
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Update the app from the App Store
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Delete and reinstall the YouTube app
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Restart your device
                </li>
              </ul>
            </div>
          </div>

          {/* Cause 6 */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            6. Corrupted Browser Cache or Cookies
          </h2>
          <p>
            Over time, cached data and cookies can become corrupted, causing
            various YouTube features to malfunction — including the playback
            speed menu. If other fixes haven&apos;t worked, this is a reliable
            solution.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-6 not-prose">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#C642FC]" /> How to Clear Cache in Chrome
            </h3>
            <ol className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>
                  Press <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Ctrl+Shift+Delete</code>{" "}
                  (or <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Cmd+Shift+Delete</code> on Mac).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>
                  Set the time range to <strong className="text-white">&quot;All time&quot;</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>
                  Check <strong className="text-white">&quot;Cached images and files&quot;</strong>{" "}
                  and <strong className="text-white">&quot;Cookies and other site data&quot;</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C642FC]/20 text-[#C642FC] flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>
                  Click <strong className="text-white">&quot;Clear data&quot;</strong>,
                  then restart your browser and try YouTube again.
                </span>
              </li>
            </ol>
          </div>

          <p>
            Note that clearing cookies will log you out of most websites. If you
            only want to clear YouTube-specific data, you can go to{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">chrome://settings/content/all</code>{" "}
            and search for &quot;youtube&quot; to clear only YouTube cookies.
          </p>

          {/* Desktop vs Mobile */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Desktop vs. Mobile: Key Differences
          </h2>
          <p>
            The playback speed experience varies significantly between desktop
            and mobile. Understanding these differences can help you troubleshoot
            more effectively.
          </p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-3 text-white font-semibold">Feature</th>
                  <th className="text-center p-3 text-white font-semibold">Desktop</th>
                  <th className="text-center p-3 text-white font-semibold">Mobile App</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-3">Speed options</td>
                  <td className="p-3 text-center">0.25x to 2x</td>
                  <td className="p-3 text-center">0.25x to 2x</td>
                </tr>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="p-3">Custom speed</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3">Keyboard shortcut</td>
                  <td className="p-3 text-center">Shift + &gt; / &lt;</td>
                  <td className="p-3 text-center">N/A</td>
                </tr>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="p-3">Speed on embedded</td>
                  <td className="p-3 text-center">Sometimes disabled</td>
                  <td className="p-3 text-center">N/A</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3">Extension support</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center"><X className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 my-6 not-prose">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#C642FC] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Pro Tip: Keyboard Shortcuts</p>
                <p className="text-gray-400 text-sm">
                  On desktop, you can quickly change playback speed without
                  opening the settings menu. Press{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Shift + &gt;</code>{" "}
                  to speed up and{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Shift + &lt;</code>{" "}
                  to slow down. Each press changes the speed by 0.25x
                  increments.
                </p>
              </div>
            </div>
          </div>

          {/* Language Learning Section */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Using Playback Speed for Language Learning
          </h2>
          <p>
            Playback speed control is especially valuable for language learners.
            Slowing down foreign-language content to 0.75x or 0.5x makes it
            much easier to catch individual words, understand pronunciation, and
            follow along with subtitles. Conversely, speeding up content you&apos;re
            already comfortable with helps train your listening comprehension at
            natural (or faster) speeds.
          </p>
          <p>
            If you&apos;re using YouTube for language learning, here&apos;s how playback
            speed fits into an effective study routine:
          </p>

          <div className="space-y-3 my-6 not-prose">
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <Check className="w-5 h-5 text-[#C642FC] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Start at 0.75x for new content</p>
                <p className="text-gray-400 text-sm">
                  When watching content in a language you&apos;re still learning, slow
                  it down slightly. This gives your brain more time to process
                  unfamiliar sounds and vocabulary.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <Check className="w-5 h-5 text-[#C642FC] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Rewatch at normal speed</p>
                <p className="text-gray-400 text-sm">
                  After studying a clip at slower speed, watch it again at 1x
                  to practice following natural speech patterns. This builds
                  real-world listening skills.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <Check className="w-5 h-5 text-[#C642FC] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Challenge yourself at 1.25x–1.5x</p>
                <p className="text-gray-400 text-sm">
                  Once you&apos;re comfortable with a language level, try watching
                  content slightly faster than normal. If you can follow at
                  1.25x, regular speed will feel much easier.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <Check className="w-5 h-5 text-[#C642FC] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">Pair speed control with dual subtitles</p>
                <p className="text-gray-400 text-sm">
                  Combining slow playback with dual subtitles is one of the most
                  effective ways to learn. You hear the words clearly, see them
                  written in the original language, and understand the meaning in
                  your native language — all at once.
                </p>
              </div>
            </div>
          </div>

          <p>
            For the best language learning experience on YouTube, consider using{" "}
            <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C642FC] no-underline hover:underline"
            >
              FunLingo
            </a>
            , a Chrome extension that displays{" "}
            <strong>dual subtitles</strong> on YouTube, Netflix, and Prime Video.
            It works perfectly alongside YouTube&apos;s speed controls, so you can
            slow down a video to 0.75x while seeing both the original subtitles
            and your native language translation on screen. You can also hover
            over individual words for instant definitions. Learn more about{" "}
            <a
              href="/blog/how-to-learn-a-language-by-watching"
              className="text-[#C642FC] no-underline hover:underline"
            >
              learning languages by watching
            </a>{" "}
            in our detailed guide.
          </p>

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 my-6 not-prose">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-[#C642FC]" />
                Why is the playback speed option greyed out on YouTube?
              </h3>
              <p className="text-gray-400 text-sm">
                The playback speed option is typically greyed out in three
                situations: (1) you&apos;re watching a live stream or active
                premiere, (2) the video is embedded on an external website with
                restricted player controls, or (3) your browser or app is
                outdated. For live streams, wait until the stream ends and the
                video is archived. For embedded videos, click the YouTube logo
                to watch directly on youtube.com. For outdated software, update
                your browser or app.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-[#C642FC]" />
                Can you change playback speed on YouTube TV?
              </h3>
              <p className="text-gray-400 text-sm">
                YouTube TV has limited playback speed support. You can change
                the speed on <strong>recorded (DVR) content</strong> on some
                devices, but <strong>live TV</strong> does not support speed
                changes. The availability also depends on your device — some
                smart TVs and streaming devices may not show the speed option
                even for recordings. For the best experience, try watching
                YouTube TV recordings on a computer browser.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-[#C642FC]" />
                Does changing playback speed affect subtitles?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, subtitles automatically adjust to match the playback speed.
                When you slow a video to 0.5x, subtitles appear at the slower
                rate, giving you more time to read each line. When you speed up
                to 2x, subtitles cycle faster. This makes speed control
                especially useful for language learners — you can slow down to
                read foreign-language subtitles more carefully. Tools like{" "}
                <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">
                  FunLingo&apos;s dual subtitles
                </a>{" "}
                also sync perfectly with speed changes.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-[#C642FC]" />
                How do I change playback speed on YouTube mobile?
              </h3>
              <p className="text-gray-400 text-sm">
                On the YouTube mobile app, tap the video to show controls, then
                tap the <strong>gear icon</strong> (Settings) in the top-right
                corner of the player. Select <strong>&quot;Playback speed&quot;</strong>{" "}
                from the menu and choose your preferred speed (0.25x to 2x).
                If you don&apos;t see this option, make sure your YouTube app is
                updated to the latest version from your app store.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-[#C642FC]" />
                Can I set a default playback speed on YouTube?
              </h3>
              <p className="text-gray-400 text-sm">
                YouTube does not currently offer a built-in option to set a
                default playback speed. Each video starts at 1x and you have to
                manually change it. However, several browser extensions (like
                &quot;YouTube Playback Speed Control&quot;) can remember your preferred
                speed and automatically apply it to every video you watch.
              </p>
            </div>
          </div>

          {/* Summary */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Summary: Quick Troubleshooting Checklist
          </h2>
          <p>
            If you still <strong>can&apos;t change playback speed on YouTube</strong>,
            run through this checklist:
          </p>
          <div className="space-y-2 my-6 not-prose text-gray-300 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Is your browser or app updated to the latest version?</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Does it work in incognito mode? (Extension conflict test)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Are you watching directly on youtube.com (not embedded)?</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Is the video a regular upload (not a live stream or premiere)?</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Have you cleared your browser cache and cookies?</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-[#C642FC]" />
              </div>
              <span>Have you tried a different browser to isolate the issue?</span>
            </div>
          </div>

          {/* Related content */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Related Guides
          </h2>
          <ul>
            <li>
              <a href="/blog/how-to-learn-a-language-by-watching" className="text-[#C642FC] no-underline hover:underline">
                How to Learn a Language by Watching Movies and TV Shows
              </a>
            </li>
            <li>
              <a href="/blog/download-subtitles-from-youtube" className="text-[#C642FC] no-underline hover:underline">
                How to Download Subtitles from YouTube (3 Free Methods)
              </a>
            </li>
            <li>
              <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] no-underline hover:underline">
                Best Dual Subtitle Extensions for Netflix, YouTube & More
              </a>
            </li>
            <li>
              <a href="/blog/learn-korean-watching-youtube" className="text-[#C642FC] no-underline hover:underline">
                How to Learn Korean by Watching YouTube
              </a>
            </li>
          </ul>

          {/* CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Supercharge Your YouTube Language Learning
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Pair playback speed control with dual subtitles for the ultimate
              learning experience. FunLingo works on YouTube, Netflix, and Prime
              Video — completely free.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">
                Get FunLingo Free{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
