import React from 'react';

const ContactForm = () => {
    return (
        <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" placeholder="Enter your first name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" placeholder="Enter your last name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" placeholder="Enter your email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" placeholder="What is this regarding?" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea rows={4} placeholder="Tell us more about your inquiry..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-orange-500 focus:ring-orange-500"></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;