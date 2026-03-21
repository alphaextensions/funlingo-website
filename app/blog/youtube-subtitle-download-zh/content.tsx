"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Download, ArrowRight, Monitor, FileText, Globe, Check, X } from "lucide-react";

export default function YoutubeSubtitleDownloadZhContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">教程</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">YouTube字幕下载 &mdash; SRT一键导出指南</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2026年3月21日</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo 团队</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 分钟阅读</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">无论你是语言学习者、内容创作者，还是需要为视频添加翻译字幕的专业人士，YouTube字幕下载都是一项非常实用的技能。YouTube作为全球最大的视频平台，拥有海量的多语言字幕资源。本文将详细介绍四种主流的YouTube字幕下载方法，帮助你快速获取SRT、VTT等格式的字幕文件，同时推荐一种更高效的双语字幕观看方案。</p>

          <hr className="border-white/10 my-12" />

          {/* 为什么需要下载YouTube字幕 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">为什么需要下载YouTube字幕？</h2>
          <p className="text-gray-300 mb-6">YouTube字幕下载的需求主要来自以下几个方面：</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Globe className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">语言学习</h3>
              <p className="text-sm text-gray-400">下载外语字幕后，可以离线反复学习，标注生词，制作学习笔记。特别适合通过看视频学英语、日语、韩语等外语。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <FileText className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">内容二次创作</h3>
              <p className="text-sm text-gray-400">视频博主可以下载字幕作为翻译底稿，快速制作多语言版本的视频，提升内容的全球传播力。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Monitor className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">无障碍访问</h3>
              <p className="text-sm text-gray-400">听力障碍用户可以下载字幕后在本地播放器中加载，获得更好的字幕显示效果和自定义样式。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Download className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">离线存档</h3>
              <p className="text-sm text-gray-400">将重要视频的字幕存档，以防视频被删除或字幕被修改，保留珍贵的文字内容。</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法一：在线字幕下载工具 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法一：在线字幕下载工具</h2>
          <p className="text-gray-300 mb-6">在线工具是最简单的YouTube字幕下载方式，无需安装任何软件，只需粘贴视频链接即可。以下是几个常用的在线字幕下载网站：</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">DownSub（downsub.com）</h3>
              <p className="text-gray-300 mb-3">DownSub是目前最受欢迎的YouTube字幕下载工具之一。它支持下载YouTube视频的手动字幕和自动生成字幕，输出格式包括SRT和TXT。操作非常简单：复制YouTube视频链接，粘贴到DownSub的输入框中，点击下载按钮，选择语言和格式即可。</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 免费使用，无需注册</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持多种语言字幕下载</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 同时提供SRT和TXT格式</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 页面有广告，需要注意误点</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 部分视频的自动字幕可能无法下载</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">SaveSubs（savesubs.com）</h3>
              <p className="text-gray-300 mb-3">SaveSubs不仅支持YouTube，还支持从Facebook、Dailymotion、Viki等多个平台下载字幕。它可以输出SRT、VTT、TXT等多种格式，并且支持将字幕自动翻译成其他语言后下载。界面简洁直观，适合新手使用。</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持多个视频平台</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 内置翻译功能，可下载翻译后的字幕</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 翻译质量依赖机器翻译，可能不够准确</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 速度较慢，有时需要等待较长时间</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-3">YouSubtitles（yousubtitles.com）</h3>
              <p className="text-gray-300 mb-3">YouSubtitles专门针对YouTube设计，操作流程极为简单。粘贴链接后自动检测可用字幕语言，一键即可下载SRT文件。网站加载速度快，广告较少，体验良好。</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 操作最为简单，适合初学者</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 广告少，页面干净</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 仅支持YouTube平台</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 格式选择有限</div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法二：浏览器扩展方案 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法二：浏览器扩展方案</h2>
          <p className="text-gray-300 mb-6">如果你经常需要下载YouTube字幕，安装一个浏览器扩展会更加方便。以下是几款常用的字幕下载扩展：</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">1</div>
                <div>
                  <strong className="text-white block mb-1">Subtitle Downloader</strong>
                  <p className="text-sm text-gray-400 mb-0">Chrome扩展商店中比较流行的字幕下载工具。安装后，在YouTube视频页面会出现一个下载按钮，点击即可选择字幕语言并下载SRT文件。支持手动字幕和自动生成字幕。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">2</div>
                <div>
                  <strong className="text-white block mb-1">YouTube Dual Subtitles</strong>
                  <p className="text-sm text-gray-400 mb-0">这类扩展不仅能显示双语字幕，部分还提供字幕导出功能。适合需要同时查看两种语言字幕并下载的用户。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">3</div>
                <div>
                  <strong className="text-white block mb-1">注意事项</strong>
                  <p className="text-sm text-gray-400 mb-0">安装扩展时请认准Chrome网上应用店中评分高、用户量大的正规扩展，避免安装来路不明的扩展造成隐私泄露。部分扩展可能会要求不必要的权限，请谨慎授权。</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法三：yt-dlp命令行 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法三：yt-dlp命令行工具（推荐进阶用户）</h2>
          <p className="text-gray-300 mb-6">yt-dlp是youtube-dl的增强版，是目前功能最强大的YouTube字幕下载工具。它是一个开源的命令行工具，支持从YouTube及数百个其他视频网站下载视频和字幕。虽然需要一定的技术基础，但一旦掌握，效率远超其他方法。</p>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">安装步骤</h3>
            <p className="text-gray-300 mb-3">首先你需要在电脑上安装yt-dlp。以下是各系统的安装命令：</p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-green-400 block"># Windows（使用pip安装）</code>
              <code className="text-sm text-gray-300 block">pip install yt-dlp</code>
              <code className="text-sm text-green-400 block mt-3"># macOS（使用Homebrew安装）</code>
              <code className="text-sm text-gray-300 block">brew install yt-dlp</code>
              <code className="text-sm text-green-400 block mt-3"># Linux（使用pip安装）</code>
              <code className="text-sm text-gray-300 block">pip install yt-dlp</code>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">下载字幕的常用命令</h3>

            <p className="text-gray-300 mb-2"><strong className="text-white">1. 查看视频可用的字幕列表：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --list-subs &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>

            <p className="text-gray-300 mb-2"><strong className="text-white">2. 下载指定语言的字幕（以中文为例）：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --write-sub --sub-lang zh-Hans --skip-download &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>

            <p className="text-gray-300 mb-2"><strong className="text-white">3. 下载自动生成的字幕：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --write-auto-sub --sub-lang zh-Hans --skip-download &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>

            <p className="text-gray-300 mb-2"><strong className="text-white">4. 下载字幕并转换为SRT格式：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --write-sub --sub-lang zh-Hans --convert-subs srt --skip-download &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>

            <p className="text-gray-300 mb-2"><strong className="text-white">5. 同时下载中文和英文字幕：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --write-sub --sub-lang &quot;zh-Hans,en&quot; --convert-subs srt --skip-download &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>

            <p className="text-gray-300 mb-2"><strong className="text-white">6. 下载所有可用语言的字幕：</strong></p>
            <div className="bg-black/50 p-4 rounded-lg mb-0 overflow-x-auto">
              <code className="text-sm text-gray-300 block">yt-dlp --write-sub --all-subs --convert-subs srt --skip-download &quot;https://www.youtube.com/watch?v=VIDEO_ID&quot;</code>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">yt-dlp 参数说明</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--write-sub</code><span className="text-gray-400">下载手动上传的字幕</span></div>
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--write-auto-sub</code><span className="text-gray-400">下载YouTube自动生成的字幕</span></div>
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--sub-lang</code><span className="text-gray-400">指定字幕语言代码（如 zh-Hans、en、ja、ko）</span></div>
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--convert-subs srt</code><span className="text-gray-400">将字幕转换为SRT格式</span></div>
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--skip-download</code><span className="text-gray-400">仅下载字幕，不下载视频文件</span></div>
              <div className="flex items-start gap-3"><code className="text-[#C642FC] whitespace-nowrap">--all-subs</code><span className="text-gray-400">下载所有可用语言的字幕</span></div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法四：YouTube内置功能 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法四：YouTube内置字幕复制功能</h2>
          <p className="text-gray-300 mb-6">你可能不知道，YouTube本身就提供了一种获取字幕文本的方式，虽然不能直接导出SRT文件，但可以复制纯文本字幕内容。</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">1</div>
                <div>
                  <strong className="text-white block mb-1">打开视频描述</strong>
                  <p className="text-sm text-gray-400 mb-0">打开你要获取字幕的YouTube视频，点击视频下方的「更多」展开描述区域。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">2</div>
                <div>
                  <strong className="text-white block mb-1">点击「显示转录」</strong>
                  <p className="text-sm text-gray-400 mb-0">在视频描述下方找到「显示转录」按钮并点击。如果视频有字幕（手动或自动生成），转录面板会在视频右侧打开。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">3</div>
                <div>
                  <strong className="text-white block mb-1">选择语言并复制</strong>
                  <p className="text-sm text-gray-400 mb-0">在转录面板中选择你需要的语言，然后使用 Ctrl+A 全选文本，Ctrl+C 复制，粘贴到文本编辑器中保存。注意：此方法获取的是纯文本，带有时间戳但不是标准SRT格式。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20 mb-8">
            <p className="text-sm text-yellow-200 mb-0"><strong>提示：</strong>此方法适合快速获取字幕文本内容，但如果需要标准的SRT字幕文件用于视频编辑或播放器加载，建议使用前面介绍的在线工具或yt-dlp。</p>
          </div>

          <hr className="border-white/10 my-12" />

          {/* SRT vs VTT vs TXT 格式对比 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">SRT vs VTT vs TXT：字幕格式对比</h2>
          <p className="text-gray-300 mb-6">下载YouTube字幕时，你通常会遇到三种主要的字幕格式。了解它们的区别有助于你选择最合适的格式。</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white font-semibold">特性</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">SRT</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">VTT</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">TXT</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">时间戳</td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /> 有</td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /> 有</td>
                  <td className="py-3 px-4"><X className="w-4 h-4 text-red-400 inline" /> 无</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">样式支持</td>
                  <td className="py-3 px-4">基本（加粗、斜体）</td>
                  <td className="py-3 px-4">丰富（CSS样式）</td>
                  <td className="py-3 px-4">无</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">兼容性</td>
                  <td className="py-3 px-4">极佳（几乎所有播放器）</td>
                  <td className="py-3 px-4">良好（网页播放器）</td>
                  <td className="py-3 px-4">通用（纯文本）</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">文件大小</td>
                  <td className="py-3 px-4">小</td>
                  <td className="py-3 px-4">小</td>
                  <td className="py-3 px-4">最小</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">推荐用途</td>
                  <td className="py-3 px-4">视频编辑、本地播放</td>
                  <td className="py-3 px-4">网页嵌入、在线播放</td>
                  <td className="py-3 px-4">纯文本阅读、翻译</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">推荐指数</td>
                  <td className="py-3 px-4 text-green-400 font-semibold">强烈推荐</td>
                  <td className="py-3 px-4 text-yellow-400">推荐</td>
                  <td className="py-3 px-4 text-gray-500">一般</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-300 mb-6"><strong className="text-white">总结：</strong>对于大多数用户来说，<strong className="text-white">SRT格式</strong>是YouTube字幕下载的最佳选择。它兼容性最好，几乎所有视频播放器和编辑软件都支持SRT格式。如果你需要在网页中使用字幕，VTT格式更合适。TXT格式则适合仅需要字幕文本内容的场景。</p>

          <hr className="border-white/10 my-12" />

          {/* 各方法对比表 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">四种方法对比</h2>
          <p className="text-gray-300 mb-6">以下是四种YouTube字幕下载方法的综合对比，帮助你根据自己的需求选择最合适的方式：</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white font-semibold">对比项</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">在线工具</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">浏览器扩展</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">yt-dlp</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">内置复制</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">难度</td>
                  <td className="py-3 px-4 text-green-400">简单</td>
                  <td className="py-3 px-4 text-green-400">简单</td>
                  <td className="py-3 px-4 text-yellow-400">中等</td>
                  <td className="py-3 px-4 text-green-400">简单</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">SRT输出</td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4"><X className="w-4 h-4 text-red-400 inline" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">批量下载</td>
                  <td className="py-3 px-4"><X className="w-4 h-4 text-red-400 inline" /></td>
                  <td className="py-3 px-4"><X className="w-4 h-4 text-red-400 inline" /></td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4"><X className="w-4 h-4 text-red-400 inline" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">多语言支持</td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4">部分</td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                  <td className="py-3 px-4"><Check className="w-4 h-4 text-green-400 inline" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">安装要求</td>
                  <td className="py-3 px-4">无</td>
                  <td className="py-3 px-4">浏览器扩展</td>
                  <td className="py-3 px-4">Python + yt-dlp</td>
                  <td className="py-3 px-4">无</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">适合人群</td>
                  <td className="py-3 px-4">普通用户</td>
                  <td className="py-3 px-4">频繁使用者</td>
                  <td className="py-3 px-4">技术用户</td>
                  <td className="py-3 px-4">临时需求</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 更好的选择：Funlingo */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">更好的选择：用Funlingo实时双语字幕</h2>
          <p className="text-gray-300 mb-6">如果你下载YouTube字幕的主要目的是<strong className="text-white">语言学习</strong>，那么其实有一种更高效的方式 —— 使用Funlingo Chrome扩展直接在YouTube上显示实时双语字幕，完全不需要下载任何字幕文件。</p>

          <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">为什么Funlingo比下载字幕更好？</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">实时双语显示：</strong>无需手动下载和加载字幕文件，Funlingo自动在YouTube视频上同时显示原文字幕和你的母语翻译，省去繁琐的操作步骤。</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">完全免费：</strong>Funlingo的所有功能完全免费，没有付费墙、没有使用次数限制、没有广告打扰，所有用户都能享受完整功能。</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">多平台支持：</strong>除了YouTube，Funlingo还支持Netflix和Amazon Prime Video的双语字幕，一个扩展覆盖主流视频平台。</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">点击查词：</strong>观看视频时遇到不认识的单词？直接点击字幕中的单词即可查看释义，无需切换到词典应用。</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">内置词汇本：</strong>将生词保存到词汇本中，方便后续复习巩固，让每次观看视频都成为有效的学习过程。</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 mb-0"><strong className="text-white">安装简单：</strong>只需在Chrome应用商店安装扩展，打开YouTube视频即可自动生效，无需任何配置。</p>
              </div>
            </div>
          </div>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">不再需要手动下载字幕 —— 用Funlingo在YouTube上直接显示双语字幕，完全免费！</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">免费安装 Funlingo</Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 常见问题 */}
          <h2 className="text-2xl font-bold text-white mb-6">常见问题</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-6">
              <div>
                <strong className="text-white block mb-2">YouTube字幕可以免费下载吗？</strong>
                <p className="text-sm text-gray-400 mb-0">可以。本文介绍的所有方法都可以免费使用。在线工具如DownSub和SaveSubs完全免费，yt-dlp是开源免费软件，YouTube内置的转录功能也不收费。如果你只是想在观看时看到双语字幕，Funlingo同样完全免费。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">如何下载YouTube自动生成的字幕？</strong>
                <p className="text-sm text-gray-400 mb-0">YouTube会为大部分视频自动生成字幕（也称为CC字幕）。使用DownSub等在线工具时，自动字幕和手动字幕都会列出供你选择。使用yt-dlp时，需要添加 <code className="text-[#C642FC]">--write-auto-sub</code> 参数来下载自动生成的字幕。注意，自动字幕的准确度可能低于手动字幕。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">下载的YouTube字幕如何加载到其他播放器？</strong>
                <p className="text-sm text-gray-400 mb-0">下载SRT格式的字幕后，可以在VLC、PotPlayer、KMPlayer等主流播放器中加载。以VLC为例：播放视频后，点击「字幕」菜单，选择「添加字幕文件」，找到你下载的SRT文件即可。大多数播放器也支持将SRT文件拖放到播放窗口来加载字幕。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">为什么有些YouTube视频没有字幕可以下载？</strong>
                <p className="text-sm text-gray-400 mb-0">有几种可能：视频上传者关闭了字幕功能；视频语言不在YouTube自动字幕支持的范围内；视频太短（通常需要超过一定时长才会生成自动字幕）；或者视频内容主要是音乐而非语音。这种情况下，可以尝试使用其他语音识别工具生成字幕。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">如何获取YouTube视频的中英双语字幕？</strong>
                <p className="text-sm text-gray-400 mb-0">最简单的方法是使用<a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline" target="_blank" rel="noopener noreferrer">Funlingo</a>Chrome扩展，安装后自动在YouTube上同时显示中英双语字幕。如果你需要下载双语字幕文件，可以使用yt-dlp分别下载中文和英文字幕（<code className="text-[#C642FC]">--sub-lang &quot;zh-Hans,en&quot;</code>），然后使用字幕编辑工具合并。</p>
              </div>
            </div>
          </div>

          {/* 底部CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">告别手动下载字幕</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Funlingo为YouTube、Netflix和Prime Video提供免费实时双语字幕，内置点击查词和词汇本功能，让看视频变成高效的语言学习体验。</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-14 px-10 rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-lg shadow-purple-500/20">免费安装 Funlingo <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>

        </div>
      </main>
      <FooterSection />
    </div>
  );
}
