
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface PostEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const PostEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: PostEditorProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const renderHtmlPreview = () => {
    return (
      <div 
        className="prose prose-purple max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <Card className="md:col-span-2">
      <CardContent className="p-6">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            <Eye size={16} />
            {showPreview ? "에디터로 돌아가기" : "미리보기"}
          </Button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="포스트 제목을 입력하세요"
              className="text-lg font-medium"
            />
          </div>

          {showPreview ? (
            <div className="min-h-[400px] border rounded-md p-4 bg-white">
              {renderHtmlPreview()}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="content">내용 (HTML 지원)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                className="min-h-[400px] font-mono text-base leading-relaxed resize-y"
                placeholder="포스트 내용을 작성하세요 (HTML 태그 사용 가능)"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
