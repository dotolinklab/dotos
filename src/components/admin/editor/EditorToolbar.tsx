
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Image } from 'lucide-react';

interface EditorToolbarProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorToolbar = ({ onImageUpload }: EditorToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-between mb-2 sticky top-0 bg-white z-10 py-2">
      <div /> {/* Empty div for flex justify-between spacing */}
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleImageButtonClick}
        >
          <Image className="mr-2" />
          이미지 추가
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
