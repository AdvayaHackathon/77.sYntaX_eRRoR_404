import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X } from 'lucide-react';

const changeLanguageUsingGoogle = (langCode: string) => {
  const tryChangeLanguage = (attempts = 0) => {
    const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
    if (!iframe) {
      if (attempts < 10) {
        setTimeout(() => tryChangeLanguage(attempts + 1), 500); // retry after 500ms
      }
      return;
    }

    const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!innerDoc) return;

    const langItems = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');
    langItems.forEach((el) => {
      if ((el as HTMLElement).innerText.toLowerCase().includes(langCode.toLowerCase())) {
        (el as HTMLElement).click();
      }
    });
  };

  tryChangeLanguage();
};



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lang = searchParams.get('lang') || 'en';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&lang=${lang}`);
      setSearchQuery('');
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    searchParams.set('lang', selectedLang);
    setSearchParams(searchParams);
  
    // Call Google Translate
    changeLanguageUsingGoogle(selectedLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={`/?lang=${lang}`} className="flex items-center">
            <h1 className="text-2xl font-bold text-culture-800">
              <span className="text-festival-600">Culture</span>Voyager
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to={`/?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">Home</Link>
            <Link to={`/events?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">Discover</Link>
            <Link to={`/categories?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">Categories</Link>
            <Link to={`/places?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">Places</Link>
            <Link to={`/blog?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">Blog</Link>
            <Link to={`/about?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium">About</Link>
            <Link to="/calendar" className="text-gray-700 hover:text-culture-600 font-medium">Calendar</Link>
            <Link to={`/chatbot?lang=${lang}`}>Chatbot</Link>


          </nav>

          {/* Right Side: Search + Language */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search events..."
                className="w-full md:w-64 pl-10 pr-4 rounded-full border-gray-300 focus:border-culture-500 focus:ring focus:ring-culture-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-culture-500 hover:bg-culture-600">
                Go
              </Button>
            </form>

            <select
              value={lang}
              onChange={handleLanguageChange}
              className="rounded-md px-3 py-2 bg-white text-black border border-gray-300 shadow-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="kn">Kannada</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to={`/?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to={`/events?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Discover</Link>
              <Link to={`/categories?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to={`/places?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Places</Link>
              <Link to={`/blog?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to={`/chatbot?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium" onClick={() => setIsMenuOpen(false)}>Chatbot</Link>
              <Link to={`/about?lang=${lang}`} className="text-gray-700 hover:text-culture-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
              
            </nav>

            <form onSubmit={handleSearch} className="mt-4 relative">
              <Input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 rounded-full border-gray-300 focus:border-culture-500 focus:ring focus:ring-culture-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-culture-500 hover:bg-culture-600">
                Go
              </Button>
            </form>

            <div className="mt-4">
              <select
                value={lang}
                onChange={handleLanguageChange}
                className="w-full rounded-md px-3 py-2 bg-white text-black border border-gray-300 shadow-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
