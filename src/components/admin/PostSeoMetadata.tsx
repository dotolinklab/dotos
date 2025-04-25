
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

interface PostSeoMetadataProps {
  metaDescription: string;
  onMetaDescriptionChange: (value: string) => void;
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
}

const PostSeoMetadata = ({
  metaDescription,
  onMetaDescriptionChange,
  keywords,
  onKeywordsChange
}: PostSeoMetadataProps) => {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      e.preventDefault();
      if (!keywords.includes(newKeyword.trim())) {
        onKeywordsChange([...keywords, newKeyword.trim()]);
      }
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    onKeywordsChange(keywords.filter(k => k !== keywordToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="meta-description">검색 결과에 표시될 설명</Label>
        <Input
          id="meta-description"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder="검색 결과에 표시될 포스트 설명을 입력하세요 (150자 이내)"
          maxLength={150}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">태그/키워드</Label>
        <Input
          id="keywords"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyDown={handleAddKeyword}
          placeholder="키워드를 입력하고 Enter를 누르세요"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {keywords.map((keyword) => (
            <Badge key={keyword} variant="secondary" className="px-2 py-1">
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostSeoMetadata;
