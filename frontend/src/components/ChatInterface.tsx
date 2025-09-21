import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

type ActionType =
  | "general_chat"
  | "generate_story"
  | "marketing_content"
  | "market_trends"
  | "calculate_pricing";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI Artisan Assistant! I can help with product stories, marketing, trends, and pricing.", sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<ActionType>("general_chat");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // Handle sending message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, action: currentAction, language: language })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { text: `Error: ${err.message}`, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
      setCurrentAction("general_chat"); // reset action after response
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-800">Quick Actions</h3>
        <p className="text-sm text-gray-500">Choose an action and language for your craft assistant</p>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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

    {/* Action buttons */}
    <div className="p-4 border-t border-gray-200 grid grid-cols-2 gap-2 mb-2">
      <button
        onClick={() => setCurrentAction("generate_story")}
        className={`rounded-full p-2 transition-colors ${
          currentAction === "generate_story"
            ? "bg-green-500 text-white" // active color
            : "bg-orange-500 text-white hover:bg-orange-600" // default color
        }`}
      >
        ✍️ Product Story
      </button>

      <button
        onClick={() => setCurrentAction("marketing_content")}
        className={`rounded-full p-2 transition-colors ${
          currentAction === "marketing_content"
            ? "bg-green-500 text-white"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        📣 Marketing Content
      </button>

      <button
        onClick={() => setCurrentAction("market_trends")}
        className={`rounded-full p-2 transition-colors ${
          currentAction === "market_trends"
            ? "bg-green-500 text-white"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        📈 Market Trends
      </button>

      <button
        onClick={() => setCurrentAction("calculate_pricing")}
        className={`rounded-full p-2 transition-colors ${
          currentAction === "calculate_pricing"
            ? "bg-green-500 text-white"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        💰 Pricing
      </button>
    </div>


      {/* Language selector */}
      <div className="flex gap-2 p-4 border-t border-gray-200 items-center">
        <label className="text-gray-700 font-medium">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
          className="border border-gray-300 rounded p-1 focus:outline-none"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
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
