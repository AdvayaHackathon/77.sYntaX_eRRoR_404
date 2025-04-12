
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { HistoricalPlace } from "@/data/places";

interface PlacesTableProps {
  places: HistoricalPlace[];
}

const PlacesTable = ({ places }: PlacesTableProps) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>A list of historical places in South India</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>UNESCO</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map((place) => (
            <TableRow key={place.id}>
              <TableCell className="font-medium">{place.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{place.placeType}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{place.city}, {place.state}</span>
                </div>
              </TableCell>
              <TableCell>{place.period || "N/A"}</TableCell>
              <TableCell>{place.unesco ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Link 
                  to={`/places/${place.id}`}
                  className="text-heritage-600 hover:text-heritage-800 text-sm font-medium flex items-center"
                >
                  View <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlacesTable;
