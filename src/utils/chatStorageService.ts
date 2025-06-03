
interface ChatMessage {
  id: string;
  text: string;
  isFounder: boolean;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    sessionId?: string;
    userAgent?: string;
    ipAddress?: string;
  };
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
}

class ChatStorageService {
  private static instance: ChatStorageService;
  private sessionId: string;
  
  constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): ChatStorageService {
    if (!ChatStorageService.instance) {
      ChatStorageService.instance = new ChatStorageService();
    }
    return ChatStorageService.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getStorageKey(): string {
    return 'optra_chat_messages';
  }

  private getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
  }

  saveMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      userInfo: message.isFounder ? undefined : {
        ...message.userInfo,
        ...this.getSessionInfo()
      }
    };

    const existingMessages = this.getAllMessages();
    const updatedMessages = [...existingMessages, newMessage];
    
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(updatedMessages));
      console.log('💬 Message saved:', newMessage);
    } catch (error) {
      console.error('Failed to save message:', error);
    }

    return newMessage;
  }

  getAllMessages(): ChatMessage[] {
    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (!stored) return [];
      
      const messages = JSON.parse(stored);
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
  }

  updateMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read'): void {
    const messages = this.getAllMessages();
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    );
    
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  }

  clearAllMessages(): void {
    try {
      localStorage.removeItem(this.getStorageKey());
    } catch (error) {
      console.error('Failed to clear messages:', error);
    }
  }

  getUnreadUserMessages(): ChatMessage[] {
    return this.getAllMessages().filter(msg => !msg.isFounder && msg.status !== 'read');
  }

  getMessagesBySession(sessionId: string): ChatMessage[] {
    return this.getAllMessages().filter(msg => 
      msg.userInfo?.sessionId === sessionId
    );
  }

  getUserSessions(): Array<{sessionId: string, userAgent: string, lastMessage: Date, messageCount: number}> {
    const messages = this.getAllMessages().filter(msg => !msg.isFounder);
    const sessions = new Map();
    
    messages.forEach(msg => {
      if (msg.userInfo?.sessionId) {
        const existing = sessions.get(msg.userInfo.sessionId);
        if (!existing || msg.timestamp > existing.lastMessage) {
          sessions.set(msg.userInfo.sessionId, {
            sessionId: msg.userInfo.sessionId,
            userAgent: msg.userInfo.userAgent || 'Unknown Device',
            lastMessage: msg.timestamp,
            messageCount: (existing?.messageCount || 0) + 1
          });
        }
      }
    });
    
    return Array.from(sessions.values()).sort((a, b) => b.lastMessage.getTime() - a.lastMessage.getTime());
  }
}

export const chatStorageService = ChatStorageService.getInstance();
export type { ChatMessage };
