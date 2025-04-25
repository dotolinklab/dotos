
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
    legal: [
      { name: "개인정보 처리방침", href: "/privacy" },
      { name: "이용약관", href: "/terms" },
      { name: "쿠키 정책", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-700">My Personal Blog</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              AI 최신 소식과 부업, 렌탈, 그리고<br />
              다양한 학습 자료를 제공합니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">메뉴</h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-purple-700">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">자료실</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-purple-700">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">법적 고지</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-purple-700">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link to="/contact" className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-600">
                문의하기
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
