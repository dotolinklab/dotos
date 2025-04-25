
import React, { useRef, useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState("write");
  
  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // If switching to preview, sync the content to the preview div
    if (value === "preview" && editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  };
  
  // Function to handle image upload
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Function to handle image upload and insertion at cursor position
  const handleImageInsertAtCursor = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // First, process the file upload using the provided handler
    await onImageUpload(e);
    
    // After upload is complete (which should add the image markdown to the content),
    // find the latest image in the content and insert it at cursor position if in preview mode
    if (activeTab === "preview" && editorRef.current) {
      // Find the most recently added image URL in the content
      setTimeout(() => {
        const contentLines = content.split('\n');
        const lastImageLineIndex = contentLines.reduce((lastIndex, line, index) => {
          if (line.includes('![') && line.includes('](')) return index;
          return lastIndex;
        }, -1);
        
        if (lastImageLineIndex >= 0) {
          // Extract the image URL
          const imageLine = contentLines[lastImageLineIndex];
          const urlMatch = imageLine.match(/\]\((.*?)\)/);
          const altMatch = imageLine.match(/!\[(.*?)\]/);
          const alt = altMatch ? altMatch[1] : file.name;
          
          if (urlMatch && urlMatch[1]) {
            // Get the current selection in the preview
            const selection = window.getSelection();
            const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
            
            if (range && editorRef.current && editorRef.current.contains(range.startContainer)) {
              // Create an img element to insert
              const imgElement = document.createElement('img');
              imgElement.src = urlMatch[1];
              imgElement.alt = alt;
              
              // Insert at cursor position
              range.deleteContents();
              range.insertNode(imgElement);
              
              // Move cursor after the image
              range.setStartAfter(imgElement);
              range.collapse(true);
              selection?.removeAllRanges();
              selection?.addRange(range);
              
              // Update content state with new HTML
              const updatedContent = editorRef.current.innerHTML;
              const event = {
                target: { value: updatedContent }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onContentChange(event);
              
              // Remove the markdown image line since we've now inserted the actual image
              contentLines.splice(lastImageLineIndex, 1);
              const updatedMarkdown = contentLines.join('\n');
              const cleanupEvent = {
                target: { value: updatedMarkdown }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onContentChange(cleanupEvent);
            }
          }
        }
      }, 100);
    }
  };

  // Handle key events to prevent cursor jumping to the top
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
      e.stopPropagation(); // Prevent event propagation
    }
  };
  
  // Handle content changes in the preview mode
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      const event = {
        target: { value: newContent }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onContentChange(event);
    }
  };
  
  // Function to focus editor with preserved cursor position
  const focusEditorWithCursorPos = () => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      const selection = window.getSelection();
      let range = selection?.getRangeAt(0);
      
      // Only set focus if not already focused
      editorRef.current.focus();
      
      // Try to restore cursor position if we have a valid range
      if (range && selection && !editorRef.current.contains(range.startContainer)) {
        // Create new range at start of editor if current range is outside
        range = document.createRange();
        range.setStart(editorRef.current, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="content">내용</Label>
      
      <div className="flex items-center gap-4 mb-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleImageUpload}
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
          onChange={handleImageInsertAtCursor}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
          <ScrollArea className="h-[400px] border rounded-md" type="always">
            <div 
              ref={editorRef}
              className="p-4 min-h-[400px] prose prose-purple max-w-none bg-white"
              contentEditable
              suppressContentEditableWarning
              onClick={focusEditorWithCursorPos}
              onKeyDown={handleKeyDown}
              onInput={handleContentChange}
              onBlur={handleContentChange}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
