import { useState, useRef } from "react";
import { Eye, FileText, Code, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupabaseStorage } from "@/hooks/useSupabaseStorage";
import { toast } from "sonner";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface PostEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  metaDescription?: string;
  onMetaDescriptionChange?: (value: string) => void;
  tags?: string;
  onTagsChange?: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  thumbnailPreview: string;
  onThumbnailChange: (file: File) => void;
  onThumbnailRemove: () => void;
}

export const PostEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  metaDescription = "",
  onMetaDescriptionChange = () => {},
  tags = "",
  onTagsChange = () => {},
  category,
  onCategoryChange,
  thumbnailPreview,
  onThumbnailChange,
  onThumbnailRemove
}: PostEditorProps) => {
  const [editorMode, setEditorMode] = useState<"normal" | "html">("normal");
  const [showPreview, setShowPreview] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { uploadFile } = useSupabaseStorage('blog-images');

  const handleContentChange = (value: string) => {
    if (editorMode === "html") {
      onContentChange(value);
    } else {
      const htmlContent = value
        .split('\n')
        .map(line => `<p>${line}</p>`)
        .join('');
      onContentChange(htmlContent);
    }
  };

  const insertImageIntoContent = async (file: File) => {
    try {
      const publicUrl = await uploadFile(file);
      if (!publicUrl || !textAreaRef.current) return;

      const imageHtml = `\n<img src="${publicUrl}" alt="Blog content image" class="max-w-full h-auto my-4" />\n`;
      
      const cursorPosition = textAreaRef.current.selectionStart;
      const textBeforeCursor = textAreaRef.current.value.substring(0, cursorPosition);
      const textAfterCursor = textAreaRef.current.value.substring(cursorPosition);
      
      const newContent = textBeforeCursor + imageHtml + textAfterCursor;
      onContentChange(newContent);
      
      toast.success("이미지가 성공적으로 삽입되었습니다!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      insertImageIntoContent(file);
    }
  };

  const renderHtmlPreview = () => {
    return (
      <div 
        className="prose prose-purple max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <Label>카테고리</Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI 소식">AI 소식</SelectItem>
                <SelectItem value="부업하기">부업하기</SelectItem>
                <SelectItem value="렌탈솔루션">렌탈솔루션</SelectItem>
                <SelectItem value="배움터">배움터</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Label>메타태그 입력</Label>
            <Textarea
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              placeholder="검색 엔진을 위한 메타 설명을 입력하세요"
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <Card>
            <CardContent className="p-6">
              <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="포스트 제목을 입력하세요"
                className="text-lg font-medium mb-4"
              />

              <div className="flex justify-between items-center mb-4">
                <Tabs 
                  defaultValue={editorMode} 
                  value={editorMode}
                  onValueChange={(value) => setEditorMode(value as "normal" | "html")}
                  className="w-[200px]"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="normal" className="flex items-center gap-2">
                      <FileText size={16} />
                      일반
                    </TabsTrigger>
                    <TabsTrigger value="html" className="flex items-center gap-2">
                      <Code size={16} />
                      HTML
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {editorMode === "html" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="content-image-upload"
                    />
                    <label htmlFor="content-image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        asChild
                      >
                        <span>
                          <Image size={16} />
                          이미지 삽입
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              <Textarea
                ref={textAreaRef}
                value={editorMode === "html" ? content : content.replace(/<[^>]*>/g, '')}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[400px] font-mono text-base leading-relaxed resize-y"
                placeholder={
                  editorMode === "normal" 
                    ? "포스트 내용을 작성하세요" 
                    : "<h1>HTML 태그를 사용하여 포스트를 작성하세요</h1>"
                }
              />
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={40}>
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-purple max-w-none">
                {renderHtmlPreview()}
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <Label>대표 이미지</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4">
              {thumbnailPreview ? (
                <div className="space-y-4">
                  <img 
                    src={thumbnailPreview} 
                    alt="업로드된 이미지"
                    className="w-full aspect-video object-cover rounded"
                  />
                  <Button 
                    variant="outline" 
                    onClick={onThumbnailRemove}
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
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onThumbnailChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <Upload className="text-gray-400" size={32} />
                  <p className="text-sm text-gray-500">이미지를 업로드하세요</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF (최대 5MB)</p>
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Label>태그입력</Label>
            <Textarea
              value={tags}
              onChange={(e) => onTagsChange(e.target.value)}
              placeholder="태그는 쉼표(,)로 구분하여 입력하세요"
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
