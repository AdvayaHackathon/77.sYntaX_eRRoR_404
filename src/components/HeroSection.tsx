
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const queryParams = new URLSearchParams();
      queryParams.append('q', searchQuery.trim());
      
      if (location.trim()) {
        queryParams.append('location', location.trim());
      }
      
      navigate(`/search?${queryParams.toString()}`);
    }
  };

  return (
    <div className="relative">
      {/* Hero background */}
      <div 
        className="relative w-full h-[500px] lg:h-[600px] bg-black/40" 
        style={{
          backgroundImage: "url('https://cloudfrontgharpediabucket.gharpedia.com/uploads/2024/02/0101010008-11-Hampi-Historic-Town.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Vibrant Events of<br className="hidden md:block" /> South India
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl opacity-90 animate-slide-up">
            Authentic experiences that connect you with traditions, festivals, and ceremonies from diverse cultures
          </p>
          
          {/* Search form */}
          <form 
            onSubmit={handleSearch}
            className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 animate-slide-up"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search cultural events..."
                className="w-full pl-10 border-none focus:ring-2 focus:ring-culture-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative flex-grow md:border-l border-gray-200">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Location"
                className="w-full pl-10 border-none focus:ring-2 focus:ring-culture-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-culture-600 hover:bg-culture-700 text-white px-6 py-2"
            >
              Search
            </Button>
          </form>
          
          {/* Popular searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="opacity-90">Popular:</span>
            <button 
              onClick={() => navigate('/search?q=festivals')}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition"
            >
              Festivals
            </button>
            <button 
              onClick={() => navigate('/search?q=traditional+dance')}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition"
            >
              Traditional Dance
            </button>
            <button 
              onClick={() => navigate('/search?q=food+events')}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition"
            >
              Food Events
            </button>
            <button 
              onClick={() => navigate('/search?q=music')}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition"
            >
              Music
            </button>
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-culture-950/70 to-festival-950/60"></div>
      </div>
    </div>
  );
};

export default HeroSection;
