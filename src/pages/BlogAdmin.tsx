
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, FileText, Pencil, Settings } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import PostManagement from '@/components/admin/PostManagement';
import WritePost from '@/components/admin/WritePost';
import BlogSettings from '@/components/admin/BlogSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
  status: string;
}

const BlogAdmin = () => {
  const [categories, setCategories] = useState(['AI 소식', '부업하기', '렌탈솔루션', '배움터']);
  const [activeTab, setActiveTab] = useState('dashboard');
  const isMobile = useIsMobile();

  // Use react-query for data fetching
  const { 
    data: posts, 
    isLoading, 
    refetch 
  } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, category, created_at, status')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('포스트를 불러오는 중 오류가 발생했습니다.');
        return [];
      }
    }
  });

  // Convert Supabase posts to the format expected by components
  const formattedPosts = (posts || []).map(post => ({
    id: post.id,
    title: post.title,
    category: post.category,
    date: post.created_at,
    status: post.status
  }));

  // Handle post deletion or update success
  const handlePostChange = () => {
    refetch();
    toast.success('포스트가 업데이트되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 flex items-center gap-4">
            <Pencil className="w-6 h-6 md:w-8 md:h-8" />
            블로그 관리
          </h1>
          <p className="text-base md:text-lg text-purple-100 max-w-2xl mb-4 md:mb-8">
            새로운 블로그 포스트를 작성하고 관리하세요
          </p>
        </div>
      </section>

      <section className="py-6 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 md:mb-8 bg-white border shadow-sm">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                {!isMobile && "대시보드"}
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {!isMobile && "포스트 관리"}
              </TabsTrigger>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                {!isMobile && "글쓰기"}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {!isMobile && "설정"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard 
                categories={categories} 
                posts={formattedPosts}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="posts">
              <PostManagement 
                categories={categories} 
                onSuccess={handlePostChange}
              />
            </TabsContent>

            <TabsContent value="write">
              <WritePost 
                categories={categories} 
                onSuccess={handlePostChange}
              />
            </TabsContent>

            <TabsContent value="settings">
              <BlogSettings 
                categories={categories} 
                setCategories={setCategories}
                posts={formattedPosts}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;
