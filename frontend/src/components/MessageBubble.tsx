import React from 'react';

interface MessageProps {
    text: string;
    sender: 'user' | 'bot';
}

const MessageBubble: React.FC<MessageProps> = ({ text, sender }) => {
    const isUser = sender === 'user';
    const bubbleClass = isUser
        ? "ml-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white"
        : "mr-auto bg-gray-200 text-gray-800";
    const avatar = isUser ? "👤" : "🤖";

    return (
        <div className={`flex items-start max-w-[80%] my-2 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && <div className="text-xl mr-2">{avatar}</div>}
            <div className={`p-4 rounded-xl ${isUser ? 'rounded-br-none' : 'rounded-bl-none'} ${bubbleClass}`}>
                {text}
            </div>
            {isUser && <div className="text-xl ml-2">{avatar}</div>}
        </div>
    );
};

export default MessageBubble;