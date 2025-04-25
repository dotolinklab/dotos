
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

const EditorPreview = ({ content, onContentChange }: EditorPreviewProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // New function to preserve cursor position before/after content changes
  const handleInputWithPreserveCursor = () => {
    if (editorRef.current) {
      // Get current selection before content change
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      // Update the content
      const newContent = editorRef.current.innerHTML;
      onContentChange(newContent);
      
      // Wait for React to re-render, then restore cursor position
      setTimeout(() => {
        if (editorRef.current && range && selection) {
          // Try to place cursor at the same position
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
      // Allow the default behavior for these keys
      // but prevent the event from propagating to parent elements
      e.stopPropagation();
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
        onInput={handleInputWithPreserveCursor}
        onBlur={handleInputWithPreserveCursor}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </ScrollArea>
  );
};

export default EditorPreview;
