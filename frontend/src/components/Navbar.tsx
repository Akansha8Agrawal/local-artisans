// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 px-12 text-black bg-[#fcf7f2]">
      {/* Logo/Site Title */}
      <div className="text-2xl font-bold">
        Local Artisans
      </div>
      
      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li><a href="#" className="hover:text-gray-300">Home</a></li>
        <li><a href="#" className="hover:text-gray-300">Artisans</a></li>
        <li><a href="#" className="hover:text-gray-300">Products</a></li>
        <li><a href="#" className="hover:text-gray-300">About</a></li>
        <li><a href="#" className="hover:text-gray-300">Blog</a></li>
        <li><a href="#" className="hover:text-gray-300">Contact</a></li>
      </ul>
      
      {/* Join Button */}
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
        Join Our Community
      </button>
    </nav>
  );
};

export default Navbar;