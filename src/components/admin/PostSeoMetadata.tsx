
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
        <div className="bg-muted p-2 rounded-md text-sm mb-2">
          <p>👀 검색엔진 최적화를 위한 설명을 작성하세요:</p>
          <ul className="list-disc pl-4 text-xs space-y-1">
            <li>네이버, 구글, 다음 등의 검색 결과에 표시됩니다</li>
            <li>포스트의 핵심 내용을 간단히 설명해주세요</li>
            <li>150자 이내로 작성해주세요</li>
          </ul>
        </div>
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
        <div className="bg-muted p-2 rounded-md text-sm mb-2">
          <p>🔍 검색을 위한 태그/키워드를 입력하세요:</p>
          <ul className="list-disc pl-4 text-xs space-y-1">
            <li>검색엔진이 포스트를 더 잘 이해하는데 도움이 됩니다</li>
            <li>연관 키워드를 추가해주세요</li>
            <li>Enter를 눌러 키워드를 추가할 수 있습니다</li>
          </ul>
        </div>
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

