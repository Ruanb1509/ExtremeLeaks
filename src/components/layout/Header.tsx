import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Menu, X, User, Crown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../auth/AuthModal';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { fetchUser } = useAuthStore();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

useEffect(() => {
  fetchUser();
}, []);

 

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-300/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Flame className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary-500">Extreme</span>
                <span className="text-white">Leaks</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" active={location.pathname === '/'}>
                Home
              </NavLink>
              <NavLink to="/premium" active={location.pathname === '/premium'}>
                Premium
              </NavLink>
              <NavLink to="/dmca" active={location.pathname === '/dmca'}>
                DMCA
              </NavLink>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-200 font-medium">{user.name}</span>
                    {user.isPremium && (
                      <div className="ml-2 flex items-center text-yellow-500">
                        <Crown size={16} className="mr-1" />
                        <span className="text-sm font-medium">Premium</span>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </Button>
              )}
            </div>

            <button 
              className="md:hidden text-gray-200 hover:text-primary-500 transition"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div 
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
            }`}
          >
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" active={location.pathname === '/'}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/premium" active={location.pathname === '/premium'}>
                Premium
              </MobileNavLink>
              <MobileNavLink to="/dmca" active={location.pathname === '/dmca'}>
                DMCA
              </MobileNavLink>
              
              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-200 font-medium">{user.name}</span>
                    {user.isPremium && (
                      <div className="ml-2 flex items-center text-yellow-500">
                        <Crown size={16} className="mr-1" />
                        <span className="text-sm font-medium">Premium</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-primary-500 hover:bg-dark-400 rounded-lg transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 text-primary-500 hover:bg-dark-400 rounded-lg transition-colors text-left flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`font-medium transition-colors duration-200 ${
      active 
        ? 'text-primary-500' 
        : 'text-gray-200 hover:text-primary-400'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link
    to={to}
    className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-dark-400 text-primary-500 font-medium' 
        : 'text-gray-200 hover:bg-dark-400 hover:text-primary-400'
    }`}
  >
    {children}
  </Link>
);

export default Header;