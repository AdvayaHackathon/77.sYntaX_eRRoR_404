
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, Info, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getEventById, Event } from '@/data/events';
import { getCategoryInfo } from '@/data/categories';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const foundEvent = getEventById(id);
      setEvent(foundEvent || null);
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading event details...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the event you're looking for.</p>
            <Link to="/" className="text-culture-600 hover:text-culture-700">
              Return to homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const categoryInfo = getCategoryInfo(event.category);
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');
  const formattedEndDate = event.endDate 
    ? format(new Date(event.endDate), 'MMMM d, yyyy')
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="w-full h-[400px] md:h-[500px] relative" 
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to events
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className={`${categoryInfo.color} text-white`}>{categoryInfo.name}</Badge>
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-white/10 text-white border-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Event details section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-lg text-gray-700 mb-6">{event.description}</p>
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-line">{event.longDescription || event.description}</p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="mb-6">
                  <div className="text-xl font-bold mb-2">
                    {event.price.isFree ? (
                      <span className="text-green-600">Free Event</span>
                    ) : (
                      <span>From {event.price.formattedValue}</span>
                    )}
                  </div>
                  <Link to={`/tickets/${event.id}`}>
  <button className="w-full bg-culture-600 hover:bg-culture-700 text-white font-medium py-3 px-4 rounded-md transition">
    Get Tickets
  </button>
</Link>



                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-culture-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Date & Time</h4>
                      <p>{formattedDate}</p>
                      {formattedEndDate && <p>to {formattedEndDate}</p>}
                      <p className="mt-1">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-culture-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p>{event.location.name}</p>
                      <p>{event.location.address}</p>
                      <p>{event.location.city}, {event.location.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Info className="h-5 w-5 text-culture-500 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Organizer</h4>
                      <p>CultureVoyager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
