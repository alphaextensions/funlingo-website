import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";

import { HomeDesktop } from "./pages/HomeDesktop";
// import { Pricing } from "./pages/Pricing";
import { Roadmap } from "./pages/Roadmap";
import { Feedback } from "./pages/Feedback";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Support } from "./pages/Support";

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
      <Route path="/support" component = {Support}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
