
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';

interface UsePostEditProps {
  postId: string;
  onSuccess?: () => void;
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
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { uploadFile: uploadToImages } = useSupabaseStorage('images');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
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
          setMetaDescription(data.meta_description || '');
          setKeywords(data.meta_keywords || []);
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

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = existingThumbnailUrl;
      
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
        .update({
          title,
          content,
          category: selectedCategory,
          excerpt,
          status,
          thumbnail_url: thumbnailUrl,
          meta_description: metaDescription || null,
          meta_keywords: keywords
        })
        .eq('id', postId);

      if (error) throw error;

      toast.success('블로그 포스트가 업데이트되었습니다.');
      
      if (onSuccess) {
        onSuccess();
      }
      
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
    metaDescription,
    setMetaDescription,
    keywords,
    setKeywords,
    isLoading,
    isSubmitting,
    handleSubmit
  };
};
