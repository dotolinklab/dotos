import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: "홈", href: "/" },
    { name: "AI 소식", href: "/ai-news" },
    { name: "부업하기", href: "/side-hustles" },
    { name: "렌탈솔루션", href: "/rental" },
    { name: "배움터", href: "/learning" }
  ];

  return (
    <nav className={`fixed w-full z-50 bg-white ${isScrolled ? 'shadow-md' : ''} border-b border-gray-100 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-700">도토링크 연구소</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-base font-medium transition-colors duration-200 
                  text-purple-700 hover:text-purple-900
                  after:content-[''] after:absolute after:w-full after:h-1 after:bg-purple-600 
                  after:left-0 after:bottom-[-4px] after:rounded-full
                  after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                  hover:after:scale-x-100
                  ${location.pathname === link.href ? 'after:scale-x-100 after:h-1.5' : ''}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Button 
            variant="ghost" 
            className="md:hidden text-purple-700 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-md shadow-lg">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium 
                    ${location.pathname === link.href 
                      ? 'text-purple-700 bg-purple-50' 
                      : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
