
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseStorage } from "@/hooks/useSupabaseStorage";
import { PostEditor } from "@/components/blog/PostEditor";
import { PostSettings } from "@/components/blog/PostSettings";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  
  const { uploadFile } = useSupabaseStorage('blog-images');

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const publicUrl = await uploadFile(file);
      if (publicUrl) {
        setImageUrl(publicUrl);
        toast.success("이미지가 업로드되었습니다!");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast.error("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    // 태그 문자열을 배열로 변환
    const keywordsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    try {
      const { error } = await supabase.from('blog_posts').insert({
        title,
        content,
        category,
        author: '관리자',
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
        thumbnail_url: imageUrl,
        meta_description: metaDescription || null,
        meta_keywords: keywordsArray.length > 0 ? keywordsArray : null
      });

      if (error) throw error;

      toast.success("포스트가 저장되었습니다!");
      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl(null);
      setMetaDescription("");
      setTags("");
    } catch (error) {
      console.error('Error inserting post:', error);
      toast.error("포스트 저장에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="max-w-[1200px] py-8 px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-800">블로그 포스트 작성</h1>
            <Button
              type="submit"
              form="post-form"
              className="bg-purple-600 hover:bg-purple-700"
            >
              작성하기
            </Button>
          </div>

          <form id="post-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PostEditor
                  title={title}
                  content={content}
                  onTitleChange={setTitle}
                  onContentChange={setContent}
                  metaDescription={metaDescription}
                  onMetaDescriptionChange={setMetaDescription}
                  tags={tags}
                  onTagsChange={setTags}
                />
              </div>
              <div>
                <PostSettings
                  category={category}
                  onCategoryChange={setCategory}
                  thumbnailPreview={imageUrl || ""}
                  onThumbnailChange={handleImageUpload}
                  onThumbnailRemove={() => setImageUrl(null)}
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogAdmin;
