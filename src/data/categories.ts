
export type EventCategory = 'festivals' | 'arts' | 'cultural' | 'food' | 'music' | 'historical';

export interface CategoryInfo {
  id: EventCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'festivals',
    name: 'Festivals & Celebrations',
    description: 'Traditional and modern festivals from around the world',
    icon: 'party-popper',
    color: 'bg-festival-500'
  },
  {
    id: 'arts',
    name: 'Arts & Exhibitions',
    description: 'Visual and performing arts events and exhibitions',
    icon: 'palette',
    color: 'bg-culture-500'
  },
  {
    id: 'cultural',
    name: 'Cultural Ceremonies',
    description: 'Traditional ceremonies and cultural practices',
    icon: 'landmark',
    color: 'bg-culture-700'
  },
  {
    id: 'food',
    name: 'Food & Culinary',
    description: 'Food festivals, cooking classes, and culinary tours',
    icon: 'utensils',
    color: 'bg-heritage-500'
  },
  {
    id: 'music',
    name: 'Music & Dance',
    description: 'Traditional and contemporary music and dance performances',
    icon: 'music',
    color: 'bg-festival-700'
  },
  {
    id: 'historical',
    name: 'Historical Reenactments',
    description: 'Living history events and historical commemorations',
    icon: 'hourglass',
    color: 'bg-heritage-700'
  }
];

export const getCategoryInfo = (categoryId: EventCategory): CategoryInfo => {
  return categories.find(cat => cat.id === categoryId) || categories[0];
};
