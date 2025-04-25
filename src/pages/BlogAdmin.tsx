
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, FileText, Pencil, Settings } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import PostManagement from '@/components/admin/PostManagement';
import WritePost from '@/components/admin/WritePost';
import BlogSettings from '@/components/admin/BlogSettings';

const BlogAdmin = () => {
  const [categories, setCategories] = useState(['AI 소식', '부업하기', '렌탈솔루션', '배움터']);
  const [posts] = useState([
    { id: 1, title: 'ChatGPT-5 출시', category: 'AI 소식', date: '2025-04-21', status: '게시됨' },
    { id: 2, title: '2025년 가장 수익성 높은 온라인 부업 TOP 5', category: '부업하기', date: '2025-04-18', status: '게시됨' },
    { id: 3, title: '비개발자를 위한 AI 활용법: 기초 가이드', category: '배움터', date: '2025-04-15', status: '게시됨' },
    { id: 4, title: '임시 저장된 글', category: '렌탈솔루션', date: '2025-04-22', status: '임시저장' },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center gap-4">
            <Pencil className="w-8 h-8" />
            블로그 관리
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mb-8">
            새로운 블로그 포스트를 작성하고 관리하세요
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-8 bg-purple-50">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                대시보드
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                포스트 관리
              </TabsTrigger>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                글쓰기
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                설정
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard posts={posts} categories={categories} />
            </TabsContent>

            <TabsContent value="posts">
              <PostManagement categories={categories} />
            </TabsContent>

            <TabsContent value="write">
              <WritePost categories={categories} />
            </TabsContent>

            <TabsContent value="settings">
              <BlogSettings 
                categories={categories} 
                setCategories={setCategories}
                posts={posts}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;
