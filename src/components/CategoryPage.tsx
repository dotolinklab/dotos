
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Activity, Briefcase, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  category: string;
  thumbnail_url: string | null;
}

interface CategoryPageProps {
  title: string;
  description: string;
  category: string;
  icon: 'BookOpen' | 'Activity' | 'Briefcase' | 'Rocket';
}

const CategoryPage = ({ title, description, category, icon }: CategoryPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', category)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  const IconComponent = {
    'BookOpen': BookOpen,
    'Activity': Activity,
    'Briefcase': Briefcase,
    'Rocket': Rocket
  }[icon];

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 z-[-1]"></div>
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            {category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white my-0 lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{category} 포스트</h2>
          
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">포스트를 불러오는 중...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">포스트가 없습니다.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const PostIcon = IconComponent;
                return (
                  <Link 
                    to={`${getCategoryPath(post.category)}/${post.id}`}
                    key={post.id}
                    className="block hover:no-underline"
                  >
                    <Card className="border hover:shadow-lg transition-shadow overflow-hidden group h-full">
                      <CardContent className="p-0">
                        {post.thumbnail_url ? (
                          <div className="aspect-[16/9] relative overflow-hidden">
                            <img 
                              src={post.thumbnail_url} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-purple-100 flex items-center justify-center">
                            <PostIcon className="h-12 w-12 text-purple-300" />
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
