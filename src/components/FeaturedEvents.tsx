
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { getFeaturedEvents, Event } from '@/data/events';
import { useToast } from "@/components/ui/use-toast";

const FeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const featuredEvents = await getFeaturedEvents();
        setEvents(featuredEvents);
      } catch (error) {
        console.error('Error loading featured events:', error);
        toast({
          title: "Error loading events",
          description: "There was a problem loading featured events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [toast]);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-heading">Featured Cultural Events</h2>
          <Link 
            to="/events" 
            className="flex items-center text-culture-600 hover:text-culture-700 font-medium"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-60 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No featured events found. Check back later!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
