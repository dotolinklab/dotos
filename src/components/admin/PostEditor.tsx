
import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorToolbar from './editor/EditorToolbar';
import MarkdownGuide from './editor/MarkdownGuide';
import EditorPreview from './editor/EditorPreview';

interface PostEditorProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("write");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageInsertAtCursor = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    await onImageUpload(e);
    
    if (activeTab === "preview") {
      setTimeout(() => {
        const contentLines = content.split('\n');
        const lastImageLineIndex = contentLines.reduce((lastIndex, line, index) => {
          if (line.includes('![') && line.includes('](')) return index;
          return lastIndex;
        }, -1);
        
        if (lastImageLineIndex >= 0) {
          const imageLine = contentLines[lastImageLineIndex];
          const urlMatch = imageLine.match(/\]\((.*?)\)/);
          const altMatch = imageLine.match(/!\[(.*?)\]/);
          const alt = altMatch ? altMatch[1] : file.name;
          
          if (urlMatch && urlMatch[1]) {
            const selection = window.getSelection();
            const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
            
            if (range) {
              const imgElement = document.createElement('img');
              imgElement.src = urlMatch[1];
              imgElement.alt = alt;
              
              range.deleteContents();
              range.insertNode(imgElement);
              
              range.setStartAfter(imgElement);
              range.collapse(true);
              selection?.removeAllRanges();
              selection?.addRange(range);
              
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

  return (
    <div className="space-y-2">
      <Label htmlFor="content">내용</Label>
      
      <input
        type="file"
        id="content-image"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageInsertAtCursor}
      />
      
      <EditorToolbar onImageUpload={handleImageUpload} />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="write">작성</TabsTrigger>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <div className="space-y-2">
            <MarkdownGuide />
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
        
        <TabsContent value="preview">
          <EditorPreview 
            content={content} 
            onContentChange={(newContent) => {
              const event = {
                target: { value: newContent }
              } as React.ChangeEvent<HTMLTextAreaElement>;
              onContentChange(event);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostEditor;
