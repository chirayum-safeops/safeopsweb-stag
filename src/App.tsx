import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Learn from "./pages/Learn";
import LearnPage from "./pages/LearnPage";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { usePageTracking } from "./hooks/usePageTracking";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/learn/:slug" element={<LearnPage />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
