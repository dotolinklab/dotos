
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Image as ImageIcon,
  Link
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EditorToolbarProps {
  onImageUpload: (file: File) => void;
  onInsertMarkdown: (markdown: string) => void;
}

const EditorToolbar = ({ onImageUpload, onInsertMarkdown }: EditorToolbarProps) => {
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

  const formatButtons = [
    { icon: <Bold size={isMobile ? 16 : 18} />, text: "굵게", markdown: "**굵은 텍스트**" },
    { icon: <Italic size={isMobile ? 16 : 18} />, text: "기울임", markdown: "*기울인 텍스트*" },
    { icon: <Heading1 size={isMobile ? 16 : 18} />, text: "제목1", markdown: "# 큰 제목" },
    { icon: <Heading2 size={isMobile ? 16 : 18} />, text: "제목2", markdown: "## 중간 제목" },
    { icon: <List size={isMobile ? 16 : 18} />, text: "목록", markdown: "\n- 항목 1\n- 항목 2\n- 항목 3\n" },
    { icon: <ListOrdered size={isMobile ? 16 : 18} />, text: "순서목록", markdown: "\n1. 첫 번째\n2. 두 번째\n3. 세 번째\n" },
    { icon: <Link size={isMobile ? 16 : 18} />, text: "링크", markdown: "[링크 텍스트](https://example.com)" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between sticky top-0 bg-white z-10 py-2 border-b px-2">
      <div className="flex flex-wrap gap-1">
        {formatButtons.map((btn, idx) => (
          <Button
            key={idx}
            type="button"
            variant="ghost"
            size={isMobile ? "sm" : "default"}
            className="text-gray-700"
            title={btn.text}
            onClick={() => onInsertMarkdown(btn.markdown)}
          >
            {btn.icon}
            {!isMobile && <span className="ml-1 hidden md:inline">{btn.text}</span>}
          </Button>
        ))}
      </div>
      
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
          variant="secondary"
          onClick={handleImageButtonClick}
          size={isMobile ? "sm" : "default"}
          className={`${isMobile ? 'text-xs' : ''}`}
        >
          <ImageIcon className={`${isMobile ? 'mr-1 h-4 w-4' : 'mr-2'}`} />
          {isMobile ? "이미지" : "이미지 추가"}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
