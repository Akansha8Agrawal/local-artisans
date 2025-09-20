import React from 'react';

// Define the props for a reusable info card
interface InfoCardProps {
    icon: string;
    title: string;
    content: string[];
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center space-x-4 mb-2">
            <span className="text-2xl text-orange-500">{icon}</span>
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
            {content.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    </div>
);

const ContactInfo = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-600 mb-6">
                Reach out to us through any of these channels. We're here to help you connect with our amazing artisan community.
            </p>
            <InfoCard 
                icon="📍" 
                title="Address" 
                content={["Local Artisans Hub", "123 Craft Street, Artisan Quarter", "New Delhi, India 110001"]} 
            />
            <InfoCard 
                icon="📞" 
                title="Phone" 
                content={["+91 98765 43210", "+91 87654 32109"]} 
            />
            <InfoCard 
                icon="✉️" 
                title="Email" 
                content={["info@localartisans.com", "support@localartisans.com"]} 
            />
            <InfoCard 
                icon="⏰" 
                title="Business Hours" 
                content={["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"]} 
            />
        </div>
    );
};

export default ContactInfo;