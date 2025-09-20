// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import ArtsSection from './components/ArtsSection';
import './index.css'; // Make sure you import your main CSS file

const App1 = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <ArtsSection />
      <Footer />
    </div>
  );
};

export default App1;