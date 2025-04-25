import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Activity, Briefcase, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  category: string;
}

const Index = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 z-[-1]"></div>
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            최신 AI 트렌드를 한눈에
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white my-0 lg:text-6xl">
            AI의 세계를 쉽고 재미있게<br />
            <span className="text-purple-200 mx-0 py-0 my-0 text-right">배우고, 적용하고, 성장하세요</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">비개발자도 쉽게 이해할 수 있는 AI 관련소식과 유용한 소식을 소개합니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              <Link to="/ai-news">최신 AI 소식 보기</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:text-white">
              <Link to="/learning" className="flex items-center">
                학습 가이드 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
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
                return (
                  <Card key={post.id} className="border hover:shadow-lg transition-shadow overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="p-2 rounded-full bg-purple-100 text-purple-700">
                          <PostIcon className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-purple-700 font-medium">{post.category}</span>
                      </div>
                      <Link 
                        to={`${getCategoryUrl(post.category)}/${post.id}`} 
                        className="block group-hover:text-purple-700 transition-colors"
                      >
                        <h3 className="text-xl font-bold mb-3">
                          {post.title}
                        </h3>
                      </Link>
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
                    </CardContent>
                  </Card>
                )}
              )}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">탐색하기</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              title: "AI 소식",
              description: "최신 인공지능 소식과 트렌드",
              icon: Activity,
              href: "/ai-news"
            }, {
              title: "부업하기",
              description: "AI를 활용한 수익 창출 방법",
              icon: Briefcase,
              href: "/side-hustles"
            }, {
              title: "렌탈솔루션",
              description: "필요한 장비 및 솔루션 렌탈",
              icon: Rocket,
              href: "/rental"
            }, {
              title: "배움터",
              description: "AI와 관련된 학습 자료",
              icon: BookOpen,
              href: "/learning"
            }].map((category, index) => (
              <Link to={category.href} key={index} className="group">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="mb-4 p-3 rounded-full bg-purple-100 w-fit">
                    <category.icon className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">{category.title}</h3>
                  <p className="text-gray-600 flex-grow">{category.description}</p>
                  <div className="mt-4 flex items-center text-purple-700 font-medium text-sm">
                    <span>바로가기</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">최신 소식 받아보기</h2>
          <p className="text-gray-600 mb-6">새로운 AI 소식과 유용한 팁을 이메일로 받아보세요.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <input type="email" placeholder="이메일 주소 입력" className="px-4 py-2 rounded-lg border border-gray-300 flex-grow max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <Button className="bg-purple-700 hover:bg-purple-800">구독하기</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
