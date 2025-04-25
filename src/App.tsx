
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AiNews from "./pages/AiNews";
import SideHustles from "./pages/SideHustles";
import RentalSolution from "./pages/RentalSolution";
import Learning from "./pages/Learning";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-news" element={<AiNews />} />
          <Route path="/side-hustles" element={<SideHustles />} />
          <Route path="/rental" element={<RentalSolution />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
