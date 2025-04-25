
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    blog: [
      { name: "전체보기", href: "/blog/all" },
      { name: "최신 AI소식", href: "/blog/ai-news" },
      { name: "화제의 이슈", href: "/blog/trending" },
      { name: "라이프스타일", href: "/blog/lifestyle" },
    ],
    gpts: [
      { name: "초보자 가이드", href: "/gpts/guide" },
      { name: "블로그 GPTS", href: "/gpts/blog" },
      { name: "그 외 GPTS", href: "/gpts/others" },
      { name: "다운로드", href: "/gpts/download" },
    ],
    service: [
      { name: "전체서비스", href: "/services" },
      { name: "유튜브 자막 추출", href: "/services/youtube-subtitle" },
      { name: "URL 단축", href: "/services/url-shortener" },
      { name: "블로그 배포 생성기", href: "/services/blog-generator" },
    ],
    community: [
      { name: "실시간 채팅", href: "/community/chat" },
      { name: "오픈 채팅방", href: "/community/open-chat" },
      { name: "비즈니스 문의", href: "/community/business" },
    ],
  };

  return (
    <footer className="bg-white pt-16 pb-12 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="알파블로그" className="h-8 w-8" />
              <span className="text-xl font-bold ml-2">알파블로그</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              심층 보도와 분석을 통해 인<br />
              공지능의 미래를 탐색합니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">블로그</h3>
            <ul className="space-y-2">
              {footerLinks.blog.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">GPTS 이용하기</h3>
            <ul className="space-y-2">
              {footerLinks.gpts.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">서비스</h3>
            <ul className="space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">커뮤니티</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-gray-600">
            © 2025 알파블로그. 모든 권리 보유.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
