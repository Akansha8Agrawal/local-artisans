import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-24 px-32">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Get in <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    Have questions about our artisans or products? Want to join our community? We'd love to hear from you.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    );
};

export default ContactPage;