import React from 'react';

// Define the shape of the props for the value card
interface ValueCardProps {
    icon: string;
    title: string;
    description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-8">
        <span className="text-4xl text-orange-500 mb-4">{icon}</span>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const OurValues = () => {
    return (
        <section className="bg-[#fcf7f2] py-24 px-32 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Our Values</h2>
            <p className="mt-2 text-lg text-gray-600 mb-12">
                Every decision we make is guided by these core principles
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ValueCard
                    icon="🎖️"
                    title="Quality First"
                    description="We maintain the highest standards in every product, ensuring authentic craftsmanship shines through."
                />
                <ValueCard
                    icon="🧡"
                    title="Fair Trade"
                    description="Artisans receive fair compensation for their work, enabling sustainable livelihoods."
                />
                <ValueCard
                    icon="👥"
                    title="Community"
                    description="We build lasting relationships with artisan communities, supporting their growth and development."
                />
            </div>
        </section>
    );
};

export default OurValues;