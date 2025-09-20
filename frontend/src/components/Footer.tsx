import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-[#e36a13] to-[#b34700] text-white py-12 px-24">
            
            {/* Main Footer Content */}
            <div className="flex justify-between items-start gap-12 border-b border-white border-opacity-20 pb-12 mb-8">
                
                {/* Left Section: Logo & Description */}
                <div className="flex-1 max-w-sm">
                    <h3 className="text-2xl font-bold">Local Artisans</h3>
                    <p className="mt-4 text-sm text-gray-200">
                        Connecting traditional craftsmanship with modern markets. Every purchase supports artisan communities and preserves cultural heritage.
                    </p>
                    <div className="mt-6">
                        <h4 className="font-semibold text-lg">Stay Connected</h4>
                        <div className="flex mt-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-white bg-opacity-20 text-white placeholder-white py-2 px-4 rounded-l-md focus:outline-none flex-1"
                            />
                            <button className="bg-white bg-opacity-30 p-2 rounded-r-md">
                                <span className="text-white text-lg">✉️</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Quick Links */}
                <div className="flex-1">
                    <h4 className="font-semibold text-lg">Quick Links</h4>
                    <ul className="mt-4 space-y-2 text-sm text-gray-200">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Our Artisans</a></li>
                        <li><a href="#" className="hover:underline">Craft Collections</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                        <li><a href="#" className="hover:underline">Wholesale</a></li>
                        <li><a href="#" className="hover:underline">Custom Orders</a></li>
                    </ul>
                </div>

                {/* Right Section: Get in Touch & Socials */}
                <div className="flex-1 max-w-sm">
                    <h4 className="font-semibold text-lg">Get in Touch</h4>
                    <ul className="mt-4 space-y-3 text-sm text-gray-200">
                        <li className="flex items-center space-x-2">
                            <span>📍</span> <span>Mumbai, Maharashtra, India</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>📞</span> <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>✉️</span> <span>hello@localartisans.com</span>
                        </li>
                    </ul>

                    <h4 className="font-semibold text-lg mt-8">Follow Us</h4>
                    <div className="flex mt-4 space-x-3">
                        <a href="#" className="p-2 rounded-full border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-colors">
                            <span className="text-white">f</span>
                        </a>
                        <a href="#" className="p-2 rounded-full border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-colors">
                            <span className="text-white">📸</span>
                        </a>
                        <a href="#" className="p-2 rounded-full border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-colors">
                            <span className="text-white">🐦</span>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center text-xs text-gray-200">
                <div className="flex items-center space-x-2">
                    <span>Made with ❤️ for artisan communities</span>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                    <span>© 2024 Local Artisans. All rights reserved.</span>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;