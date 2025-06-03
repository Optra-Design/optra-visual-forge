
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { AuthProvider } from "./contexts/AuthContext";

// Eagerly loaded components
import Navigation from "./components/Navigation";
import BackgroundParticles from "./components/BackgroundParticles";
import SudoMode from "./components/SudoMode";
import DynamicGradients from "./components/DynamicGradients";
import EasterEggs from "./components/EasterEggs";

// Lazily loaded components for better performance
const OptraBot = lazy(() => import("./components/OptraBot"));
const FounderChat = lazy(() => import("./components/FounderChat"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Lab = lazy(() => import("./pages/Lab"));
const Pulse = lazy(() => import("./pages/Pulse"));
const Founder = lazy(() => import("./pages/Founder"));
const Blog = lazy(() => import("./pages/Blog"));
const Test404 = lazy(() => import("./pages/Test404"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen bg-background overflow-hidden">
            <DynamicGradients />
            <BackgroundParticles />
            <EasterEggs />
            <Navigation />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/lab" element={<Lab />} />
                <Route path="/pulse" element={<Pulse />} />
                <Route path="/founder" element={<Founder />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/test-404" element={<Test404 />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Suspense fallback={null}>
              <OptraBot />
            </Suspense>
            <Suspense fallback={null}>
              <FounderChat />
            </Suspense>
            <SudoMode />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
