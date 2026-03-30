"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock, Check, X, Star, Download, Settings, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ImmersiveTranslateGuideZhContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">教學</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">沈浸式翻譯完整教學：安裝、設定與使用技巧</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2026年3月20日</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo 團隊</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 分鐘閱讀</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">沈浸式翻譯是一款強大的瀏覽器擴充功能，能夠將網頁、影片字幕和PDF文件翻譯成雙語對照格式。本教學將帶你從安裝到進階設定，完整掌握這款工具的所有功能。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">什麼是沈浸式翻譯？</h2>
          <p className="text-gray-300 mb-6">沈浸式翻譯（Immersive Translate）是一款免費的瀏覽器翻譯擴充功能，最大的特色是提供「雙語對照」的翻譯模式。與傳統翻譯工具不同，沈浸式翻譯會在原文下方顯示翻譯，讓你同時看到兩種語言，非常適合語言學習者使用。</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">主要功能一覽</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">網頁雙語對照翻譯</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">YouTube 字幕翻譯</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">PDF 文件翻譯</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">電子書翻譯（EPUB）</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">多種翻譯引擎可選</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">輸入框翻譯功能</span></div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">安裝步驟</h2>
          <p className="text-gray-300 mb-6">沈浸式翻譯支援多種瀏覽器，以下是各瀏覽器的安裝方法。</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">1</div>
                <div>
                  <strong className="text-white block mb-1">Chrome 瀏覽器</strong>
                  <p className="text-sm text-gray-400 mb-0">前往 Chrome 線上應用程式商店，搜尋「Immersive Translate」或「沈浸式翻譯」，點擊「加到 Chrome」按鈕即可安裝。安裝後會在工具列出現翻譯圖示。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">2</div>
                <div>
                  <strong className="text-white block mb-1">Firefox 瀏覽器</strong>
                  <p className="text-sm text-gray-400 mb-0">前往 Firefox 附加元件商店，搜尋「Immersive Translate」，點擊「新增至 Firefox」。Firefox 版本的功能與 Chrome 版相同。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">3</div>
                <div>
                  <strong className="text-white block mb-1">Edge 瀏覽器</strong>
                  <p className="text-sm text-gray-400 mb-0">前往 Edge 擴充功能商店搜尋安裝，或者直接從 Chrome 線上應用程式商店安裝（Edge 支援 Chrome 擴充功能）。</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">基本設定</h2>
          <p className="text-gray-300 mb-6">安裝完成後，建議先進行以下基本設定以獲得最佳體驗。</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">選擇翻譯引擎</strong>
                  <p className="text-sm text-gray-400 mb-0">沈浸式翻譯支援多種翻譯引擎，包括Google翻譯、DeepL、Microsoft翻譯等。免費用戶可使用Google翻譯，Pro用戶可使用DeepL和OpenAI等進階引擎。建議根據翻譯語言選擇最適合的引擎。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">設定目標語言</strong>
                  <p className="text-sm text-gray-400 mb-0">在設定中選擇你的母語作為目標翻譯語言。系統會自動偵測網頁語言並翻譯成你設定的語言。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">翻譯樣式設定</strong>
                  <p className="text-sm text-gray-400 mb-0">你可以自訂翻譯文字的顯示方式，包括字體大小、顏色、底線等。建議選擇「弱化」模式，讓翻譯文字以較淡的顏色顯示，不會過於干擾原文閱讀。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">快捷鍵設定</strong>
                  <p className="text-sm text-gray-400 mb-0">預設快捷鍵為 Alt+A（翻譯網頁）。你可以在設定中自訂快捷鍵組合，方便快速開啟或關閉翻譯功能。</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">進階功能</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Globe className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">YouTube 字幕翻譯</h3>
              <p className="text-sm text-gray-400">在YouTube影片頁面，沈浸式翻譯可以將字幕翻譯成雙語對照格式。但注意，此功能對Netflix的支援有限。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Download className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">PDF 文件翻譯</h3>
              <p className="text-sm text-gray-400">支援PDF文件的雙語對照翻譯，非常適合閱讀外語學術論文或文件。此功能需要Pro方案。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Zap className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">電子書翻譯</h3>
              <p className="text-sm text-gray-400">支援EPUB格式電子書的翻譯，可以在閱讀外語書籍時同時顯示翻譯內容。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Settings className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">輸入框翻譯</h3>
              <p className="text-sm text-gray-400">在任何網頁的輸入框中，連按三次空格鍵即可翻譯你輸入的文字，方便跨語言溝通。</p>
            </div>
          </div>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">想要免費的影片雙語字幕？試試 Funlingo — 支援 Netflix、YouTube 和 Prime Video。</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">免費試用 Funlingo</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">使用技巧</h2>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">善用滑鼠懸停翻譯：</strong>將滑鼠移到段落上即可看到翻譯，不需要翻譯整個頁面，適合只想查看特定段落的情況。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">設定常用網站自動翻譯：</strong>對於經常瀏覽的外語網站，可以設定「總是翻譯該網站」，省去每次手動啟動的步驟。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">根據語言選擇翻譯引擎：</strong>不同翻譯引擎對不同語言的翻譯品質不同。日語和韓語建議使用DeepL，中文可使用Google翻譯。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">使用快捷鍵提升效率：</strong>記住 Alt+A 快捷鍵可以快速切換翻譯開關，大幅提升使用效率。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">嘗試不同翻譯樣式：</strong>沈浸式翻譯提供多種顯示樣式，花幾分鐘嘗試找到最適合你閱讀習慣的樣式。</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">替代工具比較</h2>
          <p className="text-gray-300 mb-6">雖然沈浸式翻譯是一款優秀的工具，但它在某些方面有所限制。以下是幾款值得考慮的替代工具。</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30">
              <div className="flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-yellow-400" /><strong className="text-white text-lg">Funlingo（推薦）</strong><Badge className="bg-green-500/10 text-green-400 border-green-500/20 ml-2">免費</Badge></div>
              <p className="text-gray-300 mb-4 text-sm">Funlingo 是一款完全免費的雙語字幕擴充功能，專為語言學習者設計。如果你主要需要在觀看影片時顯示雙語字幕，Funlingo 是最佳選擇。</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix、YouTube、Prime Video</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 完全免費</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 內建詞彙本</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 點擊查詞功能</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <strong className="text-white text-lg block mb-2">Google 翻譯擴充功能</strong>
              <p className="text-gray-300 mb-4 text-sm">Google官方的翻譯擴充功能，支援超過100種語言。適合快速翻譯網頁內容，但不提供雙語對照模式。</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 免費使用</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 100+ 語言</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 無雙語對照</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 無影片字幕</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <strong className="text-white text-lg block mb-2">DeepL 擴充功能</strong>
              <p className="text-gray-300 mb-4 text-sm">以翻譯品質著稱的DeepL也有瀏覽器擴充功能。翻譯品質優於Google翻譯，但支援的語言較少。</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 翻譯品質佳</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 免費基本功能</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 語言支援較少</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 進階功能需付費</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <strong className="text-white text-lg block mb-2">Trancy</strong>
              <p className="text-gray-300 mb-4 text-sm">AI驅動的語言學習工具，支援Netflix和YouTube的雙語字幕，提供文法分析功能。完整功能需要每月約$8的訂閱。</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> AI文法分析</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> Netflix + YouTube</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 需要付費（$8/月）</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 不支援 Prime Video</div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h2 className="text-2xl font-bold text-white mb-6">常見問題</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-6">
              <div>
                <strong className="text-white block mb-2">沈浸式翻譯是免費的嗎？</strong>
                <p className="text-sm text-gray-400 mb-0">沈浸式翻譯提供免費版本，包含基本的網頁翻譯功能。進階功能如PDF翻譯和更多翻譯引擎需要訂閱Pro方案。如果你主要需要影片雙語字幕，Funlingo是完全免費的替代選擇。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">沈浸式翻譯支援哪些瀏覽器？</strong>
                <p className="text-sm text-gray-400 mb-0">沈浸式翻譯支援Chrome、Firefox、Edge和Safari瀏覽器。各瀏覽器的功能可能略有不同，Chrome版本通常最先獲得更新。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">有什麼替代工具推薦？</strong>
                <p className="text-sm text-gray-400 mb-0">如果你需要影片雙語字幕功能，推薦使用 <a href="/blog/best-dual-subtitle-extension" className="text-[#C642FC] hover:underline">Funlingo</a>——它完全免費，支援Netflix、YouTube和Prime Video的雙語字幕。如果需要網頁翻譯，Google翻譯擴充功能也是不錯的免費選擇。</p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">免費取得影片雙語字幕</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Funlingo 提供 Netflix、YouTube 和 Prime Video 的免費雙語字幕，內建詞彙本功能，完全免費使用。</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">免費安裝 Funlingo <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>

        </div>
      </main>
      <FooterSection />
    </div>
  );
}
