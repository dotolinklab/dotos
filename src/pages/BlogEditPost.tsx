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
import { useParams } from "react-router-dom";
import { Upload, Trash2 } from "lucide-react";
import { usePostEdit } from "@/hooks/usePostEdit";

const BlogEditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  
  if (!postId) {
    return <div>포스트 ID가 필요합니다.</div>;
  }

  const {
    title,
    setTitle,
    content,
    setContent,
    selectedCategory,
    setSelectedCategory,
    thumbnailPreview,
    setThumbnail,
    setThumbnailPreview,
    isLoading,
    isSubmitting,
    handleSubmit
  } = usePostEdit({
    postId,
    onSuccess: () => {}
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <main className="flex-1 ml-60">
          <div className="max-w-[1200px] py-8 px-8">
            <div className="text-center py-12">
              <p>포스트를 불러오는 중...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="max-w-[1200px] py-8 px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-800">포스트 수정</h1>
            <Button
              type="submit"
              form="post-edit-form"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "변경사항 저장하기"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <form id="post-edit-form" onSubmit={handleSubmit} className="space-y-6">
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                    {thumbnailPreview ? (
                      <div className="space-y-4">
                        <img 
                          src={thumbnailPreview} 
                          alt="업로드된 이미지"
                          className="mx-auto max-h-40 rounded"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setThumbnailPreview("")}
                          className="w-full"
                        >
                          <Trash2 size={16} className="mr-2" />
                          이미지 제거
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setThumbnail(e.target.files[0]);
                              setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                          className="hidden"
                        />
                        <Upload className="text-gray-400" size={32} />
                        <p className="text-sm text-gray-500">
                          이미지를 업로드하세요
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

export default BlogEditPost;
