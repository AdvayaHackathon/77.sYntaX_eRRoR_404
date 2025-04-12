
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceCard from '@/components/PlaceCard';
import PlacesTable from '@/components/PlacesTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Filter, Grid, List, Database } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getHistoricalPlaces, seedHistoricalPlaces, southIndianPlaces, HistoricalPlace } from '@/data/places';

const HistoricalPlacesPage = () => {
  const [places, setPlaces] = useState<HistoricalPlace[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<HistoricalPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        const historicalPlaces = await getHistoricalPlaces();
        setPlaces(historicalPlaces);
        setFilteredPlaces(historicalPlaces);
      } catch (error) {
        console.error('Error loading historical places:', error);
        toast({
          title: "Error loading places",
          description: "There was a problem loading historical places. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPlaces();
  }, [toast]);

  useEffect(() => {
    let result = places;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(place => 
        place.name.toLowerCase().includes(query) || 
        place.description.toLowerCase().includes(query) ||
        place.city.toLowerCase().includes(query)
      );
    }
    
    if (selectedState !== 'all') {
      result = result.filter(place => place.state === selectedState);
    }
    
    setFilteredPlaces(result);
  }, [searchQuery, selectedState, places]);

  const getUniqueStates = () => {
    const states = places.map(place => place.state);
    return ['all', ...Array.from(new Set(states))];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSeedDatabase = async () => {
    if (places.length > 0) {
      toast({
        title: "Database already has data",
        description: "The database already contains historical places data.",
        variant: "default",
      });
      return;
    }

    try {
      setSeeding(true);
      await seedHistoricalPlaces(southIndianPlaces);
      toast({
        title: "Database seeded successfully",
        description: "Sample historical places have been added to the database.",
        variant: "default",
      });
      // Reload the data
      const historicalPlaces = await getHistoricalPlaces();
      setPlaces(historicalPlaces);
      setFilteredPlaces(historicalPlaces);
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error seeding database",
        description: "There was a problem adding sample data to the database.",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-heritage-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Historical & Traditional Places</h1>
            <p className="text-xl max-w-3xl">
              Discover the rich cultural heritage of South India through its magnificent temples, 
              palaces, monuments, and traditional villages.
            </p>
          </div>
        </div>
        
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search historical places..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="w-full md:w-64">
              <Select
                value={selectedState}
                onValueChange={(value) => setSelectedState(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === 'card' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('card')}
                title="Card view"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('table')}
                title="Table view"
              >
                <List className="h-5 w-5" />
              </Button>
              {places.length === 0 && !loading && (
                <Button
                  variant="outline"
                  onClick={handleSeedDatabase}
                  disabled={seeding}
                  className="ml-2"
                  title="Seed database with sample data"
                >
                  <Database className="h-5 w-5 mr-2" />
                  {seeding ? 'Seeding...' : 'Seed Database'}
                </Button>
              )}
            </div>
          </div>
          
          {!searchQuery && selectedState === 'all' && !loading && viewMode === 'card' && places.length > 0 ? (
            <div className="space-y-10">
              {['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'].map(state => {
                const statePlaces = places.filter(place => place.state === state);
                
                if (statePlaces.length === 0) return null;
                
                return (
                  <div key={state} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-heritage-800">{state}</h2>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedState(state)}
                        className="text-heritage-600 border-heritage-600 hover:bg-heritage-50"
                      >
                        View All in {state}
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {statePlaces.slice(0, 3).map((place) => (
                        <PlaceCard key={place.id} place={place} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
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
                <>
                  {places.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-2xl font-medium text-gray-700 mb-2">No places found in the database</h3>
                      <p className="text-gray-500 mb-6">
                        There are no historical places in the database yet. Click the "Seed Database" button to add sample data.
                      </p>
                    </div>
                  ) : filteredPlaces.length > 0 ? (
                    <>
                      {selectedState !== 'all' && (
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-heritage-800 mb-4">
                            {selectedState} Historical Places
                          </h2>
                        </div>
                      )}
                      
                      {viewMode === 'card' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredPlaces.map((place) => (
                            <PlaceCard key={place.id} place={place} />
                          ))}
                        </div>
                      ) : (
                        <PlacesTable places={filteredPlaces} />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-2xl font-medium text-gray-700 mb-2">No places found</h3>
                      <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
                      <Button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedState('all');
                        }}
                        variant="outline"
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HistoricalPlacesPage;
