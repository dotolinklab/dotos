
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
  onSuccess?: () => void;
}

const WritePost = ({ categories, onSuccess }: WritePostProps) => {
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

  const handleContentImageUpload = async (file: File, cursorPosition: number | null) => {
    try {
      toast.info('이미지를 업로드 중입니다...', { duration: 2000 });
      const imageUrl = await uploadToPostImg(file);
      
      if (imageUrl) {
        // Create image HTML tag
        const imgHtmlTag = `<img src="${imageUrl}" alt="${file.name}" />`;
        
        setContent(prevContent => {
          // If we have a cursor position, insert at that position
          if (cursorPosition !== null) {
            // Split the content at cursor position and insert the image
            const before = prevContent.substring(0, cursorPosition);
            const after = prevContent.substring(cursorPosition);
            return before + imgHtmlTag + after;
          }
          
          // Fallback: append to the end if no cursor position
          return prevContent + imgHtmlTag;
        });
        
        toast.success('이미지가 업로드되었습니다.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = '';
      
      if (thumbnail) {
        thumbnailUrl = await uploadToImages(thumbnail) || '';
      }

      // Create excerpt from content (strip HTML tags)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');

      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title,
          content,
          category: selectedCategory,
          excerpt,
          status: 'published',
          thumbnail_url: thumbnailUrl
        }]);

      if (error) throw error;

      toast.success('블로그 포스트가 저장되었습니다.');
      setTitle('');
      setContent('');
      setSelectedCategory(categories[0]);
      setThumbnail(null);
      setThumbnailPreview('');
      
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      }
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
          onContentChange={handleContentChange}
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
