
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    main: [
      { name: "홈", href: "/" },
      { name: "AI 소식", href: "/ai-news" },
      { name: "부업하기", href: "/side-hustles" },
      { name: "렌탈솔루션", href: "/rental" },
      { name: "배움터", href: "/learning" },
    ],
    resources: [
      { name: "AI 트렌드", href: "/ai-news/trends" },
      { name: "학습자료", href: "/learning/resources" },
      { name: "가이드라인", href: "/learning/guidelines" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 border-t border-purple-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description - Top on mobile, Left on desktop */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-700">도토링크 블로그</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              AI 최신 소식과 부업, 렌탈, 그리고<br />
              다양한 학습 자료를 제공합니다.
            </p>
          </div>

          {/* Empty Space - Hidden on mobile */}
          <div className="hidden lg:block" />

          {/* Navigation Links - Bottom on mobile, Right on desktop */}
          <div className="col-span-1 sm:col-span-1 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Menu Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-purple-800">메뉴</h3>
              <ul className="space-y-2">
                {footerLinks.main.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-bold text-purple-800">자료실</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 sm:mt-12 sm:pt-8 border-t border-purple-200">
          <p className="text-center text-xs sm:text-sm text-purple-600">
            &copy; {new Date().getFullYear()} 도토링크 블로그. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
