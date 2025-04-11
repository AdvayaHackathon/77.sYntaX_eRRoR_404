
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { getTrendingEvents, Event } from '@/data/events';
import { useToast } from "@/components/ui/use-toast";

const TrendingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const trendingEvents = await getTrendingEvents();
        setEvents(trendingEvents);
      } catch (error) {
        console.error('Error loading trending events:', error);
        toast({
          title: "Error loading events",
          description: "There was a problem loading trending events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [toast]);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-heading">Trending Now</h2>
            <Link 
              to="/trending" 
              className="flex items-center text-culture-600 hover:text-culture-700 font-medium"
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-60 lg:h-80 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-heading">Trending Now</h2>
          <Link 
            to="/trending" 
            className="flex items-center text-culture-600 hover:text-culture-700 font-medium"
          >
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {events.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingEvents;
