import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property } from '../types';

interface WishlistStore {
  wishlistedProperties: Property[];
  toggleWishlist: (property: Property) => void;
  isWishlisted: (propertyId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistedProperties: [],
      toggleWishlist: (property) => {
        set((state) => {
          const isAlreadyWishlisted = state.wishlistedProperties.some(p => p.id === property.id);
          if (isAlreadyWishlisted) {
            return {
              wishlistedProperties: state.wishlistedProperties.filter(p => p.id !== property.id)
            };
          } else {
            return {
              wishlistedProperties: [...state.wishlistedProperties, property]
            };
          }
        });
      },
      isWishlisted: (propertyId) => {
        return get().wishlistedProperties.some(p => p.id === propertyId);
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);
