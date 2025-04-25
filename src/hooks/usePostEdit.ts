
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';

interface UsePostEditProps {
  postId: string;
  onSuccess?: () => void;
}

interface PostData {
  title: string;
  content: string;
  category: string;
  thumbnail_url: string | null;
  status: string;
}

export const usePostEdit = ({ postId, onSuccess }: UsePostEditProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('published');

  const { uploadFile: uploadToImages } = useSupabaseStorage('images');
  const navigate = useNavigate();

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
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
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = existingThumbnailUrl;
      
      if (thumbnail) {
        thumbnailUrl = await uploadToImages(thumbnail) || '';
      }

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
      onSuccess?.();
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('포스트 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    selectedCategory,
    setSelectedCategory,
    status,
    setStatus,
    thumbnail,
    setThumbnail,
    thumbnailPreview,
    setThumbnailPreview,
    existingThumbnailUrl,
    isSubmitting,
    handleSubmit
  };
};
