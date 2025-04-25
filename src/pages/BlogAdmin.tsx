
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }
    // Here we would typically save to a backend
    toast.success("포스트가 저장되었습니다!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container max-w-4xl mx-auto pt-32 pb-20 px-4">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">새 글 작성하기</h1>
        
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg text-purple-900">
                  제목
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-lg"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-lg text-purple-900">
                  내용
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] text-base"
                  placeholder="내용을 입력하세요"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6"
                  onClick={() => {
                    setTitle("");
                    setContent("");
                  }}
                >
                  초기화
                </Button>
                <Button type="submit" className="px-6 bg-purple-600 hover:bg-purple-700">
                  발행하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogAdmin;
