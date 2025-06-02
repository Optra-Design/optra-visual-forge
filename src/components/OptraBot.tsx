import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { MessageCircle, X, Send, Sparkles, Settings, User, Bot, Minimize2, Maximize2, Brain } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { freeLLMService, ChatMessage } from '../utils/freeLlmService';

// Lazy-loaded components
const OptraBotSettings = lazy(() => import('./OptraBotSettings'));

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isLLMLoaded, setIsLLMLoaded] = useState(false);
  const [messages, setMessages] = useState<{
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
  }[]>([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ I run on a free, open-source LLM right in your browser. What can I help you with?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `You are OptraBot, an AI assistant for Optra Design Studio founded by Aniketh in Bangalore. You help with information about services, the founder, and connecting users to Aniketh.`
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

  // Pre-initialize the LLM model when the component mounts
  useEffect(() => {
    const initializeLLM = async () => {
      if (!isLLMLoaded && !isInitializing) {
        setIsInitializing(true);
        
        try {
          // Attempt to initialize LLM with a timeout
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('LLM initialization timeout')), 10000);
          });
          
          const initResult = await Promise.race([
            freeLLMService.initialize(),
            timeoutPromise
          ]);
          
          setIsLLMLoaded(initResult as boolean);
        } catch (error) {
          console.warn('Could not initialize LLM:', error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    // Only initialize when the bot is opened to save resources
    if (isOpen && !isLLMLoaded) {
      initializeLLM();
    }
  }, [isOpen, isLLMLoaded, isInitializing]);

  const quickReplies = [
    "Tell me about Aniketh",
    "What services do you offer?",
    "How can I get in touch?",
    "Portfolio examples"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setIsOpen(true);
        addBotMessage("I'm powered by a free open-source LLM running in your browser! 🤖 Ask me anything about design, Optra's services, or Aniketh's creative approach. ✨", false);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addBotMessage = async (text: string, useAI: boolean = false) => {
    setIsTyping(true);
    
    let response = text;
    let newChatHistory = [...chatHistory];
    
    if (useAI && text) {
      try {
        // Add user message to chat history
        newChatHistory = [
          ...chatHistory,
          { role: 'user', content: text }
        ];
        
        // Get response from the LLM
        const llmResponse = await freeLLMService.generateResponse(newChatHistory);
        
        // Add assistant response to chat history
        newChatHistory = [
          ...newChatHistory,
          { role: 'assistant', content: llmResponse.response }
        ];
        
        response = llmResponse.response;
        
        // Trim history if it gets too long (keep last 10 messages)
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
    
    // Add slight delay for natural feeling
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 300 + Math.random() * 500);
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

    // Use AI for response
    await addBotMessage(text, true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowSettings(false);
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
        <div className={`fixed z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col animate-slide-in-right glow-hover transition-all duration-300 ${
          isMobile 
            ? isMinimized 
              ? 'bottom-28 right-6 w-16 h-16' 
              : 'bottom-6 left-4 right-4 h-[70vh]'
            : isMinimized 
              ? 'bottom-28 right-6 w-16 h-16'
              : 'bottom-28 right-6 w-80 h-96'
        }`}>
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-gradient hover:scale-110 transition-transform"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          ) : showSettings ? (
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            }>
              <OptraBotSettings 
                onClose={() => setShowSettings(false)} 
                setIsLLMLoaded={setIsLLMLoaded}
              />
            </Suspense>
          ) : (
            <>
              <div className="p-4 border-b border-white/20 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <h3 className="font-bold text-gradient">OptraBot</h3>
                  <p className="text-xs text-foreground/70 flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    {isLLMLoaded ? 'Free Open-Source LLM' : 'Initializing...'}
                  </p>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <Sparkles className="w-4 h-4 text-gradient animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div className={`flex items-end gap-2 max-w-xs ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.isBot ? 'bg-optra-gradient' : 'bg-white/20'
                      }`}>
                        {message.isBot ? <Bot size={12} /> : <User size={12} />}
                      </div>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.isBot
                            ? 'bg-white/10 text-foreground border border-white/20'
                            : 'bg-optra-gradient text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2 max-w-xs">
                      <div className="w-6 h-6 rounded-full bg-optra-gradient flex items-center justify-center">
                        <Bot size={12} />
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {isInitializing && !isLLMLoaded && (
                <div className="p-3 border-t border-white/20 text-center">
                  <div className="text-xs text-foreground/70 flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Loading free LLM model...
                  </div>
                </div>
              )}

              <div className="p-3 border-t border-white/20">
                <div className="flex flex-wrap gap-1 mb-3">
                  {quickReplies.slice(0, isMobile ? 2 : 3).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(reply)}
                      disabled={isInitializing && !isLLMLoaded}
                      className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-105 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                    placeholder={isInitializing && !isLLMLoaded ? "Loading model..." : "Ask me anything about Optra..."}
                    disabled={isInitializing && !isLLMLoaded}
                    className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={() => inputText.trim() && handleSendMessage(inputText)}
                    disabled={isInitializing && !isLLMLoaded}
                    className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
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
