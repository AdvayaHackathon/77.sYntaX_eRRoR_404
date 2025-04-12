
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { searchEvents, Event } from '@/data/events';
import { categories } from '@/data/categories';

const SearchResults = () => {
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    // In a real app, this would be an API call with filters
    setLoading(true);
    const results = searchEvents(query);
    setEvents(results);
    setLoading(false);
  }, [location.search]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('q', searchQuery);
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    
    // In a real app, this would be an API call with filters
    setLoading(true);
    const results = searchEvents(searchQuery);
    setEvents(results);
    setLoading(false);
  };
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    window.history.pushState({}, '', window.location.pathname);
    
    // In a real app, this would reset the search
    setEvents([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Search header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search cultural events..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button type="submit" className="bg-culture-600 hover:bg-culture-700">
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="flex items-center gap-2 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide' : 'Filters'}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar - desktop */}
            <div className="md:w-1/4 lg:w-1/5 hidden md:block">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Filter Events</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Date</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="date-today" />
                      <label 
                        htmlFor="date-today"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Today
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="date-tomorrow" />
                      <label 
                        htmlFor="date-tomorrow"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Tomorrow
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="date-weekend" />
                      <label 
                        htmlFor="date-weekend"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        This weekend
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="date-week" />
                      <label 
                        htmlFor="date-week"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        This week
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="price-free" />
                      <label 
                        htmlFor="price-free"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Free
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="price-paid" />
                      <label 
                        htmlFor="price-paid"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={clearSearch}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
            
            {/* Mobile filters (collapsible) */}
            {showFilters && (
              <div className="md:hidden bg-white rounded-lg shadow-sm p-6 mb-4">
                <h3 className="font-semibold text-lg mb-4">Filter Events</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label 
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Date</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="mobile-date-today" />
                      <label 
                        htmlFor="mobile-date-today"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Today
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mobile-date-weekend" />
                      <label 
                        htmlFor="mobile-date-weekend"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        This weekend
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Price</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="mobile-price-free" />
                      <label 
                        htmlFor="mobile-price-free"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Free
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mobile-price-paid" />
                      <label 
                        htmlFor="mobile-price-paid"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    className="w-full bg-culture-600 hover:bg-culture-700"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={clearSearch}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
            
            {/* Results */}
            <div className="md:w-3/4 lg:w-4/5">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse">Loading results...</div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                      {events.length} {events.length === 1 ? 'Result' : 'Results'}
                      {searchQuery && <span> for "{searchQuery}"</span>}
                    </h2>
                    {selectedCategories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedCategories.map(catId => {
                          const category = categories.find(c => c.id === catId);
                          return category ? (
                            <div key={catId} className="flex items-center bg-gray-100 py-1 px-3 rounded-full text-sm">
                              {category.name}
                              <button 
                                onClick={() => toggleCategory(catId)}
                                className="ml-1 text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : null;
                        })}
                        <button 
                          onClick={() => setSelectedCategories([])}
                          className="text-culture-600 hover:text-culture-700 text-sm"
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {events.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">No events found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                      <Button 
                        type="button" 
                        onClick={clearSearch}
                        className="bg-culture-600 hover:bg-culture-700"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
