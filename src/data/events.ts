
import { EventCategory } from "./categories";
import { supabase } from "@/lib/supabase";

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  date: string;
  endDate?: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: {
    currency: string;
    value: number;
    formattedValue: string;
    isFree: boolean;
  };
  category: EventCategory;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}

// Function to convert database row to Event interface
const mapRowToEvent = (row: any): Event => {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    image: row.image_url,
    date: row.date,
    endDate: row.end_date,
    time: row.time,
    location: {
      name: row.location_name,
      address: row.location_address,
      city: row.location_city,
      country: row.location_country,
      coordinates: row.location_lat && row.location_lng 
        ? { lat: row.location_lat, lng: row.location_lng }
        : undefined,
    },
    price: {
      currency: row.price_currency,
      value: row.price_value,
      formattedValue: row.price_formatted,
      isFree: row.is_free,
    },
    category: row.category as EventCategory,
    tags: row.tags,
    featured: row.is_featured,
    trending: row.is_trending,
  };
};

// Fallback mock data for initial development
const generateMockEvents = (): Event[] => {
  return [
    {
      id: "evt-001",
      title: "Hampi Ustav",
      description: "Experience the magical ustav in Hampi with traditional ceremonies and cultural performances.",
      longDescription: "Hampi Utsav, also known as Vijaya Utsav, is a vibrant cultural festival held in Hampi, Karnataka, a UNESCO World Heritage Site. This three-day extravaganza typically takes place in February and showcases the region's rich heritage through music, dance, and art.",
      image: "https://media.assettype.com/TNIE%2Fimport%2F2023%2F1%2F28%2Foriginal%2FNew_scheme.jpg?w=1024&auto=format%2Ccompress&fit=max",
      date: "2025-02-28",
      endDate: "2025-03-2",
      time: "09:00",
      location: {
        name: "Hampi Ustav",
        address: "Hampi",
        city: "Hampi,Karntak",
        country: "India",
        coordinates: {
          lat: 35.7153,
          lng: 139.7713
        }
      },
      price: {
        currency: "JPY",
        value: 0,
        formattedValue: "Free",
        isFree: true
      },
      category: "festivals",
      tags: ["nature", "traditional", "spring", "family-friendly"],
      featured: true
    },
    {
      id: "evt-002",
      title: "Hanuman Jayanti",
      description: "This festival commemorates the birth of Lord Hanuman, revered for his strength and devotion. In many parts of India, including South India, devotees observe this day with temple visits, special prayers, and recitations of the Hanuman Chalisa. It's a time for spiritual reflection and community gatherings",
      longDescription: "Paris Fashion Week stands as one of the world's most influential fashion events, drawing designers, models, celebrities, and fashion enthusiasts from across the globe. This prestigious event showcases the latest haute couture and ready-to-wear collections from both established fashion houses and emerging designers. Attendees will have the opportunity to witness groundbreaking fashion trends before they reach the mainstream, all while experiencing the unparalleled ambiance of Paris, the world's fashion capital. Beyond the official runway shows, the city comes alive with exclusive parties, pop-up exhibitions, and street style photographers capturing the fashion elite. For cultural tourists, this event provides a unique window into the artistic and creative pulse of contemporary France and global fashion culture.",
      image: "https://img.freepik.com/premium-photo/hindu-lord-hanuman-ji-mediation-river-side-hanuman-ji-meditation-wallpaper_207225-3729.jpg",
      date: "2025-02-24",
      endDate: "2025-03-03",
      time: "10:00",
      location: {
        name: "Hanuman Jayahti",
        address: "Karnataka",
        city: "Karnataka",
        country: "India",
        coordinates: {
          lat: 48.8656,
          lng: 2.3125
        }
      },
      price: {
        currency: "INR",
        value: 350,
        formattedValue: "₹350",
        isFree: false
      },
      category: "arts",
      tags: ["fashion", "luxury", "design", "international"],
      trending: true
    },
    {
      id: "evt-003",
      title: "Diwali Festival of Lights",
      description: "Immerse yourself in India's most colorful and spiritual festival with traditional lamp lighting, fireworks and cultural performances.",
      longDescription: "Diwali, the Hindu Festival of Lights, transforms India into a spectacular canvas of illumination and celebration. This five-day festival symbolizes the triumph of light over darkness and good over evil. Visitors will be mesmerized by homes and buildings adorned with thousands of oil lamps (diyas) and colorful rangoli designs. The celebrations include spectacular fireworks displays, traditional music and dance performances, and a feast of authentic Indian sweets and dishes. Travelers will have the opportunity to participate in traditional religious ceremonies at beautifully decorated temples, shop at vibrant festival markets, and witness the unique regional variations of Diwali celebrations. This immersive cultural experience offers insight into Hindu spirituality, Indian hospitality, and the rich cultural heritage that makes this one of the world's most captivating festivals.",
      image: "https://images.asiahighlights.com/allpicture/2020/01/1ce7cfa94db040dcaa147143_cut_2560x800_296.jpg",
      date: "2025-11-12",
      time: "18:00",
      location: {
        name: "Various Locations",
        address: "City Center",
        city: "New Delhi",
        country: "India",
        coordinates: {
          lat: 28.6139,
          lng: 77.2090
        }
      },
      price: {
        currency: "INR",
        value: 0,
        formattedValue: "Free",
        isFree: true
      },
      category: "festivals",
      tags: ["religious", "cultural", "family-friendly", "spiritual"],
      featured: true
    },
    {
      id: "evt-004",
      title: "Onam",
      description: "Onam: A 10-day harvest festival celebrated in August or September, honoring King Mahabali's annual visit. It's marked by traditional dances like Kathakali, intricate flower arrangements (Pookkalam), and delicious feasts (Onam Sadya).",
      longDescription: "Onam: A 10-day harvest festival celebrated in August or September, honoring King Mahabali's annual visit. It's marked by traditional dances like Kathakali, intricate flower arrangements (Pookkalam), and delicious feasts (Onam Sadya).",
      image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/09/Punnamada-Lake.webp",
      date: "2025-11-01",
      endDate: "2025-11-02",
      time: "14:00",
      location: {
        name: "Onam",
        address: "Kerala",
        city: "kerala",
        country: "India",
        coordinates: {
          lat: 19.4326,
          lng: -99.1332
        }
      },
      price: {
        currency: "MXN",
        value: 0,
        formattedValue: "Free",
        isFree: true
      },
      category: "cultural",
      tags: ["traditional", "parade", "spiritual", "UNESCO"],
      trending: true
    },
    {
      id: "evt-005",
      title: "Pongal",
      description: "A 4-day harvest festival in January, thanking the Sun God for a bountiful harvest. It's celebrated with traditional dances, music, and feasting.",
      longDescription: "A 4-day harvest festival in January, thanking the Sun God for a bountiful harvest. It's celebrated with traditional dances, music, and feasting.",
      image: "https://nationaltoday.com/wp-content/uploads/2021/10/Pongal-1200x834.jpg",
      date: "2025-01-25",
      endDate: "2025-02-09",
      time: "All day",
      location: {
        name: "Pongal",
        address: "Tamilnadu",
        city: "TamilNadu",
        country: "India",
        coordinates: {
          lat: 45.4341,
          lng: 12.3388
        }
      },
      price: {
        currency: "INR",
        value: 0,
        formattedValue: "Free/Varies",
        isFree: false
      },
      category: "festivals",
      tags: ["historical", "masquerade", "medieval", "architecture"],
      featured: true
    },
    {
      id: "evt-006",
      title: "Edinburgh Festival Fringe",
      description: "Discover the world's largest arts festival with thousands of performances spanning theater, comedy, dance, and music.",
      longDescription: "The Edinburgh Festival Fringe represents the world's largest celebration of arts and culture, taking over Scotland's capital each August with a mind-boggling array of performances. Founded in 1947 as an alternative to the Edinburgh International Festival, the Fringe embodies an open-access policy where anyone with a venue and a show can participate. This democratic approach has made it an unparalleled incubator for creative talent, where unknown performers can share stages (literal and figurative) with established stars. With over 3,000 shows across 300+ venues ranging from historic theaters to converted basements, public parks, and even moving buses, the Fringe offers something for every taste. Visitors can experience cutting-edge theater, stand-up comedy, physical performance, music, children's shows, exhibitions, and countless performances that defy categorization. The festival transforms Edinburgh into a buzzing, 24-hour city where artistic innovation and cultural exchange happen on every corner, creating a unique atmosphere that draws art lovers from across the globe.",
      image: "https://images.unsplash.com/photo-1519834089823-11ca5f3fe31d",
      date: "2025-08-01",
      endDate: "2025-08-25",
      time: "Various",
      location: {
        name: "Various Venues",
        address: "City Center",
        city: "Edinburgh",
        country: "Scotland",
        coordinates: {
          lat: 55.9533,
          lng: -3.1883
        }
      },
      price: {
        currency: "INR",
        value: 150,
        formattedValue: "₹150",
        isFree: false
      },
      category: "arts",
      tags: ["theater", "comedy", "performance", "international"],
      trending: true
    },
    {
      id: "evt-007",
      title: "Ugadi",
      description: " The traditional New Year celebration in March or April, marked by decorating homes with mango leaves, preparing special dishes, and worshiping Lord Brahma and Lord Vishnu.",
      longDescription: " The traditional New Year celebration in March or April, marked by decorating homes with mango leaves, preparing special dishes, and worshiping Lord Brahma and Lord Vishnu.",
      image: "https://imagesvs.oneindia.com/img/2024/04/ugadi-1712219167.jpg",
      date: "2025-02-28",
      endDate: "2025-03-05",
      time: "Various",
      location: {
        name: "Ugadi",
        address: "AndraPradesh",
        city: "AndraPradesh",
        country: "India",
        coordinates: {
          lat: -22.9122,
          lng: -43.1965
        }
      },
      price: {
        currency: "INR",
        value: 200,
        formattedValue: "₹200",
        isFree: false
      },
      category: "festivals",
      tags: ["carnival", "dance", "music", "parades"],
      featured: true
    },
    {
      id: "evt-008",
      title: "Oktoberfest",
      description: "Join the world's largest beer festival featuring traditional Bavarian food, music, and over six million visitors.",
      longDescription: "Oktoberfest represents much more than the world's largest beer festival; it's a 16-day celebration of Bavarian culture that has maintained its authentic traditions since 1810. Originally held to celebrate a royal wedding, today's Oktoberfest welcomes over six million visitors to Munich's festival grounds (Theresienwiese). The event begins with a colorful parade of breweries and the ceremonial tapping of the first keg by Munich's mayor. Inside the massive festival tents, each operated by a different historic brewery, visitors experience traditional Bavarian hospitality while enjoying specially brewed Oktoberfest beer served in one-liter steins by staff in dirndls and lederhosen. Live bands play traditional oompah music alongside folk dances, while guests enjoy hearty Bavarian specialties like pretzels, roast chicken, and schweinshaxe (pork knuckle). Beyond the main festival grounds, visitors can explore special exhibitions on brewing history, traditional costume displays, and family-friendly attractions including carnival rides. Oktoberfest offers cultural tourists a joyful immersion into Bavarian traditions that have been carefully preserved while welcoming the world to participate.",
      image: "https://images.unsplash.com/photo-1605493725784-56d225ea39d9",
      date: "2025-09-20",
      endDate: "2025-10-05",
      time: "10:00",
      location: {
        name: "Theresienwiese",
        address: "Theresienwiese",
        city: "Munich",
        country: "Germany",
        coordinates: {
          lat: 48.1351,
          lng: 11.5494
        }
      },
      price: {
        currency: "INR",
        value: 0,
        formattedValue: "Free entry",
        isFree: true
      },
      category: "festivals",
      tags: ["beer", "traditional", "food", "folk music"],
      trending: true
    }
  ];
};

