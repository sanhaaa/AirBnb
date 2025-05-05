import { useWishlistStore } from '../stores/wishlistStore';
import PropertyCard from '../components/PropertyCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const wishlistedProperties = useWishlistStore(state => state.wishlistedProperties);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-6">Wishlisted Properties</h1>
        
        {wishlistedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-airbnb-light" />
            <h2 className="text-xl font-medium mb-2">No properties wishlisted yet</h2>
            <p className="text-airbnb-medium">
              Click the heart icon on any property to add it to your wishlist
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
