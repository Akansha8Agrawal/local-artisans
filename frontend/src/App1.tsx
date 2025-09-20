import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import ArtsSection from './components/ArtsSection';
import Footer from './components/Footer';

// A new component for the home page
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <ArtsSection />
    </>
  );
};

// A new component for the Artisans page
import ArtisansPage from './components/ArtisansPage';

const App1 = () => {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artisans" element={<ArtisansPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App1;