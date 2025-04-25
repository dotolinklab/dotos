
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Learning = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            배움터
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mb-8">
            우리의 교육 자료로 지식을 확장하세요
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {['초급', '중급', '고급'].map((level) => (
              <div key={level} className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
                <h3 className="text-xl font-bold mb-4 text-purple-700">{level} 과정</h3>
                <p className="text-gray-600 mb-6">
                  {level} 수준에 맞춤화된 종합 학습 자료를 제공합니다.
                </p>
                <Button className="w-full bg-purple-700 hover:bg-purple-800">
                  학습 시작하기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learning;
