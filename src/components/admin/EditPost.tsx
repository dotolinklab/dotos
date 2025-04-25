
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ThumbnailUpload from './ThumbnailUpload';
import PostEditor from './PostEditor';
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';
import { useNavigate, useParams } from 'react-router-dom';

interface EditPostProps {
  categories: string[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  thumbnail_url: string | null;
  status: string;
}

const EditPost = ({ categories }: EditPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('published');

  const { uploadFile: uploadToImages } = useSupabaseStorage('images');
  const { uploadFile: uploadToPostImg } = useSupabaseStorage('postimg');

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', postId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setSelectedCategory(data.category);
          setStatus(data.status);
          if (data.thumbnail_url) {
            setExistingThumbnailUrl(data.thumbnail_url);
            setThumbnailPreview(data.thumbnail_url);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.info('이미지를 업로드 중입니다...', { duration: 2000 });
      const imageUrl = await uploadToPostImg(file);
      
      if (imageUrl) {
        // Insert markdown image tag at cursor position or at the end
        const imageTag = `![${file.name}](${imageUrl})`;
        
        // Append the image tag to the content
        setContent(prev => {
          return prev + '\n\n' + imageTag + '\n\n';
        });
        
        toast.success('이미지가 업로드되었습니다.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;
    
    setIsSubmitting(true);

    try {
      let thumbnailUrl = existingThumbnailUrl;
      
      // Upload new thumbnail if it exists
      if (thumbnail) {
        thumbnailUrl = await uploadToImages(thumbnail) || '';
      }

      // Create excerpt from content
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          category: selectedCategory,
          excerpt,
          status,
          thumbnail_url: thumbnailUrl
        })
        .eq('id', postId);

      if (error) throw error;

      toast.success('블로그 포스트가 업데이트되었습니다.');
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('포스트 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100">
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

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

        <div className="space-y-2">
          <Label htmlFor="status">상태</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="published">게시됨</option>
            <option value="draft">임시저장</option>
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
            onClick={() => navigate('/admin/blog')}
          >
            취소
          </Button>
          <Button 
            type="submit" 
            className="bg-purple-700 hover:bg-purple-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '포스트 업데이트'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
