
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/not-found";
import { ReadingModeBlogPost } from "./Blogs/ReadingModeBlogPost";
import { HomeDesktop } from "./pages/HomeDesktop";
// import { Pricing } from "./pages/Pricing";
import { Roadmap } from "./pages/Roadmap";
import { Feedback } from "./pages/Feedback";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Support } from "./pages/Support";
import { BlogPost } from "./pages/BlogPost";
import { BlogIndex } from "./pages/BlogIndex";
import { ComparePage } from "./pages/ComparePage";
import { BestAIToolsPost } from "./Blogs/BestAIToolsPost";
import { ReadingModeBlog2 } from "./Blogs/ReadingModeBlog2";
import { LearnLanguageByWatchingPost } from "./Blogs/LearnLanguageByWatchingPost";
import { WebsiteTranslationPost } from "./Blogs/WebsiteTranslationPost";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={HomeDesktop} />
      {/* <Route path="/pricing" component={Pricing} /> */}
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/support" component={Support} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/best-ai-language-learning-tools-2026" component={BlogPost} />
      <Route path="/compare/funlingo-vs-trancy-vs-immersive-translate" component={ComparePage} />
      <Route path="/blog/language-learning-tips-and-ai-insights" component={BestAIToolsPost} />
      <Route path="/blog/reading-mode-bilingual-captions" component={ReadingModeBlogPost} />
      <Route path="/blog/how-to-learn-languages-with-reading-mode" component={ReadingModeBlog2} />
      <Route path="/blog/how-to-learn-a-language-by-watching" component={LearnLanguageByWatchingPost} />
      <Route path="/blog/website-translation-language-learning" component={WebsiteTranslationPost} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
