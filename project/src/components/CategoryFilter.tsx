import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: 'amazing-views',
    name: 'Amazing views',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M28 4a4 4 0 0 0-4 4 3.91 3.91 0 0 0 .56 2H16.5c-1.22-1.75-3.15-3-5.5-3A7 7 0 0 0 4 14c0 1.41.42 2.72 1.13 3.83L1.94 21l1.12 1 3.45-3.44a6.94 6.94 0 0 0 4.78 2.36L8 24.11V30h2v-6.5l3.5-3.5h7c3.86 0 7-3.14 7-7h2V8a4 4 0 0 0-1.5-3.11A3.5 3.5 0 0 0 28 4zm-18 13a5 5 0 0 1 0-10 5 5 0 0 1 5 5 4.85 4.85 0 0 1-1.39 3.41A4.94 4.94 0 0 1 10 17zm10-2a5 5 0 0 1-4.9-4H24a5 5 0 0 1-4 4z" />
      </svg>
    ),
  },
  {
    id: 'beach',
    name: 'Beach',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M28 18v-2h-3v-4a9 9 0 0 0-9-9 9 9 0 0 0-9 9v4H4v2h24zM9 12V9a7 7 0 0 1 7-7 7 7 0 0 1 7 7v3H9z" />
        <path d="M21 5h2v4h-2zm-4 0h2v4h-2zm-4 0h2v4h-2zM2 30h28v-6H2v6zm26-4v2H4v-2h24z" />
      </svg>
    ),
  },
  {
    id: 'tiny-homes',
    name: 'Tiny homes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M28 14.69l-1-1V10a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v.59l-5-5a2 2 0 0 0-2.82 0l-11 11A2 2 0 0 0 0 17.4v.6a2 2 0 0 0 2 2h2v9a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-9h2a2 2 0 0 0 2-2v-.6a2 2 0 0 0-.58-1.41zM26 10v2.36l-4-4V10h4zM5.7 17.71l11-11a.39.39 0 0 1 .6 0l11 11a.39.39 0 0 1 0 .6.4.4 0 0 1-.3.1H6a.4.4 0 0 1-.3-.1.39.39 0 0 1 0-.6zM26 28H6v-8h20v8z" />
      </svg>
    ),
  },
  {
    id: 'mountains',
    name: 'Mountains',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M32 6v26h-32v-26h32zM24.2 20.483l-3.2-3.2v-9.283c0-.217-.166-.4-.383-.4h-4.4l-.017-.1c0 .066-.017.133-.067.183l-7.067 7.067c-.133.133-.133.35 0 .483l15.133 15.133v-9.883zM13.8 8.117l-12.417 12.417-.517.517c-.133.133-.133.35 0 .483l15.133 15.133v-19.65l-1.75-1.75c-.133-.133-.133-.35 0-.483l4.317-4.317h-4.483c-.1 0-.183-.033-.25-.1z" />
      </svg>
    ),
  },
  {
    id: 'cabins',
    name: 'Cabins',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M25 25h-2v-6a3 3 0 0 0-3-3h-8a3 3 0 0 0-3 3v6H7V11.83l9-7.2 9 7.2V25zm-14-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6h-2v-4h-2v4h-4v-4h-2v4h-2v-6zm8-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        <path d="M29.79 12.79l-13-10.4a1 1 0 0 0-1.25 0l-13 10.4A1 1 0 0 0 2 13h2v14a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V13h2a1 1 0 0 0 .79-1.6z" />
      </svg>
    ),
  },
  {
    id: 'historical-homes',
    name: 'Historical homes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M16.45 3L1 18.9l1.41 1.42L4 18.56V28a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V18.57l1.59 1.75L31 18.9 16.45 3zm-5.95 23h-3v-9.73l3-3v3.08l-1.3 1.3 1.3 1.36v6.99zm6 0h-4v-6.15L14 18.2l1.5 1.65V26zm6 0h-4v-6.61l-1.5-1.65L19 19.35V26zm5 0h-3v-7l1.34-1.34L21.5 16.3v-3.08l3 3V26z" />
      </svg>
    ),
  },
  {
    id: 'houseboats',
    name: 'Houseboats',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M9.5 3.5L8 2 1.5 8.5 3 10l6.5-6.5zm15 0L26 2l-6.5 6.5L21 10l6.5-6.5zM10 17.39a15.53 15.53 0 0 0-8 .54V23a1 1 0 0 0 1 1h2v4a1 1 0 0 0 1 1h8v-8a2 2 0 0 1 4 0v8h8a1 1 0 0 0 1-1v-4h2a1 1 0 0 0 1-1v-5.07a15.53 15.53 0 0 0-8-.54A12.83 12.83 0 0 1 16 16a12.83 12.83 0 0 1-6 1.39zm12 7.61v4h-4v-6a4 4 0 0 0-8 0v6H6v-4H5v-3.35a16.94 16.94 0 0 1 8.7-.79 14.56 14.56 0 0 0 4.6 0 16.94 16.94 0 0 1 8.7.79V23h-1v2z" />
      </svg>
    ),
  },
  {
    id: 'mansions',
    name: 'Mansions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6">
        <path d="M16 0l-16 10v2h4v16h24v-16h4v-2l-16-10zm8 24h-4v-8h-8v8h-4v-14.23l8-4.95 8 4.95v14.23z" />
        <path d="M14 24h4v-6h-4v6z" />
      </svg>
    ),
  },
  {
    id: 'pools',
    name: 'Amazing pools',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M24 26c-.988 0-1.574-.596-2.087-1.134-.514-.537-.98-1.023-1.913-1.023-.932 0-1.399.486-1.913 1.023-.513.538-1.1 1.134-2.087 1.134-.988 0-1.574-.596-2.087-1.134-.514-.537-.98-1.023-1.913-1.023-.932 0-1.399.486-1.913 1.023-.513.538-1.1 1.134-2.087 1.134-.988 0-1.574-.596-2.087-1.134C5.386 24.33 4.92 23.843 4 23.843v-2c.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023.932 0 1.399-.486 1.913-1.023.513-.538 1.1-1.134 2.087-1.134.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023.932 0 1.399-.486 1.913-1.023.513-.538 1.1-1.134 2.087-1.134.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023v2c-.932 0-1.399-.486-1.913-1.023-.513-.538-1.1-1.134-2.087-1.134z" />
        <path d="M24 18.8c-.988 0-1.574-.596-2.087-1.134-.514-.537-.98-1.023-1.913-1.023-.932 0-1.399.486-1.913 1.023-.513.538-1.1 1.134-2.087 1.134-.988 0-1.574-.596-2.087-1.134-.514-.537-.98-1.023-1.913-1.023-.932 0-1.399.486-1.913 1.023-.513.538-1.1 1.134-2.087 1.134-.988 0-1.574-.596-2.087-1.134-.513-.537-.98-1.023-1.913-1.023v-2c.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023.932 0 1.399-.486 1.913-1.023.513-.538 1.1-1.134 2.087-1.134.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023.932 0 1.399-.486 1.913-1.023.513-.538 1.1-1.134 2.087-1.134.988 0 1.574.596 2.087 1.134.514.537.98 1.023 1.913 1.023v2c-.932 0-1.399-.486-1.913-1.023-.513-.538-1.1-1.134-2.087-1.134z" />
        <path d="M28 5c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
        <path d="M10 5c0 1.657-1.343 3-3 3S4 6.657 4 5s1.343-3 3-3 3 1.343 3 3z" />
        <path d="M28 5H4v2h24V5z" />
      </svg>
    ),
  },
  {
    id: 'trending',
    name: 'Trending',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M28 16v15.5a.5.5 0 0 1-.41.5H4.5a.5.5 0 0 1-.5-.5V16h24zM13 20.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4zm6 0a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4zm7-.5h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5zM28 4v9.5a.5.5 0 0 1-.41.5H4.5a.5.5 0 0 1-.5-.5V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'countryside',
    name: 'Countryside',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M16 3.5l14.5 14.5-1.5 1.5-1-1-12 12-12-12-1 1-1.5-1.5L16 3.5zm7 13.5l-7-7-7 7v10h14v-10z" />
        <path d="M13 20h2v6h-2v-6z" />
        <path d="M17 20h2v6h-2v-6z" />
      </svg>
    ),
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2A13 13 0 1 0 29 16 13.015 13.015 0 0 0 16 3zm0 3.5a9.5 9.5 0 1 1-9.5 9.5A9.51 9.51 0 0 1 16 6.5zm0 2A7.5 7.5 0 1 0 23.5 16 7.508 7.508 0 0 0 16 8.5zm0 11.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  }
];

const CategoryFilter = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, []);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };
  
  return (
    <div className="relative px-8 md:px-10 lg:px-12 mb-8">
      {showLeftArrow && (
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-8 py-4"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center min-w-[64px] transition-opacity ${
              activeCategory && activeCategory !== category.id 
                ? 'opacity-50' 
                : 'opacity-100'
            }`}
          >
            <div className={`p-2 ${
              activeCategory === category.id 
                ? 'text-airbnb-red opacity-100' 
                : 'text-airbnb-dark opacity-80'
            }`}>
              {category.icon}
            </div>
            <span className={`text-xs mt-1 ${
              activeCategory === category.id 
                ? 'text-airbnb-dark font-medium border-b-2 border-airbnb-dark pb-1' 
                : 'text-airbnb-medium'
            }`}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
      
      {showRightArrow && (
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;