export const mockEvents = generateMockEvents();

export const getFeaturedEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_featured', true);
    
    if (error) {
      console.error('Error fetching featured events:', error);
      return mockEvents.filter(event => event.featured);
    }
    
    return data.map(mapRowToEvent);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return mockEvents.filter(event => event.featured);
  }
};

export const getTrendingEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_trending', true);
    
    if (error) {
      console.error('Error fetching trending events:', error);
      return mockEvents.filter(event => event.trending);
    }
    
    return data.map(mapRowToEvent);
  } catch (error) {
    console.error('Error fetching trending events:', error);
    return mockEvents.filter(event => event.trending);
  }
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching event by ID:', error);
      return mockEvents.find(event => event.id === id);
    }
    
    return mapRowToEvent(data);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    return mockEvents.find(event => event.id === id);
  }
};

export const getEventsByCategory = async (category: EventCategory): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category);
    
    if (error) {
      console.error('Error fetching events by category:', error);
      return mockEvents.filter(event => event.category === category);
    }
    
    return data.map(mapRowToEvent);
  } catch (error) {
    console.error('Error fetching events by category:', error);
    return mockEvents.filter(event => event.category === category);
  }
};

export const searchEvents = async (query: string): Promise<Event[]> => {
  try {
    const searchTerm = query.toLowerCase();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,location_city.ilike.%${searchTerm}%,location_country.ilike.%${searchTerm}%`);
    
    if (error) {
      console.error('Error searching events:', error);
      return mockEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.city.toLowerCase().includes(searchTerm) ||
        event.location.country.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    return data.map(mapRowToEvent);
  } catch (error) {
    console.error('Error searching events:', error);
    // Fall back to client-side search on the mock data
    const searchTerm = query.toLowerCase();
    return mockEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.city.toLowerCase().includes(searchTerm) ||
      event.location.country.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
};

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) {
      console.error('Error fetching all events:', error);
      return mockEvents;
    }
    
    return data.map(mapRowToEvent);
  } catch (error) {
    console.error('Error fetching all events:', error);
    return mockEvents;
  }
};
