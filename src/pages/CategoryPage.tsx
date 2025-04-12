
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { getEventsByCategory, Event } from '@/data/events';
import { EventCategory, getCategoryInfo } from '@/data/categories';
import { useToast } from "@/components/ui/use-toast";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadEvents = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        const categoryEvents = await getEventsByCategory(categoryId as EventCategory);
        setEvents(categoryEvents);
      } catch (error) {
        console.error(`Error loading ${categoryId} events:`, error);
        toast({
          title: "Error loading events",
          description: `There was a problem loading ${categoryId} events. Please try again later.`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [categoryId, toast]);

  const category = categoryId ? getCategoryInfo(categoryId as EventCategory) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">{category?.name || 'Category'} Events</h1>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                    <div className="h-60 bg-gray-200"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
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
                    <p className="text-gray-500">No events found in this category. Check back later!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
