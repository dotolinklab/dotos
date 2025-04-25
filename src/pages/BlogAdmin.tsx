
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
import { Image, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseStorage } from "@/hooks/useSupabaseStorage";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const { uploadFile } = useSupabaseStorage('blog-images');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      const publicUrl = await uploadFile(file);
      if (publicUrl) {
        setImageUrl(publicUrl);
        toast.success("이미지가 업로드되었습니다!");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

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
        excerpt: content.substring(0, 150) + '...',
        thumbnail_url: imageUrl
      });

      if (error) throw error;

      toast.success("포스트가 저장되었습니다!");
      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl(null);
    } catch (error) {
      console.error('Error inserting post:', error);
      toast.error("포스트 저장에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="max-w-[1200px] py-8 px-8">
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
                  <div className="space-y-2 w-full">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="포스트 제목을 입력하세요"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[400px] w-full"
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
                    {imageUrl ? (
                      <div className="space-y-4">
                        <img 
                          src={imageUrl} 
                          alt="업로드된 이미지"
                          className="mx-auto max-h-40 rounded"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setImageUrl(null)}
                          className="w-full"
                        >
                          이미지 제거
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        <Upload className="text-gray-400" size={32} />
                        <p className="text-sm text-gray-500">
                          {uploading ? "업로드 중..." : "이미지를 업로드하세요"}
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, GIF (최대 5MB)
                        </p>
                      </label>
                    )}
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
