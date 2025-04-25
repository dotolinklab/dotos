
import { Button } from '@/components/ui/button';

const Newsletter = () => {
  return (
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
  );
};

export default Newsletter;
