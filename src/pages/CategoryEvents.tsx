
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { getEventsByCategory, Event } from '@/data/events';
import { getCategoryInfo } from '@/data/categories';
import { ArrowLeft } from 'lucide-react';

const CategoryEvents = () => {
  const { id } = useParams<{ id: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      setLoading(true);
      const categoryEvents = getEventsByCategory(id as any);
      setEvents(categoryEvents);
      setLoading(false);
    }
  }, [id]);
  
  const categoryInfo = id ? getCategoryInfo(id as any) : null;
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the category you're looking for.</p>
            <Link to="/categories" className="text-culture-600 hover:text-culture-700">
              Back to all categories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className={`${categoryInfo.color} text-white py-12`}>
          <div className="container mx-auto px-4">
            <Link to="/categories" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> All Categories
            </Link>
            <h1 className="text-4xl font-bold mb-4">{categoryInfo.name}</h1>
            <p className="text-xl opacity-90 max-w-3xl">
              {categoryInfo.description}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">Loading events...</div>
            </div>
          ) : (
            <>
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">No events found in this category</h3>
                  <p className="text-gray-600 mb-4">Check back later or explore other categories.</p>
                  <Link to="/categories" className="text-culture-600 hover:text-culture-700 font-medium">
                    Browse all categories
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryEvents;
