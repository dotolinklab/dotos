
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

interface PostEditorProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Function to handle image upload from the preview
  const handleImageUploadFromPreview = () => {
    // Save the current selection position
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    if (!range || !selection?.rangeCount) {
      alert("먼저 이미지를 삽입할 위치를 클릭해주세요.");
      return;
    }
    
    // Create an invisible input element for file selection
    const fileInput = fileInputRef.current;
    if (!fileInput) return;
    
    // Add listener to handle the file selection
    const originalOnChange = fileInput.onchange;
    
    fileInput.onchange = async (e: any) => {
      if (!e.target.files?.[0]) return;
      
      // Save the current position
      if (range && selection) {
        // Focus the editor first
        editorRef.current?.focus();
        
        // Restore selection
        selection.removeAllRanges();
        selection.addRange(range.cloneRange());
      }
      
      const file = e.target.files[0];
      // Process file upload using the original handler
      try {
        // Call the original upload handler to get the URL
        await new Promise<void>((resolve) => {
          if (originalOnChange) {
            // @ts-ignore
            originalOnChange.call(fileInput, e);
          }
          
          // After a short delay to allow for upload processing
          setTimeout(() => {
            // Find the most recently added image URL in the content
            // This is a workaround since we don't have direct access to the URL from the upload handler
            const contentLines = content.split('\n');
            const lastImageLineIndex = contentLines.reduce((lastIndex, line, index) => {
              if (line.includes('![') && line.includes('](')) return index;
              return lastIndex;
            }, -1);
            
            if (lastImageLineIndex >= 0) {
              const imageLine = contentLines[lastImageLineIndex];
              const urlMatch = imageLine.match(/\]\((.*?)\)/);
              
              if (urlMatch && urlMatch[1] && selection && range) {
                // Insert image HTML at cursor position
                const imgHtml = `<img src="${urlMatch[1]}" alt="${file.name}" />`;
                
                // Insert at cursor position
                const docFragment = document.createRange().createContextualFragment(imgHtml);
                range.deleteContents();
                range.insertNode(docFragment);
                
                // Move cursor after insertion
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                
                // Get the new HTML content from editor
                if (editorRef.current) {
                  const newContent = editorRef.current.innerHTML;
                  const event = {
                    target: { value: newContent }
                  } as React.ChangeEvent<HTMLTextAreaElement>;
                  onContentChange(event);
                }
                
                // Remove the last image line that was added to the textarea
                contentLines.splice(lastImageLineIndex, 1);
                const updatedContent = contentLines.join('\n');
                const cleanupEvent = {
                  target: { value: updatedContent }
                } as React.ChangeEvent<HTMLTextAreaElement>;
                onContentChange(cleanupEvent);
              }
            }
            
            resolve();
          }, 500);
        });
      } catch (error) {
        console.error("Error inserting image:", error);
      }
      
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
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="mr-2" />
          이미지 추가
        </Button>
        <input
          type="file"
          id="content-image"
          ref={fileInputRef}
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
          <ScrollArea className="h-[400px]" type="always">
            <div 
              ref={editorRef}
              className="p-4 min-h-[400px] prose prose-purple max-w-none bg-white"
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
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
