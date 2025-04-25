
import { useState } from "react";
import { Eye, FileText, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  metaDescription?: string;
  onMetaDescriptionChange?: (value: string) => void;
  tags?: string;
  onTagsChange?: (value: string) => void;
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
}: PostEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [editorMode, setEditorMode] = useState<"normal" | "html">("normal");

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
      {/* 제목 영역 */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="포스트 제목을 입력하세요"
                className="mt-2 text-lg font-medium"
              />
            </div>
            <div>
              <Label htmlFor="category">카테고리</Label>
              <div className="h-10 mt-2">
                {/* 카테고리는 PostSettings에서 관리하므로 여기서는 placeholder만 표시 */}
                <div className="h-full border rounded-md bg-muted/30 flex items-center px-3">
                  카테고리 선택
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 에디터 영역 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
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
            
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              {showPreview ? "에디터로 돌아가기" : "미리보기"}
            </Button>
          </div>

          {showPreview ? (
            <div className="min-h-[400px] border rounded-md p-4 bg-white">
              {renderHtmlPreview()}
            </div>
          ) : (
            <Textarea
              id="content"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="min-h-[400px] font-mono text-base leading-relaxed resize-y"
              placeholder={
                editorMode === "normal" 
                  ? "포스트 내용을 작성하세요" 
                  : "<h1>HTML 태그를 사용하여 포스트를 작성하세요</h1>"
              }
            />
          )}
        </CardContent>
      </Card>

      {/* 메타데이터 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <Label htmlFor="metaDescription">메타태그 입력</Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              className="mt-2 resize-none h-[100px]"
              placeholder="검색 엔진을 위한 메타 설명을 입력하세요"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Label htmlFor="tags">태그입력</Label>
            <Textarea
              id="tags"
              value={tags}
              onChange={(e) => onTagsChange(e.target.value)}
              className="mt-2 resize-none h-[100px]"
              placeholder="태그는 쉼표(,)로 구분하여 입력하세요"
            />
          </CardContent>
        </Card>
      </div>

      {/* 미리보기 영역 */}
      <Card>
        <CardContent className="p-6">
          <Label>미리보기</Label>
          <div className="mt-2 min-h-[400px] border rounded-md p-4 bg-white">
            {renderHtmlPreview()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
