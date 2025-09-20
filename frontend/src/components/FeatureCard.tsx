import React from 'react';

// 1. Define the props interface
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

// 2. Attach the interface to your component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 transition-all duration-300 hover:translate-y-[-0.5rem] hover:shadow-xl">
      <div className="text-4xl text-orange-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;