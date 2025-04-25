
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
  mode?: 'normal' | 'html';
  onCursorPositionChange?: (position: number) => void;
}

const EditorPreview = ({ 
  content, 
  onContentChange, 
  mode = 'normal',
  onCursorPositionChange
}: EditorPreviewProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  
  // Store cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (editorRef.current?.contains(range.startContainer)) {
        const pos = range.startOffset;
        setCursorPosition(pos);
        if (onCursorPositionChange) {
          onCursorPositionChange(pos);
        }
        return pos;
      }
    }
    return cursorPosition;
  };
  
  // Restore cursor position after content changes
  useEffect(() => {
    if (editorRef.current && cursorPosition !== null) {
      try {
        const selection = window.getSelection();
        if (!selection) return;
        
        const range = document.createRange();
        let targetNode = editorRef.current;
        
        // Find the right text node to place the cursor in
        let found = false;
        function findTextNode(node: Node, offset: number): {node: Node, offset: number} | null {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent!.length >= offset) {
              return { node, offset };
            }
            return null;
          }
          
          for (let i = 0; i < node.childNodes.length; i++) {
            const result = findTextNode(node.childNodes[i], offset);
            if (result) return result;
          }
          
          return null;
        }
        
        const result = findTextNode(targetNode, cursorPosition);
        
        if (result) {
          range.setStart(result.node, result.offset);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          found = true;
        }
        
        if (!found) {
          // Fallback: if we can't find exact position, place at the end
          if (targetNode.lastChild) {
            range.selectNodeContents(targetNode);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      } catch (e) {
        console.error("Error restoring cursor position:", e);
      }
    }
  }, [content, cursorPosition]);

  // Function to handle content update with cursor position preservation
  const handleInputWithPreserveCursor = () => {
    const position = saveCursorPosition();
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
    return position;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // We don't want to prevent default behavior for normal typing keys
    saveCursorPosition();
  };

  const focusEditor = () => {
    editorRef.current?.focus();
    saveCursorPosition();
  };

  return (
    <ScrollArea className="h-[400px] border rounded-md" type="always">
      <div 
        ref={editorRef}
        className="p-4 min-h-[400px] prose prose-purple max-w-none bg-white"
        contentEditable
        suppressContentEditableWarning
        onClick={focusEditor}
        onFocus={saveCursorPosition}
        onKeyDown={handleKeyDown}
        onInput={handleInputWithPreserveCursor}
        onBlur={handleInputWithPreserveCursor}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </ScrollArea>
  );
};

export default EditorPreview;
