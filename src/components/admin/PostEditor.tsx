
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostEditorProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Function to handle image upload from the preview
  const handleImageUploadFromPreview = () => {
    // Save the current selection position
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    // Create an invisible input element for file selection
    const fileInput = document.getElementById('content-image') as HTMLInputElement;
    
    // Add listener to handle the file selection
    const originalOnChange = fileInput.onchange;
    
    fileInput.onchange = async (e) => {
      // Call the original onImageUpload handler
      if (originalOnChange && e) {
        originalOnChange.call(fileInput, e);
      }
      
      // Wait a bit for the image URL to be processed
      setTimeout(() => {
        if (editorRef.current && range) {
          // Restore the selection
          const newSelection = window.getSelection();
          if (newSelection) {
            newSelection.removeAllRanges();
            newSelection.addRange(range);
          }
        }
      }, 100);
      
      // Reset the onchange to the original handler
      fileInput.onchange = originalOnChange as any;
    };
    
    // Trigger the file input click
    fileInput.click();
  };

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
      
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="write">작성</TabsTrigger>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <div className="space-y-2">
            <div className="bg-muted p-2 rounded-md text-sm mb-2">
              <p>✨ HTML과 마크다운을 지원합니다:</p>
              <ul className="list-disc pl-4 text-xs space-y-1">
                <li>마크다운: **굵게**, *기울임*, # 제목</li>
                <li>HTML: &lt;strong&gt;, &lt;em&gt;, &lt;h1&gt;</li>
                <li>복잡한 HTML은 미리보기에서 확인해주세요</li>
                <li>이미지는 상단의 이미지 추가 버튼을 이용해주세요</li>
              </ul>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={onContentChange}
              placeholder="마크다운과 HTML을 지원합니다. 이미지는 상단의 이미지 추가 버튼을 이용해주세요."
              className="min-h-[400px] font-mono text-sm"
              required
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="relative">
          <div className="sticky top-0 z-10 flex justify-end p-2 bg-white/80 backdrop-blur-sm border-b">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-white"
              onClick={handleImageUploadFromPreview}
            >
              <Image className="mr-2 h-4 w-4" />
              이미지 추가
            </Button>
          </div>
          <div 
            ref={editorRef}
            className="border rounded-md p-4 min-h-[400px] overflow-y-auto prose prose-purple max-w-none bg-white"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const newContent = e.currentTarget.innerHTML;
              const event = {
                target: { value: newContent }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onContentChange(event);
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
