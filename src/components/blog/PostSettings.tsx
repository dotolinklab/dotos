
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostSettingsProps {
  category: string;
  onCategoryChange: (value: string) => void;
  thumbnailPreview: string;
  onThumbnailChange: (file: File) => void;
  onThumbnailRemove: () => void;
}

export const PostSettings = ({
  category,
  onCategoryChange,
  thumbnailPreview,
  onThumbnailChange,
  onThumbnailRemove,
}: PostSettingsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Label className="flex-shrink-0">카테고리</Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI 소식">AI 소식</SelectItem>
                <SelectItem value="부업하기">부업하기</SelectItem>
                <SelectItem value="렌탈솔루션">렌탈솔루션</SelectItem>
                <SelectItem value="배움터">배움터</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label>대표 이미지</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              {thumbnailPreview ? (
                <div className="space-y-4">
                  <img 
                    src={thumbnailPreview} 
                    alt="업로드된 이미지"
                    className="w-full aspect-video object-cover rounded"
                  />
                  <Button 
                    variant="outline" 
                    onClick={onThumbnailRemove}
                    className="w-full"
                  >
                    <Trash2 size={16} className="mr-2" />
                    이미지 제거
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onThumbnailChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <Upload className="text-gray-400" size={32} />
                  <p className="text-sm text-gray-500">이미지를 업로드하세요</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF (최대 5MB)</p>
                </label>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
