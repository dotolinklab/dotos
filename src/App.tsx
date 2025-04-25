
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
import BlogAdmin from "./pages/BlogAdmin";
import BlogPostsList from "./pages/BlogPostsList";
import BlogEditPost from "./pages/BlogEditPost";
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
          <Route path="/admin/blog" element={<BlogAdmin />} />
          <Route path="/admin/blog/posts" element={<BlogPostsList />} />
          <Route path="/admin/blog/edit/:postId" element={<BlogEditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
