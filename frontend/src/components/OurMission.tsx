import React from 'react';

const OurMission = () => {
    return (
        <section className="bg-white py-16 px-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left Column: Mission Text */}
                <div className="text-gray-800">
                    <h3 className="text-4xl font-bold">Our Mission</h3>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        To create a sustainable ecosystem where traditional artisans can thrive in the modern economy. We bridge the gap between centuries-old craftsmanship and contemporary commerce.
                    </p>
                    <ul className="mt-6 space-y-4 text-lg">
                        <li className="flex items-center space-x-3">
                            <span className="text-orange-500 text-2xl">🧡</span>
                            <span>Preserve Heritage</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="text-orange-500 text-2xl">👥</span>
                            <span>Empower Communities</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="text-orange-500 text-2xl">🌐</span>
                            <span>Global Reach</span>
                        </li>
                    </ul>
                </div>
                
                {/* Right Column: Stats Box */}
                <div className="bg-[#fcf7f2] p-8 rounded-lg">
                    <div className="grid grid-cols-2 gap-8 text-center">
                        <div>
                            <span className="block text-4xl font-bold text-orange-500">500+</span>
                            <span className="block text-gray-600">Artisans Supported</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold text-orange-500">50+</span>
                            <span className="block text-gray-600">Craft Categories</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold text-orange-500">25+</span>
                            <span className="block text-gray-600">States Covered</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold text-orange-500">10K+</span>
                            <span className="block text-gray-600">Products Sold</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default OurMission;