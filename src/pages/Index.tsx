
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import TrendingEvents from '@/components/TrendingEvents';
import CategoriesSection from '@/components/CategoriesSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedEvents />
        <TrendingEvents />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
