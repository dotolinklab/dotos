
import React from 'react';
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
  return (
    <Tabs defaultValue="normal" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="normal">일반</TabsTrigger>
        <TabsTrigger value="html">HTML</TabsTrigger>
        <TabsTrigger value="preview">미리보기</TabsTrigger>
      </TabsList>

      <EditorToolbar onImageUpload={onImageUpload} />
      
      <TabsContent value="normal">
        <MarkdownGuide />
        <EditorPreview
          content={content}
          onContentChange={onContentChange}
        />
      </TabsContent>

      <TabsContent value="html">
        <MarkdownGuide />
        <EditorPreview
          content={content}
          onContentChange={onContentChange}
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
