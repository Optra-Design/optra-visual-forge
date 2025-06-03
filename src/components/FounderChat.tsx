
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, UserCheck, Minimize2, Maximize2 } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface ChatMessage {
  id: string;
  text: string;
  isFounder: boolean;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const FounderChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isFounderOnline, setIsFounderOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('founderChatHistory');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
    } else {
      // Welcome message if no history exists
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: "Hey! 👋 I'm Aniketh, founder of Optra Design. I'm here to personally chat with you about your design needs, answer questions, or just have a friendly conversation!",
        isFounder: true,
        timestamp: new Date(),
        status: 'delivered'
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('founderChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate founder responses (in real implementation, this would be a real chat system)
  const simulateFounderResponse = (userMessage: string) => {
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'd love to help you with your design project. Tell me more about what you have in mind! 🎨",
        "That's an interesting challenge! At Optra, we love tackling unique design problems. What's your timeline looking like?",
        "I appreciate you sharing that! Let's schedule a quick call to discuss this in detail. What works best for you?",
        "Great question! I've worked on similar projects before. The key is understanding your brand's core message first.",
        "I'm excited about this project! Feel free to email me directly at aniketh@optra.me for a more detailed discussion.",
        "Thanks for your interest in Optra! I personally handle all client relationships to ensure we deliver exactly what you envision."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const founderMessage: ChatMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        isFounder: true,
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, founderMessage]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isFounder: false,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate founder response
    simulateFounderResponse(inputText);
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem('founderChatHistory');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
      isMobile 
        ? isMinimized 
          ? 'bottom-28 left-6 w-16 h-16' 
          : 'bottom-6 left-4 right-4 h-[70vh] max-h-[600px]'
        : isMinimized 
          ? 'bottom-28 left-6 w-16 h-16'
          : 'bottom-28 left-6 w-96 h-[500px]'
    }`}>
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center text-purple-600 hover:scale-110 transition-transform"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 flex-shrink-0">
            <div className={`w-3 h-3 rounded-full ${isFounderOnline ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}></div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">Chat with Aniketh</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                <UserCheck className="w-3 h-3 flex-shrink-0" />
                {isFounderOnline ? 'Online now' : 'Usually replies within 1 hour'}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={clearChatHistory}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xs"
                title="Clear chat history"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isFounder ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${message.isFounder ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    message.isFounder ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-600'
                  }`}>
                    {message.isFounder ? <UserCheck size={14} className="text-white" /> : <User size={14} className="text-white" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl break-words ${
                      message.isFounder
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className={`text-xs mt-1 ${message.isFounder ? 'text-gray-500' : 'text-purple-100'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {!message.isFounder && (
                        <span className="ml-2">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage()}
                placeholder="Message Aniketh..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FounderChat;
