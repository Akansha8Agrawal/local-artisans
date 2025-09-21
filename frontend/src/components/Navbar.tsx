import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-6 px-12 text-black bg-[#fcf7f2]">
            <div className="text-2xl font-bold">Local Artisans</div>
            <ul className="flex space-x-8">
                <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                <li><Link to="/artisans" className="hover:text-gray-300">Artisans</Link></li>
                <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
                <li><Link to="/chat" className="hover:text-gray-300">AI Assistant</Link></li>
                <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">Login</Link>
              <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
                Sign Up
              </Link>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
                Join Our Community
            </button>
        </nav>
    );
};

export default Navbar;