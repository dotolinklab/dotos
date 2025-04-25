
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Pencil } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import EditPost from '@/components/admin/EditPost';
import { useParams } from 'react-router-dom';

const EditBlogPost = () => {
  const [categories, setCategories] = useState(['AI 소식', '부업하기', '렌탈솔루션', '배움터']);
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center gap-4">
            <Pencil className="w-8 h-8" />
            블로그 포스트 수정
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mb-8">
            기존 블로그 포스트를 수정하세요
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="edit" className="w-full">
            <TabsContent value="edit">
              <EditPost categories={categories} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default EditBlogPost;
