import React from 'react';
import ArtCard from './ArtCard';

// Assuming you have these images in your public folder
// with the names pottery.jpg, textiles.jpg, and jewelry.jpg
import potteryImg from './pottery-craft.jpeg';
import textilesImg from './textile-craft.jpeg';
import jewelryImg from './jewelry-craft.jpeg';

const ArtsSection = () => {
    return (
        <section className="bg-[#fcf7f2] py-24 px-32 text-center">
            
            {/* Section Header */}
            <div className="mb-12">
            <span className="text-base font-semibold text-orange-500 uppercase tracking-wider">
          Our Crafts
        </span>
                <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Discover <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Traditional Arts</span>
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    From pottery to textiles, explore the diverse world of handcrafted treasures created by master artisans.
                </p>
            </div>

            {/* Grid of Art Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ArtCard
                    imageSrc={potteryImg}
                    category="Ceramics"
                    artisanCount="150+"
                    title="Traditional Pottery"
                    description="Hand-thrown ceramics and terracotta creations"
                />
                <ArtCard
                    imageSrc={textilesImg}
                    category="Textiles"
                    artisanCount="200+"
                    title="Handwoven Textiles"
                    description="Intricate fabrics and traditional weaving patterns"
                />
                <ArtCard
                    imageSrc={jewelryImg}
                    category="Jewelry"
                    artisanCount="100+"
                    title="Artisan Jewelry"
                    description="Handcrafted ornaments with traditional techniques"
                />
            </div>
        </section>
    );
};

export default ArtsSection;