
import Navigation from '@/components/Navigation';

const RentalSolution = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            렌탈 솔루션
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mb-8">
            비용 효율적이고 유연한 렌탈 서비스를 경험해보세요
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-4 text-purple-700">서비스 소개</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ 전문 장비 렌탈</li>
                <li>✓ 유연한 계약 조건</li>
                <li>✓ 24/7 기술 지원</li>
                <li>✓ 전국 서비스 제공</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-4 text-purple-700">서비스 혜택</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ 비용 효율적인 솔루션</li>
                <li>✓ 최신 장비 제공</li>
                <li>✓ 전문가 유지보수</li>
                <li>✓ 신속한 응답 시간</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalSolution;
