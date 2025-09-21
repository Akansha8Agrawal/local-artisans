import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI Artisan Assistant. How can I help today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Scroll the chat messages container only
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // Ensure page itself stays at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Mock API response
    const MOCK_BOT_REPLIES = [
      "I can help with that! Please provide more details about your craft.",
      "Our platform supports artisans worldwide. What region are you in?",
      "That's a great question. Have you checked out our FAQ section for sellers?",
      "I'm still learning! Could you rephrase your question?",
    ];

    setTimeout(() => {
      const mockReply = MOCK_BOT_REPLIES[Math.floor(Math.random() * MOCK_BOT_REPLIES.length)];
      const mockSessionId = "mock-session-" + Date.now();

      setMessages(prev => [...prev, { text: mockReply, sender: 'bot' }]);
      setSessionId(mockSessionId);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-800">Quick Links</h3>
        <p className="text-sm text-gray-500">Suggested questions...</p>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500 p-2">
            <span className="animate-spin text-xl">⏳</span>
            <span>Assistant is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 rounded-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button type="submit" className="bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600 transition-colors">
          <span className="text-lg">▶</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
