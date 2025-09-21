import React from 'react';
import ChatInterface from './ChatInterface';

const ChatPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                {/* Left Section (Intro) */}
                <div className="flex flex-col justify-center text-left">
                    <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
                        Chat with our <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">AI Assistant</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-lg">
                        Ask questions about our platform, crafts, or connect with support.
                    </p>
                </div>
                {/* Right Section (Chat Interface) */}
                <ChatInterface />
            </div>
        </div>
    );
};

export default ChatPage;