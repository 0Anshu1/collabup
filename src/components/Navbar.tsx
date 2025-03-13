import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Sun, Moon } from 'lucide-react';
import AuthModal from './AuthModal';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const openAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      setShowProfileMenu(false);
    }
  };

  React.useEffect(() => {
    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <>
      <nav className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
              <input
                type="text"
                placeholder="Search live projects"
                className="bg-[var(--bg-secondary)] text-[var(--text-primary)] pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-[var(--border-color)]"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="relative profile-menu">
                <button
                  className="text-[var(--text-primary)] hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-[var(--bg-secondary)]"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 py-2 w-48 bg-[var(--bg-secondary)] rounded-lg shadow-xl border border-[var(--border-color)] z-50"
                  >
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-primary)] hover:text-blue-400 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-primary)] hover:text-blue-400 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuth('login')}
                  className="text-[var(--text-primary)] hover:text-blue-400 transition-colors duration-300"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  Sign Up
                </button>
              </>
            )}
            {[
              ['Student Proj', '/student-projects'],
              ['Buddy Finder', '/buddy-finder'],
              ['Mentorship', '/mentorship'],
              ['Startup Proj', '/startup-proj'],
            ].map(([title, path]) => (
              <Link
                key={path}
                to={path}
                className="relative text-[var(--text-primary)] hover:text-blue-400 transition-colors duration-300 group"
              >
                {title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        type={authType}
      />
    </>
  );
};

export default Navbar;