import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import properties from '../data/properties';
import { MapPin, ChevronDown, MessageCircle, ChevronRight } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import { 
  Wifi, 
  Wind, 
  UtensilsCrossed, 
  Droplet, 
  Car, 
  Umbrella,
  Tv,
  Briefcase,
  Thermometer,
  Coffee,
  Dumbbell,
  ShieldCheck,
  ArrowUpCircle,
  Baby,
  MonitorPlay,
  InfoIcon,
  AlertTriangle,
  Flame,
  Heart,
  Accessibility
} from 'lucide-react';

interface PropertyDetailsProps {
  id?: string;
}

/**
 * PropertyDetails Component
 * 
 * This component displays detailed information about a property listing including:
 * - Photo gallery with VR tour option
 * - Property information (title, location, amenities)
 * - Host information
 * - Booking interface
 * - Reviews
 */
const PropertyDetails: React.FC<PropertyDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties.find(p => p.id === id));
  const [showVRTour, setShowVRTour] = useState(false);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  // Calculate total price based on selected dates
  useEffect(() => {
    // Price calculation logic
    // ...existing useEffect code...
  }, [checkInDate, checkOutDate, property]);

  const amenityIconMap = {
    'wifi': Wifi,
    'air-conditioning': Wind,
    'kitchen': UtensilsCrossed,
    'pool': Droplet,
    'parking': Car,
    'beach': Umbrella,
    'tv': Tv,
    'workspace': Briefcase,
    'heating': Thermometer,
    'breakfast': Coffee,
    'gym': Dumbbell,
    'security': ShieldCheck,
    'elevator': ArrowUpCircle,
    'baby-friendly': Baby,
    'entertainment': MonitorPlay,
    'info': InfoIcon,
    'warning': AlertTriangle,
    'fireplace': Flame,
    'firstaid': Heart,
    'accessibility': Accessibility
  };

  // VR Tour Button with enhanced styling and animations
  return (
    <button 
      onClick={() => setShowVRTour(true)}
      className="flex items-center gap-2 bg-gradient-to-r from-airbnb-red to-airbnb-purple text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
    >
      {/* VR Icon with pulse animation */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5 group-hover:animate-pulse"
      >
        <path d="M21 5.5C17.5 4 14 4 12 4c-2 0-5.5 0-9 1.5M21 5.5v13c-4.5 1-8.06 1.13-9 1.5-2.5 0-5.5-1-9-1.5v-13M21 5.5l-9 3.75L3 5.5" />
      </svg>
      
      {/* Button text with underline animation */}
      <span className="relative">
        Experience in VR
        <span className="absolute inset-x-0 -bottom-1 h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
      </span>
    </button>
  );
};

