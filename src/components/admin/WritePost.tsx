
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Image } from 'lucide-react';

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

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('postimg')
        .upload(fileName, file);

      if (error) throw error;

      // Supabase Storage URL 생성
      const { data: publicUrlData } = supabase.storage
        .from('postimg')
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;
      const imageTag = `\n![${file.name}](${imageUrl})\n`;
      
      setContent(prev => prev + imageTag);
      toast.success('이미지가 업로드되었습니다.');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = '';
      
      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, thumbnail);

        if (uploadError) throw uploadError;
        
        // Supabase Storage URL 생성
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrlData.publicUrl;
      }

      // Create excerpt from content (first 150 characters)
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

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

        <div className="space-y-2">
          <Label htmlFor="thumbnail">썸네일 이미지</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('thumbnail')?.click()}
              className="w-full"
            >
              <Upload className="mr-2" />
              썸네일 업로드
            </Button>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </div>
          {thumbnailPreview && (
            <div className="mt-4">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className="w-full max-w-md rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="content">내용</Label>
          <div className="flex items-center gap-4 mb-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('content-image')?.click()}
            >
              <Image className="mr-2" />
              이미지 추가
            </Button>
            <input
              type="file"
              id="content-image"
              accept="image/*"
              className="hidden"
              onChange={handleContentImageUpload}
            />
          </div>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="블로그 내용을 입력하세요"
            className="min-h-[400px] text-base"
            required
          />
        </div>

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
