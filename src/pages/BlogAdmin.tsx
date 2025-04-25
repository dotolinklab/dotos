
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

const BlogAdmin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we'll add the blog post submission logic later
    toast.success('블로그 포스트가 저장되었습니다.');
    setTitle('');
    setContent('');
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="블로그 포스트 제목을 입력하세요"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="블로그 내용을 입력하세요"
                  className="min-h-[400px] text-base"
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setTitle('');
                    setContent('');
                  }}
                >
                  초기화
                </Button>
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
                  포스트 저장하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;
