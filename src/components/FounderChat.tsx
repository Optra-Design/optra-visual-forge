import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, UserCheck, Minimize2, Maximize2, Phone, Mail, MapPin } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useAuth } from '../contexts/AuthContext';
import { chatStorageService, ChatMessage } from '../utils/chatStorageService';

const FounderChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isFounderOnline, setIsFounderOnline] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { isLoggedIn } = useAuth();

  // Load chat history and founder status
  useEffect(() => {
    const loadedMessages = chatStorageService.getAllMessages();
    const savedStatus = localStorage.getItem('founderOnlineStatus');
    
    if (loadedMessages.length > 0) {
      setMessages(loadedMessages);
    } else {
      // Welcome message if no history exists
      const welcomeMessage = chatStorageService.saveMessage({
        text: "Hey! 👋 I'm Aniketh, founder of Optra Design. I'm here to personally chat with you about your design needs, answer questions, or just have a friendly conversation! To get started, would you mind sharing your contact details?",
        isFounder: true,
        status: 'delivered'
      });
      setMessages([welcomeMessage]);
    }

    if (savedStatus) {
      setIsFounderOnline(JSON.parse(savedStatus));
    }
  }, []);

  // Save founder status to localStorage
  useEffect(() => {
    localStorage.setItem('founderOnlineStatus', JSON.stringify(isFounderOnline));
  }, [isFounderOnline]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    console.log('Sending message:', inputText);
    
    const userMessage = chatStorageService.saveMessage({
      text: inputText,
      isFounder: false,
      status: 'sent'
    });

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Mark user messages as delivered after a short delay
    setTimeout(() => {
      chatStorageService.updateMessageStatus(userMessage.id, 'delivered');
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactMessage = chatStorageService.saveMessage({
      text: `Here are my contact details:\n\nName: ${contactInfo.name}\nEmail: ${contactInfo.email}\nPhone: ${contactInfo.phone}\nCompany: ${contactInfo.company}`,
      isFounder: false,
      status: 'sent',
      contactInfo: { ...contactInfo }
    });

    setMessages(prev => [...prev, contactMessage]);
    setShowContactForm(false);
    setContactInfo({ name: '', email: '', phone: '', company: '' });
  };

  const clearChatHistory = () => {
    chatStorageService.clearAllMessages();
    setMessages([]);
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
                onClick={() => setShowContactForm(true)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xs"
                title="Share contact details"
              >
                <Mail className="w-3 h-3" />
              </button>
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

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Share Your Contact Details</h3>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Company/Organization"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Share Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    {message.contactInfo && (
                      <div className="mt-2 pt-2 border-t border-white/20 text-xs">
                        <div className="flex items-center gap-1 mb-1">
                          <User className="w-3 h-3" />
                          <span className="font-medium">Contact Info Shared</span>
                        </div>
                      </div>
                    )}
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
