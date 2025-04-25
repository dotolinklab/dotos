
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Image } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditorToolbarProps {
  onImageUpload: (file: File) => void;
}

const EditorToolbar = ({ onImageUpload }: EditorToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleImageButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-end mb-2 sticky top-0 bg-white z-10 py-2 border-b">
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleImageButtonClick}
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs" : ""}
        >
          <Image className={`${isMobile ? 'mr-1 h-4 w-4' : 'mr-2'}`} />
          {isMobile ? "이미지" : "이미지 추가"}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
