import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupabaseStorage } from "@/hooks/useSupabaseStorage";
import { toast } from "sonner";
import { EditToolbar } from "./EditToolbar";
import { ContentEditor } from "./ContentEditor";
import { MetadataForm } from "./MetadataForm";
import { PostSettings } from "./PostSettings";

interface PostEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  metaDescription?: string;
  onMetaDescriptionChange?: (value: string) => void;
  tags?: string;
  onTagsChange?: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  thumbnailPreview: string;
  onThumbnailChange: (file: File) => void;
  onThumbnailRemove: () => void;
  onSubmit?: () => void; // Add optional submit handler
}

export const PostEditor = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  metaDescription = "",
  onMetaDescriptionChange = () => {},
  tags = "",
  onTagsChange = () => {},
  category,
  onCategoryChange,
  thumbnailPreview,
  onThumbnailChange,
  onThumbnailRemove,
  onSubmit, // Add to destructured props
}: PostEditorProps) => {
  const [editorMode, setEditorMode] = useState<"normal" | "html">("normal");
  const [showPreview, setShowPreview] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { uploadFile } = useSupabaseStorage('blog-images');

  const insertImageIntoContent = async (file: File) => {
    try {
      const publicUrl = await uploadFile(file);
      if (!publicUrl || !textAreaRef.current) return;

      const imageHtml = `\n<img src="${publicUrl}" alt="Blog content image" class="max-w-full h-auto my-4" />\n`;
      
      const cursorPosition = textAreaRef.current.selectionStart;
      const textBeforeCursor = textAreaRef.current.value.substring(0, cursorPosition);
      const textAfterCursor = textAreaRef.current.value.substring(cursorPosition);
      
      const newContent = textBeforeCursor + imageHtml + textAfterCursor;
      onContentChange(newContent);
      
      toast.success("이미지가 성공적으로 삽입되었습니다!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      insertImageIntoContent(file);
    }
  };

  const renderHtmlPreview = () => {
    return (
      <div 
        className="prose prose-purple max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Sidebar */}
      <div className="space-y-6">
        {/* Remove the duplicate category card */}
        <PostSettings
          category={category}
          onCategoryChange={onCategoryChange}
          thumbnailPreview={thumbnailPreview}
          onThumbnailChange={onThumbnailChange}
          onThumbnailRemove={onThumbnailRemove}
        />

        <MetadataForm
          metaDescription={metaDescription}
          onMetaDescriptionChange={onMetaDescriptionChange}
          tags={tags}
          onTagsChange={onTagsChange}
        />
      </div>

      {/* Main Editor Area */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <EditToolbar
              editorMode={editorMode}
              setEditorMode={setEditorMode}
              showPreview={showPreview}
              setShowPreview={setShowPreview}
              onImageUpload={handleImageUpload}
            />

            <ContentEditor
              title={title}
              onTitleChange={onTitleChange}
              content={content}
              onContentChange={onContentChange}
              editorMode={editorMode}
              showPreview={showPreview}
              textAreaRef={textAreaRef}
            />

            {showPreview && (
              <div className="min-h-[400px] border rounded-md p-4 bg-white">
                {renderHtmlPreview()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Area */}
        <Card>
          <CardContent className="p-6">
            <Label>미리보기</Label>
            <div className="mt-2 min-h-[400px] border rounded-md p-4 bg-white">
              {renderHtmlPreview()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
