
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Activity, Briefcase, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredPosts = [
    {
      category: "AI 소식",
      title: "ChatGPT-5 출시: 혁신적인 자연어 처리 능력의 발전",
      excerpt: "OpenAI의 최신 모델은 이전 버전보다 훨씬 더 정확하고 자연스러운 대화를 가능하게 합니다.",
      author: "김기술",
      date: "2025년 4월 21일",
      icon: Activity,
      href: "/ai-news/chatgpt-5"
    },
    {
      category: "부업하기",
      title: "2025년 가장 수익성 높은 온라인 부업 TOP 5",
      excerpt: "재택근무가 가능한 고수익 부업을 소개합니다. AI 기술을 활용한 새로운 기회들을 놓치지 마세요.",
      author: "박부업",
      date: "2025년 4월 18일",
      icon: Briefcase,
      href: "/side-hustles/top-5"
    },
    {
      category: "배움터",
      title: "비개발자를 위한 AI 활용법: 기초 가이드",
      excerpt: "프로그래밍 지식이 없어도 AI 도구를 효과적으로 사용하는 방법을 알아봅니다.",
      author: "이학습",
      date: "2025년 4월 15일",
      icon: BookOpen,
      href: "/learning/ai-basics"
    }
  ];

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            AI의 세계를 쉽고 재미있게<br />
            <span className="text-purple-200">배우고, 적용하고, 성장하세요</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            비개발자도 쉽게 이해할 수 있는 AI 관련 소식과 유용한 응용법을 소개합니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              <Link to="/ai-news">최신 AI 소식 보기</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link to="/learning">
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
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="border hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`p-2 rounded-full bg-purple-100 text-purple-700`}>
                      <post.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-purple-700 font-medium">{post.category}</span>
                  </div>
                  <Link to={post.href} className="block group-hover:text-purple-700 transition-colors">
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
                    <span>{post.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">탐색하기</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "AI 소식", description: "최신 인공지능 소식과 트렌드", icon: Activity, href: "/ai-news" },
              { title: "부업하기", description: "AI를 활용한 수익 창출 방법", icon: Briefcase, href: "/side-hustles" },
              { title: "렌탈솔루션", description: "필요한 장비 및 솔루션 렌탈", icon: Rocket, href: "/rental" },
              { title: "배움터", description: "AI와 관련된 학습 자료", icon: BookOpen, href: "/learning" }
            ].map((category, index) => (
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
            <input
              type="email"
              placeholder="이메일 주소 입력"
              className="px-4 py-2 rounded-lg border border-gray-300 flex-grow max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button className="bg-purple-700 hover:bg-purple-800">구독하기</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
