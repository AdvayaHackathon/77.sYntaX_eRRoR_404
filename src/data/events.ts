
import { EventCategory } from "./categories";

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
      title: "Basavanagudi Kadalekai Parishe",
      description: "The Bengaluru Karaga is a vibrant 9-day festival rooted in centuries-old traditions of the Thigala community—a Tamil-speaking group of gardeners. This spectacular celebration unfolds at the Sri Dharmaraya Swamy Temple in Nagarathpete, Bengaluru.",
      longDescription: "Bengaluru Karaga Overview The Bengaluru Karaga is a vibrant 9-day festival rooted in centuries-old traditions of the Thigala community—a Tamil-speaking group of gardeners. This spectacular celebration unfolds at the Sri Dharmaraya Swamy Temple in Nagarathpete, Bengaluru. Celebrated during March–April on the full moon day of Chaitra Masa (as per the Hindu calendar), the Karaga is known for its striking rituals and deep symbolic meanings.Key Highlights The Karaga Procession .The central event takes place after dusk on Karaga day.A male priest, dressed in female attire, carries a flower-adorned pyramid (Karaga) on his head.He leads a grand procession that features swordplay by bare-chested, dhoti-clad Thigalars.A significant stop during the procession is the tomb of an 18th-century Muslim saint, symbolizing Hindu-Muslim unity.Mythological Origins Rooted in the Mahabharata, the festival commemorates Draupadi's return as Adishakti.Legend says that Draupadi created Veera Kumaras (brave sons) to battle the demon Timirasura.The Veera Kumaras, unwilling to part from her, were promised her return each year on this special day.Cultural Significance Celebrates feminine divine power (Shakti).Showcases interfaith harmony.An unbroken tradition passed down for generations within the Thigala community.When Is It Celebrated?Falls on the full moon day (Purnima) of Chaitra Masa (usually March or April).For example, the 2020 edition began on 8th April 2020.Where Does It Begin?Sri Dharmaraya Swamy Temple, Nagarathpete, Bengaluru.Distance from:Kempegowda International Airport – 37 km Majestic (City Centre) – 5 km Where to Stay Nearby areas like KR Market and Gandhi Nagar offer a range of accommodation options within walking distance of the temple.Saturday, April 12, 2025",
      image: "https://indianexpress.com/wp-content/uploads/2022/11/Kadalekai-Parishe-incopy1.jpeg",
      date: "2025-08-01",
      endDate: "2025-08-25",
      time: "Various",
      location: {
        name: "Parishe",
        address: "Karnataka",
        city: "Karnataka",
        country: "India",
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
      title: "Bengaluru Karaga",
      description: "The Bengaluru Karaga is a vibrant 9-day festival rooted in centuries-old traditions of the Thigala community—a Tamil-speaking group of gardeners. This spectacular celebration unfolds at the Sri Dharmaraya Swamy Temple in Nagarathpete, Bengaluru.",
      longDescription: "Bengaluru Karaga is a vibrant 9-day festival rooted in centuries-old traditions of the Thigala community—a Tamil-speaking group of gardeners—celebrated at the Sri Dharmaraya Swamy Temple in Nagarathpete, Bengaluru, during March–April on the full moon day of Chaitra Masa (as per the Hindu calendar), known for its striking rituals and deep symbolic meanings; the central event is the Karaga procession held after dusk where a male priest, dressed in female attire, carries a flower-adorned pyramid (Karaga) on his head and leads a grand procession with swordplay by bare-chested, dhoti-clad Thigalars, making a significant stop at the tomb of an 18th-century Muslim saint, symbolizing Hindu-Muslim unity; mythologically rooted in the Mahabharata, the festival commemorates Draupadi’s return as Adishakti, where she created Veera Kumaras to battle the demon Timirasura and promised them her return every year; it celebrates feminine divine power (Shakti), showcases interfaith harmony, and represents an unbroken tradition within the Thigala community; it is celebrated on the full moon day (Purnima) of Chaitra Masa (usually March or April)—for instance, the 2020 edition began on 8th April 2020—and begins at Sri Dharmaraya Swamy Temple, Nagarathpete, Bengaluru, which is 37 km from Kempegowda International Airport and 5 km from Majestic (City Centre), with nearby areas like KR Market and Gandhi Nagar offering various accommodation options within walking distance of the temple; in 2025, it is celebrated on Saturday, April 12.",
      image: "https://darter.in/wp-content/uploads/2013/11/karaga-bangalore-k2.jpg",
      date: "2025-09-20",
      endDate: "2025-10-05",
      time: "10:00",
      location: {
        name: "Bengaluru Karaga",
        address: "Bengaluru",
        city: "Karnataka",
        country: "India",
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

export const getFeaturedEvents = (): Event[] => {
  return mockEvents.filter(event => event.featured);
};

export const getTrendingEvents = (): Event[] => {
  return mockEvents.filter(event => event.trending);
};

export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return mockEvents.filter(event => event.category === category);
};

export const searchEvents = (query: string): Event[] => {
  const searchTerm = query.toLowerCase();
  return mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm) ||
    event.description.toLowerCase().includes(searchTerm) ||
    event.location.city.toLowerCase().includes(searchTerm) ||
    event.location.country.toLowerCase().includes(searchTerm) ||
    event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
