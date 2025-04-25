
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image } from 'lucide-react';

interface EditorToolbarProps {
  onImageUpload: () => void;
}

const EditorToolbar = ({ onImageUpload }: EditorToolbarProps) => {
  return (
    <div className="flex items-center gap-4 mb-2 sticky top-0 bg-white z-10 py-2">
      <Button
        type="button"
        variant="outline"
        onClick={onImageUpload}
      >
        <Image className="mr-2" />
        이미지 추가
      </Button>
    </div>
  );
};

export default EditorToolbar;
