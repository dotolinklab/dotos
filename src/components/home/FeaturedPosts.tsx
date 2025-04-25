
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Activity, BookOpen, Briefcase, Rocket } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  category: string;
  thumbnail_url: string | null;
}

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setFeaturedPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'AI 소식': return Activity;
      case '부업하기': return Briefcase;
      case '렌탈솔루션': return Rocket;
      case '배움터': return BookOpen;
      default: return Activity;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryUrl = (category: string) => {
    switch(category) {
      case 'AI 소식': return '/ai-news';
      case '부업하기': return '/side-hustles';
      case '렌탈솔루션': return '/rental';
      case '배움터': return '/learning';
      default: return '/';
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">추천 콘텐츠</h2>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/ai-news">더 보기</Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">포스트를 불러오는 중...</p>
          </div>
        ) : featuredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">표시할 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => {
              const PostIcon = getCategoryIcon(post.category);
              const postUrl = `${getCategoryUrl(post.category)}/${post.id}`;
              
              return (
                <Link 
                  to={postUrl}
                  key={post.id}
                  className="block hover:no-underline"
                >
                  <Card className="border hover:shadow-lg transition-shadow overflow-hidden group h-full">
                    <CardContent className="p-0">
                      {post.thumbnail_url && (
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <img 
                            src={post.thumbnail_url} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="p-2 rounded-full bg-purple-100 text-purple-700">
                            <PostIcon className="h-4 w-4" />
                          </span>
                          <span className="text-sm text-purple-700 font-medium">{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center">
                              <span className="text-purple-700 text-xs font-medium">{post.author[0]}</span>
                            </div>
                            <span>{post.author}</span>
                          </div>
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
