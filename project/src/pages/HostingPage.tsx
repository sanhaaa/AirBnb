import { useState, useEffect } from 'react';
import { Calculator, Shield, Heart, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

// Types for calculator
interface BaseRates {
  [key: string]: number;
}

interface LocationMultipliers {
  [key: string]: number;
}

const HostingPage = () => {
  // State with proper typing
  const [location, setLocation] = useState<string>('');
  const [propertyType, setPropertyType] = useState<'entire' | 'private' | 'shared'>('entire');
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [earnings, setEarnings] = useState<number>(0);

  // Type guard for property type
  const isValidPropertyType = (value: string): value is 'entire' | 'private' | 'shared' => {
    return ['entire', 'private', 'shared'].includes(value);
  };

  // Memoized rate objects
  const baseRate: BaseRates = {
    'entire': 2500,
    'private': 1500,
    'shared': 800
  };

  const locationMultiplier: LocationMultipliers = {
    'Mumbai': 1.5,
    'Delhi': 1.4,
    'Bangalore': 1.3,
    'Goa': 1.6,
    'default': 1.0
  };

  useEffect(() => {
    const calculate = () => {
      const baseEarning = baseRate[propertyType];
      const multiplier = locationMultiplier[location] || locationMultiplier.default;
      const bedroomFactor = bedrooms * 0.5;
      
      const monthlyEarning = Math.round(baseEarning * multiplier * (1 + bedroomFactor) * 30);
      setEarnings(monthlyEarning);
    };

    calculate();
  }, [location, propertyType, bedrooms, baseRate, locationMultiplier]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg"
        >
          <source src="your-hosting-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6">
              Open your door to
              hosting in India
            </h1>
            <button className="bg-airbnb-red text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-airbnb-red/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Earnings Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-semibold mb-12 text-center">
              Find out how much you could earn
            </h2>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-lg text-airbnb-medium mb-2">Potential monthly earnings</p>
                  <h3 className="text-4xl font-medium">₹{earnings.toLocaleString()}</h3>
                </div>
                <Calculator className="h-12 w-12 text-airbnb-red" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Where's your place located?</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select a city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Goa">Goa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Property type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isValidPropertyType(value)) {
                        setPropertyType(value);
                      }
                    }}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="entire">Entire place</option>
                    <option value="private">Private room</option>
                    <option value="shared">Shared room</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-3 border rounded-lg"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} bedroom{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-12 text-center">
            Why host in India?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <Shield className="h-12 w-12 text-airbnb-red mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">AirCover for Hosts</h3>
              <p className="text-airbnb-medium">Get protection for your property and earnings</p>
            </div>
            
            <div className="text-center">
              <Heart className="h-12 w-12 text-airbnb-red mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Super Host Support</h3>
              <p className="text-airbnb-medium">Get dedicated support and exclusive benefits</p>
            </div>
            
            <div className="text-center">
              <Home className="h-12 w-12 text-airbnb-red mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Easy to Get Started</h3>
              <p className="text-airbnb-medium">List your property in minutes with our simple process</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostingPage;
