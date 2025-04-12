import { supabase } from "@/integrations/supabase/client";

export interface HistoricalPlace {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  placeType: 'Temple' | 'Palace' | 'Monument' | 'Traditional Village' | 'Fort' | 'Archaeological Site';
  state: 'Tamil Nadu' | 'Kerala' | 'Karnataka' | 'Andhra Pradesh' | 'Telangana';
  city: string;
  period?: string;
  unesco?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  visitingHours?: string;
  entryFee?: string;
  highlights?: string[];
}

export const getHistoricalPlaces = async (): Promise<HistoricalPlace[]> => {
  try {
    const { data, error } = await supabase
      .from('historical_places')
      .select('*');
    
    if (error) {
      console.error('Error fetching historical places:', error);
      throw error;
    }
    
    return data.map((place): HistoricalPlace => ({
      id: place.id,
      name: place.name,
      description: place.description,
      longDescription: place.long_description || undefined,
      image: place.image,
      placeType: place.place_type as HistoricalPlace['placeType'],
      state: place.state as HistoricalPlace['state'],
      city: place.city,
      period: place.period || undefined,
      unesco: place.unesco || false,
      coordinates: place.coordinates ? {
        lat: place.coordinates.lat,
        lng: place.coordinates.lng
      } : undefined,
      visitingHours: place.visiting_hours || undefined,
      entryFee: place.entry_fee || undefined,
      highlights: place.highlights || undefined
    }));
  } catch (error) {
    console.error('Failed to fetch historical places:', error);
    // Return empty array in case of error to prevent app crash
    return [];
  }
};

export const getPlaceById = async (id: string): Promise<HistoricalPlace | undefined> => {
  try {
    const { data, error } = await supabase
      .from('historical_places')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching place by ID:', error);
      throw error;
    }
    
    if (!data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      longDescription: data.long_description || undefined,
      image: data.image,
      placeType: data.place_type as HistoricalPlace['placeType'],
      state: data.state as HistoricalPlace['state'],
      city: data.city,
      period: data.period || undefined,
      unesco: data.unesco || false,
      coordinates: data.coordinates ? {
        lat: data.coordinates.lat,
        lng: data.coordinates.lng
      } : undefined,
      visitingHours: data.visiting_hours || undefined,
      entryFee: data.entry_fee || undefined,
      highlights: data.highlights || undefined
    };
  } catch (error) {
    console.error('Failed to fetch place by ID:', error);
    return undefined;
  }
};

// Helper function to seed the database with sample data (for initial setup)
export const seedHistoricalPlaces = async (places: Omit<HistoricalPlace, 'id'>[]): Promise<void> => {
  try {
    // Transform the data to match Supabase table structure
    const supabasePlaces = places.map(place => ({
      name: place.name,
      description: place.description,
      long_description: place.longDescription || null,
      image: place.image,
      place_type: place.placeType,
      state: place.state,
      city: place.city,
      period: place.period || null,
      unesco: place.unesco || false,
      coordinates: place.coordinates ? {
        lat: place.coordinates.lat,
        lng: place.coordinates.lng
      } : null,
      visiting_hours: place.visitingHours || null,
      entry_fee: place.entryFee || null,
      highlights: place.highlights || null
    }));
    
    const { error } = await supabase
      .from('historical_places')
      .insert(supabasePlaces);
    
    if (error) {
      console.error('Error seeding historical places:', error);
      throw error;
    }
    
    console.log('Successfully seeded historical places');
  } catch (error) {
    console.error('Failed to seed historical places:', error);
  }
};

