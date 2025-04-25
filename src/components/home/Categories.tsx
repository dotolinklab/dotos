
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Briefcase, Rocket, ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [{
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
  }];

  return (
    <section className="py-20 px-4 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">탐색하기</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={category.href} key={index} className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="mb-4 p-3 rounded-full bg-purple-100 w-fit">
                  <category.icon className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">
                  {category.title}
                </h3>
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
  );
};

export default Categories;
