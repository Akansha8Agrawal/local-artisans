import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import ArtsSection from './components/ArtsSection';
import Footer from './components/Footer';
import ArtisansPage from './components/ArtisansPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ChatPage from './components/ChatPage'; 
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AddItemPage from './components/AddItemPage';

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

const App1 = () => {
return (
<BrowserRouter>
<div className="font-sans">
<Navbar />
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/artisans" element={<ArtisansPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/chat" element={<ChatPage />} /> 
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />
<Route path="/add-item" element={<AddItemPage />} />
</Routes>
<Footer />
</div>
</BrowserRouter>
);
};

export default App1;