// Sample historical places data (keep as reference or for seeding)
export const southIndianPlaces: Omit<HistoricalPlace, 'id'>[] = [
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    description: "A historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.",
    longDescription: "The Meenakshi Temple is one of the oldest and most important temples in India. The complex houses 14 gateway towers called gopurams, ranging from 45-50m in height, the tallest being the southern tower. The temple complex has numerous shrines, with those of Meenakshi and Sundareshwar being the most prominent. The temple attracts over 15,000 visitors a day and around 25,000 on Fridays.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Madurai_Meenakshi_Amman_Temple.jpg",
    placeType: "Temple",
    state: "Tamil Nadu",
    city: "Madurai",
    period: "17th century (current structure)",
    coordinates: {
      lat: 9.9195,
      lng: 78.1193
    },
    visitingHours: "5:00 AM to 12:30 PM and 4:00 PM to 10:00 PM",
    entryFee: "Free (Camera fee applicable)",
    highlights: ["1000 pillar hall", "Musical pillars", "Golden lotus tank", "Hall of thousand pillars"]
  },
  {
    id: "hampi-ruins",
    name: "Hampi Ruins",
    description: "The ruins of Hampi represent the former capital of the Vijayanagara Empire. Surrounded by ancient temples, forts, and monuments, this UNESCO World Heritage site showcases remarkable architectural brilliance.",
    longDescription: "Hampi was the capital of the Vijayanagara Empire around 1500 CE, the second largest medieval era city in the world. The site spans over 26 square kilometers and contains numerous ruins, temples, and other structures. The ruins are divided into several zones, including the Sacred Centre, Royal Centre, and Urban Core.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hampi_virupaksha.jpg/1200px-Hampi_virupaksha.jpg",
    placeType: "Archaeological Site",
    state: "Karnataka",
    city: "Hampi",
    period: "14th-16th century CE",
    unesco: true,
    coordinates: {
      lat: 15.3350,
      lng: 76.4600
    },
    visitingHours: "6:00 AM to 6:00 PM",
    entryFee: "₹30 for Indians, ₹500 for foreigners",
    highlights: ["Virupaksha Temple", "Vittala Temple with Stone Chariot", "Queen's Bath", "Elephant Stables"]
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    description: "Also known as the Amba Vilas Palace, it is the former palace of the royal family of Mysore and is still their official residence. It is one of the most famous tourist attractions in India after the Taj Mahal.",
    longDescription: "The palace was commissioned in 1897, after the old palace was destroyed in a fire, and completed in 1912. It is a three-story stone structure with marble domes, and has a five-story tower. The palace is a blend of Hindu, Muslim, Rajput, and Gothic styles of architecture. It is an incredible sight when illuminated on Sundays and state holidays.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mysore_Palace_Morning.jpg/1200px-Mysore_Palace_Morning.jpg",
    placeType: "Palace",
    state: "Karnataka",
    city: "Mysore",
    period: "Early 20th century",
    coordinates: {
      lat: 12.3052,
      lng: 76.6551
    },
    visitingHours: "10:00 AM to 5:30 PM",
    entryFee: "₹70 for Indians, ₹200 for foreigners",
    highlights: ["Golden Throne", "Durbar Hall", "Kalyana Mantapa", "Sunday Illuminations"]
  },
  {
    id: "padmanabhapuram-palace",
    name: "Padmanabhapuram Palace",
    description: "The largest wooden palace in Asia and a classic example of Kerala architecture with intricate rosewood and teakwood carvings and traditional Kerala flooring.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Padmanabhapuram_palace.JPG",
    placeType: "Palace",
    state: "Kerala",
    city: "Padmanabhapuram",
    period: "16th-18th century",
    coordinates: {
      lat: 8.2544,
      lng: 77.3262
    }
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Shore Temple",
    description: "A complex of temples and monuments built by the Pallava dynasty in the 7th and 8th centuries. Famous for its intricate stone carvings and shore temple overlooking the Bay of Bengal.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mahabalipuram_shore_temple.jpg",
    placeType: "Monument",
    state: "Tamil Nadu",
    city: "Mahabalipuram",
    period: "7th-8th century",
    unesco: true,
    coordinates: {
      lat: 12.6169,
      lng: 80.1992
    }
  },
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    description: "An imposing fortress known for its acoustics, palaces, ingenious water supply system and the famous Fateh Rahben gun. It was the capital of the ancient Kingdom of Golconda.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Golconda_fort_panoramic_view_2.jpg",
    placeType: "Fort",
    state: "Telangana",
    city: "Hyderabad",
    period: "16th century",
    coordinates: {
      lat: 17.3833,
      lng: 78.4011
    }
  },
  {
    id: "wayanad",
    name: "Wayanad Heritage Village",
    description: "A cultural village showcasing the traditional lifestyle, architecture, and customs of various tribal communities of Wayanad. Visitors can experience the rich cultural heritage of indigenous tribes.",
    image: "https://www.keralatourism.org/images/destination/large/wayanad_heritage_museum20131031101840_275_1.jpg",
    placeType: "Traditional Village",
    state: "Kerala",
    city: "Wayanad",
    period: "Centuries-old traditions",
    coordinates: {
      lat: 11.6854,
      lng: 76.1320
    }
  },
  {
    id: "lepakshi-temple",
    name: "Lepakshi Temple",
    description: "A 16th-century temple of the Vijayanagara Empire known for its magnificent sculptures, murals, and the largest monolithic Nandi (bull) statue in India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Veerabhadra_temple_Lepakshi.jpg/1200px-Veerabhadra_temple_Lepakshi.jpg",
    placeType: "Temple",
    state: "Andhra Pradesh",
    city: "Lepakshi",
    period: "16th century",
    coordinates: {
      lat: 13.8016,
      lng: 77.6051
    }
  },
  {
    id: "chettinad",
    name: "Chettinad Mansions",
    description: "Magnificent palaces and mansions built by the Chettiar merchant community, known for their unique architectural style, elaborate woodwork, and imported materials from around the world.",
    image: "https://assets-news.housing.com/news/wp-content/uploads/2022/07/27013335/Chettinad-architecture-A-glance-at-the-magnificence-in-Tamil-Nadu-FB-1200x700-compressed.jpg",
    placeType: "Traditional Village",
    state: "Tamil Nadu",
    city: "Karaikudi",
    period: "19th-early 20th century",
    coordinates: {
      lat: 10.0731,
      lng: 78.7753
    }
  }
];
