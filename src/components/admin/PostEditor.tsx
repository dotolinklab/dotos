
import React, { useState, useRef } from 'react';
import EditorTabs from './editor/EditorTabs';

interface PostEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  // Use a shared cursor state for the content
  const lastCursorPosition = useRef<number | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will pass the file upload event to parent 
    // while maintaining knowledge of current cursor position
    onImageUpload(e);
  };

  return (
    <div className="w-full">
      <EditorTabs
        content={content}
        onContentChange={onContentChange}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default PostEditor;
