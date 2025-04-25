import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1A1F2C] to-[#2A2F3C] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full mb-6">
            AI를 이해하는 새로운 관점
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI를 바라보는 시선<br />
            이제는 미래가 아닌 현재
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            비개발자, 비전문인의 시선으로 바라보는 AI
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-[#1A1F2C] hover:bg-gray-100">
              최신글 확인하기
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              무료 GPTS 이용하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">최신 소식</h2>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full">전체보기</Button>
              <Button variant="outline" className="rounded-full">최신 AI소식</Button>
              <Button variant="outline" className="rounded-full">화제의 이슈</Button>
              <Button variant="outline" className="rounded-full">라이프스타일</Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
                    라이프스타일
                  </span>
                  <h3 className="text-xl font-bold mb-3">
                    첫 웹사이트 만들기: 초보자도 따라하는 단계별 가이드
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    인공지능에게 원하는 웹사이트를 설명하기만 하면 됩니다...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <img src="/avatar.png" alt="Author" className="w-6 h-6 rounded-full" />
                      <span>알파GOGOGO</span>
                    </div>
                    <span>2025�� 4월 23일</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
