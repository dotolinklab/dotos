
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { usePostEdit } from "@/hooks/usePostEdit";
import { PostEditor } from "@/components/blog/PostEditor";

const BlogEditPost = () => {
  const { postId } = useParams<{ postId: string }>();
  
  if (!postId) {
    return <div>포스트 ID가 필요합니다.</div>;
  }

  const {
    title,
    setTitle,
    content,
    setContent,
    selectedCategory,
    setSelectedCategory,
    thumbnailPreview,
    setThumbnail,
    setThumbnailPreview,
    isLoading,
    isSubmitting,
    metaDescription,
    setMetaDescription,
    keywords,
    setKeywords,
    handleSubmit
  } = usePostEdit({
    postId,
    onSuccess: () => {}
  });

  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : '';
  const handleKeywordsChange = (value: string) => {
    const keywordsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setKeywords(keywordsArray);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <main className="flex-1 ml-60">
          <div className="max-w-[1200px] py-8 px-8">
            <div className="text-center py-12">
              <p>포스트를 불러오는 중...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-60">
        <div className="max-w-[1200px] py-8 px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-800">포스트 수정</h1>
            <Button
              type="submit"
              form="post-edit-form"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중..." : "변경사항 저장하기"}
            </Button>
          </div>

          <form 
            id="post-edit-form" 
            onSubmit={handleSubmit}
          >
            <PostEditor
              title={title}
              content={content}
              onTitleChange={setTitle}
              onContentChange={setContent}
              metaDescription={metaDescription}
              onMetaDescriptionChange={setMetaDescription}
              tags={keywordsString}
              onTagsChange={handleKeywordsChange}
              category={selectedCategory}
              onCategoryChange={setSelectedCategory}
              thumbnailPreview={thumbnailPreview}
              onThumbnailChange={setThumbnail}
              onThumbnailRemove={() => setThumbnailPreview("")}
              onSubmit={handleSubmit} // Pass handleSubmit correctly
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogEditPost;
