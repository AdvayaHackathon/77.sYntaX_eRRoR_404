
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { getTrendingEvents, Event } from '@/data/events';

const TrendingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setEvents(getTrendingEvents());
  }, []);

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
