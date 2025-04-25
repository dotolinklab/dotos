
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiNews = () => {
  const newsPosts = [
    {
      title: "ChatGPT-5 출시: 혁신적인 자연어 처리 능력의 발전",
      excerpt: "OpenAI의 최신 모델은 이전 버전보다 훨씬 더 정확하고 자연스러운 대화를 가능하게 합니다.",
      author: "김기술",
      date: "2025년 4월 21일",
      href: "/ai-news/chatgpt-5"
    },
    {
      title: "구글, 새로운 AI 이미지 생성 모델 발표",
      excerpt: "구글의 최신 모델은 텍스트 입력만으로 사실적이고 정교한 이미지를 생성할 수 있습니다.",
      author: "이테크",
      date: "2025년 4월 19일",
      href: "/ai-news/google-image-model"
    },
    {
      title: "메타, AR 안경용 AI 어시스턴트 개발 중",
      excerpt: "메타는 증강현실 안경과 함께 작동하는 새로운 AI 어시스턴트를 개발 중이라고 발표했습니다.",
      author: "박미래",
      date: "2025년 4월 17일",
      href: "/ai-news/meta-ar-assistant"
    },
    {
      title: "국내 기업, 의료 분야 AI 솔루션 해외 진출",
      excerpt: "국내 스타트업이 개발한 의료 진단 AI 솔루션이 미국과 유럽 시장에 성공적으로 진출했습니다.",
      author: "최의료",
      date: "2025년 4월 15일",
      href: "/ai-news/medical-ai-expansion"
    },
    {
      title: "자율주행 AI, 악천후 대응력 대폭 향상",
      excerpt: "최신 자율주행 AI 시스템이 폭우와 폭설 등 악천후 상황에서도 안정적인 주행을 보장합니다.",
      author: "정자율",
      date: "2025년 4월 13일",
      href: "/ai-news/autonomous-driving-weather"
    },
    {
      title: "인공지능의 에너지 효율성, 3년 내 10배 개선될 전망",
      excerpt: "최신 연구에 따르면 AI 모델의 에너지 효율성이 향후 3년 내에 현재보다 10배 이상 개선될 것으로 예상됩니다.",
      author: "한에너지",
      date: "2025년 4월 11일",
      href: "/ai-news/ai-energy-efficiency"
    }
  ];

  const categories = [
    "전체",
    "AI 기술",
    "비즈니스 응용",
    "연구 동향",
    "이슈와 쟁점",
    "국내 소식",
    "해외 소식"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="h-6 w-6" />
            <h1 className="text-3xl md:text-4xl font-bold">AI 최신 소식</h1>
          </div>
          <p className="text-lg text-purple-100 max-w-2xl">
            인공지능 분야의 최신 개발 동향과 혁신적인 기술 소식을 한곳에서 확인하세요.
          </p>
        </div>
      </section>
      
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-purple-700 hover:bg-purple-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.map((post, index) => (
              <Card key={index} className="border hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="p-6">
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
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mr-2">이전</Button>
            <Button variant="outline" className="mx-1">1</Button>
            <Button variant="outline" className="mx-1 bg-purple-100">2</Button>
            <Button variant="outline" className="mx-1">3</Button>
            <Button variant="outline" className="ml-2">다음</Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AiNews;
