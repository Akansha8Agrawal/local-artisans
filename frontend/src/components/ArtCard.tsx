import React from 'react';

// Define the shape and types of the props
interface ArtCardProps {
    imageSrc: string;
    category: string;
    artisanCount: string;
    title: string;
    description: string;
}

const ArtCard: React.FC<ArtCardProps> = ({ imageSrc, category, artisanCount, title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={imageSrc} alt={title} className="w-full h-72 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
                    <span>{category}</span>
                    <span>{artisanCount} Artisans</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a href="#" className="flex items-center text-orange-500 font-semibold hover:underline">
                    Explore Collection →
                </a>
            </div>
        </div>
    );
};

export default ArtCard;