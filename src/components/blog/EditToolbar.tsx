
import { Eye, FileText, Code, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditToolbarProps {
  editorMode: "normal" | "html";
  setEditorMode: (mode: "normal" | "html") => void;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditToolbar = ({
  editorMode,
  setEditorMode,
  showPreview,
  setShowPreview,
  onImageUpload,
}: EditToolbarProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Tabs 
        defaultValue={editorMode} 
        value={editorMode}
        onValueChange={(value) => setEditorMode(value as "normal" | "html")}
        className="w-[200px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="normal" className="flex items-center gap-2">
            <FileText size={16} />
            일반
          </TabsTrigger>
          <TabsTrigger value="html" className="flex items-center gap-2">
            <Code size={16} />
            HTML
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-2">
        {editorMode === "html" && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              id="content-image-upload"
            />
            <label htmlFor="content-image-upload">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <span>
                  <Image size={16} />
                  이미지 삽입
                </span>
              </Button>
            </label>
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          {showPreview ? "에디터로 돌아가기" : "미리보기"}
        </Button>
      </div>
    </div>
  );
};
