
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-culture-800 to-culture-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">About CultureVoyager</h1>
            <p className="text-xl opacity-90 max-w-3xl">
              Connecting travelers with authentic cultural experiences around the world.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-culture-900">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At CultureVoyager, we believe that the most meaningful travel experiences come from authentic cultural immersion. Our mission is to connect travelers with local festivals, ceremonies, and cultural events that provide genuine insights into the world's diverse traditions and heritage.
              </p>
              <p className="text-lg text-gray-700">
                We strive to make cultural tourism more accessible, sustainable, and enriching for both travelers and the communities they visit. By highlighting authentic cultural events, we aim to foster cross-cultural understanding and preserve invaluable intangible cultural heritage.
              </p>
            </section>
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-culture-900">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-festival-700">Curated Cultural Events</h3>
                  <p className="text-gray-700">
                    We carefully select and verify cultural events to ensure they offer authentic and respectful experiences that represent local traditions and practices.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-festival-700">Comprehensive Information</h3>
                  <p className="text-gray-700">
                    Each event listing includes detailed information about the cultural significance, what to expect, and practical travel tips to enhance your experience.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-festival-700">Global Coverage</h3>
                  <p className="text-gray-700">
                    From major international festivals to intimate local ceremonies, we cover cultural events across six continents and dozens of countries.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3 text-festival-700">Community Connection</h3>
                  <p className="text-gray-700">
                    We facilitate connections between travelers and local communities, creating opportunities for meaningful cultural exchange.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-culture-900">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                CultureVoyager was founded in 2023 by a group of passionate travelers and cultural anthropologists who recognized the need for a dedicated platform connecting tourists with authentic cultural experiences. 
              </p>
              <p className="text-lg text-gray-700 mb-4">
                After years of travel across diverse cultures, our founders observed that many tourists struggled to discover and access meaningful cultural events, while simultaneously, many traditional events faced declining attendance and recognition.
              </p>
              <p className="text-lg text-gray-700">
                CultureVoyager was created to bridge this gap, using technology to preserve and promote cultural heritage while enhancing the travel experience for culturally-minded explorers.
              </p>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold mb-6 text-culture-900">Join Our Community</h2>
              <p className="text-lg text-gray-700 mb-6">
                CultureVoyager is more than just a platform—it's a community of passionate cultural explorers. Join us in celebrating and preserving the world's rich cultural heritage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="bg-culture-600 hover:bg-culture-700 text-white font-medium py-3 px-6 rounded-md text-center transition">
                  Subscribe to Newsletter
                </a>
                <a href="#" className="bg-white border border-culture-600 text-culture-600 hover:bg-culture-50 font-medium py-3 px-6 rounded-md text-center transition">
                  Follow Our Social Media
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
