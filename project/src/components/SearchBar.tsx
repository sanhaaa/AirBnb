import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import popularLocations from '../data/locations';

const SearchBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'location' | 'dates' | 'guests'>('location');
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.checkIn) params.append('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) params.append('checkOut', searchParams.checkOut);
    if (searchParams.guests > 0) params.append('guests', searchParams.guests.toString());
    
    navigate(`/search?${params.toString()}`);
  };
  
  const handleLocationFocus = () => {
    setActiveTab('location');
    setShowLocationDropdown(true);
  };
  
  const selectLocation = (city: string) => {
    setSearchParams({
      ...searchParams,
      location: city
    });
    setShowLocationDropdown(false);
  };
  
  const filteredLocations = searchParams.location
    ? popularLocations.filter(location => 
        location.city.toLowerCase().includes(searchParams.location.toLowerCase()) ||
        location.state.toLowerCase().includes(searchParams.location.toLowerCase())
      )
    : popularLocations.slice(0, 5);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-full shadow-lg border border-airbnb-light overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Location */}
          <div className={`relative flex-1 min-w-[33%] p-3 ${activeTab === 'location' ? 'bg-white' : 'hover:bg-airbnb-light/10'}`}>
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-full flex items-center gap-2"
              onClick={handleLocationFocus}
            >
              <MapPin className="text-airbnb-red" size={18} />
              <div className="flex flex-col">
                <span className="text-xs font-bold">Where</span>
                <input
                  type="text"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  onFocus={handleLocationFocus}
                  placeholder="Search destinations"
                  className="bg-transparent border-none outline-none p-0 w-full text-sm"
                />
              </div>
            </button>
            
            {/* Location dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-airbnb-light z-50 max-h-64 overflow-y-auto">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <button
                      key={`${location.city}-${location.state}`}
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-airbnb-light/20 flex items-center gap-3"
                      onClick={() => selectLocation(`${location.city}, ${location.state}`)}
                    >
                      <div className="p-2 bg-airbnb-light/50 rounded-lg">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="font-medium">{location.city}</p>
                        <p className="text-xs text-airbnb-medium">{location.state}, India</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-airbnb-medium">No locations found</div>
                )}
              </div>
            )}
          </div>
          
          {/* Dates */}
          <div 
            className={`flex-1 min-w-[33%] p-3 ${activeTab === 'dates' ? 'bg-white' : 'hover:bg-airbnb-light/10'}`}
            onClick={() => setActiveTab('dates')}
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <Calendar className="text-airbnb-red" size={18} />
              <div className="flex flex-col">
                <span className="text-xs font-bold">When</span>
                <div className="flex gap-1 text-sm">
                  <input
                    type="date"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                    className="bg-transparent border-none outline-none p-0 w-24"
                    placeholder="Check in"
                  />
                  <span className="mx-1">-</span>
                  <input
                    type="date"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                    className="bg-transparent border-none outline-none p-0 w-24"
                    placeholder="Check out"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Guests */}
          <div 
            className={`flex-1 min-w-[33%] p-3 ${activeTab === 'guests' ? 'bg-white' : 'hover:bg-airbnb-light/10'} flex justify-between items-center`}
            onClick={() => setActiveTab('guests')}
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <Users className="text-airbnb-red" size={18} />
              <div className="flex flex-col">
                <span className="text-xs font-bold">Who</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                    className="bg-transparent border-none outline-none p-0 w-12 text-sm"
                  />
                  <span className="text-sm">guest{searchParams.guests !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              className="bg-airbnb-red hover:bg-airbnb-red/90 text-white rounded-full p-3 flex items-center gap-2 mx-3"
            >
              <Search size={18} />
              <span className="font-medium">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;