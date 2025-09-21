// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import heroArtisansImg from './hero-artisans.jpeg';
const HeroSection = () => {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroArtisansImg})` }}
    >
      {/* Overlay to darken background image and make text readable */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Content Container */}
      <div className="relative z-10 p-20 flex flex-col justify-center h-full text-white">
        
        {/* "Handcrafted with Love" tag */}
        <div className="flex items-center space-x-2 text-sm font-semibold mb-4">
          <span>❤️</span>
          <span>Handcrafted with Love</span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-6xl font-extrabold leading-tight tracking-wide">
          Empowering 
          <span className="bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent block">
            Local Artisans
          </span>
          & Their Crafts
        </h1>
        
        {/* Description */}
        <p className="mt-4 text-lg max-w-2xl">
          Discover the rich heritage of traditional craftsmanship. Connect with skilled artisans creating authentic handmade products that tell stories of culture, passion, and timeless beauty.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <Link to="/add-item" className="bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
            Get Started →
          </Link>
          <Link to="/artisans" className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-300">
            Meet Our Artisans
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 flex space-x-12">
          {/* Stat 1 */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold">500+</span>
            <span className="text-gray-300 text-sm">Artisans</span>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold">50+</span>
            <span className="text-gray-300 text-sm">Craft Types</span>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col">
            <span className="text-4xl font-bold">5000+</span>
            <span className="text-gray-300 text-sm">Happy Customers</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;