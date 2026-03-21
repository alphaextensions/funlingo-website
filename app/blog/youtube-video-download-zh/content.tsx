"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Download, ArrowRight, Monitor, Smartphone, Globe, Check, X, PlayCircle } from "lucide-react";

export default function YoutubeVideoDownloadZhContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-red-500/10 text-red-400 border-red-500/20 px-3 py-1">中文教程</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">油管视频下载 — 高清无水印保存方法 (2026)</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">最全面的油管（YouTube）视频下载指南，涵盖在线工具、桌面软件、浏览器扩展和手机端方案，轻松保存高清视频。</p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2026年3月21日</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo 团队</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 分钟阅读</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">油管（YouTube）是全球最大的视频平台，上面有大量优质的教学视频、音乐MV、纪录片和语言学习资源。但很多时候我们需要在没有网络的情况下观看，或者想永久收藏某个视频。本文将详细介绍2026年最新的油管视频下载方法，包括免费在线工具、专业桌面软件、浏览器扩展以及手机端方案，帮你轻松保存高清无水印视频。</p>

          <hr className="border-white/10 my-12" />

          {/* 为什么需要下载油管视频 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">为什么需要下载油管视频？</h2>
          <p className="text-gray-300 mb-6">虽然油管可以在线观看，但以下场景中下载视频会更加方便：</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <PlayCircle className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">离线观看</h3>
              <p className="text-sm text-gray-400">坐飞机、坐地铁或者在没有WiFi的地方，提前下载好视频可以随时观看，不受网络限制。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Globe className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">语言学习</h3>
              <p className="text-sm text-gray-400">下载带字幕的外语视频，方便反复观看和跟读练习。配合Funlingo双语字幕效果更好。</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Download className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">永久收藏</h3>
              <p className="text-sm text-gray-400">有些视频可能被删除或设为私密，提前下载可以确保你不会失去喜欢的内容。</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法一：在线下载工具 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法一：在线下载工具（最简单）</h2>
          <p className="text-gray-300 mb-6">在线下载工具是最简单的方式，无需安装任何软件，打开网页粘贴链接就能下载。以下是2026年最好用的几个在线工具：</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">1</div>
                <div>
                  <strong className="text-white block mb-1">y2mate.com</strong>
                  <p className="text-sm text-gray-400 mb-2">最受欢迎的油管视频下载工具之一，界面简洁，速度快。</p>
                  <div className="bg-black/30 p-3 rounded-lg text-sm text-gray-300 space-y-1">
                    <p className="mb-1"><strong className="text-white">步骤1：</strong>打开油管，找到想下载的视频，复制浏览器地址栏中的视频链接</p>
                    <p className="mb-1"><strong className="text-white">步骤2：</strong>打开 y2mate.com，将链接粘贴到输入框中</p>
                    <p className="mb-1"><strong className="text-white">步骤3：</strong>点击"Start"按钮，等待解析完成</p>
                    <p className="mb-0"><strong className="text-white">步骤4：</strong>选择想要的分辨率（推荐1080P），点击"Download"即可保存</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">免费</span>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">支持1080P</span>
                    <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded">无需注册</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">2</div>
                <div>
                  <strong className="text-white block mb-1">savefrom.net</strong>
                  <p className="text-sm text-gray-400 mb-2">老牌的视频下载网站，支持多个平台的视频下载，稳定性好。使用方法和y2mate类似：复制视频链接，粘贴到网站，选择分辨率后下载。支持MP4和WebM格式，还可以只提取音频保存为MP3。</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">免费</span>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">支持MP3提取</span>
                    <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded">多平台支持</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">3</div>
                <div>
                  <strong className="text-white block mb-1">9xbuddy.com</strong>
                  <p className="text-sm text-gray-400 mb-2">界面清爽、广告少的在线下载工具。支持YouTube、Facebook、Instagram等多个平台。提供多种分辨率选择，下载速度快，适合偶尔下载视频的用户。</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">免费</span>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">广告少</span>
                    <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded">支持多平台</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl mb-8">
            <p className="text-sm text-yellow-200 mb-0"><strong>注意：</strong>在线工具通常最高支持1080P分辨率。如果需要下载4K或更高分辨率的视频，建议使用下面介绍的桌面软件方法。</p>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法二：桌面软件 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法二：桌面软件（最强大）</h2>
          <p className="text-gray-300 mb-6">桌面软件功能更强大，支持批量下载、4K分辨率、字幕下载等高级功能。以下是两款最推荐的工具：</p>

          <div className="space-y-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6 text-red-400" />
                <strong className="text-white text-xl">yt-dlp（开源免费，功能最强）</strong>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">推荐</Badge>
              </div>
              <p className="text-gray-300 mb-4">yt-dlp 是一款开源的命令行视频下载工具，是 youtube-dl 的增强版本。它功能极其强大，支持几乎所有视频网站，可以下载最高画质的视频，而且完全免费。</p>

              <div className="bg-black/40 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">安装方法（Windows）：</strong></p>
                <code className="block text-sm text-green-400 bg-black/50 p-3 rounded mb-2">winget install yt-dlp</code>
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">安装方法（macOS）：</strong></p>
                <code className="block text-sm text-green-400 bg-black/50 p-3 rounded mb-2">brew install yt-dlp</code>
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">安装方法（Linux）：</strong></p>
                <code className="block text-sm text-green-400 bg-black/50 p-3 rounded mb-4">sudo apt install yt-dlp</code>
              </div>

              <div className="bg-black/40 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-2"><strong className="text-white">常用命令示例：</strong></p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1"># 下载最高画质视频（推荐）</p>
                    <code className="block text-sm text-green-400 bg-black/50 p-2 rounded">yt-dlp -f &quot;bestvideo+bestaudio&quot; https://youtube.com/watch?v=视频ID</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1"># 下载指定分辨率（例如1080P）</p>
                    <code className="block text-sm text-green-400 bg-black/50 p-2 rounded">yt-dlp -f &quot;bestvideo[height&lt;=1080]+bestaudio&quot; 视频链接</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1"># 下载视频并嵌入字幕</p>
                    <code className="block text-sm text-green-400 bg-black/50 p-2 rounded">yt-dlp --write-subs --sub-lang zh,en --embed-subs 视频链接</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1"># 只下载音频（转为MP3）</p>
                    <code className="block text-sm text-green-400 bg-black/50 p-2 rounded">yt-dlp -x --audio-format mp3 视频链接</code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1"># 批量下载整个播放列表</p>
                    <code className="block text-sm text-green-400 bg-black/50 p-2 rounded">yt-dlp -f &quot;bestvideo+bestaudio&quot; 播放列表链接</code>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 完全免费开源</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持4K/8K下载</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 批量下载播放列表</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持字幕下载</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 更新频繁维护好</div>
                <div className="flex items-center gap-2 text-yellow-400"><span className="text-yellow-400">!</span> 需要命令行基础</div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6 text-blue-400" />
                <strong className="text-white text-xl">4K Video Downloader</strong>
              </div>
              <p className="text-gray-300 mb-4">如果你不习惯使用命令行，4K Video Downloader 是最好的图形界面选择。操作简单直观，复制链接后软件会自动解析，选择分辨率即可下载。</p>

              <div className="bg-black/30 p-3 rounded-lg text-sm text-gray-300 space-y-1 mb-4">
                <p className="mb-1"><strong className="text-white">步骤1：</strong>从官网下载并安装 4K Video Downloader</p>
                <p className="mb-1"><strong className="text-white">步骤2：</strong>复制油管视频链接</p>
                <p className="mb-1"><strong className="text-white">步骤3：</strong>点击软件中的"Paste Link"按钮</p>
                <p className="mb-1"><strong className="text-white">步骤4：</strong>选择视频质量（最高支持4K）和保存格式</p>
                <p className="mb-0"><strong className="text-white">步骤5：</strong>点击"Download"开始下载</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 图形界面，操作简单</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持4K下载</div>
                <div className="flex items-center gap-2 text-green-400"><Check className="w-4 h-4" /> 支持字幕下载</div>
                <div className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> 免费版有数量限制</div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法三：浏览器扩展 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法三：浏览器扩展（最便捷）</h2>
          <p className="text-gray-300 mb-6">浏览器扩展安装后可以直接在油管页面上添加下载按钮，非常方便快捷。</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">Video DownloadHelper</strong>
                  <p className="text-sm text-gray-400 mb-2">最知名的视频下载浏览器扩展之一，支持Chrome和Firefox。安装后，当页面上有可下载的视频时，扩展图标会变为彩色。点击图标即可选择分辨率并下载。支持多种视频格式，兼容性好。</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">Chrome / Firefox</span>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">一键下载</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">SaveFrom.net Helper</strong>
                  <p className="text-sm text-gray-400 mb-2">SaveFrom的浏览器扩展版本，安装后会在油管视频下方直接显示下载按钮。支持多种分辨率选择，操作非常直观。不过Chrome商店可能搜不到，需要从官网手动安装。</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">免费</span>
                    <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded">需手动安装</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white block mb-1">Easy YouTube Video Downloader Express</strong>
                  <p className="text-sm text-gray-400 mb-2">专为Firefox设计的油管下载扩展，在视频播放器下方添加下载按钮，支持MP4、WebM等格式，也可以单独下载音频。界面简洁，无广告干扰。</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">免费</span>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">仅Firefox</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 手机端方案 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">手机端油管视频下载方案</h2>
          <p className="text-gray-300 mb-6">在手机上下载油管视频稍微复杂一些，但也有可用的方法。以下分别介绍iOS和Android的方案。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Smartphone className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Android 方案</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">方案1：在线工具</strong> — 用浏览器打开y2mate.com或savefrom.net，粘贴视频链接即可下载。文件会保存到"下载"文件夹。</p>
                <p className="mb-2"><strong className="text-white">方案2：Seal App</strong> — 一款开源的Android视频下载应用，基于yt-dlp，支持高清下载。可从GitHub或F-Droid安装。</p>
                <p className="mb-0"><strong className="text-white">方案3：NewPipe</strong> — 开源的YouTube客户端替代品，内置下载功能，无广告，还支持后台播放。</p>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Smartphone className="w-8 h-8 text-gray-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">iOS 方案</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="mb-2"><strong className="text-white">方案1：在线工具</strong> — 用Safari打开y2mate.com，粘贴视频链接，下载后文件会保存到"文件"App中，之后可以转存到相册。</p>
                <p className="mb-2"><strong className="text-white">方案2：快捷指令</strong> — 在iOS的"快捷指令"App中添加视频下载快捷指令，可以从分享菜单直接触发下载。</p>
                <p className="mb-0"><strong className="text-white">方案3：Documents App</strong> — 使用Readdle的Documents应用内置浏览器访问在线下载工具，可以更方便地管理下载文件。</p>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 各方法对比表 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">各方法对比一览表</h2>
          <p className="text-gray-300 mb-6">以下表格帮你快速选择最适合你的油管视频下载方法：</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-white font-bold">方法</th>
                  <th className="text-center p-3 text-white font-bold">最高分辨率</th>
                  <th className="text-center p-3 text-white font-bold">免费</th>
                  <th className="text-center p-3 text-white font-bold">易用性</th>
                  <th className="text-center p-3 text-white font-bold">需安装</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-300">在线工具</td>
                  <td className="p-3 text-center text-gray-300">1080P</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center text-yellow-400">★★★★★</td>
                  <td className="p-3 text-center"><X className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-300">yt-dlp</td>
                  <td className="p-3 text-center text-gray-300">8K</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center text-yellow-400">★★★</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-300">4K Video Downloader</td>
                  <td className="p-3 text-center text-gray-300">4K</td>
                  <td className="p-3 text-center text-gray-400">部分免费</td>
                  <td className="p-3 text-center text-yellow-400">★★★★</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-300">浏览器扩展</td>
                  <td className="p-3 text-center text-gray-300">1080P</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center text-yellow-400">★★★★</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 text-gray-300">手机在线工具</td>
                  <td className="p-3 text-center text-gray-300">1080P</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center text-yellow-400">★★★★</td>
                  <td className="p-3 text-center"><X className="w-4 h-4 text-green-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-300">手机App（Android）</td>
                  <td className="p-3 text-center text-gray-300">4K</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-green-400 mx-auto" /></td>
                  <td className="p-3 text-center text-yellow-400">★★★★</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-red-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 下载注意事项 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">油管视频下载注意事项</h2>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">版权问题：</strong>下载油管视频仅供个人观看和学习使用。未经版权所有者许可，不得将下载的视频用于商业用途、重新上传或公开传播。尊重创作者的知识产权。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">安全提醒：</strong>使用在线工具时要注意安全。避免点击页面上的弹窗广告，不要安装来路不明的软件。建议使用广告拦截器，优先选择本文推荐的工具。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">格式选择：</strong>视频格式推荐MP4（兼容性最好），音频格式推荐MP3或AAC。如果追求画质，可以选择WebM格式（VP9编码）。4K及以上分辨率的视频文件较大，请确保有足够的存储空间。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">网络环境：</strong>在中国大陆访问油管需要使用VPN或代理工具。下载工具同样需要在能访问油管的网络环境下使用。部分在线工具可能有访问限制，可以多试几个。</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* Funlingo推荐 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">更好的选择：用Funlingo在线学习，无需下载</h2>
          <p className="text-gray-300 mb-6">如果你下载油管视频的主要目的是<strong className="text-white">语言学习</strong>，那么其实有一个更方便的方法——使用<strong className="text-white">Funlingo双语字幕扩展</strong>直接在线学习，完全不需要下载视频。</p>

          <div className="bg-white/5 p-6 rounded-xl border border-[#C642FC]/30 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="w-6 h-6 text-[#C642FC]" />
              <strong className="text-white text-lg">Funlingo 双语字幕扩展</strong>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 ml-2">完全免费</Badge>
            </div>
            <p className="text-gray-300 mb-4">Funlingo 是一款完全免费的Chrome扩展，专为语言学习者设计。它可以在YouTube、Netflix和Prime Video上同时显示两种语言的字幕，让你边看视频边学外语。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">YouTube、Netflix、Prime Video双语字幕</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">点击字幕即可查词翻译</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">内置词汇本，自动保存生词</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">支持几十种语言</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">无需下载视频，在线即可学习</span></div>
              <div className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400 flex-shrink-0" /><span className="text-gray-300">完全免费，没有任何隐藏收费</span></div>
            </div>
            <p className="text-sm text-gray-400 mb-0">相比下载视频，使用Funlingo在线学习更加方便：不占用存储空间、随时可以访问最新内容、还能利用双语字幕和查词功能提升学习效率。</p>
          </div>

          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <p className="text-lg text-gray-200 mb-6">想用油管视频学外语？试试 Funlingo 免费双语字幕，学习效率翻倍！</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">免费安装 Funlingo <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 常见问题 */}
          <h2 className="text-2xl font-bold text-white mb-6">常见问题</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-6">
              <div>
                <strong className="text-white block mb-2">油管视频怎么下载到手机？</strong>
                <p className="text-sm text-gray-400 mb-0">在手机上下载油管视频，最简单的方法是使用在线工具。用浏览器打开y2mate.com或savefrom.net，粘贴视频链接，选择分辨率后即可下载。Android用户还可以使用Seal或NewPipe等开源App，功能更强大。iOS用户下载后文件会保存在"文件"App中，需要手动转存到相册。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">有没有免费的油管视频下载工具？</strong>
                <p className="text-sm text-gray-400 mb-0">免费工具很多：在线工具如y2mate、savefrom.net、9xbuddy都是免费的；桌面软件中yt-dlp完全免费且开源；浏览器扩展中Video DownloadHelper也有免费版。如果你的目的是学习视频中的外语内容，推荐使用Funlingo免费双语字幕扩展，无需下载视频即可高效学习。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">油管视频下载后是什么格式？</strong>
                <p className="text-sm text-gray-400 mb-0">大部分工具默认下载为MP4格式，这也是兼容性最好的格式。使用yt-dlp时，高分辨率视频可能会下载为WebM格式（VP9编码），你可以通过参数指定输出格式。如果只需要音频，可以选择MP3或AAC格式。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">下载油管视频合法吗？</strong>
                <p className="text-sm text-gray-400 mb-0">从法律角度看，YouTube的服务条款不允许未经授权下载视频。但在很多地区，为个人学习和研究目的下载视频通常被视为合理使用。重要的是不要将下载的视频用于商业目的或重新发布。建议优先使用YouTube Premium的官方离线功能。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">为什么有些工具下载的视频没有声音？</strong>
                <p className="text-sm text-gray-400 mb-0">这是因为YouTube的高分辨率视频（1080P以上）通常将视频和音频分开存储。部分在线工具只下载了视频流。解决方法：使用yt-dlp并指定<code className="text-green-400 bg-black/30 px-1 rounded">-f &quot;bestvideo+bestaudio&quot;</code>参数会自动合并音视频；或者使用4K Video Downloader等桌面软件，它们会自动处理合并。</p>
              </div>
            </div>
          </div>

          {/* 底部CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">用Funlingo看油管视频学外语</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Funlingo 为 YouTube、Netflix 和 Prime Video 提供免费双语字幕，内置查词和词汇本功能，让你边看视频边轻松学语言。</p>
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
