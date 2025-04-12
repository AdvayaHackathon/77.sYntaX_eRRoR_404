
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlaceById, HistoricalPlace } from '@/data/places';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Landmark, MapPin, Clock, Ticket, ExternalLink, ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PlaceDetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<HistoricalPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlace = async () => {
      if (!placeId) return;

      try {
        setLoading(true);
        const placeData = await getPlaceById(placeId);
        
        if (placeData) {
          setPlace(placeData);
        } else {
          toast({
            title: "Place not found",
            description: "The place you're looking for doesn't exist or has been removed.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
        toast({
          title: "Error loading place details",
          description: "There was a problem loading the place details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-heritage-800 mb-4">Place Not Found</h1>
            <p className="text-gray-600 mb-8">
              The historical place you're looking for doesn't exist or may have been removed.
            </p>
            <Button asChild>
              <Link to="/places">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to All Places
              </Link>
            </Button>
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
        <div className="bg-heritage-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/places" 
                className="text-heritage-300 hover:text-white flex items-center w-fit"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Historical Places
              </Link>
              <h1 className="text-4xl font-bold">{place.name}</h1>
              <div className="flex items-center space-x-4">
                <Badge className="bg-heritage-700 hover:bg-heritage-800">
                  {place.placeType}
                </Badge>
                <div className="flex items-center text-heritage-300">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{place.city}, {place.state}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-heritage-800 mb-4">About</h2>
              <p className="text-gray-700 mb-6">{place.description}</p>
              
              {place.longDescription && (
                <p className="text-gray-700 mb-6">{place.longDescription}</p>
              )}
              
              {place.highlights && place.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-heritage-700 mb-3">Highlights</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {place.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-700">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-heritage-800 mb-4">Information</h3>
                
                <div className="space-y-4">
                  {place.period && (
                    <div className="flex items-start">
                      <Landmark className="h-5 w-5 text-heritage-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Period</p>
                        <p className="text-gray-600">{place.period}</p>
                      </div>
                    </div>
                  )}
                  
                  {place.unesco !== undefined && (
                    <div className="flex items-start">
                      <ExternalLink className="h-5 w-5 text-heritage-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">UNESCO World Heritage</p>
                        <p className="text-gray-600">{place.unesco ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  )}
                  
                  {place.visitingHours && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-heritage-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Visiting Hours</p>
                        <p className="text-gray-600">{place.visitingHours}</p>
                      </div>
                    </div>
                  )}
                  
                  {place.entryFee && (
                    <div className="flex items-start">
                      <Ticket className="h-5 w-5 text-heritage-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Entry Fee</p>
                        <p className="text-gray-600">{place.entryFee}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-heritage-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{place.city}, {place.state}</p>
                  </div>
                </div>
                
                {place.coordinates && (
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${place.coordinates?.lat},${place.coordinates?.lng}`, '_blank');
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Google Maps
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="bg-heritage-50 rounded-xl p-6 border border-heritage-100">
                <h3 className="text-xl font-semibold text-heritage-800 mb-2">Nearby Places</h3>
                <p className="text-gray-600 mb-4">Explore other historical places in {place.state}</p>
                <Button 
                  asChild
                  className="w-full"
                >
                  <Link to={`/places?state=${place.state}`}>
                    View All in {place.state}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceDetailPage;
