
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CategoryCard from './CategoryCard';
import { categories } from '@/data/categories';

const CategoriesSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-heading">Explore by Category</h2>
          <Link 
            to="/categories" 
            className="flex items-center text-culture-600 hover:text-culture-700 font-medium"
          >
            All categories <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
