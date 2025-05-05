import { useState, useEffect, ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Star, Share, Heart, 
  MapPin, Users, Bed, Bath, 
  Home, Maximize, Calendar, Award,
  Check, X,
  Wifi, 
  Wind, 
  UtensilsCrossed, 
  Droplet, 
  Car, 
  Umbrella,
  Tv,
  Thermometer,
  Coffee,
  Dumbbell,
  ShieldCheck,
  ArrowUpCircle,
  Baby,
  MonitorPlay
} from 'lucide-react';
import properties from '../data/properties';
import VRTourViewer from '../components/VRTourViewer';
import { getAmenityIcon } from '../utils/amenityIcons';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type StateKey = 'Goa' | 'Kerala' | 'Rajasthan' | 'Himachal Pradesh' | 'Maharashtra' | 'default';

const stateBackgroundMap: Record<StateKey, string> = {
  'Goa': 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
  'Kerala': 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
  'Rajasthan': 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg',
  'Himachal Pradesh': 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
  'Maharashtra': 'https://images.pexels.com/photos/1701539/pexels-photo-1701539.jpeg',
  'default': 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg'
};

const getStateBackground = (state: string): string => {
  return state in stateBackgroundMap 
    ? stateBackgroundMap[state as StateKey]
    : stateBackgroundMap.default;
};

type AmenityIconKey = 
  | 'wifi' 
  | 'air-conditioning' 
  | 'kitchen' 
  | 'pool' 
  | 'parking' 
  | 'beach' 
  | 'tv' 
  | 'heating' 
  | 'breakfast' 
  | 'gym' 
  | 'security' 
  | 'elevator' 
  | 'baby-items' 
  | 'entertainment';

const amenityIconMap: Record<AmenityIconKey, ReactElement> = {
  'wifi': <Wifi className="w-6 h-6 text-airbnb-dark" />,
  'air-conditioning': <Wind className="w-6 h-6 text-airbnb-dark" />,
  'kitchen': <UtensilsCrossed className="w-6 h-6 text-airbnb-dark" />,
  'pool': <Droplet className="w-6 h-6 text-airbnb-dark" />,
  'parking': <Car className="w-6 h-6 text-airbnb-dark" />,
  'beach': <Umbrella className="w-6 h-6 text-airbnb-dark" />,
  'tv': <Tv className="w-6 h-6 text-airbnb-dark" />,
  'heating': <Thermometer className="w-6 h-6 text-airbnb-dark" />,
  'breakfast': <Coffee className="w-6 h-6 text-airbnb-dark" />,
  'gym': <Dumbbell className="w-6 h-6 text-airbnb-dark" />,
  'security': <ShieldCheck className="w-6 h-6 text-airbnb-dark" />,
  'elevator': <ArrowUpCircle className="w-6 h-6 text-airbnb-dark" />,
  'baby-items': <Baby className="w-6 h-6 text-airbnb-dark" />,
  'entertainment': <MonitorPlay className="w-6 h-6 text-airbnb-dark" />
};

