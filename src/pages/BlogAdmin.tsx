
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    try {
      const { error } = await supabase.from('blog_posts').insert({
        title,
        content,
        category,
        author: '관리자',
        excerpt: content.substring(0, 150) + '...'
      });

      if (error) throw error;

      toast.success("포스트가 저장되었습니다!");
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error('Error inserting post:', error);
      toast.error("포스트 저장에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-800">블로그 포스트 작성</h1>
            <Button
              type="submit"
              form="post-form"
              className="bg-purple-600 hover:bg-purple-700"
            >
              작성하기
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="포스트 제목을 입력하세요"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[400px]"
                      placeholder="포스트 내용을 작성하세요 (마크다운 지원)"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>카테고리</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI 소식">AI 소식</SelectItem>
                      <SelectItem value="부업하기">부업하기</SelectItem>
                      <SelectItem value="렌탈솔루션">렌탈솔루션</SelectItem>
                      <SelectItem value="배움터">배움터</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>대표 이미지</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Image className="text-gray-400" size={32} />
                      <p className="text-sm text-gray-500">
                        이미지를 업로드하세요
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF (최대 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogAdmin;

