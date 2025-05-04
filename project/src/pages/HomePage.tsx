import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import properties from '../data/properties';
import { MapPin, ChevronDown, MessageCircle } from 'lucide-react';
import Chatbot from '../components/Chatbot';

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
      <section className="pt-6 sticky top-20 bg-white z-30 border-b border-airbnb-light">
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
      <section className="py-16 bg-airbnb-light/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg" 
                  alt="VR preview of a property" 
                  className="w-full h-auto"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white/80 text-sm mb-1">Experience properties in</span>
                  <h3 className="text-white text-2xl font-semibold">Virtual Reality</h3>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 rounded-full py-1 px-3 text-xs font-medium">
                  New Feature
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-4">See before you stay with VR previews</h2>
              <p className="text-airbnb-medium mb-6">
                Our new Virtual Reality feature lets you explore properties in an immersive 3D environment before booking. Get a realistic feel for the space, layout, and amenities to make more confident booking decisions.
              </p>
              
              <ul className="space-y-4 mb-8">
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
              
              <Link to="/vrguide" className="inline-flex items-center font-medium text-airbnb-red hover:underline">
                Learn more about VR Previews 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
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
          
          <div className="text-center mt-10">
            <button className="inline-flex items-center px-6 py-3 border border-airbnb-dark rounded-full text-airbnb-dark font-medium hover:bg-airbnb-dark hover:text-white transition-colors">
              Show more destinations
              <ChevronDown size={18} className="ml-2" />
            </button>
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