"use client";

import * as React from "react";
import Navbar from "@/sections/navbar";
import { FooterSection } from "@/sections/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, Download, ArrowRight, Monitor, Smartphone, Globe, Check, X } from "lucide-react";

export default function TwitterVideoDownloadZhContent() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar currentPage="/blog" />
      <section className="relative w-full py-16 lg:py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 text-center lg:text-left">
          <Badge className="w-fit mx-auto lg:mx-0 bg-[rgba(198,66,252,0.1)] text-[#C642FC] border-[#C642FC]/20 px-3 py-1">中文教程</Badge>
          <h1 className="font-heading-h1 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">推特视频下载 — 3种免费保存方法 (2026)</h1>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 2026年3月21日</div>
            <div className="flex items-center gap-1"><User className="w-4 h-4" /> Funlingo 团队</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 分钟阅读</div>
          </div>
        </div>
      </section>

      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">

          <p className="lead text-xl leading-relaxed text-gray-200 mb-6">推特（现已更名为X）是全球最受欢迎的社交媒体平台之一，每天都有大量有趣的视频内容在上面传播。然而，推特官方并不提供直接的视频下载功能。本文将详细介绍3种完全免费的推特视频下载方法，帮助你轻松保存喜欢的视频内容。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">为什么需要下载推特视频？</h2>
          <p className="text-gray-300 mb-4">在日常使用推特的过程中，我们经常会遇到想要保存视频的场景：</p>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">离线观看：</strong>在没有网络的环境下（如飞机、地铁）也能观看喜欢的推特视频内容。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">内容备份：</strong>博主可能随时删除推文，提前保存可以防止喜欢的内容丢失。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">学习素材：</strong>将外语视频保存下来，反复观看学习发音和表达方式。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">分享到其他平台：</strong>将有价值的视频内容保存后分享到微信、微博等国内平台。</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法一 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法一：在线下载工具（最简单）</h2>
          <p className="text-gray-300 mb-6">在线推特视频下载工具是最简单快捷的方式，无需安装任何软件，只需要复制视频链接即可下载。以下是三款最好用的在线工具：</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">1</div>
                <div>
                  <strong className="text-white block mb-1">SaveTweetVid</strong>
                  <p className="text-sm text-gray-400 mb-2">SaveTweetVid 是目前最受欢迎的推特视频下载工具之一。界面简洁，操作简单，支持多种清晰度选择。</p>
                  <div className="text-sm text-gray-400">
                    <strong className="text-gray-300">使用步骤：</strong>打开推特视频 → 点击分享按钮 → 选择"复制链接" → 粘贴到 SaveTweetVid 网站 → 点击下载 → 选择清晰度（720p/1080p）→ 保存视频。
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">2</div>
                <div>
                  <strong className="text-white block mb-1">TWDown</strong>
                  <p className="text-sm text-gray-400 mb-2">TWDown 专注于推特视频下载，速度快且稳定。支持下载高清视频，也支持下载 GIF 动图。</p>
                  <div className="text-sm text-gray-400">
                    <strong className="text-gray-300">优势：</strong>下载速度快，支持批量下载，提供视频和音频分离下载选项，适合需要提取音频的用户。
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold">3</div>
                <div>
                  <strong className="text-white block mb-1">ssstwitter</strong>
                  <p className="text-sm text-gray-400 mb-2">ssstwitter 是另一款广受好评的在线工具，界面极其简洁，支持无水印高清下载。</p>
                  <div className="text-sm text-gray-400">
                    <strong className="text-gray-300">特色功能：</strong>支持无水印下载，提供MP4和WebM两种格式选择，加载速度极快，无需注册即可使用。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20 mb-8">
            <p className="text-sm text-yellow-200 mb-0"><strong>小提示：</strong>使用在线工具时，建议使用Chrome或Edge浏览器以获得最佳兼容性。部分工具可能包含广告弹窗，请注意不要误点。</p>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法二 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法二：浏览器扩展（最方便）</h2>
          <p className="text-gray-300 mb-6">如果你经常需要下载推特视频，安装一个浏览器扩展会更加方便。扩展会在推特视频旁边自动添加下载按钮，一键即可保存。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Monitor className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Video DownloadHelper</h3>
              <p className="text-sm text-gray-400">最老牌的视频下载扩展之一，支持Chrome和Firefox。可以检测页面上的所有视频并提供下载选项，支持多种清晰度和格式。</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">免费</Badge>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Chrome</Badge>
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs">Firefox</Badge>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Download className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Twitter Video Downloader</h3>
              <p className="text-sm text-gray-400">专门为推特设计的视频下载扩展，安装后会在每条包含视频的推文下方显示下载按钮，操作极其便捷。</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">免费</Badge>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Chrome</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-gray-300 mb-2"><strong className="text-white">安装和使用步骤：</strong></p>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold text-sm">1</div>
              <p className="text-sm text-gray-300 mb-0">打开 Chrome 网上应用店，搜索对应的扩展名称。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold text-sm">2</div>
              <p className="text-sm text-gray-300 mb-0">点击"添加至 Chrome"按钮完成安装。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold text-sm">3</div>
              <p className="text-sm text-gray-300 mb-0">打开推特，找到想下载的视频，点击扩展显示的下载按钮。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C642FC]/20 flex items-center justify-center text-[#C642FC] font-bold text-sm">4</div>
              <p className="text-sm text-gray-300 mb-0">选择视频清晰度（通常有360p、720p、1080p可选），确认下载即可。</p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 方法三 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">方法三：yt-dlp 命令行工具（最强大）</h2>
          <p className="text-gray-300 mb-6">yt-dlp 是一款开源的命令行视频下载工具，功能极其强大，支持包括推特在内的上千个网站。虽然需要一定的技术基础，但下载速度快且可定制性强。</p>

          <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-6">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white block mb-2">安装方法</strong>
                <p className="text-sm text-gray-400 mb-2">Windows 用户：使用 <code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">winget install yt-dlp</code> 或从 GitHub 下载可执行文件。</p>
                <p className="text-sm text-gray-400 mb-2">macOS 用户：使用 <code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">brew install yt-dlp</code> 安装。</p>
                <p className="text-sm text-gray-400 mb-0">Linux 用户：使用 <code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">sudo apt install yt-dlp</code> 或 pip 安装。</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-5 rounded-xl border border-white/10 mb-8">
            <div className="flex items-start gap-3">
              <Monitor className="w-5 h-5 text-[#C642FC] flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white block mb-2">常用命令</strong>
                <p className="text-sm text-gray-400 mb-2">基本下载：<code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">yt-dlp https://x.com/用户名/status/推文ID</code></p>
                <p className="text-sm text-gray-400 mb-2">指定最高画质：<code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">yt-dlp -f best https://x.com/...</code></p>
                <p className="text-sm text-gray-400 mb-2">仅下载音频：<code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">yt-dlp -x --audio-format mp3 https://x.com/...</code></p>
                <p className="text-sm text-gray-400 mb-0">指定输出文件名：<code className="bg-white/10 px-2 py-0.5 rounded text-gray-200">{"yt-dlp -o '%(title)s.%(ext)s' https://x.com/..."}</code></p>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 三种方法对比表 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">三种方法对比</h2>
          <p className="text-gray-300 mb-6">根据你的使用场景和技术水平，可以选择最适合的方法：</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-white font-bold">对比项</th>
                  <th className="py-3 px-4 text-white font-bold">在线工具</th>
                  <th className="py-3 px-4 text-white font-bold">浏览器扩展</th>
                  <th className="py-3 px-4 text-white font-bold">yt-dlp</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">操作难度</td>
                  <td className="py-3 px-4"><span className="text-green-400">极简单</span></td>
                  <td className="py-3 px-4"><span className="text-green-400">简单</span></td>
                  <td className="py-3 px-4"><span className="text-yellow-400">需技术基础</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">是否需安装</td>
                  <td className="py-3 px-4"><span className="text-green-400">否</span></td>
                  <td className="py-3 px-4"><span className="text-yellow-400">需安装扩展</span></td>
                  <td className="py-3 px-4"><span className="text-yellow-400">需安装软件</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">下载速度</td>
                  <td className="py-3 px-4">中等</td>
                  <td className="py-3 px-4">较快</td>
                  <td className="py-3 px-4"><span className="text-green-400">最快</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">画质选择</td>
                  <td className="py-3 px-4">720p/1080p</td>
                  <td className="py-3 px-4">多种可选</td>
                  <td className="py-3 px-4"><span className="text-green-400">完全自定义</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">批量下载</td>
                  <td className="py-3 px-4"><span className="text-red-400">不支持</span></td>
                  <td className="py-3 px-4"><span className="text-yellow-400">部分支持</span></td>
                  <td className="py-3 px-4"><span className="text-green-400">完全支持</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">手机端支持</td>
                  <td className="py-3 px-4"><span className="text-green-400">支持</span></td>
                  <td className="py-3 px-4"><span className="text-red-400">不支持</span></td>
                  <td className="py-3 px-4"><span className="text-red-400">不支持</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">费用</td>
                  <td className="py-3 px-4"><span className="text-green-400">免费</span></td>
                  <td className="py-3 px-4"><span className="text-green-400">免费</span></td>
                  <td className="py-3 px-4"><span className="text-green-400">免费开源</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 手机端下载 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">手机端下载推特视频方案</h2>
          <p className="text-gray-300 mb-6">在手机上下载推特视频同样很简单，iOS 和 Android 系统各有不同的操作方式。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Smartphone className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">iOS (iPhone/iPad)</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="mb-1">1. 在推特App中复制视频链接</p>
                <p className="mb-1">2. 在Safari中打开SaveTweetVid网站</p>
                <p className="mb-1">3. 粘贴链接并点击下载</p>
                <p className="mb-1">4. 视频会先保存到"文件"App</p>
                <p className="mb-0">5. 从"文件"中将视频保存到相册</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <p className="text-xs text-yellow-200 mb-0"><strong>注意：</strong>iOS 系统下载的视频可能不会直接出现在相册中，需要手动从"文件"App转存。</p>
              </div>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <Smartphone className="w-8 h-8 text-[#C642FC] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Android</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="mb-1">1. 在推特App中复制视频链接</p>
                <p className="mb-1">2. 在浏览器中打开TWDown网站</p>
                <p className="mb-1">3. 粘贴链接并点击下载</p>
                <p className="mb-1">4. 选择视频清晰度</p>
                <p className="mb-0">5. 视频自动保存到"下载"文件夹</p>
              </div>
              <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs text-green-200 mb-0"><strong>提示：</strong>Android 系统操作更简单，下载的视频会自动出现在图库中，无需额外操作。</p>
              </div>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 注意事项 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">注意事项和版权提醒</h2>
          <p className="text-gray-300 mb-6">在下载和使用推特视频时，请务必注意以下几点：</p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">尊重版权：</strong>下载的视频仅供个人学习和欣赏使用，未经原作者授权，请勿将视频用于商业用途或二次传播。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">避免侵权转载：</strong>将他人的推特视频下载后以自己的名义发布到其他平台，可能构成侵权行为，请务必标注原作者和来源。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">安全下载：</strong>请使用本文推荐的工具，避免使用来路不明的下载网站，以防恶意软件和隐私泄露风险。</p>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300 mb-0"><strong className="text-white">遵守平台规则：</strong>推特的服务条款对视频下载有相关规定，大量批量下载可能导致账号受限，请适度使用。</p>
            </div>
          </div>

          {/* Funlingo推荐 */}
          <div className="text-center py-8 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Funlingo 推荐：在线学习更高效</h2>
            <p className="text-lg text-gray-200 mb-4">与其下载视频离线观看，不如直接在线用双语字幕学习效果更好！</p>
            <p className="text-sm text-gray-400 mb-6">Funlingo 是一款完全免费的Chrome双语字幕扩展，支持 Netflix、YouTube 和 Prime Video。观看推特博主推荐的外语影视内容时，开启双语字幕，边看边学，语言能力自然提升。还提供点击查词、词汇本等实用功能，让你的观影时间变成高效的语言学习时间。</p>
            <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" target="_blank" rel="noopener noreferrer" className="no-underline">
              <Button className="bg-[linear-gradient(135deg,#7A1CAC_0%,#C642FC_100%)] h-12 px-8 rounded-full hover:scale-105 transition-transform duration-300 text-base shadow-lg shadow-purple-500/20">免费安装 Funlingo <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </a>
          </div>

          <hr className="border-white/10 my-12" />

          {/* 常见问题 */}
          <h2 className="text-2xl font-bold text-white mb-6">常见问题</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-12">
            <div className="space-y-6">
              <div>
                <strong className="text-white block mb-2">推特视频可以免费下载吗？</strong>
                <p className="text-sm text-gray-400 mb-0">可以。本文介绍的3种方法都是完全免费的，包括在线下载工具（如SaveTweetVid、TWDown、ssstwitter）、浏览器扩展和yt-dlp命令行工具。绝大多数情况下无需注册或付费，即可高清无水印下载推特视频。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">下载推特视频违法吗？</strong>
                <p className="text-sm text-gray-400 mb-0">仅供个人欣赏和学习使用通常不违法，但将下载的视频用于商业目的或未经授权进行二次传播可能侵犯原作者的版权。建议下载前确认视频的版权许可，并在分享时标注来源。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">为什么有些推特视频无法下载？</strong>
                <p className="text-sm text-gray-400 mb-0">部分推特视频可能因为以下原因无法下载：账号设置为私密、视频所在推文已被删除、或视频受到地区限制。此外，推特直播视频在直播结束前通常无法下载。建议尝试不同的下载工具，或等待直播结束后再下载。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">如何下载最高画质的推特视频？</strong>
                <p className="text-sm text-gray-400 mb-0">在线工具通常会自动提供可用的最高画质选项（1080p或720p）。如果需要最高画质，推荐使用yt-dlp命令行工具，输入 <code className="bg-white/10 px-1.5 py-0.5 rounded text-gray-200">yt-dlp -f best 视频链接</code> 即可下载最高画质的版本。浏览器扩展一般也支持选择不同清晰度。</p>
              </div>
              <div>
                <strong className="text-white block mb-2">想要学习推特上的外语视频内容，有什么好工具？</strong>
                <p className="text-sm text-gray-400 mb-0">如果你想通过观看外语视频来学习语言，推荐使用 <a href="https://chromewebstore.google.com/detail/funlingo-dual-subtitles-f/gjdpaicenfffjkgofmcjikilokigkonj?authuser=3&hl=en" className="text-[#C642FC] hover:underline">Funlingo</a> 双语字幕扩展。它完全免费，支持在Netflix、YouTube和Prime Video上显示双语字幕，帮助你更高效地学习外语。配合点击查词和词汇本功能，让每次观影都成为学习机会。</p>
              </div>
            </div>
          </div>

          {/* 底部CTA */}
          <div className="mt-20 text-center py-12 px-6 rounded-2xl bg-[rgba(198,66,252,0.05)] border border-[#C642FC]/20">
            <h2 className="text-3xl font-bold text-white mb-4">免费获取影视双语字幕</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">Funlingo 提供 Netflix、YouTube 和 Prime Video 的免费双语字幕，内置词汇本功能，完全免费使用。</p>
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
