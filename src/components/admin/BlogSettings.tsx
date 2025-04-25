
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

interface BlogSettingsProps {
  categories: string[];
  setCategories: (categories: string[]) => void;
  posts: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    status: string;
  }>;
}

const BlogSettings = ({ categories, setCategories, posts }: BlogSettingsProps) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('카테고리 이름을 입력해주세요.');
      return;
    }
    if (categories.includes(newCategory)) {
      toast.error('이미 존재하는 카테고리입니다.');
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory('');
    toast.success('새로운 카테고리가 추가되었습니다.');
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (posts.some(post => post.category === categoryToDelete)) {
      toast.error('해당 카테고리에 포스트가 존재하여 삭제할 수 없습니다.');
      return;
    }
    setCategories(categories.filter(category => category !== categoryToDelete));
    toast.success('카테고리가 삭제되었습니다.');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
      <h3 className="text-xl font-bold mb-6 text-purple-700">블로그 설정</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="blogName">블로그 이름</Label>
          <Input id="blogName" defaultValue="AI 블로그" placeholder="블로그 이름을 입력하세요" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="blogDescription">블로그 설명</Label>
          <Textarea 
            id="blogDescription" 
            defaultValue="AI 관련 최신 소식과 정보를 제공하는 블로그입니다." 
            placeholder="블로그 설명을 입력하세요" 
          />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mt-8 mb-4 text-purple-700">카테고리 관리</h4>
          
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input value={category} disabled />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDeleteCategory(category)}
                className="text-red-500 hover:text-red-600"
                disabled={posts.some(post => post.category === category)}
              >
                삭제
              </Button>
            </div>
          ))}
          
          <div className="flex items-center gap-4 mt-4">
            <Input
              placeholder="새 카테고리 이름"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCategory}
            >
              추가
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSettings;
