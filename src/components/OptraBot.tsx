
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { MessageCircle, X, Send, Sparkles, Settings, User, Bot, Minimize2, Maximize2, Key } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { apiLLMService, ChatMessage } from '../utils/apiLlmService';

// Lazy-loaded components
const OptraBotSettings = lazy(() => import('./OptraBotSettings'));

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [messages, setMessages] = useState<{
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
  }[]>([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ I can use OpenAI's API for intelligent responses, or provide basic info about Optra. What can I help you with?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `You are OptraBot, an AI assistant for Optra Design Studio founded by Aniketh in Bangalore.`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const savedApiKey = apiLLMService.getApiKey();
    setHasApiKey(!!savedApiKey);
  }, []);

  const quickReplies = [
    "Tell me about Aniketh",
    "What services do you offer?",
    "How can I get in touch?",
    "Portfolio examples"
  ];

  const addBotMessage = async (text: string, useAI: boolean = false) => {
    setIsTyping(true);
    
    let response = text;
    let newChatHistory = [...chatHistory];
    
    if (useAI && text) {
      try {
        newChatHistory = [
          ...chatHistory,
          { role: 'user', content: text }
        ];
        
        const llmResponse = await apiLLMService.generateResponse(newChatHistory);
        
        newChatHistory = [
          ...newChatHistory,
          { role: 'assistant', content: llmResponse.response }
        ];
        
        response = llmResponse.response;
        
        if (newChatHistory.length > 12) {
          const systemMessage = newChatHistory[0];
          newChatHistory = [systemMessage, ...newChatHistory.slice(newChatHistory.length - 10)];
        }
        
        setChatHistory(newChatHistory);
      } catch (error) {
        console.error('Error generating response:', error);
        response = "I'm having trouble responding right now. Please try again in a moment.";
      }
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 300);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    await addBotMessage(text, true);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      apiLLMService.setApiKey(apiKey.trim());
      setHasApiKey(true);
      setShowApiKeyInput(false);
      setApiKey('');
      addBotMessage("Great! I'm now connected to OpenAI's API and can provide more intelligent responses. How can I help you?", false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowSettings(false);
    setShowApiKeyInput(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-optra-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover ${
          isOpen ? 'rotate-180' : 'animate-bounce-subtle'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {isOpen && (
        <div className={`fixed z-50 bg-gray-900/95 backdrop-blur-lg border border-gray-600/50 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isMobile 
            ? isMinimized 
              ? 'bottom-28 right-6 w-16 h-16' 
              : 'bottom-6 left-4 right-4 h-[70vh] max-h-[600px]'
            : isMinimized 
              ? 'bottom-28 right-6 w-16 h-16'
              : 'bottom-28 right-6 w-96 h-[500px]'
        }`}>
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-gradient hover:scale-110 transition-transform"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          ) : showApiKeyInput ? (
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Key Setup
                </h3>
                <button
                  onClick={() => setShowApiKeyInput(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-blue-300 mb-3">
                    Enter your OpenAI API key to enable intelligent responses. Your key is stored locally and never sent to our servers.
                  </p>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    disabled={!apiKey.trim()}
                    className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save API Key
                  </button>
                </div>
                
                <div className="p-4 bg-gray-500/10 rounded-lg border border-gray-500/20">
                  <p className="text-xs text-gray-400">
                    Don't have an API key? Get one from <span className="text-blue-400">platform.openai.com</span>. Without an API key, I'll use offline responses with basic information about Optra.
                  </p>
                </div>
              </div>
            </div>
          ) : showSettings ? (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            }>
              <OptraBotSettings 
                onClose={() => setShowSettings(false)} 
                setIsLLMLoaded={() => {}}
              />
            </Suspense>
          ) : (
            <>
              <div className="p-4 border-b border-gray-600/50 flex items-center gap-3 flex-shrink-0">
                <div className={`w-3 h-3 rounded-full animate-pulse ${hasApiKey ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gradient truncate">OptraBot</h3>
                  <p className="text-xs text-gray-300 flex items-center gap-1 truncate">
                    {hasApiKey ? '🤖 AI Powered' : '📚 Offline Mode'}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!hasApiKey && (
                    <button
                      onClick={() => setShowApiKeyInput(true)}
                      className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      title="Add API Key"
                    >
                      <Key className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Sparkles className="w-4 h-4 text-gradient animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        message.isBot ? 'bg-optra-gradient' : 'bg-gray-600'
                      }`}>
                        {message.isBot ? <Bot size={14} /> : <User size={14} />}
                      </div>
                      <div
                        className={`p-3 rounded-2xl break-words ${
                          message.isBot
                            ? 'bg-gray-800 text-white border border-gray-600/50'
                            : 'bg-optra-gradient text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-white">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-optra-gradient flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={14} />
                      </div>
                      <div className="bg-gray-800 p-3 rounded-2xl border border-gray-600/50">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-gray-600/50 flex-shrink-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {quickReplies.slice(0, isMobile ? 2 : 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(reply)}
                      className="text-xs px-3 py-1 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition-all hover:scale-105 border border-gray-600"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                    placeholder="Ask me anything about Optra..."
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-400"
                  />
                  <button
                    onClick={() => inputText.trim() && handleSendMessage(inputText)}
                    className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OptraBot;
