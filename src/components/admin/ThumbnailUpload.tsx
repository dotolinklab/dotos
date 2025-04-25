
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';

interface ThumbnailUploadProps {
  thumbnailPreview: string;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThumbnailUpload = ({ thumbnailPreview, onThumbnailChange }: ThumbnailUploadProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="thumbnail">썸네일 이미지</Label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('thumbnail')?.click()}
          className="w-full"
        >
          <Upload className="mr-2" />
          썸네일 업로드
        </Button>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          className="hidden"
          onChange={onThumbnailChange}
        />
      </div>
      {thumbnailPreview && (
        <div className="mt-4">
          <img 
            src={thumbnailPreview} 
            alt="Thumbnail preview" 
            className="w-full max-w-md rounded-lg shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
