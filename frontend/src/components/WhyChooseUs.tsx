import React from 'react';
import FeatureCard from './FeatureCard';

const WhyChooseUs = () => {
  return (
    <section className="bg-[#fcf7f2] py-24 px-32 text-center">
      
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-base font-semibold text-orange-500 uppercase tracking-wider">
          Why Choose Us
        </span>
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Celebrating <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Artisan Excellence</span>
                </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          We're more than a marketplace - we're a community dedicated to preserving <br />
          traditional craftsmanship and empowering artisans.
        </p>
      </div>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon="🧡" 
          title="Handcrafted Excellence" 
          description="Every piece is carefully crafted by skilled artisans with generations of expertise" 
        />
        <FeatureCard 
          icon="🏺" 
          title="Authentic Heritage" 
          description="Preserving traditional techniques and cultural stories in every creation" 
        />
        <FeatureCard 
          icon="🌐" 
          title="Global Reach" 
          description="Connecting local artisans with customers worldwide through our platform" 
        />
        <FeatureCard 
          icon="📦" 
          title="Quality Assured" 
          description="Rigorous quality checks ensure every product meets our high standards" 
        />
        <FeatureCard 
          icon="🤝" 
          title="Community Support" 
          description="Supporting artisan communities and their sustainable livelihoods" 
        />
        <FeatureCard 
          icon="⭐" 
          title="Customer Satisfaction" 
          description="Over 98% customer satisfaction rate with our handcrafted products" 
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;