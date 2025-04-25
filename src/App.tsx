
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AiNews from "./pages/AiNews";
import SideHustles from "./pages/SideHustles";
import RentalSolution from "./pages/RentalSolution";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
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
          <Route path="/ai-news/:postId" element={<PostDetail />} />
          <Route path="/side-hustles" element={<SideHustles />} />
          <Route path="/side-hustles/:postId" element={<PostDetail />} />
          <Route path="/rental" element={<RentalSolution />} />
          <Route path="/rental/:postId" element={<PostDetail />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:postId" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
