import React from 'react';
import { Link } from 'react-router-dom';
import { GlobeIcon, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-airbnb-light">
      {/* Support Section */}
      <div className="container mx-auto px-4 py-6 border-b border-airbnb-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Help Center</Link></li>
              <li><Link to="/aircover" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">AirCover</Link></li>
              <li><Link to="/safety" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Safety information</Link></li>
              <li><Link to="/accessibility" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Accessibility</Link></li>
              <li><Link to="/cancellation" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Cancellation options</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              <li><Link to="/disaster-relief" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Disaster relief</Link></li>
              <li><Link to="/combat-discrimination" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Combating discrimination</Link></li>
              <li><Link to="/referrals" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Refer a host</Link></li>
              <li><Link to="/community-forum" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Community forum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><Link to="/host/homes" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Airbnb your home</Link></li>
              <li><Link to="/host/insurance" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">AirCover for Hosts</Link></li>
              <li><Link to="/host/resources" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Hosting resources</Link></li>
              <li><Link to="/host/responsible" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Responsible hosting</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="text-sm text-airbnb-medium">&copy; 2025 IndiaBnB, Inc.</span>
              <span className="mx-2 text-airbnb-medium">·</span>
              <Link to="/privacy" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Privacy</Link>
              <span className="mx-2 text-airbnb-medium">·</span>
              <Link to="/terms" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Terms</Link>
              <span className="mx-2 text-airbnb-medium">·</span>
              <Link to="/sitemap" className="text-sm text-airbnb-medium hover:text-airbnb-dark hover:underline">Sitemap</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm font-medium text-airbnb-dark hover:underline">
              <GlobeIcon size={16} className="mr-2" />
              English (US)
            </button>
            <button className="text-sm font-medium text-airbnb-dark hover:underline">
              ₹ INR
            </button>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-airbnb-dark text-white rounded-full p-3 shadow-lg hover:bg-airbnb-medium transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;