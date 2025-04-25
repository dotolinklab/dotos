
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

const EditorPreview = ({ content, onContentChange }: EditorPreviewProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
      e.stopPropagation();
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onContentChange(newContent);
    }
  };

  const focusEditorWithCursorPos = () => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      const selection = window.getSelection();
      let range = selection?.getRangeAt(0);
      
      editorRef.current.focus();
      
      if (range && selection && !editorRef.current.contains(range.startContainer)) {
        range = document.createRange();
        range.setStart(editorRef.current, 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
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
  );
};

export default EditorPreview;
