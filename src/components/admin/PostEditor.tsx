
import React from 'react';
import EditorTabs from './editor/EditorTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';

interface PostEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (file: File, cursorPosition: number | null) => Promise<void>;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className={`w-full ${isMobile ? 'px-0' : 'px-2'}`}>
        <EditorTabs
          content={content}
          onContentChange={onContentChange}
          onImageUpload={onImageUpload}
        />
      </div>
    </Card>
  );
};

export default PostEditor;