const isValidAmenityKey = (key: string): key is AmenityIconKey => {
  return key in amenityIconMap;
};

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties.find(p => p.id === id));
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showVRTour, setShowVRTour] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [nightsCount, setNightsCount] = useState(0);
  
  useEffect(() => {
    // Calculate nights and total price when dates change
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNightsCount(diffDays);
      setTotalPrice(property ? property.price * diffDays : 0);
    } else {
      setNightsCount(0);
      setTotalPrice(0);
    }
  }, [checkInDate, checkOutDate, property]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Property not found</h1>
          <Link to="/" className="text-airbnb-red hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }
  
  const handleReserve = () => {
    alert('Booking functionality would go here!');
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };
  
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Photos modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <button 
              onClick={() => setShowAllPhotos(false)}
              className="flex items-center font-medium hover:bg-airbnb-light/30 rounded-full px-4 py-2"
            >
              <ChevronLeft className="mr-2" size={18} />
              <span>Back to property</span>
            </button>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`rounded-xl overflow-hidden ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* VR Tour modal */}
      {showVRTour && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl">
            <button 
              onClick={() => setShowVRTour(false)}
              className="absolute top-4 left-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition z-50"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="relative pb-4 mb-4 border-b border-white/20">
              <h2 className="text-white text-xl font-medium">VR Tour: {property.title}</h2>
            </div>
            
            <VRTourViewer panoramas={property.vrTour.panoramas || []} />
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showAllReviews && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <button 
              onClick={() => setShowAllReviews(false)}
              className="flex items-center font-medium hover:bg-airbnb-light/30 rounded-full px-4 py-2"
            >
              <ChevronLeft className="mr-2" size={18} />
              <span>Back to property</span>
            </button>
            
            <div className="max-w-4xl mx-auto py-8">
              <div className="flex items-center gap-2 mb-8">
                <Star className="h-6 w-6 fill-current" />
                <span className="text-2xl font-medium">
                  {property.rating} · {property.reviewCount} reviews
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {property.reviews.map(review => (
                  <div key={review.id} className="flex flex-col border-b border-airbnb-light pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <p className="text-sm text-airbnb-medium">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-airbnb-dark leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-medium mb-1">{property.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="font-medium">{property.rating}</span>
            <span className="mx-1">·</span>
            <button className="underline font-medium">
              {property.reviewCount} reviews
            </button>
          </div>
          
          {property.host.isSuperHost && (
            <>
              <span className="text-airbnb-medium">·</span>
              <span className="flex items-center">
                <Award size={14} className="mr-1" />
                Superhost
              </span>
            </>
          )}
          
          <span className="text-airbnb-medium">·</span>
          <span className="underline font-medium">
            {property.location.city}, {property.location.state}, {property.location.country}
          </span>
          
          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center hover:bg-airbnb-light/30 rounded-full px-3 py-1">
              <Share className="h-4 w-4 mr-1" />
              <span className="underline">Share</span>
            </button>
            <button 
              className="flex items-center hover:bg-airbnb-light/30 rounded-full px-3 py-1"
              onClick={toggleWishlist}
            >
              <Heart className={`h-4 w-4 mr-1 ${isWishlisted ? 'fill-airbnb-red text-airbnb-red' : ''}`} />
              <span className="underline">Save</span>
            </button>
          </div>
        </div>
        
        {/* Photos */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2">
              <img 
                src={property.images[0].url} 
                alt={property.images[0].alt} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {property.images.slice(1, 5).map((image, index) => (
              <div key={image.id} className="hidden md:block">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            {property.vrTour.enabled && (
              <button 
                onClick={() => setShowVRTour(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-airbnb-red to-airbnb-purple text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:animate-pulse">
                  <path d="M21 5.5C17.5 4 14 4 12 4c-2 0-5.5 0-9 1.5M21 5.5v13c-4.5 1-8.06 1.13-9 1.5-2.5 0-5.5-1-9-1.5v-13M21 5.5l-9 3.75L3 5.5" />
                </svg>
                <span className="relative">
                  Experience in VR
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
              </button>
            )}
            
            <button 
              onClick={() => setShowAllPhotos(true)}
              className="flex items-center gap-2 bg-white hover:bg-white/90 text-airbnb-dark font-medium px-4 py-2 rounded-lg shadow-lg transition-colors"
            >
              <Maximize size={18} />
              <span>Show all photos</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-7/12">
            {/* Property details */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-medium mb-1">
                    {property.type} hosted by {property.host.name}
                  </h2>
                  <p className="text-airbnb-medium">
                    {property.maxGuests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.baths} baths
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-14 h-14 rounded-full bg-airbnb-light overflow-hidden">
                    <img 
                      src={property.host.avatar} 
                      alt={property.host.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Property features */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <Home size={24} />
                  <div>
                    <h3 className="font-medium mb-1">{property.type}</h3>
                    <p className="text-sm text-airbnb-medium">Your own space</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Great location</h3>
                    <p className="text-sm text-airbnb-medium">95% of guests rated the location 5 stars</p>
                  </div>
                </div>
                
                {property.host.isSuperHost && (
                  <div className="flex items-start gap-4">
                    <Award size={24} />
                    <div>
                      <h3 className="font-medium mb-1">{property.host.name} is a Superhost</h3>
                      <p className="text-sm text-airbnb-medium">Well-rated, experienced host</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <p className="text-base leading-relaxed mb-4">
                {property.description}
              </p>
              
              <button className="underline font-medium">
                Show more
              </button>
            </div>
            
            {/* Amenities */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <h2 className="text-xl font-medium mb-4">What this place offers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.slice(0, 8).map(amenity => (
                  <div key={amenity.id} className="flex items-center gap-4">
                    {getAmenityIcon(amenity.icon)}
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              
              {property.amenities.length > 8 && (
                <button className="mt-4 border border-airbnb-dark rounded-lg px-6 py-3 font-medium">
                  Show all {property.amenities.length} amenities
                </button>
              )}
            </div>
            
            {/* VR Tour section */}
            {property.vrTour.enabled && (
              <div className="border-b border-airbnb-light pb-6 mb-6">
                <h2 className="text-xl font-medium mb-4">Virtual Reality Tour</h2>
                
                <div className="bg-airbnb-light/20 rounded-xl p-6 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-airbnb-red rounded-full p-2 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Experience this place in virtual reality</h3>
                      <p className="text-airbnb-medium mb-4">
                        Explore this property in an immersive 3D environment. Walk through rooms, check out the views, and get a real feel for the space before booking.
                      </p>
                      <button 
                        onClick={() => setShowVRTour(true)}
                        className="flex items-center gap-2 text-airbnb-red font-medium hover:underline"
                      >
                        Launch VR Tour
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-xl font-medium">{property.rating} · {property.reviewCount} reviews</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Show only first 6 reviews initially */}
                {property.reviews.slice(0, 6).map(review => (
                  <div key={review.id} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <p className="text-xs text-airbnb-medium">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              {property.reviews.length > 6 && (
                <button 
                  onClick={() => setShowAllReviews(true)}
                  className="border border-airbnb-dark rounded-lg px-6 py-3 font-medium hover:bg-airbnb-light/10 transition"
                >
                  Show all {property.reviewCount} reviews
                </button>
              )}
            </div>
            
            {/* Location */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <h2 className="text-xl font-medium mb-4">Where you'll be</h2>
              
              <div className="rounded-xl overflow-hidden h-80 mb-4 relative">
                {MAPS_API_KEY ? (
                  <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.location.lat},${property.location.lng}&zoom=14&size=800x400&scale=2&markers=color:red%7C${property.location.lat},${property.location.lng}&key=${MAPS_API_KEY}`} 
                    alt={`Map showing location in ${property.location.city}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getStateBackground(property.location.state);
                    }}
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${getStateBackground(property.location.state)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                      <MapPin className="w-8 h-8 text-white mx-auto mb-2" />
                      <h3 className="font-medium text-white">
                        {property.location.city}, {property.location.state}
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        Exact location provided after booking
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="font-medium mb-2">{property.location.city}, {property.location.state}, {property.location.country}</h3>
              <p className="text-airbnb-medium mb-4">
                The neighborhood is peaceful and safe, with easy access to local attractions and amenities.
              </p>
              
              <button className="underline font-medium">
                Show more
              </button>
            </div>
            
            {/* Host */}
            <div className="border-b border-airbnb-light pb-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={property.host.avatar} 
                    alt={property.host.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-medium">Hosted by {property.host.name}</h2>
                  <p className="text-airbnb-medium">Joined in {property.host.joinDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>{property.reviewCount} Reviews</span>
                </div>
                
                {property.host.isSuperHost && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Superhost</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Identity verified</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Response rate: {property.host.responseRate}%</span>
                </div>
              </div>
              
              <p className="text-base mb-4">
                I love hosting travelers from around the world and sharing the beauty of {property.location.city}. I'm always available to help make your stay perfect.
              </p>
              
              <button className="border border-airbnb-dark rounded-lg px-6 py-3 font-medium">
                Contact host
              </button>
            </div>
          </div>
          
          {/* Booking sidebar */}
          <div className="lg:w-5/12">
            <div className="sticky top-28">
              <div className="border border-airbnb-light rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xl font-semibold">₹{property.price}</span>
                    <span className="text-airbnb-medium"> night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="mx-1 text-airbnb-medium">·</span>
                    <span className="text-airbnb-medium underline">{property.reviewCount} reviews</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="border border-airbnb-light rounded-t-lg overflow-hidden">
                    <div className="grid grid-cols-2">
                      <div className="border-r border-b border-airbnb-light p-3">
                        <label className="block text-xs font-semibold">CHECK-IN</label>
                        <input 
                          type="date" 
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full border-none outline-none text-sm"
                        />
                      </div>
                      <div className="border-b border-airbnb-light p-3">
                        <label className="block text-xs font-semibold">CHECKOUT</label>
                        <input 
                          type="date" 
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full border-none outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <label className="block text-xs font-semibold">GUESTS</label>
                      <select 
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full border-none outline-none text-sm py-1"
                      >
                        {[...Array(property.maxGuests)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} guest{i !== 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleReserve}
                  className="w-full bg-gradient-to-r from-airbnb-purple to-airbnb-red text-white rounded-lg py-3 font-medium hover:from-airbnb-purple/90 hover:to-airbnb-red/90 transition"
                >
                  Reserve
                </button>
                
                <p className="text-center text-sm mt-2 mb-4">You won't be charged yet</p>
                
                {/* Price details */}
                {nightsCount > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="underline">₹{property.price} x {nightsCount} nights</span>
                      <span>₹{property.price * nightsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Cleaning fee</span>
                      <span>₹1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline">Service fee</span>
                      <span>₹2,000</span>
                    </div>
                    <div className="pt-3 border-t border-airbnb-light flex justify-between font-semibold">
                      <span>Total before taxes</span>
                      <span>₹{totalPrice + 3500}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Report listing */}
              <div className="text-center mt-4">
                <button className="underline text-airbnb-medium text-sm">
                  Report this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding missing icon component
const MessageCircle = ({ className = '', size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default PropertyDetails;