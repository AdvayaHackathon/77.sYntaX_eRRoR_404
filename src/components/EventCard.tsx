
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Event } from '@/data/events';
import { Badge } from '@/components/ui/badge';
import { getCategoryInfo } from '@/data/categories';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  const categoryInfo = getCategoryInfo(event.category);
  
  // Format the date
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy');
  
  return (
    <div className={`event-card bg-white rounded-xl overflow-hidden shadow-md ${featured ? 'lg:flex' : ''}`}>
      <div className={`relative ${featured ? 'lg:w-1/2' : 'w-full'}`}>
        <img 
          src={event.image} 
          alt={event.title} 
          className={`w-full h-60 object-cover ${featured ? 'lg:h-full' : ''}`}
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${categoryInfo.color} text-white`}>
            {categoryInfo.name}
          </Badge>
        </div>
        {event.trending && (
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-festival-500 text-festival-700">
              Trending
            </Badge>
          </div>
        )}
      </div>
      
      <div className={`p-5 ${featured ? 'lg:w-1/2 lg:p-6' : ''}`}>
        <h3 className={`font-bold ${featured ? 'text-2xl mb-3' : 'text-xl mb-2'}`}>
          {event.title}
        </h3>
        
        <p className={`text-gray-600 ${featured ? 'mb-4' : 'mb-3'}`}>
          {event.description}
        </p>
        
        <div className="flex flex-col space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-culture-500" />
            <span>{formattedDate} • {event.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-culture-500" />
            <span>{event.location.name}, {event.location.city}, {event.location.country}</span>
          </div>
          
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-culture-500" />
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
              ))}
              {event.tags.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">+{event.tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {event.price.isFree ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>{event.price.formattedValue}</span>
            )}
          </div>
          
          <Link 
            to={`/event/${event.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-culture-600 text-white rounded-md hover:bg-culture-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
