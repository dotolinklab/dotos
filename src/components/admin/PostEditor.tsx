
import React from 'react';
import EditorTabs from './editor/EditorTabs';

interface PostEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostEditor = ({ content, onContentChange, onImageUpload }: PostEditorProps) => {
  return (
    <div className="w-full">
      <EditorTabs
        content={content}
        onContentChange={onContentChange}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default PostEditor;
