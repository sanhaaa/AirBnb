import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Property } from '../types';
import { useWishlistStore } from '../stores/wishlistStore';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard = ({ property, className = '' }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex < property.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(property.images.length - 1);
    }
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property);
  };
  
  return (
    <Link 
      to={`/property/${property.id}`}
      className={`block group ${className}`}
    >
      {/* Image Carousel */}
      <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
        <img 
          src={property.images[currentImageIndex].url} 
          alt={property.images[currentImageIndex].alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* VR badge */}
        {property.vrTour.enabled && (
          <div className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-airbnb-dark shadow">
            VR Tour Available
          </div>
        )}
        
        {/* Navigation arrows */}
        {property.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
        
        {/* Wishlist button */}
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-black/10 transition"
          aria-label={isWishlisted(property.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-6 w-6 ${
              isWishlisted(property.id) 
                ? 'fill-airbnb-red text-airbnb-red' 
                : 'text-white stroke-2'
            }`} 
          />
        </button>
        
        {/* Image indicator dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, index) => (
              <span 
                key={index} 
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Property details */}
      <div>
        <div className="flex justify-between mb-1">
          <h3 className="font-medium text-airbnb-dark truncate pr-2">
            {property.location.city}, {property.location.state}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span className="text-sm">{property.rating}</span>
          </div>
        </div>
        
        <p className="text-airbnb-medium text-sm mb-1 truncate">
          {property.type}
        </p>
        
        <p className="text-airbnb-medium text-sm mb-2">
          <span className="text-airbnb-dark font-medium">₹{property.price}</span> night
        </p>
        
        {property.host.isSuperHost && (
          <span className="inline-flex items-center text-xs px-2 py-0.5 bg-airbnb-light/50 text-airbnb-dark rounded-md">
            Superhost
          </span>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;