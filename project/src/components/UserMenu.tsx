import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import AuthModal from './AuthModal';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { user, profile, signOut } = useAuthStore();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowMenu(false);
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      setShowMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center border border-airbnb-light rounded-full p-1 shadow-sm bg-white gap-2 hover:shadow-md transition"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Menu size={18} className="ml-2 text-airbnb-dark" />
        <div className="bg-airbnb-medium rounded-full text-white p-1 mr-1">
          {user && profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <User size={18} />
          )}
        </div>
      </button>
      
      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-airbnb-light py-2 z-50">
          {user ? (
            <>
              <div className="px-4 py-2 border-b border-airbnb-light">
                <p className="font-medium">{profile?.full_name}</p>
                <p className="text-sm text-airbnb-medium">{user.email}</p>
              </div>
              
              <Link
                to="/trips"
                className="block px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                onClick={() => setShowMenu(false)}
              >
                Trips
              </Link>
              
              <Link
                to="/wishlists"
                className="block px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                onClick={() => setShowMenu(false)}
              >
                Wishlists
              </Link>
              
              {profile?.is_host && (
                <Link
                  to="/hosting"
                  className="block px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                  onClick={() => setShowMenu(false)}
                >
                  Manage listings
                </Link>
              )}
              
              <div className="border-t border-airbnb-light mt-2">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAuthClick('login')}
                className="block w-full text-left px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30 font-medium"
              >
                Log in
              </button>
              
              <button
                onClick={() => handleAuthClick('signup')}
                className="block w-full text-left px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
              >
                Sign up
              </button>
              
              <div className="border-t border-airbnb-light mt-2 pt-2">
                <Link
                  to="/host"
                  className="block px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                  onClick={() => setShowMenu(false)}
                >
                  Airbnb your home
                </Link>
                
                <Link
                  to="/help"
                  className="block px-4 py-2 text-airbnb-dark hover:bg-airbnb-light/30"
                  onClick={() => setShowMenu(false)}
                >
                  Help Center
                </Link>
              </div>
            </>
          )}
        </div>
      )}
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default UserMenu;