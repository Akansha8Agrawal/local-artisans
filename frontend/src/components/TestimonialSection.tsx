import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
    return (
        <section className="bg-gray-50 py-24 px-32 text-center">
            
            {/* Section Header */}
            <div className="mb-12">
                <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Artisan <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Feedback</span>
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover what our talented craftspeople have to say about our platform.
                </p>
            </div>

            {/* Grid of Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard
                    rating={4.9}
                    quote="This platform has transformed my business. The support and reach are incredible!"
                    artisanName="Rajesh Kumar"
                    specialty="Pottery"
                    location="Rajasthan"
                />
                <TestimonialCard
                    rating={4.8}
                    quote="I love being part of this community. It's truly dedicated to preserving our heritage."
                    artisanName="Meera Devi"
                    specialty="Textiles"
                    location="Gujarat"
                />
                <TestimonialCard
                    rating={5.0}
                    quote="An excellent marketplace! The focus on quality and authenticity is unmatched."
                    artisanName="Arjun Singh"
                    specialty="Jewelry"
                    location="Jaipur"
                />
            </div>
        </section>
    );
};

export default TestimonialsSection;