const HomePage = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  
  const handleChatbotToggle = () => {
    setShowChatbot(prev => !prev);
  };
  
  useEffect(() => {
    // Mark initial load complete after short delay
    const timeout = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] bg-cover bg-center flex items-center" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Discover India's Hidden Gems with VR Previews
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Explore unique stays across India and virtually visit before you book
            </p>
          </div>
          
          <SearchBar />
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="pt-6 bg-white z-30 border-b border-airbnb-light">
        {/* BnBee Bot Entry */}
        <div
          className="flex flex-col items-center justify-center bg-gradient-to-r from-airbnb-red/10 to-airbnb-purple/10 border border-airbnb-light rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all max-w-2xl mx-auto my-4"
          onClick={handleChatbotToggle}
        >
          <div className="text-lg md:text-xl font-semibold text-airbnb-dark mb-2 text-center">
            Come, let's plan your entire trip/stay with <span className="text-airbnb-red">BnBee bot!</span>
          </div>
          <div className="text-sm md:text-base text-airbnb-medium text-center">
            Your ultimate travel assistant! BnBee can help you plan trips, find travel hacks, discover the best food spots, book cheap flights, and even create personalized travel itineraries. Experience destinations virtually with our VR feature!
            <br /><br />
            👉 Just click me or tap the BnBee icon in the bottom-right corner to get started!<br />
            I'm always here to buzz in with smart suggestions and smooth planning 🐝✨
          </div>
        </div>
      </section>
      
      {/* Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 bg-airbnb-red text-white z-2 rounded-full p-4 shadow-lg hover:bg-airbnb-red/90 transition-all z-50"
        onClick={handleChatbotToggle}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot */}
      {showChatbot && (
        
          <Chatbot onClose={handleChatbotToggle} />

      )}
      {/* Featured Properties */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Featured stays with VR tours</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                className={isInitialLoad ? 'opacity-0 translate-y-4 transition-all duration-500 ease-out' : 'opacity-100 translate-y-0 transition-all duration-500 ease-out'}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* VR Preview Feature Highlight */}
      <section className="py-16 bg-gradient-to-b from-white to-airbnb-light/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg" 
                  alt="VR preview of a property" 
                  className="w-full h-auto"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="transform hover:translate-y-[-10px] transition-transform duration-300">
                    <span className="text-white/90 text-sm mb-2 bg-airbnb-red/80 px-4 py-1 rounded-full inline-block">
                      New VR Feature
                    </span>
                    <h3 className="text-white text-3xl font-bold mt-2">Experience in Virtual Reality</h3>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 animate-pulse">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-airbnb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-airbnb-dark">
                Experience Your Stay in
                <span className="text-airbnb-red block">Virtual Reality</span>
              </h2>
              <p className="text-lg text-airbnb-medium mb-8 leading-relaxed">
                Step inside your potential stay before you book. Our VR feature lets you explore every corner of the property as if you were actually there.
              </p>
              
              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-airbnb-red/10 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-airbnb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-airbnb-dark">Explore the entire space</h4>
                    <p className="text-sm text-airbnb-medium">Move freely through rooms and get a feel for the layout</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-airbnb-red/10 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-airbnb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-airbnb-dark">360° views of each room</h4>
                    <p className="text-sm text-airbnb-medium">Look around in all directions to fully assess the space</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-airbnb-red/10 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-airbnb-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-airbnb-dark">Works on any device</h4>
                    <p className="text-sm text-airbnb-medium">No special equipment needed - works on mobile, tablet, and desktop</p>
                  </div>
                </li>
              </ul>
              
              <Link 
                to="/vrguide" 
                className="inline-flex items-center px-6 py-3 bg-airbnb-red text-white rounded-lg hover:bg-airbnb-red/90 transition-colors group"
              >
                Experience VR Preview
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Popular destinations in India</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Goa', image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg', count: 428 },
              { name: 'Jaipur', image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg', count: 317 },
              { name: 'Rishikesh', image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg', count: 201 },
              { name: 'Kerala', image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg', count: 389 },
              { name: 'Darjeeling', image: 'https://images.pexels.com/photos/2698812/pexels-photo-2698812.jpeg', count: 156 },
              { name: 'Manali', image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg', count: 243 },
              { name: 'Udaipur', image: 'https://images.pexels.com/photos/3522276/pexels-photo-3522276.jpeg', count: 198 },
              { name: 'Agra', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg', count: 172 },
            ].map((destination, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden shadow-md h-48">
                <img
                  src={destination.image}
                  alt={`${destination.name}, India`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-medium">{destination.name}</h3>
                  <p className="text-white/80 text-sm flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {destination.count} properties
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Featured BnBs per Destination */}
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-6">Top-rated stays in these destinations</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {properties
                .filter(property => 
                  ['Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh']
                  .includes(property.location.state)
                )
                .slice(0, 4)
                .map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    className={isInitialLoad ? 'opacity-0 translate-y-4 transition-all duration-500 ease-out' : 'opacity-100 translate-y-0 transition-all duration-500 ease-out'}
                  />
                ))
              }
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/search"
                className="inline-flex items-center text-airbnb-red hover:underline font-medium"
              >
                Explore more stays in these destinations
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hosting CTA */}
      <section className="relative bg-gradient-to-r from-airbnb-purple to-airbnb-red py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Become a host in India</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Earn extra income by sharing your space with travelers from around the world.
          </p>
          <button className="bg-white text-airbnb-red hover:bg-white/90 font-medium px-8 py-3 rounded-lg shadow-lg transition-colors">
            Learn more about hosting
          </button>
        </div>
        
        <div className="absolute right-0 bottom-0 h-full w-1/3 overflow-hidden opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <path fill="#FFFFFF" d="M39.9,-68.5C51.1,-62.8,59.5,-51.4,67.7,-39.1C75.9,-26.8,83.9,-13.4,83.6,-0.2C83.3,13,74.7,26,65.9,38.5C57.1,51,48.1,62.9,36.4,68.9C24.7,74.9,10.4,74.9,-3.2,79.6C-16.7,84.3,-33.5,93.7,-46.6,90.1C-59.8,86.6,-69.3,70.1,-76,53.8C-82.7,37.5,-86.5,21.2,-85.5,5.7C-84.5,-9.8,-78.7,-19.6,-72.1,-29.3C-65.5,-39,-58.1,-48.5,-48,-54.6C-37.9,-60.8,-25.1,-63.6,-12.8,-64.9C-0.6,-66.2,8.2,-66,18.8,-68.8C29.5,-71.6,38.9,-77.2,39.9,-68.5Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>
    </>
  );
};

export default HomePage;