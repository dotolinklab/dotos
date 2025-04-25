
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PostEditor from './PostEditor';
import ThumbnailUpload from './ThumbnailUpload';
import PostStatusSelect from './PostStatusSelect';
import PostCategorySelect from './PostCategorySelect';
import PostFormControls from './PostFormControls';
import PostSeoMetadata from './PostSeoMetadata';
import { usePostEdit } from '@/hooks/usePostEdit';
import { useSupabaseStorage } from '@/hooks/useSupabaseStorage';
import { toast } from "sonner";
import { useParams } from 'react-router-dom';

interface EditPostProps {
  categories: string[];
}

const EditPost = ({ categories }: EditPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { uploadFile: uploadToPostImg } = useSupabaseStorage('postimg');
  
  const {
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
    metaDescription,
    setMetaDescription,
    keywords,
    setKeywords,
    isSubmitting,
    handleSubmit
  } = usePostEdit({ postId: postId || '' });

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

        <PostCategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />

        <PostStatusSelect
          status={status}
          onChange={setStatus}
        />

        <PostEditor
          content={content}
          onContentChange={handleContentChange}
          onImageUpload={handleContentImageUpload}
        />

        <PostSeoMetadata
          metaDescription={metaDescription}
          onMetaDescriptionChange={setMetaDescription}
          keywords={keywords}
          onKeywordsChange={setKeywords}
        />

        <PostFormControls isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default EditPost;
