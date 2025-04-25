
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MetadataFormProps {
  metaDescription: string;
  onMetaDescriptionChange: (value: string) => void;
  tags: string;
  onTagsChange: (value: string) => void;
}

export const MetadataForm = ({
  metaDescription,
  onMetaDescriptionChange,
  tags,
  onTagsChange,
}: MetadataFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Label htmlFor="metaDescription">메타태그 입력</Label>
          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            className="mt-2 resize-none h-[100px]"
            placeholder="검색 엔진을 위한 메타 설명을 입력하세요"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Label htmlFor="tags">태그입력</Label>
          <Textarea
            id="tags"
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            className="mt-2 resize-none h-[100px]"
            placeholder="태그는 쉼표(,)로 구분하여 입력하세요"
          />
        </CardContent>
      </Card>
    </div>
  );
};
