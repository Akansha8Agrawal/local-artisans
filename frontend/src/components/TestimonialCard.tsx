import React from 'react';

// Define the shape of the props
interface TestimonialCardProps {
    rating: number;
    quote: string;
    artisanName: string;
    specialty: string;
    location: string;
}

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-400">
            {Array.from({ length: fullStars }, (_, i) => (
                <span key={`full-${i}`}>⭐</span>
            ))}
            {hasHalfStar && <span className="relative">⭐<span className="absolute inset-0 w-1/2 overflow-hidden text-gray-300">⭐</span></span>}
            {Array.from({ length: emptyStars }, (_, i) => (
                <span key={`empty-${i}`}>☆</span>
            ))}
        </div>
    );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, quote, artisanName, specialty, location }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center mb-4">
                <span className="text-4xl">🗨️</span>
            </div>
            
            <p className="text-gray-600 mb-4 italic text-center leading-relaxed">"{quote}"</p>
            
            <div className="flex flex-col items-center">
                <div className="font-bold text-lg text-gray-800">{artisanName}</div>
                <div className="text-sm font-medium text-gray-500 mt-1">{specialty} · {location}</div>
                <div className="mt-2 flex items-center">
                    {renderStars(rating)}
                    <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)}/5)</span>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;