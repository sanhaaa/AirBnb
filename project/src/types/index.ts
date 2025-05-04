export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isHost: boolean;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperHost: boolean;
  responseRate: number;
  responseTime: string;
  joinDate: string;
  totalListings: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'features' | 'safety' | 'accessibility';
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface VRTour {
  enabled: boolean;
  modelUrl?: string;
  panoramas?: string[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'Entire home' | 'Private room' | 'Shared room' | 'Hotel room';
  images: PropertyImage[];
  vrTour: VRTour;
  price: number;
  currency: string;
  location: Location;
  host: Host;
  amenities: Amenity[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  hasWifi: boolean;
  hasAC: boolean;
  hasKitchen: boolean;
  hasWasher: boolean;
  hasParking: boolean;
  hasPool: boolean;
  instantBook: boolean;
  cancelPolicy: 'flexible' | 'moderate' | 'strict';
  minStay: number;
  availableDates: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string[];
  amenities?: string[];
  instantBook?: boolean;
  superHost?: boolean;
}