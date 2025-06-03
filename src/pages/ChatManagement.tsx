import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { MessageCircle, User, Clock, Send, ArrowLeft, Globe, Smartphone, Monitor } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { chatStorageService, ChatMessage } from '../utils/chatStorageService';

const ChatManagement = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<Array<{sessionId: string, userAgent: string, lastMessage: Date, messageCount: number}>>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isFounderOnline, setIsFounderOnline] = useState(true);
  
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    loadChatData();
    const savedStatus = localStorage.getItem('founderOnlineStatus');
    if (savedStatus) {
      setIsFounderOnline(JSON.parse(savedStatus));
    }
  }, [isLoggedIn, navigate]);

  const loadChatData = () => {
    const allMessages = chatStorageService.getAllMessages();
    const userSessions = chatStorageService.getUserSessions();
    setMessages(allMessages);
    setSessions(userSessions);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const replyMessage = chatStorageService.saveMessage({
      text: replyText,
      isFounder: true,
      status: 'delivered'
    });

    setMessages(prev => [...prev, replyMessage]);
    setReplyText('');
    loadChatData();
  };

  const getFilteredMessages = () => {
    if (selectedSession) {
      return messages.filter(msg => 
        msg.userInfo?.sessionId === selectedSession || msg.isFounder
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getUserMessages = () => {
    return messages.filter(msg => !msg.isFounder);
  };

  const getLatestContactInfo = () => {
    const contactMessages = messages.filter(msg => msg.contactInfo);
    return contactMessages.length > 0 ? contactMessages[contactMessages.length - 1].contactInfo : null;
  };

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const handleStatusToggle = () => {
    const newStatus = !isFounderOnline;
    setIsFounderOnline(newStatus);
    localStorage.setItem('founderOnlineStatus', JSON.stringify(newStatus));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gradient">Chat Management</h1>
              <p className="text-foreground/70">Manage customer conversations and inquiries</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sessions Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Sessions</h3>
                  <span className="text-xs bg-blue-500/30 text-blue-400 px-2 py-1 rounded-full">
                    {sessions.length}
                  </span>
                </div>

                {/* Online Status Toggle */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-4">
                  <div className={`w-3 h-3 rounded-full ${isFounderOnline ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}></div>
                  <span className="text-sm flex-1">Status</span>
                  <button
                    onClick={handleStatusToggle}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      isFounderOnline 
                        ? 'bg-green-500/30 text-green-400' 
                        : 'bg-gray-500/30 text-gray-400'
                    }`}
                  >
                    {isFounderOnline ? 'Online' : 'Offline'}
                  </button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <button
                    onClick={() => setSelectedSession(null)}
                    className={`w-full p-3 text-left rounded-lg transition-all ${
                      selectedSession === null ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">All Conversations</span>
                    </div>
                    <div className="text-xs text-foreground/60">
                      {getUserMessages().length} total messages
                    </div>
                  </button>

                  {sessions.map(session => (
                    <button
                      key={session.sessionId}
                      onClick={() => setSelectedSession(session.sessionId)}
                      className={`w-full p-3 text-left rounded-lg transition-all ${
                        selectedSession === session.sessionId ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getDeviceIcon(session.userAgent)}
                        <span className="font-medium text-sm truncate">
                          {session.userAgent.split(' ')[0]} User
                        </span>
                      </div>
                      <div className="text-xs text-foreground/60">
                        {session.messageCount} messages • {session.lastMessage.toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat View */}
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-2xl h-[600px] flex flex-col">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold">
                    {selectedSession ? 'Session Chat' : 'All Messages'}
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {getFilteredMessages().map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFounder ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isFounder
                          ? 'bg-blue-500/20 text-blue-100'
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        <div className="text-xs mt-2 opacity-70 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleString()}
                          {message.userInfo && !message.isFounder && (
                            <span className="flex items-center gap-1">
                              {getDeviceIcon(message.userInfo.userAgent || '')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && replyText.trim() && handleSendReply()}
                    placeholder="Reply to customers..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm focus:border-white/40 transition-colors"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Latest Contact Info</h3>
                
                {getLatestContactInfo() ? (
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-foreground/60 mb-1">Name</div>
                      <div className="font-medium">{getLatestContactInfo()?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-foreground/60 mb-1">Email</div>
                      <div className="font-medium">{getLatestContactInfo()?.email}</div>
                    </div>
                    {getLatestContactInfo()?.phone && (
                      <div>
                        <div className="text-xs text-foreground/60 mb-1">Phone</div>
                        <div className="font-medium">{getLatestContactInfo()?.phone}</div>
                      </div>
                    )}
                    {getLatestContactInfo()?.company && (
                      <div>
                        <div className="text-xs text-foreground/60 mb-1">Company</div>
                        <div className="font-medium">{getLatestContactInfo()?.company}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-foreground/60">
                    <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No contact info shared yet</p>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-xs text-foreground/60 mb-2">Statistics</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Messages</span>
                      <span className="font-medium">{messages.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">User Messages</span>
                      <span className="font-medium">{getUserMessages().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sessions</span>
                      <span className="font-medium">{sessions.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatManagement;
