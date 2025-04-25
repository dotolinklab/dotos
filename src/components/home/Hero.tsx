
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="https://oyheezfoazrhqusyoibw.supabase.co/storage/v1/object/public/video//heroback.mp4" type="video/mp4" />
      </video>
      
      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-brand-purple/40 z-[-1]"></div>

      <div className="max-w-6xl mx-auto text-center z-10">
        <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          최신 AI 트렌드를 한눈에
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white my-0 lg:text-6xl">
          AI의 세계를 쉽고 재미있게<br />
          <span className="text-purple-100 mx-0 py-0 my-0 text-right">배우고, 적용하고, 성장하세요</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          비개발자도 쉽게 이해할 수 있는 AI 관련소식과 유용한 소식을 소개합니다
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-purple-50">
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
  );
};

export default Hero;

