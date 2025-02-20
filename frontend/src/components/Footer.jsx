import React from 'react';
import { Link } from 'react-router-dom';
import NotomaticLogo from '../assets/notomatic-logo-dark-bg.png';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src={NotomaticLogo} alt="Notomatic" className="h-8 w-auto mb-4" />
            <p className="text-sm text-gray-300">AI-powered note generation for students, educators, and professionals.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition duration-300">Dashboard</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition duration-300">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">Email: support.notomatic@gmail.com</p>
            <p className="text-sm text-gray-300">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Notomatic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

