
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Landmark, MapPin } from 'lucide-react';
import { HistoricalPlace } from '@/data/places';

interface PlaceCardProps {
  place: HistoricalPlace;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {place.unesco && (
          <Badge 
            className="absolute top-3 right-3 bg-heritage-700 hover:bg-heritage-800"
          >
            UNESCO Site
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
          <Badge variant="outline" className="bg-gray-50">
            {place.placeType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{place.city}, {place.state}</span>
        </div>
        
        <p className="text-gray-600 line-clamp-3 mb-2">{place.description}</p>
        
        {place.period && (
          <div className="flex items-center text-gray-500 text-sm">
            <Landmark className="h-4 w-4 mr-1" />
            <span>{place.period}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/places/${place.id}`}
          className="text-heritage-600 hover:text-heritage-800 text-sm font-medium"
        >
          Learn more →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
