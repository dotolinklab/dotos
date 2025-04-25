import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  category: string;
  excerpt: string | null;
  thumbnail_url: string | null;
}

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', postId)
          .eq('status', 'published')
          .single();
          
        if (error) {
          throw error;
        }
        
        setPost(data);
      } catch (error: any) {
        console.error('Error fetching post:', error);
        setError(error.message || '게시글을 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryPath = (category: string) => {
    switch(category) {
      case 'AI 소식': return '/ai-news';
      case '부업하기': return '/side-hustles';
      case '렌탈솔루션': return '/rental';
      case '배움터': return '/learning';
      default: return '/';
    }
  };

  const renderContent = (content: string) => {
    if (content.includes('<') && content.includes('>')) {
      return <div className="post-content prose prose-purple max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-500">게시글을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-red-600 mb-4">오류 발생</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</Button>
            </div>
          ) : post ? (
            <>
              <div className="mb-8">
                <Link 
                  to={getCategoryPath(post.category)} 
                  className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {post.category} 목록으로 돌아가기
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center">
                      <span className="text-purple-700 text-xs font-medium">{post.author[0]}</span>
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
              
              {post.thumbnail_url && (
                <div className="mb-8 overflow-hidden rounded-lg">
                  <img 
                    src={post.thumbnail_url} 
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <div className="prose prose-purple max-w-none">
                {renderContent(post.content)}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">게시글을 찾을 수 없습니다</h2>
              <Button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;
