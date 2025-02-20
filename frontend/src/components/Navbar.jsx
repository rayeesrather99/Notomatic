import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import NotomaticLogo from '../assets/notomatic-logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Simulating a check for user authentication
  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      setUsername('User');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    // Redirect to home page or login page
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={NotomaticLogo} alt="Notomatic" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              {isLoggedIn && (
                <Link to="/syllabus-upload" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Upload Syllabus</Link>
              )}
              {!isLoggedIn ? (
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">Login</Link>
              ) : (
                <ProfileDropdown username={username} onLogout={handleLogout} />
              )}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            {isLoggedIn && (
              <Link to="/syllabus-upload" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Upload Syllabus</Link>
            )}
            {!isLoggedIn ? (
              <Link to="/login" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300">Login</Link>
            ) : (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <Link to="/change-password" className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Change Password</Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

