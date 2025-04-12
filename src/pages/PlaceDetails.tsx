// src/pages/PlaceDetails.tsx

import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Local static data for different places
const placeData: Record<string, { title: string; description: string }> = {
  Hampi: {
    title: 'Hampi',
    description: `
🌄 What is Hampi?
Hampi is an ancient village in the southern state of Karnataka, India. It was once the capital of the mighty Vijayanagara Empire in the 14th century and is now a UNESCO World Heritage Site.

🏰 Why is it Famous?
- Ruins of Vijayanagara Empire: Magnificent temples, palaces, and market streets.
- Stunning Architecture: Dravidian style mixed with Indo-Islamic elements.
- Boulders and Landscapes: Surreal scenery with giant granite rocks everywhere.
- Spiritual Vibes: Many temples are still active pilgrimage spots.

🔥 Must-Visit Spots in Hampi:
- Virupaksha Temple – Oldest functioning temple (dedicated to Lord Shiva).
- Vijaya Vittala Temple – Famous for the stone chariot and musical pillars.
- Hemakuta Hill – Perfect for sunrise/sunset views.
- Lotus Mahal – Beautiful Indo-Islamic architecture.
- Elephant Stables – Massive and elegant structure for royal elephants.
- Matanga Hill – Top spot for panoramic views.

🏞️ Activities You Can Do:
- Climb boulders 🧗
- Watch sunsets 🌅
- Explore ruins like an adventurer 🏛️
- Coracle boat ride in the Tungabhadra river 🚣
- Rent a cycle/scooter and roam free 🛵

🗺️ How to Reach:
- Nearest Town: Hospet (13 km away)
- By Train: Hospet Junction is the closest railway station.
- By Road: Well-connected via buses and taxis.
- By Air: Closest airport is in Hubli or Bengaluru (with further road/train travel).

🧳 Travel Tips:
- Best time: October to February (cool weather).
- Stay: You’ll find homestays, guesthouses, and resorts on both sides of the river (Hampi side & Hippie Island).
- Carry cash: Card/UPI might not work everywhere.
- Dress modestly when visiting temples.
`,
  },

  Mysore: {
    title: 'Mysore Palace',
    description: `
🏰 What is Mysore Palace?
Mysuru Palace is the official residence of the Wadiyar dynasty, the royal family of Mysuru. It's located right in the heart of Mysuru city, Karnataka. This iconic palace is a stunning blend of Hindu, Mughal, Rajput, and Gothic styles – known as the Indo-Saracenic style.

🏰 Why is it Famous?
- Massive architecture with domes, arches, pillars, and intricate interiors.
- Golden throne, Belgian glass chandeliers, and ornate ceilings.
- Dussehra celebrations here are legendary – with a royal procession, elephants, and lights.
- Fully illuminated with 97,000+ bulbs every evening during festivals!

🔥 Highlights Inside the Palace:
- Kalyana Mantapa – The grand marriage hall with stained glass ceilings.
- Ambavilasa (Durbar Hall) – Used by the Maharajas to receive guests; filled with gold and mirrors.
- Gombe Thotti (Doll’s Pavilion) – Royal collection of dolls, sculptures, and souvenirs.
- Royal Portrait Gallery – Paintings of the Wadiyar kings.
- Weapon room – Swords, spears, and ancient arms on display.

📍 Location:
- Situated in Mysuru city, Karnataka.
- About 145 km from Bengaluru (can be reached via train, bus, or car).

⏰ Timings & Entry:
- Open daily: 10 AM to 5:30 PM
- Entry Fee:
  - Indian Adults: ₹100
  - Foreigners: ₹200
  - Students (with ID): Discounts available
- Palace Illumination: Sundays & public holidays, from 7 PM to 7:45 PM

📸 Tips for Visitors:
- Photography not allowed inside main halls (except with permission or on special days).
- Best time to visit: Evenings or during Dussehra Festival (September–October).
- Footwear must be removed before entering.

⚡ Fun Fact:
The current palace was built in 1912 after the old one got burnt down during a royal wedding in 1897. It was designed by British architect Henry Irwin.
`,
  },

  Pattadakal: {
    title: 'Pattadakal',
    description: `
🛕 What is Pattadakal?
Pattadakal is a small town in Bagalkot district, Karnataka. It's a UNESCO World Heritage Site known for its incredible group of temples built during the Chalukya dynasty around the 7th to 8th century.

📜 Why is it Famous?
- It was a royal coronation site for the Chalukya kings.
- The architecture is a mix of Dravidian (South Indian) and Nagara (North Indian) styles — a rare combo!
- It showcases the evolution of early temple architecture in India.

🔥 Must-Visit Temples in Pattadakal:
- Virupaksha Temple – The grandest, built by Queen Lokamahadevi to celebrate her husband’s victory.
- Mallikarjuna Temple – Similar in style to Virupaksha, built by another queen.
- Papanatha Temple – Blends both Dravidian and Nagara styles.
- Sangameshwara Temple – One of the oldest in the complex.
- Jambulinga, Galaganatha, and Kashi Vishwanatha Temples – Smaller, with unique carvings and architecture.

🎨 What’s Cool About Pattadakal?
- Incredible stone carvings of gods, goddesses, mythical creatures, and battle scenes.
- You get to see two architectural styles in one place.
- The whole complex is like an open-air museum for ancient Indian temple art.

🗺️ How to Reach:
- Nearest town: Badami (22 km away)
- By Train: Badami Railway Station is the closest.
- By Road: Well-connected by buses and taxis.
- By Air: Nearest airport is Hubli (~130 km away).

🧳 Travel Tips:
- Best time to visit: October to March (pleasant weather).
- Combine with Badami (cave temples) and Aihole (cradle of temple architecture).
- A day trip is enough, but history lovers might want to stay longer.
`,
  },
};

const PlaceDetails = () => {
  const { name } = useParams<{ name: string }>();
  const place = placeData[name || ''];

  if (!place) {
    return <div className="text-center py-20">Place not found 😢</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-culture-900 text-center">
          {place.title}
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200">
          <div className="space-y-4 text-lg text-gray-800 leading-relaxed">
            {place.description.split('\n').map((line, index) => {
              const trimmedLine = line.trim();
              const isHeader = /^[🌄🏰🔥🏞️🗺️🧳📜🎨📍⏰📸⚡🛕]+/.test(trimmedLine);
              const isBullet = /^- /.test(trimmedLine);

              if (isHeader) {
                return (
                  <div
                    key={index}
                    className="font-bold text-culture-800 text-xl mt-6"
                  >
                    {trimmedLine}
                  </div>
                );
              } else if (isBullet) {
                return (
                  <div
                    key={index}
                    className="pl-4 before:content-['•'] before:mr-2 before:text-culture-600"
                  >
                    {trimmedLine.slice(2)}
                  </div>
                );
              } else if (trimmedLine.length > 0) {
                return <div key={index}>{trimmedLine}</div>;
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceDetails;
