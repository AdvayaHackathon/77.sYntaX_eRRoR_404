
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { getFeaturedEvents, Event } from '@/data/events';

const FeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setEvents(getFeaturedEvents());
  }, []);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
