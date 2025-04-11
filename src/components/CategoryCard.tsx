
import { Link } from 'react-router-dom';
import { 
  Palette, Music, Utensils, Landmark, PartyPopper, Hourglass
} from 'lucide-react';
import { CategoryInfo } from '@/data/categories';

interface CategoryCardProps {
  category: CategoryInfo;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  // Map category icons to Lucide components
  const getIcon = () => {
    switch(category.icon) {
      case 'palette':
        return <Palette className="h-8 w-8 text-white" />;
      case 'music':
        return <Music className="h-8 w-8 text-white" />;
      case 'utensils':
        return <Utensils className="h-8 w-8 text-white" />;
      case 'landmark':
        return <Landmark className="h-8 w-8 text-white" />;
      case 'party-popper':
        return <PartyPopper className="h-8 w-8 text-white" />;
      case 'hourglass':
        return <Hourglass className="h-8 w-8 text-white" />;
      default:
        return <Landmark className="h-8 w-8 text-white" />;
    }
  };

  return (
    <Link to={`/category/${category.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className={`${category.color} p-6 flex justify-center`}>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            {getIcon()}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2 group-hover:text-culture-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
