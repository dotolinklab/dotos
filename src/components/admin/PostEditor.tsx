
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from 'lucide-react';

interface PostEditorProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="content">내용</Label>
      <div className="flex items-center gap-4 mb-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('content-image')?.click()}
        >
          <Image className="mr-2" />
          이미지 추가
        </Button>
        <input
          type="file"
          id="content-image"
          accept="image/*"
          className="hidden"
          onChange={onImageUpload}
        />
      </div>
      <Textarea
        id="content"
        value={content}
        onChange={onContentChange}
        placeholder="블로그 내용을 입력하세요"
        className="min-h-[400px] text-base"
        required
      />
    </div>
  );
};

export default PostEditor;
