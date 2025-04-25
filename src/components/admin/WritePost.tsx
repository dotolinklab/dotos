import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ThumbnailUpload from './ThumbnailUpload';
import PostEditor from './PostEditor';
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';

interface WritePostProps {
  categories: string[];
}

const WritePost = ({ categories }: WritePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const { uploadFile: uploadToImages } = useSupabaseStorage('images');
  const { uploadFile: uploadToPostImg } = useSupabaseStorage('postimg');

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadToPostImg(file);
    if (imageUrl) {
      const imageTag = `\n![${file.name}](${imageUrl})\n`;
      setContent(prev => prev + imageTag);
      toast.success('이미지가 업로드되었습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = '';
      
      if (thumbnail) {
        thumbnailUrl = await uploadToImages(thumbnail) || '';
      }

      // Create excerpt from content
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title,
          content,
          category: selectedCategory,
          excerpt,
          status: 'published',
          thumbnail_url: thumbnailUrl  // 수정된 부분: 명시적으로 thumbnail_url 설정
        }]);

      if (error) throw error;

      toast.success('블로그 포스트가 저장되었습니다.');
      setTitle('');
      setContent('');
      setSelectedCategory(categories[0]);
      setThumbnail(null);
      setThumbnailPreview('');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('포스트 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="블로그 포스트 제목을 입력하세요"
            className="text-lg"
            required
          />
        </div>

        <ThumbnailUpload 
          thumbnailPreview={thumbnailPreview}
          onThumbnailChange={handleThumbnailChange}
        />

        <div className="space-y-2">
          <Label htmlFor="category">카테고리</Label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <PostEditor
          content={content}
          onContentChange={(e) => setContent(e.target.value)}
          onImageUpload={handleContentImageUpload}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setTitle('');
              setContent('');
              setSelectedCategory(categories[0]);
              setThumbnail(null);
              setThumbnailPreview('');
            }}
          >
            초기화
          </Button>
          <Button 
            type="submit" 
            className="bg-purple-700 hover:bg-purple-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '포스트 저장하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
