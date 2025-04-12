// src/pages/Places.tsx
'use client';

import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Places = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-culture-900">Explore Cultural Places</h1>

        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover the hidden gems and historic spots across Karnataka. From majestic temples to ancient ruins, explore the essence of our rich culture!
        </p>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Hampi */}
          <Link to="/place/Hampi" className="block bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-culture-700 mb-2">Hampi</h3>
            <p className="text-gray-600 text-sm">
              An ancient village dotted with majestic ruins, temples, and rich heritage along the banks of the Tungabhadra River.
            </p>
          </Link>

          {/* Mysore Palace */}
          <Link to="/place/Mysore" className="block bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-culture-700 mb-2">Mysuru Palace</h3>
            <p className="text-gray-600 text-sm">
              A stunning Indo-Saracenic palace known for its grandeur, especially during Dussehra celebrations.
            </p>
          </Link>

          {/* Pattadakal */}
          <Link to="/place/Pattadakal" className="block bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-culture-700 mb-2">Pattadakal</h3>
            <p className="text-gray-600 text-sm">
              A UNESCO World Heritage Site showcasing Chalukyan architecture in a harmonious blend of northern and southern styles.
            </p>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Places;
