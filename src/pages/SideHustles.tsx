
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const SideHustles = () => {
  const hustles = [
    {
      title: "AI 프롬프트 엔지니어링",
      description: "AI 모델에서 최상의 결과를 얻기 위한 프롬프트 작성 서비스를 제공하세요.",
      difficulty: "중간",
      income: "시간당 3-5만원",
      tools: ["ChatGPT", "Claude", "Midjourney"],
      href: "/side-hustles/prompt-engineering"
    },
    {
      title: "AI 생성 콘텐츠 판매",
      description: "AI로 생성한 아트워크, 음악, 글을 온라인 마켓플레이스에서 판매하세요.",
      difficulty: "낮음",
      income: "작품당 1-10만원",
      tools: ["Midjourney", "DALL-E", "Stable Diffusion"],
      href: "/side-hustles/ai-content"
    },
    {
      title: "AI 자동화 컨설팅",
      description: "기업이 업무를 자동화하고 효율성을 높일 수 있도록 AI 솔루션을 제안하세요.",
      difficulty: "높음",
      income: "프로젝트당 100-500만원",
      tools: ["Zapier", "Make", "n8n"],
      href: "/side-hustles/automation-consulting"
    },
    {
      title: "AI 챗봇 개발",
      description: "기업 맞춤형 AI 챗봇을 만들어 고객 서비스를 개선하도록 도와주세요.",
      difficulty: "중간",
      income: "프로젝트당 50-200만원",
      tools: ["ChatGPT API", "BotPress", "Rasa"],
      href: "/side-hustles/chatbot-development"
    },
    {
      title: "AI 데이터 큐레이션",
      description: "AI 모델 훈련에 사용될 데이터를 수집, 정리, 라벨링하는 서비스를 제공하세요.",
      difficulty: "낮음",
      income: "시간당 2-3만원",
      tools: ["Label Studio", "Amazon MTurk", "Scale AI"],
      href: "/side-hustles/data-curation"
    },
    {
      title: "AI 교육 콘텐츠 제작",
      description: "AI 관련 온라인 강좌, 이북, 튜토리얼을 제작하여 판매하세요.",
      difficulty: "중간",
      income: "콘텐츠당 30-300만원",
      tools: ["Teachable", "Udemy", "Notion"],
      href: "/side-hustles/ai-education"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-6 w-6" />
            <h1 className="text-3xl md:text-4xl font-bold">부업하기</h1>
          </div>
          <p className="text-lg text-purple-100 max-w-2xl">
            AI 기술을 활용하여 추가 수입을 창출할 수 있는 다양한 부업 아이디어와 가이드를 제공합니다.
          </p>
        </div>
      </section>
      
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">인기 있는 AI 부업</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hustles.map((hustle, index) => (
              <Card key={index} className="border hover:shadow-lg transition-shadow h-full">
                <div className="p-6 flex flex-col h-full">
                  <Link to={hustle.href} className="block hover:text-purple-700 transition-colors">
                    <h3 className="text-xl font-bold mb-3">
                      {hustle.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {hustle.description}
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">난이도:</span>
                      <span className="font-medium">{hustle.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">예상 수입:</span>
                      <span className="font-medium">{hustle.income}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">필요 도구:</div>
                    <div className="flex flex-wrap gap-2">
                      {hustle.tools.map((tool, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="mt-6 w-full bg-purple-700 hover:bg-purple-800">
                    <Link to={hustle.href}>자세히 보기</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-purple-50 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">나만의 AI 부업 시작하기</h3>
            <p className="text-gray-700 mb-6">
              AI 부업을 시작하는 데 필요한 기본 지식과 도구를 안내해 드립니다. 
              초보자도 쉽게 따라할 수 있는 단계별 가이드를 확인하세요.
            </p>
            <Button asChild className="bg-purple-700 hover:bg-purple-800">
              <Link to="/side-hustles/getting-started">시작하기 가이드</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SideHustles;
