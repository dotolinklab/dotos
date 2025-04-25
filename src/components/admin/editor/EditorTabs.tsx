
import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import EditorToolbar from './EditorToolbar';
import MarkdownGuide from './MarkdownGuide';
import EditorPreview from './EditorPreview';

interface EditorTabsProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorTabs = ({ content, onContentChange, onImageUpload }: EditorTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('normal');
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const normalEditorRef = useRef<HTMLDivElement>(null);
  const htmlEditorRef = useRef<HTMLDivElement>(null);

  const getCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return cursorPosition;
    
    const range = selection.getRangeAt(0);
    const activeEditor = activeTab === 'normal' ? normalEditorRef.current : htmlEditorRef.current;
    
    if (activeEditor?.contains(range.startContainer)) {
      const position = range.startOffset;
      setCursorPosition(position);
      return position;
    }
    
    return cursorPosition;
  };

  // Insert image at cursor position helper function
  const getEditorInsertPosition = () => {
    return getCursorPosition();
  };

  return (
    <Tabs 
      defaultValue="normal" 
      className="w-full"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="normal">일반</TabsTrigger>
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="preview">미리보기</TabsTrigger>
      </TabsList>

      <EditorToolbar 
        onImageUpload={onImageUpload}
        getCursorPosition={getEditorInsertPosition}
      />
      
      <TabsContent value="normal">
        <MarkdownGuide />
        <EditorPreview
          content={content}
          onContentChange={onContentChange}
          mode="normal"
        />
      </TabsContent>

      <TabsContent value="html">
        <MarkdownGuide />
        <EditorPreview
          content={content}
          onContentChange={onContentChange}
          mode="html"
        />
      </TabsContent>

      <TabsContent value="preview">
        <ScrollArea className="h-[400px] border rounded-md" type="always">
          <div 
            className="p-4 min-h-[400px] prose prose-purple max-w-none bg-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default EditorTabs;
