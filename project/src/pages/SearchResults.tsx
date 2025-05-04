import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sliders, ArrowUpDown, MapPin } from 'lucide-react';
import properties from '../data/properties';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';

const filterOptions = {
  propertyType: ['Entire home', 'Private room', 'Shared room', 'Hotel room'],
  amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Washer', 'Pool', 'Free parking'],
  bookingOptions: ['Instant Book'],
  hostStatus: ['Superhost'],
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: [] as string[],
    amenities: [] as string[],
    priceMin: 0,
    priceMax: 50000,
    instantBook: false,
    superHost: false,
  });
  
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests') || '1');
  
  useEffect(() => {
    let results = [...properties];
    
    // Filter by location if provided
    if (location) {
      results = results.filter(property => 
        property.location.city.toLowerCase().includes(location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(location.toLowerCase()) ||
        property.location.country.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by property type
    if (selectedFilters.propertyType.length > 0) {
      results = results.filter(property => 
        selectedFilters.propertyType.includes(property.type)
      );
    }
    
    // Filter by amenities
    if (selectedFilters.amenities.length > 0) {
      results = results.filter(property => {
        const propertyAmenityNames = property.amenities.map(a => a.name);
        return selectedFilters.amenities.some(amenity => 
          propertyAmenityNames.includes(amenity)
        );
      });
    }
    
    // Filter by price range
    results = results.filter(property => 
      property.price >= selectedFilters.priceMin && 
      property.price <= selectedFilters.priceMax
    );
    
    // Filter by instant book
    if (selectedFilters.instantBook) {
      results = results.filter(property => property.instantBook);
    }
    
    // Filter by superhost
    if (selectedFilters.superHost) {
      results = results.filter(property => property.host.isSuperHost);
    }
    
    // Update state with filtered results
    setFilteredProperties(results);
  }, [location, selectedFilters]);
  
  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const category_typed = category as keyof typeof selectedFilters;
      if (Array.isArray(prev[category_typed])) {
        const array = prev[category_typed] as string[];
        if (array.includes(value)) {
          return {
            ...prev,
            [category]: array.filter(item => item !== value),
          };
        } else {
          return {
            ...prev,
            [category]: [...array, value],
          };
        }
      }
      return prev;
    });
  };
  
  const toggleBooleanFilter = (filterName: 'instantBook' | 'superHost') => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceMin: min,
      priceMax: max,
    }));
  };
  
  const clearAllFilters = () => {
    setSelectedFilters({
      propertyType: [],
      amenities: [],
      priceMin: 0,
      priceMax: 50000,
      instantBook: false,
      superHost: false,
    });
  };
  
  const totalActiveFilters = 
    selectedFilters.propertyType.length + 
    selectedFilters.amenities.length + 
    (selectedFilters.instantBook ? 1 : 0) + 
    (selectedFilters.superHost ? 1 : 0) +
    ((selectedFilters.priceMin > 0 || selectedFilters.priceMax < 50000) ? 1 : 0);
  
  return (
    <div className="pt-20">
      {/* Filters */}
      <div className="sticky top-20 z-30 bg-white border-b border-airbnb-light">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border border-airbnb-light rounded-full px-4 py-2 hover:border-airbnb-dark transition-colors"
              >
                <Sliders size={16} />
                <span>Filters</span>
                {totalActiveFilters > 0 && (
                  <span className="bg-airbnb-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalActiveFilters}
                  </span>
                )}
              </button>
              
              <button className="flex items-center gap-2 border border-airbnb-light rounded-full px-4 py-2 hover:border-airbnb-dark transition-colors">
                <ArrowUpDown size={16} />
                <span>Sort: Recommended</span>
              </button>
            </div>
            
            <div className="text-airbnb-medium text-sm">
              {filteredProperties.length} homes in{' '}
              <span className="font-medium text-airbnb-dark">
                {location || 'India'}
              </span>
            </div>
          </div>
          
          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 border rounded-xl border-airbnb-light p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Filters</h2>
                <button 
                  onClick={clearAllFilters}
                  className="text-sm underline hover:text-airbnb-red"
                >
                  Clear all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Property type */}
                <div>
                  <h3 className="font-medium mb-3">Property type</h3>
                  <div className="space-y-2">
                    {filterOptions.propertyType.map(type => (
                      <label key={type} className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          checked={selectedFilters.propertyType.includes(type)}
                          onChange={() => toggleFilter('propertyType', type)}
                          className="h-4 w-4 rounded text-airbnb-red focus:ring-airbnb-red"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Amenities */}
                <div>
                  <h3 className="font-medium mb-3">Amenities</h3>
                  <div className="space-y-2">
                    {filterOptions.amenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-2">
                        <input 
                          type="checkbox"
                          checked={selectedFilters.amenities.includes(amenity)}
                          onChange={() => toggleFilter('amenities', amenity)}
                          className="h-4 w-4 rounded text-airbnb-red focus:ring-airbnb-red"
                        />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price range and booking options */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Price range</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-3 text-airbnb-medium">₹</span>
                        <input 
                          type="number"
                          min="0"
                          value={selectedFilters.priceMin}
                          onChange={(e) => handlePriceChange(parseInt(e.target.value), selectedFilters.priceMax)}
                          className="w-full pl-8 pr-3 py-2 border border-airbnb-light rounded-lg"
                          placeholder="Min"
                        />
                      </div>
                      <span className="text-airbnb-medium">-</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-3 text-airbnb-medium">₹</span>
                        <input 
                          type="number"
                          min="0"
                          value={selectedFilters.priceMax}
                          onChange={(e) => handlePriceChange(selectedFilters.priceMin, parseInt(e.target.value))}
                          className="w-full pl-8 pr-3 py-2 border border-airbnb-light rounded-lg"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-3">Booking options</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        checked={selectedFilters.instantBook}
                        onChange={() => toggleBooleanFilter('instantBook')}
                        className="h-4 w-4 rounded text-airbnb-red focus:ring-airbnb-red"
                      />
                      <span>Instant Book</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        checked={selectedFilters.superHost}
                        onChange={() => toggleBooleanFilter('superHost')}
                        className="h-4 w-4 rounded text-airbnb-red focus:ring-airbnb-red"
                      />
                      <span>Superhost</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="bg-airbnb-red text-white px-6 py-3 rounded-lg font-medium"
                >
                  Show {filteredProperties.length} homes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search summary */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2">
            {location ? `Stays in ${location}` : 'All stays in India'}
          </h1>
          
          {(checkIn && checkOut) && (
            <p className="text-airbnb-medium">
              {checkIn} to {checkOut} · {guests} guest{guests !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <MapPin size={48} className="mx-auto text-airbnb-red opacity-60" />
            </div>
            <h2 className="text-2xl font-medium mb-2">No results found</h2>
            <p className="text-airbnb-medium mb-6">
              Try adjusting your search filters or exploring a different location
            </p>
            <Link 
              to="/"
              className="bg-airbnb-red text-white px-8 py-3 rounded-lg font-medium inline-block"
            >
              Return to home
            </Link>
          </div>
        )}
        
        {/* Property grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;