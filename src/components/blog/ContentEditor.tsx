
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ContentEditorProps {
  title: string;
  onTitleChange: (value: string) => void;
  content: string;
  onContentChange: (value: string) => void;
  editorMode: "normal" | "html";
  showPreview: boolean;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ContentEditor = ({
  title,
  onTitleChange,
  content,
  onContentChange,
  editorMode,
  showPreview,
  textAreaRef,
}: ContentEditorProps) => {
  const handleContentChange = (value: string) => {
    if (editorMode === "html") {
      onContentChange(value);
    } else {
      // Convert plain text to HTML when in normal mode
      const htmlContent = value
        .split('\n')
        .map(line => `<p>${line}</p>`)
        .join('');
      onContentChange(htmlContent);
    }
  };

  return (
    <>
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="포스트 제목을 입력하세요"
        className="text-lg font-medium mb-4"
      />
      {!showPreview && (
        <Textarea
          ref={textAreaRef}
          value={editorMode === "html" ? content : content.replace(/<[^>]*>/g, '')}
          onChange={(e) => handleContentChange(e.target.value)}
          className="min-h-[400px] font-mono text-base leading-relaxed resize-y"
          placeholder={
            editorMode === "normal" 
              ? "포스트 내용을 작성하세요" 
              : "<h1>HTML 태그를 사용하여 포스트를 작성하세요</h1>"
          }
        />
      )}
    </>
  );
};
